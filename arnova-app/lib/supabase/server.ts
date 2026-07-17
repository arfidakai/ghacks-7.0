import "server-only";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

// Client yang jalan di Server Components/Actions/Route Handlers: baca sesi user
// dari cookie, dan menghormati RLS (beda dari supabaseAdmin di ./admin.ts yang
// pakai service-role key dan bypass RLS).
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Dipanggil dari Server Component (bukan Action/Route Handler) -> cookie
            // tidak bisa ditulis di sini. Aman diabaikan karena proxy.ts me-refresh
            // sesi di setiap request.
          }
        },
      },
    }
  );
}
