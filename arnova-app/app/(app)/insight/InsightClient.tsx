"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Flame, TrendingUp, AlertTriangle, Sparkles, ChevronRight, Activity, BookOpen, User } from "lucide-react";
import { F } from "@/lib/design/tokens";
import { SectionLabel, Tag } from "@/lib/design/primitives";
import type { InsightViewModel } from "@/lib/data/insight";

function burnoutBadge(risk: number): string {
  if (risk < 40) return "Rendah";
  if (risk < 70) return "Sedang";
  return "Tinggi";
}

export function InsightClient({ data }: { data: InsightViewModel }) {
  const { metrics, moodByDay, activeDays, energyChange, aiSummary } = data;
  const peak = Math.max(1, ...moodByDay.map((d) => d.value));

  const metricRows = [
    { l: "Energi Mental", v: metrics.energy, c: "#3A86F4", Icon: Flame, badge: null as string | null },
    { l: "Produktivitas", v: metrics.productivity, c: "#8B5CF6", Icon: TrendingUp, badge: null },
    { 
      l: "Risiko Burnout", 
      v: metrics.burnoutRisk, 
      c: "#EF4444", 
      Icon: AlertTriangle, 
      badge: burnoutBadge(metrics.burnoutRisk) 
    },
  ];

  const energyChangeLabel = energyChange === null ? "-" : energyChange >= 0 ? `+${energyChange}` : `${energyChange}`;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#EAF5FF] to-[#FFFFFF] text-[#2C3E50] w-full relative shadow-2xl pb-28 select-none">
      
      {/* HEADER TANGGAL & JUDUL */}
      <div className="px-5 pt-8 pb-3 flex-shrink-0">
        <span className="text-[11.5px] font-bold text-[#718096]">
          Thursday, July 16 2026
        </span>
        <h1 className="text-[26px] font-bold mt-1 text-[#2C3E50]" style={{ fontFamily: F.display }}>
          Insight-mu
        </h1>
      </div>

      {/* KONTEN UTAMA SCROLLABLE */}
      <div className="flex-1 px-4 pb-4 space-y-4 overflow-y-auto">
        
        {/* KARTU METRIK UTAMA */}
        <div className="space-y-3">
          {metricRows.map(({ l, v, c, Icon, badge }) => (
            <div key={l} className="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div 
                    className="w-8 h-8 rounded-2xl flex items-center justify-center bg-opacity-10"
                    style={{ backgroundColor: `${c}15` }}
                  >
                    <Icon size={16} color={c} strokeWidth={2.5} />
                  </div>
                  <span className="text-[13.5px] font-bold text-[#4A5568]" style={{ fontFamily: F.body }}>{l}</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-[26px] font-bold" style={{ fontFamily: F.mono, color: c }}>{v}</span>
                  <span className="text-[11.5px] font-bold text-[#A0AEC0]" style={{ fontFamily: F.mono }}>/100</span>
                  {badge && (
                    <span className="ml-1.5 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-[#FEF3C7] text-[#D97706] border border-[#FDE68A]">
                      {badge}
                    </span>
                  )}
                </div>
              </div>
              <div className="h-1.5 rounded-full bg-[#F1F5F9] overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${v}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: c }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* GRAFIK TREN MOOD */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4.5 shadow-sm">
          <div className="flex justify-between items-center mb-5">
            <span className="text-[13.5px] font-bold text-[#4A5568]" style={{ fontFamily: F.body }}>Tren Mood</span>
            <span className="inline-block bg-[#E3F2FD] text-[#1E88E5] text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-[#BBDEFB]">
              7 Hari
            </span>
          </div>
          
          <div className="flex items-end gap-2 h-16 mb-2">
            {moodByDay.map((d, i) => {
              const isPeak = d.value === peak && d.value > 0;
              const h = Math.max(Math.round((d.value / peak) * 64), 6); // min 6px so empty days stay visible
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: h }}
                    transition={{ duration: 0.5, delay: i * 0.07, ease: "easeOut" }}
                    className={`w-full rounded-t-2xl ${
                      isPeak
                        ? "bg-gradient-to-b from-[#3A86F4] to-[#1E88E5] shadow-sm"
                        : "bg-[#E2E8F0]"
                    }`}
                  />
                </div>
              );
            })}
          </div>
          <div className="flex gap-2">
            {moodByDay.map((d, i) => (
              <div key={i} className="flex-1 text-center">
                <span className="text-[10.5px] font-bold text-[#A0AEC0] uppercase" style={{ fontFamily: F.mono }}>{d.day}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-1">
            {moodByDay.map((d, i) => {
              const isPeak = d.value === peak && d.value > 0;
              return (
                <div key={i} className="flex-1 text-center">
                  <span className={`text-[11px] ${isPeak ? "text-[#3A86F4] font-bold" : "text-[#718096] font-semibold"}`} style={{ fontFamily: F.mono }}>
                    {d.value || "-"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* RINGKASAN AI MINGGUAN */}
        <div className="bg-[#ECF4FF] border border-[#BFDBFE] rounded-2xl p-4.5 shadow-sm relative overflow-hidden">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-2xl bg-[#3A86F4] flex items-center justify-center flex-shrink-0 text-white shadow-sm">
              <Sparkles size={15} />
            </div>
            <span className="inline-block bg-[#3A86F4]/10 text-[#3A86F4] text-[11.5px] font-bold px-2.5 py-0.5 rounded-full border border-[#3A86F4]/20">
              Rekomendasi AI
            </span>
          </div>
          <p className="text-[13.5px] font-medium text-[#2C3E50] leading-relaxed mb-4" style={{ fontFamily: F.body }}>
            {aiSummary}
          </p>
          
          <div className="flex gap-2.5">
            {[
              { l: "Hari Aktif", v: `${activeDays}/7` },
              { l: "Energi Naik", v: energyChangeLabel },
              { l: "Risiko", v: `${metrics.burnoutRisk}%` },
            ].map(({ l, v }) => (
              <div key={l} className="flex-1 bg-white/60 rounded-2xl py-2 flex flex-col items-center border border-white/40 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                <p className="text-[15.5px] font-bold text-[#1E88E5]" style={{ fontFamily: F.mono }}>{v}</p>
                <p className="text-[10.5px] font-bold text-[#718096] mt-0.5" style={{ fontFamily: F.body }}>{l}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}