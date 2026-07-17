import "server-only";
import { supabaseAdmin } from "../supabase/admin";
import { requireUserId } from "../auth";
import type { Profile } from "./types";

export async function getProfile(): Promise<Profile> {
  const userId = await requireUserId();
  const { data, error } = await supabaseAdmin
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  if (error) throw error;
  return data as Profile;
}
