import "server-only";
import { supabaseAdmin } from "../supabase/admin";
import { requireUserId } from "../auth";

export async function deleteMyAccount(): Promise<void> {
  const userId = await requireUserId();

  const childTables = [
    "emergency_contacts",
    "recovery_logs",
    "recovery_plans",
    "journal_entries",
    "mood_logs",
    "assessments",
  ];

  for (const table of childTables) {
    const { error } = await supabaseAdmin.from(table).delete().eq("user_id", userId);
    if (error) throw error;
  }

  const { error: profileError } = await supabaseAdmin.from("profiles").delete().eq("id", userId);
  if (profileError) throw profileError;

  const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(userId);
  if (authError) throw authError;
}
