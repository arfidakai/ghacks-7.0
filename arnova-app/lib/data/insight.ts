import "server-only";
import { getRecentMoodLogs } from "./moodLogs";
import { getLatestAssessment } from "./assessments";
import { listJournalEntriesSince } from "./journal";
import { getLatestRecoveryPlan } from "./recoveryPlans";
import { lastNDateKeys, weekdayShortLabel } from "../date-id";
import type { JournalScores } from "./types";

const NO_PLAN_FALLBACK_SUMMARY =
  "Rencana pemulihanmu sedang disiapkan. Isi mood harian di Home supaya kami bisa mempersonalisasinya.";

export type InsightViewModel = {
  metrics: { energy: number; productivity: number; burnoutRisk: number };
  moodByDay: { day: string; value: number }[];
  activeDays: number;
  energyChange: number | null;
  planSummary: string;
  focusAreas: string[];
  checklistCompletionPct: number;
};

function avg(nums: number[]): number | null {
  if (!nums.length) return null;
  return Math.round(nums.reduce((a, b) => a + b, 0) / nums.length);
}

export async function getInsightViewModel(): Promise<InsightViewModel> {
  // Regenerasi plan tetap eksklusif urusan Home (ensureCurrentRecoveryPlan) --
  // Insight hanya membaca plan yang sudah ada, supaya "progress tracking"
  // selalu merujuk ke Recovery Plan yang sama dengan yang ditampilkan di Home.
  const [moodLogs, latestAssessment, journalEntries, plan] = await Promise.all([
    getRecentMoodLogs(7),
    getLatestAssessment(),
    listJournalEntriesSince(7),
    getLatestRecoveryPlan(),
  ]);

  const days = lastNDateKeys(7);
  const byDate = new Map(moodLogs.map((m) => [m.log_date, m]));
  const moodByDay = days.map((d) => ({
    day: weekdayShortLabel(d),
    value: byDate.get(d)?.energy_score ?? 0,
  }));

  const energyScores = moodLogs.map((m) => m.energy_score).filter((v): v is number => v != null);
  const energy = avg(energyScores) ?? latestAssessment?.energy_score ?? 70;
  const productivity = latestAssessment ? latestAssessment.productivity * 20 : 70;

  const journalScores = journalEntries
    .map((j) => j.ai_scores)
    .filter((v): v is JournalScores => v != null);
  const burnoutRisk = avg(journalScores.map((s) => s.tekanan_kerja)) ?? 34;

  const activeDays = moodLogs.length;
  const energyChange =
    energyScores.length >= 2 ? energyScores[energyScores.length - 1] - energyScores[0] : null;

  const checklistCounts = moodLogs.reduce(
    (acc, log) => {
      acc.total += log.checklist.length;
      acc.done += log.checklist.filter((t) => t.done).length;
      return acc;
    },
    { total: 0, done: 0 }
  );
  const checklistCompletionPct =
    checklistCounts.total > 0 ? Math.round((checklistCounts.done / checklistCounts.total) * 100) : 0;

  return {
    metrics: { energy, productivity, burnoutRisk },
    moodByDay,
    activeDays,
    energyChange,
    planSummary: plan?.summary ?? NO_PLAN_FALLBACK_SUMMARY,
    focusAreas: plan?.focus_areas ?? [],
    checklistCompletionPct,
  };
}
