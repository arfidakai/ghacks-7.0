const DAYS = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const MONTHS = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

export function formatIndonesianDateLabel(d = new Date()): string {
  return `${DAYS[d.getDay()].toUpperCase()}, ${d.getDate()} ${MONTHS[d.getMonth()].toUpperCase()}`;
}

export function todayDateKey(d = new Date()): string {
  return d.toISOString().slice(0, 10);
}

const MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

export function formatShortDateLabel(dateStr: string): string {
  const d = new Date(`${dateStr}T00:00:00`);
  return `${d.getDate()} ${MONTHS_SHORT[d.getMonth()]}`;
}

const DAYS_SHORT = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

export function weekdayShortLabel(dateStr: string): string {
  const d = new Date(`${dateStr}T00:00:00`);
  return DAYS_SHORT[d.getDay()];
}

// 7 tanggal (yyyy-mm-dd) berturut-turut, berakhir hari ini.
export function lastNDateKeys(n: number): string[] {
  const out: string[] = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    out.push(todayDateKey(d));
  }
  return out;
}
