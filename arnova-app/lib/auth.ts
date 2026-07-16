import "server-only";
import { redirect } from "next/navigation";
import { createClient } from "./supabase/server";

export async function getCurrentUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

// Dipakai di semua lib/data/*.ts sebagai pengganti DEMO_USER_ID: ambil id user
// yang sedang login dari sesi Supabase, redirect ke /login kalau belum login.
export async function requireUserId(): Promise<string> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user.id;
}
