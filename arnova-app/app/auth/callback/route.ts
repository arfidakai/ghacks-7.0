import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Tujuan redirect Supabase OAuth (Google) setelah user approve consent screen.
// Tukar `code` dengan sesi, lalu lempar ke /entry buat nentuin /home vs /onboarding.
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}/entry`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth`);
}
