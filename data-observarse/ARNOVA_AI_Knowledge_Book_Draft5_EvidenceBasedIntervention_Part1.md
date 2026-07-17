# ARNOVA.AI — MENTAL WELLBEING KNOWLEDGE BOOK
## Modul: EVIDENCE-BASED INTERVENTION
### Draft 5 — Part 1 dari N (Bab 0 – Bab 3)

**Sifat dokumen:** Internal knowledge base, bukan untuk pengguna umum. Modul ini adalah lapisan **intervensi** ARNOVA.AI — setelah Draft 3 (memahami kondisi apa yang terjadi) dan Draft 4 (cara berkomunikasi secara terapeutik), modul ini menjawab "teknik/latihan apa yang boleh ditawarkan AI, kapan, dan dengan batas apa".

**Catatan skop:** 12 metode yang diminta (CBT, ACT, DBT, Positive Psychology, Behavioral Activation, Mindfulness, Stress Management, Self Compassion, Grounding, Breathing Exercise, Solution Focused Therapy, Motivational Interviewing) memiliki **derajat risiko yang sangat berbeda** bila diadaptasi ke AI — ini dibahas eksplisit di Bab 0 sebagai prinsip pemisah paling penting di seluruh modul. Part 1 ini berisi Bab 0 (kerangka scope-of-practice & kontraindikasi) + 3 modalitas besar sebagai kalibrasi: **CBT, ACT, DBT**. Bab-bab teknik yang lebih ringan/self-administrable (Grounding, Breathing Exercise, Mindfulness, dsb.) menyusul di Part 2, karena logikanya sedikit berbeda (lebih ke arah *guided practice* daripada *terapi terstruktur*).

---

# BAB 0 — KERANGKA SCOPE-OF-PRACTICE & KONTRAINDIKASI UNTUK INTERVENSI AI

## 0.1 Prinsip Pemisah Utama: "Full Therapy Modality" vs "Standalone Self-Help Technique"
Alasan ilmiah paling penting dalam modul ini: CBT, ACT, DBT, dan Solution Focused Therapy adalah **modalitas terapi terstruktur** yang di dunia nyata memerlukan pelatihan klinis bertahun-tahun, formulasi kasus individual, dan pemantauan progres oleh profesional berlisensi (APA, 2017, *Ethical Principles*, Standar 2.01; NICE, 2022, *Guide to the methods of technology appraisal*, prinsip bahwa intervensi psikologis terstruktur memerlukan *trained practitioner delivery*). Sebaliknya, Grounding, Breathing Exercise, dan sebagian Mindfulness adalah **teknik mandiri (standalone)** yang secara aman dapat diajarkan langsung sebagai *self-help skill* tanpa formulasi kasus kompleks.

**Konsekuensi arsitektur:** ARNOVA.AI **tidak pernah "melakukan CBT/ACT/DBT"** kepada pengguna sebagai proses terapi penuh. Yang dilakukan AI adalah **mengadaptasi elemen-elemen psikoedukatif dan latihan tertentu** dari modalitas ini (mis. cognitive restructuring dasar dari CBT, defusion sederhana dari ACT, TIPP dari DBT) sebagai *self-help exercise berbasis bukti* — dengan batas eksplisit dan dorongan kuat ke terapi profesional sungguhan untuk kasus yang memenuhi kriteria klinis.

## 0.2 Mengapa Kontraindikasi Wajib Eksplisit per Teknik
Riset menunjukkan bahwa teknik yang secara umum aman bisa **memperburuk kondisi tertentu** bila salah indikasi. Contoh: mindfulness/body-scan dapat memicu *flashback* pada penyintas trauma dengan disosiasi berat bila dilakukan tanpa modifikasi trauma-informed (Treleaven, 2018, *Trauma-Sensitive Mindfulness*); grounding sensorik intensif bisa kontraindikasi pada kondisi psikotik akut dengan halusinasi sensorik. Karena itu, **setiap bab dalam modul ini WAJIB mencantumkan Kontraindikasi sebagai elemen berdiri sendiri**, bukan sekadar catatan tambahan — ini menjadi *hard filter* sebelum AI menawarkan teknik apa pun.

## 0.3 Struktur Decision Tree Umum yang Diwariskan ke Semua Bab
```
[Kondisi/keluhan pengguna teridentifikasi dari Draft 3]
        │
        ▼
[Cek Kontraindikasi teknik yang relevan] ──(ada kontraindikasi)──► Jangan tawarkan; alihkan ke teknik lain / eskalasi
        │ (tidak ada kontraindikasi)
        ▼
[Cek tingkat keparahan/fungsi dari Draft 3] ──(berat/red flag)──► Prioritaskan eskalasi profesional; teknik hanya sebagai pendamping, bukan pengganti
        │ (ringan-sedang)
        ▼
[Tawarkan versi self-help teknik, dengan psikoedukasi singkat + informed consent implisit ("ini latihan berbasis X, bukan pengganti terapi")]
        │
        ▼
[Pantau respons pengguna] ──(memburuk/distress meningkat)──► Hentikan teknik, validasi, evaluasi ulang
        │ (membantu)
        ▼
[Lanjutkan/reinforce, tawarkan variasi]
```

## 0.4 Prinsip Dosis dan Framing Non-Klinis
AI menyampaikan teknik ini sebagai *latihan* ("mari coba latihan pernapasan"), bukan sebagai *resep terapeutik* ("Anda perlu CBT") — framing ini penting secara etik agar tidak terkesan AI mendiagnosis atau meresepkan modalitas terapi tertentu, sesuatu yang menjadi ranah profesional (lih. Bab 0.1 Draft 3).

---

# BAB 1 — COGNITIVE BEHAVIORAL THERAPY (CBT)

## 1. Definisi
CBT adalah modalitas psikoterapi terstruktur, berbatas waktu, dan berfokus pada masalah saat ini, yang berdasar pada premis bahwa pikiran, emosi, dan perilaku saling terkait, serta bahwa mengubah pola pikir maladaptif (kognisi) dan perilaku dapat mengurangi distress emosional (Beck, 1979, *Cognitive Therapy of Depression*; David, Cristea, & Hofmann, 2018, *Front Psychiatry*, "Why Cognitive Behavioral Therapy Is the Current Gold Standard of Psychotherapy").

## 2. Tujuan
Mengidentifikasi dan menguji ulang (bukan sekadar "berpikir positif") pola pikir otomatis yang bias, dan membangun perilaku baru yang mendukung mood dan fungsi yang lebih baik. Dalam konteks AI, tujuan adaptasinya lebih sempit: memperkenalkan *skill* dasar CBT (identifikasi automatic thought, cognitive restructuring sederhana) sebagai self-help, bukan menjalankan formulasi kasus CBT penuh.

## 3. Kapan Digunakan / Indikasi
CBT memiliki basis bukti terkuat dan direkomendasikan sebagai lini pertama untuk: depresi ringan-sedang, generalized anxiety disorder, panic disorder, social anxiety disorder, OCD, PTSD (varian trauma-focused CBT), dan insomnia (CBT-I) (NICE, NG222 Depression 2022; NICE CG113 GAD/Panic; NICE NG116 PTSD; APA Clinical Practice Guideline for PTSD, 2017).

## Kontraindikasi
CBT standar **kurang tepat sebagai lini pertama tunggal** pada: episode psikotik akut tanpa stabilisasi terlebih dahulu, gangguan bipolar fase manik akut, gangguan kognitif berat yang membatasi kapasitas introspeksi terstruktur, dan krisis bunuh diri akut (memerlukan stabilisasi keselamatan dulu, bukan restrukturisasi kognitif). Untuk AI: cognitive restructuring **tidak boleh ditawarkan** ketika red flag Bab 0.3 (Draft 3) aktif — urutan prioritas selalu keselamatan dulu.

## 4. Dasar Teori
- **Cognitive Model** (Beck, 1979) — automatic thoughts → emosi → perilaku, dipengaruhi core beliefs dan skema kognitif yang terbentuk sejak awal kehidupan.
- **ABC Model** (Ellis, 1962, Rational Emotive Behavior Therapy, cikal bakal CBT) — Activating event, Belief, Consequence: bukan peristiwa yang menyebabkan emosi, melainkan keyakinan tentang peristiwa tersebut.
- **Cognitive Distortions Taxonomy** (Burns, 1980, *Feeling Good*, mempopulerkan kategori dari kerangka Beck) — mis. catastrophizing, all-or-nothing thinking, mind reading, overgeneralization.

## 5. Konsep Utama
- **Automatic thoughts** — pikiran spontan, sering tidak disadari penuh, yang muncul sebelum emosi.
- **Cognitive restructuring** — proses identifikasi, evaluasi bukti, dan menyusun pikiran alternatif yang lebih seimbang (bukan "berpikir positif paksa").
- **Thought record** — alat terstruktur (situasi → pikiran otomatis → emosi & intensitas → bukti pendukung/penentang → pikiran alternatif → emosi setelah) yang menjadi inti latihan CBT dan sangat cocok direplikasi sebagai *structured form* di AI.

## 6. Framework Berpikir
Psikolog tidak langsung membantah pikiran negatif pasien ("itu nggak benar kok"), melainkan memandu pasien menguji buktinya sendiri secara Socratic (*guided discovery*) — prinsip ini krusial karena membantah langsung sering memicu resistensi, sedangkan menemukan sendiri lebih membekas.

## 7. Langkah Kerja Psikolog
1. Psikoedukasi model kognitif (pikiran ≠ fakta).
2. Identifikasi automatic thought pada situasi spesifik yang baru terjadi.
3. Guided discovery: "Apa buktinya pikiran ini benar? Apa buktinya tidak?"
4. Susun pikiran alternatif yang lebih seimbang (bukan sekadar positif).
5. Uji perilaku (behavioral experiment) bila relevan.
6. Evaluasi perubahan intensitas emosi setelah restrukturisasi.

## 8. Decision Making
Psikolog memilih CBT sebagai modalitas utama ketika pola distress tampak jelas terkait pola pikir yang dapat diidentifikasi dan diuji (bukan trauma kompleks yang memerlukan pendekatan lain terlebih dahulu, atau distress yang murni situasional tanpa distorsi kognitif signifikan).

## 9. Contoh Kasus
Pengguna menulis: "Aku pasti bakal gagal presentasi besok, semua orang bakal mikir aku nggak kompeten," disertai kecemasan intens menjelang presentasi kerja.

## 10. Analisis Kasus
Ini adalah contoh klasik **catastrophizing** ("pasti gagal") dan **mind reading** ("semua orang bakal mikir..."). Cocok untuk latihan cognitive restructuring sederhana: menguji bukti ("apakah pernah presentasi sebelumnya benar-benar gagal total?"), dan menyusun pikiran alternatif yang lebih seimbang ("aku mungkin gugup, tapi aku sudah siapkan materi dan pernah berhasil sebelumnya").

## 11. Implementasi pada AI

**Decision Tree Bab 1 (CBT):**
```
[Terdeteksi automatic thought dengan pola distorsi jelas]
        │
        ▼
[Cek red flag/krisis aktif?] ──(ya)──► Prioritaskan protokol keselamatan, tunda restrukturisasi
        │ (tidak)
        ▼
[Tawarkan mini thought-record: "Apa yang terlintas di pikiranmu saat itu?"]
        │
        ▼
[Guided discovery: "Apa buktinya ini benar/tidak benar?"] (bukan membantah langsung)
        │
        ▼
[Bantu susun pikiran alternatif seimbang, BUKAN toxic positivity]
        │
        ▼
[Refleksikan perubahan intensitas emosi jika ada]
```
**Lapisan Deteksi:** klasifikasi jenis distorsi kognitif dari taksonomi Burns (1980) berdasarkan pola linguistik (kata "pasti", "selalu", "nggak pernah" → all-or-nothing/catastrophizing; "pasti mikir aku..." → mind reading).
**Lapisan Respons:** gunakan pertanyaan Socratic, BUKAN pernyataan korektif langsung ("itu salah, seharusnya kamu berpikir...").
**Guardrail:** AI tidak menjalankan case formulation CBT penuh (mis. memetakan skema/core belief masa kecil) — itu ranah klinis; AI hanya memfasilitasi satu siklus thought-record sederhana per sesi.

## 12. Do & Don't
**Do:** gunakan pertanyaan terbuka untuk menguji bukti; bantu susun pikiran alternatif yang realistis (bukan hanya positif); framing sebagai "latihan", bukan terapi resmi.
**Don't:** membantah pikiran pengguna secara langsung/argumentatif; memaksakan "berpikir positif" tanpa menguji bukti; menjalankan restrukturisasi saat red flag krisis aktif.

## 13. Limitasi
CBT penuh memerlukan case formulation individual dan pemantauan progres lintas sesi oleh profesional; adaptasi AI terbatas pada satu siklus thought-record sederhana dan tidak menggantikan proses terapi terstruktur multi-sesi. Efektivitas CBT self-help tanpa pendampingan profesional lebih rendah dibanding CBT dengan terapis (meta-analisis self-help CBT: effect size kecil-moderat, Cuijpers et al., 2010, *Cogn Behav Ther*).

## 14. Referensi Ilmiah Resmi
Beck (1979); Ellis (1962); Burns (1980); David, Cristea, & Hofmann (2018, *Front Psychiatry*); Cuijpers et al. (2010, *Cogn Behav Ther*); NICE NG222 (2022); NICE CG113; NICE NG116; APA Clinical Practice Guideline for PTSD (2017).

## 15. Ringkasan Knowledge Base
CBT diadaptasi AI sebagai satu siklus thought-record + guided discovery sederhana, bukan case formulation penuh; kontraindikasi mutlak saat krisis aktif; teknik inti adalah menguji bukti pikiran, bukan membantahnya secara langsung.

---

# BAB 2 — ACCEPTANCE AND COMMITMENT THERAPY (ACT)

## 1. Definisi
ACT adalah modalitas terapi berbasis prinsip *contextual behavioral science* yang bertujuan meningkatkan **fleksibilitas psikologis** — kemampuan untuk tetap terhubung dengan momen saat ini, menerima pengalaman internal (pikiran/emosi) tanpa berjuang melawannya, dan bertindak selaras dengan nilai-nilai pribadi meski pengalaman internal tidak nyaman (Hayes, Strosahl, & Wilson, 2012, *Acceptance and Commitment Therapy*, 2nd ed.).

## 2. Tujuan
Mengurangi *experiential avoidance* (penghindaran terhadap pikiran/perasaan tidak nyaman) yang justru memperburuk banyak masalah psikologis, dan mendorong tindakan bermakna berdasar nilai meski disertai ketidaknyamanan emosional.

## 3. Kapan Digunakan / Indikasi
Bukti kuat untuk: nyeri kronis, depresi, anxiety disorders, distress terkait kondisi medis kronis, dan situasi di mana penghindaran menjadi pola sentral masalah (A-Tjak et al., 2015, *Psychother Psychosom*, meta-analisis ACT). Sangat relevan untuk kondisi seperti perfectionism dan people pleasing (dari Draft 3) di mana penghindaran terhadap ketidaknyamanan (takut gagal/ditolak) menjadi inti masalah.

## Kontraindikasi
Kurang tepat sebagai pendekatan tunggal pada krisis akut yang memerlukan stabilisasi segera (bukan waktunya eksplorasi nilai jangka panjang), dan pada kondisi di mana kapasitas metakognitif sangat terbatas (gangguan kognitif berat, psikosis aktif tanpa stabilisasi) karena defusion memerlukan kemampuan mengamati pikiran sebagai objek — sesuatu yang sulit dilakukan saat realitas testing terganggu.

## 4. Dasar Teori
- **Relational Frame Theory** (Hayes, Barnes-Holmes, & Roche, 2001) — dasar perilaku-kognitif tentang bagaimana bahasa manusia menciptakan jaringan asosiasi yang bisa memperkuat penghindaran maladaptif.
- **Psychological Flexibility Hexaflex Model** (Hayes et al., 2012) — enam proses inti: acceptance, cognitive defusion, present-moment awareness, self-as-context, values, committed action.
- **Experiential Avoidance sebagai Transdiagnostic Process** (Hayes, Wilson, Gifford, Follette, & Strosahl, 1996, *J Consult Clin Psychol*) — penghindaran terhadap pengalaman internal berkontribusi lintas berbagai gangguan psikologis, bukan spesifik satu diagnosis.

## 5. Konsep Utama
- **Cognitive defusion** — mengubah relasi dengan pikiran (mengamati pikiran sebagai "sekadar pikiran", bukan fakta absolut) — teknik contoh: "aku sedang punya pikiran bahwa aku gagal" alih-alih "aku gagal".
- **Values vs Goals** — nilai adalah arah berkelanjutan (mis. "menjadi orang tua yang hadir"), goals adalah pencapaian spesifik (mis. "menghadiri semua pertandingan anak") — ACT berfokus pada nilai sebagai kompas, bukan daftar pencapaian.
- **Committed action** — tindakan konkret selaras nilai meski disertai ketidaknyamanan.

## 6. Framework Berpikir
Psikolog tidak berusaha menghilangkan pikiran/emosi tidak nyaman (berbeda filosofis dari sebagian pendekatan CBT klasik yang menekankan mengubah isi pikiran) — fokus ACT adalah mengubah **relasi** pengguna dengan pikirannya, dan mengarahkan energi ke tindakan bermakna meski ketidaknyamanan itu tetap ada.

## 7. Langkah Kerja Psikolog
1. Identifikasi pola experiential avoidance (apa yang dihindari, dan bagaimana penghindaran itu justru membatasi hidup pengguna).
2. Perkenalkan defusion sederhana terhadap pikiran yang mendominasi.
3. Eksplorasi nilai personal di area yang terdampak.
4. Bantu rumuskan committed action kecil selaras nilai tersebut.

## 8. Decision Making
Psikolog memilih ACT ketika pola sentral masalah adalah penghindaran/perjuangan melawan pengalaman internal (bukan distorsi kognitif spesifik yang lebih cocok CBT), atau ketika pengguna sudah mencoba "melawan/menghilangkan" pikiran negatif berulang kali tanpa hasil — sinyal bahwa pendekatan "mengubah isi pikiran" mungkin bukan yang paling membantu.

## 9. Contoh Kasus
Pengguna menghindari melamar pekerjaan baru karena takut ditolak, dan mengatakan "aku nggak akan coba sampai aku benar-benar yakin nggak akan gagal" — sudah 6 bulan menunda karena menunggu rasa takut hilang total.

## 10. Analisis Kasus
Ini adalah pola experiential avoidance klasik: menunggu ketidaknyamanan (rasa takut) hilang sebelum bertindak, alih-alih bertindak selaras nilai (karier, pertumbuhan) meski rasa takut masih ada. Pendekatan ACT tepat: bukan menghilangkan rasa takut, melainkan defusion terhadap pikiran "aku harus yakin dulu" dan committed action kecil (mis. melamar satu posisi) meski rasa takut belum hilang.

## 11. Implementasi pada AI

**Decision Tree Bab 2 (ACT):**
```
[Terdeteksi pola penghindaran berulang terhadap situasi/tindakan bermakna]
        │
        ▼
[Cek: apakah penghindaran ini terkait red flag/keselamatan?] ──(ya)──► Eskalasi dulu
        │ (tidak)
        ▼
[Identifikasi apa yang dihindari & pikiran/perasaan yang "ditunggu hilang"]
        │
        ▼
[Tawarkan defusion sederhana: "aku sedang punya pikiran bahwa..." reframing]
        │
        ▼
[Eksplorasi nilai: "ini penting buat kamu karena apa?"]
        │
        ▼
[Bantu rumuskan committed action KECIL & konkret, bukan target besar]
```
**Lapisan Deteksi:** pola linguistik penunggu-syarat ("aku akan lakukan kalau sudah...", "nanti kalau rasa takutnya hilang...") sebagai sinyal experiential avoidance.
**Lapisan Respons:** defusion disampaikan sebagai reframing linguistik sederhana, bukan filosofi panjang; committed action harus SPESIFIK dan KECIL (prinsip *shaping*, bukan lompatan besar).
**Guardrail:** AI tidak mendorong tindakan berisiko tinggi atas nama "committed action" — tindakan yang disarankan harus proporsional dan aman.

## 12. Do & Don't
**Do:** normalisasi bahwa ketidaknyamanan boleh tetap ada sambil bertindak; fokus pada nilai personal pengguna sendiri (bukan nilai yang AI anggap "benar"); dorong langkah kecil konkret.
**Don't:** menjanjikan bahwa rasa takut/cemas akan hilang sebelum bertindak; memaksakan nilai tertentu dari luar; melompat ke committed action besar tanpa proses defusion terlebih dahulu.

## 13. Limitasi
ACT memerlukan latihan berulang dan sering melibatkan metafora/eksperiensial (mis. metafora "penumpang di bus") yang lebih efektif disampaikan dengan modulasi suara/waktu jeda oleh terapis manusia; versi teks AI kehilangan sebagian nuansa eksperiensial ini.

## 14. Referensi Ilmiah Resmi
Hayes, Strosahl, & Wilson (2012); Hayes, Barnes-Holmes, & Roche (2001); Hayes et al. (1996, *J Consult Clin Psychol*); A-Tjak et al. (2015, *Psychother Psychosom*, meta-analisis ACT); APA Div. 12, Society of Clinical Psychology — ACT sebagai *research-supported psychological treatment* untuk depresi & anxiety.

## 15. Ringkasan Knowledge Base
ACT diadaptasi AI sebagai siklus defusion sederhana + eksplorasi nilai + committed action kecil, ditujukan pada pola penghindaran berulang; fokus mengubah relasi dengan pikiran, bukan menghilangkan pikiran itu sendiri.

---

# BAB 3 — DIALECTICAL BEHAVIOR THERAPY (DBT)

## 1. Definisi
DBT adalah modalitas terapi terstruktur yang awalnya dikembangkan untuk gangguan kepribadian ambang (borderline personality disorder) dengan disregulasi emosi berat dan perilaku self-harm berulang, menggabungkan prinsip perilaku-kognitif dengan filosofi dialektis (menyeimbangkan penerimaan dan perubahan) serta praktik mindfulness (Linehan, 1993, *Cognitive-Behavioral Treatment of Borderline Personality Disorder*).

## 2. Tujuan
Membangun empat kelompok keterampilan (mindfulness, distress tolerance, emotion regulation, interpersonal effectiveness) untuk mengurangi perilaku impulsif/self-destructive dan meningkatkan kapasitas mentoleransi distress intens tanpa memperburuk situasi.

## 3. Kapan Digunakan / Indikasi
Bukti kuat untuk: borderline personality disorder, perilaku self-harm/suicidal berulang, disregulasi emosi berat, dan populasi dengan intensitas emosi tinggi yang sulit ditoleransi (Linehan et al., 2006, *Arch Gen Psychiatry*, RCT DBT vs terapi oleh ahli non-DBT; NICE, *Borderline personality disorder: recognition and management*, CG78). Untuk AI, subset paling relevan dan aman diadaptasi adalah **modul distress tolerance** (khususnya teknik TIPP dan grounding sensorik) sebagai skill krisis jangka pendek.

## Kontraindikasi
DBT penuh sebagai modalitas terapi **tidak dapat dan tidak boleh** dijalankan AI — ini adalah salah satu modalitas dengan kebutuhan pengawasan klinis paling ketat (termasuk tim konsultasi terapis, on-call crisis coaching oleh profesional). AI **tidak boleh** mencoba mengadaptasi modul emotion regulation/interpersonal effectiveness secara mendalam untuk kasus dengan indikasi BPD — ini murni ranah klinis. Adaptasi AI dibatasi ketat pada teknik distress tolerance jangka pendek untuk regulasi krisis ringan-sedang, BUKAN penanganan pola disregulasi emosi kronis/berat.

## 4. Dasar Teori
- **Biosocial Theory** (Linehan, 1993) — disregulasi emosi muncul dari interaksi kerentanan biologis (sensitivitas emosi tinggi) dengan lingkungan yang tidak validasi (*invalidating environment*).
- **Dialectical Philosophy** — menyeimbangkan dua kutub yang tampak berlawanan: penerimaan penuh kondisi saat ini DAN dorongan aktif untuk berubah, secara simultan (bukan salah satu).
- **Distress Tolerance Skills — TIPP** (Linehan, 2014, *DBT Skills Training Manual*, 2nd ed.) — Temperature (air dingin di wajah memicu dive reflex, menurunkan arousal fisiologis dengan cepat), Intense exercise, Paced breathing, Paired muscle relaxation — dirancang khusus untuk menurunkan arousal fisiologis akut dalam hitungan menit.

## 5. Konsep Utama
- **Distress tolerance vs problem solving** — distress tolerance bukan untuk menyelesaikan masalah, melainkan bertahan melewati momen krisis tanpa memperburuk situasi (prinsip: "bertahan dulu, selesaikan masalah nanti setelah tenang").
- **Wise mind** — sintesis antara "emotion mind" dan "reasonable mind", kondisi ketika keputusan diambil dengan menyeimbangkan logika dan emosi.
- **Radical acceptance** — menerima realitas sepenuhnya (tanpa menyukainya) sebagai prasyarat untuk berhenti menderita akibat penolakan terhadap kenyataan yang tidak bisa diubah saat itu juga.

## 6. Framework Berpikir
Untuk krisis akut, psikolog DBT tidak langsung masuk ke problem-solving atau eksplorasi makna — prioritas pertama adalah **menurunkan arousal fisiologis** terlebih dahulu (karena kapasitas berpikir jernih menurun drastis saat arousal sangat tinggi), baru kemudian beralih ke regulasi emosi/problem solving.

## 7. Langkah Kerja Psikolog
1. Kenali tanda distress akut (bukan sekadar tidak nyaman, tapi tingkat yang mengganggu fungsi/berisiko perilaku impulsif).
2. Tawarkan teknik distress tolerance tercepat sesuai konteks (TIPP bila arousal fisiologis sangat tinggi).
3. Setelah arousal menurun, baru lanjut ke pemrosesan/problem-solving (bisa dengan teknik lain, mis. CBT/ACT).
4. Evaluasi keamanan pengguna sepanjang proses.

## 8. Decision Making
Psikolog memilih teknik distress tolerance (bukan cognitive restructuring atau eksplorasi nilai) ketika tingkat arousal/distress pengguna terlalu tinggi untuk pemrosesan kognitif yang efektif — prinsip "regulasi dulu, proses kemudian".

## 9. Contoh Kasus
Pengguna menulis dengan pola pesan terpecah-pecah, huruf kapital, "AKU GABISA NAHAN INI, RASANYA MAU MELEDAK, KEPALA PENUH BANGET SEKARANG JUGA" — pola menunjukkan distress akut tinggi, bukan sekadar kecemasan biasa.

## 10. Analisis Kasus
Pola linguistik (kapital, fragmentasi, kata "sekarang juga", intensitas ekstrem) menunjukkan arousal fisiologis tinggi yang memerlukan regulasi cepat sebelum pemrosesan kognitif apa pun bisa efektif. Ini BUKAN saat yang tepat untuk cognitive restructuring (Bab 1) atau eksplorasi nilai (Bab 2) — prioritas adalah teknik distress tolerance cepat (TIPP-adjacent) SAMBIL memonitor red flag keselamatan (Bab 0.3, Draft 3) karena intensitas seperti ini juga meningkatkan kewaspadaan risiko.

## 11. Implementasi pada AI

**Decision Tree Bab 3 (DBT — Distress Tolerance Only):**
```
[Terdeteksi pola linguistik distress akut tinggi: kapital, fragmentasi, urgensi ekstrem]
        │
        ▼
[Cek red flag keselamatan (Bab 0.3, Draft 3) SECARA PARALEL] ──(ada indikasi risiko)──► Jalankan protokol krisis SEGERA, teknik regulasi jadi pendamping bukan pengganti
        │
        ▼
[Tawarkan SATU teknik regulasi fisiologis cepat: paced breathing ATAU grounding sensorik]
   (bukan menu panjang pilihan — pilihan berlebih memperberat kognisi yang sudah overload)
        │
        ▼
[Pandu langkah demi langkah, singkat, instruksi konkret]
        │
        ▼
[Cek ulang tingkat distress setelah 1-2 menit] ──(belum turun)──► ulangi/ganti teknik, tetap monitor red flag
        │ (mulai turun)
        ▼
[Baru buka ruang untuk bicara/proses lebih lanjut]
```
**Lapisan Deteksi:** klasifikasi arousal tinggi dari fitur linguistik (kapital berlebih, kalimat terpotong, penanda urgensi "sekarang", "gabisa nahan") sebagai trigger *fast-track* ke distress tolerance, memotong jalur reasoning kompleks lain.
**Lapisan Respons:** instruksi HARUS pendek, konkret, satu langkah pada satu waktu (bukan paragraf psikoedukasi panjang saat arousal tinggi — kapasitas memproses informasi kompleks menurun drastis dalam kondisi ini).
**Guardrail mutlak:** AI tidak pernah mengadaptasi modul DBT lain (emotion regulation, interpersonal effectiveness) sebagai pengganti terapi terstruktur; hanya distress tolerance jangka pendek yang diizinkan, dan hanya sebagai jembatan menuju stabilisasi + dorongan bantuan lanjutan bila pola ini berulang.

## 12. Do & Don't
**Do:** prioritaskan regulasi fisiologis sebelum pemrosesan kognitif; beri instruksi singkat dan konkret; monitor red flag secara paralel.
**Don't:** menawarkan banyak pilihan teknik sekaligus saat distress akut; melakukan eksplorasi makna/masalah mendalam saat arousal masih sangat tinggi; mencoba mengadaptasi modul DBT emotion regulation/interpersonal penuh.

## 13. Limitasi
DBT lengkap memerlukan tim terapeutik dan protokol crisis-coaching langsung oleh profesional terlatih — sesuatu yang secara struktural tidak dapat direplikasi AI. Pola disregulasi emosi berulang yang intens adalah indikasi kuat untuk rujukan ke layanan DBT profesional, bukan penggunaan teknik distress tolerance AI sebagai solusi jangka panjang.

## 14. Referensi Ilmiah Resmi
Linehan (1993, *Cognitive-Behavioral Treatment of Borderline Personality Disorder*); Linehan (2014, *DBT Skills Training Manual*, 2nd ed., Guilford Press); Linehan et al. (2006, *Arch Gen Psychiatry*); NICE CG78, *Borderline personality disorder: recognition and management*.

## 15. Ringkasan Knowledge Base
DBT diadaptasi AI secara sangat terbatas — hanya distress tolerance jangka pendek (paced breathing, grounding) untuk regulasi krisis akut, dengan guardrail ketat bahwa modul emotion regulation/interpersonal DBT penuh berada di luar kapasitas dan kewenangan sistem AI.

---

## CATATAN PENUTUP PART 1 (DRAFT 5)

Bab tersisa untuk Part 2 dan seterusnya: Positive Psychology, Behavioral Activation, Mindfulness, Stress Management, Self Compassion, Grounding, Breathing Exercise, Solution Focused Therapy, Motivational Interviewing — kelompok ini secara umum berisiko lebih rendah (lebih banyak *standalone technique*) sehingga decision tree-nya akan sedikit lebih ringkas, tapi tetap mempertahankan elemen Kontraindikasi eksplisit di setiap bab sesuai prinsip Bab 0.2.

Sebelum lanjut, sayyy: apakah pemisahan "full therapy modality vs standalone technique" di Bab 0 ini sudah sesuai visi ARNOVA.AI, atau ada penyesuaian batas kewenangan yang perlu diperketat/dilonggarkan?
