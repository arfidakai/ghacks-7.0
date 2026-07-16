import "server-only";
import { supabaseAdmin } from "../supabase/admin";
import { requireUserId } from "../auth";
import type { Assessment } from "./types";

// sleep_quality & productivity naik = energi naik; stress_level naik = energi turun.
// Range mentah 3..15 dipetakan ke 0..100.
export function computeEnergyScore(
  sleep_quality: number,
  stress_level: number,
  productivity: number
): number {
  const raw = sleep_quality + (6 - stress_level) + productivity;
  return Math.round(((raw - 3) / 12) * 100);
}

export async function getLatestAssessment(): Promise<Assessment | null> {
  const userId = await requireUserId();
  const { data, error } = await supabaseAdmin
    .from("assessments")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  return data as Assessment | null;
}

export async function createAssessment(input: {
  sleep_quality: number;
  stress_level: number;
  productivity: number;
}): Promise<Assessment> {
  const userId = await requireUserId();
  const energy_score = computeEnergyScore(
    input.sleep_quality,
    input.stress_level,
    input.productivity
  );

  const { data, error } = await supabaseAdmin
    .from("assessments")
    .insert({ user_id: userId, ...input, energy_score })
    .select("*")
    .single();
  if (error) throw error;
  return data as Assessment;
}
