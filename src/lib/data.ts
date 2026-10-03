// ============================================================================
// CARI SIDE JOB - MASTER DATA & DATABASE DEFINITIONS
// Sumber Data: 'All Data.html' (20 Side Job) & '160 SKill.html' (10 Skill per Job)
// Terintegrasi Dinamis dengan Supabase / Prisma & Lynk.id Checkout
// ============================================================================

export interface ProductItem {
  id?: string;
  title: string;
  desc?: string;
  price?: string;
  badge?: string;
  url: string;
  category?: string; // Ebook, Template, Kursus, Starter Pack
  type?: string;     // digital, va, template, etc.
  imageUrl?: string;
  sideJob?: string;  // Target persona atau kategori side job
  isPublished?: boolean;
  order?: number;
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
  keperluanEnglish: number; // 1-5
  deskripsi: string;
  skills: string[];         // 10 Skill wajib dari All Data.html
  skillWeights: Record<string, number>; // Bobot 1-5 tiap skill
  tools: string[];          // Tools dari spreadsheet
  linkPanduan: string;      // URL Lynk.id resmi
  potentialProducts: string[];
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

export interface SkillCategoryGroup {
  id: string;
  name: string;
  icon: string;
  skills: string[];
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
 * 20 MASTER DATABASE SIDE JOBS (All Data.html)
 */
export const SIDE_JOBS_DB: Record<string, SideJob> = {
  va: {
    id: "va",
    name: "Virtual Assistant",
    persona: "Andalan Semua Orang",
    icon: "\ud83e\uddd1\u200d\ud83d\udcbb",
    tagline: "Kamu sosok yang terorganisir, komunikatif, dan lihai meringankan beban operasional orang lain secara remote.",
    kategori: "Admin & Support",
    tingkatKesulitan: "Menengah",
    keperluanEnglish: 4,
    deskripsi: "Membantu pekerjaan administratif, riset, komunikasi, dan operasional bisnis secara remote.",
    skills: ["Administrasi", "komunikasi", "manajemen waktu", "riset", "data entry", "customer service", "organisasi", "problem solving", "Google Workspace", "attention to detail"],
    skillWeights: {"Administrasi": 5, "komunikasi": 5, "manajemen waktu": 5, "riset": 4, "data entry": 4, "customer service": 4, "organisasi": 5, "problem solving": 4, "Google Workspace": 5, "attention to detail": 5},
    tools: ["Google Workspace", "Microsoft Office", "Notion", "Slack", "Trello", "Zoom"],
    linkPanduan: "https://lynk.id/adithdigital/rwx8jwnp9gev",
    potentialProducts: ["Template VA", "eBook VA", "Template Notion", "Spreadsheet Template", "Kursus VA"],
    why: ["Karakter dan gayamu sangat selaras dengan ritme kerja Virtual Assistant.", "Skill esensial seperti Administrasi, komunikasi, manajemen waktu sangat dicari di industri saat ini.", "Peluang kerja remote dan fleksibilitas jam kerja terbuka luas untuk bidang ini."],
    roadmap: [{"step": 1, "title": "Pilih Niche VA", "desc": "Tentukan spesialisasi: General Admin VA, Social Media VA, atau Customer Support VA."}, {"step": 2, "title": "Susun Notion Portofolio", "desc": "Buat rangkuman skill tools dan contoh pengorganisasian tugas di halaman Notion publik."}, {"step": 3, "title": "Kuasai Tools Kolaborasi", "desc": "Latih penggunaan Google Calendar, Slack, Trello, dan komunikasi asinkron via Loom."}, {"step": 4, "title": "Lamar Klien Pertama", "desc": "Apply di platform freelance atau tawarkan bantuan administratif ke pebisnis online."}],
    products: [{"title": "Panduan Lengkap Side Job Virtual Assistant", "desc": "Langkah demi langkah memulai Virtual Assistant dari nol, trik closing klien, dan template kerja siap pakai.", "price": "Rp 79.000", "badge": "Panduan Resmi", "url": "https://lynk.id/adithdigital/rwx8jwnp9gev", "category": "Ebook", "sideJob": "Virtual Assistant", "isPublished": true}]
  },
  videoeditor: {
    id: "videoeditor",
    name: "Video Editor",
    persona: "Arsitek Visual Viral",
    icon: "\ud83c\udfac",
    tagline: "Kamu punya mata visual tajam, paham ritme musik, dan tahu cara menahan perhatian penonton dari detik pertama.",
    kategori: "Creative",
    tingkatKesulitan: "Menengah",
    keperluanEnglish: 2,
    deskripsi: "Mengedit video untuk kebutuhan media sosial, YouTube, iklan, brand, dan personal creator.",
    skills: ["Video editing", "storytelling", "cutting", "color grading", "audio editing", "motion graphics", "visual composition", "creativity", "content awareness", "attention to detail"],
    skillWeights: {"Video editing": 5, "storytelling": 5, "cutting": 5, "color grading": 4, "audio editing": 4, "motion graphics": 3, "visual composition": 4, "creativity": 5, "content awareness": 4, "attention to detail": 5},
    tools: ["CapCut", "Adobe Premiere Pro", "DaVinci Resolve", "After Effects", "Canva"],
    linkPanduan: "https://lynk.id/adithdigital",
    potentialProducts: ["Template CapCut", "Preset Editing", "LUT", "eBook Editing", "Template Storyboard"],
    why: ["Karakter dan gayamu sangat selaras dengan ritme kerja Video Editor.", "Skill esensial seperti Video editing, storytelling, cutting sangat dicari di industri saat ini.", "Peluang kerja remote dan fleksibilitas jam kerja terbuka luas untuk bidang ini."],
    roadmap: [{"step": 1, "title": "Kuasai Pacing & Hook", "desc": "Pelajari teknik transisi cepat, sound effect (SFX), dan subtitle dinamis di CapCut atau Premiere."}, {"step": 2, "title": "Rakit Showreel 60 Detik", "desc": "Edit 3 video vertikal contoh dari rekaman podcast publik sebagai bukti skill visualmu."}, {"step": 3, "title": "Dekati Content Creator", "desc": "Kirim DM/email penawaran uji coba 1 video gratis kepada creator yang postingannya belum konsisten."}, {"step": 4, "title": "Tawarkan Paket Retainer", "desc": "Kunci kontrak paket 15-20 video per bulan untuk pendapatan sampingan rutin."}],
    products: [{"title": "Panduan Lengkap Side Job Video Editor", "desc": "Langkah demi langkah memulai Video Editor dari nol, trik closing klien, dan template kerja siap pakai.", "price": "Rp 79.000", "badge": "Panduan Resmi", "url": "https://lynk.id/adithdigital", "category": "Ebook", "sideJob": "Video Editor", "isPublished": true}]
  },
  socialmedia: {
    id: "socialmedia",
    name: "Social Media Management",
    persona: "Pengendali Tren Medsos",
    icon: "\ud83d\udcf1",
    tagline: "Kamu peka terhadap hal-hal yang sedang viral, kreatif mengemas pesan, dan paham psikologi audiens.",
    kategori: "Digital Marketing",
    tingkatKesulitan: "Menengah",
    keperluanEnglish: 3,
    deskripsi: "Mengelola akun media sosial mulai dari konten, scheduling, engagement hingga reporting.",
    skills: ["Content planning", "copywriting", "social media strategy", "analytics", "communication", "research", "creativity", "trend research", "scheduling", "community management"],
    skillWeights: {"Content planning": 5, "copywriting": 4, "social media strategy": 5, "analytics": 4, "communication": 5, "research": 4, "creativity": 5, "trend research": 5, "scheduling": 4, "community management": 5},
    tools: ["Meta Business Suite", "Canva", "CapCut", "TikTok", "Instagram", "Notion", "Buffer"],
    linkPanduan: "https://lynk.id/adithdigital/5q01jnzdd7yg",
    potentialProducts: ["Content Calendar", "Caption Template", "Social Media Planner", "eBook Social Media"],
    why: ["Karakter dan gayamu sangat selaras dengan ritme kerja Social Media Management.", "Skill esensial seperti Content planning, copywriting, social media strategy sangat dicari di industri saat ini.", "Peluang kerja remote dan fleksibilitas jam kerja terbuka luas untuk bidang ini."],
    roadmap: [{"step": 1, "title": "Pelajari Content Pillar", "desc": "Bagi proporsi konten: edukasi (40%), inspirasi (30%), interaksi (20%), dan jualan (10%)."}, {"step": 2, "title": "Bikin Portofolio Mockup", "desc": "Rancang 9 desain feed Instagram dummy beserta riset caption dan hashtag menggunakan Canva."}, {"step": 3, "title": "Tawarkan Free Audit", "desc": "Berikan review singkat performa media sosial 2 bisnis UMKM lokal dengan saran perbaikannya."}, {"step": 4, "title": "Ambil Retainer Pengelolaan", "desc": "Tawarkan jasa all-in: jadwal posting bulanan, copywriting, dan interaksi komentar."}],
    products: [{"title": "Panduan Lengkap Side Job Social Media Management", "desc": "Langkah demi langkah memulai Social Media Management dari nol, trik closing klien, dan template kerja siap pakai.", "price": "Rp 79.000", "badge": "Panduan Resmi", "url": "https://lynk.id/adithdigital/5q01jnzdd7yg", "category": "Ebook", "sideJob": "Social Media Management", "isPublished": true}]
  },
  graphicdesigner: {
    id: "graphicdesigner",
    name: "Graphic Designer",
    persona: "Kreator Estetika Visual",
    icon: "\ud83c\udfa8",
    tagline: "Kamu punya sentuhan visual artistik, peka terhadap komposisi warna, font, dan layout yang memikat mata.",
    kategori: "Creative",
    tingkatKesulitan: "Menengah",
    keperluanEnglish: 2,
    deskripsi: "Membuat desain visual untuk media sosial, branding, marketing, presentasi, dan kebutuhan bisnis.",
    skills: ["Design principles", "typography", "color theory", "layout", "branding", "visual communication", "creativity", "image editing", "composition", "attention to detail"],
    skillWeights: {"Design principles": 5, "typography": 4, "color theory": 4, "layout": 5, "branding": 4, "visual communication": 4, "creativity": 5, "image editing": 4, "composition": 5, "attention to detail": 5},
    tools: ["Canva", "Adobe Photoshop", "Illustrator", "Figma"],
    linkPanduan: "https://lynk.id/adithdigital",
    potentialProducts: ["Template Canva", "Social Media Template", "Presentation Template", "Design Asset", "eBook Design"],
    why: ["Karakter dan gayamu sangat selaras dengan ritme kerja Graphic Designer.", "Skill esensial seperti Design principles, typography, color theory sangat dicari di industri saat ini.", "Peluang kerja remote dan fleksibilitas jam kerja terbuka luas untuk bidang ini."],
    roadmap: [{"step": 1, "title": "Kuasai Dasar Desain", "desc": "Pahami kontras warna, hirarki font, dan pemanfaatan ruang kosong (white space)."}, {"step": 2, "title": "Susun Portofolio Visual", "desc": "Pajang 5 karya terbaik: banner promosi, carousel edukasi, dan logo di Canva atau Behance."}, {"step": 3, "title": "Jual Template Siap Pakai", "desc": "Kemas desainmu menjadi template Canva yang bisa dijual berulang kali secara online."}, {"step": 4, "title": "Tawarkan Branding Kit UMKM", "desc": "Bantu bisnis baru membuat identitas visual lengkap dari logo sampai banner kemasan."}],
    products: [{"title": "Panduan Lengkap Side Job Graphic Designer", "desc": "Langkah demi langkah memulai Graphic Designer dari nol, trik closing klien, dan template kerja siap pakai.", "price": "Rp 79.000", "badge": "Panduan Resmi", "url": "https://lynk.id/adithdigital", "category": "Ebook", "sideJob": "Graphic Designer", "isPublished": true}]
  },
  dataentry: {
    id: "dataentry",
    name: "Data Entry",
    persona: "Master Rapi Data",
    icon: "\ud83d\udcca",
    tagline: "Kamu cenderung teliti, terorganisir, dan nyaman bekerja dengan data serta spreadsheet terstruktur.",
    kategori: "Data & Admin",
    tingkatKesulitan: "Pemula",
    keperluanEnglish: 2,
    deskripsi: "Memasukkan, memperbarui, mengorganisasi, dan memvalidasi data dalam sistem atau spreadsheet.",
    skills: ["Typing", "accuracy", "data organization", "spreadsheet", "attention to detail", "research", "data validation", "time management", "file management", "basic computer skills"],
    skillWeights: {"Typing": 5, "accuracy": 5, "data organization": 5, "spreadsheet": 5, "attention to detail": 5, "research": 3, "data validation": 4, "time management": 4, "file management": 4, "basic computer skills": 4},
    tools: ["Microsoft Excel", "Google Sheets", "Google Docs", "Airtable"],
    linkPanduan: "https://lynk.id/adithdigital/v98w8o6g96g6",
    potentialProducts: ["Excel Template", "Spreadsheet Template", "Data Entry Guide", "Productivity Template"],
    why: ["Karakter dan gayamu sangat selaras dengan ritme kerja Data Entry.", "Skill esensial seperti Typing, accuracy, data organization sangat dicari di industri saat ini.", "Peluang kerja remote dan fleksibilitas jam kerja terbuka luas untuk bidang ini."],
    roadmap: [{"step": 1, "title": "Kuasai Formula Penting", "desc": "Pelajari shortcut keyboard, VLOOKUP/XLOOKUP, filter data, dan conditional formatting."}, {"step": 2, "title": "Buat Sampel Data Cleansing", "desc": "Tunjukkan contoh spreadsheet sebelum dan sesudah dibersihkan dari format acak-acakan."}, {"step": 3, "title": "Daftar di Platform Jasa", "desc": "Buat akun di platform freelance lokal seperti Fastwork dan tawarkan jasa perapian inventaris."}, {"step": 4, "title": "Jaga Akurasi 100%", "desc": "Berikan jaminan revisi tanpa batas untuk mendapatkan rating bintang 5 dari klien pertama."}],
    products: [{"title": "Panduan Lengkap Side Job Data Entry", "desc": "Langkah demi langkah memulai Data Entry dari nol, trik closing klien, dan template kerja siap pakai.", "price": "Rp 79.000", "badge": "Panduan Resmi", "url": "https://lynk.id/adithdigital/v98w8o6g96g6", "category": "Ebook", "sideJob": "Data Entry", "isPublished": true}]
  },
  copywriter: {
    id: "copywriter",
    name: "Copywriter",
    persona: "Peracik Kata Berbayar",
    icon: "\u270d\ufe0f",
    tagline: "Kamu piawai menuangkan ide ke dalam tulisan persuasif yang menghipnotis pembaca dan menghasilkan aksi.",
    kategori: "Writing & Marketing",
    tingkatKesulitan: "Menengah",
    keperluanEnglish: 4,
    deskripsi: "Menulis teks persuasif untuk iklan, website, email, media sosial, dan kebutuhan marketing.",
    skills: ["Writing", "storytelling", "persuasion", "research", "marketing", "psychology", "headline writing", "editing", "creativity", "audience understanding"],
    skillWeights: {"Writing": 5, "storytelling": 4, "persuasion": 5, "research": 4, "marketing": 5, "psychology": 4, "headline writing": 5, "editing": 5, "creativity": 4, "audience understanding": 5},
    tools: ["Google Docs", "Grammarly", "ChatGPT", "Notion", "Canva"],
    linkPanduan: "https://lynk.id/adithdigital/j8e53883e991",
    potentialProducts: ["Copywriting Template", "eBook Copywriting", "Prompt AI", "Caption Template", "Swipe File"],
    why: ["Karakter dan gayamu sangat selaras dengan ritme kerja Copywriter.", "Skill esensial seperti Writing, storytelling, persuasion sangat dicari di industri saat ini.", "Peluang kerja remote dan fleksibilitas jam kerja terbuka luas untuk bidang ini."],
    roadmap: [{"step": 1, "title": "Pahami Formula Tulisan", "desc": "Kuasai kerangka AIDA (Attention, Interest, Desire, Action) dan PAS (Problem, Agitate, Solution)."}, {"step": 2, "title": "Koleksi Swipe File Iklan", "desc": "Tulis ulang 3 contoh iklan produk populer dengan gayamu sendiri di Google Docs."}, {"step": 3, "title": "Bangun Personal Branding", "desc": "Bagikan tips copywriting singkat di LinkedIn atau Threads untuk menjaring calon klien."}, {"step": 4, "title": "Pitching ke Brand Lokal", "desc": "Kirim email penawaran naskah caption atau landing page baru ke online shop aktif."}],
    products: [{"title": "Panduan Lengkap Side Job Copywriter", "desc": "Langkah demi langkah memulai Copywriter dari nol, trik closing klien, dan template kerja siap pakai.", "price": "Rp 79.000", "badge": "Panduan Resmi", "url": "https://lynk.id/adithdigital/j8e53883e991", "category": "Ebook", "sideJob": "Copywriter", "isPublished": true}]
  },
  customersupport: {
    id: "customersupport",
    name: "Customer Support",
    persona: "Juru Solusi Ramah",
    icon: "\ud83c\udfa7",
    tagline: "Kamu sosok yang sabar, memiliki empati tinggi, luwes berkomunikasi, dan senang membantu memecahkan keluhan.",
    kategori: "Customer Service",
    tingkatKesulitan: "Pemula\u2013Menengah",
    keperluanEnglish: 4,
    deskripsi: "Membantu pelanggan melalui chat, email, telepon, atau platform support untuk menyelesaikan masalah dan menjawab pertanyaan.",
    skills: ["Communication", "empathy", "problem solving", "product knowledge", "patience", "typing", "active listening", "conflict resolution", "organization", "customer service"],
    skillWeights: {"Communication": 5, "empathy": 5, "problem solving": 5, "product knowledge": 4, "patience": 5, "typing": 4, "active listening": 4, "conflict resolution": 4, "organization": 4, "customer service": 5},
    tools: ["Zendesk", "Intercom", "Freshdesk", "Slack", "Gmail", "WhatsApp"],
    linkPanduan: "https://lynk.id/adithdigital",
    potentialProducts: ["Customer Service Guide", "Chat Template", "SOP Template", "eBook Customer Support"],
    why: ["Karakter dan gayamu sangat selaras dengan ritme kerja Customer Support.", "Skill esensial seperti Communication, empathy, problem solving sangat dicari di industri saat ini.", "Peluang kerja remote dan fleksibilitas jam kerja terbuka luas untuk bidang ini."],
    roadmap: [{"step": 1, "title": "Latih Mengetik Cepat & Sopan", "desc": "Tingkatkan kecepatan ketik minimal 50 WPM dan asah respon empati saat komplain."}, {"step": 2, "title": "Pelajari Sistem Helpdesk", "desc": "Kenali cara kerja Zendesk, Freshdesk, atau fitur pesan otomatis WhatsApp Business."}, {"step": 3, "title": "Buat CV Fokus Pelayanan", "desc": "Tonjolkan pengalaman kepanitiaan, organisasi, atau keramahan komunikasi melayani orang."}, {"step": 4, "title": "Lamar Shift Fleksibel", "desc": "Cari lowongan CS remote part-time atau shift malam di startup dan toko e-commerce."}],
    products: [{"title": "Panduan Lengkap Side Job Customer Support", "desc": "Langkah demi langkah memulai Customer Support dari nol, trik closing klien, dan template kerja siap pakai.", "price": "Rp 79.000", "badge": "Panduan Resmi", "url": "https://lynk.id/adithdigital", "category": "Ebook", "sideJob": "Customer Support", "isPublished": true}]
  },
  seo: {
    id: "seo",
    name: "SEO Specialist",
    persona: "Pakar Traffic Organik",
    icon: "\ud83d\udd0d",
    tagline: "Kamu strategis, analitis, dan paham cara membawa konten website merajai peringkat teratas Google.",
    kategori: "Digital Marketing",
    tingkatKesulitan: "Menengah\u2013Sulit",
    keperluanEnglish: 4,
    deskripsi: "Mengoptimalkan website agar lebih mudah ditemukan di mesin pencari dan meningkatkan traffic organik.",
    skills: ["Keyword research", "SEO strategy", "on-page SEO", "technical SEO", "content optimization", "analytics", "competitor research", "link building", "copywriting", "data analysis"],
    skillWeights: {"Keyword research": 5, "SEO strategy": 5, "on-page SEO": 5, "technical SEO": 4, "content optimization": 5, "analytics": 4, "competitor research": 4, "link building": 3, "copywriting": 4, "data analysis": 4},
    tools: ["Google Search Console", "Google Analytics", "Ahrefs", "Semrush", "Screaming Frog"],
    linkPanduan: "https://lynk.id/adithdigital",
    potentialProducts: ["SEO Checklist", "Keyword Template", "SEO eBook", "Content Brief Template"],
    why: ["Karakter dan gayamu sangat selaras dengan ritme kerja SEO Specialist.", "Skill esensial seperti Keyword research, SEO strategy, on-page SEO sangat dicari di industri saat ini.", "Peluang kerja remote dan fleksibilitas jam kerja terbuka luas untuk bidang ini."],
    roadmap: [{"step": 1, "title": "Kuasai Riset Kata Kunci", "desc": "Gunakan Google Keyword Planner, Ahrefs, atau Ubersuggest untuk mencari keyword bervolume tinggi."}, {"step": 2, "title": "Optimasi On-Page SEO", "desc": "Pahami pengaturan tag judul (H1/H2), meta description, internal link, dan keterbacaan artikel."}, {"step": 3, "title": "Bikin Studi Kasus Artikel", "desc": "Tulis 1-2 artikel blog yang terbukti masuk halaman pertama pencarian Google."}, {"step": 4, "title": "Tawarkan Jasa SEO Retainer", "desc": "Bantu website bisnis lokal meningkatkan traffic pencarian organik secara konsisten."}],
    products: [{"title": "Panduan Lengkap Side Job SEO Specialist", "desc": "Langkah demi langkah memulai SEO Specialist dari nol, trik closing klien, dan template kerja siap pakai.", "price": "Rp 79.000", "badge": "Panduan Resmi", "url": "https://lynk.id/adithdigital", "category": "Ebook", "sideJob": "SEO Specialist", "isPublished": true}]
  },
  emailmarketer: {
    id: "emailmarketer",
    name: "Email Marketer",
    persona: "Strategis Konversi Email",
    icon: "\ud83d\udce7",
    tagline: "Kamu piawai merancang pesan email persuasif dan alur otomatisasi yang mendatangkan penjualan berkelanjutan.",
    kategori: "Digital Marketing",
    tingkatKesulitan: "Menengah",
    keperluanEnglish: 4,
    deskripsi: "Membuat dan mengelola kampanye email untuk meningkatkan engagement, leads, dan penjualan.",
    skills: ["Copywriting", "email strategy", "segmentation", "automation", "analytics", "design", "A/B testing", "customer research", "persuasion", "CRM"],
    skillWeights: {"Copywriting": 5, "email strategy": 5, "segmentation": 5, "automation": 4, "analytics": 4, "design": 3, "A/B testing": 4, "customer research": 4, "persuasion": 5, "CRM": 4},
    tools: ["Mailchimp", "Klaviyo", "HubSpot", "ConvertKit", "Canva"],
    linkPanduan: "https://lynk.id/adithdigital",
    potentialProducts: ["Email Template", "Email Marketing Guide", "Campaign Planner", "Copywriting Template"],
    why: ["Karakter dan gayamu sangat selaras dengan ritme kerja Email Marketer.", "Skill esensial seperti Copywriting, email strategy, segmentation sangat dicari di industri saat ini.", "Peluang kerja remote dan fleksibilitas jam kerja terbuka luas untuk bidang ini."],
    roadmap: [{"step": 1, "title": "Kuasai Software Email", "desc": "Pelajari alur kerja Mailchimp, Klaviyo, atau ConvertKit mulai dari list hingga broadcast."}, {"step": 2, "title": "Rancang Email Welcome Sequence", "desc": "Tulis rangkaian 3 email perkenalan otomatis untuk menarik subscriber baru membeli produk."}, {"step": 3, "title": "Terapkan Segmentasi Audiens", "desc": "Bagi daftar email berdasarkan minat atau riwayat pembelian agar open rate tinggi."}, {"step": 4, "title": "Kelola Newsletter Bisnis", "desc": "Tawarkan penulisan dan pengiriman newsletter mingguan ke founder atau brand online."}],
    products: [{"title": "Panduan Lengkap Side Job Email Marketer", "desc": "Langkah demi langkah memulai Email Marketer dari nol, trik closing klien, dan template kerja siap pakai.", "price": "Rp 79.000", "badge": "Panduan Resmi", "url": "https://lynk.id/adithdigital", "category": "Ebook", "sideJob": "Email Marketer", "isPublished": true}]
  },
  influenceroutreach: {
    id: "influenceroutreach",
    name: "Influencer Outreach",
    persona: "Jembatan Brand & Creator",
    icon: "\ud83e\udd1d",
    tagline: "Kamu komunikatif, lihai bernegosiasi, dan cermat memilih partner creator yang tepat untuk kampanye promosi.",
    kategori: "Influencer Marketing",
    tingkatKesulitan: "Menengah",
    keperluanEnglish: 4,
    deskripsi: "Mencari influencer, menghubungi creator, melakukan negosiasi, dan mengelola kerja sama campaign.",
    skills: ["Communication", "research", "negotiation", "influencer research", "outreach", "relationship management", "campaign management", "organization", "copywriting", "reporting"],
    skillWeights: {"Communication": 5, "research": 5, "negotiation": 5, "influencer research": 5, "outreach": 5, "relationship management": 5, "campaign management": 4, "organization": 4, "copywriting": 4, "reporting": 4},
    tools: ["Instagram", "TikTok", "Google Sheets", "Gmail", "Notion", "Modash", "Upfluence"],
    linkPanduan: "https://lynk.id/adithdigital",
    potentialProducts: ["Outreach Template", "Influencer Database Template", "Campaign Tracker", "eBook KOL Specialist"],
    why: ["Karakter dan gayamu sangat selaras dengan ritme kerja Influencer Outreach.", "Skill esensial seperti Communication, research, negotiation sangat dicari di industri saat ini.", "Peluang kerja remote dan fleksibilitas jam kerja terbuka luas untuk bidang ini."],
    roadmap: [{"step": 1, "title": "Riset Database Creator", "desc": "Kumpulkan 50 profil TikTok/IG creator sesuai target niche produk ke dalam spreadsheet."}, {"step": 2, "title": "Rancang Template Outreach DM/Email", "desc": "Susun naskah undangan kolaborasi yang sopan, to-the-point, dan menjelaskan benefit kerja sama."}, {"step": 3, "title": "Negosiasi Rate Card & Brief", "desc": "Sepakati format video, deadline posting, hak tayang iklan, dan pengiriman sampel produk."}, {"step": 4, "title": "Pantau & Rekap Laporan ROI", "desc": "Kalkulasi views, link clicks, dan engagement rate dari campaign untuk dilaporkan ke klien."}],
    products: [{"title": "Panduan Lengkap Side Job Influencer Outreach", "desc": "Langkah demi langkah memulai Influencer Outreach dari nol, trik closing klien, dan template kerja siap pakai.", "price": "Rp 79.000", "badge": "Panduan Resmi", "url": "https://lynk.id/adithdigital", "category": "Ebook", "sideJob": "Influencer Outreach", "isPublished": true}]
  },
  translator: {
    id: "translator",
    name: "Translator",
    persona: "Jembatan Bahasa Multilingual",
    icon: "\ud83c\udf10",
    tagline: "Kamu fasih memahami nuansa dua bahasa, cermat dalam ejaan, dan mampu mempertahankan konteks pesan secara akurat.",
    kategori: "Language",
    tingkatKesulitan: "Menengah",
    keperluanEnglish: 5,
    deskripsi: "Menerjemahkan teks dari satu bahasa ke bahasa lain dengan mempertahankan makna dan konteks.",
    skills: ["Language proficiency", "grammar", "vocabulary", "writing", "proofreading", "cultural awareness", "research", "accuracy", "terminology", "attention to detail"],
    skillWeights: {"Language proficiency": 5, "grammar": 5, "vocabulary": 5, "writing": 5, "proofreading": 5, "cultural awareness": 4, "research": 4, "accuracy": 5, "terminology": 4, "attention to detail": 5},
    tools: ["Google Docs", "DeepL", "Grammarly", "CAT Tools"],
    linkPanduan: "https://lynk.id/adithdigital",
    potentialProducts: ["Translation Guide", "Language Learning Product", "Glossary Template", "Translation Checklist"],
    why: ["Karakter dan gayamu sangat selaras dengan ritme kerja Translator.", "Skill esensial seperti Language proficiency, grammar, vocabulary sangat dicari di industri saat ini.", "Peluang kerja remote dan fleksibilitas jam kerja terbuka luas untuk bidang ini."],
    roadmap: [{"step": 1, "title": "Tentukan Bidang Spesialisasi", "desc": "Pilih fokus: terjemahan dokumen bisnis, artikel website, subtitle video, atau jurnal ilmiah."}, {"step": 2, "title": "Buat Sampel Dua Bahasa", "desc": "Siapkan 3 contoh dokumen teks asli berdampingan dengan hasil terjemahanmu yang alami."}, {"step": 3, "title": "Manfaatkan Tools Produktivitas", "desc": "Gunakan DeepL dan kamus konteks untuk mempercepat draf sebelum kamu sunting sempurna."}, {"step": 4, "title": "Pasang Tarif per Kata", "desc": "Gunakan patokan tarif per kata standar dan apply di platform freelance lokal maupun global."}],
    products: [{"title": "Panduan Lengkap Side Job Translator", "desc": "Langkah demi langkah memulai Translator dari nol, trik closing klien, dan template kerja siap pakai.", "price": "Rp 79.000", "badge": "Panduan Resmi", "url": "https://lynk.id/adithdigital", "category": "Ebook", "sideJob": "Translator", "isPublished": true}]
  },
  transcription: {
    id: "transcription",
    name: "Transcription",
    persona: "Penyimak Tajam & Presisi",
    icon: "\ud83c\udf99\ufe0f",
    tagline: "Kamu pendengar yang sabar, cermat menangkap pembicaraan audio, dan teliti mentransformasikan rekaman suara ke teks.",
    kategori: "Data & Language",
    tingkatKesulitan: "Pemula\u2013Menengah",
    keperluanEnglish: 4,
    deskripsi: "Mengubah rekaman audio atau video menjadi teks secara akurat.",
    skills: ["Listening", "typing", "accuracy", "grammar", "concentration", "time management", "proofreading", "language comprehension", "research", "attention to detail"],
    skillWeights: {"Listening": 5, "typing": 5, "accuracy": 5, "grammar": 4, "concentration": 5, "time management": 4, "proofreading": 5, "language comprehension": 5, "research": 3, "attention to detail": 5},
    tools: ["Google Docs", "Microsoft Word", "Otter.ai", "Descript", "Whisper", "Headphones"],
    linkPanduan: "https://lynk.id/adithdigital",
    potentialProducts: ["Transcription Guide", "Transcript Template", "Productivity Template", "AI Transcription Guide"],
    why: ["Karakter dan gayamu sangat selaras dengan ritme kerja Transcription.", "Skill esensial seperti Listening, typing, accuracy sangat dicari di industri saat ini.", "Peluang kerja remote dan fleksibilitas jam kerja terbuka luas untuk bidang ini."],
    roadmap: [{"step": 1, "title": "Siapkan Headphone Jernih", "desc": "Gunakan headphone yang menutup telinga agar vokal audio terdengar jelas tanpa gangguan."}, {"step": 2, "title": "Kuasai Format Clean Verbatim", "desc": "Pelajari aturan membuang kata pengisi (uhm, ah) dan cara menyematkan timestamp."}, {"step": 3, "title": "Gunakan AI Transcribe Awal", "desc": "Bantu proses dengan Whisper/Otter untuk draf kasar, lalu periksa akurasinya secara manual."}, {"step": 4, "title": "Lamar Proyek Riset & Wawancara", "desc": "Tawarkan jasa transkrip ke mahasiswa tugas akhir, peneliti pasar, atau podcaster."}],
    products: [{"title": "Panduan Lengkap Side Job Transcription", "desc": "Langkah demi langkah memulai Transcription dari nol, trik closing klien, dan template kerja siap pakai.", "price": "Rp 79.000", "badge": "Panduan Resmi", "url": "https://lynk.id/adithdigital", "category": "Ebook", "sideJob": "Transcription", "isPublished": true}]
  },
  tutor: {
    id: "tutor",
    name: "Online Tutor",
    persona: "Mentor Edukasi Inspiratif",
    icon: "\ud83c\udf93",
    tagline: "Kamu senang berbagi ilmu, sabar menjelaskan materi yang rumit, dan komunikatif dalam membimbing siswa online.",
    kategori: "Education",
    tingkatKesulitan: "Menengah",
    keperluanEnglish: 3,
    deskripsi: "Mengajar atau membimbing siswa secara online melalui kelas privat maupun kelompok.",
    skills: ["Subject knowledge", "communication", "teaching", "presentation", "patience", "lesson planning", "explanation", "adaptability", "technology", "empathy"],
    skillWeights: {"Subject knowledge": 5, "communication": 5, "teaching": 5, "presentation": 4, "patience": 5, "lesson planning": 5, "explanation": 5, "adaptability": 4, "technology": 4, "empathy": 5},
    tools: ["Zoom", "Google Meet", "Google Classroom", "Canva", "Notion", "Whiteboard"],
    linkPanduan: "https://lynk.id/adithdigital",
    potentialProducts: ["Modul Pembelajaran", "Worksheet", "eBook", "Presentation Template", "Study Planner"],
    why: ["Karakter dan gayamu sangat selaras dengan ritme kerja Online Tutor.", "Skill esensial seperti Subject knowledge, communication, teaching sangat dicari di industri saat ini.", "Peluang kerja remote dan fleksibilitas jam kerja terbuka luas untuk bidang ini."],
    roadmap: [{"step": 1, "title": "Tentukan Materi Keahlianmu", "desc": "Pilih mata pelajaran atau keahlian khusus: Bahasa Inggris, Matematika, Desain, atau Musik."}, {"step": 2, "title": "Siapkan Modul & Worksheet", "desc": "Buat materi visual ringkas dan latihan soal interaktif di Canva atau Google Slides."}, {"step": 3, "title": "Buka Kelas Percobaan Gratis", "desc": "Adakan 1 sesi demo 30 menit gratis untuk mengumpulkan testimoni orang tua / siswa."}, {"step": 4, "title": "Buat Paket Bimbingan Rutin", "desc": "Tawarkan paket les privat 8-12 pertemuan per bulan via Google Meet atau Zoom."}],
    products: [{"title": "Panduan Lengkap Side Job Online Tutor", "desc": "Langkah demi langkah memulai Online Tutor dari nol, trik closing klien, dan template kerja siap pakai.", "price": "Rp 79.000", "badge": "Panduan Resmi", "url": "https://lynk.id/adithdigital", "category": "Ebook", "sideJob": "Online Tutor", "isPublished": true}]
  },
  apptester: {
    id: "apptester",
    name: "App Tester",
    persona: "Detektif Bug Aplikasi",
    icon: "\ud83d\udc1e",
    tagline: "Kamu punya rasa ingin tahu tinggi, kritis terhadap detail, dan jeli menemukan kesalahan atau bug pada aplikasi mobile.",
    kategori: "Technology",
    tingkatKesulitan: "Menengah",
    keperluanEnglish: 3,
    deskripsi: "Menguji aplikasi untuk menemukan bug, error, masalah usability, dan pengalaman pengguna.",
    skills: ["Testing", "attention to detail", "bug reporting", "critical thinking", "usability testing", "documentation", "problem solving", "communication", "mobile knowledge", "analytical thinking"],
    skillWeights: {"Testing": 5, "attention to detail": 5, "bug reporting": 5, "critical thinking": 5, "usability testing": 5, "documentation": 4, "problem solving": 4, "communication": 4, "mobile knowledge": 4, "analytical thinking": 5},
    tools: ["Android/iOS", "BrowserStack", "Jira", "Trello", "Google Sheets", "Test IO"],
    linkPanduan: "https://lynk.id/adithdigital",
    potentialProducts: ["Testing Checklist", "Bug Report Template", "QA Guide", "Testing eBook"],
    why: ["Karakter dan gayamu sangat selaras dengan ritme kerja App Tester.", "Skill esensial seperti Testing, attention to detail, bug reporting sangat dicari di industri saat ini.", "Peluang kerja remote dan fleksibilitas jam kerja terbuka luas untuk bidang ini."],
    roadmap: [{"step": 1, "title": "Pahami Format Bug Report", "desc": "Kuasai struktur laporan: Judul, Langkah Mengulang (Steps), Hasil Aktual vs Hasil Harapan."}, {"step": 2, "title": "Daftar di Platform Crowdtest", "desc": "Buat profil di Test IO, uTest, atau Tester Work dan daftarkan tipe smartphone milikmu."}, {"step": 3, "title": "Loloskan Tes Kualifikasi", "desc": "Pelajari panduan tes awal uTest Academy untuk mendapatkan badge tester terpercaya."}, {"step": 4, "title": "Klaim Siklus Uji Coba Baru", "desc": "Cepat merespons undangan tes aplikasi dan laporkan temuan error sebelum tester lain."}],
    products: [{"title": "Panduan Lengkap Side Job App Tester", "desc": "Langkah demi langkah memulai App Tester dari nol, trik closing klien, dan template kerja siap pakai.", "price": "Rp 79.000", "badge": "Panduan Resmi", "url": "https://lynk.id/adithdigital", "category": "Ebook", "sideJob": "App Tester", "isPublished": true}]
  },
  websitetester: {
    id: "websitetester",
    name: "Website Tester",
    persona: "Auditor Pengalaman Web",
    icon: "\ud83d\udcbb",
    tagline: "Kamu teliti menguji alur pengguna website, navigasi tampilan, dan memastikan web bekerja cepat serta bebas kendala.",
    kategori: "Technology",
    tingkatKesulitan: "Menengah",
    keperluanEnglish: 3,
    deskripsi: "Menguji website dari sisi fungsi, usability, navigasi, tampilan, dan pengalaman pengguna.",
    skills: ["Usability testing", "website testing", "bug reporting", "attention to detail", "navigation testing", "critical thinking", "documentation", "communication", "analytical thinking", "basic web knowledge"],
    skillWeights: {"Usability testing": 5, "website testing": 5, "bug reporting": 5, "attention to detail": 5, "navigation testing": 4, "critical thinking": 5, "documentation": 4, "communication": 4, "analytical thinking": 3, "basic web knowledge": 4},
    tools: ["Chrome", "Firefox", "BrowserStack", "Jira", "Google Sheets", "Loom"],
    linkPanduan: "https://lynk.id/adithdigital",
    potentialProducts: ["Website Audit Template", "UX Checklist", "Bug Report Template", "Website Testing Guide"],
    why: ["Karakter dan gayamu sangat selaras dengan ritme kerja Website Tester.", "Skill esensial seperti Usability testing, website testing, bug reporting sangat dicari di industri saat ini.", "Peluang kerja remote dan fleksibilitas jam kerja terbuka luas untuk bidang ini."],
    roadmap: [{"step": 1, "title": "Kuasai Checklist Usability", "desc": "Periksa kecepatan buka halaman, kesesuaian tampilan mobile, tautan mati, dan alur form checkout."}, {"step": 2, "title": "Gunakan Screen Recorder Loom", "desc": "Rekam layar sambil berbicara mengutarakan pengalamanmu saat menjelajahi website klien."}, {"step": 3, "title": "Susun Template Audit Web", "desc": "Kemas temuan dalam dokumen rapi berisi screenshot bukti masalah dan rekomendasi solusi."}, {"step": 4, "title": "Tawarkan Jasa ke Pemilik Web", "desc": "Kirim audit cepat gratis ke website UMKM baru untuk membuka peluang jasa audit berbayar."}],
    products: [{"title": "Panduan Lengkap Side Job Website Tester", "desc": "Langkah demi langkah memulai Website Tester dari nol, trik closing klien, dan template kerja siap pakai.", "price": "Rp 79.000", "badge": "Panduan Resmi", "url": "https://lynk.id/adithdigital", "category": "Ebook", "sideJob": "Website Tester", "isPublished": true}]
  },
  jasaketik: {
    id: "jasaketik",
    name: "Jasa Ketik",
    persona: "Si Jari Cepat Cuan",
    icon: "\u2328\ufe0f",
    tagline: "Kamu betah kerja konsisten, minim typo, dan cepat mengubah tulisan berantakan menjadi berkas digital rapi.",
    kategori: "Admin & Writing",
    tingkatKesulitan: "Pemula",
    keperluanEnglish: 1,
    deskripsi: "Menawarkan jasa mengetik ulang dokumen, catatan, PDF, gambar, atau tulisan menjadi dokumen digital.",
    skills: ["Typing", "accuracy", "formatting", "proofreading", "attention to detail", "document management", "grammar", "time management", "organization", "computer skills"],
    skillWeights: {"Typing": 5, "accuracy": 5, "formatting": 5, "proofreading": 4, "attention to detail": 5, "document management": 4, "grammar": 3, "time management": 4, "organization": 4, "computer skills": 5},
    tools: ["Microsoft Word", "Google Docs", "OCR tools", "Canva"],
    linkPanduan: "https://lynk.id/adithdigital/opg1112xqr61",
    potentialProducts: ["Template Dokumen", "Formatting Template", "Typing Guide", "Productivity Template"],
    why: ["Karakter dan gayamu sangat selaras dengan ritme kerja Jasa Ketik.", "Skill esensial seperti Typing, accuracy, formatting sangat dicari di industri saat ini.", "Peluang kerja remote dan fleksibilitas jam kerja terbuka luas untuk bidang ini."],
    roadmap: [{"step": 1, "title": "Latih Ketik 10 Jari", "desc": "Tingkatkan kecepatan mengetik minimal 60 kata per menit tanpa melihat tombol keyboard."}, {"step": 2, "title": "Kuasai Format Standar Dokumen", "desc": "Pelajari aturan margin skripsi, daftar isi otomatis, nomor halaman, dan tabel Word."}, {"step": 3, "title": "Gunakan Trik OCR Digital", "desc": "Manfaatkan scanner OCR untuk mengubah buku fisik menjadi teks dalam hitungan detik."}, {"step": 4, "title": "Promosikan di Komunitas Kampus", "desc": "Pasang informasi jasa ketik kilat di grup WhatsApp mahasiswa atau media sosial kampus."}],
    products: [{"title": "Panduan Lengkap Side Job Jasa Ketik", "desc": "Langkah demi langkah memulai Jasa Ketik dari nol, trik closing klien, dan template kerja siap pakai.", "price": "Rp 79.000", "badge": "Panduan Resmi", "url": "https://lynk.id/adithdigital/opg1112xqr61", "category": "Ebook", "sideJob": "Jasa Ketik", "isPublished": true}]
  },
  microtask: {
    id: "microtask",
    name: "Micro Task",
    persona: "Kolektor Receh Online",
    icon: "\ud83e\udde9",
    tagline: "Kamu suka mengisi waktu luang dengan pekerjaan-pekerjaan ringkas yang fleksibel tanpa tekanan deadline berat.",
    kategori: "Online Task",
    tingkatKesulitan: "Pemula",
    keperluanEnglish: 3,
    deskripsi: "Menyelesaikan pekerjaan kecil secara online seperti data labeling, categorization, research, survey, atau verification.",
    skills: ["Attention to detail", "accuracy", "data entry", "research", "typing", "categorization", "following instructions", "time management", "basic computer skills", "consistency"],
    skillWeights: {"Attention to detail": 5, "accuracy": 5, "data entry": 4, "research": 3, "typing": 4, "categorization": 5, "following instructions": 5, "time management": 4, "basic computer skills": 4, "consistency": 5},
    tools: ["Browser", "Google Sheets", "Excel", "platform microtask", "AI tools"],
    linkPanduan: "https://lynk.id/adithdigital/oq1k7lq963kx",
    potentialProducts: ["Microtask Guide", "Website List", "Productivity Template", "eBook Side Job"],
    why: ["Karakter dan gayamu sangat selaras dengan ritme kerja Micro Task.", "Skill esensial seperti Attention to detail, accuracy, data entry sangat dicari di industri saat ini.", "Peluang kerja remote dan fleksibilitas jam kerja terbuka luas untuk bidang ini."],
    roadmap: [{"step": 1, "title": "Siapkan Akun Pencairan", "desc": "Buat akun PayPal atau e-wallet resmi untuk menampung bayaran tugas online internasional."}, {"step": 2, "title": "Registrasi Platform Tepercaya", "desc": "Daftar di Remotasks, Clickworker, Toloka, atau Appen yang terbukti membayar tepat waktu."}, {"step": 3, "title": "Selesaikan Training Akurasi", "desc": "Ikuti instruksi latihan dengan teliti agar akunmu mendapat prioritas tugas bergaji lebih tinggi."}, {"step": 4, "title": "Rutin Selesaikan Antrean", "desc": "Luangkan 1-2 jam per hari untuk konsisten menyelesaikan task klasifikasi data atau AI labelling."}],
    products: [{"title": "Panduan Lengkap Side Job Micro Task", "desc": "Langkah demi langkah memulai Micro Task dari nol, trik closing klien, dan template kerja siap pakai.", "price": "Rp 79.000", "badge": "Panduan Resmi", "url": "https://lynk.id/adithdigital/oq1k7lq963kx", "category": "Ebook", "sideJob": "Micro Task", "isPublished": true}]
  },
  admin: {
    id: "admin",
    name: "Admin",
    persona: "Sultan Multitasking Operasional",
    icon: "\ud83d\uddc2\ufe0f",
    tagline: "Kamu piawai merapikan hal-hal rumit, teliti mengurus berkas, rekap data, dan membuat operasional bisnis berjalan mulus.",
    kategori: "Admin",
    tingkatKesulitan: "Pemula",
    keperluanEnglish: 3,
    deskripsi: "Mengelola pekerjaan administratif seperti dokumen, data, jadwal, email, dan koordinasi operasional.",
    skills: ["Administration", "data entry", "organization", "communication", "scheduling", "documentation", "spreadsheet", "email management", "time management", "attention to detail"],
    skillWeights: {"Administration": 5, "data entry": 5, "organization": 5, "communication": 4, "scheduling": 5, "documentation": 5, "spreadsheet": 4, "email management": 4, "time management": 5, "attention to detail": 5},
    tools: ["Microsoft Office", "Google Workspace", "Excel", "Gmail", "Notion", "Trello"],
    linkPanduan: "https://lynk.id/adithdigital/180ypg6147e2",
    potentialProducts: ["Admin Template", "SOP Template", "Excel Template", "Productivity Planner"],
    why: ["Karakter dan gayamu sangat selaras dengan ritme kerja Admin.", "Skill esensial seperti Administration, data entry, organization sangat dicari di industri saat ini.", "Peluang kerja remote dan fleksibilitas jam kerja terbuka luas untuk bidang ini."],
    roadmap: [{"step": 1, "title": "Pahami Alur Toko Online", "desc": "Kuasai pencatatan resi pesanan marketplace, template invoice, dan rekap mutasi bank."}, {"step": 2, "title": "Susun Template Respon Chat", "desc": "Koleksi draft balasan cepat yang ramah untuk konfirmasi order, pembayaran, dan komplain."}, {"step": 3, "title": "Bantu 1 Toko Sebagai Bukti", "desc": "Tangani operasional toko rekanan selama 1 minggu sebagai bukti nyata ketelitian kerjamu."}, {"step": 4, "title": "Ambil Gaji Tetap Bulanan", "desc": "Lamar lowongan admin online remote paruh waktu dengan sistem gaji bulanan stabil."}],
    products: [{"title": "Panduan Lengkap Side Job Admin", "desc": "Langkah demi langkah memulai Admin dari nol, trik closing klien, dan template kerja siap pakai.", "price": "Rp 79.000", "badge": "Panduan Resmi", "url": "https://lynk.id/adithdigital/180ypg6147e2", "category": "Ebook", "sideJob": "Admin", "isPublished": true}]
  },
  voiceover: {
    id: "voiceover",
    name: "Voice Over Talent",
    persona: "Pemilik Suara Emas",
    icon: "\ud83c\udfa4",
    tagline: "Kamu percaya diri berbicara, memiliki intonasi artikulatif yang memikat, dan karakter vokal yang berjiwa.",
    kategori: "Creative & Audio",
    tingkatKesulitan: "Menengah",
    keperluanEnglish: 4,
    deskripsi: "Mengisi suara untuk video, iklan, audiobook, podcast, e-learning, dan berbagai kebutuhan audio.",
    skills: ["Voice control", "pronunciation", "articulation", "acting", "storytelling", "script reading", "audio recording", "emotion", "consistency", "communication"],
    skillWeights: {"Voice control": 5, "pronunciation": 5, "articulation": 5, "acting": 4, "storytelling": 4, "script reading": 5, "audio recording": 4, "emotion": 5, "consistency": 4, "communication": 4},
    tools: ["Audacity", "Adobe Audition", "CapCut", "microphone", "headphones", "audio interface"],
    linkPanduan: "https://lynk.id/adithdigital/n53m4qr5d1n5",
    potentialProducts: ["Voice Over Guide", "Script Template", "Audio Preset", "Recording Checklist"],
    why: ["Karakter dan gayamu sangat selaras dengan ritme kerja Voice Over Talent.", "Skill esensial seperti Voice control, pronunciation, articulation sangat dicari di industri saat ini.", "Peluang kerja remote dan fleksibilitas jam kerja terbuka luas untuk bidang ini."],
    roadmap: [{"step": 1, "title": "Latih Artikulasi & Napas", "desc": "Lakukan senam vokal, latihan pernapasan diafragma, dan intonasi membaca naskah."}, {"step": 2, "title": "Siapkan Rekaman Bebas Noise", "desc": "Gunakan ruangan tenang dengan mikrofon USB terjangkau dan pelindung pop filter."}, {"step": 3, "title": "Rekam Demo Reel Suara", "desc": "Buat 3 sampel audio: gaya antusias (iklan), gaya santai (podcast), dan gaya formal (e-learning)."}, {"step": 4, "title": "Kolaborasi dengan Video Editor", "desc": "Bangun relasi dengan para editor video dan kreator konten yang butuh pengisi suara rutin."}],
    products: [{"title": "Panduan Lengkap Side Job Voice Over Talent", "desc": "Langkah demi langkah memulai Voice Over Talent dari nol, trik closing klien, dan template kerja siap pakai.", "price": "Rp 79.000", "badge": "Panduan Resmi", "url": "https://lynk.id/adithdigital/n53m4qr5d1n5", "category": "Ebook", "sideJob": "Voice Over Talent", "isPublished": true}]
  },
  reviewbuku: {
    id: "reviewbuku",
    name: "Review Buku",
    persona: "Kutu Buku Berbayar",
    icon: "\ud83d\udcda",
    tagline: "Kamu gemar membaca, mampu mencerna intisari buku dengan baik, dan senang membagikan pandangan kritis ke audiens.",
    kategori: "Writing & Content",
    tingkatKesulitan: "Pemula\u2013Menengah",
    keperluanEnglish: 3,
    deskripsi: "Membaca dan membuat ulasan buku untuk media sosial, blog, platform review, atau kebutuhan brand.",
    skills: ["Reading", "writing", "critical thinking", "storytelling", "analysis", "summarization", "communication", "creativity", "proofreading", "content creation"],
    skillWeights: {"Reading": 5, "writing": 5, "critical thinking": 4, "storytelling": 4, "analysis": 5, "summarization": 5, "communication": 4, "creativity": 4, "proofreading": 4, "content creation": 5},
    tools: ["Goodreads", "Google Docs", "Canva", "Instagram", "TikTok", "Notion"],
    linkPanduan: "https://lynk.id/adithdigital/0yjgrk8np80y",
    potentialProducts: ["Reading Journal", "Book Review Template", "Reading Planner", "eBook Review Guide"],
    why: ["Karakter dan gayamu sangat selaras dengan ritme kerja Review Buku.", "Skill esensial seperti Reading, writing, critical thinking sangat dicari di industri saat ini.", "Peluang kerja remote dan fleksibilitas jam kerja terbuka luas untuk bidang ini."],
    roadmap: [{"step": 1, "title": "Bikin Akun Konten Buku", "desc": "Mulai bagikan intisari 3 ide penting dari buku yang telah kamu baca di Instagram/TikTok."}, {"step": 2, "title": "Gunakan Format Ringkasan Hook", "desc": "Tarik pembaca dengan kutipan menarik, studi kasus, atau pelajaran hidup dari buku tersebut."}, {"step": 3, "title": "Jalin Koneksi dengan Penerbit", "desc": "Tawarkan slot ulasan buku atau barter buku cetak gratis untuk direview di tokomu."}, {"step": 4, "title": "Monetisasi via Afiliasi & Jasa", "desc": "Sertakan tautan afiliasi pembelian buku original dan template ringkasan di bio profil."}],
    products: [{"title": "Panduan Lengkap Side Job Review Buku", "desc": "Langkah demi langkah memulai Review Buku dari nol, trik closing klien, dan template kerja siap pakai.", "price": "Rp 79.000", "badge": "Panduan Resmi", "url": "https://lynk.id/adithdigital/0yjgrk8np80y", "category": "Ebook", "sideJob": "Review Buku", "isPublished": true}]
  },
};

export const JOB_CATEGORIES = ["Admin", "Admin & Support", "Admin & Writing", "Creative", "Creative & Audio", "Customer Service", "Data & Admin", "Data & Language", "Digital Marketing", "Education", "Influencer Marketing", "Language", "Online Task", "Technology", "Writing & Content", "Writing & Marketing"] as const;

export type JobCategory = (typeof JOB_CATEGORIES)[number];

export const SKILL_CATEGORY_GROUPS: SkillCategoryGroup[] = [
  {
    "id": "admin_data",
    "name": "Administrasi & Data",
    "icon": "📊",
    "skills": [
      "Data entry",
      "Typing",
      "Spreadsheet",
      "Administrasi",
      "Administration",
      "Data organization",
      "Data validation",
      "Accuracy",
      "Attention to detail",
      "File management",
      "Document management",
      "Basic computer skills",
      "Scheduling",
      "Time management",
      "Organisasi",
      "Organization",
      "Following instructions",
      "Categorization"
    ]
  },
  {
    "id": "creative_visual",
    "name": "Kreatif & Visual",
    "icon": "🎨",
    "skills": [
      "Video editing",
      "Cutting",
      "Color grading",
      "Motion graphics",
      "Audio editing",
      "Visual composition",
      "Design principles",
      "Typography",
      "Color theory",
      "Layout",
      "Branding",
      "Image editing",
      "Composition",
      "Creativity",
      "Content awareness"
    ]
  },
  {
    "id": "writing_content",
    "name": "Menulis & Konten",
    "icon": "✍️",
    "skills": [
      "Copywriting",
      "Writing",
      "Storytelling",
      "Persuasion",
      "Headline writing",
      "Editing",
      "Proofreading",
      "Content creation",
      "Content planning",
      "Summarization",
      "Reading",
      "Audience understanding"
    ]
  },
  {
    "id": "marketing_sosmed",
    "name": "Marketing & Medsos",
    "icon": "📱",
    "skills": [
      "Social media strategy",
      "Analytics",
      "Trend research",
      "Community management",
      "Keyword research",
      "SEO strategy",
      "On-page SEO",
      "Technical SEO",
      "Content optimization",
      "Competitor research",
      "Link building",
      "Data analysis",
      "Email strategy",
      "Segmentation",
      "Automation",
      "A/B testing",
      "Influencer research",
      "Outreach",
      "Campaign management"
    ]
  },
  {
    "id": "comm_service",
    "name": "Komunikasi & Support",
    "icon": "🎧",
    "skills": [
      "Komunikasi",
      "Communication",
      "Customer service",
      "Empathy",
      "Problem solving",
      "Patience",
      "Active listening",
      "Conflict resolution",
      "Product knowledge",
      "Negotiation",
      "Relationship management",
      "Teaching",
      "Presentation",
      "Lesson planning",
      "Explanation"
    ]
  },
  {
    "id": "tech_language",
    "name": "Teknologi & Bahasa",
    "icon": "🌐",
    "skills": [
      "Testing",
      "Bug reporting",
      "Critical thinking",
      "Usability testing",
      "Documentation",
      "Mobile knowledge",
      "Analytical thinking",
      "Website testing",
      "Navigation testing",
      "Basic web knowledge",
      "Language proficiency",
      "Grammar",
      "Vocabulary",
      "Cultural awareness",
      "Terminology",
      "Listening",
      "Concentration",
      "Language comprehension",
      "Voice control",
      "Pronunciation",
      "Articulation",
      "Acting",
      "Script reading",
      "Audio recording",
      "Emotion"
    ]
  }
];

export const MASTER_SKILLS_LIST: MasterSkill[] = [
  {
    "name": "Administrasi",
    "sideJobs": [
      "va"
    ]
  },
  {
    "name": "komunikasi",
    "sideJobs": [
      "va"
    ]
  },
  {
    "name": "manajemen waktu",
    "sideJobs": [
      "va"
    ]
  },
  {
    "name": "riset",
    "sideJobs": [
      "va"
    ]
  },
  {
    "name": "data entry",
    "sideJobs": [
      "admin",
      "microtask",
      "va"
    ]
  },
  {
    "name": "customer service",
    "sideJobs": [
      "customersupport",
      "va"
    ]
  },
  {
    "name": "organisasi",
    "sideJobs": [
      "va"
    ]
  },
  {
    "name": "problem solving",
    "sideJobs": [
      "apptester",
      "customersupport",
      "va"
    ]
  },
  {
    "name": "Google Workspace",
    "sideJobs": [
      "va"
    ]
  },
  {
    "name": "attention to detail",
    "sideJobs": [
      "admin",
      "apptester",
      "dataentry",
      "graphicdesigner",
      "jasaketik",
      "transcription",
      "translator",
      "va",
      "videoeditor",
      "websitetester"
    ]
  },
  {
    "name": "Video editing",
    "sideJobs": [
      "videoeditor"
    ]
  },
  {
    "name": "storytelling",
    "sideJobs": [
      "copywriter",
      "reviewbuku",
      "videoeditor",
      "voiceover"
    ]
  },
  {
    "name": "cutting",
    "sideJobs": [
      "videoeditor"
    ]
  },
  {
    "name": "color grading",
    "sideJobs": [
      "videoeditor"
    ]
  },
  {
    "name": "audio editing",
    "sideJobs": [
      "videoeditor"
    ]
  },
  {
    "name": "motion graphics",
    "sideJobs": [
      "videoeditor"
    ]
  },
  {
    "name": "visual composition",
    "sideJobs": [
      "videoeditor"
    ]
  },
  {
    "name": "creativity",
    "sideJobs": [
      "copywriter",
      "graphicdesigner",
      "reviewbuku",
      "socialmedia",
      "videoeditor"
    ]
  },
  {
    "name": "content awareness",
    "sideJobs": [
      "videoeditor"
    ]
  },
  {
    "name": "Content planning",
    "sideJobs": [
      "socialmedia"
    ]
  },
  {
    "name": "copywriting",
    "sideJobs": [
      "influenceroutreach",
      "seo",
      "socialmedia"
    ]
  },
  {
    "name": "social media strategy",
    "sideJobs": [
      "socialmedia"
    ]
  },
  {
    "name": "analytics",
    "sideJobs": [
      "emailmarketer",
      "seo",
      "socialmedia"
    ]
  },
  {
    "name": "communication",
    "sideJobs": [
      "admin",
      "apptester",
      "reviewbuku",
      "socialmedia",
      "tutor",
      "voiceover",
      "websitetester"
    ]
  },
  {
    "name": "research",
    "sideJobs": [
      "copywriter",
      "dataentry",
      "influenceroutreach",
      "microtask",
      "socialmedia",
      "transcription",
      "translator"
    ]
  },
  {
    "name": "trend research",
    "sideJobs": [
      "socialmedia"
    ]
  },
  {
    "name": "scheduling",
    "sideJobs": [
      "admin",
      "socialmedia"
    ]
  },
  {
    "name": "community management",
    "sideJobs": [
      "socialmedia"
    ]
  },
  {
    "name": "Design principles",
    "sideJobs": [
      "graphicdesigner"
    ]
  },
  {
    "name": "typography",
    "sideJobs": [
      "graphicdesigner"
    ]
  },
  {
    "name": "color theory",
    "sideJobs": [
      "graphicdesigner"
    ]
  },
  {
    "name": "layout",
    "sideJobs": [
      "graphicdesigner"
    ]
  },
  {
    "name": "branding",
    "sideJobs": [
      "graphicdesigner"
    ]
  },
  {
    "name": "visual communication",
    "sideJobs": [
      "graphicdesigner"
    ]
  },
  {
    "name": "image editing",
    "sideJobs": [
      "graphicdesigner"
    ]
  },
  {
    "name": "composition",
    "sideJobs": [
      "graphicdesigner"
    ]
  },
  {
    "name": "Typing",
    "sideJobs": [
      "dataentry",
      "jasaketik"
    ]
  },
  {
    "name": "accuracy",
    "sideJobs": [
      "dataentry",
      "jasaketik",
      "microtask",
      "transcription",
      "translator"
    ]
  },
  {
    "name": "data organization",
    "sideJobs": [
      "dataentry"
    ]
  },
  {
    "name": "spreadsheet",
    "sideJobs": [
      "admin",
      "dataentry"
    ]
  },
  {
    "name": "data validation",
    "sideJobs": [
      "dataentry"
    ]
  },
  {
    "name": "time management",
    "sideJobs": [
      "admin",
      "dataentry",
      "jasaketik",
      "microtask",
      "transcription"
    ]
  },
  {
    "name": "file management",
    "sideJobs": [
      "dataentry"
    ]
  },
  {
    "name": "basic computer skills",
    "sideJobs": [
      "dataentry",
      "microtask"
    ]
  },
  {
    "name": "Writing",
    "sideJobs": [
      "copywriter"
    ]
  },
  {
    "name": "persuasion",
    "sideJobs": [
      "copywriter",
      "emailmarketer"
    ]
  },
  {
    "name": "marketing",
    "sideJobs": [
      "copywriter"
    ]
  },
  {
    "name": "psychology",
    "sideJobs": [
      "copywriter"
    ]
  },
  {
    "name": "headline writing",
    "sideJobs": [
      "copywriter"
    ]
  },
  {
    "name": "editing",
    "sideJobs": [
      "copywriter"
    ]
  },
  {
    "name": "audience understanding",
    "sideJobs": [
      "copywriter"
    ]
  },
  {
    "name": "Communication",
    "sideJobs": [
      "customersupport",
      "influenceroutreach"
    ]
  },
  {
    "name": "empathy",
    "sideJobs": [
      "customersupport",
      "tutor"
    ]
  },
  {
    "name": "product knowledge",
    "sideJobs": [
      "customersupport"
    ]
  },
  {
    "name": "patience",
    "sideJobs": [
      "customersupport",
      "tutor"
    ]
  },
  {
    "name": "typing",
    "sideJobs": [
      "customersupport",
      "microtask",
      "transcription"
    ]
  },
  {
    "name": "active listening",
    "sideJobs": [
      "customersupport"
    ]
  },
  {
    "name": "conflict resolution",
    "sideJobs": [
      "customersupport"
    ]
  },
  {
    "name": "organization",
    "sideJobs": [
      "admin",
      "customersupport",
      "influenceroutreach",
      "jasaketik"
    ]
  },
  {
    "name": "Keyword research",
    "sideJobs": [
      "seo"
    ]
  },
  {
    "name": "SEO strategy",
    "sideJobs": [
      "seo"
    ]
  },
  {
    "name": "on-page SEO",
    "sideJobs": [
      "seo"
    ]
  },
  {
    "name": "technical SEO",
    "sideJobs": [
      "seo"
    ]
  },
  {
    "name": "content optimization",
    "sideJobs": [
      "seo"
    ]
  },
  {
    "name": "competitor research",
    "sideJobs": [
      "seo"
    ]
  },
  {
    "name": "link building",
    "sideJobs": [
      "seo"
    ]
  },
  {
    "name": "data analysis",
    "sideJobs": [
      "seo"
    ]
  },
  {
    "name": "Copywriting",
    "sideJobs": [
      "emailmarketer"
    ]
  },
  {
    "name": "email strategy",
    "sideJobs": [
      "emailmarketer"
    ]
  },
  {
    "name": "segmentation",
    "sideJobs": [
      "emailmarketer"
    ]
  },
  {
    "name": "automation",
    "sideJobs": [
      "emailmarketer"
    ]
  },
  {
    "name": "design",
    "sideJobs": [
      "emailmarketer"
    ]
  },
  {
    "name": "A/B testing",
    "sideJobs": [
      "emailmarketer"
    ]
  },
  {
    "name": "customer research",
    "sideJobs": [
      "emailmarketer"
    ]
  },
  {
    "name": "CRM",
    "sideJobs": [
      "emailmarketer"
    ]
  },
  {
    "name": "negotiation",
    "sideJobs": [
      "influenceroutreach"
    ]
  },
  {
    "name": "influencer research",
    "sideJobs": [
      "influenceroutreach"
    ]
  },
  {
    "name": "outreach",
    "sideJobs": [
      "influenceroutreach"
    ]
  },
  {
    "name": "relationship management",
    "sideJobs": [
      "influenceroutreach"
    ]
  },
  {
    "name": "campaign management",
    "sideJobs": [
      "influenceroutreach"
    ]
  },
  {
    "name": "reporting",
    "sideJobs": [
      "influenceroutreach"
    ]
  },
  {
    "name": "Language proficiency",
    "sideJobs": [
      "translator"
    ]
  },
  {
    "name": "grammar",
    "sideJobs": [
      "jasaketik",
      "transcription",
      "translator"
    ]
  },
  {
    "name": "vocabulary",
    "sideJobs": [
      "translator"
    ]
  },
  {
    "name": "writing",
    "sideJobs": [
      "reviewbuku",
      "translator"
    ]
  },
  {
    "name": "proofreading",
    "sideJobs": [
      "jasaketik",
      "reviewbuku",
      "transcription",
      "translator"
    ]
  },
  {
    "name": "cultural awareness",
    "sideJobs": [
      "translator"
    ]
  },
  {
    "name": "terminology",
    "sideJobs": [
      "translator"
    ]
  },
  {
    "name": "Listening",
    "sideJobs": [
      "transcription"
    ]
  },
  {
    "name": "concentration",
    "sideJobs": [
      "transcription"
    ]
  },
  {
    "name": "language comprehension",
    "sideJobs": [
      "transcription"
    ]
  },
  {
    "name": "Subject knowledge",
    "sideJobs": [
      "tutor"
    ]
  },
  {
    "name": "teaching",
    "sideJobs": [
      "tutor"
    ]
  },
  {
    "name": "presentation",
    "sideJobs": [
      "tutor"
    ]
  },
  {
    "name": "lesson planning",
    "sideJobs": [
      "tutor"
    ]
  },
  {
    "name": "explanation",
    "sideJobs": [
      "tutor"
    ]
  },
  {
    "name": "adaptability",
    "sideJobs": [
      "tutor"
    ]
  },
  {
    "name": "technology",
    "sideJobs": [
      "tutor"
    ]
  },
  {
    "name": "Testing",
    "sideJobs": [
      "apptester"
    ]
  },
  {
    "name": "bug reporting",
    "sideJobs": [
      "apptester",
      "websitetester"
    ]
  },
  {
    "name": "critical thinking",
    "sideJobs": [
      "apptester",
      "reviewbuku",
      "websitetester"
    ]
  },
  {
    "name": "usability testing",
    "sideJobs": [
      "apptester"
    ]
  },
  {
    "name": "documentation",
    "sideJobs": [
      "admin",
      "apptester",
      "websitetester"
    ]
  },
  {
    "name": "mobile knowledge",
    "sideJobs": [
      "apptester"
    ]
  },
  {
    "name": "analytical thinking",
    "sideJobs": [
      "apptester",
      "websitetester"
    ]
  },
  {
    "name": "Usability testing",
    "sideJobs": [
      "websitetester"
    ]
  },
  {
    "name": "website testing",
    "sideJobs": [
      "websitetester"
    ]
  },
  {
    "name": "navigation testing",
    "sideJobs": [
      "websitetester"
    ]
  },
  {
    "name": "basic web knowledge",
    "sideJobs": [
      "websitetester"
    ]
  },
  {
    "name": "formatting",
    "sideJobs": [
      "jasaketik"
    ]
  },
  {
    "name": "document management",
    "sideJobs": [
      "jasaketik"
    ]
  },
  {
    "name": "computer skills",
    "sideJobs": [
      "jasaketik"
    ]
  },
  {
    "name": "Attention to detail",
    "sideJobs": [
      "microtask"
    ]
  },
  {
    "name": "categorization",
    "sideJobs": [
      "microtask"
    ]
  },
  {
    "name": "following instructions",
    "sideJobs": [
      "microtask"
    ]
  },
  {
    "name": "consistency",
    "sideJobs": [
      "microtask",
      "voiceover"
    ]
  },
  {
    "name": "Administration",
    "sideJobs": [
      "admin"
    ]
  },
  {
    "name": "email management",
    "sideJobs": [
      "admin"
    ]
  },
  {
    "name": "Voice control",
    "sideJobs": [
      "voiceover"
    ]
  },
  {
    "name": "pronunciation",
    "sideJobs": [
      "voiceover"
    ]
  },
  {
    "name": "articulation",
    "sideJobs": [
      "voiceover"
    ]
  },
  {
    "name": "acting",
    "sideJobs": [
      "voiceover"
    ]
  },
  {
    "name": "script reading",
    "sideJobs": [
      "voiceover"
    ]
  },
  {
    "name": "audio recording",
    "sideJobs": [
      "voiceover"
    ]
  },
  {
    "name": "emotion",
    "sideJobs": [
      "voiceover"
    ]
  },
  {
    "name": "Reading",
    "sideJobs": [
      "reviewbuku"
    ]
  },
  {
    "name": "analysis",
    "sideJobs": [
      "reviewbuku"
    ]
  },
  {
    "name": "summarization",
    "sideJobs": [
      "reviewbuku"
    ]
  },
  {
    "name": "content creation",
    "sideJobs": [
      "reviewbuku"
    ]
  }
];

export const MASTER_TOOLS_LIST: MasterTool[] = [
  {
    "name": "Canva",
    "sideJobs": [
      "copywriter",
      "emailmarketer",
      "graphicdesigner",
      "jasaketik",
      "reviewbuku",
      "socialmedia",
      "tutor",
      "videoeditor"
    ]
  },
  {
    "name": "Notion",
    "sideJobs": [
      "admin",
      "copywriter",
      "influenceroutreach",
      "reviewbuku",
      "socialmedia",
      "tutor",
      "va"
    ]
  },
  {
    "name": "Google Docs",
    "sideJobs": [
      "copywriter",
      "dataentry",
      "jasaketik",
      "reviewbuku",
      "transcription",
      "translator"
    ]
  },
  {
    "name": "Google Sheets",
    "sideJobs": [
      "apptester",
      "dataentry",
      "influenceroutreach",
      "microtask",
      "websitetester"
    ]
  },
  {
    "name": "Trello",
    "sideJobs": [
      "admin",
      "apptester",
      "va"
    ]
  },
  {
    "name": "CapCut",
    "sideJobs": [
      "socialmedia",
      "videoeditor",
      "voiceover"
    ]
  },
  {
    "name": "TikTok",
    "sideJobs": [
      "influenceroutreach",
      "reviewbuku",
      "socialmedia"
    ]
  },
  {
    "name": "Instagram",
    "sideJobs": [
      "influenceroutreach",
      "reviewbuku",
      "socialmedia"
    ]
  },
  {
    "name": "Gmail",
    "sideJobs": [
      "admin",
      "customersupport",
      "influenceroutreach"
    ]
  },
  {
    "name": "Google Workspace",
    "sideJobs": [
      "admin",
      "va"
    ]
  },
  {
    "name": "Microsoft Office",
    "sideJobs": [
      "admin",
      "va"
    ]
  },
  {
    "name": "Slack",
    "sideJobs": [
      "customersupport",
      "va"
    ]
  },
  {
    "name": "Zoom",
    "sideJobs": [
      "tutor",
      "va"
    ]
  },
  {
    "name": "Grammarly",
    "sideJobs": [
      "copywriter",
      "translator"
    ]
  },
  {
    "name": "Microsoft Word",
    "sideJobs": [
      "jasaketik",
      "transcription"
    ]
  },
  {
    "name": "BrowserStack",
    "sideJobs": [
      "apptester",
      "websitetester"
    ]
  },
  {
    "name": "Jira",
    "sideJobs": [
      "apptester",
      "websitetester"
    ]
  },
  {
    "name": "Excel",
    "sideJobs": [
      "admin",
      "microtask"
    ]
  },
  {
    "name": "Adobe Premiere Pro",
    "sideJobs": [
      "videoeditor"
    ]
  },
  {
    "name": "DaVinci Resolve",
    "sideJobs": [
      "videoeditor"
    ]
  },
  {
    "name": "After Effects",
    "sideJobs": [
      "videoeditor"
    ]
  },
  {
    "name": "Meta Business Suite",
    "sideJobs": [
      "socialmedia"
    ]
  },
  {
    "name": "Buffer",
    "sideJobs": [
      "socialmedia"
    ]
  },
  {
    "name": "Adobe Photoshop",
    "sideJobs": [
      "graphicdesigner"
    ]
  },
  {
    "name": "Illustrator",
    "sideJobs": [
      "graphicdesigner"
    ]
  },
  {
    "name": "Figma",
    "sideJobs": [
      "graphicdesigner"
    ]
  },
  {
    "name": "Microsoft Excel",
    "sideJobs": [
      "dataentry"
    ]
  },
  {
    "name": "Airtable",
    "sideJobs": [
      "dataentry"
    ]
  },
  {
    "name": "ChatGPT",
    "sideJobs": [
      "copywriter"
    ]
  },
  {
    "name": "Zendesk",
    "sideJobs": [
      "customersupport"
    ]
  },
  {
    "name": "Intercom",
    "sideJobs": [
      "customersupport"
    ]
  },
  {
    "name": "Freshdesk",
    "sideJobs": [
      "customersupport"
    ]
  },
  {
    "name": "WhatsApp",
    "sideJobs": [
      "customersupport"
    ]
  },
  {
    "name": "Google Search Console",
    "sideJobs": [
      "seo"
    ]
  },
  {
    "name": "Google Analytics",
    "sideJobs": [
      "seo"
    ]
  },
  {
    "name": "Ahrefs",
    "sideJobs": [
      "seo"
    ]
  },
  {
    "name": "Semrush",
    "sideJobs": [
      "seo"
    ]
  },
  {
    "name": "Screaming Frog",
    "sideJobs": [
      "seo"
    ]
  },
  {
    "name": "Mailchimp",
    "sideJobs": [
      "emailmarketer"
    ]
  },
  {
    "name": "Klaviyo",
    "sideJobs": [
      "emailmarketer"
    ]
  },
  {
    "name": "HubSpot",
    "sideJobs": [
      "emailmarketer"
    ]
  },
  {
    "name": "ConvertKit",
    "sideJobs": [
      "emailmarketer"
    ]
  },
  {
    "name": "Modash",
    "sideJobs": [
      "influenceroutreach"
    ]
  },
  {
    "name": "Upfluence",
    "sideJobs": [
      "influenceroutreach"
    ]
  },
  {
    "name": "DeepL",
    "sideJobs": [
      "translator"
    ]
  },
  {
    "name": "CAT Tools",
    "sideJobs": [
      "translator"
    ]
  },
  {
    "name": "Otter.ai",
    "sideJobs": [
      "transcription"
    ]
  },
  {
    "name": "Descript",
    "sideJobs": [
      "transcription"
    ]
  },
  {
    "name": "Whisper",
    "sideJobs": [
      "transcription"
    ]
  },
  {
    "name": "Headphones",
    "sideJobs": [
      "transcription"
    ]
  },
  {
    "name": "Google Meet",
    "sideJobs": [
      "tutor"
    ]
  },
  {
    "name": "Google Classroom",
    "sideJobs": [
      "tutor"
    ]
  },
  {
    "name": "Whiteboard",
    "sideJobs": [
      "tutor"
    ]
  },
  {
    "name": "Android/iOS",
    "sideJobs": [
      "apptester"
    ]
  },
  {
    "name": "Test IO",
    "sideJobs": [
      "apptester"
    ]
  },
  {
    "name": "Chrome",
    "sideJobs": [
      "websitetester"
    ]
  },
  {
    "name": "Firefox",
    "sideJobs": [
      "websitetester"
    ]
  },
  {
    "name": "Loom",
    "sideJobs": [
      "websitetester"
    ]
  },
  {
    "name": "OCR tools",
    "sideJobs": [
      "jasaketik"
    ]
  },
  {
    "name": "Browser",
    "sideJobs": [
      "microtask"
    ]
  },
  {
    "name": "platform microtask",
    "sideJobs": [
      "microtask"
    ]
  },
  {
    "name": "AI tools",
    "sideJobs": [
      "microtask"
    ]
  },
  {
    "name": "Audacity",
    "sideJobs": [
      "voiceover"
    ]
  },
  {
    "name": "Adobe Audition",
    "sideJobs": [
      "voiceover"
    ]
  },
  {
    "name": "microphone",
    "sideJobs": [
      "voiceover"
    ]
  },
  {
    "name": "headphones",
    "sideJobs": [
      "voiceover"
    ]
  },
  {
    "name": "audio interface",
    "sideJobs": [
      "voiceover"
    ]
  },
  {
    "name": "Goodreads",
    "sideJobs": [
      "reviewbuku"
    ]
  }
];

export const WORK_STYLES: WorkStyle[] = [
  {
    "id": "terstruktur",
    "label": "Terstruktur, Rapi & Detail",
    "desc": "Suka pekerjaan dengan alur SOP jelas, spreadsheet terorganisir, dan fokus mandiri.",
    "sideJobs": [
      "dataentry",
      "admin",
      "jasaketik",
      "transcription",
      "microtask"
    ]
  },
  {
    "id": "kreatif",
    "label": "Kreatif, Visual & Tren",
    "desc": "Menyukai visualisasi ide, editing video/grafis, dan mengikuti hal-hal viral di media sosial.",
    "sideJobs": [
      "videoeditor",
      "graphicdesigner",
      "socialmedia",
      "voiceover"
    ]
  },
  {
    "id": "komunikasi",
    "label": "Komunikatif & Membantu Orang",
    "desc": "Senang berinteraksi, memecahkan masalah orang lain, mengajar, atau koordinasi relasi.",
    "sideJobs": [
      "va",
      "customersupport",
      "influenceroutreach",
      "tutor"
    ]
  },
  {
    "id": "analitis",
    "label": "Analitis, Riset & Menulis",
    "desc": "Menyukai merangkai kata persuasif, riset kata kunci, analisis data, atau menguji bug sistem.",
    "sideJobs": [
      "copywriter",
      "seo",
      "emailmarketer",
      "apptester",
      "websitetester",
      "translator",
      "reviewbuku"
    ]
  }
];

export const READINESS_QUESTIONS: ReadinessQuestion[] = [
  {
    "id": "readiness_portfolio",
    "title": "Apakah kamu sudah memiliki portofolio / contoh hasil kerja nyata?",
    "options": [
      {
        "label": "Sudah lengkap dan tersusun rapi di link/folder khusus",
        "score": 25,
        "gap": null
      },
      {
        "label": "Baru punya 1-2 contoh tugas sederhana, belum profesional",
        "score": 12,
        "gap": "Portofolio karya belum tersusun profesional dan rapi"
      },
      {
        "label": "Belum punya portofolio sama sekali dari nol",
        "score": 0,
        "gap": "Belum memiliki portofolio atau contoh bukti karya nyata untuk ditunjukkan ke klien"
      }
    ]
  },
  {
    "id": "readiness_apply_place",
    "title": "Seberapa paham kamu mengenai tempat mencari dan cara apply side job ini?",
    "options": [
      {
        "label": "Sudah tahu platform terpercaya dan alur lamarnya dengan jelas",
        "score": 25,
        "gap": null
      },
      {
        "label": "Tahu beberapa nama websitenya, tapi belum pernah buat akun atau coba",
        "score": 10,
        "gap": "Belum pernah mendaftar akun atau mencoba alur apply di platform freelance resmi"
      },
      {
        "label": "Masih bingung harus mencari dan melamar ke mana",
        "score": 0,
        "gap": "Belum mengetahui daftar platform terbaik dan tempat berkumpulnya klien pencari jasa"
      }
    ]
  },
  {
    "id": "readiness_proposal",
    "title": "Pernahkah kamu membuat surat penawaran (proposal / pitch) langsung ke calon klien?",
    "options": [
      {
        "label": "Sudah sering dan tahu cara menulis pitch yang cepat disetujui",
        "score": 20,
        "gap": null
      },
      {
        "label": "Pernah coba 1-2 kali tapi masih ragu dan belum ada respons",
        "score": 8,
        "gap": "Formula proposal penawaran masih belum persuasif dan belum teruji tembus klien"
      },
      {
        "label": "Belum pernah sama sekali menulis proposal penawaran",
        "score": 0,
        "gap": "Belum pernah membuat surat penawaran atau pitch proposal penarik minat klien"
      }
    ]
  },
  {
    "id": "readiness_rate_pricing",
    "title": "Apakah kamu sudah tahu standar patokan harga jasa (rate card) dan cara negosiasi?",
    "options": [
      {
        "label": "Sudah punya patokan harga pasar dan percaya diri bernegosiasi",
        "score": 15,
        "gap": null
      },
      {
        "label": "Tahu perkiraan kasarnya saja, tapi takut mematok harga kemahalan/kemurahanan",
        "score": 7,
        "gap": "Masih ragu menentukan standar tarif (rate card) yang adil dan menguntungkan"
      },
      {
        "label": "Sama sekali belum tahu pasaran harga jasa ini",
        "score": 0,
        "gap": "Belum memahami standar rate pasar dan teknik negosiasi harga dengan klien"
      }
    ]
  },
  {
    "id": "readiness_time_commit",
    "title": "Berapa alokasi waktu luang yang bisa kamu sediakan secara rutin per hari?",
    "options": [
      {
        "label": "3 jam atau lebih per hari (Sangat Siap & Fleksibel)",
        "score": 15,
        "gap": null
      },
      {
        "label": "1 sampai 2 jam per hari di sela rutinitas",
        "score": 12,
        "gap": null
      },
      {
        "label": "Kurang dari 1 jam per hari, jadwal masih sangat padat",
        "score": 4,
        "gap": "Alokasi waktu luang harian masih terbatas sehingga perlu manajemen waktu ekstra"
      }
    ]
  }
];

export const REMOTE_JOBS_DB: RemoteJobItem[] = [
  {
    "id": "job-1",
    "title": "Remote Data Entry & Spreadsheet Specialist",
    "company": "PT Global Artha Solusindo",
    "location": "WFH / Remote Indonesia",
    "salary": "Rp 4.500.000 - Rp 6.200.000 / bln",
    "type": "Full-time Remote",
    "posted": "Hari ini",
    "primarySideJob": "Data Entry",
    "tags": [
      "Data Entry",
      "Excel",
      "Google Sheets",
      "Admin"
    ],
    "description": "Membantu verifikasi dan input data merchant ke spreadsheet. Fleksibel, butuh ketelitian tinggi dan kemampuan formula dasar Excel.",
    "applyUrl": "https://wa.me/628123456789?text=Halo%20saya%20tertarik%20melamar%20posisi%20Data%20Entry%20Remote"
  },
  {
    "id": "job-2",
    "title": "Executive Virtual Assistant (E-Commerce Brand)",
    "company": "Nexus Creative Studio SG",
    "location": "Remote (Klien Singapore)",
    "salary": "$450 - $750 / bln (~Rp 7.000.000 - Rp 11.500.000)",
    "type": "Part-time Remote",
    "posted": "Kemarin",
    "primarySideJob": "Virtual Assistant",
    "tags": [
      "Virtual Assistant",
      "Google Workspace",
      "Notion",
      "English"
    ],
    "description": "Mendampingi founder dalam mengelola jadwal meeting, koordinasi email klien, riset tren produk, dan administrasi ringan. Waktu kerja 4 jam per hari.",
    "applyUrl": "https://wa.me/628123456789?text=Halo%20saya%20tertarik%20melamar%20posisi%20Virtual%20Assistant%20Remote"
  },
  {
    "id": "job-3",
    "title": "Short-Form Video Editor (TikTok & Reels)",
    "company": "CreativeFlow Digital Agency",
    "location": "Remote Fleksibel",
    "salary": "Rp 150.000 - Rp 350.000 / video",
    "type": "Freelance Project",
    "posted": "2 hari lalu",
    "primarySideJob": "Video Editor",
    "tags": [
      "Video Editor",
      "CapCut",
      "Reels",
      "Premiere"
    ],
    "description": "Dibutuhkan video editor kreatif untuk mengolah rekaman podcast dan edukasi bisnis menjadi 20-30 video pendek viral setiap bulan dengan sound effects dan subtitle dinamis.",
    "applyUrl": "https://wa.me/628123456789?text=Halo%20saya%20tertarik%20melamar%20posisi%20Video%20Editor%20Remote"
  },
  {
    "id": "job-4",
    "title": "Remote Social Media Specialist & Content Planner",
    "company": "BrandNest Creative Labs",
    "location": "WFH / Luar Kota",
    "salary": "Rp 3.500.000 - Rp 5.000.000 / bln",
    "type": "Part-time Remote",
    "posted": "1 hari lalu",
    "primarySideJob": "Social Media Management",
    "tags": [
      "Social Media",
      "Canva",
      "Copywriting",
      "Instagram"
    ],
    "description": "Menyusun content calendar bulanan, membuat brief desain grafis di Canva, dan menulis caption menarik untuk 2 brand consumer goods lokal.",
    "applyUrl": "https://wa.me/628123456789?text=Halo%20saya%20tertarik%20melamar%20posisi%20Social%20Media%20Remote"
  },
  {
    "id": "job-5",
    "title": "Junior Copywriter & Ads Script Writer",
    "company": "Lumina Growth Media",
    "location": "Remote Se-Indonesia",
    "salary": "Rp 3.500.000 - Rp 5.500.000 / bln",
    "type": "Contract Remote",
    "posted": "Hari ini",
    "primarySideJob": "Copywriter",
    "tags": [
      "Copywriter",
      "Storytelling",
      "Ads",
      "Content Writing"
    ],
    "description": "Menulis naskah video iklan promosi TikTok, email broadcast, dan artikel ulasan produk edukasi. Fleksibel, bisa disesuaikan dengan jadwal perkuliahan.",
    "applyUrl": "https://wa.me/628123456789?text=Halo%20saya%20tertarik%20melamar%20posisi%20Copywriter%20Remote"
  },
  {
    "id": "job-6",
    "title": "Online Customer Support & Live Chat Specialist",
    "company": "FinTech Solusi Global",
    "location": "Remote Shift (Pagi / Malam)",
    "salary": "Rp 4.000.000 - Rp 5.800.000 / bln",
    "type": "Full-time Remote",
    "posted": "3 hari lalu",
    "primarySideJob": "Customer Support",
    "tags": [
      "Customer Support",
      "Zendesk",
      "WhatsApp",
      "Live Chat"
    ],
    "description": "Melayani chat pertanyaan pengguna aplikasi, membantu aktivasi akun, dan mencatat feedback sistem. Diberikan training lengkap sebelum onboarding.",
    "applyUrl": "https://wa.me/628123456789?text=Halo%20saya%20tertarik%20melamar%20posisi%20Customer%20Support%20Remote"
  },
  {
    "id": "job-7",
    "title": "Remote Admin Toko Online & Rekap Orderan",
    "company": "BeautyCare Official Store",
    "location": "WFH / Jam Fleksibel",
    "salary": "Rp 2.800.000 - Rp 4.200.000 / bln",
    "type": "Part-time Remote",
    "posted": "Hari ini",
    "primarySideJob": "Admin",
    "tags": [
      "Admin",
      "Data Entry",
      "Order Management",
      "WhatsApp"
    ],
    "description": "Merekap orderan marketplace harian, koordinasi nomor resi pengiriman, dan mengecek ketersediaan stok barang melalui spreadsheet bersama tim gudang.",
    "applyUrl": "https://wa.me/628123456789?text=Halo%20saya%20tertarik%20melamar%20posisi%20Admin%20Online%20Remote"
  },
  {
    "id": "job-8",
    "title": "Graphic Designer for Social Media Feeds",
    "company": "Studio Ruang Visual",
    "location": "Remote Project",
    "salary": "Rp 50.000 - Rp 120.000 / post",
    "type": "Freelance Project",
    "posted": "Kemarin",
    "primarySideJob": "Graphic Designer",
    "tags": [
      "Graphic Designer",
      "Canva",
      "Figma",
      "Branding"
    ],
    "description": "Membuat template feed carousel dan banner promosi mingguan untuk klien F&B dan fashion. Disediakan asset foto dan brand guidelines lengkap.",
    "applyUrl": "https://wa.me/628123456789?text=Halo%20saya%20tertarik%20melamar%20posisi%20Graphic%20Designer%20Remote"
  },
  {
    "id": "job-9",
    "title": "Audio Transcriptionist & Subtitle Editor",
    "company": "Transkrip Digital Nusantara",
    "location": "Remote Fleksibel",
    "salary": "Rp 25.000 - Rp 45.000 / audio menit",
    "type": "Freelance",
    "posted": "4 hari lalu",
    "primarySideJob": "Transcription",
    "tags": [
      "Transcription",
      "Jasa Ketik",
      "Word",
      "Audio"
    ],
    "description": "Mendengarkan rekaman wawancara dan menyusun naskah transkrip rapi sesuai standar clean verbatim. Bebas ambil proyek sesuai kuota waktu luang.",
    "applyUrl": "https://wa.me/628123456789?text=Halo%20saya%20tertarik%20melamar%20posisi%20Transkripsi%20Remote"
  },
  {
    "id": "job-10",
    "title": "Mobile App & Website QA Tester",
    "company": "TestNest Asia Technologies",
    "location": "Remote / On-demand",
    "salary": "Rp 500.000 - Rp 1.500.000 / project test",
    "type": "Freelance Testing",
    "posted": "2 hari lalu",
    "primarySideJob": "App Tester",
    "tags": [
      "App Tester",
      "Bug Reporting",
      "Android",
      "iOS"
    ],
    "description": "Mencoba fitur baru pada aplikasi belanja dan fintech sebelum rilis. Menuliskan laporan langkah demi langkah jika menemukan kendala error atau tampilan janggal.",
    "applyUrl": "https://wa.me/628123456789?text=Halo%20saya%20tertarik%20melamar%20posisi%20App%20Tester%20Remote"
  },
  {
    "id": "job-11",
    "title": "Voice Over Talent untuk E-Learning & Iklan",
    "company": "SuaraKreasi Audio Lab",
    "location": "Home Studio / Remote",
    "salary": "Rp 200.000 - Rp 600.000 / naskah",
    "type": "Freelance VO",
    "posted": "3 hari lalu",
    "primarySideJob": "Voice Over Talent",
    "tags": [
      "Voice Over",
      "Audio",
      "Recording",
      "Storytelling"
    ],
    "description": "Membacakan naskah edukasi perbankan dan konten iklan digital berdurasi 1-3 menit dengan artikulasi ramah, jelas, dan kualitas audio bebas noise.",
    "applyUrl": "https://wa.me/628123456789?text=Halo%20saya%20tertarik%20melamar%20posisi%20Voice%20Over%20Remote"
  },
  {
    "id": "job-12",
    "title": "SEO Specialist & Content Optimizer",
    "company": "Digital Reach Agency",
    "location": "Remote / Fleksibel",
    "salary": "Rp 3.500.000 - Rp 6.000.000 / bln",
    "type": "Part-time Remote",
    "posted": "Hari ini",
    "primarySideJob": "SEO Specialist",
    "tags": [
      "SEO",
      "Keyword Research",
      "Analytics",
      "Google Docs"
    ],
    "description": "Melakukan riset keyword dan optimasi artikel blog agar menduduki peringkat satu di Google. Laporan bulanan traffic dan backlink.",
    "applyUrl": "https://wa.me/628123456789?text=Halo%20saya%20tertarik%20melamar%20posisi%20SEO%20Remote"
  }
];

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


/**
 * Helper normalisasi Link Lynk.id agar selalu valid
 */
export function normalizeLynkUrl(rawUrl: string): string {
  let url = (rawUrl || '').trim();
  if (!url) return 'https://lynk.id/adithdigital';
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = `https://${url}`;
  }
  return url;
}

/**
 * Helper kategori loker
 */
export function getJobCategory(job: { primarySideJob?: string; tags?: string[] }): string {
  if (job.primarySideJob && (JOB_CATEGORIES as readonly string[]).includes(job.primarySideJob)) {
    return job.primarySideJob;
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
