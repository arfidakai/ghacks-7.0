# ARNOVA.AI — MENTAL WELLBEING KNOWLEDGE BOOK
## Modul: PSYCHOMETRIC ASSESSMENT
### Draft 6 — Part 1 dari N (Bab 0 – Bab 3)

**Sifat dokumen:** Internal knowledge base, bukan untuk pengguna umum. Modul ini adalah lapisan **pengukuran** ARNOVA.AI — menerjemahkan keluhan kualitatif (Draft 3), gaya komunikasi (Draft 4), dan pilihan intervensi (Draft 5) ke dalam **angka yang tervalidasi**, agar sistem punya dasar kuantitatif untuk klasifikasi keparahan dan keputusan eskalasi, bukan sekadar kesan subjektif dari teks.

**Catatan skop:** 8 instrumen yang diminta (WHO-5, GAD-7, PHQ-9, DASS-21, PSS, ISI, MSPSS, CD-RISC) masing-masing memiliki data psikometrik presisi (item, cut-off, sensitivitas/spesifisitas) yang harus akurat — kesalahan di sini punya konsekuensi langsung pada keputusan eskalasi. Part 1 ini memuat Bab 0 (kerangka penggunaan psikometri oleh AI — termasuk batas fundamental self-report digital) + 3 instrumen inti yang paling sering jadi pintu masuk skrining: **WHO-5 (wellbeing umum), PHQ-9 (depresi), GAD-7 (anxiety)**. Instrumen lain (DASS-21, PSS, ISI, MSPSS, CD-RISC) menyusul di Part 2 dengan kedalaman setara.

---

# BAB 0 — KERANGKA PENGGUNAAN PSIKOMETRI OLEH AI

## 0.1 Prinsip Dasar: Instrumen Tervalidasi ≠ Alat Diagnostik Otomatis
Semua instrumen dalam modul ini adalah **screening tools**, bukan *diagnostic instruments*. Skor tinggi pada PHQ-9 mengindikasikan "probable case" yang memerlukan asesmen klinis lanjutan, bukan diagnosis Major Depressive Disorder itu sendiri — diagnosis formal memerlukan wawancara klinis terstruktur (mis. SCID-5) oleh profesional (Kroenke, Spitzer, & Williams, 2001, *J Gen Intern Med*, secara eksplisit menyebut PHQ-9 sebagai *"a screening tool"* dengan *provisional diagnosis* yang perlu konfirmasi klinis). Ini konsisten dengan prinsip Bab 0.2 di Draft 3 (Screener, Not Diagnostician) — modul ini adalah implementasi kuantitatif dari prinsip tersebut.

## 0.2 Mengapa Fidelity Administrasi Penting bagi AI
Nilai psikometrik (sensitivitas, spesifisitas, cut-off) dihitung berdasarkan **administrasi standar** — item dibacakan/ditampilkan persis sesuai instrumen asli, dengan skala respons dan jangka waktu recall yang sama persis (mis. PHQ-9 menanyakan "2 minggu terakhir", GAD-7 juga "2 minggu terakhir"). Jika AI memparafrase item secara bebas atau mengubah jangka waktu recall, **validitas psikometrik yang dirujuk dalam bab ini tidak lagi berlaku** — AI wajib menyajikan item secara verbatim (atau terjemahan resmi tervalidasi) dan skala respons asli.

## 0.3 Batas Fundamental: Self-Report Digital vs Self-Report Terstruktur Klinis
Self-report yang diisi melalui percakapan konversasional (bukan formulir terstruktur) berisiko mengalami *response shift* — jawaban dipengaruhi oleh cara AI memfrasakan pertanyaan, urutan, dan konteks percakapan sebelumnya (bias framing, dijelaskan luas dalam literatur survey methodology; Tourangeau, Rips, & Rasinski, 2000, *The Psychology of Survey Response*). Implikasi: idealnya instrumen ini disajikan sebagai **modul terstruktur eksplisit** (pengguna sadar sedang mengisi asesmen formal) dan bukan diinferensi diam-diam dari obrolan bebas.

## 0.4 Prinsip Interpretasi Skor: Selalu Kontekstual, Tidak Pernah Berdiri Sendiri
Skor numerik harus selalu dipadukan dengan: (a) item risiko spesifik (khususnya item bunuh diri PHQ-9 #9 — lihat Bab 2), (b) durasi dan tren dari waktu ke waktu (skor tunggal kurang informatif dibanding tren menurun/meningkat), dan (c) konteks kualitatif dari Draft 3. Skor total yang sama bisa punya makna klinis sangat berbeda tergantung pola jawaban per item.

## 0.5 Kerangka Algoritma Klasifikasi Umum
```
[Item dijawab lengkap sesuai skala asli]
        │
        ▼
[Hitung skor total sesuai formula resmi instrumen]
        │
        ▼
[Cek item risiko kritis (bila ada, mis. PHQ-9 #9)] ──(positif)──► HARD OVERRIDE → protokol eskalasi (Bab 0.3, Draft 3), terlepas dari skor total
        │ (negatif/tidak ada item risiko)
        ▼
[Petakan skor total ke kategori keparahan sesuai cut-off resmi]
        │
        ▼
[Gabungkan dengan tren historis (jika ada data sesi sebelumnya)]
        │
        ▼
[Tentukan respons: psikoedukasi / self-help / dorongan konsultasi profesional, sesuai stepped care]
```

## 0.6 Etika Penggunaan Berulang
Instrumen ini dapat digunakan berulang untuk memantau tren (mis. PHQ-9 mingguan), namun AI harus transparan bahwa ini adalah **alat pemantauan**, bukan pengganti evaluasi profesional periodik, dan harus menghindari penggunaan skor sebagai "gamifikasi" (mis. framing skor rendah sebagai "pencapaian") yang berisiko mendorong under-reporting.

---

# BAB 1 — WHO-5 WELL-BEING INDEX

## 1. Definisi
WHO-5 adalah instrumen skrining ultra-singkat (5 item) yang dikembangkan WHO untuk mengukur **kesejahteraan subjektif** (bukan patologi) selama 2 minggu terakhir, digunakan luas sebagai *generic screening tool* lintas kondisi kesehatan mental dan fisik (WHO Regional Office for Europe, 1998; Topp, Østergaard, Søndergaard, & Bech, 2015, *Psychother Psychosom*, "The WHO-5 Well-Being Index: A Systematic Review of the Literature").

## 2. Tujuan
Sebagai *first-line screener* yang sangat singkat untuk mendeteksi kemungkinan penurunan kesejahteraan yang memerlukan skrining lanjutan lebih spesifik (mis. lanjut ke PHQ-9 bila skor rendah) — dirancang untuk meminimalkan beban responden di titik kontak pertama.

## 3. Kapan Digunakan / Cara Penggunaan
Digunakan di awal interaksi (entry point) sebelum instrumen yang lebih spesifik dan panjang, atau untuk pemantauan berkala ringan. Terdiri dari 5 pernyataan positif (mis. "Saya merasa ceria dan bersemangat", "Saya bangun dengan perasaan segar dan istirahat cukup"), dijawab dengan skala 0 (tidak pernah) hingga 5 (sepanjang waktu), merujuk pada 2 minggu terakhir.

## 4. Dasar Teori
WHO-5 dibangun dari perspektif **subjective well-being** (Diener, 1984) yang memandang kesejahteraan sebagai konstruk positif tersendiri, bukan sekadar ketiadaan gejala patologis — konsisten dengan definisi kesehatan mental WHO sebagai *"a state of well-being"*, bukan hanya *absence of disease* (WHO, *Constitution of WHO*, 1946, prinsip yang terus dipertahankan dalam kerangka WHO mental health modern).

## 5. Konsep Utama — Validitas & Reliabilitas
- **Reliabilitas:** Cronbach's alpha berkisar 0.83–0.95 lintas berbagai studi dan populasi (Topp et al., 2015, systematic review terhadap >200 studi).
- **Validitas:** WHO-5 menunjukkan validitas konstruk baik sebagai proxy skrining depresi (korelasi kuat dengan instrumen depresi lain) dan telah divalidasi lintas budaya di >30 negara.
- **Cut-off score:** total skor mentah (0–25) dikonversi ke persentase (0–100, dikalikan 4). **Skor ≤50 (persentase)** mengindikasikan kesejahteraan rendah dan menjadi sinyal untuk skrining depresi lebih lanjut (mis. PHQ-9); skor ≤28 sering dipakai sebagai indikasi kemungkinan depresi klinis yang memerlukan evaluasi (Topp et al., 2015).

## 6. Framework Berpikir
Psikolog menggunakan WHO-5 bukan untuk menyimpulkan diagnosis, melainkan sebagai *triage cepat* — skor rendah adalah sinyal untuk memperdalam asesmen, bukan kesimpulan akhir.

## 7. Langkah Kerja Psikolog
1. Administrasikan 5 item dengan skala waktu 2 minggu terakhir.
2. Hitung skor mentah (0–25), konversi ke persentase (×4).
3. Jika ≤50, lanjutkan ke instrumen spesifik (PHQ-9/GAD-7 sesuai presentasi klinis).
4. Gunakan hasil sebagai starting point diskusi, bukan vonis.

## 8. Decision Making
Psikolog memutuskan instrumen lanjutan mana yang paling relevan berdasarkan kombinasi skor WHO-5 rendah + konten kualitatif yang muncul dalam sesi (mis. kalau dominan cerita kekhawatiran → GAD-7; dominan cerita kehilangan minat/mood rendah → PHQ-9).

## 9. Contoh Kasus & Contoh Scoring
Pengguna menjawab 5 item WHO-5: "Saya merasa ceria" = 1, "Saya merasa tenang dan santai" = 2, "Saya merasa aktif dan bersemangat" = 1, "Saya bangun dengan perasaan segar" = 0, "Kehidupan sehari-hari saya penuh hal menarik" = 1.
**Skor mentah = 1+2+1+0+1 = 5. Persentase = 5 × 4 = 20.**

## 10. Analisis Kasus
Skor 20 jauh di bawah cut-off 50, mengindikasikan kesejahteraan sangat rendah di seluruh domain (bukan hanya satu area) — pola merata rendah di semua item (bukan satu item outlier) memperkuat sinyal bahwa ini bukan variasi harian biasa. Langkah tepat: lanjutkan ke PHQ-9 untuk menilai kemungkinan depresi secara lebih spesifik, sambil tetap memantau red flag.

## 11. Implementasi pada AI

**Algoritma Klasifikasi:**
```
skor_total = jumlah(item_1..item_5)  # rentang 0-25
skor_persen = skor_total × 4          # rentang 0-100

JIKA skor_persen ≤ 28:
    kategori = "sangat rendah — indikasi kuat perlu skrining depresi lanjutan"
JIKA ELIF skor_persen ≤ 50:
    kategori = "rendah — sinyal untuk skrining lanjutan"
LAINNYA:
    kategori = "dalam rentang wajar"
```
**Decision Tree:**
```
[WHO-5 selesai diisi] → Hitung skor_persen
        │
        ▼
[skor_persen ≤ 50?] ──(tidak)──► Tidak perlu eskalasi instrumen; lanjutkan percakapan suportif biasa
        │ (ya)
        ▼
[Tentukan instrumen lanjutan berdasar konten kualitatif dominan]
        │
        ├─(dominan mood/anhedonia)──► PHQ-9 (Bab 2)
        └─(dominan worry/tegang)────► GAD-7 (Bab 3)
```
**Lapisan Deteksi:** WHO-5 cocok dipakai sebagai *opening structured check-in* (mis. fitur "cek kesejahteraan mingguan"), bukan disisipkan paksa di tengah obrolan bebas.
**Guardrail:** skor rendah TIDAK otomatis berarti depresi — sistem harus melabeli hasil sebagai "sinyal untuk eksplorasi lebih lanjut", bukan kesimpulan.

## 12. Do & Don't (Kelebihan & Kekurangan)
**Kelebihan:** sangat singkat (rendah beban), berfokus positif (tidak terasa seperti interogasi patologi), tervalidasi lintas budaya luas.
**Kekurangan:** karena generik, tidak dapat membedakan sumber penyebab rendahnya kesejahteraan (fisik, mental, situasional) — memerlukan instrumen lanjutan untuk spesifisitas.
**Do:** gunakan sebagai entry point/pemantauan tren; kombinasikan dengan instrumen spesifik saat skor rendah.
**Don't:** menggunakan WHO-5 sendirian untuk menyimpulkan kondisi klinis spesifik apa pun.

## 13. Limitasi
WHO-5 tidak memiliki item yang menilai risiko keselamatan (tidak seperti PHQ-9 dengan item #9) — sistem tidak boleh mengandalkan WHO-5 saja untuk skrining risiko krisis. Norma cut-off sebagian besar berasal dari populasi Eropa/klinis Barat; adaptasi ke konteks budaya Indonesia idealnya menggunakan versi terjemahan resmi WHO dengan validasi lokal tambahan bila tersedia.

## 14. Referensi Ilmiah Resmi
WHO Regional Office for Europe (1998, *Wellbeing Measures in Primary Health Care/The DEPCARE Project*); Topp, Østergaard, Søndergaard, & Bech (2015, *Psychother Psychosom*, 84(3)); Diener (1984, *Psychol Bull*, "Subjective well-being").

## 15. Ringkasan Knowledge Base
WHO-5 adalah entry-point screener 5-item yang mengukur kesejahteraan positif, dengan cut-off ≤50% sebagai sinyal untuk skrining lanjutan spesifik — bukan alat diagnosis, dan tidak mengandung item risiko keselamatan sehingga tidak bisa berdiri sendiri untuk asesmen krisis.

---

# BAB 2 — PHQ-9 (PATIENT HEALTH QUESTIONNAIRE-9)

## 1. Definisi
PHQ-9 adalah instrumen skrining 9-item yang secara langsung merepresentasikan 9 kriteria diagnostik Major Depressive Disorder dalam DSM, digunakan luas di layanan primer maupun kesehatan mental untuk skrining dan pemantauan keparahan gejala depresi (Kroenke, Spitzer, & Williams, 2001, *J Gen Intern Med*, 16(9)).

## 2. Tujuan
Mengukur keparahan gejala depresi selama 2 minggu terakhir secara kuantitatif, memungkinkan klasifikasi tingkat keparahan dan pemantauan perubahan dari waktu ke waktu, serta — krusial — menyaring risiko bunuh diri melalui item #9.

## 3. Kapan Digunakan / Cara Penggunaan
Digunakan ketika WHO-5 rendah dengan konten dominan mood/anhedonia, atau ketika pengguna melaporkan gejala yang konsisten dengan Bab 3 Draft 3 (Depression). 9 item dijawab dengan skala 0 (tidak pernah) – 3 (hampir setiap hari), merujuk 2 minggu terakhir, ditambah 1 pertanyaan tambahan (tidak diskor) tentang dampak fungsional.

## 4. Dasar Teori
Setiap item PHQ-9 dipetakan langsung ke satu kriteria diagnostik DSM (APA, *DSM-5-TR*, 2022) — desain ini disengaja agar instrumen memiliki *content validity* tinggi terhadap definisi klinis depresi, bukan konstruk yang longgar terkait mood.

## 5. Konsep Utama — Validitas & Reliabilitas
- **Reliabilitas:** Cronbach's alpha 0.86–0.89 (Kroenke et al., 2001).
- **Validitas kriteria:** pada cut-off skor 10, sensitivitas 88% dan spesifisitas 88% terhadap diagnosis Major Depressive Disorder yang dikonfirmasi wawancara klinis (Kroenke et al., 2001) — validasi ulang meta-analisis besar mengonfirmasi performa serupa (Manea, Gilbody, & McMillan, 2012, *CMAJ*, meta-analisis 18 studi validasi).
- **Cut-off score:** 0–4 minimal, 5–9 ringan, 10–14 sedang, 15–19 sedang-berat, 20–27 berat (Kroenke et al., 2001).

## 6. Framework Berpikir
Psikolog tidak pernah membaca skor total tanpa memeriksa item #9 terlebih dahulu ("pikiran bahwa Anda lebih baik mati, atau menyakiti diri sendiri") — item ini diperlakukan sebagai **item independen berisiko tinggi**, terlepas dari skor total keseluruhan.

## 7. Langkah Kerja Psikolog
1. Administrasikan 9 item + 1 item fungsional.
2. **Periksa item #9 terlebih dahulu, sebelum menghitung skor total.** Jika positif (skor ≥1), lakukan asesmen risiko lanjutan segera.
3. Hitung skor total (0–27).
4. Klasifikasikan keparahan sesuai cut-off.
5. Integrasikan dengan item fungsional (seberapa sulit gejala ini mengganggu pekerjaan/rumah/relasi) untuk menilai signifikansi klinis, bukan hanya angka.

## 8. Decision Making
Psikolog memilih intensitas intervensi berdasarkan kombinasi skor total DAN status item #9 DAN item fungsional — bukan skor total sendirian. Skor 12 dengan item #9 positif jauh lebih mendesak daripada skor 16 tanpa item #9 dan fungsi masih relatif terjaga.

## 9. Contoh Kasus & Contoh Scoring
Pengguna menjawab (skala 0–3): kurang minat=2, mood rendah=2, gangguan tidur=3, lelah=2, nafsu makan berubah=1, rasa tidak berharga=2, sulit konsentrasi=1, gerakan lambat/gelisah=0, **pikiran lebih baik mati/menyakiti diri=1**.
**Skor total = 2+2+3+2+1+2+1+0+1 = 14 (kategori "sedang").**

## 10. Analisis Kasus
Meski skor total (14) hanya masuk kategori "sedang" dan secara sekilas tidak terlihat sebagai kasus paling berat, **item #9 bernilai 1 (bukan 0) adalah temuan independen yang WAJIB memicu asesmen risiko lanjutan** — ini adalah inti dari mengapa item #9 diperlakukan sebagai hard override, bukan sekadar salah satu dari sembilan angka yang dijumlahkan. Klasifikasi "sedang" tidak boleh membuat sistem menurunkan kewaspadaan terhadap sinyal risiko yang sudah muncul eksplisit.

## 11. Implementasi pada AI

**Algoritma Klasifikasi:**
```
skor_total = jumlah(item_1..item_9)  # rentang 0-27
item_9 = nilai_item_spesifik(9)

JIKA item_9 ≥ 1:
    TRIGGER protokol_eskalasi_risiko()  # HARD OVERRIDE, independen dari skor_total
    
JIKA skor_total antara 0-4: kategori = "minimal"
JIKA skor_total antara 5-9: kategori = "ringan"
JIKA skor_total antara 10-14: kategori = "sedang"
JIKA skor_total antara 15-19: kategori = "sedang-berat"
JIKA skor_total antara 20-27: kategori = "berat"
```
**Decision Tree:**
```
[PHQ-9 selesai diisi]
        │
        ▼
[Item #9 ≥ 1?] ──(YA)──► Protokol eskalasi risiko (Bab 0.3, Draft 3) SEGERA — paralel dengan proses lain, tidak menunggu skor total
        │ (TIDAK)
        ▼
[Hitung skor total → klasifikasi keparahan]
        │
        ├─ minimal/ringan → psikoedukasi + behavioral activation ringan (Draft 5, Bab Behavioral Activation)
        ├─ sedang → dorongan konsultasi profesional + self-help terpandu
        └─ sedang-berat/berat → dorongan kuat konsultasi profesional segera
```
**Guardrail:** item #9 positif TIDAK PERNAH diabaikan meski pengguna kemudian mengatakan "cuma iseng jawab" atau meminta mengubah jawaban — sistem tetap menindaklanjuti dengan pertanyaan klarifikasi risiko yang lembut, bukan menghapus flag begitu saja.

## 12. Do & Don't (Kelebihan & Kekurangan)
**Kelebihan:** dipetakan langsung ke kriteria DSM (validitas konten tinggi), instrumen paling banyak divalidasi di dunia untuk skrining depresi, cepat (butuh <5 menit).
**Kekurangan:** self-report rentan bias sosial (under/over-reporting tergantung stigma budaya); tidak membedakan MDD dari episode depresi dalam gangguan bipolar (memerlukan skrining riwayat manik terpisah).
**Do:** selalu cek item #9 dulu; gunakan skor untuk memandu intensitas respons bertingkat.
**Don't:** membaca skor total tanpa memeriksa item #9; menyimpulkan diagnosis MDD murni dari skor tanpa mempertimbangkan riwayat manik/hipomanik.

## 13. Limitasi
PHQ-9 tidak dapat membedakan gejala depresi dari gejala kondisi medis lain yang overlap (mis. hipotiroid menyebabkan kelelahan/perubahan berat badan); validitas cut-off sebagian besar divalidasi pada populasi klinis Barat, memerlukan kehati-hatian interpretasi lintas budaya.

## 14. Referensi Ilmiah Resmi
Kroenke, Spitzer, & Williams (2001, *J Gen Intern Med*, 16(9)); Manea, Gilbody, & McMillan (2012, *CMAJ*, 184(3)); APA, *DSM-5-TR* (2022); NICE NG222 (2022, rekomendasi penggunaan instrumen skrining tervalidasi termasuk PHQ-9 dalam stepped care).

## 15. Ringkasan Knowledge Base
PHQ-9 memetakan langsung ke kriteria diagnostik depresi, dengan item #9 sebagai hard override risiko independen dari skor total — arsitektur AI wajib memproses item #9 sebagai jalur terpisah, bukan sekadar komponen penjumlahan skor.

---

# BAB 3 — GAD-7 (GENERALIZED ANXIETY DISORDER-7)

## 1. Definisi
GAD-7 adalah instrumen skrining 7-item untuk mengukur keparahan gejala generalized anxiety disorder selama 2 minggu terakhir, dikembangkan dan divalidasi sebagai instrumen singkat dengan performa psikometrik kuat untuk skrining di layanan primer (Spitzer, Kroenke, Williams, & Löwe, 2006, *Arch Intern Med*, 166(10)).

## 2. Tujuan
Mengukur keparahan gejala kecemasan secara kuantitatif dan mendukung keputusan intensitas intervensi bertingkat, sekaligus berfungsi sebagai instrumen skrining yang cukup sensitif untuk gangguan kecemasan lain (panic disorder, social anxiety disorder) meski awalnya dirancang untuk GAD.

## 3. Kapan Digunakan / Cara Penggunaan
Digunakan ketika WHO-5 rendah dengan konten dominan worry/tegang, atau ketika presentasi pengguna konsisten dengan Bab 2 Draft 3 (Anxiety). 7 item dijawab skala 0 (tidak pernah) – 3 (hampir setiap hari), merujuk 2 minggu terakhir.

## 4. Dasar Teori
Item-item GAD-7 merepresentasikan kriteria diagnostik DSM untuk GAD (kekhawatiran berlebihan, sulit mengendalikan worry, gelisah, mudah lelah, sulit konsentrasi, iritabilitas, tegang otot, gangguan tidur — dipadatkan menjadi 7 item inti yang paling diskriminatif secara statistik dari analisis item awal yang lebih panjang).

## 5. Konsep Utama — Validitas & Reliabilitas
- **Reliabilitas:** Cronbach's alpha 0.92 (Spitzer et al., 2006) — sangat tinggi untuk instrumen sesingkat ini.
- **Validitas kriteria:** pada cut-off 10, sensitivitas 89% dan spesifisitas 82% terhadap diagnosis GAD (Spitzer et al., 2006); studi validasi juga menunjukkan performa baik untuk mendeteksi panic disorder, social anxiety disorder, dan PTSD (Kroenke, Spitzer, Williams, Monahan, & Löwe, 2007, *Ann Intern Med*) — menjadikannya *transdiagnostic anxiety screener* yang berguna, bukan hanya untuk GAD murni.
- **Cut-off score:** 0–4 minimal, 5–9 ringan, 10–14 sedang, 15–21 berat (Spitzer et al., 2006).

## 6. Framework Berpikir
Psikolog menggunakan GAD-7 bukan untuk membedakan jenis gangguan cemas spesifik (itu perlu wawancara klinis), melainkan sebagai indikator keparahan umum yang memandu urgensi rujukan.

## 7. Langkah Kerja Psikolog
1. Administrasikan 7 item.
2. Hitung skor total (0–21).
3. Klasifikasikan keparahan.
4. Kombinasikan dengan observasi kualitatif untuk menduga subtipe (GAD vs panic vs social anxiety) sebagai hipotesis awal yang perlu konfirmasi klinis, bukan kesimpulan final.

## 8. Decision Making
Psikolog memilih intervensi bertingkat: skor ringan → psikoedukasi/self-help; skor sedang-berat → rujukan CBT terstruktur/kolaborasi farmakoterapi sesuai NICE CG113.

## 9. Contoh Kasus & Contoh Scoring
Pengguna menjawab (skala 0–3): merasa gugup/cemas=2, tidak bisa berhenti khawatir=3, khawatir berlebihan berbagai hal=3, sulit relaks=2, gelisah tak bisa diam=1, mudah kesal=2, takut sesuatu buruk terjadi=2.
**Skor total = 2+3+3+2+1+2+2 = 15 (kategori "berat").**

## 10. Analisis Kasus
Skor 15 masuk kategori berat, dengan dua item tertinggi (tidak bisa berhenti khawatir=3, khawatir berlebihan=3) yang merupakan inti fenomenologis GAD (worry yang sulit dikendalikan dan menyebar). Pola ini, dikombinasikan dengan skor tinggi merata di hampir semua item, mengindikasikan kebutuhan kuat untuk rujukan profesional segera, bukan sekadar strategi self-help mandiri.

## 11. Implementasi pada AI

**Algoritma Klasifikasi:**
```
skor_total = jumlah(item_1..item_7)  # rentang 0-21

JIKA skor_total antara 0-4: kategori = "minimal"
JIKA skor_total antara 5-9: kategori = "ringan"
JIKA skor_total antara 10-14: kategori = "sedang"
JIKA skor_total antara 15-21: kategori = "berat"
```
**Decision Tree:**
```
[GAD-7 selesai diisi] → Hitung skor_total
        │
        ▼
[Cek red flag komorbid (panik akut, ide bunuh diri dari modul lain)] ──(ada)──► Eskalasi Bab 0.3 Draft 3
        │ (tidak ada)
        ▼
[skor_total ≥ 15?] ──(ya)──► Dorongan kuat rujukan profesional segera
        │ (tidak)
        ▼
[skor_total ≥ 10?] ──(ya)──► Tawarkan self-help terpandu (Draft 5) + sarankan konsultasi profesional
        │ (tidak)
        ▼
[Psikoedukasi ringan + monitoring]
```
**Guardrail:** GAD-7 tinggi disertai gejala fisik ekstrem mendadak (jantung berdebar sangat kuat, sesak napas tiba-tiba) perlu dicek silang terhadap kemungkinan panic attack (modul terpisah di Draft 3) — GAD-7 tidak dirancang khusus mendeteksi episode panik diskret.

## 12. Do & Don't (Kelebihan & Kekurangan)
**Kelebihan:** sangat singkat, reliabilitas sangat tinggi, berguna lintas beberapa jenis gangguan cemas (bukan hanya GAD).
**Kekurangan:** tidak spesifik terhadap subtipe kecemasan (tidak bisa membedakan GAD dari social anxiety dari panic disorder tanpa asesmen tambahan).
**Do:** gunakan sebagai indikator keparahan umum + pemandu urgensi; kombinasikan dengan konten kualitatif untuk hipotesis subtipe.
**Don't:** menyimpulkan subtipe gangguan cemas spesifik hanya dari skor GAD-7.

## 13. Limitasi
Sama seperti PHQ-9, GAD-7 rentan terhadap bias self-report dan divalidasi utamanya pada populasi klinis Barat; ekspresi kecemasan yang lebih somatik dalam budaya tertentu berisiko tidak tertangkap penuh oleh item-item yang berorientasi kognitif ("khawatir berlebihan").

## 14. Referensi Ilmiah Resmi
Spitzer, Kroenke, Williams, & Löwe (2006, *Arch Intern Med*, 166(10)); Kroenke, Spitzer, Williams, Monahan, & Löwe (2007, *Ann Intern Med*, 146(5)); NICE CG113, *Generalised anxiety disorder and panic disorder in adults: management*.

## 15. Ringkasan Knowledge Base
GAD-7 adalah screener 7-item dengan reliabilitas sangat tinggi, berfungsi sebagai indikator keparahan cemas transdiagnostik; skor tinggi memandu urgensi rujukan, namun tidak dapat menentukan subtipe gangguan cemas tanpa asesmen klinis tambahan.

---

## CATATAN PENUTUP PART 1 (DRAFT 6)

Bab tersisa untuk Part 2 dan seterusnya: **DASS-21, PSS (Perceived Stress Scale), ISI (Insomnia Severity Index), MSPSS (Multidimensional Scale of Perceived Social Support), CD-RISC (Connor-Davidson Resilience Scale)** — dengan kedalaman data psikometrik (validitas, reliabilitas, cut-off, algoritma klasifikasi, decision tree) yang sama seperti tiga instrumen di atas.

Catatan penting yang perlu keputusan Anda sebelum lanjut: apakah ARNOVA.AI akan menyajikan instrumen ini sebagai **modul terstruktur eksplisit** (pengguna sadar sedang mengisi asesmen formal, sesuai Bab 0.3) atau tetap diinferensi dari percakapan bebas? Ini memengaruhi bagaimana saya menulis bagian "Cara Penggunaan" di sisa bab — sayyy mau yang mana?
