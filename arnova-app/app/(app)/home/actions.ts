"use server";

import { revalidatePath } from "next/cache";
import { upsertTodayMoodLog } from "@/lib/data/moodLogs";
import type { ChecklistItem } from "@/lib/data/types";

export async function setMoodAction(mood: string, energy_score: number) {
  await upsertTodayMoodLog({ mood, energy_score });
  revalidatePath("/home");
}

export async function setChecklistAction(checklist: ChecklistItem[]) {
  await upsertTodayMoodLog({ checklist });
  revalidatePath("/home");
}
