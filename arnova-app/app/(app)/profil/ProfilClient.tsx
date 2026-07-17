"use client";

import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import {
  Info, ClipboardList, Target, Phone, Lock, Shield,
  ChevronRight, ChevronDown, Trash2, Plus,
} from "lucide-react";
import { F } from "@/lib/design/tokens";
import { createClient } from "@/lib/supabase/client";
import { formatShortDateLabel } from "@/lib/date-id";
import type { Profile, EmergencyContact, Assessment, RecoveryPlan } from "@/lib/data/types";
import {
  addEmergencyContactAction,
  deleteEmergencyContactAction,
  updateProfileAction,
  deleteAccountAction,
} from "./actions";

type Section = "profile" | "assessments" | "plan" | "password" | "contacts" | "danger" | null;

const inputClass =
  "w-full min-w-0 text-[13.5px] p-2.5 rounded-2xl border border-[#CBD5E1] outline-none focus:border-[#3A86F4] transition-colors";
const saveBtnClass = (enabled: boolean) =>
  `w-full py-2.5 rounded-2xl text-[13.5px] font-bold text-white border-none transition-all ${
    enabled ? "bg-[#3A86F4] cursor-pointer shadow-md active:scale-95" : "bg-[#CBD5E1] cursor-default"
  }`;

function MenuRow({
  icon,
  iconBg,
  iconColor,
  label,
  sub,
  open,
  onClick,
}: {
  icon: ReactNode;
  iconBg: string;
  iconColor: string;
  label: string;
  sub: string;
  open: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3.5 p-4 bg-transparent border-none cursor-pointer hover:bg-[#F8FAFC] transition-colors text-left"
    >
      <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: iconBg, color: iconColor }}>
        {icon}
      </div>
      <div className="text-left flex-1">
        <p className="text-[15.5px] font-bold text-[#4A5568]" style={{ fontFamily: F.body }}>{label}</p>
        <p className="text-[11.5px] font-medium text-[#94A3B8] mt-0.5" style={{ fontFamily: F.body }}>{sub}</p>
      </div>
      {open ? <ChevronDown size={16} className="text-[#CBD5E1]" /> : <ChevronRight size={16} className="text-[#CBD5E1]" />}
    </button>
  );
}

export function ProfilClient({
  profile,
  energyScore,
  burnoutRisk,
  streakDays,
  contacts,
  assessments,
  plan,
}: {
  profile: Profile;
  energyScore: number;
  burnoutRisk: number;
  streakDays: number;
  contacts: EmergencyContact[];
  assessments: Assessment[];
  plan: RecoveryPlan | null;
}) {
  const router = useRouter();
  const [openSection, setOpenSection] = useState<Section>(null);
  const toggleSection = (s: Section) => setOpenSection((prev) => (prev === s ? null : s));

  const [signingOut, setSigningOut] = useState(false);

  // Kontak Darurat
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [relation, setRelation] = useState("");
  const [isPending, setIsPending] = useState(false);

  // Info Pribadi
  const [fullName, setFullName] = useState(profile.full_name ?? "");
  const [occupation, setOccupation] = useState(profile.occupation ?? "");
  const [city, setCity] = useState(profile.city ?? "");
  const [savingProfile, setSavingProfile] = useState(false);

  // Ganti Password
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  // Privasi & Data
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [deletingAccount, setDeletingAccount] = useState(false);

  const signOut = async () => {
    setSigningOut(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  const stats = [
    { l: "Energi", v: String(energyScore), u: "/100", c: "#3A86F4" },
    { l: "Hari Aktif", v: String(streakDays), u: " hr", c: "#8B5CF6" },
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

  const saveProfile = async () => {
    setSavingProfile(true);
    try {
      await updateProfileAction({ full_name: fullName, occupation, city });
    } finally {
      setSavingProfile(false);
    }
  };

  const changePassword = async () => {
    setPasswordError(null);
    setPasswordSuccess(false);
    if (newPassword.length < 6) {
      setPasswordError("Password minimal 6 karakter.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("Konfirmasi password tidak cocok.");
      return;
    }
    setSavingPassword(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) {
        setPasswordError(error.message);
        return;
      }
      setPasswordSuccess(true);
      setNewPassword("");
      setConfirmPassword("");
    } finally {
      setSavingPassword(false);
    }
  };

  const confirmDeleteAccount = async () => {
    if (deleteConfirmText.trim().toUpperCase() !== "HAPUS" || deletingAccount) return;
    setDeletingAccount(true);
    try {
      await deleteAccountAction();
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push("/login");
    } finally {
      setDeletingAccount(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#EAF5FF] to-[#FFFFFF] text-[#2C3E50] w-full relative shadow-2xl pb-28 select-none">

      {/* 1. HEADER PROFIL (Blue Gradient) */}
      <div className="bg-gradient-to-b from-[#3A86F4] via-[#4894FF] to-[#60A5FF] px-6 pt-12 pb-10 rounded-b-2xl text-white relative overflow-hidden shadow-lg flex-shrink-0">
        <div className="absolute -right-10 -top-10 w-44 h-44 rounded-full bg-white/10 blur-xl pointer-events-none" />
        <div className="absolute right-12 bottom-2 w-28 h-28 rounded-full bg-white/5 blur-lg pointer-events-none" />

        <div className="flex items-center gap-4 relative z-10">
          <div className="w-[72px] h-[72px] rounded-full bg-[#ECF4FF] border-4 border-white/40 shadow-[0_4px_20px_rgba(0,0,0,0.15)] flex items-center justify-center text-[32px] overflow-hidden flex-shrink-0">
            {profile.avatar_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={profile.avatar_url} alt={profile.full_name ?? "Avatar"} className="w-full h-full object-cover" />
            ) : (
              "😊"
            )}
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
                Aktif {streakDays} hari berturut
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

        {/* 3. LIST MENU */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden flex flex-col">

          {/* Info Pribadi */}
          <div className="border-b border-[#F1F5F9]">
            <MenuRow
              icon={<Info size={18} strokeWidth={2} />}
              iconBg="#F0F7FF"
              iconColor="#3A86F4"
              label="Info Pribadi"
              sub="Nama, pekerjaan, kota"
              open={openSection === "profile"}
              onClick={() => toggleSection("profile")}
            />
            {openSection === "profile" && (
              <div className="p-4 pt-0 flex flex-col gap-3 bg-[#F8FAFC] border-t border-[#F1F5F9]">
                <input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Nama lengkap" className={inputClass} style={{ fontFamily: F.body }} />
                <input value={occupation} onChange={(e) => setOccupation(e.target.value)} placeholder="Pekerjaan" className={inputClass} style={{ fontFamily: F.body }} />
                <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Kota" className={inputClass} style={{ fontFamily: F.body }} />
                <button onClick={saveProfile} disabled={savingProfile} className={saveBtnClass(!savingProfile)} style={{ fontFamily: F.body }}>
                  {savingProfile ? "Menyimpan..." : "Simpan Perubahan"}
                </button>
              </div>
            )}
          </div>

          {/* Hasil Assessment */}
          <div className="border-b border-[#F1F5F9]">
            <MenuRow
              icon={<ClipboardList size={18} strokeWidth={2} />}
              iconBg="#F0F7FF"
              iconColor="#3A86F4"
              label="Hasil Assessment"
              sub="Riwayat screening"
              open={openSection === "assessments"}
              onClick={() => toggleSection("assessments")}
            />
            {openSection === "assessments" && (
              <div className="p-4 pt-0 flex flex-col gap-2.5 bg-[#F8FAFC] border-t border-[#F1F5F9]">
                {assessments.length === 0 && (
                  <p className="text-[12.5px] text-[#94A3B8] font-medium" style={{ fontFamily: F.body }}>Belum ada riwayat screening.</p>
                )}
                {assessments.map((a) => (
                  <div key={a.id} className="flex items-center justify-between p-3 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm">
                    <div>
                      <p className="text-[12.5px] font-bold text-[#2C3E50]" style={{ fontFamily: F.body }}>
                        {formatShortDateLabel(a.created_at.slice(0, 10))}
                      </p>
                      <p className="text-[10.5px] text-[#718096] mt-0.5" style={{ fontFamily: F.body }}>
                        Tidur {a.sleep_quality} · Stres {a.stress_level} · Produktivitas {a.productivity}
                      </p>
                    </div>
                    <span className="text-[13.5px] font-bold text-[#3A86F4]" style={{ fontFamily: F.mono }}>{a.energy_score}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Target Wellbeing (Recovery Plan aktif) */}
          <div className="border-b border-[#F1F5F9]">
            <MenuRow
              icon={<Target size={18} strokeWidth={2} />}
              iconBg="#F0F7FF"
              iconColor="#3A86F4"
              label="Target Wellbeing"
              sub="Fokus dari Recovery Plan aktif"
              open={openSection === "plan"}
              onClick={() => toggleSection("plan")}
            />
            {openSection === "plan" && (
              <div className="p-4 pt-0 flex flex-col gap-3 bg-[#F8FAFC] border-t border-[#F1F5F9]">
                {plan ? (
                  <>
                    <p className="text-[12.5px] text-[#4A5568] font-medium leading-relaxed" style={{ fontFamily: F.body }}>
                      {plan.summary}
                    </p>
                    {plan.focus_areas.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {plan.focus_areas.map((area) => (
                          <span key={area} className="inline-block bg-[#ECF4FF] text-[#1E58D8] text-[10.5px] font-bold px-2.5 py-1 rounded-full border border-[#BFDBFE]">
                            {area}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex flex-col gap-1.5">
                      {plan.checklist.map((t) => (
                        <div key={t.task} className="p-2.5 rounded-2xl bg-white border border-[#E2E8F0]">
                          <span className="text-[12.5px] text-[#4A5568] font-medium" style={{ fontFamily: F.body }}>{t.task}</span>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <p className="text-[12.5px] text-[#94A3B8] font-medium" style={{ fontFamily: F.body }}>
                    Rencana pemulihanmu sedang disiapkan.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Ganti Password */}
          <div className="border-b border-[#F1F5F9]">
            <MenuRow
              icon={<Lock size={18} strokeWidth={2} />}
              iconBg="#F0F7FF"
              iconColor="#3A86F4"
              label="Ganti Password"
              sub="Perbarui password akunmu"
              open={openSection === "password"}
              onClick={() => toggleSection("password")}
            />
            {openSection === "password" && (
              <div className="p-4 pt-0 flex flex-col gap-3 bg-[#F8FAFC] border-t border-[#F1F5F9]">
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Password baru"
                  className={inputClass}
                  style={{ fontFamily: F.body }}
                />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Konfirmasi password baru"
                  className={inputClass}
                  style={{ fontFamily: F.body }}
                />
                {passwordError && (
                  <p className="text-[11.5px] font-semibold text-[#E53E3E]" style={{ fontFamily: F.body }}>{passwordError}</p>
                )}
                {passwordSuccess && (
                  <p className="text-[11.5px] font-semibold text-[#16A34A]" style={{ fontFamily: F.body }}>Password berhasil diganti.</p>
                )}
                <button
                  onClick={changePassword}
                  disabled={savingPassword || !newPassword || !confirmPassword}
                  className={saveBtnClass(!savingPassword && !!newPassword && !!confirmPassword)}
                  style={{ fontFamily: F.body }}
                >
                  {savingPassword ? "Menyimpan..." : "Simpan Password Baru"}
                </button>
              </div>
            )}
          </div>

          {/* Kontak Darurat */}
          <div className="border-b border-[#F1F5F9]">
            <MenuRow
              icon={<Phone size={18} strokeWidth={2} />}
              iconBg="#FEF2F2"
              iconColor="#EF4444"
              label="Kontak Darurat"
              sub={contacts.length ? `${contacts.length} nomor tersimpan` : "Nomor bantuan cepat"}
              open={openSection === "contacts"}
              onClick={() => toggleSection("contacts")}
            />
            {openSection === "contacts" && (
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
                    className={inputClass}
                    style={{ fontFamily: F.body }}
                  />
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="No. HP"
                    className={inputClass}
                    style={{ fontFamily: F.body }}
                  />
                </div>
                <div className="flex gap-2">
                  <input
                    value={relation}
                    onChange={(e) => setRelation(e.target.value)}
                    placeholder="Hubungan (opsional)"
                    className={inputClass}
                    style={{ fontFamily: F.body }}
                  />
                  <button
                    onClick={submitContact}
                    disabled={!name.trim() || !phone.trim() || isPending}
                    className={`flex items-center justify-center gap-1 text-[13.5px] font-bold text-white rounded-2xl px-4 transition-all duration-200 border-none flex-shrink-0 ${
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

          {/* Privasi & Data */}
          <div>
            <MenuRow
              icon={<Shield size={18} strokeWidth={2} />}
              iconBg="#FEF2F2"
              iconColor="#EF4444"
              label="Privasi & Data"
              sub="Hapus akun & semua datamu"
              open={openSection === "danger"}
              onClick={() => toggleSection("danger")}
            />
            {openSection === "danger" && (
              <div className="p-4 pt-0 flex flex-col gap-3 bg-[#FEF2F2] border-t border-[#FECACA]">
                <p className="text-[12px] text-[#B91C1C] font-medium leading-relaxed" style={{ fontFamily: F.body }}>
                  Tindakan ini menghapus akun beserta seluruh datamu (jurnal, mood, assessment, rencana pemulihan,
                  kontak darurat) secara permanen dan tidak bisa dibatalkan.
                </p>
                <input
                  value={deleteConfirmText}
                  onChange={(e) => setDeleteConfirmText(e.target.value)}
                  placeholder='Ketik "HAPUS" untuk konfirmasi'
                  className="w-full text-[13.5px] p-2.5 rounded-2xl border border-[#FCA5A5] outline-none focus:border-[#EF4444] transition-colors bg-white"
                  style={{ fontFamily: F.body }}
                />
                <button
                  onClick={confirmDeleteAccount}
                  disabled={deleteConfirmText.trim().toUpperCase() !== "HAPUS" || deletingAccount}
                  className={`w-full py-2.5 rounded-2xl text-[13.5px] font-bold text-white border-none transition-all ${
                    deleteConfirmText.trim().toUpperCase() === "HAPUS" && !deletingAccount
                      ? "bg-[#EF4444] cursor-pointer shadow-md active:scale-95"
                      : "bg-[#FCA5A5] cursor-default"
                  }`}
                  style={{ fontFamily: F.body }}
                >
                  {deletingAccount ? "Menghapus..." : "Hapus Akun & Data Permanen"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 4. TOMBOL LOGOUT */}
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
