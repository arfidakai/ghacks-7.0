// Katalog suara alam bersama -- satu sumber kebenaran untuk file/ikon supaya
// Pulih (pemilihan manual) dan Refleksi (rekomendasi otomatis) tidak duplikat
// path dan berisiko drift. Tidak "server-only": dipakai dari client component.
export type SoundKey = "ombak" | "hujan" | "hutan" | "api";

export const SOUND_ORDER: SoundKey[] = ["ombak", "hujan", "hutan", "api"];

export const SOUND_CATALOG: Record<SoundKey, { label: string; file: string; icon: string; emoji: string }> = {
  ombak: { label: "Ombak", file: "/sounds/ombak.mp3", icon: "/icons/ombak.png", emoji: "🌊" },
  hujan: { label: "Hujan", file: "/sounds/hujan.mp3", icon: "/icons/hujan.png", emoji: "🌧️" },
  hutan: { label: "Hutan", file: "/sounds/hutan.mp3", icon: "/icons/hutan.png", emoji: "🌲" },
  api: { label: "Api Unggun", file: "/sounds/api.mp3", icon: "/icons/api.png", emoji: "🔥" },
};

// Rekomendasi berbasis skor AI jurnal (regulasi_emosi/tekanan_kerja/resiliensi,
export function recommendRecoverySound(scores: {
  regulasi_emosi: number;
  tekanan_kerja: number;
  resiliensi: number;
}): { key: SoundKey; reason: string } {
  const candidates: { key: SoundKey; badness: number; reason: string }[] = [
    {
      key: "hujan",
      badness: scores.tekanan_kerja,
      reason: "Membantu menenangkan pikiran setelah tekanan kerja yang cukup tinggi hari ini.",
    },
    {
      key: "hutan",
      badness: 100 - scores.resiliensi,
      reason: "Suasana alami yang menenangkan, cocok untuk memulihkan resiliensimu.",
    },
    {
      key: "ombak",
      badness: 100 - scores.regulasi_emosi,
      reason: "Irama ombak yang stabil membantu menstabilkan emosimu.",
    },
  ];

  const worst = candidates.reduce((a, b) => (b.badness > a.badness ? b : a));
  if (worst.badness < 35) {
    return { key: "api", reason: "Suasana hangat untuk menutup refleksi hari ini dengan tenang." };
  }
  return { key: worst.key, reason: worst.reason };
}
