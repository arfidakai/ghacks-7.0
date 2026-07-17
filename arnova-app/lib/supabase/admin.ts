import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Service-role client: dipakai server-only (Server Components/Actions) untuk
// bypass RLS. lib/data/*.ts tetap scope query-nya lewat userId dari sesi asli
// (lib/auth.ts), jadi bypass RLS di sini bukan lubang keamanan per-user.
// Dibuat lazy (bukan di top-level module scope) supaya import file ini tidak
// meledak saat `next build` menelusuri module graph sebelum .env.local diisi.
let cached: SupabaseClient | null = null;

function getSupabaseAdmin(): SupabaseClient {
  if (cached) return cached;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY belum di-set di .env.local"
    );
  }

  cached = createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  return cached;
}

export const supabaseAdmin = new Proxy({} as SupabaseClient, {
  get(_target, prop, receiver) {
    return Reflect.get(getSupabaseAdmin(), prop, receiver);
  },
});
