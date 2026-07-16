"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ArrowRight } from "lucide-react";
import { C, F } from "@/lib/design/tokens";
import { Tag } from "@/lib/design/primitives";
import { submitAssessment } from "./actions";

const qs = [
  {
    q: "Seberapa baik kualitas tidurmu semalam?",
    hint: "1 = Sangat buruk · 5 = Luar biasa",
    labels: ["Buruk", "Kurang", "Cukup", "Baik", "Luar biasa"],
  },
  {
    q: "Seberapa tinggi tingkat stresmu saat ini?",
    hint: "1 = Tenang · 5 = Sangat tertekan",
    labels: ["Tenang", "Ringan", "Sedang", "Tinggi", "Sangat tinggi"],
  },
  {
    q: "Seberapa produktif kamu merasa akhir-akhir ini?",
    hint: "1 = Tidak produktif · 5 = Sangat produktif",
    labels: ["Stagnan", "Lesu", "Cukup", "Aktif", "Luar biasa"],
  },
];

const TOTAL = 1 + qs.length;

export function OnboardingClient() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([null, null, null]);
  const [isPending, startTransition] = useTransition();

  const handleFinish = () => {
    const [sleep_quality, stress_level, productivity] = answers as number[];
    startTransition(() => {
      submitAssessment({ sleep_quality, stress_level, productivity });
    });
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* progress dots */}
      <div style={{ display: "flex", justifyContent: "center", gap: 6, padding: "20px 0 18px" }}>
        {Array.from({ length: TOTAL }).map((_, i) => (
          <motion.div
            key={i}
            animate={{ width: i === step ? 28 : 7, background: i <= step ? C.sage : C.border }}
            transition={{ duration: 0.3 }}
            style={{ height: 5, borderRadius: 3 }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 0 ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            style={{ flex: 1, display: "flex", flexDirection: "column", padding: "0 22px" }}
          >
            <div style={{ display: "flex", justifyContent: "center", margin: "8px 0 28px" }}>
              <Image
                src="/logo-arnova.png"
                alt="Arnova Healthy.AI"
                width={1398}
                height={505}
                priority
                style={{ width: 220, height: "auto" }}
              />
            </div>

            <div style={{ marginBottom: 4 }}>
              <Tag color={C.sage} bg={C.sagePale} text="Mental Wellness · Produktivitas" />
            </div>
            <h1
              style={{
                fontFamily: F.display,
                fontSize: 37,
                fontWeight: 400,
                color: C.ink,
                lineHeight: 1.18,
                marginTop: 10,
              }}
            >
              Selamat datang
              <br />
              di <em>Healthy.</em>
            </h1>
            <p style={{ fontFamily: F.body, fontSize: 15.5, color: C.inkMid, marginTop: 12, lineHeight: 1.65 }}>
              Teman perjalanan kesehatan mental & produktivitasmu. Mulai hari ini, lebih baik dari kemarin.
            </p>

            <div style={{ marginTop: 26, display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { icon: "📊", t: "Lacak energi mental", sub: "Pantau skor energi & mood-mu setiap hari" },
                { icon: "🤖", t: "Insight personal dari AI", sub: "Rekomendasi yang disesuaikan dengan kondisimu" },
                { icon: "🌊", t: "Pulihkan diri dengan cepat", sub: "Latihan napas, suara alam, & panduan singkat" },
              ].map(({ icon, t, sub }) => (
                <div
                  key={t}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    background: C.card,
                    border: `1.5px solid ${C.border}`,
                    borderRadius: 16,
                    padding: "12px 14px",
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: C.sagePale,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 22,
                      flexShrink: 0,
                    }}
                  >
                    {icon}
                  </div>
                  <div>
                    <p style={{ fontFamily: F.body, fontSize: 15.5, fontWeight: 600, color: C.ink }}>{t}</p>
                    <p style={{ fontFamily: F.body, fontSize: 12.5, color: C.inkLight, marginTop: 2, lineHeight: 1.4 }}>{sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: 20,
                padding: "16px 18px",
                borderRadius: 16,
                background: `linear-gradient(135deg, ${C.sagePale} 0%, ${C.lavPale} 100%)`,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <span style={{ fontSize: 26 }}>✨</span>
              <p style={{ fontFamily: F.display, fontSize: 15, fontStyle: "italic", color: C.sageDark, lineHeight: 1.5 }}>
                Cukup 3 menit sehari untuk mulai memahami polamu.
              </p>
            </div>

            <div style={{ flex: 1, minHeight: 16 }} />
            <button
              onClick={() => setStep(1)}
              style={{
                width: "100%",
                padding: "15px 0",
                borderRadius: 16,
                border: "none",
                background: `linear-gradient(135deg, ${C.sage} 0%, ${C.sageDark} 100%)`,
                color: "#fff",
                fontFamily: F.body,
                fontSize: 16.5,
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                cursor: "pointer",
                boxShadow: `0 6px 20px rgba(95,138,101,0.38)`,
                marginBottom: 24,
              }}
            >
              Mulai Screening <ArrowRight size={16} />
            </button>
          </motion.div>
        ) : (
          <motion.div
            key={`q${step}`}
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -28 }}
            transition={{ duration: 0.3 }}
            style={{ flex: 1, display: "flex", flexDirection: "column", padding: "0 22px" }}
          >
            <Tag color={C.inkLight} bg={C.bgWarm} text={`Pertanyaan ${step} dari ${qs.length}`} />
            <h2
              style={{
                fontFamily: F.display,
                fontSize: 26,
                fontWeight: 400,
                color: C.ink,
                lineHeight: 1.35,
                marginTop: 14,
                marginBottom: 6,
              }}
            >
              {qs[step - 1].q}
            </h2>
            <p style={{ fontFamily: F.body, fontSize: 13, color: C.inkLight, marginBottom: 32 }}>
              {qs[step - 1].hint}
            </p>

            <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
              {[1, 2, 3, 4, 5].map((v) => {
                const sel = answers[step - 1] === v;
                return (
                  <button
                    key={v}
                    onClick={() => {
                      const a = [...answers];
                      a[step - 1] = v;
                      setAnswers(a);
                    }}
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 14,
                      border: sel ? `2px solid ${C.sage}` : `1.5px solid ${C.border}`,
                      background: sel ? C.sagePale : C.card,
                      fontFamily: F.mono,
                      fontSize: 22,
                      fontWeight: 500,
                      color: sel ? C.sageDark : C.inkMid,
                      cursor: "pointer",
                      transition: "all 0.15s",
                      boxShadow: sel ? `0 0 0 4px rgba(95,138,101,0.12)` : "none",
                    }}
                  >
                    {v}
                  </button>
                );
              })}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, padding: "0 2px" }}>
              <span style={{ fontFamily: F.body, fontSize: 11.5, color: C.inkLight }}>{qs[step - 1].labels[0]}</span>
              <span style={{ fontFamily: F.body, fontSize: 11.5, color: C.inkLight }}>{qs[step - 1].labels[4]}</span>
            </div>

            <AnimatePresence>
              {answers[step - 1] !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  style={{ textAlign: "center" as const, marginTop: 16 }}
                >
                  <span style={{ fontFamily: F.display, fontSize: 20, fontStyle: "italic", color: C.sageDark }}>
                    &ldquo;{qs[step - 1].labels[(answers[step - 1] ?? 1) - 1]}&rdquo;
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            <div style={{ flex: 1 }} />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <button
                onClick={() => setStep((s) => s - 1)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  fontFamily: F.body,
                  fontSize: 15,
                  color: C.inkLight,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <ChevronLeft size={16} /> Kembali
              </button>
              <button
                onClick={() => (step < qs.length ? setStep((s) => s + 1) : handleFinish())}
                disabled={answers[step - 1] === null || isPending}
                style={{
                  padding: "11px 26px",
                  borderRadius: 14,
                  border: "none",
                  background: answers[step - 1] !== null ? C.sage : C.bgWarm,
                  color: answers[step - 1] !== null ? "#fff" : C.inkLight,
                  fontFamily: F.body,
                  fontSize: 15.5,
                  fontWeight: 600,
                  cursor: answers[step - 1] !== null && !isPending ? "pointer" : "default",
                  transition: "all 0.2s",
                }}
              >
                {isPending ? "Menyimpan..." : step < qs.length ? "Lanjut →" : "Lihat Hasil ✨"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
