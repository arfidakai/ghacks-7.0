"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { F } from "@/lib/design/tokens";
import { createClient } from "@/lib/supabase/client";

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 48 48">
      <path fill="#FFC107" d="M43.61 20.08H42V20H24v8h11.3C33.66 32.65 29.28 36 24 36c-6.63 0-12-5.37-12-12s5.37-12 12-12c3.06 0 5.85 1.15 7.96 3.04l5.66-5.66C34.14 6.09 29.32 4 24 4 12.96 4 4 12.96 4 24s8.96 20 20 20 20-8.96 20-20c0-1.34-.14-2.65-.39-3.92z" />
      <path fill="#FF3D00" d="M6.31 14.69l6.57 4.82C14.66 15.99 18.98 13 24 13c3.06 0 5.85 1.15 7.96 3.04l5.66-5.66C34.14 6.09 29.32 4 24 4c-7.7 0-14.36 4.34-17.69 10.69z" />
      <path fill="#4CAF50" d="M24 44c5.17 0 9.86-1.98 13.4-5.2l-6.19-5.24C29.15 35.09 26.7 36 24 36c-5.26 0-9.62-3.32-11.28-7.95l-6.53 5.03C9.58 39.55 16.23 44 24 44z" />
      <path fill="#1976D2" d="M43.61 20.08H42V20H24v8h11.3c-.79 2.24-2.26 4.15-4.09 5.56l6.19 5.24C40.99 36.44 44 30.72 44 24c0-1.34-.14-2.65-.39-3.92z" />
    </svg>
  );
}

export function LoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState<"password" | "google" | null>(null);
  const [error, setError] = useState<string | null>(
    searchParams.get("error") === "auth" ? "Gagal login, coba lagi." : null
  );

  const canSubmit = email.trim().length > 0 && password.trim().length > 0 && busy === null;

  const signInWithPassword = async () => {
    if (!canSubmit) return;
    setError(null);
    setBusy("password");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setBusy(null);
    if (error) {
      setError("Email atau password salah.");
      return;
    }
    router.push("/entry");
  };

  const signInWithGoogle = async () => {
    setError(null);
    setBusy("google");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) {
      setBusy(null);
      setError("Gagal menghubungi Google, coba lagi.");
    }
    // Sukses -> browser langsung redirect ke Google, tidak perlu setBusy(null) di sini.
  };

  return (
    <div className="flex-1 min-h-screen bg-gradient-to-b from-[#F3F8FF] via-[#EAF3FF] to-[#CFE3FB] px-7 pt-14 pb-8 flex flex-col">
      <Image
        src="/logo-arnova.png"
        alt="Arnova Healthy.AI"
        width={1398}
        height={505}
        priority
        style={{ width: 180, height: "auto" }}
      />

      <div className="mt-10 flex flex-col gap-6">
        <div>
          <label className="text-[15px] font-bold text-[#1E2A3A]" style={{ fontFamily: F.body }}>
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="mt-2.5 w-full rounded-2xl bg-white border border-transparent px-5 py-4 text-[15px] text-[#2C3E50] placeholder-[#A0AEC0] shadow-sm outline-none focus:border-[#3A86F4] transition-colors"
            style={{ fontFamily: F.body }}
          />
        </div>

        <div>
          <label className="text-[15px] font-bold text-[#1E2A3A]" style={{ fontFamily: F.body }}>
            Password
          </label>
          <div className="mt-2.5 relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-2xl bg-white border border-transparent px-5 py-4 pr-12 text-[15px] text-[#2C3E50] placeholder-[#A0AEC0] shadow-sm outline-none focus:border-[#3A86F4] transition-colors"
              style={{ fontFamily: F.body }}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] cursor-pointer bg-transparent border-none"
              aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
            >
              {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
            </button>
          </div>
        </div>

        {error && (
          <p className="text-[13px] font-semibold text-[#E53E3E] text-center -mt-2" style={{ fontFamily: F.body }}>
            {error}
          </p>
        )}

        <button
          onClick={signInWithPassword}
          disabled={!canSubmit}
          className={`w-full py-4 rounded-2xl border-none text-[16px] font-bold text-white transition-all duration-200 ${
            canSubmit
              ? "bg-gradient-to-r from-[#1C59DB] to-[#5B9EF0] shadow-lg shadow-[#3A86F4]/25 cursor-pointer active:scale-[0.99]"
              : "bg-[#A9C4EE] cursor-default"
          }`}
          style={{ fontFamily: F.body }}
        >
          {busy === "password" ? "Masuk..." : "Sign In"}
        </button>

        <button type="button" className="text-center text-[15px] font-bold text-[#1C59DB] bg-transparent border-none cursor-pointer" style={{ fontFamily: F.body }}>
          Forgot Password?
        </button>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-[#B9C6DA]" />
          <span className="text-[14px] text-[#6B7A90]" style={{ fontFamily: F.body }}>Or</span>
          <div className="flex-1 h-px bg-[#B9C6DA]" />
        </div>

        <button
          onClick={signInWithGoogle}
          disabled={busy !== null}
          type="button"
          className="w-full py-4 rounded-2xl bg-white shadow-sm flex items-center justify-center gap-3 border-none cursor-pointer active:scale-[0.99] transition-transform disabled:opacity-60"
        >
          <GoogleIcon />
          <span className="text-[15px] font-semibold text-[#1C59DB]" style={{ fontFamily: F.body }}>
            {busy === "google" ? "Menghubungkan..." : "Continue with Google"}
          </span>
        </button>

        <p className="text-center text-[14.5px] text-[#4A5568]" style={{ fontFamily: F.body }}>
          Don&apos;t have an account?{" "}
          <button
            onClick={signInWithGoogle}
            disabled={busy !== null}
            type="button"
            className="text-[#1C59DB] font-bold bg-transparent border-none cursor-pointer p-0"
            style={{ fontFamily: F.body }}
          >
            Sign up
          </button>
        </p>
      </div>

      <div className="flex-1" />
      <p className="text-center text-[13px] text-[#8896A8]" style={{ fontFamily: F.body }}>
        © 2026 Arnova.ai
      </p>
    </div>
  );
}
