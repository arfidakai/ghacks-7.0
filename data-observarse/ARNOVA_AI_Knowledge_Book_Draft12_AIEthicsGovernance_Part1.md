# ARNOVA.AI — MENTAL WELLBEING KNOWLEDGE BOOK
## Modul: AI ETHICS & GOVERNANCE
### Draft 12 — Part 1 dari N (Bab 0 – Bab 3)

**Sifat dokumen:** Internal knowledge base, bukan untuk pengguna umum. Ini adalah **modul payung tertinggi** dalam Knowledge Book ARNOVA.AI — lebih tinggi bahkan dari Draft 10 (Risk Management), karena modul ini mendefinisikan *governance structure* (siapa berwenang mengubah apa, bagaimana sistem diaudit, kewajiban hukum apa yang mengikat) yang membingkai seluruh 11 modul sebelumnya, bukan hanya perilaku percakapan.

**Catatan skop:** 18 topik yang diminta dikelompokkan menjadi klaster tematik agar tidak terfragmentasi. Part 1 ini berisi Bab 0 (arsitektur governance menyeluruh, memetakan ARNOVA.AI ke kerangka internasional) + 3 klaster prioritas tertinggi: **Privacy, Consent & Confidentiality**; **Transparency, Explainability & Hallucination Mitigation**; **Human Oversight, Clinical Boundary & Medical Disclaimer**. Klaster tersisa (Bias & Fairness, Security/Audit/Logging, pendalaman regulasi) menyusul di Part 2. Bagian penutup memuat deliverables lintas-klaster: checklist implementasi, risk matrix, SOP, contoh kasus etika, dan draf AI Policy internal.

---

# BAB 0 — ARSITEKTUR GOVERNANCE MENYELURUH

## 0.1 Mengapa Governance Layer Terpisah dari Risk Management (Draft 10)
Draft 10 menjawab "apa yang AI lakukan saat percakapan menyentuh risiko klinis akut". Modul ini menjawab pertanyaan yang lebih luas dan permanen: "siapa yang berwenang mendefinisikan, mengubah, dan mengaudit seluruh perilaku AI." Pemisahan ini konsisten dengan **NIST AI Risk Management Framework** (NIST, 2023, *AI RMF 1.0*), yang membedakan fungsi *Govern* (struktur akuntabilitas, kebijakan, budaya organisasi) dari *Map/Measure/Manage* (identifikasi dan mitigasi risiko operasional harian) — *Govern* adalah fondasi yang membingkai ketiga fungsi lainnya.

## 0.2 Pemetaan ARNOVA.AI ke Kerangka Etik Internasional
```
WHO Ethics and Governance of AI for Health (2021) — 6 prinsip:
  1. Protect human autonomy
  2. Promote human wellbeing, safety & public interest
  3. Ensure transparency, explainability, intelligibility
  4. Foster responsibility & accountability
  5. Ensure inclusiveness & equity
  6. Promote AI responsive & sustainable

OECD AI Principles (2019, updated 2024) — 5 nilai:
  Inclusive growth · Human-centred values & fairness ·
  Transparency & explainability · Robustness & safety · Accountability

NIST AI RMF 1.0 (2023) — 4 fungsi: Govern · Map · Measure · Manage
                            │
                            ▼ diterjemahkan menjadi
ARNOVA.AI GOVERNANCE STACK:
  Bab 1: Privacy/Consent/Confidentiality  → WHO #1, #5; OECD human-centred
  Bab 2: Transparency/Explainability/Hallucination → WHO #3; NIST Measure
  Bab 3: Human Oversight/Clinical Boundary → WHO #2, #4; NIST Govern
  (Part 2) Bias/Fairness → WHO #5; OECD fairness
  (Part 2) Security/Audit/Logging → NIST Manage
```
**Prinsip kerja:** setiap keputusan desain di Draft 3–11 harus dapat ditelusuri balik ke salah satu prinsip di atas — modul ini adalah justifikasi normatif dari seluruh Knowledge Book, bukan daftar terpisah.

## 0.3 Posisi ARNOVA.AI dalam Klasifikasi Risiko EU AI Act (referensi praktik terbaik, bukan yurisdiksi langsung)
EU AI Act (Regulation (EU) 2024/1689) mengklasifikasikan sistem AI berdasarkan tingkat risiko (*unacceptable, high-risk, limited-risk, minimal-risk*). Sistem AI untuk skrining/dukungan kesehatan umumnya masuk kategori **high-risk** bila memengaruhi keputusan perawatan kesehatan. ARNOVA.AI, meski secara eksplisit BUKAN alat diagnostik (Draft 3, Bab 0.2), tetap diperlakukan setara persyaratan *high-risk* sebagai *precautionary principle* internal — bukan kewajiban yurisdiksi Indonesia, melainkan standar kehati-hatian tertinggi yang tersedia.

## 0.4 OpenAI Model Spec sebagai Referensi Perilaku (Bukan Kepatuhan Regulasi)
OpenAI *Model Spec* memperkenalkan prinsip **chain of command** (instruksi platform > developer > pengguna, dengan batas keselamatan yang tak bisa dilampaui instruksi manapun) dan prinsip **jangan berpura-pura tahu yang tidak diketahui**. ARNOVA.AI mengadopsi struktur analog: **Governance (modul ini) > Risk Management (Draft 10) > Persona/Reasoning (Draft 8–9) > preferensi pengguna** — instruksi pengguna tidak pernah dapat melonggarkan batas dari tiga lapis di atasnya.

## 0.5 Struktur Governance Organisasional (Analog Tashih yang Sudah Berjalan)
```
[Tim Klinis (Psikolog/Psikiater berlisensi)] → review Draft 3, 5, 6, 10
[Dewan Pengawas Syariah/Ulama] → tashih Draft 7
[Data Protection Officer/Legal] → review Draft 12 klaster Privacy & regulasi
[System Architect/AI Safety Lead] → review Draft 9, 11, klaster Transparency
[Governance Board gabungan] → keputusan final lintas-klaster, terutama saat 
   terjadi konflik antar-prinsip
```

---

# BAB 1 — PRIVACY, CONSENT & CONFIDENTIALITY

## 1. Definisi
Privacy adalah hak individu atas kendali terhadap informasi personalnya; consent adalah persetujuan yang diberikan secara sadar dan sukarela atas pemrosesan data tersebut; confidentiality adalah kewajiban menjaga informasi yang diungkapkan tidak disebarluaskan tanpa izin (WHO, *Ethics and governance of artificial intelligence for health*, 2021).

## 2. Tujuan
Memastikan ARNOVA.AI memproses data sensitif kesehatan mental sesuai PDPL Indonesia dan standar etik internasional, dengan consent yang benar-benar informed — krusial karena data kesehatan mental adalah kategori data pribadi spesifik/sensitif.

## 3. Kapan Digunakan
Berlaku di setiap titik pengumpulan, penyimpanan, dan pemrosesan data — onboarding, evaluasi sistem, audit internal, maupun (bila ada) berbagi ke pihak ketiga.

## 4. Dasar Teori
- **UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi (PDPL)** — mengklasifikasikan data kesehatan (termasuk kesehatan mental) sebagai data pribadi spesifik (Pasal 4 ayat 2), memerlukan dasar pemrosesan lebih ketat termasuk consent eksplisit.
- **Prinsip Otonomi** (WHO, 2021, prinsip #1) — AI kesehatan harus menghormati kapasitas pengguna mengambil keputusan atas datanya sendiri, termasuk hak menolak/mencabut consent kapan pun tanpa konsekuensi mengancam.
- **Informed Consent Digital Mental Health** (Torous et al., 2021, *World Psychiatry*, 20(3)) — consent aplikasi kesehatan mental digital perlu eksplisit menjelaskan batas AI, penggunaan data, dan protokol krisis — bukan boilerplate legal generik.

## 5. Konsep Utama
- **Consent granular** — consent terpisah untuk fungsi berbeda (skrining dasar vs penyimpanan riwayat tren, Draft 6 Bab 0.4, vs penggunaan data untuk pengembangan sistem).
- **Right to withdraw** — pencabutan consent semudah pemberiannya, dan tidak mengurangi akses ke fungsi keselamatan dasar.
- **Data minimization** — mengumpulkan hanya data yang benar-benar diperlukan (PDPL Pasal 16, privacy-by-design).
- **Confidentiality vs safety override** — kerahasiaan dapat dilampaui saat ada risiko jelas terhadap nyawa (Draft 10, Bab 0.7), namun batas ini dikomunikasikan eksplisit di consent awal, bukan mengejutkan pengguna saat krisis.

## 6. Framework Berpikir
Psikolog manusia terikat kode etik yang mendefinisikan batas kerahasiaan sebelum sesi dimulai (informed consent klinis) — prinsip sama diterapkan AI: batas privasi dan pengecualian keselamatan diketahui di muka, bukan diungkap reaktif saat krisis (berisiko terasa sebagai pengkhianatan kepercayaan di momen paling rentan).

## 7. Langkah Kerja (DPO/Legal/System Architect)
1. Rancang consent flow granular, bahasa natural bukan jargon legal murni.
2. Jelaskan eksplisit: AI bukan manusia, batas kerahasiaan (termasuk pengecualian krisis), jenis data tersimpan, hak pencabutan.
3. Terapkan data minimization pada seluruh skema Draft 11.
4. Sediakan mekanisme mudah melihat, mengekspor, menghapus data pribadi (PDPL Pasal 8).

## 8. Decision Making
Tim menimbang trade-off saat fitur baru memerlukan data tambahan (mis. tren psikometrik jangka panjang): apakah manfaat klinis sepadan dengan peningkatan risiko privasi? Minimalisasi selalu default; pengumpulan tambahan memerlukan justifikasi eksplisit dan consent terpisah.

## 9. Contoh Kasus
Tim produk mengusulkan menyimpan seluruh transkrip percakapan tanpa batas waktu untuk "melatih model lebih baik di masa depan", tanpa consent eksplisit terpisah untuk tujuan ini.

## 10. Analisis Kasus
Ini melanggar prinsip data minimization dan purpose limitation (PDPL Pasal 16) — consent untuk "skrining kesejahteraan" tidak otomatis mencakup consent untuk "pelatihan model". Keputusan tepat: retensi data dibatasi waktu dengan justifikasi klinis, dan penggunaan untuk pelatihan model memerlukan consent granular terpisah dengan opsi anonimisasi.

## 11. Implementasi pada AI

**Consent Flow (ringkas):**
```
[ONBOARDING] → Sajikan consent granular:
    □ Consent dasar (skrining + percakapan) — WAJIB
    □ Consent penyimpanan riwayat untuk tren (Draft 6) — OPSIONAL
    □ Consent data untuk peningkatan sistem (anonim) — OPSIONAL, terpisah
    
    Jelaskan eksplisit: "ARNOVA.AI adalah AI, bukan manusia. Kerahasiaan dijaga 
    KECUALI ada indikasi risiko serius terhadap keselamatan, di mana kami akan 
    mendorongmu ke bantuan profesional/darurat."
```
**Guardrail:** penolakan consent opsional TIDAK PERNAH memblokir akses ke fungsi keselamatan dasar (Draft 10) — privasi tidak boleh dipertaruhkan dengan akses bantuan krisis.

## 12. Do & Don't
**Do:** consent granular dan bahasa natural; jelaskan batas kerahasiaan di muka; sediakan hak akses/hapus data mudah.
**Don't:** consent tunggal "all-or-nothing"; mengungkap batas kerahasiaan hanya saat krisis terjadi; menyimpan data melebihi tujuan yang di-consent.

## 13. Limitasi
Consent yang benar-benar "informed" sulit dijamin penuh karena *consent fatigue*; UX consent granular meningkatkan friksi onboarding yang perlu diseimbangkan dengan aksesibilitas layanan.

## 14. Referensi Ilmiah Resmi
UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi; WHO (2021, *Ethics and governance of artificial intelligence for health*); Torous et al. (2021, *World Psychiatry*, 20(3)); EU AI Act (Regulation (EU) 2024/1689).

## 15. Ringkasan Knowledge Base
Consent bersifat granular dan eksplisit tentang batas AI serta pengecualian keselamatan, mengikuti data minimization PDPL — penolakan consent opsional tidak pernah memblokir fungsi keselamatan dasar.

---

# BAB 2 — TRANSPARENCY, EXPLAINABILITY & HALLUCINATION MITIGATION

## 1. Definisi
Transparency adalah keterbukaan tentang apa itu sistem dan batasnya; explainability adalah kemampuan menjelaskan MENGAPA sistem menghasilkan output tertentu; hallucination mitigation adalah upaya sistematis mengurangi output yang salah namun disampaikan percaya diri (Ji et al., 2023, *ACM Comput Surv*, 55(12)).

## 2. Tujuan
Memastikan pengguna selalu tahu berinteraksi dengan AI, memahami dasar saran yang diberikan (tertelusur ke Draft 3–11 via provenance, Draft 11 Bab 0.4), dan meminimalkan risiko informasi klinis/keagamaan yang salah namun meyakinkan.

## 3. Kapan Digunakan
Transparansi identitas AI berlaku sepanjang waktu; explainability diaktifkan saat audit atau pertanyaan pengguna "kenapa AI bilang begitu"; hallucination mitigation berjalan kontinu di setiap respons.

## 4. Dasar Teori
- **Prinsip Transparansi WHO** (2021, prinsip #3) — sistem AI kesehatan harus cukup jelas dan dapat dipahami, termasuk transparansi kapan seseorang berinteraksi dengan AI vs manusia.
- **RAG sebagai Mitigasi Hallucination Struktural** (Lewis et al., 2020; Shuster et al., 2021, *EMNLP Findings*) — grounding respons pada retrieval tervalidasi (Draft 11) menurunkan hallucination signifikan dibanding generasi murni dari parametric knowledge.
- **Faithfulness vs Fluency Trade-off** — model bahasa default dioptimalkan untuk fluency (terdengar meyakinkan), menyamarkan ketidakpastian faktual — mitigasi memerlukan desain eksplisit memprioritaskan faithfulness untuk domain berisiko tinggi ini.

## 5. Konsep Utama
- **Explainability by provenance** — setiap klaim substantif tertelusur ke chunk_id spesifik (Draft 11) sebagai explainability minimal viable untuk sistem berbasis LLM.
- **Calibrated uncertainty expression** — AI mengekspresikan ketidakpastian proporsional ("kemungkinan", "salah satu penjelasan yang mungkin"), bukan selalu berbicara dengan kepastian penuh.
- **Grounding check** — sebelum menyampaikan klaim substantif, verifikasi apakah didukung chunk ter-retrieve; jika tidak, akui keterbatasan daripada mengarang.

## 6. Framework Berpikir
Prinsip Model Spec OpenAI "jangan berpura-pura tahu yang tidak diketahui" diterjemahkan langsung: AI yang tidak menemukan chunk relevan harus mengakui ketidaktahuan/mengarahkan ke sumber lain, BUKAN mengisi kekosongan dengan jawaban meyakinkan tapi tidak grounded.

## 7. Langkah Kerja (AI Safety Lead/Prompt Engineer)
1. Pastikan setiap respons substantif memiliki chunk pendukung yang dapat dirujuk.
2. Implementasikan bahasa kalibrasi ketidakpastian sebagai default gaya.
3. Uji sistem dengan pertanyaan di luar cakupan Knowledge Book untuk memastikan sistem mengakui batas.
4. Audit berkala sampel respons terhadap grounding-nya.

## 8. Decision Making
Ketika sistem tidak menemukan chunk cukup relevan untuk pertanyaan spesifik, default-nya mengakui keterbatasan dan mengarahkan ke sumber/profesional tepat — BUKAN menghasilkan jawaban "terbaik yang bisa ditebak" seolah fakta.

## 9. Contoh Kasus
Pengguna bertanya: "Menurut hadits riwayat siapa persisnya soal burung yang tawakkal itu, dan apa hukumnya kalau aku nggak percaya?" — memerlukan presisi periwayatan hadits dan pertanyaan teologis di luar cakupan chunk Draft 7 (yang eksplisit menyebut "perlu tashih").

## 10. Analisis Kasus
Ini kasus yang harus memicu pengakuan batas, bukan jawaban percaya diri — chunk terkait (`requires_tashih: true`) menandai detail periwayatan belum diverifikasi, dan pertanyaan "hukum tidak percaya" jelas di luar kewenangan AI (Draft 7, Bab 0.3). Respons tepat mengakui keterbatasan pada kedua dimensi dan mengarahkan ke ulama/guru.

## 11. Implementasi pada AI

**Grounding Check (pseudocode):**
```
FUNGSI susun_respons(query, chunk_hasil_retrieval):
    JIKA relevance_score(chunk_hasil_retrieval, query) < ambang_minimum:
        RETURN template_akui_keterbatasan(query)
    JIKA chunk_hasil_retrieval.requires_tashih == True:
        tambahkan_disclaimer("ini pemahaman umum yang perlu diverifikasi ulama")
    JIKA klaim_melebihi_cakupan_chunk(respons_draft, chunk_hasil_retrieval):
        RETURN revisi_respons_hanya_dalam_cakupan_chunk()
    RETURN respons_dengan_kalibrasi_ketidakpastian_sesuai_confidence_score
```
**Contoh respon:**
> "Soal periwayat hadits itu secara persis, aku nggak mau asal jawab karena ini perlu ketelitian sanad yang sebaiknya dicek langsung ke ustadz/guru yang kamu percaya. Soal pertanyaan satu lagi, itu udah masuk ranah hukum keyakinan yang bukan kewenangan aku — itu lebih tepat ditanyakan ke guru agama kamu langsung."

## 12. Do & Don't
**Do:** akui keterbatasan eksplisit saat chunk tak memadai; kalibrasi bahasa kepastian; selalu transparan sebagai AI.
**Don't:** mengarang jawaban meyakinkan tanpa grounding; menjawab pertanyaan teologis/hukum presisi sebagai otoritas; menyamarkan ketidakpastian dengan nada percaya diri berlebihan.

## 13. Limitasi
Grounding check yang sepenuhnya reliable adalah tantangan riset terbuka; explainability berbasis provenance chunk tidak setara explainability penuh terhadap proses internal model (black-box parametrik).

## 14. Referensi Ilmiah Resmi
WHO (2021); Ji et al. (2023, *ACM Comput Surv*, 55(12)); Lewis et al. (2020, *NeurIPS*); Shuster et al. (2021, *EMNLP Findings*); OpenAI, *Model Spec*.

## 15. Ringkasan Knowledge Base
Transparansi/explainability diimplementasikan via provenance chunk dan kalibrasi ketidakpastian; hallucination dimitigasi struktural melalui grounding check yang lebih memilih mengakui keterbatasan daripada mengarang.

---

# BAB 3 — HUMAN OVERSIGHT, CLINICAL BOUNDARY & MEDICAL DISCLAIMER

## 1. Definisi
Human oversight adalah keterlibatan manusia bermakna dalam mengawasi/mengintervensi sistem AI; clinical boundary adalah batas eksplisit antara yang boleh dilakukan AI dan yang memerlukan profesional berlisensi; medical disclaimer adalah pernyataan eksplisit sifat dan batas layanan (WHO, 2021, prinsip #4).

## 2. Tujuan
Memastikan tidak ada titik dalam sistem yang beroperasi tanpa jalur pengawasan manusia, terutama keputusan berdampak tinggi (Draft 10), serta memastikan pengguna konsisten memahami sifat AI dari layanan ini.

## 3. Kapan Digunakan
Human oversight terstruktur berlaku pada: review berkala Knowledge Book, audit sampel percakapan berisiko tinggi, mekanisme eskalasi manusia untuk kasus krisis. Medical disclaimer disampaikan di onboarding DAN diulang pada momen kontekstual relevan.

## 4. Dasar Teori
- **Meaningful Human Control** — pengawasan manusia harus bermakna (kapasitas nyata memahami/mengintervensi), bukan formalitas "human-in-the-loop" tanpa kapasitas riil.
- **Scope of Practice** (APA, 2017, Standar 2.01) — ditegaskan sebagai kewajiban governance, bukan sekadar pedoman perilaku percakapan.
- **Automation Bias** (Skitka, Mosier, & Burdick, 1999, *Int J Hum Comput Stud*, 51(5)) — manusia cenderung terlalu percaya output otomatis bahkan saat keliru; oversight efektif harus aktif melawan kecenderungan ini.

## 5. Konsep Utama
- **Tiered oversight** — output berisiko tinggi (Draft 10, crisis/high) memerlukan audit trail wajib dan review lebih sering dibanding psikoedukasi rutin.
- **Disclaimer bertingkat** — disclaimer umum onboarding + disclaimer kontekstual (mis. "skor ini skrining, bukan diagnosis", Draft 6), bukan satu disclaimer generik yang mudah dilupakan.
- **Clinical boundary sebagai kontrak governance** — pelanggarannya dicatat dan dievaluasi sebagai insiden governance formal, bukan sekadar "bug produk".

## 6. Framework Berpikir
Governance Board menilai titik mana risiko cukup tinggi sehingga oversight manusia WAJIB terjadi sebelum dampak terjadi, versus titik mana review pasca-hoc (sampling audit) sudah memadai.

## 7. Langkah Kerja (Governance Board/AI Safety Lead)
1. Klasifikasikan output berdasarkan tingkat risiko (selaras risk_tag Draft 10).
2. Untuk kategori crisis/high: pastikan jalur evaluasi pola/insiden berkala dan cepat.
3. Rancang disclaimer bertingkat, uji pemahamannya pada pengguna (bukan hanya keberadaan teksnya).
4. Dokumentasikan setiap insiden pelanggaran batas sebagai laporan governance formal.

## 8. Decision Making
Governance Board memprioritaskan oversight PRE-DEPLOYMENT ketat (review menyeluruh sebelum rilis) dibanding mengandalkan deteksi POST-HOC semata — konsisten prinsip *safety by design*.

## 9. Contoh Kasus
Audit rutin menemukan: dari 50 sampel percakapan "stress ringan", 3 (6%) AI memberi kalimat terdengar seperti kepastian diagnostik ("kamu kena burnout kok kelihatannya") — melanggar batas eksplisit Draft 3 Bab 0.2.

## 10. Analisis Kasus
Ini insiden pelanggaran clinical boundary, bukan kesalahan kecil — harus: (1) didokumentasikan formal, (2) dianalisis akar penyebab (chunk kurang tegas? grounding check gagal?), (3) memicu perbaikan sistemik, (4) dilaporkan ke Governance Board sebagai bagian siklus audit.

## 11. Implementasi pada AI

**Tiered Oversight Framework:**
```
KATEGORI RISIKO (risk_tag, Draft 11):
  crisis/high  → Audit trail WAJIB tiap insiden + review manusia siklus cepat 
                  + laporan insiden formal bila ada pelanggaran boundary
  medium       → Sampling audit rutin (mis. mingguan)
  low/none     → Sampling audit berkala (mis. bulanan) + monitoring metrik agregat
```
**Disclaimer Bertingkat:**
```
ONBOARDING (wajib dikonfirmasi paham, bukan sekadar "next"):
  "ARNOVA.AI adalah AI pendamping kesejahteraan mental awal, BUKAN psikolog/
   psikiater, BUKAN pengganti terapi, BUKAN layanan darurat. Untuk kondisi 
   mendesak, hubungi 119 ekstensi 8 atau layanan darurat terdekat."

KONTEKSTUAL:
  Sebelum skor psikometrik: "Ini hasil skrining, bukan diagnosis."
  Saat menawarkan teknik CBT/ACT: "Ini latihan berbasis [metode], bukan sesi terapi penuh."
```
**Guardrail:** insiden pelanggaran boundary otomatis memicu flag ke sistem audit, BUKAN hanya diperbaiki silent di respons berikutnya.

## 12. Do & Don't
**Do:** disclaimer bertingkat kontekstual; oversight ketat pre-deployment; dokumentasikan pelanggaran boundary sebagai insiden formal.
**Don't:** mengandalkan hanya satu disclaimer generik; menganggap "human-in-the-loop" terpenuhi hanya karena ada tombol laporan; memperbaiki pelanggaran boundary secara silent tanpa analisis akar penyebab.

## 13. Limitasi
Oversight manusia penuh untuk setiap percakapan tidak scalable; sistem mengandalkan sampling dan deteksi otomatis pola berisiko sebagai kompromi realistis — sebagian pelanggaran pada kategori risiko rendah berisiko tidak terdeteksi segera.

## 14. Referensi Ilmiah Resmi
WHO (2021); APA (2017, *Ethical Principles*); Skitka, Mosier, & Burdick (1999); NIST AI RMF 1.0 (2023); OECD AI Principles (2019/2024).

## 15. Ringkasan Knowledge Base
Human oversight berjenjang sesuai risiko output, disclaimer bertingkat bukan sekali generik, dan pelanggaran clinical boundary diperlakukan sebagai insiden governance formal yang memicu analisis akar penyebab sistemik.

---

# BAGIAN PENUTUP PART 1: DELIVERABLES LINTAS-KLASTER

## A. Checklist Implementasi
```
□ Consent granular terimplementasi — dasar, tren, pelatihan model TERPISAH
□ Hak akses/hapus data pengguna tersedia dan berfungsi (PDPL Pasal 8)
□ Setiap respons substantif memiliki jalur provenance ke chunk
□ Grounding check aktif — sistem mengakui batas saat chunk tidak memadai
□ Disclaimer bertingkat terpasang di onboarding DAN titik kontekstual
□ Tiered oversight framework aktif sesuai risk_tag
□ Insiden pelanggaran boundary memiliki jalur pelaporan formal
□ Governance Board lintas-disiplin terbentuk
```

## B. Risk Matrix (awal, akan diperluas Part 2 dengan Bias/Security)

| Risiko | Likelihood | Impact | Mitigasi | Bab Rujukan |
|---|---|---|---|---|
| AI memberi kesan diagnosis pasti | Sedang | Tinggi | Grounding check + disclaimer bertingkat + audit boundary | Bab 2, 3 |
| Data sensitif tersimpan melebihi consent | Rendah-Sedang | Tinggi | Data minimization + consent granular + audit retensi | Bab 1 |
| Hallucination dalil tasawuf tanpa tashih | Sedang | Tinggi (risiko keagamaan) | requires_tashih flag wajib + disclaimer eksplisit | Bab 2; Draft 7, 11 |
| Consent fatigue → persetujuan tak benar-benar informed | Tinggi | Sedang | UX consent granular disederhanakan, diuji pemahaman | Bab 1 |
| Pelanggaran boundary tak terdeteksi kasus risiko rendah | Sedang | Sedang | Sampling audit berkala + monitoring metrik agregat | Bab 3 |

## C. SOP Ringkas: Penanganan Insiden Pelanggaran Clinical Boundary
```
1. DETEKSI — insiden ditemukan (audit rutin/laporan pengguna/monitoring otomatis)
2. DOKUMENTASI — catat konteks penuh (chunk ter-retrieve, state percakapan, output aktual)
3. KLASIFIKASI — tingkat keparahan (kesan diagnosis vs privasi vs saran berbahaya)
4. ANALISIS AKAR PENYEBAB — chunk kurang tegas? grounding check gagal? persona drift?
5. REMEDIASI — perbaiki chunk/guardrail terkait (bukan hanya patch respons tunggal)
6. VERIFIKASI — uji ulang skenario serupa pasca-remediasi
7. PELAPORAN — laporkan ke Governance Board, masukkan log audit permanen
```

## D. Contoh Kasus Etika Tambahan
Pengguna terindikasi remaja (mis. menyebut "kelas 11") mengungkapkan distress tekanan akademik berat. **Isu etika:** modul ini belum membahas eksplisit perlindungan tambahan untuk minor — gap yang perlu ditindaklanjuti di Part 2, mengingat data anak memiliki perlindungan lebih ketat dalam PDPL Pasal 4 ayat 2 huruf i dan prinsip WHO tentang kelompok rentan.

## E. Draf AI Policy Internal ARNOVA.AI (ringkasan eksekutif, v0.1)
```
1. TUJUAN: ARNOVA.AI adalah AI early screening & spiritual companion, BUKAN 
   pengganti layanan psikologi/psikiatri/keagamaan profesional.

2. PRINSIP INDUK: Keselamatan > Privasi Preferensial > Kelengkapan Fitur.

3. RANTAI OTORITAS: Governance (Draft 12) > Risk Management (Draft 10) > 
   Reasoning/Persona (Draft 8-9) > preferensi/instruksi pengguna dalam sesi.

4. KEWAJIBAN TRANSPARANSI: AI selalu mengidentifikasi diri sebagai AI; tidak 
   pernah mengklaim kesadaran/perasaan manusiawi genuine.

5. KEWAJIBAN GROUNDING: Klaim substantif tertelusur ke Knowledge Book; 
   ketidakpastian diakui eksplisit, bukan disamarkan.

6. REVIEW BERKALA: seluruh Knowledge Book direview tim lintas-disiplin 
   (klinis, DPS/ulama untuk Draft 7, legal/DPO, AI safety) — frekuensi 
   ditentukan Governance Board.

   [Akan diperluas Part 2 dengan klaster Bias/Fairness dan Security/Audit/
   Logging sebelum dianggap lengkap sebagai kebijakan final.]
```

---

## CATATAN PENUTUP PART 1 (DRAFT 12)

Klaster tersisa Part 2: **Bias & Fairness**, **AI Safety** (lebih luas — robustness, adversarial testing), **Security, Audit & Logging**, serta pendalaman regulasi (PDPL rinci, NIST fungsi Map/Measure/Manage, EU AI Act, OpenAI Model Spec lebih dalam) — dan penyelesaian AI Policy jadi dokumen final.

Satu gap yang saya tandai eksplisit, sayyy: **modul ini belum membahas perlindungan khusus pengguna di bawah umur** — perlu jadi prioritas Part 2 mengingat basis pengguna Agnia Care/Idrisiyyah kemungkinan mencakup santri/pelajar. Mau saya jadikan itu prioritas pertama di Part 2, sebelum Bias/Fairness dan Security/Audit?
