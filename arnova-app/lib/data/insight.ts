import "server-only";
import { getRecentMoodLogs } from "./moodLogs";
import { getLatestAssessment } from "./assessments";
import { listJournalEntriesSince } from "./journal";
import { lastNDateKeys, weekdayShortLabel } from "../date-id";
import { weeklySummary } from "../ai/gemini";
import type { JournalScores } from "./types";

export type InsightViewModel = {
  metrics: { energy: number; productivity: number; burnoutRisk: number };
  moodByDay: { day: string; value: number }[];
  activeDays: number;
  energyChange: number | null;
  aiSummary: string;
};

function avg(nums: number[]): number | null {
  if (!nums.length) return null;
  return Math.round(nums.reduce((a, b) => a + b, 0) / nums.length);
}

export async function getInsightViewModel(): Promise<InsightViewModel> {
  const [moodLogs, latestAssessment, journalEntries] = await Promise.all([
    getRecentMoodLogs(7),
    getLatestAssessment(),
    listJournalEntriesSince(7),
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

  const avgJournalScores: JournalScores | null = journalScores.length
    ? {
        regulasi_emosi: avg(journalScores.map((s) => s.regulasi_emosi))!,
        tekanan_kerja: avg(journalScores.map((s) => s.tekanan_kerja))!,
        resiliensi: avg(journalScores.map((s) => s.resiliensi))!,
      }
    : null;

  const aiSummary = await weeklySummary({ moodValsByDay: moodByDay, avgJournalScores });

  return {
    metrics: { energy, productivity, burnoutRisk },
    moodByDay,
    activeDays,
    energyChange,
    aiSummary,
  };
}
