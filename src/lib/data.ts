
export interface ProductItem {
  id?: string;
  title: string;
  desc: string;
  price: string;
  badge?: string;
  url: string;
  category?: string;
  type?: string;
  imageUrl?: string;
  sideJob?: string;
  isPublished?: boolean;
}

export interface RoadmapStep {
  step: number;
  title: string;
  desc: string;
}

export interface SideJob {
  id: string;
  name: string;
  persona: string;
  icon: string;
  tagline: string;
  kategori: string;
  tingkatKesulitan: string;
  keperluanEnglish: number;
  deskripsi: string;
  skills: string[];
  tools: string[];
  why: string[];
  roadmap: RoadmapStep[];
  products: ProductItem[];
}

export interface RemoteJobItem {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  posted: string;
  primarySideJob: string;
  tags: string[];
  description: string;
  applyUrl: string;
}

export interface MasterSkill {
  name: string;
  sideJobs: string[];
}

export interface MasterTool {
  name: string;
  sideJobs: string[];
}

export interface WorkStyle {
  id: string;
  label: string;
  desc: string;
  sideJobs: string[];
}

export interface ReadinessOption {
  label: string;
  score: number;
  gap: string | null;
}

export interface ReadinessQuestion {
  id: string;
  title: string;
  options: ReadinessOption[];
}

export interface CommunityUSP {
  consultation: {
    title: string;
    badge: string;
    value: string;
    desc: string;
    perks: string[];
  };
  community: {
    title: string;
    badge: string;
    desc: string;
    link: string;
    memberCount: string;
  };
  monthlyMeetup: {
    title: string;
    badge: string;
    desc: string;
    nextSchedule: string;
    upcomingTopic: string;
    speaker: string;
  };
}

/**
 * DATA BASE SIDE JOB, LOWONGAN REMOTE, DAN KONFIGURASI SISTEM
 * Sumber data: Google Spreadsheet Mas Adit & LAB Sekolah WFA
 */

export const SIDE_JOBS_DB: Record<string, SideJob> = {
  dataentry: {
    id: "dataentry",
    name: "Data Entry Specialist",
    persona: "Master Rapi Data",
    icon: "📊",
    tagline: "Kamu cenderung teliti, terorganisir, dan nyaman bekerja dengan data serta informasi terstruktur.",
    kategori: "Data & Admin",
    tingkatKesulitan: "Pemula",
    keperluanEnglish: 2, // 1-5
    deskripsi: "Memasukkan, memperbarui, mengorganisasi, dan memvalidasi data dalam sistem atau spreadsheet secara akurat dan rapi.",
    skills: ["Typing", "Accuracy", "Data Organization", "Spreadsheet", "Attention to Detail", "Research", "Data Validation", "Time Management", "File Management", "Basic Computer Skills"],
    tools: ["Microsoft Excel", "Google Sheets", "Google Docs", "Airtable"],
    why: [
      "Kamu sangat teliti dan nyaman berkutat dengan spreadsheet atau data teratur.",
      "Kamu menyukai pekerjaan dengan SOP yang jelas tanpa perlu overthinking.",
      "Tools seperti Excel dan Google Sheets sudah sangat kamu kuasai."
    ],
    roadmap: [
      { step: 1, title: "Kuasai Formula Esensial", desc: "Pelajari shortcut spreadsheet, VLOOKUP/XLOOKUP, filter, dan data validation untuk mempercepat kerja 3x lipat." },
      { step: 2, title: "Siapkan Portofolio Dummy", desc: "Buat 2 contoh spreadsheet sebelum & sesudah dirapikan (cleansing data) sebagai bukti ketelitian kamu." },
      { step: 3, title: "Daftar di Platform Target", desc: "Buat profil di platform freelance lokal (Fastwork, Sribulancer) dan komunitas UMKM yang butuh perapian inventaris." },
      { step: 4, title: "Gaskeun Orderan Pertama", desc: "Tawarkan harga perdana yang kompetitif dengan jaminan revisi dan akurasi 100% untuk mengumpulkan ulasan bintang 5." }
    ],
    products: [
      {
        title: "Panduan Lengkap Side Job Data Entry",
        desc: "Langkah demi langkah mulai dari nol, trik spreadsheet cepat, hingga cara tembus klien pertama.",
        price: "Rp 79.000",
        badge: "Best Seller",
        url: "https://lynk.id/adithdigital/v98w8o6g96g6"
      },
      {
        title: "Template Administrasi & Spreadsheet Siap Pakai",
        desc: "Kumpulan 25+ template inventory, keuangan, dan data cleaning tinggal pakai untuk portofolio dan klien.",
        price: "Rp 49.000",
        badge: "Starter Pack",
        url: "https://lynk.id/adithdigital/180ypg6147e2"
      }
    ]
  },

  va: {
    id: "va",
    name: "Virtual Assistant (VA)",
    persona: "Andalan Semua Orang",
    icon: "🧑‍💻",
    tagline: "Kamu sosok yang terorganisir, komunikatif, dan lihai meringankan beban operasional orang lain.",
    kategori: "Admin & Support",
    tingkatKesulitan: "Menengah",
    keperluanEnglish: 4,
    deskripsi: "Membantu pekerjaan administratif, riset, jadwal, koordinasi chat/email, dan operasional bisnis secara remote.",
    skills: ["Administrasi", "Komunikasi", "Manajemen Waktu", "Riset", "Data Entry", "Customer Service", "Organisasi", "Problem Solving", "Google Workspace", "Attention to Detail"],
    tools: ["Google Workspace", "Microsoft Office", "Notion", "Slack", "Trello", "Zoom"],
    why: [
      "Kamu punya kemampuan komunikasi dan koordinasi yang rapi via pesan maupun video call.",
      "Kamu bisa multitasking mengatur jadwal dan dokumen bisnis secara fleksibel.",
      "Peluang bayaran dalam dollar terbuka lebar karena banyak dicari founder luar negeri."
    ],
    roadmap: [
      { step: 1, title: "Pilih Niche VA Kamu", desc: "Tentukan spesialisasi: General Admin VA, Social Media VA, atau E-commerce Support VA." },
      { step: 2, title: "Rancang Resume & Notion Portfolio", desc: "Buat portofolio satu halaman di Notion yang merangkum tools yang kamu kuasai dan contoh pengorganisasian tugas." },
      { step: 3, title: "Kuasai Tools Kolaborasi Remote", desc: "Biasakan menggunakan Slack, Trello, Google Calendar, dan Loom untuk komunikasi asinkron profesional." },
      { step: 4, title: "Lamar Klien Pertama", desc: "Mulai apply di OnlineJobs.ph, Upwork, atau tawarkan ke pebisnis online yang sedang butuh asisten tangan kanan." }
    ],
    products: [
      {
        title: "Panduan Side Job Virtual Assistant",
        desc: "Strategi mendapatkan klien luar negeri bergaji dollar, template pitch, dan SOP kerja asisten virtual.",
        price: "Rp 129.000",
        badge: "Paling Diminati",
        url: "https://lynk.id/adithdigital/rwx8jwnp9gev"
      },
      {
        title: "Virtual Assistant Notion Starter Kit",
        desc: "Dashboard kerja klien, template invoice, weekly planner, dan tracking tugas siap duplikasi.",
        price: "Rp 59.000",
        badge: "Produktivitas",
        url: "https://lynk.id/adithdigital/m3w7kz86d4q9"
      }
    ]
  },

  admin: {
    id: "admin",
    name: "Online Admin & Operational",
    persona: "Sultan Multitasking",
    icon: "🗂️",
    tagline: "Kamu piawai merapikan hal-hal rumit, teliti mengurus berkas, dan membuat operasional berjalan mulus.",
    kategori: "Admin",
    tingkatKesulitan: "Pemula",
    keperluanEnglish: 3,
    deskripsi: "Mengelola pekerjaan administratif seperti invoice, rekap orderan, inventaris toko online, dan follow up klien.",
    skills: ["Administration", "Data Entry", "Organization", "Communication", "Scheduling", "Documentation", "Spreadsheet", "Email Management", "Time Management", "Attention to Detail"],
    tools: ["Microsoft Office", "Google Workspace", "Excel", "Gmail", "Notion", "Trello"],
    why: [
      "Banyak brand lokal dan UMKM mencari admin remote yang jujur, cepat tanggap, dan teliti.",
      "Bisa dikerjakan paruh waktu (part-time) di sela jam kuliah atau setelah jam kantor utama.",
      "Gaya kerjamu yang rapi membuat pemilik usaha tenang menyerahkan pembukuan operasional."
    ],
    roadmap: [
      { step: 1, title: "Kuasai Alur Toko Online", desc: "Pahami alur pemesanan marketplace (Shopee/Tokopedia), rekap resi, dan template invoice." },
      { step: 2, title: "Buat SOP & Template Balas Chat", desc: "Kumpulkan template chat ramah dan solutif untuk menangani customer dan komplain." },
      { step: 3, title: "Tawarkan Jasa ke Online Shop", desc: "Bantu 1 teman atau UMKM sekitar selama 1-2 minggu sebagai studi kasus portofolio nyata." },
      { step: 4, title: "Raih Kontrak Bulanan", desc: "Ambil lowongan admin remote dengan sistem gaji tetap bulanan atau komisi per closing order." }
    ],
    products: [
      {
        title: "Side Job Admin: Mudah dan Auto Keterima",
        desc: "Blueprint lengkap menjadi admin remote toko online & bisnis lokal dengan pendapatan stabil.",
        price: "Rp 89.000",
        badge: "Rekomendasi",
        url: "https://lynk.id/adithdigital/180ypg6147e2"
      }
    ]
  },

  writer: {
    id: "writer",
    name: "Copywriter & Content Writer",
    persona: "Peracik Kata Berbayar",
    icon: "✍️",
    tagline: "Kamu piawai menuangkan ide ke dalam tulisan persuasif yang menghipnotis pembaca dan menghasilkan aksi.",
    kategori: "Writing & Marketing",
    tingkatKesulitan: "Menengah",
    keperluanEnglish: 4,
    deskripsi: "Menulis teks persuasif untuk iklan, landing page, caption Instagram, email broadcast, dan artikel SEO.",
    skills: ["Writing", "Storytelling", "Persuasion", "Research", "Marketing", "Psychology", "Headline Writing", "Editing", "Creativity", "Audience Understanding"],
    tools: ["Google Docs", "Grammarly", "ChatGPT", "Notion", "Canva"],
    why: [
      "Setiap bisnis di dunia maya membutuhkan tulisan untuk jualan produk mereka.",
      "Fleksibilitas tinggi: bisa menulis di mana saja hanya bermodalkan HP atau laptop.",
      "Bisa digabung dengan kemampuan AI prompts untuk memproduksi konten 5x lebih cepat."
    ],
    roadmap: [
      { step: 1, title: "Pahami Formula Copywriting", desc: "Kuasai kerangka AIDA (Attention, Interest, Desire, Action) dan PAS (Problem, Agitate, Solution)." },
      { step: 2, title: "Koleksi Swipe File & Bikin Portofolio", desc: "Tulis ulang 3 contoh iklan atau caption produk nyata dengan gaya persuasifmu sendiri di Google Docs/Notion." },
      { step: 3, title: "Bangun Personal Branding", desc: "Bagikan tips copywriting singkat di LinkedIn atau X/Twitter untuk menarik pebisnis yang mencari penulis." },
      { step: 4, title: "Pitching ke Brand & Agency", desc: "Kirim pesan DM atau email penawaran audit caption gratis kepada brand lokal yang copywriting-nya masih kaku." }
    ],
    products: [
      {
        title: "Panduan Side Job Menulis / Copywriter Cuan",
        desc: "Formula copywriting konversi tinggi, cara riset pembeli, dan daftar platform penulis berbayar mahal.",
        price: "Rp 99.000",
        badge: "Pilihan Penulis",
        url: "https://lynk.id/adithdigital/j8e53883e991"
      }
    ]
  },

  videoeditor: {
    id: "videoeditor",
    name: "Short-Form Video Editor",
    persona: "Arsitek Visual Viral",
    icon: "🎬",
    tagline: "Kamu punya mata visual tajam, paham ritme musik, dan tahu cara menahan perhatian penonton dari detik pertama.",
    kategori: "Creative",
    tingkatKesulitan: "Menengah",
    keperluanEnglish: 2,
    deskripsi: "Mengedit video pendek untuk TikTok, Reels, YouTube Shorts, serta video iklan komersial brand dan creator.",
    skills: ["Video Editing", "Storytelling", "Cutting", "Color Grading", "Audio Editing", "Motion Graphics", "Visual Composition", "Creativity", "Content Awareness", "Attention to Detail"],
    tools: ["CapCut", "Adobe Premiere Pro", "DaVinci Resolve", "After Effects", "Canva"],
    why: [
      "Permintaan video pendek meledak gila-gilaan dari creator, influencer, hingga brand besar.",
      "Cukup dengan CapCut di PC atau HP, kamu sudah bisa menghasilkan puluhan video berkualitas tinggi.",
      "Pendapatan dihitung per video (Rp 100k - Rp 500k/video) sehingga cuan bisa bertambah cepat."
    ],
    roadmap: [
      { step: 1, title: "Kuasai Hook & Pacing 3 Detik", desc: "Pelajari cara menyusun potongan klip cepat, transisi halus, sound effects (SFX), dan teks animasi." },
      { step: 2, title: "Rakit Showreel 60 Detik", desc: "Ambil rekaman podcast atau materi bebas hak cipta, edit menjadi 3 video vertikal memukau dan simpan di Google Drive." },
      { step: 3, title: "Dekati Content Creator", desc: "Kirim email/DM ke YouTuber atau selebgram yang postingan videonya masih belum konsisten." },
      { step: 4, title: "Tawarkan Paket Retainer Bulanan", desc: "Tawarkan paket 15-30 video per bulan dengan sistem bayar di muka untuk kepastian income." }
    ],
    products: [
      {
        title: "Mastery CapCut & Short-Form Video Cuan",
        desc: "Template subtitle dinamis, pack sound effects, dan rahasia closing klien konten creator pertama.",
        price: "Rp 99.000",
        badge: "Tren #1",
        url: "https://lynk.id/adithdigital/m3w7kz86d4q9"
      }
    ]
  },

  socialmedia: {
    id: "socialmedia",
    name: "Social Media Manager",
    persona: "Pengendali Tren Medsos",
    icon: "📱",
    tagline: "Kamu peka terhadap hal-hal yang sedang viral, kreatif mengemas pesan, dan paham psikologi audiens.",
    kategori: "Digital Marketing",
    tingkatKesulitan: "Menengah",
    keperluanEnglish: 3,
    deskripsi: "Mengelola akun media sosial mulai dari penyusunan content calendar, visual, copywriting caption, hingga reporting.",
    skills: ["Content Planning", "Copywriting", "Social Media Strategy", "Analytics", "Communication", "Research", "Creativity", "Trend Research", "Scheduling", "Community Management"],
    tools: ["Meta Business Suite", "Canva", "CapCut", "TikTok", "Instagram", "Notion", "Buffer"],
    why: [
      "Banyak pemilik bisnis tidak punya waktu membuat konten harian dan butuh partner terpercaya.",
      "Kombinasi skill visual sederhana + copywriting caption menghasilkan value jasa yang tinggi.",
      "Pekerjaan sangat dinamis, tidak monoton, dan bisa kamu pantau langsung dari smartphone."
    ],
    roadmap: [
      { step: 1, title: "Pelajari Content Pillar", desc: "Bagi konten ke dalam edukasi, inspirasi, hiburan, dan promosi agar feed akun teratur." },
      { step: 2, title: "Buat Portofolio Mockup Akun", desc: "Rancang 9 postingan Instagram (grid) untuk bisnis fiktif menggunakan Canva beserta copywriting-nya." },
      { step: 3, title: "Tawarkan Jasa Free Audit", desc: "Kirimkan audit singkat profil Instagram bisnis teman atau kenalan beserta solusi peningkatannya." },
      { step: 4, title: "Kunci Klien dengan Kontrak Bulanan", desc: "Tawarkan paket pengelolaan lengkap: 12-20 postingan per bulan + interaksi komentar." }
    ],
    products: [
      {
        title: "Panduan Komplit Social Media Management",
        desc: "Content calendar otomatis, 50+ ide konten viral, dan template proposal penawaran jasa ke brand.",
        price: "Rp 119.000",
        badge: "Lengkap",
        url: "https://lynk.id/adithdigital/5q01jnzdd7yg"
      }
    ]
  },

  graphicdesigner: {
    id: "graphicdesigner",
    name: "Graphic Designer",
    persona: "Kreator Estetika Visual",
    icon: "🎨",
    tagline: "Kamu punya sentuhan visual artistik, peka terhadap komposisi warna, font, dan layout yang menarik mata.",
    kategori: "Creative",
    tingkatKesulitan: "Menengah",
    keperluanEnglish: 2,
    deskripsi: "Membuat desain visual untuk feed media sosial, banner iklan promosi, logo, presentasi bisnis, dan brosur.",
    skills: ["Design Principles", "Typography", "Color Theory", "Layout", "Branding", "Visual Communication", "Creativity", "Image Editing", "Composition", "Attention to Detail"],
    tools: ["Canva", "Adobe Photoshop", "Illustrator", "Figma"],
    why: [
      "Konten visual selalu menjadi ujung tombak daya tarik bisnis di internet.",
      "Dengan Canva Pro atau tools desain modern, proses pembuatan materi visual semakin cepat.",
      "Bisa menjual jasa desain kustom maupun membuat produk digital template desain yang dijual berkali-kali."
    ],
    roadmap: [
      { step: 1, title: "Kuasai Hirarki Tipografi & Warna", desc: "Pahami kontras warna, pasangan font yang serasi, dan white space agar desain terlihat profesional." },
      { step: 2, title: "Susun Portofolio Behance / PDF", desc: "Pajang 5-8 desain terbaikmu meliputi banner promosi, feed carousel, dan kartu nama." },
      { step: 3, title: "Jual di Marketplace Desain", desc: "Daftar di Fastwork, Fiverr, atau tawarkan paket branding UMKM di grup Facebook dan WhatsApp." },
      { step: 4, title: "Bangun Aset Template Siap Jual", desc: "Kembalikan karya terbaikmu menjadi template Canva siap beli di Lynk.id untuk passive income." }
    ],
    products: [
      {
        title: "Kit Sukses Desainer Freelance Pemula",
        desc: "Koleksi palet warna berkelas, panduan font pairing, dan cara mematok harga desain tanpa perang tarif.",
        price: "Rp 89.000",
        badge: "Rekomendasi",
        url: "https://lynk.id/adithdigital/m3w7kz86d4q9"
      }
    ]
  },

  customersupport: {
    id: "customersupport",
    name: "Remote Customer Support",
    persona: "Juru Solusi Ramah",
    icon: "🎧",
    tagline: "Kamu sosok yang sabar, memiliki empati tinggi, luwes berkomunikasi, dan senang membantu memecahkan keluhan.",
    kategori: "Customer Service",
    tingkatKesulitan: "Pemula–Menengah",
    keperluanEnglish: 4,
    deskripsi: "Membantu pelanggan melalui live chat, email, tiket support, atau telepon untuk menyelesaikan kendala dan transaksi.",
    skills: ["Communication", "Empathy", "Problem Solving", "Product Knowledge", "Patience", "Typing", "Active Listening", "Conflict Resolution", "Organization", "Customer Service"],
    tools: ["Zendesk", "Intercom", "Freshdesk", "Slack", "Gmail", "WhatsApp"],
    why: [
      "Banyak startup teknologi dan toko online internasional membutuhkan CS shift malam/fleksibel.",
      "Pekerjaan berbasis sistem ticketing dengan panduan jawaban (macros) yang terstruktur rapi.",
      "Peluang stabilitas gaji bulanan yang sangat baik tanpa perlu memikirkan riset desain atau jualan."
    ],
    roadmap: [
      { step: 1, title: "Latih Empati & Mengetik Cepat", desc: "Tingkatkan kecepatan ketik minimal 50 WPM dan asah gaya bahasa diplomatis dan profesional." },
      { step: 2, title: "Kenali Software CS Populer", desc: "Pelajari antarmuka Zendesk, Freshdesk, atau fitur WA Business & live chat web." },
      { step: 3, title: "Buat CV Menarik Fokus Pelayanan", desc: "Tonjolkan pengalaman organisasi, kepanitiaan, atau keramahan komunikasi dalam melayani orang." },
      { step: 4, title: "Lamar Lowongan CS Remote", desc: "Cari lowongan di Remote.co, Glints, atau portal karir startup e-commerce dan edutech." }
    ],
    products: [
      {
        title: "Panduan Lolos Kerja Customer Support Remote",
        desc: "Kumpulan template jawaban komplain klien sulit, simulasi tes chat CS, dan daftar website loker CS global.",
        price: "Rp 85.000",
        badge: "Praktis",
        url: "https://lynk.id/adithdigital/v626o7k60ler"
      }
    ]
  },

  voiceover: {
    id: "voiceover",
    name: "Voice Over Talent",
    persona: "Pemilik Suara Emas",
    icon: "🎙️",
    tagline: "Kamu percaya diri berbicara, memiliki intonasi artikulatif yang memikat, dan karakter vokal yang khas.",
    kategori: "Creative & Audio",
    tingkatKesulitan: "Menengah",
    keperluanEnglish: 4,
    deskripsi: "Mengisi suara untuk narasi video YouTube, iklan komersial, audiobook, podcast, dan modul e-learning.",
    skills: ["Voice Control", "Pronunciation", "Articulation", "Acting", "Storytelling", "Script Reading", "Audio Recording", "Emotion", "Consistency", "Communication"],
    tools: ["Audacity", "Adobe Audition", "CapCut", "Microphone", "Headphones"],
    why: [
      "Konten video edukasi, iklan brand, dan explainer video terus bertumbuh tanpa henti.",
      "Modal awal terjangkau: smartphone dengan mic eksternal terjangkau sudah cukup untuk rekaman pemula.",
      "Waktu pengerjaan relatif singkat: naskah 1-2 menit bisa selesai direkam dalam hitungan jam."
    ],
    roadmap: [
      { step: 1, title: "Olah Vokal & Artikulasi", desc: "Latihan pernapasan diafragma, senam lidah, dan kontrol tempo agar suara tidak terengah-engah." },
      { step: 2, title: "Rekam Demo Reel Suara", desc: "Rekam 3 jenis gaya: suara antusias (iklan), suara tenang (edukasi), dan suara ramah (narasi cerita)." },
      { step: 3, title: "Bikin Akun di Direktori VO", desc: "Unggah demo suara ke platform seperti Voices.com, Projects.co.id, atau Instagram audio showcase." },
      { step: 4, title: "Kolaborasi dengan Video Editor", desc: "Jalin koneksi dengan editor video dan animator yang sering membutuhkan pengisi suara naskah mereka." }
    ],
    products: [
      {
        title: "Panduan Side Job Voice Over Cuan",
        desc: "Teknik rekaman jernih di kamar tidur, cara olah vokal, dan strategi mendapatkan job voice over pertama.",
        price: "Rp 95.000",
        badge: "Peluang Baru",
        url: "https://lynk.id/adithdigital/n53m4qr5d1n5"
      }
    ]
  },

  jasaketik: {
    id: "jasaketik",
    name: "Jasa Ketik & Transkrip Dokumen",
    persona: "Si Jari Cepat Cuan",
    icon: "⌨️",
    tagline: "Kamu betah kerja konsisten, minim typo, dan cepat mengubah tulisan berantakan menjadi file digital rapi.",
    kategori: "Admin & Writing",
    tingkatKesulitan: "Pemula",
    keperluanEnglish: 1,
    deskripsi: "Mengetik ulang catatan kuliah, skripsi, modul, scan PDF buku, atau berkas cetak menjadi dokumen Word/PDF siap cetak.",
    skills: ["Typing", "Accuracy", "Formatting", "Proofreading", "Attention to Detail", "Document Management", "Grammar", "Time Management", "Organization", "Computer Skills"],
    tools: ["Microsoft Word", "Google Docs", "OCR Tools", "Canva"],
    why: [
      "Sangat cocok untuk mahasiswa, pelajar, atau ibu rumah tangga yang ingin mulai dari pekerjaan paling sederhana.",
      "Tidak butuh skill Bahasa Inggris maupun pengalaman coding teknis.",
      "Pasar mahasiswa dan dosen yang membutuhkan bantuan pengetikan tugas akhir selalu ada setiap semester."
    ],
    roadmap: [
      { step: 1, title: "Latih Ketik 10 Jari Cepat", desc: "Gunakan typing test gratis (10FastFingers) untuk melatih kecepatan 60+ kata per menit tanpa melihat keyboard." },
      { step: 2, title: "Kuasai Format Penulisan Standar", desc: "Pelajari pengaturan margin skripsi, daftar isi otomatis, header/footer, dan sitasi referensi di Ms Word." },
      { step: 3, title: "Sebar Brosur Digital", desc: "Pasang poster jasa ketik murah kilat di grup WhatsApp kampus, forum mahasiswa, atau kantin dekat kampus." },
      { step: 4, title: "Tawarkan Jasa Transkrip Wawancara", desc: "Tawarkan bantuan transkrip audio rekaman wawancara skripsi mahasiswa tingkat akhir." }
    ],
    products: [
      {
        title: "Panduan Side Job Jasa Ketik Auto Cuan",
        desc: "Kumpulan template format skripsi, trik OCR otomatis 1 detik, dan cara menetapkan tarif per halaman.",
        price: "Rp 59.000",
        badge: "Termudah",
        url: "https://lynk.id/adithdigital/opg1112xqr61"
      }
    ]
  },

  microtask: {
    id: "microtask",
    name: "Micro Task & Data Contributor",
    persona: "Kolektor Receh Online",
    icon: "🧩",
    tagline: "Kamu suka mengisi waktu luang dengan pekerjaan-pekerjaan singkat yang fleksibel tanpa tekanan deadline berat.",
    kategori: "Online Task",
    tingkatKesulitan: "Pemula",
    keperluanEnglish: 3,
    deskripsi: "Menyelesaikan tugas mikro online seperti data labeling untuk AI, verifikasi gambar, testing fitur web, dan survei validasi.",
    skills: ["Attention to Detail", "Accuracy", "Data Entry", "Research", "Typing", "Categorization", "Following Instructions", "Time Management", "Computer Skills", "Consistency"],
    tools: ["Browser", "Google Sheets", "Excel", "Platform Microtask", "AI Tools"],
    why: [
      "Bisa dikerjakan kapan saja di sela waktu santai, tidak ada komitmen jam kerja mengikat.",
      "Cocok sebagai gerbang awal mencicipi penghasilan internet dan dollar PayPal.",
      "Cukup dengan HP atau laptop yang terhubung ke internet."
    ],
    roadmap: [
      { step: 1, title: "Siapkan Akun Pembayaran", desc: "Bikin akun PayPal terverifikasi atau e-wallet untuk menampung reward tugas internasional." },
      { step: 2, title: "Daftar di Platform Tepercaya", desc: "Registrasi di Remotasks, Clickworker, Toloka, atau Appen yang resmi dan terbukti membayar." },
      { step: 3, title: "Lolos Kualifikasi Awal", desc: "Baca instruksi training dengan seksama dan kerjakan tes latihan agar mendapatkan rating akurasi tinggi." },
      { step: 4, title: "Konsistensi Harian", desc: "Luangkan 1 jam setiap pagi atau malam untuk menyelesaikan antrean tugas yang masuk." }
    ],
    products: [
      {
        title: "Panduan Side Job Micro Task Tepercaya",
        desc: "Daftar 10 platform micro task yang terbukti cair ke rekening lokal dan tips lolos tes kualifikasi.",
        price: "Rp 69.000",
        badge: "Tanpa Modal",
        url: "https://lynk.id/adithdigital/oq1k7lq963kx"
      }
    ]
  },

  reviewbuku: {
    id: "reviewbuku",
    name: "Book Reviewer & Content Creator",
    persona: "Kutu Buku Berbayar",
    icon: "📚",
    tagline: "Kamu gemar membaca, mampu mencerna intisari buku dengan baik, dan senang membagikan pandangan kritis.",
    kategori: "Writing & Content",
    tingkatKesulitan: "Pemula–Menengah",
    keperluanEnglish: 3,
    deskripsi: "Membaca dan merangkum buku non-fiksi atau fiksi untuk media sosial (BookTok/Bookstagram), blog, dan penerbit buku.",
    skills: ["Reading", "Writing", "Critical Thinking", "Storytelling", "Analysis", "Summarization", "Communication", "Creativity", "Proofreading", "Content Creation"],
    tools: ["Goodreads", "Google Docs", "Canva", "Instagram", "TikTok", "Notion"],
    why: [
      "Hobimu yang bermanfaat bisa dikonversi menjadi penghasilan nyata.",
      "Peluang mendapatkan buku gratis dari penerbit (endorsement) plus bayaran review konten.",
      "Pasar pembaca yang haus rangkuman buku produktivitas sangat besar di media sosial."
    ],
    roadmap: [
      { step: 1, title: "Buat Akun BookTok / Bookstagram", desc: "Fokus bagikan rangkuman 3 poin penting dari buku yang telah kamu baca dengan format carousel atau video pendek." },
      { step: 2, title: "Konsisten Posting 30 Hari", desc: "Bangun audiens pembaca setia yang menyukai rekomendasi dan gaya bicaramu yang lugas." },
      { step: 3, title: "Hubungi Penerbit & Penulis Indie", desc: "Tawarkan slot ulasan berbayar atau barter buku cetak gratis untuk direview di akunmu." },
      { step: 4, title: "Monetisasi via Afiliasi & Jasa Ringkasan", desc: "Cantumkan link beli buku original (TikTok Shop/Shopee Affiliate) untuk passive income di setiap postingan." }
    ],
    products: [
      {
        title: "Panduan Side Job Review Buku Cuan",
        desc: "Cara rahasia mendapatkan suplai buku gratis dari penerbit ternama dan platform yang membayar ulasan buku.",
        price: "Rp 79.000",
        badge: "Hobi Cuan",
        url: "https://lynk.id/adithdigital/0yjgrk8np80y"
      }
    ]
  },

  translator: {
    id: "translator",
    name: "Document & Content Translator",
    persona: "Jembatan Bahasa Multilingual",
    icon: "🌐",
    tagline: "Kamu fasih memahami nuansa dua bahasa, cermat dalam ejaan, dan mampu mempertahankan konteks pesan.",
    kategori: "Language",
    tingkatKesulitan: "Menengah",
    keperluanEnglish: 5,
    deskripsi: "Menerjemahkan dokumen bisnis, artikel website, subtitle film/video, dan naskah dari Bahasa Inggris ke Indonesia atau sebaliknya.",
    skills: ["Language Proficiency", "Grammar", "Vocabulary", "Writing", "Proofreading", "Cultural Awareness", "Research", "Accuracy", "Terminology", "Attention to Detail"],
    tools: ["Google Docs", "DeepL", "Grammarly", "CAT Tools"],
    why: [
      "Permintaan penerjemahan dokumen resmi, jurnal akademik, dan konten video luar negeri selalu tinggi.",
      "Bisa bekerja sama dengan klien asing bergaji dolar via platform Upwork atau ProZ.",
      "Alat bantu AI modern mempercepat proses draf terjemahan awal sehingga kamu tinggal memoles nuansa alaminya."
    ],
    roadmap: [
      { step: 1, title: "Tentukan Spesialisasi Terjemahan", desc: "Pilih bidang: Terjemahan Akademik (Jurnal), Terjemahan Konten Medsos/Subtitle, atau Terjemahan Bisnis/Website." },
      { step: 2, title: "Buat Dokumen Sampel Dwi-bahasa", desc: "Siapkan 3 contoh perbandingan teks asli dan terjemahanmu dengan catatan pemilihan diksi yang tepat." },
      { step: 3, title: "Daftar di Platform Jasa Bahasa", desc: "Buat akun di ProZ, TranslatorsCafe, Upwork, atau tawarkan ke biro penerjemah lokal." },
      { step: 4, title: "Terapkan Tarif per Kata", desc: "Gunakan standar tarif per kata (Rp 150 - Rp 300/kata untuk lokal, atau $0.04 - $0.08/kata untuk klien luar)." }
    ],
    products: [
      {
        title: "Panduan Lengkap Menembus Klien Luar Negeri Upwork",
        desc: "Rahasia lolos profil Upwork, nulis proposal killer dalam bahasa Inggris, dan closing kontrak dollar.",
        price: "Rp 149.000",
        badge: "Gaji Dolar",
        url: "https://lynk.id/adithdigital/vekz39e38zje"
      }
    ]
  },

  transcription: {
    id: "transcription",
    name: "Audio & Video Transcriptionist",
    persona: "Penyimak Tajam",
    icon: "🎧",
    tagline: "Kamu pendengar yang sabar, cermat menangkap pembicaraan cepat, dan teliti mentransformasikan suara menjadi teks.",
    kategori: "Data & Language",
    tingkatKesulitan: "Pemula–Menengah",
    keperluanEnglish: 4,
    deskripsi: "Mendengarkan rekaman podcast, wawancara, sidang, atau video meeting, lalu mengetiknya menjadi transkrip teks berformat.",
    skills: ["Listening", "Typing", "Accuracy", "Grammar", "Concentration", "Time Management", "Proofreading", "Comprehension", "Research", "Attention to Detail"],
    tools: ["Google Docs", "Microsoft Word", "Otter.ai", "Descript", "Whisper", "Headphones"],
    why: [
      "Sangat cocok jika kamu suka bekerja dengan fokus menyendiri sambil mendengarkan audio berkualitas.",
      "Tools AI voice-to-text saat ini bisa menghasilkan transkrip draf dalam sekejap, tugasmu tinggal mengoreksi ketepatan kata.",
      "Banyak dicari oleh peneliti, podcaster, tim riset hukum, dan content creator."
    ],
    roadmap: [
      { step: 1, title: "Lengkapi Headphone yang Nyaman", desc: "Gunakan headphone over-ear yang memblokir kebisingan luar agar vokal terdengar jernih." },
      { step: 2, title: "Kuasai Tanda Baca & Timestamping", desc: "Pelajari standar penulisan transkrip bersih (clean verbatim) dan aturan penambahan cap waktu [00:01:23]." },
      { step: 3, title: "Daftar di Rev / GoTranscript / TranscribeMe", desc: "Ikuti ujian masuk platform transkrip internasional untuk membuka keran penghasilan mingguan." },
      { step: 4, title: "Kolaborasi dengan Lembaga Riset", desc: "Tawarkan jasa transkrip wawancara skripsi atau penelitian survei kampus lokal." }
    ],
    products: [
      {
        title: "Starter Kit Transkrip Cepat Bantuan AI",
        desc: "Kombinasi tools AI transcribe instan dan cara lolos tes audio platform transkrip luar negeri.",
        price: "Rp 85.000",
        badge: "Mudah",
        url: "https://lynk.id/adithdigital/v98w8o6g96g6"
      }
    ]
  },

  apptester: {
    id: "apptester",
    name: "QA & Mobile App Tester",
    persona: "Detektif Bug Aplikasi",
    icon: "📱",
    tagline: "Kamu punya rasa ingin tahu tinggi, kritis terhadap detail, dan jeli menemukan kesalahan fungsi aplikasi.",
    kategori: "Technology",
    tingkatKesulitan: "Menengah",
    keperluanEnglish: 3,
    deskripsi: "Menguji aplikasi Android dan iOS baru, mencoba alur pembayaran/fitur, mencatat bug, dan melaporkannya ke tim developer.",
    skills: ["Testing", "Attention to Detail", "Bug Reporting", "Critical Thinking", "Usability Testing", "Documentation", "Problem Solving", "Communication", "Mobile Knowledge", "Analytical Thinking"],
    tools: ["Android/iOS", "BrowserStack", "Jira", "Trello", "Google Sheets", "Test IO"],
    why: [
      "Tidak perlu latar belakang coding, yang terpenting adalah kemampuan mencoba fitur dan menulis laporan terstruktur.",
      "Bayaran per bug yang ditemukan (bisa berkisar antara $5 hingga $50 per temuan bug penting).",
      "Kamu berkesempatan mencoba fitur-fitur aplikasi keren sebelum diluncurkan ke publik."
    ],
    roadmap: [
      { step: 1, title: "Pahami Anatomi Bug Report", desc: "Kuasai format laporan: Judul, Langkah Mengulang (Steps to Reproduce), Hasil yang Didapat vs Hasil yang Diharapkan." },
      { step: 2, title: "Daftar di Platform Crowdtesting", desc: "Buat profil di Test IO, uTest, atau Tester Work dan daftarkan tipe smartphone milikmu." },
      { step: 3, title: "Ikuti Tes Kualifikasi uTest Academy", desc: "Selesaikan modul latihan gratis untuk mendapatkan badge tester terpercaya." },
      { step: 4, title: "Terima Undangan Siklus Pengujian", desc: "Aktif mengecek email undangan tes dan submit laporan bug tercepat saat siklus dimulai." }
    ],
    products: [
      {
        title: "Panduan Side Job Tester Aplikasi & Website",
        desc: "Langkah lolos ujian uTest, template bug reporting profesional, dan trik berburu bug bernilai tinggi.",
        price: "Rp 99.000",
        badge: "Teknologi",
        url: "https://lynk.id/adithdigital/v626o7k60ler"
      }
    ]
  },

  digitalproduct: {
    id: "digitalproduct",
    name: "Digital Product Creator",
    persona: "Kreator Cuan Digital",
    icon: "💡",
    tagline: "Kamu kreatif, suka membuat sesuatu dari nol, dan ingin karya yang kamu buat sekali bisa menghasilkan cuan berulang kali.",
    kategori: "Creative & Business",
    tingkatKesulitan: "Menengah",
    keperluanEnglish: 2,
    deskripsi: "Membuat dan menjual template Notion, preset Canva, ebook panduan, checklist kerja, atau aset digital lainnya secara otomatis.",
    skills: ["Product Creation", "Canva", "Notion", "Copywriting", "Landing Page", "Packaging", "Pricing", "Marketing", "Customer Journey", "Automation"],
    tools: ["Canva", "Notion", "Lynk.id", "Google Drive", "CapCut", "Instagram"],
    why: [
      "Puncak passive income: bangun produk satu kali, bisa dijual ke ratusan bahkan ribuan pembeli tanpa stok fisik.",
      "Pengiriman file serba otomatis melalui platform seperti Lynk.id.",
      "Margin keuntungan mendekati 95% karena tidak memerlukan biaya sewa toko atau cetak fisik."
    ],
    roadmap: [
      { step: 1, title: "Riset Masalah Nyata", desc: "Cari tahu apa yang paling sering ditanyakan atau dikeluhkan orang di media sosial seputar skill kamu." },
      { step: 2, title: "Kemas Menjadi Template / Ebook", desc: "Buat produk sederhana 15-30 halaman atau template Canva siap pakai yang langsung menyelesaikan masalah tersebut." },
      { step: 3, title: "Buka Toko di Lynk.id", desc: "Pasang foto mockup produk yang estetik, pasang copywriting deskripsi yang memikat, dan integrasikan pembayaran QRIS." },
      { step: 4, title: "Promosikan via Konten Edukasi", desc: "Bikin konten tips di Reels/TikTok yang mengarah ke link bio toko digitalmu." }
    ],
    products: [
      {
        title: "Panduan Side Job dari Produk Digital Auto Cuan",
        desc: "Cara bikin dan jual produk digital pertama kamu, strategi traffic konten, dan auto gajian tiap bulan.",
        price: "Rp 129.000",
        badge: "Rekomendasi Utama",
        url: "https://lynk.id/adithdigital/m3w7kz86d4q9"
      }
    ]
  }
};

export const JOB_CATEGORIES = [
  'Data & Admin',
  'Virtual Assistant',
  'Video & Audio',
  'Writing & Sosmed',
  'Desain & Kreatif',
  'Customer Support',
  'Tech & Web',
  'Pendidikan & Bimbingan',
  'Marketing & Sales',
] as const;

export type JobCategory = (typeof JOB_CATEGORIES)[number];

export const SIDE_JOB_TO_CATEGORY: Record<string, string> = {
  dataentry: 'Data & Admin',
  va: 'Virtual Assistant',
  videoeditor: 'Video & Audio',
  socialmedia: 'Writing & Sosmed',
  writer: 'Writing & Sosmed',
  cs: 'Customer Support',
  canvadesigner: 'Desain & Kreatif',
  webdev: 'Tech & Web',
  transcription: 'Data & Admin',
  tutor: 'Pendidikan & Bimbingan',
  seo: 'Writing & Sosmed',
  affiliate: 'Marketing & Sales',
  translator: 'Pendidikan & Bimbingan',
  voiceover: 'Video & Audio',
  podcaster: 'Video & Audio',
};

export function getJobCategory(job: { primarySideJob?: string; tags?: string[] }): string {
  if (job.primarySideJob && (JOB_CATEGORIES as readonly string[]).includes(job.primarySideJob)) {
    return job.primarySideJob;
  }
  if (job.primarySideJob && SIDE_JOB_TO_CATEGORY[job.primarySideJob]) {
    return SIDE_JOB_TO_CATEGORY[job.primarySideJob];
  }
  if (job.tags && Array.isArray(job.tags)) {
    for (const cat of JOB_CATEGORIES) {
      if (job.tags.some((t) => t.toLowerCase() === cat.toLowerCase())) {
        return cat;
      }
    }
  }
  return 'Lainnya';
}

/**
 * 10+ CURATED REMOTE JOB VACANCIES (LOWONGAN KERJA REMOTE)
 * Siap ditampilkan dan diprioritaskan otomatis sesuai profil user!
 */
export const REMOTE_JOBS_DB: RemoteJobItem[] = [
  {
    id: "job-1",
    title: "Remote Data Entry & Spreadsheet Specialist",
    company: "PT Global Artha Solusindo",
    location: "WFH / Remote Indonesia",
    salary: "Rp 4.500.000 - Rp 6.200.000 / bln",
    type: "Full-time Remote",
    posted: "Hari ini",
    primarySideJob: "dataentry",
    tags: ["Data Entry", "Excel", "Google Sheets", "Admin"],
    description: "Membantu verifikasi dan input data laporan merchant bulanan ke database spreadsheet. Fleksibel, butuh ketelitian tinggi dan kemampuan formula dasar Excel.",
    applyUrl: "https://wa.me/628123456789?text=Halo%20saya%20tertarik%20melamar%20posisi%20Data%20Entry%20Remote"
  },
  {
    id: "job-2",
    title: "Executive Virtual Assistant (E-Commerce Brand)",
    company: "Nexus Creative Studio SG",
    location: "Remote (Klien Singapore)",
    salary: "$450 - $750 / bln (~Rp 7.000.000 - Rp 11.500.000)",
    type: "Part-time Remote",
    posted: "Kemarin",
    primarySideJob: "va",
    tags: ["Virtual Assistant", "Google Workspace", "Notion", "English"],
    description: "Mendampingi founder dalam mengelola jadwal meeting, koordinasi email klien, riset tren produk, dan administrasi ringan. Waktu kerja 4 jam per hari.",
    applyUrl: "https://wa.me/628123456789?text=Halo%20saya%20tertarik%20melamar%20posisi%20Virtual%20Assistant%20Remote"
  },
  {
    id: "job-3",
    title: "Short-Form Video Editor (TikTok & Reels)",
    company: "CreativeFlow Digital Agency",
    location: "Remote Fleksibel",
    salary: "Rp 150.000 - Rp 350.000 / video",
    type: "Freelance Project",
    posted: "2 hari lalu",
    primarySideJob: "videoeditor",
    tags: ["Video Editor", "CapCut", "Reels", "Premiere"],
    description: "Dibutuhkan video editor kreatif untuk mengolah rekaman podcast dan edukasi bisnis menjadi 20-30 video pendek viral setiap bulan dengan sound effects dan subtitle dinamis.",
    applyUrl: "https://wa.me/628123456789?text=Halo%20saya%20tertarik%20melamar%20posisi%20Video%20Editor%20Remote"
  },
  {
    id: "job-4",
    title: "Remote Social Media Specialist & Content Planner",
    company: "BrandNest Creative Labs",
    location: "WFH / Jabodetabek & Luar Kota",
    salary: "Rp 3.500.000 - Rp 5.000.000 / bln",
    type: "Part-time Remote",
    posted: "1 hari lalu",
    primarySideJob: "socialmedia",
    tags: ["Social Media", "Canva", "Copywriting", "Instagram"],
    description: "Menyusun content calendar bulanan, membuat brief desain grafis di Canva, dan menulis caption menarik untuk 2 brand consumer goods lokal.",
    applyUrl: "https://wa.me/628123456789?text=Halo%20saya%20tertarik%20melamar%20posisi%20Social%20Media%20Remote"
  },
  {
    id: "job-5",
    title: "Junior Copywriter & Ads Script Writer",
    company: "Lumina Growth Media",
    location: "Remote Se-Indonesia",
    salary: "Rp 3.500.000 - Rp 5.500.000 / bln",
    type: "Contract Remote",
    posted: "Hari ini",
    primarySideJob: "writer",
    tags: ["Copywriter", "Storytelling", "Ads", "Content Writing"],
    description: "Menulis naskah video iklan promosi TikTok, email broadcast, dan artikel ulasan produk edukasi. Fleksibel, bisa disesuaikan dengan jadwal perkuliahan.",
    applyUrl: "https://wa.me/628123456789?text=Halo%20saya%20tertarik%20melamar%20posisi%20Copywriter%20Remote"
  },
  {
    id: "job-6",
    title: "Online Customer Support & Live Chat Specialist",
    company: "FinTech Solusi Global",
    location: "Remote Shift (Pagi / Malam)",
    salary: "Rp 4.000.000 - Rp 5.800.000 / bln",
    type: "Full-time Remote",
    posted: "3 hari lalu",
    primarySideJob: "customersupport",
    tags: ["Customer Support", "Zendesk", "WhatsApp", "Live Chat"],
    description: "Melayani chat pertanyaan pengguna aplikasi, membantu aktivasi akun, dan mencatat feedback sistem. Diberikan training lengkap sebelum onboarding.",
    applyUrl: "https://wa.me/628123456789?text=Halo%20saya%20tertarik%20melamar%20posisi%20Customer%20Support%20Remote"
  },
  {
    id: "job-7",
    title: "Remote Admin Toko Online & Rekap Orderan",
    company: "BeautyCare Official Store",
    location: "WFH / Jam Fleksibel",
    salary: "Rp 2.800.000 - Rp 4.200.000 / bln",
    type: "Part-time Remote",
    posted: "Hari ini",
    primarySideJob: "admin",
    tags: ["Admin", "Data Entry", "Order Management", "WhatsApp"],
    description: "Merekap orderan marketplace harian, koordinasi nomor resi pengiriman, dan mengecek ketersediaan stok barang melalui spreadsheet bersama tim gudang.",
    applyUrl: "https://wa.me/628123456789?text=Halo%20saya%20tertarik%20melamar%20posisi%20Admin%20Online%20Remote"
  },
  {
    id: "job-8",
    title: "Graphic Designer for Social Media Feeds",
    company: "Studio Ruang Visual",
    location: "Remote Project",
    salary: "Rp 50.000 - Rp 120.000 / post",
    type: "Freelance Project",
    posted: "Kemarin",
    primarySideJob: "graphicdesigner",
    tags: ["Graphic Designer", "Canva", "Figma", "Branding"],
    description: "Membuat template feed carousel dan banner promosi mingguan untuk klien F&B dan fashion. Disediakan asset foto dan brand guidelines lengkap.",
    applyUrl: "https://wa.me/628123456789?text=Halo%20saya%20tertarik%20melamar%20posisi%20Graphic%20Designer%20Remote"
  },
  {
    id: "job-9",
    title: "Audio Transcriptionist & Subtitle Editor",
    company: "Transkrip Digital Nusantara",
    location: "Remote Fleksibel",
    salary: "Rp 25.000 - Rp 45.000 / audio menit",
    type: "Freelance",
    posted: "4 hari lalu",
    primarySideJob: "transcription",
    tags: ["Transcription", "Jasa Ketik", "Word", "Audio"],
    description: "Mendengarkan rekaman wawancara dan menyusun naskah transkrip rapi sesuai standar clean verbatim. Bebas ambil proyek sesuai kuota waktu luang.",
    applyUrl: "https://wa.me/628123456789?text=Halo%20saya%20tertarik%20melamar%20posisi%20Transkripsi%20Remote"
  },
  {
    id: "job-10",
    title: "Mobile App & Website QA Tester",
    company: "TestNest Asia Technologies",
    location: "Remote / On-demand",
    salary: "Rp 500.000 - Rp 1.500.000 / project test",
    type: "Freelance Testing",
    posted: "2 hari lalu",
    primarySideJob: "apptester",
    tags: ["App Tester", "Bug Reporting", "Android", "iOS"],
    description: "Mencoba fitur baru pada aplikasi belanja dan fintech sebelum rilis. Menuliskan laporan langkah demi langkah jika menemukan kendala error atau tampilan janggal.",
    applyUrl: "https://wa.me/628123456789?text=Halo%20saya%20tertarik%20melamar%20posisi%20App%20Tester%20Remote"
  },
  {
    id: "job-11",
    title: "Voice Over Talent untuk E-Learning & Iklan",
    company: "SuaraKreasi Audio Lab",
    location: "Home Studio / Remote",
    salary: "Rp 200.000 - Rp 600.000 / naskah",
    type: "Freelance VO",
    posted: "3 hari lalu",
    primarySideJob: "voiceover",
    tags: ["Voice Over", "Audio", "Recording", "Storytelling"],
    description: "Membacakan naskah edukasi perbankan dan konten iklan digital berdurasi 1-3 menit dengan artikulasi ramah, jelas, dan kualitas audio bebas noise.",
    applyUrl: "https://wa.me/628123456789?text=Halo%20saya%20tertarik%20melamar%20posisi%20Voice%20Over%20Remote"
  },
  {
    id: "job-12",
    title: "Book & Article Reviewer for Digital Publisher",
    company: "Pustaka Inspirasi Media",
    location: "Remote Fleksibel",
    salary: "Rp 100.000 - Rp 250.000 / review",
    type: "Freelance",
    posted: "5 hari lalu",
    primarySideJob: "reviewbuku",
    tags: ["Review Buku", "Writing", "Summarization", "Reading"],
    description: "Membaca kiriman buku bisnis dan pengembangan diri, kemudian menyusun sinopsis ulasan 500 kata yang menarik untuk diterbitkan di web portal dan media sosial.",
    applyUrl: "https://wa.me/628123456789?text=Halo%20saya%20tertarik%20melamar%20posisi%20Review%20Buku%20Remote"
  }
];

/**
 * MASTER LIST SKILLS & TOOLS UNTUK INTERAKTIF SELECTOR
 */
export const MASTER_SKILLS_LIST: MasterSkill[] = [
  { name: "Typing & Ketik Cepat", sideJobs: ["dataentry", "jasaketik", "transcription", "microtask"] },
  { name: "Spreadsheet & Formula Excel", sideJobs: ["dataentry", "admin", "va"] },
  { name: "Copywriting & Nulis Iklan", sideJobs: ["writer", "socialmedia", "digitalproduct"] },
  { name: "Short-Form Video Editing", sideJobs: ["videoeditor", "socialmedia"] },
  { name: "Desain Grafis & Layout", sideJobs: ["graphicdesigner", "socialmedia", "digitalproduct"] },
  { name: "Administrasi & File Organization", sideJobs: ["admin", "va", "dataentry"] },
  { name: "Social Media Planning & Caption", sideJobs: ["socialmedia", "writer"] },
  { name: "Customer Service & Chat", sideJobs: ["customersupport", "va", "admin"] },
  { name: "Penerjemahan Bahasa (Translator)", sideJobs: ["translator", "writer"] },
  { name: "Olah Vokal & Voice Over", sideJobs: ["voiceover"] },
  { name: "Membaca & Review Buku", sideJobs: ["reviewbuku", "writer"] },
  { name: "Testing Bug Aplikasi & Web", sideJobs: ["apptester"] },
  { name: "Riset Informasi & Data Validation", sideJobs: ["va", "dataentry", "microtask"] },
  { name: "Pembuatan Produk Digital & Ebook", sideJobs: ["digitalproduct", "graphicdesigner"] }
];

export const MASTER_TOOLS_LIST: MasterTool[] = [
  { name: "Microsoft Excel / Sheets", sideJobs: ["dataentry", "admin", "va"] },
  { name: "Canva", sideJobs: ["graphicdesigner", "socialmedia", "digitalproduct"] },
  { name: "CapCut", sideJobs: ["videoeditor", "socialmedia"] },
  { name: "Google Workspace / Docs", sideJobs: ["va", "admin", "writer", "jasaketik"] },
  { name: "Notion", sideJobs: ["va", "admin", "digitalproduct"] },
  { name: "Slack / Trello", sideJobs: ["va", "admin", "customersupport"] },
  { name: "ChatGPT & AI Prompts", sideJobs: ["writer", "socialmedia", "translator", "digitalproduct"] },
  { name: "Adobe Premiere Pro", sideJobs: ["videoeditor"] },
  { name: "Figma", sideJobs: ["graphicdesigner"] },
  { name: "Audacity / Mic Audio", sideJobs: ["voiceover", "transcription"] },
  { name: "DeepL & Grammarly", sideJobs: ["translator", "writer"] },
  { name: "Zendesk / WhatsApp Business", sideJobs: ["customersupport", "admin"] }
];

/**
 * PERTANYAAN CARA KERJA (WORK STYLE)
 */
export const WORK_STYLES: WorkStyle[] = [
  {
    id: "style_data",
    label: "Detail, Terstruktur & Angka",
    desc: "Suka pekerjaan yang rapi, berpatokan pada SOP pasti, dan fokus mandiri.",
    sideJobs: ["dataentry", "admin", "jasaketik", "transcription"]
  },
  {
    id: "style_creative",
    label: "Kreatif, Visual & Mengikuti Tren",
    desc: "Menyukai visualisasi ide, kreasi video/gambar, dan hal-hal baru yang viral.",
    sideJobs: ["videoeditor", "graphicdesigner", "digitalproduct", "socialmedia"]
  },
  {
    id: "style_people",
    label: "Komunikasi, Hubungan & Membantu Orang",
    desc: "Senang berinteraksi, memecahkan masalah klien, dan koordinasi tim.",
    sideJobs: ["va", "customersupport", "socialmedia"]
  },
  {
    id: "style_words",
    label: "Menulis, Bercerita & Beropini",
    desc: "Nyaman merangkai kata persuasif, menyusun artikel, atau mendalami buku.",
    sideJobs: ["writer", "reviewbuku", "translator"]
  },
  {
    id: "style_flex",
    label: "Fleksibel, Tugas Ringkas & Santai",
    desc: "Bisa dikerjakan kapan saja di sela waktu luang tanpa komitmen berat.",
    sideJobs: ["microtask", "jasaketik", "apptester"]
  }
];

/**
 * PERTANYAAN KESIAPAN KERJA (READINESS DIAGNOSTIC)
 * Kunci untuk menghitung Skor Kesiapan (%) dan membeberkan Gaps secara akurat!
 */
export const READINESS_QUESTIONS: ReadinessQuestion[] = [
  {
    id: "readiness_portfolio",
    title: "Apakah kamu sudah memiliki portofolio / contoh hasil kerja nyata?",
    options: [
      { label: "Sudah lengkap dan tersusun rapi di link/folder khusus", score: 25, gap: null },
      { label: "Baru punya 1-2 contoh tugas sederhana, belum profesional", score: 12, gap: "Portofolio karya belum tersusun profesional dan rapi" },
      { label: "Belum punya portofolio sama sekali dari nol", score: 0, gap: "Belum memiliki portofolio atau contoh bukti karya nyata untuk ditunjukkan ke klien" }
    ]
  },
  {
    id: "readiness_apply_place",
    title: "Seberapa paham kamu mengenai tempat mencari dan cara apply side job ini?",
    options: [
      { label: "Sudah tahu platform terpercaya dan alur lamarnya dengan jelas", score: 25, gap: null },
      { label: "Tahu beberapa nama websitenya, tapi belum pernah buat akun atau coba", score: 10, gap: "Belum pernah mendaftar akun atau mencoba alur apply di platform freelance resmi" },
      { label: "Masih bingung harus mencari dan melamar ke mana", score: 0, gap: "Belum mengetahui daftar platform terbaik dan tempat berkumpulnya klien pencari jasa" }
    ]
  },
  {
    id: "readiness_proposal",
    title: "Pernahkah kamu membuat surat penawaran (proposal / pitch) langsung ke calon klien?",
    options: [
      { label: "Sudah sering dan tahu cara menulis pitch yang cepat disetujui", score: 20, gap: null },
      { label: "Pernah coba 1-2 kali tapi masih ragu dan belum ada respons", score: 8, gap: "Formula proposal penawaran masih belum persuasif dan belum teruji tembus klien" },
      { label: "Belum pernah sama sekali menulis proposal penawaran", score: 0, gap: "Belum pernah membuat surat penawaran atau pitch proposal penarik minat klien" }
    ]
  },
  {
    id: "readiness_rate_pricing",
    title: "Apakah kamu sudah tahu standar patokan harga jasa (rate card) dan cara negosiasi?",
    options: [
      { label: "Sudah punya patokan harga pasar dan percaya diri bernegosiasi", score: 15, gap: null },
      { label: "Tahu perkiraan kasarnya saja, tapi takut mematok harga kemahalan/kemurahanan", score: 7, gap: "Masih ragu menentukan standar tarif (rate card) yang adil dan menguntungkan" },
      { label: "Sama sekali belum tahu pasaran harga jasa ini", score: 0, gap: "Belum memahami standar rate pasar dan teknik negosiasi harga dengan klien" }
    ]
  },
  {
    id: "readiness_time_commit",
    title: "Berapa alokasi waktu luang yang bisa kamu sediakan secara rutin per hari?",
    options: [
      { label: "3 jam atau lebih per hari (Sangat Siap & Fleksibel)", score: 15, gap: null },
      { label: "1 sampai 2 jam per hari di sela rutinitas", score: 12, gap: null },
      { label: "Kurang dari 1 jam per hari, jadwal masih sangat padat", score: 4, gap: "Alokasi waktu luang harian masih terbatas sehingga perlu manajemen waktu ekstra" }
    ]
  }
];

/**
 * INFORMASI KOMUNITAS & USP SERVICE (Chat 2)
 */
export const COMMUNITY_USP: CommunityUSP = {
  consultation: {
    title: "Free Konsultasi 1-on-1 via WhatsApp",
    badge: "USP Unggulan",
    value: "Senilai Rp 250.000 - Gratis",
    desc: "Dapatkan sesi konsultasi langsung dengan Mas Adit & tim praktisi. Review portofolio kamu, bedah kendala nulis proposal klien, hingga panduan closing orderan pertama.",
    perks: [
      "Review portofolio draf kamu secara privat",
      "Koreksi naskah pitch proposal sebelum dikirim ke klien",
      "Rekomendasi platform yang paling cepat menghasilkan sesuai profilmu"
    ]
  },
  community: {
    title: "Komunitas Eksklusif Side Job WFA",
    badge: "Akses Gratis",
    desc: "Bergabung bersama ribuan alumni dan pegiat remote job se-Indonesia. Tempat berbagi info loker 'hidden job market', studi kasus cuan, dan networking kolaborasi.",
    link: "https://chat.whatsapp.com/sample-community-link",
    memberCount: "2.400+ Member Aktif"
  },
  monthlyMeetup: {
    title: "Monthly Live Mentoring Meetup",
    badge: "Agenda Rutin",
    desc: "Sesi Google Meet interaktif setiap bulan bersama Mas Adit & mengundang speaker praktisi tamu yang berbeda tiap bulannya!",
    nextSchedule: "Setiap Sabtu Terakhir Tiap Bulan • 19.30 WIB",
    upcomingTopic: "Trik Tembus Klien Pertama dalam 14 Hari Tanpa Pengalaman",
    speaker: "Mas Adit (Founder Cari Side Job) & Guest Mentor Praktisi"
  }
};
