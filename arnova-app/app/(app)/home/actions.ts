"use server";

import { revalidatePath } from "next/cache";
import { upsertTodayMoodLog } from "@/lib/data/moodLogs";
import { getLatestRecoveryPlan } from "@/lib/data/recoveryPlans";
import type { ChecklistItem } from "@/lib/data/types";

export async function setMoodAction(mood: string, energy_score: number) {
  // Kalau ini aksi pertama hari ini (belum ada row), upsertTodayMoodLog perlu
  // tahu checklist dari Recovery Plan aktif -- tanpa ini, hari baru bisa diam-diam
  // ke-seed dari DEFAULT_CHECKLIST lama karena patch di sini tidak bawa checklist.
  const plan = await getLatestRecoveryPlan();
  const seedChecklist: ChecklistItem[] | undefined = plan?.checklist.map((t) => ({
    task: t.task,
    done: false,
  }));
  await upsertTodayMoodLog({ mood, energy_score, seedChecklist });
  revalidatePath("/home");
}

export async function setChecklistAction(checklist: ChecklistItem[]) {
  await upsertTodayMoodLog({ checklist });
  revalidatePath("/home");
}
