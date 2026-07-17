import { getProfile } from "@/lib/data/profile";
import { getTodayMoodLog, getRecentMoodLogs } from "@/lib/data/moodLogs";
import { getLatestAssessment } from "@/lib/data/assessments";
import { ensureCurrentRecoveryPlan } from "@/lib/data/recoveryPlans";
import { formatIndonesianDateLabel } from "@/lib/date-id";
import { HomeClient } from "./HomeClient";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [profile, todayLog, recentLogs, latestAssessment, plan] = await Promise.all([
    getProfile(),
    getTodayMoodLog(),
    getRecentMoodLogs(7),
    getLatestAssessment(),
    ensureCurrentRecoveryPlan(),
  ]);

  const energyScore = todayLog?.energy_score ?? latestAssessment?.energy_score ?? 70;

  const previousLog = recentLogs.filter((l) => l.log_date !== todayLog?.log_date).at(-1);
  const energyDelta =
    previousLog?.energy_score != null ? energyScore - previousLog.energy_score : null;

  return (
    <HomeClient
      fullName={profile.full_name ?? "Kamu"}
      dateLabel={formatIndonesianDateLabel()}
      energyScore={energyScore}
      energyDelta={energyDelta}
      mood={todayLog?.mood ?? null}
      checklist={
        todayLog?.checklist?.length
          ? todayLog.checklist
          : plan.checklist.map((t) => ({ task: t.task, done: false }))
      }
      recommendation={plan.summary}
    />
  );
}
