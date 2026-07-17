"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, Wind, Star, MessageCircle, Check, Sparkles } from "lucide-react";
import { F } from "@/lib/design/tokens";
import { SectionLabel, Tag } from "@/lib/design/primitives";
import type { ChecklistItem } from "@/lib/data/types";
import { BreathingBlob } from "./BreathingBlob";
import { setMoodAction, setChecklistAction } from "./actions";

const MOODS = [
  { l: "Semangat", v: 4, icon: "/icons/mood-semangat.png" },
  { l: "Tenang", v: 3, icon: "/icons/mood-tenang.png" },
  { l: "Lelah", v: 2, icon: "/icons/mood-lelah.png" },
  { l: "Stres", v: 1, icon: "/icons/mood-stres.png" },
];

const QUICK_ACTIONS = [
  { Icon: BookOpen, l: "Jurnal", href: "/refleksi" },
  { Icon: Wind, l: "Napas", href: "/pulih" },
  { Icon: Star, l: "Syukur", href: "/refleksi" },
  { Icon: MessageCircle, l: "AI Chat", href: "/refleksi" },
];

export function HomeClient({
  fullName,
  dateLabel,
  energyScore,
  energyDelta,
  mood,
  checklist,
  recommendation,
}: {
  fullName: string;
  dateLabel: string;
  energyScore: number;
  energyDelta: number | null;
  mood: string | null;
  checklist: ChecklistItem[];
  recommendation: string;
}) {
  const [selectedMood, setSelectedMood] = useState<string | null>(mood);
  const [items, setItems] = useState<ChecklistItem[]>(checklist);
  const [, startTransition] = useTransition();

  const donePct = items.length ? Math.round((items.filter((i) => i.done).length / items.length) * 100) : 0;

  const handleMood = (m: (typeof MOODS)[number]) => {
    setSelectedMood(m.l);
    startTransition(() => {
      setMoodAction(m.l, m.v * 20);
    });
  };

  const toggle = (i: number) => {
    const next = items.map((it, idx) => (idx === i ? { ...it, done: !it.done } : it));
    setItems(next);
    startTransition(() => {
      setChecklistAction(next);
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#EAF5FF] to-[#FFFFFF] text-[#2C3E50] w-full relative shadow-2xl pb-28 select-none">
      
      {/* 1. HERO SECTION (Blue Gradient) */}
      <div className="bg-gradient-to-b from-[#3A86F4] via-[#4894FF] to-[#60A5FF] px-6 pt-8 pb-10 rounded-b-2xl text-white relative overflow-hidden flex-shrink-0 shadow-lg">
        <div className="absolute -right-10 -top-10 w-44 h-44 rounded-full bg-white/10 blur-xl pointer-events-none" />
        <div className="absolute right-12 bottom-2 w-28 h-28 rounded-full bg-white/5 blur-lg pointer-events-none" />

        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-[12.5px] font-medium tracking-wide text-white/70" style={{ fontFamily: F.mono }}>{dateLabel}</p>
            <h1 className="text-[26px] font-bold mt-1" style={{ fontFamily: F.display }}>Halo, {fullName}</h1>
            <p className="text-[13.5px] text-white/80 mt-0.5" style={{ fontFamily: F.body }}>Semoga harimu berjalan lancar</p>
          </div>
          {/* Badge Otot Kanan Atas */}
          {/* <div className="w-10 h-10 rounded-full bg-white p-1.5 border border-white/25 flex items-center justify-center backdrop-blur-sm shadow-inner">
            <Image src="/icons/mood-semangat.png" alt="Semangat" width={28} height={28} className="w-full h-full object-contain" />
          </div> */}
        </div>

        {/* Lingkaran Energi / Breathing Blob */}
        <div className="flex justify-center my-4">
          <BreathingBlob score={energyScore} breathLabel="Tarik napas perlahan" />
        </div>

        {/* Delta Poin Badge */}
        {energyDelta !== null && (
          <div className="flex justify-center mt-4">
            <div className="flex items-center gap-1.5 bg-[#2563EB]/40 border border-white/15 px-4 py-1.5 rounded-full text-[12.5px] font-medium backdrop-blur-sm shadow-sm">
              <span>{energyDelta >= 0 ? `↑` : `↓`}</span>
              <span>{Math.abs(energyDelta)} poin dari kemarin</span>
            </div>
          </div>
        )}
      </div>

      {/* 2. MAIN SCROLLABLE CONTENT */}
      <div className="flex-1 px-5 pt-6 space-y-6 overflow-y-auto">
        
        {/* Mood Sekarang */}
        <div>
          <div className="mb-3">
            <SectionLabel>Mood Sekarang</SectionLabel>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {MOODS.map((m) => {
              const on = selectedMood === m.l;
              return (
                <button
                  key={m.l}
                  onClick={() => handleMood(m)}
                  className={`flex flex-col items-center justify-center py-4 rounded-2xl border transition-all duration-200 shadow-sm ${
                    on
                      ? "bg-white border-[#3A86F4] text-[#3A86F4] ring-2 ring-[#3A86F4]/10 scale-[1.03]"
                      : "bg-white border-[#E2E8F0] text-[#1E3A8A] hover:border-[#CBD5E1]"
                  }`}
                >
                  <div className={`mb-1.5 transition-opacity ${on ? 'opacity-100' : 'opacity-70'}`}>
                    <Image src={m.icon} alt={m.l} width={32} height={32} className="w-8 h-8 object-contain" />
                  </div>
                  <span className="text-[12.5px] font-bold tracking-tight text-[#4A5568]" style={{ fontFamily: F.body }}>
                    {m.l}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Checklist Pemulihan */}
        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[13.5px] font-bold text-[#4A5568]" style={{ fontFamily: F.body }}>Checklist Pemulihan</span>
            <div className="flex items-center gap-2">
              <span className="text-[11.5px] font-bold text-[#3A86F4]" style={{ fontFamily: F.mono }}>{donePct}%</span>
              <div className="w-16 h-1 bg-[#E2E8F0] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#3A86F4] rounded-full transition-all duration-300" 
                  style={{ width: `${donePct}%` }} 
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-3.5">
            {items.map((t, i) => (
              <button
                key={t.task}
                onClick={() => toggle(i)}
                className="flex items-center gap-3 w-full text-left bg-none border-none p-0 cursor-pointer group"
              >
                <div className={`w-[22px] h-[22px] rounded-2xl flex items-center justify-center border transition-all flex-shrink-0 ${
                  t.done 
                    ? "bg-[#3A86F4] border-[#3A86F4]" 
                    : "border-[#CBD5E1] bg-white group-hover:border-[#94A3B8]"
                }`}>
                  {t.done && <Check size={14} className="text-white" strokeWidth={3} />}
                </div>
                <span 
                  className={`text-[14px] font-medium transition-all ${t.done ? "text-[#94A3B8] line-through" : "text-[#4A5568]"}`}
                  style={{ fontFamily: F.body }}
                >
                  {t.task}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Rekomendasi AI */}
        <div className="bg-[#D2E4FC]/60 border border-[#BFDBFE] rounded-2xl p-4.5 shadow-sm relative overflow-hidden">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#3A86F4] to-[#1E88E5] flex items-center justify-center flex-shrink-0 shadow-sm text-white">
              <Sparkles size={20} strokeWidth={2} />
            </div>
            <div>
              <Tag color="#3A86F4" bg="rgba(58,134,244,0.12)" text="Rekomendasi AI" />
              <p className="text-[13.5px] text-[#2C3E50] font-medium mt-2 leading-relaxed pr-2" style={{ fontFamily: F.body }}>
                {recommendation}
              </p>
            </div>
          </div>
        </div>

        {/* Aksi Cepat (Lingkaran Solid Biru) */}
        <div>
          <div className="grid grid-cols-4 gap-4 pb-4">
            {QUICK_ACTIONS.map(({ Icon, l, href }) => (
              <Link
                key={l}
                href={href}
                className="flex flex-col items-center gap-2 group text-none"
              >
                <div className="w-[60px] h-[60px] rounded-full bg-gradient-to-b from-[#3A86F4] to-[#1E88E5] text-white shadow-md flex items-center justify-center group-hover:scale-105 transition-all">
                  <Icon size={26} strokeWidth={1.8} />
                </div>
                <span className="text-[12.5px] font-bold text-[#2C3E50]" style={{ fontFamily: F.body }}>{l}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}