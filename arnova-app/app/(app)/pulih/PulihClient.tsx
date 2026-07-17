"use client";

import { useEffect, useState } from "react";
import { Play, Pause, ChevronRight, Activity, BedDouble, Music2, ChevronDown } from "lucide-react";
import { F } from "@/lib/design/tokens";
import { SectionLabel } from "@/lib/design/primitives";
import { logRecoverySessionAction } from "./actions";

const TIMERS = [
  { l: "2 min", sub: "Fokus cepat", mins: 2 },
  { l: "5 min", sub: "Fokus sedang", mins: 5 },
  { l: "10 min", sub: "Pemulihan", mins: 10 },
];

const SOUNDS = [
  { 
    l: "Ombak",
    icon: (
      <img src="/icons/ombak.png" alt="Suara Ombak" className="w-6 h-6 object-contain" />
    )
  },
  { 
    l: "Hujan",
    icon: (
      <img src="/icons/hujan.png" alt="Suara Hujan" className="w-6 h-6 object-contain" />
    )
  },
  { 
    l: "Hutan",
    icon: (
      <img src="/icons/hutan.png" alt="Suara Hutan" className="w-6 h-6 object-contain" />
    )
  },
  { 
    l: "Api Unggun",
    icon: (
      <img src="/icons/api.png" alt="Suara Api Unggun" className="w-6 h-6 object-contain" />
    )
  },
];

const GUIDES = [
  { 
    Icon: Activity, 
    l: "Peregangan Meja", 
    sub: "8 gerakan  ·  10 menit", 
    mins: 10,
    videoId: "kpdR3BT8o5U" 
  },
  { 
    Icon: BedDouble, 
    l: "Rutinitas Tidur", 
    sub: "Winding down  ·  20 menit", 
    mins: 20,
    videoId: "wBQSErShw0c"
  },
  { 
    Icon: Music2, 
    l: "Meditasi Terpandu", 
    sub: "Napas & fokus  ·  15 menit", 
    mins: 15,
    videoId: "QnmLL6YBthM" 
  },
];

export function PulihClient() {
  const [activeTimer, setActiveTimer] = useState<number | null>(0); // Default ke 2 min sesuai mockup gambar
  const [activeSound, setActiveSound] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(120);
  const [activeGuide, setActiveGuide] = useState<number | null>(null); // State untuk mengatur video yg terbuka

  useEffect(() => {
    if (activeTimer === null) return;
    if (!playing) {
      setSecondsLeft(TIMERS[activeTimer].mins * 60);
      return;
    }
    const mins = TIMERS[activeTimer].mins;
    const id = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(id);
          setPlaying(false);
          logRecoverySessionAction({
            session_type: "breathing",
            label: TIMERS[activeTimer].sub,
            duration_minutes: mins,
          });
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [activeTimer, playing]);

  const fmtTime = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const selectSound = (i: number) => {
    const turningOn = activeSound !== i;
    setActiveSound(turningOn ? i : null);
    if (turningOn) {
      logRecoverySessionAction({ session_type: "sound", label: SOUNDS[i].l });
    }
  };

  const openGuide = (index: number, g: (typeof GUIDES)[number]) => {
    // Jika diklik lagi, tutup video. Jika klik yang lain, buka video yang baru.
    const isOpening = activeGuide !== index;
    setActiveGuide(isOpening ? index : null);
    
    if (isOpening) {
      logRecoverySessionAction({ session_type: "guide", label: g.l, duration_minutes: g.mins });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#EAF5FF] to-[#FFFFFF] text-[#2C3E50] w-full relative shadow-2xl pb-28 select-none">
      
      {/* HEADER TANGGAL & JUDUL */}
      <div className="px-5 pt-8 pb-3 flex-shrink-0">
        <span className="text-[11.5px] font-bold text-[#718096]">
          Thursday, July 16 2026
        </span>
        <h1 className="text-[26px] font-bold mt-1 text-[#2C3E50]" style={{ fontFamily: F.display }}>
          Pulihkan dirimu
        </h1>
      </div>

      {/* KONTEN UTAMA SCROLLABLE */}
      <div className="flex-1 px-4 pb-4 space-y-5 overflow-y-auto">
        
        {/* SECTION: RESET CEPAT */}
        <div>
          <div className="mb-2.5">
            <SectionLabel>Reset cepat</SectionLabel>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {TIMERS.map((t, i) => {
              const on = activeTimer === i;
              return (
                <button
                  key={i}
                  onClick={() => {
                    setActiveTimer(i);
                    setPlaying(false);
                    setSecondsLeft(TIMERS[i].mins * 60);
                  }}
                  className={`flex flex-col items-center justify-center py-4 rounded-2xl border transition-all duration-200 shadow-sm ${
                    on
                      ? "bg-gradient-to-b from-[#3A86F4] to-[#1E88E5] border-transparent text-white scale-[1.02]"
                      : "bg-white border-[#E2E8F0] text-[#4A5568] hover:border-[#CBD5E1]"
                  }`}
                >
                  <span className="text-[26px] font-bold" style={{ fontFamily: F.mono }}>{t.l}</span>
                  <span className={`text-[11.5px] mt-0.5 ${on ? "text-white/80" : "text-[#A0AEC0]"}`} style={{ fontFamily: F.body }}>
                    {t.sub}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* COMPONENT: TAMPILAN TIMER AKTIF UTAMA */}
        {activeTimer !== null && (
          <div className="bg-[#D2E4FC]/60 border border-[#BFDBFE] rounded-2xl p-4.5 flex items-center justify-between shadow-sm">
            <div>
              <p className="text-[15.5px] font-bold text-[#2C3E50]" style={{ fontFamily: F.display }}>
                {playing ? "Sesi berjalan" : "Siap dimulai"}
              </p>
              <p className="text-[13.5px] font-bold text-[#1E88E5] mt-0.5" style={{ fontFamily: F.mono }}>
                {fmtTime(secondsLeft)}
              </p>
            </div>
            <button
              onClick={() => setPlaying((p) => !p)}
              className="w-11 h-11 rounded-full bg-gradient-to-r from-[#3A86F4] to-[#1E88E5] flex items-center justify-center shadow-md active:scale-95 transition-transform"
            >
              {playing ? (
                <Pause size={16} className="text-white fill-white" />
              ) : (
                <Play size={16} className="text-white fill-white ml-0.5" />
              )}
            </button>
          </div>
        )}

        {/* SECTION: SUARA ALAM */}
        <div>
          <div className="mb-2.5">
            <SectionLabel>Suara alam</SectionLabel>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {SOUNDS.map((s, i) => {
              const on = activeSound === i;
              return (
                <button
                  key={i}
                  onClick={() => selectSound(i)}
                  className={`flex items-center gap-3 p-3.5 rounded-2xl border bg-white shadow-sm transition-all text-left ${
                    on ? "border-[#3A86F4] ring-2 ring-[#3A86F4]/10" : "border-[#E2E8F0] hover:border-[#CBD5E1]"
                  }`}
                >
                  <div className="w-10 h-10 rounded-2xl bg-transparent flex items-center justify-center flex-shrink-0">
                    {s.icon}
                  </div>
                  <span className="text-[13.5px] font-bold text-[#4A5568]" style={{ fontFamily: F.body }}>
                    {s.l}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* SECTION: PANDUAN PEMULIHAN GRADIASI */}
        <div>
          <div className="mb-2.5">
            <SectionLabel>Panduan pemulihan</SectionLabel>
          </div>
          <div className="space-y-3">
            {GUIDES.map((g, index) => (
              <div key={g.l} className="flex flex-col gap-2">
                <button
                  onClick={() => openGuide(index, g)}
                  className="w-full p-4 rounded-2xl border border-transparent bg-gradient-to-r from-[#3A86F4]/15 via-[#4894FF]/10 to-transparent hover:from-[#3A86F4]/20 transition-all flex items-center gap-4 text-left shadow-sm"
                >
                  <div className="w-10 h-10 rounded-2xl bg-white/70 flex items-center justify-center flex-shrink-0 shadow-sm text-[#1E88E5]">
                    <g.Icon size={18} strokeWidth={2.5} />
                  </div>
                  <div className="flex-1">
                    <p className="text-[13.5px] font-bold text-[#2C3E50]" style={{ fontFamily: F.body }}>{g.l}</p>
                    <p className="text-[11.5px] text-[#718096] font-medium mt-0.5" style={{ fontFamily: F.body }}>{g.sub}</p>
                  </div>
                  {activeGuide === index ? (
                    <ChevronDown size={16} className="text-[#3A86F4]" />
                  ) : (
                    <ChevronRight size={16} className="text-[#94A3B8]" />
                  )}
                </button>

                {/* YOUTUBE IFRAME EMBED */}
                {activeGuide === index && (
                  <div className="w-full rounded-2xl overflow-hidden shadow-md border border-[#E2E8F0] bg-[#f8fafc] animate-in fade-in slide-in-from-top-2 duration-300">
                    <iframe
                      width="100%"
                      height="215"
                      src={`https://www.youtube.com/embed/${g.videoId}?autoplay=1`}
                      title={g.l}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full"
                    ></iframe>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}