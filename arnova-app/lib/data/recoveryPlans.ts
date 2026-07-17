import "server-only";
import { supabaseAdmin } from "../supabase/admin";
import { requireUserId } from "../auth";
import { generateRecoveryPlan, RecoveryPlanGenerationError, type RecoveryPlanContent } from "../ai/gemini";
import { getRecentMoodLogs } from "./moodLogs";
import { getLatestAssessment } from "./assessments";
import { listJournalEntriesSince } from "./journal";
import type { Assessment, JournalScores, MoodLog, RecoveryPlan, RecoveryTask } from "./types";

// --- Tunable thresholds for the regeneration gate -------------------------
const COOLDOWN_MS = 10 * 60 * 1000; // 10 menit: cegah dua request nyaris bersamaan sama-sama regenerate
const STALE_DAYS = 14;
const MIN_MOOD_LOGS_FOR_SIGNAL = 3;
const ENERGY_DRIFT_THRESHOLD = 20;
const NEGATIVE_TREND_DROP = 15;

function rowToPlan(row: {
  id: string;
  user_id: string;
  created_at: string;
  source: "ai" | "rule_based";
  trigger_reason: string;
  baseline_energy_score: number | null;
  baseline_mood: string | null;
  focus_areas: string[] | null;
  summary: string;
  checklist: unknown;
}): RecoveryPlan {
  const checklist = Array.isArray(row.checklist)
    ? (row.checklist as unknown[])
        .map((item) => (item && typeof item === "object" && typeof (item as { task?: unknown }).task === "string"
          ? { task: (item as { task: string }).task }
          : null))
        .filter((t): t is RecoveryTask => t !== null)
    : [];

  return {
    id: row.id,
    user_id: row.user_id,
    created_at: row.created_at,
    source: row.source,
    trigger_reason: row.trigger_reason,
    baseline_energy_score: row.baseline_energy_score,
    baseline_mood: row.baseline_mood,
    focus_areas: row.focus_areas ?? [],
    summary: row.summary,
    checklist,
  };
}

export async function getLatestRecoveryPlan(): Promise<RecoveryPlan | null> {
  const userId = await requireUserId();
  const { data, error } = await supabaseAdmin
    .from("recovery_plans")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  return data ? rowToPlan(data) : null;
}

async function persistPlan(input: {
  userId: string;
  content: RecoveryPlanContent;
  source: "ai" | "rule_based";
  triggerReason: string;
  baselineEnergyScore: number | null;
  baselineMood: string | null;
}): Promise<RecoveryPlan> {
  const { data, error } = await supabaseAdmin
    .from("recovery_plans")
    .insert({
      user_id: input.userId,
      source: input.source,
      trigger_reason: input.triggerReason,
      baseline_energy_score: input.baselineEnergyScore,
      baseline_mood: input.baselineMood,
      focus_areas: input.content.focus_areas,
      summary: input.content.summary,
      checklist: input.content.checklist,
    })
    .select("*")
    .single();
  if (error) throw error;
  return rowToPlan(data);
}

// Deterministic, tanpa AI, selalu berhasil -- lapisan fallback terakhir kalau
// Gemini tidak tersedia DAN belum ada plan sama sekali untuk pengguna ini.
function ruleBasedRecoveryPlan(baseline: {
  sleep_quality: number;
  stress_level: number;
  productivity: number;
  energy_score: number;
}): RecoveryPlanContent {
  const checklist: RecoveryTask[] = [];
  const focus_areas: string[] = [];

  if (baseline.stress_level >= 4) {
    checklist.push({ task: "Latihan napas 5 menit" });
    focus_areas.push("Manajemen Stres");
  }
  if (baseline.sleep_quality <= 2) {
    checklist.push({ task: "Tidur sebelum jam 23:00" });
    focus_areas.push("Kualitas Tidur");
  }
  if (baseline.productivity <= 2) {
    checklist.push({ task: "Fokus 1 tugas prioritas pagi ini" });
    focus_areas.push("Produktivitas");
  }
  if (baseline.energy_score < 40) {
    checklist.push({ task: "Jalan kaki 10 menit" });
    if (!focus_areas.includes("Energi Harian")) focus_areas.push("Energi Harian");
  }

  // Baseline habit yang selalu relevan, plus jaga minimal 3 item.
  checklist.push({ task: "Minum 8 gelas air putih" });
  if (checklist.length < 3) checklist.push({ task: "Istirahat 5 menit tiap jam" });
  if (focus_areas.length === 0) focus_areas.push("Keseimbangan Harian");

  const weakestLabel = focus_areas[0];
  const summary = `Fokus pemulihanmu saat ini: ${weakestLabel.toLowerCase()}. Coba jalankan checklist di bawah secara konsisten -- perubahan kecil yang rutin lebih efektif daripada perubahan besar sesekali.`;

  return {
    summary,
    focus_areas: focus_areas.slice(0, 4),
    checklist: checklist.slice(0, 5),
  };
}

// Pure, tidak menyentuh DB/AI -- gerbang murah yang dicek di setiap Home load.
// Hanya kalau ini true baru kita panggil AI (atau rule-based) dan tulis row baru.
function shouldRegeneratePlan(
  latestPlan: RecoveryPlan | null,
  recentMoodLogs: MoodLog[],
  latestAssessment: Assessment | null
): { regenerate: boolean; reason: string | null } {
  if (!latestPlan) return { regenerate: true, reason: "no_existing_plan" };

  const planAgeMs = Date.now() - new Date(latestPlan.created_at).getTime();
  if (planAgeMs < COOLDOWN_MS) return { regenerate: false, reason: null };

  if (latestAssessment && new Date(latestAssessment.created_at) > new Date(latestPlan.created_at)) {
    return { regenerate: true, reason: "new_assessment" };
  }

  if (planAgeMs > STALE_DAYS * 24 * 60 * 60 * 1000) {
    return { regenerate: true, reason: "stale_14d" };
  }

  if (recentMoodLogs.length < MIN_MOOD_LOGS_FOR_SIGNAL) {
    return { regenerate: false, reason: null };
  }

  const withEnergy = recentMoodLogs.filter((m): m is MoodLog & { energy_score: number } => m.energy_score != null);
  const recent = withEnergy.slice(-7);

  if (recent.length && latestPlan.baseline_energy_score != null) {
    const avgEnergy = recent.reduce((a, m) => a + m.energy_score, 0) / recent.length;
    if (Math.abs(avgEnergy - latestPlan.baseline_energy_score) >= ENERGY_DRIFT_THRESHOLD) {
      return { regenerate: true, reason: "energy_drift" };
    }
  }

  const lastFew = recent.slice(-4);
  if (lastFew.length >= 3) {
    const isDecreasing = lastFew.every((m, i) => i === 0 || m.energy_score <= lastFew[i - 1].energy_score);
    const latest = lastFew[lastFew.length - 1].energy_score;
    if (
      isDecreasing &&
      latestPlan.baseline_energy_score != null &&
      latestPlan.baseline_energy_score - latest >= NEGATIVE_TREND_DROP
    ) {
      return { regenerate: true, reason: "negative_trend" };
    }
  }

  return { regenerate: false, reason: null };
}

async function recentJournalSignal(): Promise<JournalScores | null> {
  const entries = await listJournalEntriesSince(7);
  const scores = entries.map((e) => e.ai_scores).filter((s): s is JournalScores => s != null);
  if (!scores.length) return null;
  const avg = (key: keyof JournalScores) => Math.round(scores.reduce((a, s) => a + s[key], 0) / scores.length);
  return {
    regulasi_emosi: avg("regulasi_emosi"),
    tekanan_kerja: avg("tekanan_kerja"),
    resiliensi: avg("resiliensi"),
  };
}

// Call site #1: onboarding. Di sini dijamin belum ada plan sama sekali.
export async function ensureRecoveryPlanForOnboarding(assessment: Assessment): Promise<RecoveryPlan> {
  const userId = await requireUserId();
  const baseline = {
    sleep_quality: assessment.sleep_quality,
    stress_level: assessment.stress_level,
    productivity: assessment.productivity,
    energy_score: assessment.energy_score,
  };

  try {
    const content = await generateRecoveryPlan({
      baseline,
      recentMoodLogs: [],
      recentJournalSignal: null,
      previousPlan: null,
      triggerReason: "onboarding_initial",
    });
    return persistPlan({
      userId,
      content,
      source: "ai",
      triggerReason: "onboarding_initial",
      baselineEnergyScore: assessment.energy_score,
      baselineMood: null,
    });
  } catch (err) {
    if (!(err instanceof RecoveryPlanGenerationError)) throw err;
    console.error("generateRecoveryPlan gagal saat onboarding, pakai rule-based:", err.message);
    const content = ruleBasedRecoveryPlan(baseline);
    return persistPlan({
      userId,
      content,
      source: "rule_based",
      triggerReason: "onboarding_ai_unavailable",
      baselineEnergyScore: assessment.energy_score,
      baselineMood: null,
    });
  }
}

// Call site #2: Home page saja. Insight tidak pernah memanggil ini -- regenerasi
// tetap eksklusif urusan Home, Insight hanya membaca plan yang sudah ada.
export async function ensureCurrentRecoveryPlan(): Promise<RecoveryPlan> {
  const userId = await requireUserId();
  const latestPlan = await getLatestRecoveryPlan();

  if (!latestPlan) {
    // Pengguna dari sebelum refactor ini, atau race langka. Kalau sudah pernah
    // onboarding (ada assessment), backfill plan pertamanya sekarang (lazy,
    // self-healing, tidak perlu skrip migrasi data).
    const assessment = await getLatestAssessment();
    if (assessment) return ensureRecoveryPlanForOnboarding(assessment);
    throw new Error("Belum ada assessment maupun recovery plan untuk user ini.");
  }

  const [recentMoodLogs, latestAssessment] = await Promise.all([
    getRecentMoodLogs(14),
    getLatestAssessment(),
  ]);

  const gate = shouldRegeneratePlan(latestPlan, recentMoodLogs, latestAssessment);
  if (!gate.regenerate) return latestPlan;

  const baseline = latestAssessment
    ? {
        sleep_quality: latestAssessment.sleep_quality,
        stress_level: latestAssessment.stress_level,
        productivity: latestAssessment.productivity,
        energy_score: latestAssessment.energy_score,
      }
    : {
        sleep_quality: 3,
        stress_level: 3,
        productivity: 3,
        energy_score: latestPlan.baseline_energy_score ?? 60,
      };

  const latestMood = recentMoodLogs.at(-1)?.mood ?? latestPlan.baseline_mood ?? null;

  try {
    const journalSignal = await recentJournalSignal();
    const content = await generateRecoveryPlan({
      baseline,
      recentMoodLogs: recentMoodLogs.map((m) => ({ log_date: m.log_date, mood: m.mood, energy_score: m.energy_score })),
      recentJournalSignal: journalSignal,
      previousPlan: { summary: latestPlan.summary, focus_areas: latestPlan.focus_areas, checklist: latestPlan.checklist },
      triggerReason: gate.reason ?? "unknown",
    });
    return persistPlan({
      userId,
      content,
      source: "ai",
      triggerReason: gate.reason ?? "unknown",
      baselineEnergyScore: baseline.energy_score,
      baselineMood: latestMood,
    });
  } catch (err) {
    if (!(err instanceof RecoveryPlanGenerationError)) throw err;
    // AI gagal, TAPI plan lama masih ada dan masih valid -- jangan turunkan ke
    // rule-based, cukup pakai plan lama lagi. Gate akan coba lagi di load berikutnya.
    console.error("generateRecoveryPlan gagal saat regenerasi, pakai plan lama:", err.message);
    return latestPlan;
  }
}
