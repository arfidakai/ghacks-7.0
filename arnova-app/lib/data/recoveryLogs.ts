import "server-only";
import { supabaseAdmin } from "../supabase/admin";
import { requireUserId } from "../auth";

export async function logRecoverySession(input: {
  session_type: "breathing" | "sound" | "guide";
  label?: string;
  duration_minutes?: number;
}): Promise<void> {
  const userId = await requireUserId();
  const { error } = await supabaseAdmin.from("recovery_logs").insert({
    user_id: userId,
    session_type: input.session_type,
    label: input.label ?? null,
    duration_minutes: input.duration_minutes ?? null,
  });
  if (error) throw error;
}
