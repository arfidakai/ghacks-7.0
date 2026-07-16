"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Info, ClipboardList, Target, Phone, Settings, Shield,
  Camera, ChevronRight, ChevronDown, Trash2, Plus,
} from "lucide-react";
import { F } from "@/lib/design/tokens";
import { createClient } from "@/lib/supabase/client";
import type { Profile, EmergencyContact } from "@/lib/data/types";
import { addEmergencyContactAction, deleteEmergencyContactAction } from "./actions";

const STATIC_MENU = [
  { Icon: Info, l: "Info Pribadi", sub: "Nama, usia, pekerjaan" },
  { Icon: ClipboardList, l: "Hasil Assessment", sub: "Riwayat screening AI" },
  { Icon: Target, l: "Target Wellbeing", sub: "Goals mingguan & bulanan" },
  { Icon: Settings, l: "Pengaturan", sub: "Notifikasi, bahasa, tema" },
  { Icon: Shield, l: "Privasi & Data", sub: "Kontrol data pribadimu" },
];

export function ProfilClient({
  profile,
  energyScore,
  burnoutRisk,
  contacts,
}: {
  profile: Profile;
  energyScore: number;
  burnoutRisk: number;
  contacts: EmergencyContact[];
}) {
  const router = useRouter();
  const [contactsOpen, setContactsOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [relation, setRelation] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const signOut = async () => {
    setSigningOut(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  const stats = [
    { l: "Energi", v: String(energyScore), u: "/100", c: "#3A86F4" },
    { l: "Hari Aktif", v: String(profile.streak_days), u: " hr", c: "#8B5CF6" },
    { l: "Risiko", v: String(burnoutRisk), u: "%", c: "#EF4444" },
  ];

  const submitContact = async () => {
    if (!name.trim() || !phone.trim()) return;
    setIsPending(true);
    try {
      await addEmergencyContactAction({ name, phone, relation: relation || undefined });
      setName("");
      setPhone("");
      setRelation("");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#EAF5FF] to-[#FFFFFF] text-[#2C3E50] w-full relative shadow-2xl pb-28 select-none">
      
      {/* 1. HEADER PROFIL (Blue Gradient) */}
      <div className="bg-gradient-to-b from-[#3A86F4] via-[#4894FF] to-[#60A5FF] px-6 pt-12 pb-10 rounded-b-2xl text-white relative overflow-hidden shadow-lg flex-shrink-0">
        <div className="absolute -right-10 -top-10 w-44 h-44 rounded-full bg-white/10 blur-xl pointer-events-none" />
        <div className="absolute right-12 bottom-2 w-28 h-28 rounded-full bg-white/5 blur-lg pointer-events-none" />

        <div className="flex items-center gap-4 relative z-10">
          <div className="relative">
            <div className="w-[72px] h-[72px] rounded-full bg-[#ECF4FF] border-4 border-white/40 shadow-[0_4px_20px_rgba(0,0,0,0.15)] flex items-center justify-center text-[32px] overflow-hidden">
              {profile.avatar_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={profile.avatar_url} alt={profile.full_name ?? "Avatar"} className="w-full h-full object-cover" />
              ) : (
                "😊"
              )}
            </div>
            <button className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[#3A86F4] border-2 border-white/60 flex items-center justify-center cursor-pointer shadow-sm hover:scale-105 transition-transform">
              <Camera size={12} color="#fff" strokeWidth={2.5} />
            </button>
          </div>
          <div>
            <h2 className="text-[26px] font-bold text-white leading-tight shadow-black/10 drop-shadow-sm" style={{ fontFamily: F.display }}>
              {profile.full_name ?? "Pengguna Healthy"}
            </h2>
            <p className="text-[13.5px] text-white/80 mt-0.5" style={{ fontFamily: F.body }}>
              {[profile.occupation, profile.city].filter(Boolean).join(" · ") || "Lengkapi profilmu"}
            </p>
            <div className="inline-flex items-center gap-1.5 mt-2 bg-white/15 px-3 py-1 rounded-full border border-white/20 shadow-sm backdrop-blur-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-[#93C5FD] shadow-[0_0_8px_#93C5FD]" />
              <span className="text-[11.5px] font-bold text-white" style={{ fontFamily: F.body }}>
                Aktif {profile.streak_days} hari berturut
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* KONTEN UTAMA SCROLLABLE */}
      <div className="flex-1 overflow-y-auto px-5 -mt-5 space-y-4">
        
        {/* 2. KARTU STATISTIK BULAT */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-sm flex justify-around items-center relative z-20">
          {stats.map(({ l, v, u, c }) => (
            <div key={l} className="text-center flex-1">
              <div className="flex items-baseline justify-center gap-0.5">
                <span className="text-[26px] font-bold" style={{ fontFamily: F.mono, color: c }}>{v}</span>
                <span className="text-[11.5px] font-bold text-[#A0AEC0]" style={{ fontFamily: F.mono }}>{u}</span>
              </div>
              <span className="text-[11.5px] font-bold text-[#718096]" style={{ fontFamily: F.body }}>{l}</span>
            </div>
          ))}
        </div>

        {/* 3. PREMIUM BANNER */}
        <div className="rounded-2xl p-4 bg-gradient-to-br from-[#3A86F4] to-[#60A5FF] flex items-center justify-between shadow-md relative overflow-hidden">
          <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
          <div className="relative z-10">
            <p className="text-[15.5px] font-bold text-white italic" style={{ fontFamily: F.display }}>Healthy Premium</p>
            <p className="text-[11.5px] font-medium text-white/80 mt-0.5" style={{ fontFamily: F.body }}>Unlock semua fitur AI & insight</p>
          </div>
          <button className="bg-white text-[#3A86F4] text-[12.5px] font-bold px-4 py-2 rounded-2xl shadow-sm hover:scale-105 transition-transform relative z-10" style={{ fontFamily: F.body }}>
            Coba Gratis
          </button>
        </div>

        {/* 4. LIST MENU PENGATURAN */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden flex flex-col">
          {STATIC_MENU.map(({ Icon, l, sub }) => (
            <div
              key={l}
              className="w-full flex items-center gap-3.5 p-4 border-b border-[#F1F5F9] hover:bg-[#F8FAFC] transition-colors cursor-pointer"
            >
              <div className="w-10 h-10 rounded-2xl bg-[#F0F7FF] flex items-center justify-center flex-shrink-0">
                <Icon size={18} className="text-[#3A86F4]" strokeWidth={2} />
              </div>
              <div className="text-left flex-1">
                <p className="text-[15.5px] font-bold text-[#4A5568]" style={{ fontFamily: F.body }}>{l}</p>
                <p className="text-[11.5px] font-medium text-[#94A3B8] mt-0.5" style={{ fontFamily: F.body }}>{sub}</p>
              </div>
              <ChevronRight size={16} className="text-[#CBD5E1]" />
            </div>
          ))}

          {/* Menu Fungsional: Kontak Darurat */}
          <div className="w-full flex flex-col">
            <button
              onClick={() => setContactsOpen((v) => !v)}
              className="w-full flex items-center gap-3.5 p-4 bg-transparent border-none cursor-pointer hover:bg-[#F8FAFC] transition-colors"
            >
              <div className="w-10 h-10 rounded-2xl bg-[#FEF2F2] flex items-center justify-center flex-shrink-0">
                <Phone size={18} className="text-[#EF4444]" strokeWidth={2} />
              </div>
              <div className="text-left flex-1">
                <p className="text-[15.5px] font-bold text-[#4A5568]" style={{ fontFamily: F.body }}>Kontak Darurat</p>
                <p className="text-[11.5px] font-medium text-[#94A3B8] mt-0.5" style={{ fontFamily: F.body }}>
                  {contacts.length ? `${contacts.length} nomor tersimpan` : "Nomor bantuan cepat"}
                </p>
              </div>
              {contactsOpen ? <ChevronDown size={16} className="text-[#CBD5E1]" /> : <ChevronRight size={16} className="text-[#CBD5E1]" />}
            </button>

            {contactsOpen && (
              <div className="p-4 pt-0 flex flex-col gap-3 bg-[#F8FAFC] border-t border-[#F1F5F9]">
                {contacts.map((c) => (
                  <div key={c.id} className="flex items-center gap-2 p-3 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm">
                    <div className="flex-1">
                      <p className="text-[13.5px] font-bold text-[#2C3E50]" style={{ fontFamily: F.body }}>{c.name}</p>
                      <p className="text-[11.5px] text-[#718096] mt-0.5 font-medium" style={{ fontFamily: F.body }}>
                        {c.phone} {c.relation ? ` · ${c.relation}` : ""}
                      </p>
                    </div>
                    <button
                      onClick={() => deleteEmergencyContactAction(c.id)}
                      className="p-2 hover:bg-[#FEF2F2] rounded-2xl transition-colors cursor-pointer bg-transparent border-none"
                    >
                      <Trash2 size={16} className="text-[#EF4444]" />
                    </button>
                  </div>
                ))}

                <div className="flex gap-2 mt-1">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nama"
                    className="flex-1 min-w-0 text-[13.5px] p-2.5 rounded-2xl border border-[#CBD5E1] outline-none focus:border-[#3A86F4] transition-colors"
                    style={{ fontFamily: F.body }}
                  />
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="No. HP"
                    className="flex-1 min-w-0 text-[13.5px] p-2.5 rounded-2xl border border-[#CBD5E1] outline-none focus:border-[#3A86F4] transition-colors"
                    style={{ fontFamily: F.body }}
                  />
                </div>
                <div className="flex gap-2">
                  <input
                    value={relation}
                    onChange={(e) => setRelation(e.target.value)}
                    placeholder="Hubungan (opsional)"
                    className="flex-1 min-w-0 text-[13.5px] p-2.5 rounded-2xl border border-[#CBD5E1] outline-none focus:border-[#3A86F4] transition-colors"
                    style={{ fontFamily: F.body }}
                  />
                  <button
                    onClick={submitContact}
                    disabled={!name.trim() || !phone.trim() || isPending}
                    className={`flex items-center justify-center gap-1 text-[13.5px] font-bold text-white rounded-2xl px-4 transition-all duration-200 border-none ${
                      name.trim() && phone.trim() && !isPending
                        ? "bg-[#3A86F4] cursor-pointer shadow-md active:scale-95"
                        : "bg-[#CBD5E1] cursor-default"
                    }`}
                    style={{ fontFamily: F.body }}
                  >
                    <Plus size={14} strokeWidth={2.5} /> Tambah
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 5. TOMBOL LOGOUT */}
        <button
          onClick={signOut}
          disabled={signingOut}
          className="w-full py-3.5 mb-2 rounded-2xl border border-[#FECACA] text-[15.5px] font-bold text-[#EF4444] bg-[#FEF2F2] hover:bg-[#FEE2E2] transition-colors cursor-pointer shadow-sm disabled:opacity-60"
        >
          {signingOut ? "Keluar..." : "Keluar dari Akun"}
        </button>
        
      </div>
    </div>
  );
}