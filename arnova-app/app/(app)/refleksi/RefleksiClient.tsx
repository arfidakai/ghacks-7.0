"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { ChevronLeft, ArrowRight, Sparkles, BookOpen, Wind, Star, MessageCircle, Heart, Activity, User, Play, Pause } from "lucide-react";
import { C, F } from "@/lib/design/tokens";
import { Card, SectionLabel, Tag } from "@/lib/design/primitives";
import { formatShortDateLabel } from "@/lib/date-id";
import type { JournalEntry } from "@/lib/data/types";
import { SOUND_CATALOG, recommendRecoverySound } from "@/lib/sounds";
import { createJournalEntryAction, logRecoverySessionAction } from "./actions";

const ALL_TAGS = ["Bersyukur", "Lelah", "Bangga", "Cemas", "Semangat", "Frustrasi", "Fokus", "Sedih"];

export function RefleksiClient({ initialEntries }: { initialEntries: JournalEntry[] }) {
  const [phase, setPhase] = useState<"input" | "ai">("input");
  const [kejadian, setKejadian] = useState("");
  const [respons, setRespons] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [entries, setEntries] = useState<JournalEntry[]>(initialEntries);
  const [latest, setLatest] = useState<JournalEntry | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [recommendedPlaying, setRecommendedPlaying] = useState(false);
  const recommendedAudioRef = useRef<HTMLAudioElement>(null);

  const toggleTag = (t: string) =>
    setTags((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));

  const submit = async () => {
    setIsPending(true);
    try {
      const entry = await createJournalEntryAction({ kejadian, respons, tags });
      setLatest(entry);
      setEntries((prev) => [entry, ...prev]);
      setPhase("ai");
    } finally {
      setIsPending(false);
    }
  };

  const recommendation = latest?.ai_scores ? recommendRecoverySound(latest.ai_scores) : null;
  const recommendedSound = recommendation ? SOUND_CATALOG[recommendation.key] : null;

  // Dipanggil langsung dari tombol "Edit jurnal" (bukan effect) supaya audio
  // rekomendasi berhenti persis saat pengguna kembali ke mode edit.
  const backToEdit = () => {
    recommendedAudioRef.current?.pause();
    setRecommendedPlaying(false);
    setPhase("input");
  };

  const toggleRecommendedSound = () => {
    const audio = recommendedAudioRef.current;
    if (!audio || !recommendedSound) return;
    if (recommendedPlaying) {
      audio.pause();
      setRecommendedPlaying(false);
      return;
    }
    audio.src = recommendedSound.file;
    audio.loop = true;
    audio.play().catch(() => {});
    setRecommendedPlaying(true);
    logRecoverySessionAction({ session_type: "sound", label: recommendedSound.label });
  };

  return (
    /* max-w-md diubah menjadi w-full agar layout kembali lebar memenuhi layar browser */
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#EAF5FF] to-[#FFFFFF] text-[#2C3E50] w-full relative shadow-2xl pb-28 select-none">
      
      {/* HEADER TANGGAL & JUDUL */}
      <div className="px-5 pt-8 pb-3 flex-shrink-0">
        <span className="inline-block bg-[#E2E8F0] text-[#718096] text-[11.5px] font-bold px-2.5 py-0.5 rounded-full">
          {formatShortDateLabel(new Date().toISOString().slice(0, 10))} · Refleksi Harian
        </span>
        <h1 className="text-[26px] font-bold mt-2 text-[#2C3E50]" style={{ fontFamily: F.display }}>
          Jurnalmu hari ini
        </h1>
      </div>

      {/* KONTEN UTAMA SCROLLABLE */}
      <div className="flex-1 px-4 pb-4 space-y-4 overflow-y-auto">
        <AnimatePresence mode="wait">
          {phase === "input" ? (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="flex flex-col gap-4"
            >
              {/* KARTU INPUT 1: APA YANG TERJADI HARI INI */}
              <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4.5 shadow-sm">
                <p className="text-[12.5px] font-bold tracking-wider text-[#718096] mb-2 uppercase" style={{ fontFamily: F.mono }}>
                  Apa yang terjadi hari ini?
                </p>
                <textarea
                  value={kejadian}
                  onChange={(e) => setKejadian(e.target.value)}
                  placeholder="Ceritakan momen penting, pencapaian, atau tantangan hari ini..."
                  rows={5}
                  maxLength={500}
                  className="w-full border-none bg-transparent text-[15.5px] text-[#4A5568] placeholder-[#A0AEC0] resize-none outline-none p-0 focus:ring-0 leading-relaxed"
                  style={{ fontFamily: F.body }}
                />
                <div className="flex justify-end mt-1">
                  <span className="text-[11.5px] font-medium text-[#A0AEC0]" style={{ fontFamily: F.mono }}>
                    {kejadian.length} / 500
                  </span>
                </div>
              </div>

              {/* KARTU INPUT 2: BAGAIMANA RESPONS-MU */}
              <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4.5 shadow-sm">
                <p className="text-[12.5px] font-bold tracking-wider text-[#718096] mb-2 uppercase" style={{ fontFamily: F.mono }}>
                  Bagaimana responmu?
                </p>
                <textarea
                  value={respons}
                  onChange={(e) => setRespons(e.target.value)}
                  placeholder="Apa yang kamu rasakan dan lakukan sebagai respons..."
                  rows={4}
                  className="w-full border-none bg-transparent text-[15.5px] text-[#4A5568] placeholder-[#A0AEC0] resize-none outline-none p-0 focus:ring-0 leading-relaxed"
                  style={{ fontFamily: F.body }}
                />
              </div>

              {/* SECTION TAG EMOSI */}
              <div>
                <div className="mb-2.5">
                  <SectionLabel>Tag Emosi</SectionLabel>
                </div>
                {/* Menggunakan flex-wrap agar tag menyebar rapi secara horizontal pada layar lebar */}
                <div className="flex flex-wrap gap-2.5">
                  {ALL_TAGS.map((t) => {
                    const on = tags.includes(t);
                    return (
                      <button
                        key={t}
                        onClick={() => toggleTag(t)}
                        className={`text-[13.5px] font-bold py-2.5 px-5 rounded-full border text-center transition-all duration-150 ${
                          on
                            ? "bg-[#ECF4FF] border-[#3A86F4] text-[#3A86F4] shadow-sm"
                            : "bg-white border-[#E2E8F0] text-[#718096] hover:border-[#CBD5E1]"
                        }`}
                        style={{ fontFamily: F.body }}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* TOMBOL SUBMIT */}
              <button
                onClick={submit}
                disabled={!kejadian.trim() || isPending}
                className={`w-full py-3.5 rounded-2xl border-none text-[15.5px] font-bold flex items-center justify-center gap-2 transition-all duration-200 ${
                  kejadian.trim() && !isPending
                    ? "bg-gradient-to-r from-[#3A86F4] to-[#60A5FF] text-white shadow-lg shadow-[#3A86F4]/20 cursor-pointer active:scale-[0.99]"
                    : "bg-[#F1F5F9] text-[#A0AEC0] cursor-default"
                }`}
                style={{ fontFamily: F.body }}
              >
                {isPending ? "Menganalisis..." : "Lanjutkan"}{" "}
                <ArrowRight size={15} strokeWidth={2.5} />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="ai"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="flex flex-col gap-4"
            >
              <button
                onClick={backToEdit}
                className="flex items-center gap-1 text-[13.5px] font-bold text-[#718096] bg-none border-none p-0 cursor-pointer hover:text-[#3A86F4] transition-colors"
                style={{ fontFamily: F.body }}
              >
                <ChevronLeft size={16} strokeWidth={2.5} /> Edit jurnal
              </button>

              {/* ANALISIS AI */}
              {latest && (
                <div className="bg-[#ECF4FF] border border-[#BFDBFE] rounded-2xl p-4.5 shadow-sm relative overflow-hidden">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-8 h-8 rounded-2xl bg-[#3A86F4] flex items-center justify-center flex-shrink-0 text-white shadow-sm">
                      <Sparkles size={15} />
                    </div>
                    <Tag color="#3A86F4" bg="rgba(58,134,244,0.1)" text="Ringkasan AI" />
                  </div>
                  <p className="text-[13.5px] font-medium text-[#2C3E50] leading-relaxed mb-4" style={{ fontFamily: F.body }}>
                    {latest.ai_summary}
                  </p>
                  
                  {latest.ai_scores && (
                    <div className="space-y-3">
                      {[
                        { l: "Regulasi Emosi", v: latest.ai_scores.regulasi_emosi, c: "#3A86F4" },
                        { l: "Tekanan Kerja", v: latest.ai_scores.tekanan_kerja, c: "#E53E3E" },
                        { l: "Resiliensi", v: latest.ai_scores.resiliensi, c: "#805AD5" },
                      ].map(({ l, v, c }) => (
                        <div key={l}>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-[12.5px] font-bold text-[#718096]" style={{ fontFamily: F.body }}>{l}</span>
                            <span className="text-[12.5px] font-bold" style={{ fontFamily: F.mono, color: c }}>{v}%</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-[#E2E8F0] overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${v}%` }}
                              transition={{ duration: 0.8, ease: "easeOut" }}
                              className="h-full rounded-full"
                              style={{ backgroundColor: c }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* PEMULIHAN YANG DIREKOMENDASIKAN */}
              {recommendedSound && (
                <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4.5 shadow-sm">
                  <div className="mb-3">
                    <SectionLabel>Pemulihan Direkomendasikan</SectionLabel>
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-[#F0F7FF] flex items-center justify-center flex-shrink-0 shadow-inner">
                      <img
                        src={recommendedSound.icon}
                        alt={`Suara ${recommendedSound.label}`}
                        className="w-7 h-7 object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-[14px] font-bold text-[#2C3E50]" style={{ fontFamily: F.body }}>
                        {recommendedSound.emoji} {recommendedSound.label}
                      </p>
                      <p className="text-[12px] text-[#718096] font-medium mt-0.5 leading-snug" style={{ fontFamily: F.body }}>
                        {recommendation?.reason}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={toggleRecommendedSound}
                    className={`w-full py-3 rounded-2xl border-none text-[14px] font-bold flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer active:scale-[0.99] ${
                      recommendedPlaying
                        ? "bg-[#ECF4FF] text-[#3A86F4] border border-[#BFDBFE]"
                        : "bg-gradient-to-r from-[#3A86F4] to-[#60A5FF] text-white shadow-md shadow-[#3A86F4]/20"
                    }`}
                    style={{ fontFamily: F.body }}
                  >
                    {recommendedPlaying ? (
                      <>
                        <Pause size={15} strokeWidth={2.5} /> Jeda Suara
                      </>
                    ) : (
                      <>
                        <Play size={15} strokeWidth={2.5} /> Putar Suara Rekomendasi
                      </>
                    )}
                  </button>
                  <audio ref={recommendedAudioRef} className="hidden" />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* HISTORI JURNAL SEBELUMNYA -- tampil terlepas dari phase, gak perlu
            isi jurnal baru dulu buat lihat riwayat yang udah ada. */}
        <div className="mt-2">
          <SectionLabel>Jurnal Sebelumnya</SectionLabel>
        </div>
        <div className="space-y-2.5">
          {entries
            .filter((e) => e.id !== latest?.id)
            .map((e) => (
              <div key={e.id} className="bg-white border border-[#E2E8F0] rounded-2xl p-3.5 shadow-sm flex gap-3">
                <span className="text-[11.5px] font-bold text-[#A0AEC0] flex-shrink-0 pt-0.5" style={{ fontFamily: F.mono }}>
                  {formatShortDateLabel(e.entry_date)}
                </span>
                <div className="flex-1 space-y-1.5">
                  {e.tags.length > 0 && (
                    <div className="flex gap-1 flex-wrap">
                      {e.tags.map((t) => (
                        <span key={t} className="inline-block bg-[#E3F2FD] text-[#1E88E5] text-[10.5px] font-bold px-2 py-0.5 rounded-2xl">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                  <p className="text-[13.5px] text-[#4A5568] leading-normal font-medium" style={{ fontFamily: F.body }}>{e.kejadian}</p>
                </div>
              </div>
            ))}
          {entries.length === 0 && (
            <p className="text-[13.5px] font-semibold text-[#A0AEC0] px-1" style={{ fontFamily: F.body }}>Belum ada jurnal sebelumnya.</p>
          )}
        </div>
      </div>

    </div>
  );
}