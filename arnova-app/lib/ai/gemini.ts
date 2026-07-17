import "server-only";
import { GoogleGenerativeAI } from "@google/generative-ai";
import type { JournalScores, RecoveryTask } from "../data/types";

const apiKey = process.env.GEMINI_API_KEY;
const modelName = process.env.GEMINI_MODEL || "gemini-2.0-flash";

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

function getModel(jsonMode: boolean) {
  if (!genAI) return null;
  return genAI.getGenerativeModel({
    model: modelName,
    generationConfig: jsonMode ? { responseMimeType: "application/json" } : undefined,
  });
}

function clampScore(v: unknown): number {
  const n = typeof v === "number" ? v : Number(v);
  if (!Number.isFinite(n)) return 60;
  return Math.min(100, Math.max(0, Math.round(n)));
}

export type JournalAnalysis = { summary: string; scores: JournalScores };

const FALLBACK_ANALYSIS: JournalAnalysis = {
  summary:
    "Terima kasih sudah menulis jurnal hari ini. Teruskan kebiasaan refleksi ini — ia membantu kamu mengenali polamu sendiri. 🌱",
  scores: { regulasi_emosi: 60, tekanan_kerja: 50, resiliensi: 60 },
};

// AI supplemental untuk journal_entries.ai_summary & ai_scores — gagal diam-diam
// ke fallback supaya halaman Refleksi tetap jalan tanpa API key/kuota.
export async function analyzeJournalEntry(input: {
  kejadian: string;
  respons: string;
  tags: string[];
}): Promise<JournalAnalysis> {
  const model = getModel(true);
  if (!model) return FALLBACK_ANALYSIS;

  const prompt = `Kamu adalah asisten kesehatan mental yang suportif dan berbasis bukti. Analisis jurnal harian berikut (Bahasa Indonesia).

Kejadian: ${input.kejadian}
Respons pengguna: ${input.respons}
Tag emosi: ${input.tags.join(", ") || "(tidak ada)"}

Balas HANYA dalam JSON dengan bentuk persis:
{"summary": string (1-2 kalimat, suportif, bahasa Indonesia, sebut satu pola positif atau area perhatian), "scores": {"regulasi_emosi": number 0-100, "tekanan_kerja": number 0-100, "resiliensi": number 0-100}}`;

  try {
    const result = await model.generateContent(prompt);
    const parsed = JSON.parse(result.response.text());
    return {
      summary: String(parsed.summary ?? FALLBACK_ANALYSIS.summary),
      scores: {
        regulasi_emosi: clampScore(parsed.scores?.regulasi_emosi),
        tekanan_kerja: clampScore(parsed.scores?.tekanan_kerja),
        resiliensi: clampScore(parsed.scores?.resiliensi),
      },
    };
  } catch (err) {
    console.error("Gemini analyzeJournalEntry gagal, pakai fallback:", err);
    return FALLBACK_ANALYSIS;
  }
}

export type RecoveryPlanContent = {
  summary: string;
  focus_areas: string[];
  checklist: RecoveryTask[];
};

export class RecoveryPlanGenerationError extends Error {}

const GENERATE_TIMEOUT_MS = 10_000;

function clampString(v: unknown, fallback: string): string {
  const s = typeof v === "string" ? v.trim() : "";
  return s || fallback;
}

// Validasi + normalisasi ketat: caller (lib/data/recoveryPlans.ts) menentukan
// fallback mana yang dipakai berdasarkan apakah fungsi ini throw, jadi output
// yang lolos ke sini WAJIB berbentuk benar -- tidak boleh best-effort garbage.
function parseRecoveryPlanContent(raw: string): RecoveryPlanContent {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new RecoveryPlanGenerationError("Gemini mengembalikan JSON yang tidak valid");
  }

  const obj = parsed as Record<string, unknown>;
  const summary = clampString(obj.summary, "");
  if (!summary) throw new RecoveryPlanGenerationError("summary kosong dari Gemini");

  const focusAreasRaw = Array.isArray(obj.focus_areas) ? obj.focus_areas : [];
  const focus_areas = focusAreasRaw
    .filter((v): v is string => typeof v === "string" && v.trim().length > 0)
    .map((v) => v.trim())
    .slice(0, 4);
  if (focus_areas.length === 0) {
    throw new RecoveryPlanGenerationError("focus_areas kosong dari Gemini");
  }

  const checklistRaw = Array.isArray(obj.checklist) ? obj.checklist : [];
  const checklist: RecoveryTask[] = checklistRaw
    .map((item) => {
      if (typeof item === "string") return item;
      if (item && typeof item === "object" && typeof (item as { task?: unknown }).task === "string") {
        return (item as { task: string }).task;
      }
      return null;
    })
    .filter((task): task is string => !!task && task.trim().length > 0)
    .map((task) => ({ task: task.trim() }))
    .slice(0, 6);
  if (checklist.length < 3) {
    throw new RecoveryPlanGenerationError("checklist dari Gemini kurang dari 3 item");
  }

  return { summary, focus_areas, checklist };
}

// AI Personal Recovery Planner: satu-satunya sumber rekomendasi + checklist di
// seluruh aplikasi. Beda dari analyzeJournalEntry, fungsi ini SENGAJA tidak
// menelan error ke fallback string -- ia throw, supaya lib/data/recoveryPlans.ts
// bisa memilih antara "pakai plan lama" vs "generate rule-based" sesuai konteks
// pemanggilnya (lihat komentar di sana).
export async function generateRecoveryPlan(context: {
  baseline: {
    sleep_quality: number;
    stress_level: number;
    productivity: number;
    energy_score: number;
  };
  recentMoodLogs: { log_date: string; mood: string | null; energy_score: number | null }[];
  recentJournalSignal: JournalScores | null;
  previousPlan: RecoveryPlanContent | null;
  triggerReason: string;
}): Promise<RecoveryPlanContent> {
  const model = getModel(true);
  if (!model) {
    throw new RecoveryPlanGenerationError("GEMINI_API_KEY tidak diset");
  }

  const moodTrend = context.recentMoodLogs.length
    ? context.recentMoodLogs.map((m) => `${m.log_date}: mood=${m.mood ?? "-"} energi=${m.energy_score ?? "-"}`).join("; ")
    : "(belum ada catatan mood)";

  const journalSignal = context.recentJournalSignal
    ? `Rata-rata jurnal terbaru -- regulasi emosi: ${context.recentJournalSignal.regulasi_emosi}, tekanan kerja: ${context.recentJournalSignal.tekanan_kerja}, resiliensi: ${context.recentJournalSignal.resiliensi}.`
    : "Belum ada data jurnal.";

  const evolutionInstruction = context.previousPlan
    ? `Ini BUKAN rencana pertama pengguna. Rencana sebelumnya:
Ringkasan: ${context.previousPlan.summary}
Fokus: ${context.previousPlan.focus_areas.join(", ")}
Checklist: ${context.previousPlan.checklist.map((t) => t.task).join("; ")}

Alasan evaluasi ulang: ${context.triggerReason}. EVOLUSIKAN rencana ini -- pertahankan task yang masih relevan/berhasil, ubah atau ganti HANYA bagian yang perlu menyesuaikan kondisi baru. Jangan membuat rencana yang sepenuhnya berbeda kecuali kondisi memang berubah drastis.`
    : `Ini rencana PERTAMA untuk pengguna ini (baru selesai onboarding), belum ada riwayat sebelumnya.`;

  const prompt = `Kamu adalah "Personal Recovery Planner" -- AI perencana pemulihan mental & produktivitas yang suportif, berbasis bukti, dan personal. Tugasmu membuat SATU Recovery Plan yang koheren untuk pengguna, dalam Bahasa Indonesia.

Data onboarding (skala 1-5, kecuali energy_score 0-100): kualitas tidur=${context.baseline.sleep_quality}, tingkat stres=${context.baseline.stress_level}, produktivitas=${context.baseline.productivity}, skor energi=${context.baseline.energy_score}.
Tren mood harian terbaru: ${moodTrend}
${journalSignal}

${evolutionInstruction}

Balas HANYA dalam JSON dengan bentuk persis:
{"summary": string (1-2 kalimat rekomendasi utama, hangat dan personal, boleh 1 emoji), "focus_areas": string[] (2-4 area fokus singkat, contoh: "Kualitas Tidur", "Manajemen Stres"), "checklist": string[] (3-5 tugas harian konkret dan singkat, dalam Bahasa Indonesia, dapat dikerjakan hari ini)}`;

  const generate = model.generateContent(prompt);
  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new RecoveryPlanGenerationError("Gemini timeout")), GENERATE_TIMEOUT_MS)
  );

  try {
    const result = await Promise.race([generate, timeout]);
    return parseRecoveryPlanContent(result.response.text());
  } catch (err) {
    if (err instanceof RecoveryPlanGenerationError) throw err;
    console.error("Gemini generateRecoveryPlan gagal:", err);
    throw new RecoveryPlanGenerationError(
      err instanceof Error ? err.message : "Gemini generateRecoveryPlan gagal"
    );
  }
}
