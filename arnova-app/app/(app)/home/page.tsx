import { getProfile } from "@/lib/data/profile";
import { getTodayMoodLog, getRecentMoodLogs, DEFAULT_CHECKLIST } from "@/lib/data/moodLogs";
import { getLatestAssessment } from "@/lib/data/assessments";
import { homeRecommendation } from "@/lib/ai/gemini";
import { formatIndonesianDateLabel } from "@/lib/date-id";
import { HomeClient } from "./HomeClient";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [profile, todayLog, recentLogs, latestAssessment] = await Promise.all([
    getProfile(),
    getTodayMoodLog(),
    getRecentMoodLogs(7),
    getLatestAssessment(),
  ]);

  const energyScore = todayLog?.energy_score ?? latestAssessment?.energy_score ?? 70;

  const previousLog = recentLogs.filter((l) => l.log_date !== todayLog?.log_date).at(-1);
  const energyDelta =
    previousLog?.energy_score != null ? energyScore - previousLog.energy_score : null;

  const recommendation = await homeRecommendation({
    recentEnergyScores: recentLogs.map((l) => l.energy_score).filter((v): v is number => v != null),
    latestMood: todayLog?.mood ?? null,
  });

  return (
    <HomeClient
      fullName={profile.full_name ?? "Kamu"}
      dateLabel={formatIndonesianDateLabel()}
      energyScore={energyScore}
      energyDelta={energyDelta}
      mood={todayLog?.mood ?? null}
      checklist={todayLog?.checklist?.length ? todayLog.checklist : DEFAULT_CHECKLIST}
      recommendation={recommendation}
    />
  );
}
