"use server";

import { revalidatePath } from "next/cache";
import { addEmergencyContact, deleteEmergencyContact } from "@/lib/data/emergencyContacts";
import { updateProfile } from "@/lib/data/profile";
import { deleteMyAccount } from "@/lib/data/account";

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

export async function updateProfileAction(input: {
  full_name?: string;
  occupation?: string;
  city?: string;
}) {
  await updateProfile(input);
  revalidatePath("/profil");
  revalidatePath("/home");
}

export async function deleteAccountAction() {
  await deleteMyAccount();
}
