# Cari Side Job — Design System

> Dokumen ini adalah sumber kebenaran tunggal (single source of truth) untuk visual brand **Cari Side Job**. Semua warna, tipografi, spacing, dan komponen di sini diekstrak secara presisi (color-picked pixel-by-pixel) dari 5 mockup UI resmi yang sudah disetujui: Beranda, Pertanyaan Profesi, Lead Form, Hasil Pemetaan, dan Rekomendasi Produk.
>
> Halaman **Profil/Akun** dan **Admin Dashboard** belum ada di mockup asli — keduanya dirancang di bagian akhir dokumen ini dengan menurunkan pola visual yang sama persis, sehingga kalau nanti ditambah halaman baru lagi (Notifikasi, Riwayat, Detail Produk, dll), tinggal ikuti token dan komponen di dokumen ini agar 100% konsisten.
>
> Ditulis supaya bisa langsung dipakai sebagai instruksi untuk AI coding tool (vibe coding) maupun dibaca manual oleh developer/designer.

---

## 1. Brand Overview

| | |
|---|---|
| **Nama** | Cari Side Job |
| **Tagline** | "Temukan Skill, Raih Peluang" |
| **Kategori** | Platform rekomendasi side job berbasis pemetaan skill & kepribadian |
| **Kepribadian brand** | Membantu, jujur, ringan, memotivasi — bukan corporate/kaku, bukan juga terlalu playful/kekanakan |
| **Logo** | Wordmark 2 baris "Cari" / "Side Job", bold, warna Ink Navy (`#0A0E2E`), dengan aksen glyph kilat/spark biru kecil di sisi kanan kata "Job" |
| **Gaya ilustrasi** | Karakter flat-3D (semi-realistic, soft shading, rounded shapes), dominan biru pada pakaian, skin tone hangat. Gaya sejenis Storyset/Blush "3D character" set |
| **Gaya ikon UI** | Dua lapis: (1) ikon outline/line untuk navigasi & form — rounded stroke ~2px, mirip **Lucide Icons**; (2) emoji/sticker berwarna (💡💼📊) untuk elemen dekoratif "floating tag" di ilustrasi |

---

## 2. Design Tokens

### 2.1 Warna

Semua hex di bawah ini diambil langsung dari mockup (color-picked), bukan tebakan.

#### Warna Inti

| Token | Hex | Penggunaan |
|---|---|---|
| `--color-primary` | `#0074FC` | Tombol utama, active state, progress bar, link, radio/checkbox terpilih, harga produk |
| `--color-primary-hover` | `#0068E0` | Hover/pressed state tombol primary (diturunkan, tidak ada di mockup — gunakan 10% lebih gelap) |
| `--color-ink` | `#0A0E2E` | Headline, wordmark logo, teks judul, angka persentase hasil |
| `--color-ink-soft` | `#3A4160` | Teks label form, teks item list sekunder |
| `--color-muted` | `#98A2B3` | Body text sekunder, subheadline, placeholder aktif |
| `--color-placeholder` | `#C5CAD9` | Placeholder text di input kosong |
| `--color-border` | `#E4E7EE` | Border default input, card, chip unselected |
| `--color-border-soft` | `#EDEFF3` | Border sangat tipis (progress track dasar, divider) |
| `--color-surface` | `#FFFFFF` | Background utama semua halaman |
| `--color-surface-sunken` | `#F1F3F7` | Background tombol sekunder netral (mis. "Kembali") |
| `--color-bg-app` | `#FAFBFC` | Background alternatif (dashboard admin, section abu sangat muda) |

#### Warna Semantik (pastel bg + ikon saturasi tinggi — pola berulang di seluruh app)

Pola ini **wajib diikuti** setiap kali menambah kategori/ikon baru: background pastel lembut (opacity look ~15%) + ikon solid warna penuh dari hue yang sama.

| Kategori | BG Pastel | Ikon/Aksen | Dipakai di |
|---|---|---|---|
| Amber / Skill | `#FDF3E5` | `#FB9F05` | Chip "Skill" di Beranda |
| Mint / Peluang | `#DDF8EF` | `#00AE66` | Chip "Peluang" di Beranda |
| Lavender / Info | `#EDEDFD` | `#3E37F9` | Chip "Penghasilan"; tag kategori produk (Ebook/Template/Kursus) versi lebih terang `#E4E8FC` |
| Hijau / Data | `#DEF6F2` | `#00A55E` | Icon square "Data Entry" di hasil pemetaan |
| Biru / People | `#E1EDFD` | `#0074FC` | Icon square "Virtual Assistant" |
| Oranye / Folder | `#FDEFDD` | `#FEAA00` | Icon square "Admin" |
| Sukses / Cocok | — | `#31B374` | Teks "Cocok" di samping persentase |

> **Catatan implementasi:** kalau nanti ada skill/profesi baru di luar 11 yang sudah ada (lihat project talent-mapping), pilih 1 dari palet di atas yang belum kepakai, atau buat pasangan baru dengan formula: `bg = warna dasar + tint 85-90% putih`, `icon = warna dasar solid/saturated`.

#### Warna Navigasi & Status Nonaktif

| Token | Hex | Penggunaan |
|---|---|---|
| `--color-nav-inactive` | `#9CA3B4` | Icon + label bottom nav yang tidak aktif |
| `--color-nav-active` | `#0074FC` | Sama seperti primary — icon + label bottom nav aktif |
| `--color-icon-unselected` | `#203554` | Icon dark-navy di option row yang belum dipilih (radio list) |
| `--color-track` | `#E7EBF4` | Track kosong progress bar |

#### CSS Custom Properties (siap pakai)

```css
:root {
  /* Core */
  --color-primary: #0074FC;
  --color-primary-hover: #0068E0;
  --color-ink: #0A0E2E;
  --color-ink-soft: #3A4160;
  --color-muted: #98A2B3;
  --color-placeholder: #C5CAD9;
  --color-border: #E4E7EE;
  --color-border-soft: #EDEFF3;
  --color-surface: #FFFFFF;
  --color-surface-sunken: #F1F3F7;
  --color-bg-app: #FAFBFC;

  /* Semantic pastel pairs */
  --amber-bg: #FDF3E5;  --amber-icon: #FB9F05;
  --mint-bg:  #DDF8EF;  --mint-icon:  #00AE66;
  --lav-bg:   #EDEDFD;  --lav-icon:   #3E37F9;
  --lav-tag:  #E4E8FC; /* varian lebih terang untuk tag kategori produk */
  --green-bg: #DEF6F2;  --green-icon: #00A55E;
  --blue-bg:  #E1EDFD;  --blue-icon:  #0074FC;
  --orange-bg:#FDEFDD;  --orange-icon:#FEAA00;
  --success-text: #31B374;

  /* Nav & state */
  --nav-inactive: #9CA3B4;
  --icon-unselected: #203554;
  --track: #E7EBF4;

  /* Radius */
  --radius-btn: 999px;
  --radius-card: 20px;
  --radius-input: 14px;
  --radius-chip: 999px;
  --radius-icon-sq: 14px;

  /* Shadow */
  --shadow-card: 0 2px 10px rgba(10, 14, 46, 0.05);
  --shadow-btn: 0 6px 16px rgba(0, 116, 252, 0.28);
}
```

### 2.2 Tipografi

Font di mockup adalah geometric sans-serif rounded — paling dekat dan aman dipakai: **Plus Jakarta Sans** (tersedia gratis di Google Fonts, mendukung weight 400–800, karakter rounded-nya sangat mirip). Gunakan satu keluarga font ini untuk seluruh app (heading dan body sama-sama pakai family ini, dibedakan lewat weight).

```css
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

:root {
  --font-family: 'Plus Jakarta Sans', sans-serif;
}
```

| Style | Size | Weight | Line-height | Warna | Contoh Pemakaian |
|---|---|---|---|---|---|
| Logo Wordmark | 20px | 800 | 1.1 | `--color-ink` | "Cari / Side Job" |
| Tagline kecil | 11px | 500 | 1.3 | `--color-muted` | "Temukan Skill, Raih Peluang" |
| H1 Hero | 28px | 800 | 1.25 | `--color-ink` (+ 1 frasa `--color-primary`) | "Mulai Langkah Baru dari **Skill Kamu**" |
| H2 Result | 25px | 800 | 1.3 | `--color-ink` (+ frasa kunci `--color-primary`) | "Kamu adalah **"Master Rapi Data"**" |
| H3 Section | 19px | 700 | 1.3 | `--color-ink` | "Saat ini profesi kamu apa?", "Side Job yang Cocok Untuk Kamu" |
| Body | 15px | 500 | 1.55 | `--color-muted` | Paragraf deskripsi/subheadline |
| Label Form | 13px | 700 | 1.4 | `--color-ink-soft` | "Nama Lengkap", "Nomor WhatsApp" |
| Input Text | 15px | 500 | 1.4 | `--color-ink` (placeholder pakai `--color-placeholder`) | Isi input |
| Button Text | 15px | 700 | 1 | putih (di primary) / `--color-ink` (di secondary) | "Lanjutkan", "Cari SIDE JOB" |
| Caption/Meta | 12px | 600 | 1.3 | `--color-muted` | "2/6", label bottom nav |
| Price | 17px | 800 | 1.2 | `--color-primary` | "Rp 79.000" |
| Percentage | 18px | 800 | 1.1 | `--color-ink` | "92%" |
| Tag/Chip Text | 13px | 600 | 1 | `--color-ink-soft` (unselected) / putih (selected) | "Copywriting", "Ebook" |

### 2.3 Spacing Scale

Gunakan skala kelipatan 4px secara konsisten:

```css
:root {
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;   /* padding horizontal halaman standar */
  --space-6: 24px;
  --space-8: 32px;   /* jarak antar section besar */
  --space-10: 40px;
}
```

- **Padding horizontal halaman:** 20px kiri-kanan, konsisten di semua screen.
- **Jarak antar section vertikal:** 24–32px.
- **Jarak antar item dalam list (option row, product card):** 12px.
- **Padding dalam card/row:** 16px vertikal, 18px horizontal.

### 2.4 Radius

| Elemen | Radius |
|---|---|
| Tombol (primary/secondary) | Fully rounded (`999px` — pill), tinggi tombol 56px |
| Card besar (product card, CTA panel) | 20px |
| Input field | 14px |
| Option row (radio list) | 16px |
| Chip/pill (skill tag, filter tab, category tag) | Fully rounded (`999px`) |
| Icon square (kotak pastel berisi ikon) | 14px |
| Avatar/profile circle | Fully rounded (`999px`) |

### 2.5 Elevation / Shadow

Mockup ini nyaris flat — shadow sangat halus, hanya untuk memberi sedikit kedalaman, bukan drop shadow tebal:

```css
--shadow-card: 0 2px 10px rgba(10, 14, 46, 0.05);
--shadow-btn-primary: 0 6px 16px rgba(0, 116, 252, 0.28); /* shadow biru lembut khusus tombol primary utama */
```

Card umumnya mengandalkan **border 1px `--color-border`** dibanding shadow tebal. Shadow hanya dipakai tipis di card yang "mengambang" (product card, CTA panel).

### 2.6 Ikon

- **Ikon fungsional (nav, form, option list, chevron, back arrow, lock, search):** outline/line style, stroke ±2px, ujung rounded (`stroke-linecap: round`). Library rekomendasi: **Lucide Icons** (lucide.dev) — gratis, open source, karakter visualnya paling dekat dengan mockup.
- **Ikon status/kategori (di dalam icon square pastel — dokumen, orang, folder):** solid/filled style dengan warna sesuai token semantik di atas (bukan outline).
- **Ikon dekoratif di ilustrasi (floating chip "Skill/Peluang/Penghasilan"):** gunakan emoji asli (💡 💼 📊) atau ikon 3D-sticker sejenis — bukan line icon, karena butuh kesan "playful accent", bukan UI fungsional.

### 2.7 Ilustrasi Karakter

- Style: semi-3D flat character (bukan foto, bukan flat-2D datar, bukan full 3D render) — mirip Storyset "Cuate/3D" set atau Blush.design.
- Warna dominan pakaian karakter: biru (`#3C82F9`, sedikit lebih terang dari primary — dipakai khusus untuk ilustrasi, bukan UI).
- Skin tone hangat netral, rambut hitam/coklat tua.
- Selalu disertai elemen background dekoratif: blob shape sangat samar abu-kebiruan di belakang karakter (opacity rendah, non-fungsional, murni tekstur).
- Konsisten di 3 dari 5 screen (Beranda, Lead Form pakai varian amplop, Hasil pakai varian thumbs-up) — kalau butuh ilustrasi baru untuk halaman baru, commission dengan brief: "karakter sama, pose beda, tetap dominan biru + skin tone hangat, gaya semi-3D flat."

---

## 3. Komponen Inti

### 3.1 Top Header (dipakai di semua halaman utama — Beranda, Hasil, Rekomendasi)

```
[Logo 2 baris + tagline kecil]                    [Avatar circle abu]
```
- Logo kiri, avatar/profile icon kanan (circle `#EDEFF3`-ish bg, icon outline navy).
- Tinggi header ~64px dari status bar, padding horizontal 20px.
- **Varian Quiz/Flow (back + progress):** header ini DIGANTI oleh baris back-arrow + progress bar (lihat 3.4), logo tidak muncul di tengah alur pertanyaan.

### 3.2 Tombol (Button)

| Varian | Background | Teks | Radius | Tinggi | Kapan dipakai |
|---|---|---|---|---|---|
| Primary | `--color-primary` solid | Putih, 700 | pill | 56px | Aksi utama: "Lanjutkan", "Lihat Hasil Saya", "Cari SIDE JOB", "Lihat Detail" |
| Secondary (netral) | `--color-surface-sunken` (`#F1F3F7`) | `--color-ink`, 700 | pill | 56px | Aksi sekunder/back: "Kembali" |
| Secondary (tinted) | `--lav-bg`-family (`#EDF4FD`) | `--color-ink`, 700 | 20px (card-style, bukan pill) | auto | Card aksi sekunder besar: "Lowongan Kerja Remote", panel "Lihat Penjelasan Lengkap" |
| Ghost/Link | transparent | `--color-primary`, 600, underline optional | — | auto | "Lihat semua skill ⌄" |

Tombol full-width selalu punya padding horizontal 20px dari tepi layar. Ikon panah (`>` atau `→`) di kanan teks jika tombol bersifat navigasi lanjut.

### 3.3 Input Field

```
[Label bold kecil di atas]
[icon outline]  Placeholder text...
```
- Tinggi 52px, radius 14px, border 1px `--color-border`, background putih.
- Icon outline 20px di kiri dalam input (person/whatsapp/envelope, sesuai konteks), warna `--color-muted`.
- Placeholder `--color-placeholder`, teks terisi `--color-ink`.
- Jarak label ke input: 8px. Jarak antar field: 20px.

### 3.4 Progress Bar (quiz flow)

```
←    [====progress====----------]    2/6
```
- Back arrow icon (outline, navy) di kiri.
- Bar: fully rounded, track `--track` (`#E7EBF4`), fill `--color-primary`, tinggi 8px.
- Counter teks "2/6" di kanan, 13px, 600, `--color-muted`.
- Total step = 6 (mengikuti jumlah pertanyaan pada System Requirements: profesi, skill, tools, cara kerja, Bahasa Inggris, +1 tahap lead form/transisi).

### 3.5 Option Row (Radio List — single select)

| State | Background | Border | Icon | Radio |
|---|---|---|---|---|
| Default | `--color-surface` (putih) | 1px `--color-border` | `--color-icon-unselected` (`#203554`) | Ring abu kosong |
| Selected | `#F0F6FD` (tint biru sangat muda) | 1px `--color-primary` | `--color-primary` | Filled biru, ring biru |

- Radius 16px, padding 16px vertikal / 18px horizontal, tinggi ~64px.
- Layout: `[icon 24px] [label 15px/600, flex-grow] [radio 22px]`.
- Jarak antar row: 12px.

### 3.6 Chip / Tag Selectable (multi-select skill)

| State | Background | Border | Teks |
|---|---|---|---|
| Unselected | Putih | 1px `--color-border` | `--color-ink-soft`, 600 |
| Selected | `--color-primary` solid | none | Putih, 600 + small check-circle icon putih di ujung kanan |

- Fully rounded pill, padding 10px 18px, tinggi ~40px, layout flex-wrap dengan gap 10px horizontal / 12px vertikal.
- Search input di atasnya: sama seperti input field standar tapi dengan icon search, radius fully-rounded (bukan 14px).
- Link "Lihat semua skill ⌄" — teks biru 600, chevron-down kecil, center-aligned di bawah grid chip.

### 3.7 Filter Tab (Rekomendasi Produk)

Sama pattern dengan Chip Selectable, tapi single-select (seperti segmented control):
- Selected: `--color-primary` solid, teks putih.
- Unselected: `--color-surface-sunken` (`#F1F3F7`), teks `--color-ink-soft`.
- Pill, padding 10px 16px, gap 8px, horizontal scroll jika overflow.

### 3.8 List Item dengan Progress (Hasil Pemetaan)

```
(1)  [icon square pastel]  Data Entry            92%
                            [====progress bar====]  Cocok
```
- Nomor urut dalam circle abu muda (`#DFE9F6`), 28px diameter, teks `--color-ink` bold.
- Icon square 44px, radius 14px, background & icon warna sesuai token semantik (lihat 2.1).
- Label bold 700 15px `--color-ink`.
- Persentase kanan atas: bold 800 18px `--color-ink` (BUKAN biru — meski terlihat seperti aksen, hasil color-pick menunjukkan ini warna ink/navy gelap).
- Teks "Cocok" di bawah persentase: 12px 600, warna `--success-text` (`#31B374`).
- Progress bar horizontal di bawah label: tinggi 6px, fill `--color-primary`, track `--track`, fully rounded.
- Card wrapper seluruh row: padding 16px, radius 16px, border 1px `--color-border-soft`, jarak antar card 12px.

### 3.9 Product Card (Rekomendasi)

```
[Thumbnail 3D  ]  [Tag kategori pill]
[produk image  ]  Judul Produk (bold, 2 baris max)
[  ~100x130px  ]  Deskripsi singkat (muted, 2 baris max)
                   Rp harga (bold, biru)   [Lihat Detail →]
```
- Card wrapper: putih, radius 20px, border 1px `--color-border-soft`, shadow `--shadow-card`, padding 16px.
- Thumbnail: ilustrasi 3D produk (buku/box mockup), rounded 10px, drop shadow halus bawaan gambar.
- Tag kategori: pill kecil `--lav-tag` bg (`#E4E8FC`), teks `--color-ink-soft` 600, 12px, padding 4px 12px.
- Judul: 16px bold 700, `--color-ink`, max 2 baris.
- Deskripsi: 13px 500, `--color-muted`, max 2 baris.
- Harga: 17px 800, `--color-primary`.
- Tombol "Lihat Detail": primary pill kecil, padding 10px 20px, teks 13px 700 putih.

### 3.10 Bottom Navigation

```
[🏠 Beranda]  [📄 Hasil]  [🛍 Rekomendasi]  [👤 Akun]
```
- 4 item tetap, fixed di bawah, background putih, border-top 1px `--color-border-soft`.
- Tinggi ~64px + safe-area inset bawah.
- **Active:** icon filled/solid + label `--color-primary`, 12px 600.
- **Inactive:** icon outline + label `--color-nav-inactive` (`#9CA3B4`).
- **Konteks flow (quiz, lead form):** semua item inactive/netral — nav tidak menunjukkan tab aktif selama user di tengah alur pertanyaan, karena secara teknis dia belum "pindah tab".

---

## 4. Spesifikasi Per Halaman (dari Mockup)

### 4.1 Beranda (Home)
1. Header standar (logo + avatar).
2. H1 hero 3 baris: "Mulai Langkah Baru dari **Skill Kamu**" (frasa terakhir biru).
3. Body 2 baris subheadline muted.
4. Ilustrasi karakter + 3 floating chip (Skill/Peluang/Penghasilan) + 1 baris teks kecil "Kerja fleksibel, hidup lebih bebas" dengan icon plus biru.
5. Dua CTA: card besar biru solid "Cari SIDE JOB" (primary), card tint biru muda "Lowongan Kerja Remote" (secondary).
6. Bottom nav — tab "Beranda" aktif.

### 4.2 Pertanyaan (Quiz — pola berulang untuk 6 pertanyaan)
1. Progress bar + back arrow + counter "x/6".
2. H3 judul pertanyaan + body instruksi singkat.
3. Body pertanyaan berupa **salah satu** dari 3 varian input, tergantung tipe soal:
   - **Single-select radio list** (contoh: profesi) — lihat 3.5.
   - **Multi-select chip dengan search** (contoh: skill, tools, maksimal 10) — lihat 3.6.
   - Untuk pertanyaan skala (contoh: level Bahasa Inggris) — pakai varian radio list yang sama seperti 3.5, opsi berjumlah 5, tanpa icon per-opsi (opsional icon emoji kecil di kiri jika perlu).
4. Dua tombol bawah: "Kembali" (secondary netral) + "Lanjutkan" (primary), berdampingan 50/50 dengan gap 12px. Di pertanyaan pertama, "Kembali" bisa disembunyikan/disabled.
5. Bottom nav — tidak ada tab aktif.

### 4.3 Lead Capture Form
1. Header standar.
2. Ilustrasi amplop+checklist dengan 4 garis "sparkle" biru di sekelilingnya.
3. H2 "Hasil kamu sudah **siap!**" (kata terakhir biru) + body 2 baris.
4. 3 input field berurutan: Nama Lengkap → Nomor WhatsApp → Email (lihat 3.3), masing-masing dengan label bold di atasnya.
5. Micro-copy trust: icon lock outline + teks kecil muted "Data kamu aman dan tidak akan disebarkan ke pihak lain."
6. Tombol full-width primary "Lihat Hasil Saya →".
7. **Aturan penting dari system requirement:** halaman hasil TIDAK BOLEH bisa diakses/dilihat sebelum form ini disubmit.

### 4.4 Hasil Pemetaan
1. Header standar.
2. Label kecil "Hasil Kamu" (muted, 13px) di atas H2: "Kamu adalah **"[Nama Badge]"**" — nama badge dalam tanda kutip, warna biru.
3. Body deskripsi 3 baris (kepribadian dari hasil skoring).
4. Ilustrasi karakter varian thumbs-up + 1 chip mengambang berisi 3 trait singkat (mis. "Teliti / Terorganisir / Analisis").
5. H3 "Side Job yang Cocok Untuk Kamu" + list max 3 item dengan progress bar (lihat 3.8), diurutkan dari skor tertinggi.
6. Panel/tombol tinted "Lihat Penjelasan Lengkap →" — link ke detail scoring lengkap.
7. Bottom nav — tab "Hasil" aktif.

### 4.5 Rekomendasi Produk
1. Header standar.
2. Label kecil "Rekomendasi Untuk Kamu" + H1 2 baris: "Tingkatkan Skill, Mulai Side Job Sekarang".
3. Body 2 baris, menyebut nama badge hasil user secara dinamis (personalisasi: "...sesuai dengan hasil kamu sebagai "[Nama Badge]"").
4. Filter tab horizontal: Semua / Ebook / Template / Kursus / Tools (lihat 3.7).
5. List product card vertikal (lihat 3.9), maksimal 3 rekomendasi ditampilkan sesuai system requirement ("Satu user bisa memiliki beberapa rekomendasi produk, maks 3").
6. Bottom nav — tab "Rekomendasi" aktif.

---

## 5. Halaman Baru — Dirancang Konsisten (Belum Ada di Mockup)

Dua halaman ini tidak ada di 5 mockup asli, tapi diminta agar tetap satu visual brand. Berikut spesifikasinya, diturunkan murni dari token & komponen di atas.

### 5.1 Halaman Profil / Akun

Alasan desain: item menu profil paling natural mengikuti **pola Option Row (3.5)** yang sudah ada di quiz, hanya versi non-radio (chevron kanan, bukan radio button) — supaya user langsung merasa familiar tanpa komponen baru yang asing.

```
┌─────────────────────────────────────┐
│  ←   Akun Saya                       │  <- header: back arrow + H3 title, center/left align
│                                       │
│         ( 👤 Avatar besar )          │  <- circle 88px, bg --blue-bg, icon --blue-icon
│           Nama Pengguna               │  <- 18px bold ink
│         08123456789                   │  <- 13px muted
│                                       │
│  Hasil Tes Kamu                       │  <- section label, 12px 700 uppercase-tracking, muted
│  ┌───────────────────────────────┐   │
│  │ 📄  "Master Rapi Data"      >  │   │  <- option-row style, chevron kanan
│  │     Dilihat 3 hari lalu         │   │
│  └───────────────────────────────┘   │
│  ┌───────────────────────────────┐   │
│  │ 🔄  Tes Ulang Skill          >  │   │
│  └───────────────────────────────┘   │
│                                       │
│  Pengaturan                           │
│  ┌───────────────────────────────┐   │
│  │ 🔔  Notifikasi               >  │   │
│  │ 💬  Hubungi Kami (WhatsApp)  >  │   │
│  │ 📋  Syarat & Ketentuan       >  │   │
│  └───────────────────────────────┘   │
│                                       │
│  [       Keluar (merah, ghost)   ]   │
│                                       │
│  [Beranda][Hasil][Rekomendasi][Akun*]│
└─────────────────────────────────────┘
```

**Detail token:**
- Header: back arrow outline (`--color-ink`) + H3 "Akun Saya" — pola sama dengan header quiz (3.4) tapi tanpa progress bar.
- Avatar besar: 88px circle, bg `--blue-bg` (`#E1EDFD`), icon outline `--blue-icon`, dengan badge kecil icon-edit (pensil) di pojok kanan-bawah, bg putih border 2px.
- Section label ("Hasil Tes Kamu", "Pengaturan"): 12px 700, `--color-muted`, letter-spacing sedikit lebar, margin bottom 12px.
- Setiap baris menu: identik dengan Option Row (3.5) versi non-selected/non-radio — icon outline 20px kiri (warna `--color-icon-unselected`), label 15px 600 `--color-ink`, subtext opsional 12px muted, chevron `>` kanan (`--color-muted`).
- List "Hasil Tes Kamu" dan "Pengaturan" masing-masing dikelompokkan dalam satu card besar (radius 16px, border `--color-border-soft`), baris-baris di dalamnya dipisah divider tipis (bukan card terpisah-pisah), beda dari Option Row quiz yang card-nya berdiri sendiri per item — ini untuk membedakan konteks "form pilihan" vs "menu navigasi".
- Tombol "Keluar": full-width, ghost/outline merah muda pastel (`bg: #FDE9EC`, teks `#E5484D`), radius pill, dipakai HANYA untuk destructive action ini — satu-satunya tempat warna merah muncul di seluruh app.

### 5.2 Admin Dashboard (Web — untuk Owner)

Berbeda dari app konsumen (mobile-first), dashboard admin adalah **web desktop-first** (dipakai owner dari laptop, meski tetap harus mobile-responsive). Layout: sidebar + content area. Token warna, tipografi, radius, dan pola pastel-icon-square **tetap identik** dengan app konsumen supaya terasa satu keluarga produk.

```
┌────────────┬──────────────────────────────────────────────┐
│  LOGO       │  Ringkasan Hari Ini            🔍 [search]  👤│
│             │                                               │
│ ▸ Ringkasan │  ┌──────────┐ ┌──────────┐ ┌──────────┐      │
│   Leads     │  │ 📥 pastel │ │ ✅ pastel │ │ 💰 pastel │      │
│   Hasil     │  │  biru     │ │  hijau    │ │  amber    │      │
│   Produk    │  │  128      │ │   61%     │ │ Rp2.050rb │      │
│   Pengaturan│  │  Leads    │ │  Konversi │ │  Revenue  │      │
│             │  └──────────┘ └──────────┘ └──────────┘      │
│             │                                               │
│             │  Leads Terbaru                    [Ekspor >] │
│             │  ┌────────────────────────────────────────┐  │
│             │  │ ● Nama   Profil-pill   WA   Tgl   Status│  │
│             │  │ ...baris list, style sama product card...│  │
│             │  └────────────────────────────────────────┘  │
└────────────┴──────────────────────────────────────────────┘
```

**Detail token:**
- **Sidebar:** bg putih, lebar 240px, border-right 1px `--color-border-soft`. Logo di atas (sama wordmark). Setiap nav item pakai pola **Option Row Selected/Unselected** (3.5) versi vertikal-list tanpa border card per item (mirip menu profil 5.1): unselected = icon `--color-icon-unselected` + teks `--color-ink-soft`; active = bg `#F0F6FD` full-width row + icon & teks `--color-primary` + garis aksen kiri 3px `--color-primary`.
- **Top bar:** judul halaman (H3, 19px 700) rata kiri, search input kecil (pola 3.3) + avatar admin di kanan.
- **Stat card:** 3 kolom grid, tiap card putih radius 20px border `--color-border-soft` shadow `--shadow-card`, berisi icon-square pastel 44px (pilih dari token semantik — mis. biru untuk "Leads", hijau untuk "Konversi", amber untuk "Revenue"), angka besar 28px 800 `--color-ink`, label 13px 500 `--color-muted` di bawahnya.
- **Tabel Leads:** setiap baris identik secara komponen dengan **List Item Progress (3.8)** tapi kolom disesuaikan: avatar inisial (circle kecil bg pastel + huruf depan nama), nama (bold ink), **badge profil hasil** (pill kecil dengan bg pastel sesuai token semantik profesi terkait — mis. hijau untuk "Master Rapi Data"/Data Entry), nomor WhatsApp (muted, monospace opsional), tanggal masuk (muted, 13px), status follow-up (pill: "Baru" abu, "Dihubungi" biru tint, "Closing" hijau tint — pola sama seperti tag kategori produk 3.9 tapi warna dinamis sesuai status).
- **Tombol aksi** (Ekspor, Filter, Tambah): sama persis Button Secondary Tinted (3.2).
- **Grafik/chart** (jika ada): garis/area chart pakai `--color-primary` sebagai warna utama; breakdown kategori (pie/bar per profil skill) pakai urutan warna dari token semantik pastel-icon di 2.1 (amber → mint → lavender → hijau → biru → oranye), supaya warna kategori di chart otomatis konsisten dengan warna badge/icon yang sama di halaman lain.
- **Responsive:** di layar <768px, sidebar collapse jadi bottom nav sederhana atau hamburger drawer — tetap pakai token yang sama, jangan perkenalkan warna/style baru.

---

## 6. Voice & Microcopy Pattern

Pola bahasa yang konsisten dipakai di semua mockup — ikuti pola ini untuk copy baru:

- **Sapaan:** selalu "kamu", tidak pernah "Anda". Nada santai tapi tetap rapi (bukan bahasa gaul berlebihan).
- **Headline pola:** [Pernyataan aksi/aspirasi] + [1 frasa ditekankan warna primary di akhir kalimat]. Contoh: "Mulai Langkah Baru dari **Skill Kamu**", "Hasil kamu sudah **siap!**".
- **Body/subheadline:** 1-2 kalimat pendek, selalu muted grey, menjelaskan "apa manfaatnya buat kamu" — bukan penjelasan teknis.
- **CTA button:** kata kerja aktif + hasil konkret. "Cari SIDE JOB", "Lihat Hasil Saya", "Lanjutkan" — bukan "Submit"/"OK"/"Next".
- **Trust microcopy:** selalu ada di dekat form yang minta data pribadi (icon lock + kalimat privasi singkat).
- **Personalisasi:** nama badge hasil user SELALU dalam tanda kutip ganda dan warna primary ketika disebut ulang di halaman lain (Hasil → Rekomendasi), contoh: `"Master Rapi Data"`.

---

## 7. Checklist Konsistensi (untuk halaman baru apa pun ke depannya)

Sebelum anggap sebuah halaman baru "selesai", cek semua ini:

- [ ] Header pakai salah satu dari 3 pola resmi: (a) logo+avatar standar, (b) back+progress bar, (c) back+H3 title.
- [ ] Semua warna diambil dari token di Section 2 — tidak ada hex baru di luar daftar tanpa alasan kuat.
- [ ] Kategori/status baru mengikuti formula pastel-bg + saturated-icon (Section 2.1).
- [ ] Font tetap Plus Jakarta Sans, tidak campur font lain.
- [ ] Radius tombol selalu pill, radius card selalu 20px, radius input selalu 14px.
- [ ] Bottom nav 4 item tetap sama & tidak berubah urutan/ikon di semua halaman konsumen.
- [ ] Copy pakai "kamu", CTA pakai kata kerja aktif, ada 1 frasa warna primary di setiap headline besar.
- [ ] Ilustrasi baru (jika ada) tetap dominan biru + skin tone hangat + gaya semi-3D flat yang sama.
