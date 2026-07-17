# ARNOVA.AI — MENTAL WELLBEING KNOWLEDGE BOOK
## Internal Knowledge Base untuk AI Early Mental Wellbeing Screening & Spiritual Companion
### Draft 3 — Part 1 dari N (Bab 0 – Bab 3)

**Disusun oleh tim gabungan:** Professor Clinical Psychology, Clinical Psychologist, Developmental Psychologist, Counseling Psychologist, Mental Health Researcher, AI Cognitive Scientist, Prompt Engineer, Instructional Designer, Academic Writer (Scopus Q1), System Architect AI.

**Sifat dokumen:** Internal knowledge base. Bukan untuk dibaca pengguna umum. Ditulis setara buku ajar S1/S2 Psikologi, dengan lapisan tambahan "AI Reasoning Layer" pada setiap bab agar dapat langsung diterjemahkan menjadi logika sistem (prompt, decision tree, klasifikasi risiko, routing).

**Catatan skop:** Karena permintaan mencakup 16 kondisi dengan kedalaman textbook penuh (±15 elemen wajib per bab), dokumen disusun bertahap. Part 1 ini berisi **Bab 0 (Kerangka Etik & Operasional AI)** sebagai fondasi yang berlaku untuk seluruh buku, ditambah **3 bab penuh** (Stress, Anxiety, Depression) sebagai kalibrasi template. Setelah Anda mengonfirmasi formatnya sudah sesuai, sisanya (Burnout, Trauma, Panic Attack, Social Anxiety, Loneliness, Low Self Esteem, Impostor Syndrome, Grief, Quarter Life Crisis, Emotional Exhaustion, Emotional Dysregulation, Perfectionism, People Pleasing) akan disusun menyusul dengan struktur identik.

---

# BAB 0 — KERANGKA ETIK, EPISTEMIK, DAN OPERASIONAL SISTEM ARNOVA.AI

## 0.1 Definisi Peran Sistem
ARNOVA.AI didefinisikan secara ketat sebagai **early screening & psychoeducational companion**, bukan alat diagnostik, bukan pengganti psikolog/psikiater, dan bukan layanan krisis. Definisi ini harus tertanam sebagai *system-level constraint*, bukan sekadar disclaimer kosmetik, karena ia menentukan batas seluruh reasoning di bab-bab berikutnya.

Rujukan: WHO mental health gap action programme (mhGAP) secara eksplisit membedakan antara *community-level detection tools* dan *clinical diagnostic procedures* (WHO, 2016, mhGAP Intervention Guide v2.0). APA Ethical Principles of Psychologists and Code of Conduct (APA, 2017) Standar 2.01 juga menegaskan bahwa penilaian psikologis formal memerlukan kompetensi dan konteks klinis yang tidak dapat direplikasi oleh sistem non-manusia.

## 0.2 Prinsip "Screener, Not Diagnostician"
**Alasan ilmiah:** Instrumen skrining tervalidasi (PHQ-9, GAD-7, PCL-5, dsb.) dirancang secara psikometrik untuk *mendeteksi kemungkinan* (probable case), bukan menegakkan diagnosis. Sensitivitas tinggi sengaja diprioritaskan di atas spesifisitas agar tidak ada kasus berisiko yang terlewat (Kroenke, Spitzer, & Williams, 2001, *J Gen Intern Med*). Konsekuensinya, sistem AI yang meniru fungsi skrining harus mewarisi bias yang sama: **lebih baik over-flag daripada under-flag.**

**Implementasi AI:** Setiap output klasifikasi risiko harus disertai *confidence band* dan *disclaimer of non-diagnosis*, serta *hard-coded escalation path* ketika skor melewati ambang klinis instrumen aslinya.

## 0.3 Protokol Red Flag & Eskalasi Krisis (berlaku lintas bab)
Setiap bab kondisi dalam buku ini memiliki sub-bagian "Red Flag" spesifik, namun seluruhnya tunduk pada satu protokol global berikut:

1. **Deteksi ideasi bunuh diri/self-harm** (langsung atau implisit) → sistem TIDAK memberikan detail metode apa pun, TIDAK melanjutkan pembahasan topik sebagai edukasi umum, dan SEGERA menampilkan jalur bantuan krisis serta mendorong kontak manusia (profesional, layanan darurat, orang terdekat). Ini konsisten dengan Zero Suicide Framework (Suicide Prevention Resource Center, 2018) dan WHO LIVE LIFE guidance (WHO, 2021).
2. **Deteksi psikosis/mania/dissociation akut** → sistem tidak menguatkan keyakinan yang terputus dari realitas; merujuk ke evaluasi profesional segera.
3. **Deteksi risiko kekerasan terhadap orang lain** → tidak memberi validasi atau strategi; arahkan ke bantuan profesional/darurat.
4. Sistem tidak pernah menggantikan penilaian klinis manusia dalam situasi ini; perannya murni sebagai jembatan menuju bantuan yang tepat.

## 0.4 Prinsip Integrasi Spiritual (Spiritual Companion Layer)
Karena ARNOVA.AI juga berfungsi sebagai *spiritual companion*, integrasi nilai spiritual/religius harus mengikuti prinsip **culturally-responsive & values-affirming care**, bukan otoritas keagamaan yang menggantikan tokoh agama. Rujukan: APA Guidelines for Psychological Practice with Individuals with Low-Income and Economic Marginalization (APA, 2019) dan literatur *religious/spiritual integration in psychotherapy* (Pargament, 2007; Vieten & Lukoff, 2022, *American Psychologist*) menunjukkan integrasi spiritual efektif ketika: (a) mengikuti kerangka nilai pengguna sendiri, bukan memaksakan satu pandangan, (b) tidak digunakan untuk membenarkan penghindaran terhadap bantuan profesional saat diindikasikan secara klinis, (c) berperan sebagai *sumber daya coping* tambahan (meaning-making, harapan, komunitas), bukan pengganti intervensi berbasis bukti.

## 0.5 Kerangka Reasoning Umum yang Diwariskan ke Semua Bab
Setiap bab kondisi akan menerjemahkan teori psikologi menjadi 4 lapisan reasoning AI:
- **Lapisan Deteksi** — pola linguistik/perilaku apa yang menjadi sinyal (mirip item-item instrumen skrining).
- **Lapisan Klasifikasi Tingkat Keparahan** — pemetaan ke kategori ringan/sedang/berat mengikuti cut-off instrumen tervalidasi bila tersedia.
- **Lapisan Respons** — psikoedukasi, teknik self-help berbasis bukti, atau validasi empatik, disesuaikan tingkat keparahan.
- **Lapisan Eskalasi** — kapan sistem harus mendorong bantuan manusia/profesional.

Struktur ini secara langsung meniru logika *stepped care model* yang digunakan NICE (NICE, 2022, common mental health problems: identification and pathways to care, CG123) — intervensi paling ringan dan least-intrusive diberikan lebih dulu, meningkat sesuai kebutuhan.

---

# BAB 1 — STRESS

## 1. Definisi
Stress adalah respons psikofisiologis terhadap tuntutan (*demand*) yang dipersepsikan melebihi atau mendekati batas sumber daya coping individu (Lazarus & Folkman, 1984, *Stress, Appraisal, and Coping*). Penting dibedakan: stress bukan penyakit, melainkan proses transaksional antara stimulus (stressor), penilaian kognitif (appraisal), dan respons (fisiologis, emosional, perilaku).

## 2. Tujuan
Bab ini membekali AI untuk: (a) mengenali stress sebagai kondisi normatif-adaptif vs. maladaptif, (b) membedakan stress akut dari stress kronis, (c) menyediakan psikoedukasi dan strategi preventif berbasis bukti, (d) menjadi pintu masuk skrining untuk kondisi turunan (burnout, anxiety, emotional exhaustion).

## 3. Kapan Digunakan
Digunakan sebagai *entry-level screening* ketika pengguna melaporkan keluhan umum: kelelahan, ketegangan, kesulitan tidur, iritabilitas, tekanan pekerjaan/akademik/keluarga — sebelum sistem menentukan apakah perlu eskalasi ke modul kondisi yang lebih spesifik (Anxiety, Burnout, Emotional Exhaustion).

## 4. Dasar Teori
- **Transactional Model of Stress and Coping** (Lazarus & Folkman, 1984) — appraisal primer (apakah stressor mengancam?) dan appraisal sekunder (apakah saya punya sumber daya?).
- **General Adaptation Syndrome** (Selye, 1956) — tiga fase: alarm, resistance, exhaustion.
- **Allostatic Load Model** (McEwen, 1998, *NEJM*) — akumulasi "keausan" fisiologis akibat stress kronis berulang.
- **Diathesis-Stress Model** — interaksi kerentanan biologis/psikologis dengan stressor lingkungan yang memunculkan gangguan klinis.

## 5. Konsep Utama
- Eustress vs distress (Selye) — stress yang memotivasi vs. yang melemahkan.
- Perceived stress vs objective stressor — persepsi lebih prediktif terhadap outcome kesehatan mental daripada beratnya stressor objektif (Cohen, Kamarck, & Mermelstein, 1983, Perceived Stress Scale).
- Coping strategies: problem-focused vs emotion-focused (Lazarus & Folkman).
- Window of Tolerance (Siegel, 1999) — rentang aktivasi fisiologis di mana individu masih dapat berfungsi adaptif.

## 6. Framework Berpikir
Psikolog menilai stress melalui tiga pertanyaan berurutan: (1) Apa stressornya — akut/kronis, satu peristiwa/berlapis? (2) Bagaimana appraisal individu — mengancam/menantang/netral? (3) Apa sumber daya coping yang tersedia — internal (regulasi emosi, self-efficacy) dan eksternal (dukungan sosial, sumber daya finansial)?

## 7. Langkah Kerja Psikolog
1. Identifikasi stressor via wawancara/riwayat.
2. Ukur derajat menggunakan instrumen (Perceived Stress Scale-10).
3. Nilai fungsi harian (tidur, pekerjaan, relasi) — bukan hanya intensitas subjektif.
4. Cek komorbiditas (anxiety, insomnia, gejala fisik somatik).
5. Rencanakan intervensi bertingkat: psikoedukasi → teknik relaksasi/regulasi → jika kronis dan mengganggu fungsi, rujuk CBT for stress management.

## 8. Decision Making
Psikolog membedakan stress adaptif (tidak perlu intervensi klinis, cukup psikoedukasi) dari stress maladaptif kronis (berpotensi berkembang menjadi burnout/anxiety/depression, perlu intervensi terstruktur). Penanda kunci: durasi >1 bulan, gangguan fungsi signifikan, gejala fisik menetap.

## 9. Contoh Kasus
Seorang mahasiswa tingkat akhir melaporkan sulit tidur, jantung berdebar menjelang sidang skripsi, dan sering merasa "kepala penuh" sejak 2 minggu terakhir, namun masih bisa menyelesaikan revisi dan berinteraksi normal dengan teman.

## 10. Analisis Kasus
Ini adalah **stress akut situasional** terkait stressor spesifik (sidang), appraisal "menantang" (bukan "mengancam eksistensial"), dan fungsi harian masih relatif terjaga. Tidak memenuhi kriteria gangguan klinis. Respons tepat: psikoedukasi normalisasi + teknik regulasi napas/tidur, bukan rujukan klinis segera.

## 11. Implementasi pada AI
**Lapisan Deteksi:** kata kunci keluhan somatik + temporal marker ("belakangan ini", "menjelang") + pemicu spesifik yang teridentifikasi.
**Lapisan Klasifikasi:** gunakan padanan logika PSS-10 (frekuensi "tidak terduga", "tidak terkendali", "kewalahan" dalam 30 hari terakhir) untuk skor ringan/sedang/berat.
**Lapisan Respons:** ringan → psikoedukasi + teknik napas diafragma/box breathing (evidence: meta-analisis menunjukkan efek moderat pada penurunan kortisol, Ma et al., 2017, *Front Psychol*); sedang → tambahkan cognitive reappraisal sederhana; berat/fungsi terganggu → eskalasi ke modul Burnout/Anxiety dan saran konsultasi profesional.
**Lapisan Eskalasi:** durasi >4 minggu + gangguan fungsi signifikan + tidak membaik dengan strategi ringan → flag untuk rujukan profesional.

## 12. Do & Don't
**Do:** normalisasi stress ringan; validasi tanpa meremehkan; tawarkan strategi kongkret; dorong evaluasi profesional bila kronis.
**Don't:** memberi label diagnostik ("Anda kena burnout/anxiety disorder"); meremehkan ("santai saja, semua juga stress"); mengabaikan gejala fisik yang persisten tanpa menyarankan pemeriksaan medis (mengesampingkan differential diagnosis somatik seperti gangguan tiroid).

## 13. Limitasi
Stress adalah konstruk yang sangat luas dan overlap dengan hampir semua kondisi lain di buku ini; risiko utama adalah AI salah mengklasifikasikan kondisi klinis (mis. Generalized Anxiety Disorder) sebagai "stress biasa" karena presentasi awal mirip. AI tidak dapat menilai faktor fisiologis (mis. hasil lab kortisol) yang relevan pada allostatic load.

## 14. Referensi Ilmiah Resmi
Lazarus & Folkman (1984); Selye (1956); McEwen (1998, NEJM); Cohen, Kamarck & Mermelstein (1983); WHO, *Doing What Matters in Times of Stress* (WHO, 2020); APA, *Stress in America* series (APA, ongoing); NICE, Generalised anxiety disorder and panic disorder in adults: management (CG113, 2020 update — untuk irisan stress-anxiety).

## 15. Ringkasan Knowledge Base
Stress adalah proses transaksional, bukan penyakit; peran AI adalah menilai appraisal + sumber daya coping + fungsi harian untuk membedakan stress adaptif dari yang berpotensi berkembang menjadi gangguan klinis, dengan respons bertingkat dan jalur eskalasi jelas.

---

# BAB 2 — ANXIETY

## 1. Definisi
Anxiety adalah keadaan emosional yang ditandai kekhawatiran berlebihan, ketegangan, dan antisipasi ancaman di masa depan, disertai gejala fisiologis (jantung berdebar, otot tegang, gelisah), yang bersifat menetap dan tidak proporsional dengan ancaman aktual (APA, *DSM-5-TR*, 2022; WHO, *ICD-11*, 2019).

## 2. Tujuan
Membekali AI mendeteksi pola kecemasan yang melampaui kekhawatiran normal, membedakan anxiety sebagai emosi manusiawi dari Generalized Anxiety Disorder (GAD) sebagai gangguan klinis, serta mengarahkan psikoedukasi/strategi awal yang sesuai.

## 3. Kapan Digunakan
Saat pengguna melaporkan kekhawatiran berlebihan/sulit dikendalikan, gejala fisik cemas, penghindaran situasi tertentu, atau kesulitan berkonsentrasi akibat pikiran cemas berulang.

## 4. Dasar Teori
- **Cognitive Model of Anxiety** (Beck & Clark, 1997) — bias interpretasi berlebihan terhadap ancaman (threat overestimation) dan underestimasi kapasitas coping diri.
- **Intolerance of Uncertainty Model** (Dugas, Gosselin, & Ladouceur, 2001) — inti GAD adalah ketidakmampuan mentoleransi ketidakpastian, memicu worry sebagai strategi (maladaptif) menghindari ketidaknyamanan afektif.
- **Avoidance Model** (Borkovec, 1994) — worry berfungsi menghindari citra emosional yang lebih mengancam, namun mempertahankan siklus cemas.

## 5. Konsep Utama
Kriteria diagnostik GAD (DSM-5-TR): kekhawatiran berlebihan ≥6 bulan, sulit dikendalikan, disertai ≥3 dari 6 gejala (gelisah, mudah lelah, sulit konsentrasi, iritabilitas, tegang otot, gangguan tidur), menyebabkan distress/gangguan fungsi signifikan. GAD-7 (Spitzer et al., 2006) sebagai instrumen skrining tervalidasi dengan cut-off: 5=ringan, 10=sedang, 15=berat.

## 6. Framework Berpikir
Psikolog menilai: (1) apakah worry bersifat *free-floating* (tidak terikat objek spesifik) — ciri khas GAD, vs terikat objek spesifik (phobia/social anxiety); (2) durasi dan kontrolabilitas; (3) dampak fungsional; (4) komorbiditas (GAD sering menyertai depresi).

## 7. Langkah Kerja Psikolog
1. Skrining GAD-7.
2. Wawancara klinis untuk kriteria DSM-5-TR/ICD-11.
3. Differential diagnosis (hipertiroid, efek kafein/stimulan, gangguan panik, OCD).
4. Rencana intervensi: psikoedukasi → CBT (gold standard, khususnya cognitive restructuring + worry exposure) → bila berat, kolaborasi dengan psikiater untuk farmakoterapi (SSRI lini pertama sesuai NICE CG113).

## 8. Decision Making
Kunci pembeda anxiety normal vs GAD adalah **kontrolabilitas dan proporsionalitas**: kekhawatiran normal biasanya terikat isu nyata dan mereda setelah isu selesai; GAD menyebar ke banyak domain, sulit dihentikan, dan menetap meski tidak ada pemicu jelas.

## 9. Contoh Kasus
Seorang karyawan berusia 27 tahun melaporkan sejak 8 bulan terakhir selalu mengkhawatirkan banyak hal sekaligus (pekerjaan, kesehatan orang tua, keuangan) meski semuanya baik-baik saja, sulit tidur karena pikiran "berputar", dan rekan kerja mengatakan ia tampak selalu tegang.

## 10. Analisis Kasus
Durasi 8 bulan (>6 bulan kriteria), worry menyebar ke banyak domain tanpa pemicu proporsional, disertai gejala fisik (sulit tidur, tegang) dan indikasi gangguan fungsi sosial (dipersepsikan orang lain). Pola ini konsisten dengan indikasi GAD, bukan sekadar stress situasional — perlu skrining GAD-7 dan rujukan profesional untuk asesmen formal.

## 11. Implementasi pada AI
**Lapisan Deteksi:** penanda linguistik "selalu khawatir", "tidak bisa berhenti mikir", multi-domain worry, durasi eksplisit ≥6 bulan.
**Lapisan Klasifikasi:** logika setara GAD-7 (frekuensi gejala 2 minggu terakhir: "tidak sama sekali" s.d. "hampir setiap hari") → skor ringan/sedang/berat.
**Lapisan Respons:** ringan → psikoedukasi tentang siklus worry-avoidance + teknik grounding/relaksasi; sedang → perkenalkan prinsip cognitive restructuring dasar (evidence-based self-help, bukan terapi penuh); berat (skor ≥15 GAD-7 padanan, atau gangguan fungsi signifikan) → eskalasi kuat ke profesional, bukan hanya saran.
**Lapisan Eskalasi:** disertai gejala panik, ide bunuh diri, atau gangguan fungsi berat → protokol Bab 0.3.

## 12. Do & Don't
**Do:** validasi bahwa kecemasan adalah respons manusiawi; ajarkan psikoedukasi tentang siklus worry; dorong evaluasi profesional saat kriteria durasi/dampak terpenuhi.
**Don't:** memberi diagnosis formal GAD; menyarankan penghindaran situasi sebagai solusi (justru memperkuat siklus avoidance); meremehkan gejala fisik sebagai "cuma pikiran".

## 13. Limitasi
AI tidak dapat melakukan differential diagnosis medis (hipertiroid, efek zat) yang memerlukan pemeriksaan fisik/lab. Presentasi budaya terhadap kecemasan bervariasi (banyak budaya Asia mengekspresikan cemas via keluhan somatik), sehingga model deteksi berbasis bahasa Barat berisiko under-detect.

## 14. Referensi Ilmiah Resmi
APA, *DSM-5-TR* (2022); WHO, *ICD-11* (2019); Spitzer, Kroenke, Williams, & Löwe (2006, *Arch Intern Med*, GAD-7); NICE, *Generalised anxiety disorder and panic disorder in adults: management* (CG113); Beck & Clark (1997, *Behav Res Ther*); Dugas, Gosselin & Ladouceur (2001, *Cognit Ther Res*).

## 15. Ringkasan Knowledge Base
Anxiety menjadi perhatian klinis ketika worry bersifat menyebar, sulit dikendalikan, menetap ≥6 bulan, dan mengganggu fungsi. AI berperan sebagai skrining awal (logika GAD-7) dengan respons bertingkat dan eskalasi tegas pada kasus berat/komorbid.

---

# BAB 3 — DEPRESSION

## 1. Definisi
Depresi (Major Depressive Disorder) adalah gangguan mood yang ditandai suasana hati tertekan dan/atau kehilangan minat/kesenangan (anhedonia) yang menetap ≥2 minggu, disertai gejala kognitif, fisik, dan perilaku yang menyebabkan gangguan fungsi signifikan (APA, *DSM-5-TR*, 2022; WHO, *ICD-11*, 2019).

## 2. Tujuan
Membekali AI mendeteksi pola gejala depresi secara dini, membedakan kesedihan normal dari episode depresi klinis, dan yang terpenting — mendeteksi risiko bunuh diri sebagai prioritas keselamatan tertinggi dalam seluruh sistem.

## 3. Kapan Digunakan
Saat pengguna melaporkan kesedihan menetap, kehilangan minat, perubahan tidur/nafsu makan, kelelahan, perasaan tidak berharga, atau kesulitan berfungsi dalam aktivitas sehari-hari selama beberapa minggu.

## 4. Dasar Teori
- **Cognitive Triad** (Beck, 1967) — pandangan negatif terhadap diri, dunia, dan masa depan sebagai inti kognitif depresi.
- **Learned Helplessness / Hopelessness Theory** (Seligman, 1975; Abramson, Metalsky, & Alloy, 1989) — depresi muncul dari atribusi kegagalan yang stabil, global, dan internal.
- **Behavioral Activation Model** (Lewinsohn, 1974; Jacobson et al., 2001) — penurunan penguatan positif dari lingkungan memicu penarikan diri, yang memperburuk mood secara siklikal.
- **Biopsychosocial Model** — interaksi faktor genetik/neurobiologis (disregulasi serotonin/dopamin, HPA axis), psikologis (pola kognitif), dan sosial (isolasi, kehilangan).

## 5. Konsep Utama
Kriteria DSM-5-TR: ≥5 dari 9 gejala selama ≥2 minggu (termasuk wajib salah satu dari mood tertekan/anhedonia): perubahan berat badan/nafsu makan, insomnia/hipersomnia, agitasi/retardasi psikomotor, kelelahan, rasa tidak berharga/bersalah berlebihan, sulit konsentrasi, pikiran kematian/bunuh diri berulang. PHQ-9 (Kroenke, Spitzer, & Williams, 2001) sebagai instrumen skrining standar, dengan item ke-9 secara spesifik menanyakan ideasi bunuh diri — item ini **wajib** memicu protokol eskalasi apa pun skor totalnya.

## 6. Framework Berpikir
Psikolog menilai: (1) durasi dan pervasiveness gejala; (2) derajat gangguan fungsi (pekerjaan, relasi, perawatan diri); (3) riwayat episode sebelumnya (rekuren meningkatkan risiko kronisitas); (4) yang paling kritis — risiko keselamatan (ideasi, rencana, akses ke sarana, riwayat percobaan sebelumnya).

## 7. Langkah Kerja Psikolog
1. Skrining PHQ-9 + penilaian risiko bunuh diri terstruktur (mis. Columbia Suicide Severity Rating Scale bila diindikasikan).
2. Wawancara klinis kriteria DSM-5-TR/ICD-11.
3. Differential diagnosis (bipolar — cek riwayat episode manik/hipomanik sebelum memulai terapi, karena antidepresan tunggal berisiko memicu switching pada bipolar; kondisi medis seperti hipotiroid, anemia).
4. Rencana intervensi bertingkat sesuai stepped care NICE (CG90/NG222): ringan → psikoedukasi + behavioral activation + guided self-help; sedang-berat → psikoterapi terstruktur (CBT/IPT) ± farmakoterapi; berat dengan risiko keselamatan → rujukan segera/krisis.

## 8. Decision Making
Pembeda kesedihan normal vs episode depresi: kesedihan normal biasanya terkait pemicu jelas, tidak disertai anhedonia pervasif, dan mereda seiring waktu tanpa mengganggu fungsi inti. Episode depresi bersifat pervasif, menetap ≥2 minggu, dan secara signifikan mengganggu fungsi meski tanpa pemicu eksternal yang jelas.

## 9. Contoh Kasus
Seorang perempuan 24 tahun melaporkan sejak 5 minggu terakhir merasa "hampa", kehilangan minat pada hobi yang dulu disukai, sulit bangun pagi, nafsu makan menurun drastis, dan merasa dirinya "beban bagi orang lain" — namun menyangkal memiliki pikiran untuk menyakiti diri saat ditanya langsung.

## 10. Analisis Kasus
Memenuhi kriteria durasi (>2 minggu) dan jumlah gejala (mood rendah, anhedonia, gangguan tidur, nafsu makan, rasa tidak berharga) yang konsisten dengan episode depresi sedang-berat. Frasa "beban bagi orang lain" adalah **penanda risiko yang harus ditindaklanjuti secara eksplisit** meski penyangkalan verbal terhadap ide bunuh diri diberikan — psikolog tetap melakukan asesmen risiko lanjutan, tidak berhenti pada jawaban "tidak" begitu saja.

## 11. Implementasi pada AI
**Lapisan Deteksi:** kombinasi mood-marker ("hampa", "tidak bersemangat") + anhedonia + durasi eksplisit + fungsional marker (perubahan tidur/makan/energi) + **frasa risiko implisit** ("beban", "capek hidup", "enggak ada gunanya") sebagai trigger independen terhadap protokol Bab 0.3, terlepas dari skor total.
**Lapisan Klasifikasi:** logika setara PHQ-9 (0–4 minimal, 5–9 ringan, 10–14 sedang, 15–19 sedang-berat, 20–27 berat).
**Lapisan Respons:** ringan → psikoedukasi + behavioral activation sederhana (evidence: behavioral activation setara efektif dengan CBT penuh untuk depresi ringan-sedang, Dimidjian et al., 2006, *J Consult Clin Psychol*); sedang ke atas → dorongan kuat untuk konsultasi profesional, bukan sekadar saran opsional.
**Lapisan Eskalasi:** item ideasi bunuh diri (eksplisit maupun frasa risiko implisit) memicu protokol krisis Bab 0.3 SEGERA, independen dari skor total gejala lain — ini adalah *hard override* dalam arsitektur sistem, bukan salah satu faktor yang ditimbang.

## 12. Do & Don't
**Do:** ambil setiap penyebutan keputusasaan/ketidakberhargaan secara serius; validasi tanpa menghakimi; sediakan jalur bantuan konkret; dorong tetap terhubung dengan orang lain/profesional.
**Don't:** memberi nasihat "cepat move on" atau meminimalkan; berhenti menilai risiko hanya karena pengguna menjawab "tidak" satu kali (asesmen risiko butuh follow-up, bukan pertanyaan tunggal); memberi diagnosis formal; menyarankan penghentian pengobatan yang sedang dijalani.

## 13. Limitasi
AI tidak dapat menilai riwayat episode manik (kunci membedakan MDD dari bipolar), tidak dapat melakukan pemeriksaan medis penyebab organik, dan rentan terhadap *false negative* pada budaya yang mengekspresikan depresi secara somatik atau menutupi tanda risiko karena stigma.

## 14. Referensi Ilmiah Resmi
APA, *DSM-5-TR* (2022); WHO, *ICD-11* (2019); Kroenke, Spitzer, & Williams (2001, *J Gen Intern Med*, PHQ-9); Beck (1967); Seligman (1975); Abramson, Metalsky, & Alloy (1989, *Psychol Rev*); Dimidjian et al. (2006); NICE, *Depression in adults: treatment and management* (NG222, 2022); WHO, *mhGAP Intervention Guide* (2016) — modul depresi dan bunuh diri/self-harm.

## 15. Ringkasan Knowledge Base
Depresi dikenali dari pervasivitas mood rendah/anhedonia ≥2 minggu disertai gangguan fungsi. Prioritas tertinggi sistem AI dalam bab ini bukan akurasi klasifikasi keparahan, melainkan **deteksi dan eskalasi risiko keselamatan** — dirancang sebagai hard override yang tidak bisa "dinegosiasikan" oleh skor gejala lain.

---

## CATATAN PENUTUP PART 1

Part 1 ini menetapkan template 15-elemen + kerangka etik global yang akan konsisten dipakai untuk 13 bab tersisa: Burnout, Trauma, Panic Attack, Social Anxiety, Loneliness, Low Self Esteem, Impostor Syndrome, Grief, Quarter Life Crisis, Emotional Exhaustion, Emotional Dysregulation, Perfectionism, People Pleasing.

Mengingat kedalaman yang diminta (setara textbook per kondisi, dengan referensi WHO/APA/NICE, decision tree, dan lapisan AI reasoning penuh), saya sarankan melanjutkan dalam beberapa part berikutnya (mis. 3–4 bab per part) agar setiap bab tetap mendapat kedalaman yang sama seperti tiga bab di atas, bukan diringkas demi mengejar jumlah.
