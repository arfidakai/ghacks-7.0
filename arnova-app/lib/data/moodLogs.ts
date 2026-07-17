import "server-only";
import { supabaseAdmin } from "../supabase/admin";
import { requireUserId } from "../auth";
import { todayDateKey } from "../date-id";
import type { ChecklistItem, MoodLog } from "./types";

// Last-resort literal kalau bahkan tidak ada Recovery Plan untuk diseed (lihat
// upsertTodayMoodLog) -- seharusnya nyaris tidak pernah kepakai karena
// ensureCurrentRecoveryPlan/ensureRecoveryPlanForOnboarding selalu menjamin
// ada plan sebelum Home bisa diakses.
export const DEFAULT_CHECKLIST: ChecklistItem[] = [
  { task: "Minum 8 gelas air putih", done: false },
  { task: "Istirahat 5 menit tiap jam", done: false },
  { task: "Jalan kaki 10 menit", done: false },
  { task: "Tidur sebelum jam 23:00", done: false },
];

export async function getTodayMoodLog(): Promise<MoodLog | null> {
  const userId = await requireUserId();
  const { data, error } = await supabaseAdmin
    .from("mood_logs")
    .select("*")
    .eq("user_id", userId)
    .eq("log_date", todayDateKey())
    .maybeSingle();
  if (error) throw error;
  return data as MoodLog | null;
}

export async function getRecentMoodLogs(days = 7): Promise<MoodLog[]> {
  const userId = await requireUserId();
  const since = new Date();
  since.setDate(since.getDate() - (days - 1));

  const { data, error } = await supabaseAdmin
    .from("mood_logs")
    .select("*")
    .eq("user_id", userId)
    .gte("log_date", since.toISOString().slice(0, 10))
    .order("log_date", { ascending: true });
  if (error) throw error;
  return (data ?? []) as MoodLog[];
}

export async function upsertTodayMoodLog(patch: {
  mood?: string;
  energy_score?: number;
  checklist?: ChecklistItem[];
  // Dipakai saat hari ini belum punya row & patch tidak membawa checklist
  // eksplisit (mis. setMoodAction) -- diisi caller dari Recovery Plan aktif,
  // supaya checklist tidak diam-diam jatuh balik ke DEFAULT_CHECKLIST lama.
  seedChecklist?: ChecklistItem[];
}): Promise<MoodLog> {
  const userId = await requireUserId();
  const existing = await getTodayMoodLog();

  const { data, error } = await supabaseAdmin
    .from("mood_logs")
    .upsert(
      {
        user_id: userId,
        log_date: todayDateKey(),
        mood: patch.mood ?? existing?.mood ?? null,
        energy_score: patch.energy_score ?? existing?.energy_score ?? null,
        checklist: patch.checklist ?? existing?.checklist ?? patch.seedChecklist ?? DEFAULT_CHECKLIST,
      },
      { onConflict: "user_id,log_date" }
    )
    .select("*")
    .single();
  if (error) throw error;
  return data as MoodLog;
}
