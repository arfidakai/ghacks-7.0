"use server";

import { revalidatePath } from "next/cache";
import { addEmergencyContact, deleteEmergencyContact } from "@/lib/data/emergencyContacts";

export async function addEmergencyContactAction(input: {
  name: string;
  phone: string;
  relation?: string;
}) {
  await addEmergencyContact(input);
  revalidatePath("/profil");
}

export async function deleteEmergencyContactAction(id: string) {
  await deleteEmergencyContact(id);
  revalidatePath("/profil");
}
