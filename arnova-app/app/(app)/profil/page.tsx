import { getProfile } from "@/lib/data/profile";
import { getTodayMoodLog } from "@/lib/data/moodLogs";
import { getLatestAssessment } from "@/lib/data/assessments";
import { listJournalEntriesSince } from "@/lib/data/journal";
import { listEmergencyContacts } from "@/lib/data/emergencyContacts";
import { ProfilClient } from "./ProfilClient";

export const dynamic = "force-dynamic";

export default async function ProfilPage() {
  const [profile, todayLog, latestAssessment, recentJournal, contacts] = await Promise.all([
    getProfile(),
    getTodayMoodLog(),
    getLatestAssessment(),
    listJournalEntriesSince(7),
    listEmergencyContacts(),
  ]);

  const energyScore = todayLog?.energy_score ?? latestAssessment?.energy_score ?? 70;

  const journalScores = recentJournal.map((j) => j.ai_scores).filter((s) => s != null);
  const burnoutRisk = journalScores.length
    ? Math.round(journalScores.reduce((sum, s) => sum + s.tekanan_kerja, 0) / journalScores.length)
    : 34;

  return (
    <ProfilClient profile={profile} energyScore={energyScore} burnoutRisk={burnoutRisk} contacts={contacts} />
  );
}
