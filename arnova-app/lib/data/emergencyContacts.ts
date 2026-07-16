import "server-only";
import { supabaseAdmin } from "../supabase/admin";
import { requireUserId } from "../auth";
import type { EmergencyContact } from "./types";

export async function listEmergencyContacts(): Promise<EmergencyContact[]> {
  const userId = await requireUserId();
  const { data, error } = await supabaseAdmin
    .from("emergency_contacts")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: true });
  if (error) throw error;
  return (data ?? []) as EmergencyContact[];
}

export async function addEmergencyContact(input: {
  name: string;
  phone: string;
  relation?: string;
}): Promise<EmergencyContact> {
  const userId = await requireUserId();
  const { data, error } = await supabaseAdmin
    .from("emergency_contacts")
    .insert({
      user_id: userId,
      name: input.name,
      phone: input.phone,
      relation: input.relation ?? null,
    })
    .select("*")
    .single();
  if (error) throw error;
  return data as EmergencyContact;
}

export async function deleteEmergencyContact(id: string): Promise<void> {
  const userId = await requireUserId();
  const { error } = await supabaseAdmin
    .from("emergency_contacts")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);
  if (error) throw error;
}
