import "server-only";
import { supabaseAdmin } from "../supabase/admin";
import { requireUserId } from "../auth";
import { analyzeJournalEntry } from "../ai/gemini";
import type { JournalEntry } from "./types";

export async function listJournalEntries(limit = 5): Promise<JournalEntry[]> {
  const userId = await requireUserId();
  const { data, error } = await supabaseAdmin
    .from("journal_entries")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data ?? []) as JournalEntry[];
}

export async function listJournalEntriesSince(days: number): Promise<JournalEntry[]> {
  const userId = await requireUserId();
  const since = new Date();
  since.setDate(since.getDate() - (days - 1));

  const { data, error } = await supabaseAdmin
    .from("journal_entries")
    .select("*")
    .eq("user_id", userId)
    .gte("entry_date", since.toISOString().slice(0, 10))
    .order("entry_date", { ascending: true });
  if (error) throw error;
  return (data ?? []) as JournalEntry[];
}

export async function createJournalEntry(input: {
  kejadian: string;
  respons: string;
  tags: string[];
}): Promise<JournalEntry> {
  const userId = await requireUserId();
  const analysis = await analyzeJournalEntry(input);

  const { data, error } = await supabaseAdmin
    .from("journal_entries")
    .insert({
      user_id: userId,
      kejadian: input.kejadian,
      respons: input.respons,
      tags: input.tags,
      ai_summary: analysis.summary,
      ai_scores: analysis.scores,
    })
    .select("*")
    .single();
  if (error) throw error;
  return data as JournalEntry;
}
