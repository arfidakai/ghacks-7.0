import "server-only";
import { GoogleGenerativeAI } from "@google/generative-ai";
import type { JournalScores } from "../data/types";

const apiKey = process.env.GEMINI_API_KEY;
const modelName = process.env.GEMINI_MODEL || "gemini-2.0-flash";

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

function getModel(jsonMode: boolean) {
  if (!genAI) return null;
  return genAI.getGenerativeModel({
    model: modelName,
    generationConfig: jsonMode ? { responseMimeType: "application/json" } : undefined,
  });
}

function clampScore(v: unknown): number {
  const n = typeof v === "number" ? v : Number(v);
  if (!Number.isFinite(n)) return 60;
  return Math.min(100, Math.max(0, Math.round(n)));
}

export type JournalAnalysis = { summary: string; scores: JournalScores };

const FALLBACK_ANALYSIS: JournalAnalysis = {
  summary:
    "Terima kasih sudah menulis jurnal hari ini. Teruskan kebiasaan refleksi ini — ia membantu kamu mengenali polamu sendiri. 🌱",
  scores: { regulasi_emosi: 60, tekanan_kerja: 50, resiliensi: 60 },
};

// AI supplemental untuk journal_entries.ai_summary & ai_scores — gagal diam-diam
// ke fallback supaya halaman Refleksi tetap jalan tanpa API key/kuota.
export async function analyzeJournalEntry(input: {
  kejadian: string;
  respons: string;
  tags: string[];
}): Promise<JournalAnalysis> {
  const model = getModel(true);
  if (!model) return FALLBACK_ANALYSIS;

  const prompt = `Kamu adalah asisten kesehatan mental yang suportif dan berbasis bukti. Analisis jurnal harian berikut (Bahasa Indonesia).

Kejadian: ${input.kejadian}
Respons pengguna: ${input.respons}
Tag emosi: ${input.tags.join(", ") || "(tidak ada)"}

Balas HANYA dalam JSON dengan bentuk persis:
{"summary": string (1-2 kalimat, suportif, bahasa Indonesia, sebut satu pola positif atau area perhatian), "scores": {"regulasi_emosi": number 0-100, "tekanan_kerja": number 0-100, "resiliensi": number 0-100}}`;

  try {
    const result = await model.generateContent(prompt);
    const parsed = JSON.parse(result.response.text());
    return {
      summary: String(parsed.summary ?? FALLBACK_ANALYSIS.summary),
      scores: {
        regulasi_emosi: clampScore(parsed.scores?.regulasi_emosi),
        tekanan_kerja: clampScore(parsed.scores?.tekanan_kerja),
        resiliensi: clampScore(parsed.scores?.resiliensi),
      },
    };
  } catch (err) {
    console.error("Gemini analyzeJournalEntry gagal, pakai fallback:", err);
    return FALLBACK_ANALYSIS;
  }
}

export async function homeRecommendation(context: {
  recentEnergyScores: number[];
  latestMood: string | null;
}): Promise<string> {
  const fallback =
    "Sempatkan sesi napas dalam 5 menit hari ini untuk menjaga energimu tetap stabil. 🌬️";
  const model = getModel(false);
  if (!model) return fallback;

  const trend = context.recentEnergyScores.join(", ") || "(belum ada data)";
  const prompt = `Kamu adalah asisten wellness suportif. Tren skor energi mental pengguna 7 hari terakhir (0-100, urut dari lama ke baru): ${trend}. Mood terakhir: ${context.latestMood ?? "(belum diisi)"}.

Tulis SATU rekomendasi singkat (maks 2 kalimat, bahasa Indonesia, nada hangat dan personal, boleh pakai 1 emoji) untuk membantu pengguna hari ini. Jangan pakai markdown, jangan beri disclaimer, langsung rekomendasinya saja.`;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text().trim() || fallback;
  } catch (err) {
    console.error("Gemini homeRecommendation gagal, pakai fallback:", err);
    return fallback;
  }
}

export async function weeklySummary(context: {
  moodValsByDay: { day: string; value: number }[];
  avgJournalScores: JournalScores | null;
}): Promise<string> {
  const fallback =
    "Minggu ini energimu relatif stabil. Coba jaga waktu istirahat di hari-hari dengan skor terendah. 🗓️";
  const model = getModel(false);
  if (!model) return fallback;

  const days = context.moodValsByDay.map((d) => `${d.day}: ${d.value}`).join(", ");
  const scores = context.avgJournalScores
    ? `Rata-rata regulasi emosi ${context.avgJournalScores.regulasi_emosi}, tekanan kerja ${context.avgJournalScores.tekanan_kerja}, resiliensi ${context.avgJournalScores.resiliensi}.`
    : "Belum ada data jurnal minggu ini.";

  const prompt = `Kamu adalah asisten wellness. Data energi mental mingguan pengguna (0-100): ${days}. ${scores}

Tulis ringkasan mingguan singkat (maks 3 kalimat, bahasa Indonesia, nada hangat, sebutkan hari terbaik dan satu saran konkret untuk minggu depan). Jangan pakai markdown.`;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text().trim() || fallback;
  } catch (err) {
    console.error("Gemini weeklySummary gagal, pakai fallback:", err);
    return fallback;
  }
}
