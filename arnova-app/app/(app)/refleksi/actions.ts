"use server";

import { revalidatePath } from "next/cache";
import { createJournalEntry } from "@/lib/data/journal";
import { logRecoverySession } from "@/lib/data/recoveryLogs";

export async function createJournalEntryAction(input: {
  kejadian: string;
  respons: string;
  tags: string[];
}) {
  const entry = await createJournalEntry(input);
  revalidatePath("/refleksi");
  revalidatePath("/insight");
  return entry;
}

export async function logRecoverySessionAction(input: {
  session_type: "breathing" | "sound" | "guide";
  label?: string;
  duration_minutes?: number;
}) {
  await logRecoverySession(input);
}
