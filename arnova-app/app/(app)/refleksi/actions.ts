"use server";

import { revalidatePath } from "next/cache";
import { createJournalEntry } from "@/lib/data/journal";

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
