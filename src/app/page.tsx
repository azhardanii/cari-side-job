'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import {
  SIDE_JOBS_DB,
  REMOTE_JOBS_DB,
  MASTER_SKILLS_LIST,
  MASTER_TOOLS_LIST,
  SKILL_CATEGORY_GROUPS,
  WORK_STYLES,
  SideJob,
  RemoteJobItem,
  ProductItem,
  normalizeLynkUrl,
  getJobCategory,
} from '@/lib/data';
import {
  BrandLogo,
  HeroCharacterVisual,
  EnvelopeChecklistVisual,
  ThumbsUpCharacterVisual,
  ProductCover3D,
} from '@/components/Illustrations';
import {
  Home,
  FileText,
  ShoppingBag,
  User,
  Search,
  Briefcase,
  ChevronRight,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
  Lock,
  Check,
  CheckCircle2,
  Sparkles,
  Share2,
  Download,
  GraduationCap,
  Laptop,
  Building2,
  HelpCircle,
  MessageSquare,
  Phone,
  Mail,
  ExternalLink,
  Bell,
  RotateCcw,
  Layers,
  Settings,
  LogOut,
  X,
  FileCheck,
} from 'lucide-react';

interface UserAnswers {
  profesi: string;
  profesiCustom: string;
  skills: string[];
  tools: string[];
  caraKerja: string | null;
  englishLevel: number;
  timeCommitment: string;
}

interface CalculatedResult {
  topMatches: (SideJob & { matchPercent: number; rank: number })[];
  persona: {
    name: string;
    icon: string;
    tagline: string;
    traits: string[];
  };
  readinessScore: number;
  gaps: string[];
  strengths: string[];
}

export default function HomePage() {
  // Navigation State: 'beranda' | 'quiz' | 'lead' | 'hasil' | 'rekomendasi' | 'akun'
  const [currentTab, setCurrentTab] = useState<'beranda' | 'quiz' | 'lead' | 'hasil' | 'rekomendasi' | 'akun'>('beranda');
  const [quizStep, setQuizStep] = useState<number>(1); // 1 to 6

  // User form data
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({
    profesi: '',
    profesiCustom: '',
    skills: [],
    tools: [],
    caraKerja: null,
    englishLevel: 3,
    timeCommitment: '2-4',
  });

  const [leadData, setLeadData] = useState({
    name: '',
    wa: '',
    email: '',
  });

  const [calculatedResult, setCalculatedResult] = useState<CalculatedResult | null>(null);
  const [remoteJobs, setRemoteJobs] = useState<RemoteJobItem[]>(REMOTE_JOBS_DB);
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);

  // Search & Filter States
  const [selectedSkillCategory, setSelectedSkillCategory] = useState<string>('all');
  const [skillSearch, setSkillSearch] = useState('');
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [toolSearch, setToolSearch] = useState('');
  const [showAllTools, setShowAllTools] = useState(false);
  const [productCategoryFilter, setProductCategoryFilter] = useState<'Semua' | 'Ebook' | 'Template' | 'Kursus' | 'Tools'>('Semua');

  // Modals
  const [isRemoteJobsOpen, setIsRemoteJobsOpen] = useState(false);
  const [isDetailExplanationOpen, setIsDetailExplanationOpen] = useState(false);
  const [selectedProductDetail, setSelectedProductDetail] = useState<ProductItem | null>(null);
  const [remoteJobFilter, setRemoteJobFilter] = useState<string>('all');
  const [liveProducts, setLiveProducts] = useState<ProductItem[]>([]);

  // Load session from localStorage on mount & fetch live jobs and products
  useEffect(() => {
    const saved = localStorage.getItem('arah_user_result');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.result && parsed.lead) {
          setCalculatedResult(parsed.result);
          setLeadData(parsed.lead);
        }
      } catch (e) {
        console.warn('Gagal memuat session:', e);
      }
    }

    // Fetch live remote jobs from API
    fetch('/api/jobs')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.jobs) && data.jobs.length > 0) {
          setRemoteJobs(data.jobs);
        }
      })
      .catch((err) => console.warn('Using static remote jobs:', err));

    // Fetch live products from database
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.products)) {
          setLiveProducts(data.products);
        }
      })
      .catch((err) => console.warn('Gagal memuat produk dari database:', err));
  }, []);

  const switchTab = (tab: 'beranda' | 'quiz' | 'lead' | 'hasil' | 'rekomendasi' | 'akun') => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const startNewQuiz = () => {
    setQuizStep(1);
    setUserAnswers({
      profesi: '',
      profesiCustom: '',
      skills: [],
      tools: [],
      caraKerja: null,
      englishLevel: 3,
      timeCommitment: '2-4',
    });
    switchTab('quiz');
  };

  // Algorithm scoring calculation with actual weighted skills from All Data.html
  const calculateResult = (): CalculatedResult => {
    const scores: Record<string, number> = {};
    const matchedSkillsMap: Record<string, string[]> = {};
    const missingSkillsMap: Record<string, string[]> = {};

    Object.keys(SIDE_JOBS_DB).forEach((jobKey) => {
      scores[jobKey] = 10;
      matchedSkillsMap[jobKey] = [];
      missingSkillsMap[jobKey] = [];
    });

    const userSkillsLower = userAnswers.skills.map((s) => s.toLowerCase());

    Object.entries(SIDE_JOBS_DB).forEach(([jobKey, job]) => {
      job.skills.forEach((skillName) => {
        const sLower = skillName.toLowerCase();
        const weight = job.skillWeights[skillName] || 4;
        const isMatched = userSkillsLower.some(
          (u) => u === sLower || u.includes(sLower) || sLower.includes(u)
        );

        if (isMatched) {
          scores[jobKey] += weight * 4.5;
          matchedSkillsMap[jobKey].push(skillName);
        } else {
          missingSkillsMap[jobKey].push(skillName);
        }
      });

      // Tool matching
      const userToolsLower = userAnswers.tools.map((t) => t.toLowerCase());
      job.tools.forEach((toolName) => {
        const tLower = toolName.toLowerCase();
        if (userToolsLower.some((u) => u === tLower || u.includes(tLower) || tLower.includes(u))) {
          scores[jobKey] += 8;
        }
      });

      // Work style matching
      if (userAnswers.caraKerja) {
        const style = WORK_STYLES.find((w) => w.id === userAnswers.caraKerja);
        if (style && style.sideJobs.includes(jobKey)) {
          scores[jobKey] += 15;
        }
      }

      // English level matching
      const eng = userAnswers.englishLevel;
      const reqEng = job.keperluanEnglish;
      if (eng >= reqEng) scores[jobKey] += 10;
      else if (reqEng - eng === 1) scores[jobKey] += 4;
    });

    const sortedKeys = Object.keys(scores).sort((a, b) => scores[b] - scores[a]);
    const top1Key = sortedKeys[0] || 'va';
    const top2Key = sortedKeys[1] || 'copywriter';
    const top3Key = sortedKeys[2] || 'dataentry';

    const maxScore = Math.max(scores[top1Key], 50);
    const getMatchPercent = (key: string, rank: number) => {
      const raw = Math.round((scores[key] / maxScore) * 96);
      if (rank === 1) return Math.min(Math.max(raw, 88), 98);
      if (rank === 2) return Math.min(Math.max(raw - 4, 82), 92);
      return Math.min(Math.max(raw - 8, 75), 87);
    };

    const topMatches = [
      { ...SIDE_JOBS_DB[top1Key], matchPercent: getMatchPercent(top1Key, 1), rank: 1 },
      { ...SIDE_JOBS_DB[top2Key], matchPercent: getMatchPercent(top2Key, 2), rank: 2 },
      { ...SIDE_JOBS_DB[top3Key], matchPercent: getMatchPercent(top3Key, 3), rank: 3 },
    ];

    let readiness = 80;
    if (userAnswers.englishLevel >= 4) readiness += 6;
    if (userAnswers.skills.length >= 4) readiness += 8;
    if (userAnswers.tools.length >= 3) readiness += 4;
    if (readiness > 98) readiness = 98;

    const topJob = SIDE_JOBS_DB[top1Key];
    const topStrengths = matchedSkillsMap[top1Key].slice(0, 3);
    const fallbackStrengths = topJob.skills.slice(0, 3);
    const strengths = topStrengths.length > 0 ? topStrengths : fallbackStrengths;

    const topGaps = missingSkillsMap[top1Key].slice(0, 2);
    const fallbackGaps = ['Optimasi Portofolio Freelance', 'Standardisasi Rate Card Jasa'];
    const gaps = topGaps.length > 0 ? topGaps.map((g) => `Pendalaman: ${g}`) : fallbackGaps;

    // Traits by category
    const cat = topJob.kategori.toLowerCase();
    let traits = ['Teliti', 'Terorganisir', 'Konsisten'];
    if (cat.includes('creative') || cat.includes('audio')) {
      traits = ['Kreatif', 'Visual', 'Peka Tren'];
    } else if (cat.includes('marketing') || cat.includes('writing')) {
      traits = ['Persuasif', 'Storyteller', 'Strategis'];
    } else if (cat.includes('customer') || cat.includes('support') || cat.includes('education')) {
      traits = ['Komunikatif', 'Empatis', 'Solutif'];
    } else if (cat.includes('tech') || cat.includes('technology')) {
      traits = ['Kritis', 'Detail-Oriented', 'Problem Solver'];
    } else if (cat.includes('language')) {
      traits = ['Bilingual', 'Cermat', 'Artikulatif'];
    }

    return {
      topMatches,
      persona: {
        name: topJob.persona,
        icon: topJob.icon,
        tagline: topJob.tagline,
        traits,
      },
      readinessScore: readiness,
      gaps,
      strengths,
    };
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadData.name.trim() || !leadData.wa.trim() || !leadData.email.trim()) {
      alert('Harap lengkapi semua kolom formulir.');
      return;
    }

    setIsSubmittingLead(true);
    const computed = calculateResult();
    setCalculatedResult(computed);

    // Save to localStorage
    localStorage.setItem(
      'arah_user_result',
      JSON.stringify({ lead: leadData, result: computed })
    );

    // Persist to Supabase
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: leadData.name,
          wa: leadData.wa,
          email: leadData.email,
          profesi: userAnswers.profesi === 'Lainnya' ? userAnswers.profesiCustom : userAnswers.profesi,
          topMatch: `${computed.topMatches[0].name} (${computed.topMatches[0].matchPercent}%)`,
          topMatchScore: computed.topMatches[0].matchPercent,
          readinessScore: computed.readinessScore,
          personaName: computed.persona.name,
          skills: userAnswers.skills,
          tools: userAnswers.tools,
          gaps: computed.gaps,
          topMatches: computed.topMatches,
        }),
      });
    } catch (err) {
      console.warn('Network sync error:', err);
    } finally {
      setIsSubmittingLead(false);
      switchTab('hasil');
      confetti({
        particleCount: 85,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0074FC', '#3E37F9', '#00AE66', '#FB9F05'],
      });
    }
  };

  const shareToWhatsApp = () => {
    if (!calculatedResult) return;
    const topJob = calculatedResult.topMatches[0];
    const text = encodeURIComponent(
      `Hai! Aku baru saja tes pemetaan side job di Cari Side Job. Karakterku adalah "${calculatedResult.persona.name}" dengan side job paling cocok: ${topJob.name} (${topJob.matchPercent}% cocok)! Cek punyamu di https://carisidejob.id`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  // Canvas 9:16 Generator
  const downloadStoryAsImage = () => {
    if (!calculatedResult) return;
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1920;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background Gradient Tech Ink & Blue
    const bgGrad = ctx.createLinearGradient(0, 0, 1080, 1920);
    bgGrad.addColorStop(0, '#0A0E2E');
    bgGrad.addColorStop(0.5, '#0F3BA0');
    bgGrad.addColorStop(1, '#0074FC');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1080, 1920);

    // Header Badge
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.roundRect(80, 120, 260, 60, 16);
    ctx.fill();

    ctx.fillStyle = '#0A0E2E';
    ctx.font = 'bold 26px Plus Jakarta Sans, sans-serif';
    ctx.fillText('CARI SIDE JOB', 105, 160);

    // Persona
    ctx.textAlign = 'center';
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 54px Plus Jakarta Sans, sans-serif';
    ctx.fillText(`“${calculatedResult.persona.name}”`, 540, 520);

    ctx.fillStyle = '#93C5FD';
    ctx.font = '600 32px Plus Jakarta Sans, sans-serif';
    ctx.fillText(calculatedResult.topMatches[0].name, 540, 580);

    // Top 3 Matches Box
    ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.beginPath();
    ctx.roundRect(140, 720, 800, 480, 28);
    ctx.fill();

    ctx.textAlign = 'left';
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 32px Plus Jakarta Sans, sans-serif';
    ctx.fillText('SIDE JOB YANG COCOK UNTUK KAMU:', 180, 790);

    calculatedResult.topMatches.forEach((j, i) => {
      const yPos = 890 + i * 105;
      ctx.fillStyle = i === 0 ? '#34D399' : '#FFFFFF';
      ctx.font = 'bold 36px Plus Jakarta Sans, sans-serif';
      ctx.fillText(`${i + 1}. ${j.name}`, 180, yPos);

      ctx.textAlign = 'right';
      ctx.fillStyle = '#FDE68A';
      ctx.fillText(`${j.matchPercent}% Cocok`, 900, yPos);
      ctx.textAlign = 'left';
    });

    // Watermark
    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = '600 28px Plus Jakarta Sans, sans-serif';
    ctx.fillText('Temukan Side Job Kamu di carisidejob.id', 540, 1800);

    const link = document.createElement('a');
    link.download = `CariSideJob_${(leadData.name || 'hasil').replace(/\s+/g, '_')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  // Profesi options list
  const profesiList = [
    { id: 'Mahasiswa / Pelajar', label: 'Mahasiswa / Pelajar', icon: '🎓' },
    { id: 'Karyawan', label: 'Karyawan', icon: '💼' },
    { id: 'Freelancer', label: 'Freelancer', icon: '💻' },
    { id: 'Ibu rumah tangga', label: 'Ibu rumah tangga', icon: '🏠' },
    { id: 'Sedang mencari pekerjaan', label: 'Sedang mencari pekerjaan', icon: '🔍' },
    { id: 'Lainnya', label: 'Lainnya', subtext: 'Diisi sendiri selain pilihan diatas', icon: '💬' },
  ];

  // Curated skills from 10 skills per side job in All Data.html
  const allMasterSkills = Array.from(new Set(MASTER_SKILLS_LIST.map((s) => s.name)));
  const defaultTools = MASTER_TOOLS_LIST.map((t) => t.name);

  // Work styles
  const workStylesList = [
    {
      id: 'terstruktur',
      label: 'Terstruktur & Rapi',
      desc: 'Suka pekerjaan dengan alur, data terorganisir, dan SOP yang jelas.',
      icon: '📋',
    },
    {
      id: 'fleksibel',
      label: 'Fleksibel & Mandiri',
      desc: 'Bebas eksplorasi ide kreatif tanpa perlu mikromanajemen jadwal ketat.',
      icon: '⚡',
    },
    {
      id: 'kolaboratif',
      label: 'Kolaboratif & Komunikatif',
      desc: 'Nyaman berdiskusi, membantu orang lain, dan berkoordinasi dalam tim.',
      icon: '👥',
    },
    {
      id: 'eksekusi',
      label: 'Berorientasi Target Cepat',
      desc: 'Fokus pada hasil akhir, eksekusi tanggap, dan problem solving taktis.',
      icon: '🎯',
    },
  ];

  // English levels
  const englishLevels = [
    { level: 1, label: 'Level 1: Pemula', desc: 'Hanya memahami kosakata dasar sehari-hari' },
    { level: 2, label: 'Level 2: Pasif', desc: 'Bisa membaca dan memahami instruksi tertulis sederhana' },
    { level: 3, label: 'Level 3: Menengah', desc: 'Bisa berkomunikasi lewat chat tertulis dengan klien' },
    { level: 4, label: 'Level 4: Aktif', desc: 'Nyaman berbicara saat meeting online dan wawancara' },
    { level: 5, label: 'Level 5: Fasih (Fluent)', desc: 'Sangat lancar layaknya penutur asli (bilingual)' },
  ];

  // Time commitment
  const timeCommitments = [
    { id: '1-2', label: '1 - 2 Jam / hari', desc: 'Sambilan santai di sela waktu luang (mikro-tugas/admin)' },
    { id: '2-4', label: '2 - 4 Jam / hari', desc: 'Freelance part-time ideal untuk pendapatan sampingan stabil' },
    { id: '4-6', label: '4 - 6 Jam / hari', desc: 'Side job intensif dengan potensi pendapatan melampaui UMR' },
    { id: '6+', label: 'Lebih dari 6 Jam / hari', desc: 'Persiapan penuh untuk transisi ke full-time remote worker' },
  ];

  // Live products list from database + curated master fallback
  const masterFallbackProducts = Object.values(SIDE_JOBS_DB).flatMap((j) => j.products);
  const productsCatalog = liveProducts.length > 0 ? liveProducts : masterFallbackProducts;

  const filteredProducts = productCategoryFilter === 'Semua'
    ? productsCatalog
    : productsCatalog.filter((p) => p.category?.toLowerCase() === productCategoryFilter.toLowerCase());

  // Skills filtered by category and search
  const categorySkills = selectedSkillCategory === 'all'
    ? allMasterSkills
    : (SKILL_CATEGORY_GROUPS.find((g) => g.id === selectedSkillCategory)?.skills || []);

  const filteredSkills = categorySkills.filter((s) =>
    s.toLowerCase().includes(skillSearch.toLowerCase())
  );
  const visibleSkills = showAllSkills ? filteredSkills : filteredSkills.slice(0, 16);

  // Tools filtered
  const filteredTools = defaultTools.filter((t) =>
    t.toLowerCase().includes(toolSearch.toLowerCase())
  );
  const visibleTools = showAllTools ? filteredTools : filteredTools.slice(0, 8);

  // Toggle multi-select
  const toggleSkill = (skill: string) => {
    setUserAnswers((prev) => {
      const exists = prev.skills.includes(skill);
      if (exists) {
        return { ...prev, skills: prev.skills.filter((s) => s !== skill) };
      } else {
        if (prev.skills.length >= 10) return prev;
        return { ...prev, skills: [...prev.skills, skill] };
      }
    });
  };

  const toggleTool = (tool: string) => {
    setUserAnswers((prev) => {
      const exists = prev.tools.includes(tool);
      if (exists) {
        return { ...prev, tools: prev.tools.filter((t) => t !== tool) };
      } else {
        if (prev.tools.length >= 10) return prev;
        return { ...prev, tools: [...prev.tools, tool] };
      }
    });
  };

  const handleNextStep = () => {
    if (quizStep < 6) {
      setQuizStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      switchTab('lead');
    }
  };

  const handlePrevStep = () => {
    if (quizStep > 1) {
      setQuizStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      switchTab('beranda');
    }
  };

  return (
    <div className="w-full max-w-[480px] min-h-[100dvh] bg-[var(--color-surface)] relative flex flex-col mx-auto sm:border-x sm:border-[var(--color-border-soft)] sm:shadow-[0_0_35px_rgba(10,14,46,0.03)]">
      {/* ── TOP HEADER VARIATIONS (Standard vs Quiz vs Akun) ── */}
      {currentTab === 'quiz' ? (
        // Quiz Header (Back arrow + Progress Bar + 2/6 counter)
        <header className="px-[20px] pt-[calc(16px+env(safe-area-inset-top))] pb-[12px] flex items-center gap-[14px] bg-white/95 backdrop-blur-[8px] border-b border-[var(--color-border-soft)] sticky top-0 z-40">
          <button
            onClick={handlePrevStep}
            className="w-[36px] h-[36px] rounded-full flex items-center justify-center text-[var(--color-ink)] bg-transparent transition-colors duration-150 hover:bg-[var(--color-surface-sunken)]"
            aria-label="Kembali"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex-1 h-[8px] bg-[var(--track)] rounded-full overflow-hidden relative">
            <div
              className="h-full bg-[var(--color-primary)] rounded-full transition-all duration-[350ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]"
              style={{ width: `${(quizStep / 6) * 100}%` }}
            />
          </div>
          <span className="text-[13px] font-[600] text-[var(--color-muted)] min-w-[28px] text-right">{quizStep}/6</span>
        </header>
      ) : currentTab === 'akun' ? (
        // Akun Header (Back arrow + Akun Saya)
        <header className="px-[20px] pt-[calc(16px+env(safe-area-inset-top))] pb-[12px] flex items-center justify-between bg-white/95 backdrop-blur-[8px] border-b border-[var(--color-border-soft)] sticky top-0 z-40">
          <div className="flex items-center gap-3">
            <button
              onClick={() => switchTab('beranda')}
              className="w-[36px] h-[36px] rounded-full flex items-center justify-center text-[var(--color-ink)] bg-transparent transition-colors duration-150 hover:bg-[var(--color-surface-sunken)]"
              aria-label="Kembali ke Beranda"
            >
              <ArrowLeft size={20} />
            </button>
            <h2 className="text-[18px] font-[700] leading-[1.35] text-[var(--color-ink)] tracking-[-0.015em]">Akun Saya</h2>
          </div>
          <Link
            href="/admin"
            className="text-[12px] font-bold text-[#0074FC] bg-[#E1EDFD] px-3 py-1.5 rounded-full"
          >
            Admin ⚙️
          </Link>
        </header>
      ) : (
        // Standard Header (Wordmark Logo + Avatar Button)
        <header className="px-[20px] pt-[calc(16px+env(safe-area-inset-top))] pb-[12px] flex items-center justify-between bg-white/95 backdrop-blur-[8px] border-b border-[var(--color-border-soft)] sticky top-0 z-40">
          <BrandLogo onClick={() => switchTab('beranda')} />
          <div className="flex items-center gap-2">
            <button
              onClick={() => switchTab('akun')}
              className="w-[38px] h-[38px] rounded-full bg-[var(--color-surface-sunken)] border border-[var(--color-border)] flex items-center justify-center text-[var(--icon-unselected)] transition-all duration-200 hover:bg-[var(--blue-bg)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]"
              title="Akun Saya"
              aria-label="Akun Saya"
            >
              <User size={19} />
            </button>
          </div>
        </header>
      )}

      {/* ── SCREEN 1: BERANDA ── */}
      {currentTab === 'beranda' && (
        <main className="flex-1 flex flex-col w-full px-5 pt-8 pb-28 animate-fadeIn flex-1">
          {/* Hero Headline & Subtitle */}
          <div className="mb-2">
            <h1 className="text-[27px] font-[800] leading-[1.25] text-[var(--color-ink)] tracking-[-0.025em]">
              Mulai<br />
              Langkah Baru<br />
              dari <span className="text-[var(--color-primary)]">Skill Kamu</span>
            </h1>
            <p className="text-[14.5px] font-[500] leading-[1.55] text-[var(--color-muted)] mt-2">
              Temukan peluang side job yang sesuai dengan kemampuan dan gaya hidup kamu.
            </p>
          </div>

          {/* Hero Character Visual */}
          <HeroCharacterVisual />

          {/* CTA Buttons / Action Cards */}
          <div className="flex flex-col gap-4 mt-8">
            {/* Primary Card: Cari SIDE JOB */}
            <button
              onClick={startNewQuiz}
              className="bg-[var(--color-primary)] rounded-[20px] px-[18px] py-[16px] flex items-center gap-[14px] text-white shadow-[0_6px_16px_rgba(0,116,252,0.28)] transition-all duration-200 text-left w-full hover:bg-[var(--color-primary-hover)] hover:-translate-y-[1px] hover:shadow-[0_8px_22px_rgba(0,116,252,0.36)]"
            >
              <div className="w-[44px] h-[44px] rounded-[14px] bg-white flex items-center justify-center text-[#0074FC] flex-shrink-0 shadow-sm">
                <Search size={22} strokeWidth={2.5} />
              </div>
              <div className="flex-1">
                <div className="text-[16.5px] font-extrabold text-white leading-tight">
                  Cari SIDE JOB
                </div>
                <div className="text-[12px] font-medium text-white/85 mt-0.5 leading-tight">
                  yang cocok untuk kamu berdasarkan skill
                </div>
              </div>
              <ChevronRight size={20} className="text-white/90 flex-shrink-0" />
            </button>

            {/* Secondary Card: Lowongan Kerja Remote */}
            <button
              onClick={() => setIsRemoteJobsOpen(true)}
              className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[20px] px-[18px] py-[16px] flex items-center gap-[14px] transition-all duration-200 text-left w-full hover:border-[var(--color-primary)] hover:bg-[#F8FAFD] hover:-translate-y-[1px]"
            >
              <div className="w-[44px] h-[44px] rounded-[14px] bg-[#E1EDFD] flex items-center justify-center text-[#0074FC] flex-shrink-0">
                <Briefcase size={22} strokeWidth={2.2} />
              </div>
              <div className="flex-1">
                <div className="text-[16px] font-bold text-[#0A0E2E] leading-tight">
                  Lowongan Kerja Remote
                </div>
                <div className="text-[12px] font-medium text-[#98A2B3] mt-0.5 leading-tight">
                  Temukan berbagai lowongan kerja remote terbaru
                </div>
              </div>
              <ChevronRight size={20} className="text-[#0A0E2E] flex-shrink-0" />
            </button>
          </div>
        </main>
      )}

      {/* ── SCREEN 2: QUIZ FLOW (Step 1 to 6) ── */}
      {currentTab === 'quiz' && (
        <main className="flex-1 flex flex-col w-full px-5 pt-6 pb-[160px] animate-fadeIn flex-1">
          {/* STEP 1: PROFESI */}
          {quizStep === 1 && (
            <div>
              <h2 className="text-[18px] font-[700] leading-[1.35] text-[var(--color-ink)] tracking-[-0.015em]">Saat ini profesi kamu apa?</h2>
              <p className="text-[14.5px] font-[500] leading-[1.55] text-[var(--color-muted)] text-[13.5px] mt-2 mb-6">
                Pilih salah satu yang paling sesuai dengan kondisi kamu saat ini.
              </p>

              <div className="flex flex-col gap-3">
                {profesiList.map((item) => {
                  const isSelected = userAnswers.profesi === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() =>
                        setUserAnswers((prev) => ({ ...prev, profesi: item.id }))
                      }
                      className={`w-full min-h-[60px] rounded-[16px] px-[18px] py-[14px] flex items-center gap-[14px] transition-all duration-[180ms] text-left border ${isSelected ? 'bg-[#F0F6FD] border-[var(--color-primary)]' : 'bg-[var(--color-surface)] border-[var(--color-border)] hover:border-[#BAC7DE] hover:bg-[#FAFCFE]'}`}
                    >
                      <span className="text-[20px]">{item.icon}</span>
                      <div className="flex-1">
                        <div className="text-[15px] font-semibold text-[#0A0E2E]">
                          {item.label}
                        </div>
                        {item.subtext && (
                          <div className="text-[12px] text-[#98A2B3] mt-0.5">
                            {item.subtext}
                          </div>
                        )}
                      </div>
                      <div className={`w-[22px] h-[22px] rounded-full border-[1.8px] flex items-center justify-center shrink-0 transition-colors duration-[180ms] ${isSelected ? 'border-[var(--color-primary)]' : 'border-[var(--color-border)]'}`}>
                        <div className={`w-[10px] h-[10px] rounded-full bg-[var(--color-primary)] transition-transform duration-[180ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] ${isSelected ? 'scale-100' : 'scale-0'}`} />
                      </div>
                    </div>
                  );
                })}

                {userAnswers.profesi === 'Lainnya' && (
                  <div className="mt-2">
                    <input
                      type="text"
                      placeholder="Ketik profesi atau kesibukanmu..."
                      value={userAnswers.profesiCustom}
                      onChange={(e) =>
                        setUserAnswers((prev) => ({
                          ...prev,
                          profesiCustom: e.target.value,
                        }))
                      }
                      className="w-full h-[50px] rounded-[14px] bg-[var(--color-surface)] border border-[var(--color-border)] pl-[42px] pr-[16px] text-[14.5px] font-[500] text-[var(--color-ink)] outline-none transition-all duration-200 focus:border-[var(--color-primary)] focus:ring-[3px] focus:ring-[rgba(0,116,252,0.12)] placeholder:text-[var(--color-placeholder)]"
                      style={{ paddingLeft: '16px' }}
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 2: SKILL (10 Skill per Side Job dari All Data.html) */}
          {quizStep === 2 && (
            <div>
              <div className="flex items-start justify-between gap-2 mb-1">
                <div>
                  <h2 className="text-[18px] font-[700] leading-[1.35] text-[var(--color-ink)] tracking-[-0.015em]">
                    Pilih Skill yang Paling Kamu Kuasai
                  </h2>
                  <p className="text-[13.5px] text-[var(--color-muted)] mt-1">
                    Pilih skill nyata kamu untuk dicocokkan ke 20 Side Job.
                  </p>
                </div>
                <span className="text-[12px] font-extrabold px-3 py-1 rounded-full bg-[#E1EDFD] text-[#0074FC] whitespace-nowrap">
                  {userAnswers.skills.length}/10 Skill
                </span>
              </div>

              {/* Kategori Filter Tabs */}
              <div className="flex gap-2 overflow-x-auto pb-2 mt-4 mb-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <button
                  type="button"
                  onClick={() => setSelectedSkillCategory('all')}
                  className={`px-3.5 py-1.5 rounded-full text-[12px] font-bold whitespace-nowrap transition-all ${
                    selectedSkillCategory === 'all'
                      ? 'bg-[var(--color-primary)] text-white shadow-xs'
                      : 'bg-[#F1F4F9] text-[#475569] hover:bg-[#E5EAF2]'
                  }`}
                >
                  ✨ Semua Skill
                </button>
                {SKILL_CATEGORY_GROUPS.map((grp) => (
                  <button
                    key={grp.id}
                    type="button"
                    onClick={() => setSelectedSkillCategory(grp.id)}
                    className={`px-3.5 py-1.5 rounded-full text-[12px] font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                      selectedSkillCategory === grp.id
                        ? 'bg-[var(--color-primary)] text-white shadow-xs'
                        : 'bg-[#F1F4F9] text-[#475569] hover:bg-[#E5EAF2]'
                    }`}
                  >
                    <span>{grp.icon}</span>
                    <span>{grp.name}</span>
                  </button>
                ))}
              </div>

              {/* Search bar */}
              <div className="relative mb-3.5">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#98A2B3]"
                />
                <input
                  type="text"
                  placeholder="Cari skill (misal: Excel, Video, Copywriting, Ketik...)"
                  value={skillSearch}
                  onChange={(e) => setSkillSearch(e.target.value)}
                  className="w-full h-[46px] rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] pl-[42px] pr-[16px] text-[13.5px] text-[var(--color-ink)] outline-none transition-all duration-200 focus:border-[var(--color-primary)] focus:ring-[3px] focus:ring-[rgba(0,116,252,0.12)] placeholder:text-[var(--color-placeholder)]"
                />
              </div>

              {/* Selected Skills Preview Badges */}
              {userAnswers.skills.length > 0 && (
                <div className="mb-3 p-3 bg-[#EFF6FF] rounded-2xl border border-[#BFDBFE]/60">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11.5px] font-bold text-[#1D64EC]">
                      Skill Terpilih ({userAnswers.skills.length}/10):
                    </span>
                    <button
                      type="button"
                      onClick={() => setUserAnswers((prev) => ({ ...prev, skills: [] }))}
                      className="text-[11px] font-semibold text-[#DC2626] hover:underline"
                    >
                      Hapus Semua
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {userAnswers.skills.map((s) => (
                      <span
                        key={s}
                        onClick={() => toggleSkill(s)}
                        className="inline-flex items-center gap-1 text-[11.5px] font-bold text-[#1D64EC] bg-white px-2.5 py-1 rounded-full border border-[#93C5FD] shadow-xs cursor-pointer hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-colors"
                        title="Klik untuk membatalkan"
                      >
                        <span>{s}</span>
                        <X size={12} />
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Chip Selectable List */}
              <div className="flex flex-wrap gap-2">
                {visibleSkills.length === 0 ? (
                  <div className="w-full py-6 text-center text-[#98A2B3] text-[13px]">
                    Tidak ada skill yang cocok dengan pencarian &ldquo;{skillSearch}&rdquo;.
                  </div>
                ) : (
                  visibleSkills.map((skill) => {
                    const isSelected = userAnswers.skills.includes(skill);
                    return (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => toggleSkill(skill)}
                        className={`inline-flex items-center gap-[6px] px-[14px] py-[8px] rounded-full text-[13px] font-[600] border transition-all duration-[180ms] select-none ${
                          isSelected
                            ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white shadow-xs'
                            : 'bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-ink-soft)] hover:border-[#B4C4DE] hover:bg-[#F9FAFC]'
                        }`}
                      >
                        <span>{skill}</span>
                        {isSelected && <Check size={14} strokeWidth={2.5} />}
                      </button>
                    );
                  })
                )}
              </div>

              {filteredSkills.length > 16 && (
                <div className="text-center mt-3.5">
                  <button
                    type="button"
                    onClick={() => setShowAllSkills(!showAllSkills)}
                    className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#0074FC] hover:underline"
                  >
                    <span>{showAllSkills ? 'Sembunyikan Sebagian' : `Lihat Semua (${filteredSkills.length} Skill)`}</span>
                    <ChevronDown
                      size={16}
                      className={`transform transition-transform ${showAllSkills ? 'rotate-180' : ''}`}
                    />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: TOOLS & SOFTWARE */}
          {quizStep === 3 && (
            <div>
              <h2 className="text-[18px] font-[700] leading-[1.35] text-[var(--color-ink)] tracking-[-0.015em]">Tools & Software yang Biasa Digunakan</h2>
              <p className="text-[14.5px] font-[500] leading-[1.55] text-[var(--color-muted)] text-[13.5px] mt-2 mb-6">
                (Maksimal 10)
              </p>

              <div className="relative mb-3.5">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#98A2B3]"
                />
                <input
                  type="text"
                  placeholder="Cari tools..."
                  value={toolSearch}
                  onChange={(e) => setToolSearch(e.target.value)}
                  className="w-full h-[46px] rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] pl-[42px] pr-[16px] text-[14px] text-[var(--color-ink)] outline-none transition-all duration-200 focus:border-[var(--color-primary)] focus:ring-[3px] focus:ring-[rgba(0,116,252,0.12)] placeholder:text-[var(--color-placeholder)]"
                />
              </div>

              <div className="flex flex-wrap gap-2.5">
                {visibleTools.map((tool) => {
                  const isSelected = userAnswers.tools.includes(tool);
                  return (
                    <button
                      key={tool}
                      type="button"
                      onClick={() => toggleTool(tool)}
                      className={`inline-flex items-center gap-[6px] px-[16px] py-[9px] rounded-full text-[13.5px] font-[600] border transition-all duration-[180ms] select-none ${isSelected ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white' : 'bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-ink-soft)] hover:border-[#B4C4DE] hover:bg-[#F9FAFC]'}`}
                    >
                      <span>{tool}</span>
                      {isSelected && <Check size={14} strokeWidth={2.5} />}
                    </button>
                  );
                })}
              </div>

              {filteredTools.length > 8 && (
                <div className="text-center mt-3.5">
                  <button
                    type="button"
                    onClick={() => setShowAllTools(!showAllTools)}
                    className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#0074FC] hover:underline"
                  >
                    <span>{showAllTools ? 'Sembunyikan' : 'Lihat semua tools'}</span>
                    <ChevronDown
                      size={16}
                      className={`transform transition-transform ${showAllTools ? 'rotate-180' : ''}`}
                    />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* STEP 4: GAYA KERJA */}
          {quizStep === 4 && (
            <div>
              <h2 className="text-[18px] font-[700] leading-[1.35] text-[var(--color-ink)] tracking-[-0.015em]">Gaya Kerja yang Paling Nyaman Buat Kamu</h2>
              <p className="text-[14.5px] font-[500] leading-[1.55] text-[var(--color-muted)] text-[13.5px] mt-2 mb-6">
                Pilih pola kerja yang paling sesuai dengan ritme harianmu.
              </p>

              <div className="flex flex-col gap-3">
                {workStylesList.map((style) => {
                  const isSelected = userAnswers.caraKerja === style.id;
                  return (
                    <div
                      key={style.id}
                      onClick={() =>
                        setUserAnswers((prev) => ({ ...prev, caraKerja: style.id }))
                      }
                      className={`w-full min-h-[60px] rounded-[16px] px-[18px] py-[14px] flex items-center gap-[14px] transition-all duration-[180ms] text-left border ${isSelected ? 'bg-[#F0F6FD] border-[var(--color-primary)]' : 'bg-[var(--color-surface)] border-[var(--color-border)] hover:border-[#BAC7DE] hover:bg-[#FAFCFE]'}`}
                    >
                      <span className="text-[20px]">{style.icon}</span>
                      <div className="flex-1">
                        <div className="text-[15px] font-semibold text-[#0A0E2E]">
                          {style.label}
                        </div>
                        <div className="text-[12px] text-[#98A2B3] mt-0.5">
                          {style.desc}
                        </div>
                      </div>
                      <div className={`w-[22px] h-[22px] rounded-full border-[1.8px] flex items-center justify-center shrink-0 transition-colors duration-[180ms] ${isSelected ? 'border-[var(--color-primary)]' : 'border-[var(--color-border)]'}`}>
                        <div className={`w-[10px] h-[10px] rounded-full bg-[var(--color-primary)] transition-transform duration-[180ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] ${isSelected ? 'scale-100' : 'scale-0'}`} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 5: BAHASA INGGRIS */}
          {quizStep === 5 && (
            <div>
              <h2 className="text-[18px] font-[700] leading-[1.35] text-[var(--color-ink)] tracking-[-0.015em]">Tingkat Kemampuan Bahasa Inggris</h2>
              <p className="text-[14.5px] font-[500] leading-[1.55] text-[var(--color-muted)] text-[13.5px] mt-2 mb-6">
                Side job global memberikan bayaran USD, seberapa nyaman kamu berbahasa Inggris?
              </p>

              <div className="flex flex-col gap-3">
                {englishLevels.map((eng) => {
                  const isSelected = userAnswers.englishLevel === eng.level;
                  return (
                    <div
                      key={eng.level}
                      onClick={() =>
                        setUserAnswers((prev) => ({
                          ...prev,
                          englishLevel: eng.level,
                        }))
                      }
                      className={`w-full min-h-[60px] rounded-[16px] px-[18px] py-[14px] flex items-center gap-[14px] transition-all duration-[180ms] text-left border ${isSelected ? 'bg-[#F0F6FD] border-[var(--color-primary)]' : 'bg-[var(--color-surface)] border-[var(--color-border)] hover:border-[#BAC7DE] hover:bg-[#FAFCFE]'}`}
                    >
                      <div className="flex-1">
                        <div className="text-[15px] font-semibold text-[#0A0E2E]">
                          {eng.label}
                        </div>
                        <div className="text-[12px] text-[#98A2B3] mt-0.5">
                          {eng.desc}
                        </div>
                      </div>
                      <div className={`w-[22px] h-[22px] rounded-full border-[1.8px] flex items-center justify-center shrink-0 transition-colors duration-[180ms] ${isSelected ? 'border-[var(--color-primary)]' : 'border-[var(--color-border)]'}`}>
                        <div className={`w-[10px] h-[10px] rounded-full bg-[var(--color-primary)] transition-transform duration-[180ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] ${isSelected ? 'scale-100' : 'scale-0'}`} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 6: KOMITMEN WAKTU */}
          {quizStep === 6 && (
            <div>
              <h2 className="text-[18px] font-[700] leading-[1.35] text-[var(--color-ink)] tracking-[-0.015em]">Komitmen Waktu Harian untuk Side Job</h2>
              <p className="text-[14.5px] font-[500] leading-[1.55] text-[var(--color-muted)] text-[13.5px] mt-2 mb-6">
                Berapa jam yang realistis bisa kamu alokasikan setiap harinya?
              </p>

              <div className="flex flex-col gap-3">
                {timeCommitments.map((tc) => {
                  const isSelected = userAnswers.timeCommitment === tc.id;
                  return (
                    <div
                      key={tc.id}
                      onClick={() =>
                        setUserAnswers((prev) => ({
                          ...prev,
                          timeCommitment: tc.id,
                        }))
                      }
                      className={`w-full min-h-[60px] rounded-[16px] px-[18px] py-[14px] flex items-center gap-[14px] transition-all duration-[180ms] text-left border ${isSelected ? 'bg-[#F0F6FD] border-[var(--color-primary)]' : 'bg-[var(--color-surface)] border-[var(--color-border)] hover:border-[#BAC7DE] hover:bg-[#FAFCFE]'}`}
                    >
                      <div className="flex-1">
                        <div className="text-[15px] font-semibold text-[#0A0E2E]">
                          {tc.label}
                        </div>
                        <div className="text-[12px] text-[#98A2B3] mt-0.5">
                          {tc.desc}
                        </div>
                      </div>
                      <div className={`w-[22px] h-[22px] rounded-full border-[1.8px] flex items-center justify-center shrink-0 transition-colors duration-[180ms] ${isSelected ? 'border-[var(--color-primary)]' : 'border-[var(--color-border)]'}`}>
                        <div className={`w-[10px] h-[10px] rounded-full bg-[var(--color-primary)] transition-transform duration-[180ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] ${isSelected ? 'scale-100' : 'scale-0'}`} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Bottom Dual Sticky Buttons (Kembali & Lanjutkan) */}
          <div className="fixed bottom-[64px] left-1/2 -translate-x-1/2 w-full max-w-[480px] px-5 py-4 bg-white/95 backdrop-blur-md border-t border-[#EDEFF3] flex items-center gap-3 z-40">
            <button
              type="button"
              onClick={handlePrevStep}
              className="bg-[var(--color-surface-sunken)] text-[var(--color-ink)] rounded-[999px] h-[52px] inline-flex items-center justify-center font-[700] text-[15px] w-full transition-colors duration-200 hover:bg-[#E6EAF0] flex-1"
            >
              Kembali
            </button>
            <button
              type="button"
              onClick={handleNextStep}
              className="bg-[var(--color-primary)] text-white rounded-[999px] h-[52px] inline-flex items-center justify-center font-[700] text-[15px] w-full shadow-[0_6px_16px_rgba(0,116,252,0.28)] transition-all duration-200 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:bg-[var(--color-primary-hover)] hover:-translate-y-[1px] hover:shadow-[0_8px_20px_rgba(0,116,252,0.36)] disabled:opacity-55 disabled:cursor-not-allowed disabled:shadow-none flex-1"
            >
              Lanjutkan
            </button>
          </div>
        </main>
      )}

      {/* ── SCREEN 3: LEAD CAPTURE FORM ── */}
      {currentTab === 'lead' && (
        <main className="flex-1 flex flex-col w-full px-5 pt-6 pb-28 animate-fadeIn flex-1">
          {/* Blue Envelope Illustration */}
          <EnvelopeChecklistVisual />

          {/* Heading */}
          <div className="text-center my-3">
            <h2 className="text-[24px] font-[800] leading-[1.3] text-[var(--color-ink)] tracking-[-0.02em]">
              Hasil kamu<br />
              sudah <span className="text-[var(--color-primary)]">siap!</span>
            </h2>
            <p className="text-[14.5px] font-[500] leading-[1.55] text-[var(--color-muted)] text-[13.5px] mt-1.5 max-w-[280px] mx-auto">
              Isi data berikut untuk melihat rekomendasi side job yang cocok untuk kamu.
            </p>
          </div>

          {/* 3 Form Inputs */}
          <form onSubmit={handleLeadSubmit} className="flex flex-col gap-4 mt-6">
            {/* Nama Lengkap */}
            <div className="flex flex-col gap-[7px]">
              <label className="text-[13px] font-[700] text-[var(--color-ink-soft)]">Nama Lengkap</label>
              <div className="relative">
                <User
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#98A2B3]"
                />
                <input
                  type="text"
                  required
                  placeholder="Masukkan nama lengkap kamu"
                  value={leadData.name}
                  onChange={(e) =>
                    setLeadData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full h-[50px] rounded-[14px] bg-[var(--color-surface)] border border-[var(--color-border)] pl-[42px] pr-[16px] text-[14.5px] font-[500] text-[var(--color-ink)] outline-none transition-all duration-200 focus:border-[var(--color-primary)] focus:ring-[3px] focus:ring-[rgba(0,116,252,0.12)] placeholder:text-[var(--color-placeholder)]"
                />
              </div>
            </div>

            {/* Nomor WhatsApp */}
            <div className="flex flex-col gap-[7px]">
              <label className="text-[13px] font-[700] text-[var(--color-ink-soft)]">Nomor WhatsApp</label>
              <div className="relative">
                <Phone
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#98A2B3]"
                />
                <input
                  type="tel"
                  required
                  placeholder="Contoh: 08123456789"
                  value={leadData.wa}
                  onChange={(e) =>
                    setLeadData((prev) => ({ ...prev, wa: e.target.value }))
                  }
                  className="w-full h-[50px] rounded-[14px] bg-[var(--color-surface)] border border-[var(--color-border)] pl-[42px] pr-[16px] text-[14.5px] font-[500] text-[var(--color-ink)] outline-none transition-all duration-200 focus:border-[var(--color-primary)] focus:ring-[3px] focus:ring-[rgba(0,116,252,0.12)] placeholder:text-[var(--color-placeholder)]"
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-[7px]">
              <label className="text-[13px] font-[700] text-[var(--color-ink-soft)]">Email</label>
              <div className="relative">
                <Mail
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#98A2B3]"
                />
                <input
                  type="email"
                  required
                  placeholder="Contoh: kamu@email.com"
                  value={leadData.email}
                  onChange={(e) =>
                    setLeadData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="w-full h-[50px] rounded-[14px] bg-[var(--color-surface)] border border-[var(--color-border)] pl-[42px] pr-[16px] text-[14.5px] font-[500] text-[var(--color-ink)] outline-none transition-all duration-200 focus:border-[var(--color-primary)] focus:ring-[3px] focus:ring-[rgba(0,116,252,0.12)] placeholder:text-[var(--color-placeholder)]"
                />
              </div>
            </div>

            {/* Microcopy Trust */}
            <div className="flex items-center gap-2 text-[#98A2B3] text-[12px] mt-1 select-none">
              <Lock size={15} className="flex-shrink-0 text-[#98A2B3]" />
              <span>Data kamu aman dan tidak akan disebarkan ke pihak lain.</span>
            </div>

            {/* Full-width primary button */}
            <button
              type="submit"
              disabled={isSubmittingLead}
              className="bg-[var(--color-primary)] text-white rounded-[999px] h-[52px] inline-flex items-center justify-center font-[700] text-[15px] w-full shadow-[0_6px_16px_rgba(0,116,252,0.28)] transition-all duration-200 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:bg-[var(--color-primary-hover)] hover:-translate-y-[1px] hover:shadow-[0_8px_20px_rgba(0,116,252,0.36)] disabled:opacity-55 disabled:cursor-not-allowed disabled:shadow-none mt-2"
            >
              {isSubmittingLead ? 'Menganalisis...' : 'Lihat Hasil Saya →'}
            </button>
          </form>
        </main>
      )}

      {/* ── SCREEN 4: HASIL PEMETAAN ── */}
      {currentTab === 'hasil' && (
        <main className="flex-1 flex flex-col w-full px-5 pt-6 pb-28 animate-fadeIn flex-1">
          {calculatedResult ? (
            <div>
              {/* Hasil Header Badge & Title */}
              <div className="mb-2">
                <span className="text-[13px] font-semibold text-[#98A2B3]">
                  Hasil Kamu
                </span>
                <h2 className="text-[24px] font-[800] leading-[1.3] text-[var(--color-ink)] tracking-[-0.02em] mt-0.5">
                  Kamu adalah<br />
                  <span className="text-[var(--color-primary)]">
                    “{calculatedResult.persona.name}”
                  </span>
                </h2>
                <p className="text-[14.5px] font-[500] leading-[1.55] text-[var(--color-muted)] text-[13.5px] mt-1 leading-relaxed">
                  {calculatedResult.persona.tagline}
                </p>
              </div>

              {/* Thumbs Up Character Visual with Trait Badge */}
              <ThumbsUpCharacterVisual traits={calculatedResult.persona.traits} />

              {/* Top Side Jobs Section */}
              <div className="mt-8">
                <h3 className="text-[18px] font-[700] leading-[1.35] text-[var(--color-ink)] tracking-[-0.015em] mb-3">
                  Side Job yang Cocok Untuk Kamu
                </h3>

                <div className="flex flex-col gap-3">
                  {calculatedResult.topMatches.map((job, idx) => {
                    // Semantic pastel pairs from design.md
                    let bgPastel = 'var(--green-bg, #DEF6F2)';
                    let iconColor = 'var(--green-icon, #00A55E)';
                    let IconComponent = FileCheck;

                    if (idx === 1) {
                      bgPastel = 'var(--blue-bg, #E1EDFD)';
                      iconColor = 'var(--blue-icon, #0074FC)';
                      IconComponent = User;
                    } else if (idx === 2) {
                      bgPastel = 'var(--orange-bg, #FDEFDD)';
                      iconColor = 'var(--orange-icon, #FEAA00)';
                      IconComponent = Layers;
                    }

                    return (
                      <div
                        key={job.id}
                        className="bg-white rounded-[16px] border border-[#EDEFF3] p-4 flex items-center gap-3 shadow-sm"
                      >
                        {/* Circle Rank (1, 2, 3) */}
                        <div className="w-[28px] h-[28px] rounded-full bg-[#DFE9F6] flex items-center justify-center font-extrabold text-[13px] text-[#0A0E2E] flex-shrink-0">
                          {idx + 1}
                        </div>

                        {/* Icon square pastel */}
                        <div
                          className="w-[44px] h-[44px] rounded-[14px] flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: bgPastel, color: iconColor }}
                        >
                          <IconComponent size={22} strokeWidth={2.2} />
                        </div>

                        {/* Job Title & Progress Bar */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-[15px] font-bold text-[#0A0E2E] truncate">
                              {job.name}
                            </span>
                            <span className="text-[17px] font-extrabold text-[#0A0E2E] ml-2">
                              {job.matchPercent}%
                            </span>
                          </div>

                          <div className="flex items-center justify-between mt-1.5 gap-2">
                            {/* Horizontal Progress bar */}
                            <div className="flex-1 h-[6px] rounded-full bg-[#E7EBF4] overflow-hidden">
                              <div
                                className="h-full rounded-full bg-[#0074FC]"
                                style={{ width: `${job.matchPercent}%` }}
                              />
                            </div>
                            {/* Cocok green text */}
                            <span className="text-[12px] font-semibold text-[#31B374]">
                              Cocok
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Secondary Button: Lihat Penjelasan Lengkap */}
                <button
                  onClick={() => setIsDetailExplanationOpen(true)}
                  className="bg-[#EDF4FD] text-[var(--color-ink)] rounded-[20px] px-[18px] py-[15px] flex items-center justify-between font-[700] text-[14.5px] border border-[rgba(0,116,252,0.1)] w-full transition-colors duration-200 hover:bg-[#E2EEFD] hover:border-[rgba(0,116,252,0.2)] mt-3.5"
                >
                  <span className="font-bold text-[14.5px] text-[#0A0E2E]">
                    Lihat Penjelasan Lengkap
                  </span>
                  <ChevronRight size={19} className="text-[#0A0E2E]" />
                </button>
              </div>

              {/* ── REKOMENDASI PRODUK BERDASARKAN HASIL TES (Dinamis DB + Lynk.id) ── */}
              {(() => {
                const topJob = calculatedResult.topMatches[0];
                if (!topJob) return null;

                // 1. Cari produk dari database live yang ditargetkan untuk job ini atau umum
                const dbMatches = liveProducts.filter(
                  (p) =>
                    p.isPublished !== false &&
                    (
                      p.sideJob?.toLowerCase() === topJob.name.toLowerCase() ||
                      p.sideJob?.toLowerCase() === topJob.kategori.toLowerCase() ||
                      p.sideJob === 'Umum / Semua Profil' ||
                      !p.sideJob
                    )
                );

                // 2. Jika DB belum ada produk spesifik, gunakan produk resmi dari All Data.html
                const productsToShow = dbMatches.length > 0 ? dbMatches : (topJob.products || []);

                if (!productsToShow || productsToShow.length === 0) return null;

                return (
                  <div className="mt-8">
                    <div className="mb-4">
                      <span className="text-[13px] font-semibold text-[#98A2B3]">Khusus Untuk Kamu</span>
                      <h3 className="text-[18px] font-[700] leading-[1.35] text-[var(--color-ink)] tracking-[-0.015em] mt-0.5">
                        Panduan &amp; Produk Rekomendasi
                      </h3>
                      <p className="text-[13px] text-[#98A2B3] mt-1 leading-relaxed">
                        Dipilih khusus berdasarkan rekomendasi <span className="font-bold text-[#0A0E2E]">{topJob.name}</span> kamu.
                      </p>
                    </div>

                    <div className="flex flex-col gap-3">
                      {productsToShow.map((prod, pIdx) => {
                        const directUrl = normalizeLynkUrl(prod.url);
                        return (
                          <div
                            key={prod.id || pIdx}
                            className="bg-white rounded-[18px] border border-[#EDEFF3] shadow-[0_2px_10px_rgba(10,14,46,0.05)] p-[14px] flex gap-[14px] items-center hover:shadow-[0_6px_18px_rgba(10,14,46,0.09)] hover:border-[#DCE3EE] transition-all duration-200"
                          >
                            {/* Thumbnail */}
                            {prod.imageUrl ? (
                              <div className="w-[68px] h-[68px] rounded-[14px] overflow-hidden flex-shrink-0 bg-slate-100 border border-slate-200/80 shadow-sm">
                                <img
                                  src={prod.imageUrl}
                                  alt={prod.title}
                                  className="w-full h-full object-cover"
                                  loading="lazy"
                                />
                              </div>
                            ) : (
                              <ProductCover3D type={prod.type || 'digital'} />
                            )}

                            {/* Info */}
                            <div className="flex-1 flex flex-col min-w-0">
                              <span className="bg-[var(--lav-tag)] text-[var(--color-ink-soft)] text-[11px] font-[600] px-[9px] py-[2px] rounded-full inline-block mb-1 w-fit">
                                {prod.category || 'Panduan'}
                              </span>
                              <h4 className="text-[14px] font-bold text-[#0A0E2E] leading-snug line-clamp-2">
                                {prod.title}
                              </h4>
                              {prod.desc && (
                                <p className="text-[12px] text-[#64748B] mt-0.5 line-clamp-1">
                                  {prod.desc}
                                </p>
                              )}
                              <div className="flex items-center justify-between w-full mt-2.5">
                                {prod.badge ? (
                                  <span className="text-[11.5px] font-bold text-[#0074FC] bg-[#EFF6FF] px-2 py-0.5 rounded-full">
                                    {prod.badge}
                                  </span>
                                ) : (
                                  <span className="text-[12px] font-bold text-[#0F172A]">{prod.price || 'Panduan'}</span>
                                )}
                                <a
                                  href={directUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="bg-[var(--color-primary)] text-white rounded-full px-[14px] py-[6px] text-[12px] font-[700] transition-colors duration-150 inline-flex items-center gap-1.5 hover:bg-[var(--color-primary-hover)] flex-shrink-0 shadow-xs"
                                >
                                  <span>Buka di Lynk.id</span>
                                  <ExternalLink size={12} />
                                </a>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}
            </div>
          ) : (
            // Empty State: Prompt user to take quiz
            <div className="text-center py-12 px-4">
              <div className="w-[64px] h-[64px] rounded-full bg-[#E1EDFD] text-[#0074FC] flex items-center justify-center mx-auto mb-4">
                <FileText size={32} />
              </div>
              <h2 className="text-[24px] font-[800] leading-[1.3] text-[var(--color-ink)] tracking-[-0.02em]">Belum Ada Hasil Pemetaan</h2>
              <p className="text-[14.5px] font-[500] leading-[1.55] text-[var(--color-muted)] text-[14px] mt-2 mb-6 max-w-[280px] mx-auto">
                Mulai tes 3 menit untuk menemukan side job dan produk yang paling cocok dengan skill kamu.
              </p>
              <button onClick={startNewQuiz} className="bg-[var(--color-primary)] text-white rounded-[999px] h-[52px] inline-flex items-center justify-center font-[700] text-[15px] w-full shadow-[0_6px_16px_rgba(0,116,252,0.28)] transition-all duration-200 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:bg-[var(--color-primary-hover)] hover:-translate-y-[1px] hover:shadow-[0_8px_20px_rgba(0,116,252,0.36)] disabled:opacity-55 disabled:cursor-not-allowed disabled:shadow-none">
                Mulai Tes Sekarang →
              </button>
            </div>
          )}
        </main>
      )}

      {/* ── SCREEN 5: REKOMENDASI PRODUK ── */}
      {currentTab === 'rekomendasi' && (
        <main className="flex-1 flex flex-col w-full px-5 pt-6 pb-28 animate-fadeIn flex-1">
          {/* Header */}
          <div className="mb-2">
            <span className="text-[13px] font-semibold text-[#98A2B3]">
              Rekomendasi Untuk Kamu
            </span>
            <h1 className="text-[24px] font-[800] leading-[1.3] text-[var(--color-ink)] tracking-[-0.02em] mt-0.5">
              Tingkatkan Skill,<br />
              Mulai Side Job Sekarang
            </h1>
            <p className="text-[14.5px] font-[500] leading-[1.55] text-[var(--color-muted)] text-[13.5px] mt-1 leading-relaxed">
              Berikut beberapa produk digital yang sesuai dengan hasil kamu sebagai{' '}
              <span className="font-bold text-[#0A0E2E]">
                “{calculatedResult ? calculatedResult.persona.name : 'Talenta Remote'}”
              </span>
              .
            </p>
          </div>

          {/* Filter Tabs (Semua, Ebook, Template, Kursus, Tools) */}
          <div className="flex gap-[8px] overflow-x-auto pb-[4px] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] my-5">
            {(['Semua', 'Ebook', 'Template', 'Kursus', 'Tools'] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setProductCategoryFilter(cat)}
                className={`px-[16px] py-[8px] rounded-full text-[13px] font-[600] whitespace-nowrap transition-colors duration-[180ms] select-none ${productCategoryFilter === cat ? 'bg-[var(--color-primary)] text-white' : 'bg-[var(--color-surface-sunken)] text-[var(--color-ink-soft)] hover:bg-[#E5E9F0]'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Product Cards List */}
          <div className="flex flex-col gap-4 mt-2">
            {filteredProducts.length === 0 ? (
              <div className="bg-[var(--color-surface)] rounded-[20px] border border-dashed border-[var(--color-border-soft)] p-8 text-center flex flex-col items-center justify-center my-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0074FC] flex items-center justify-center mb-3">
                  <ShoppingBag size={24} />
                </div>
                <h4 className="text-[15px] font-bold text-[#0A0E2E]">Belum Ada Produk</h4>
                <p className="text-[12.5px] text-[#98A2B3] mt-1 max-w-[280px]">
                  Produk rekomendasi untuk kategori ini akan segera hadir.
                </p>
              </div>
            ) : (
              filteredProducts.map((prod) => (
                <div key={prod.id} className="bg-[var(--color-surface)] rounded-[20px] border border-[var(--color-border-soft)] shadow-[0_2px_10px_rgba(10,14,46,0.05)] p-[15px] flex gap-[14px] items-center transition-all duration-200 hover:shadow-[0_6px_18px_rgba(10,14,46,0.08)] hover:border-[#DCE3EE]">
                  {/* Thumbnail / 3D Product Mockup */}
                  {prod.imageUrl ? (
                    <div className="w-[68px] h-[68px] sm:w-[76px] sm:h-[76px] rounded-[14px] overflow-hidden flex-shrink-0 bg-slate-100 border border-slate-200/80 shadow-sm relative">
                      <img
                        src={prod.imageUrl}
                        alt={prod.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <ProductCover3D type={prod.type || 'digital'} />
                  )}

                  {/* Product Info */}
                  <div className="flex-1 flex flex-col items-start min-w-0">
                    <span className="bg-[var(--lav-tag)] text-[var(--color-ink-soft)] text-[11.5px] font-[600] px-[10px] py-[3px] rounded-full inline-block mb-1.5">{prod.category}</span>
                    <h4 className="text-[15px] font-bold text-[#0A0E2E] leading-snug line-clamp-2">
                      {prod.title}
                    </h4>
                    {prod.desc ? (
                      <p className="text-[12.5px] font-medium text-[#98A2B3] mt-1 line-clamp-2 leading-relaxed">
                        {prod.desc}
                      </p>
                    ) : null}
                    <div className="flex items-center justify-between w-full mt-3">
                      <span className="text-[12px] font-bold text-[#0074FC] bg-[#EFF6FF] px-2.5 py-1 rounded-full">
                        {prod.badge || 'Panduan Rekomendasi'}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setSelectedProductDetail(prod)}
                          className="bg-[#EFF6FF] text-[#0074FC] hover:bg-[#DBEAFE] rounded-full px-3 py-1.5 text-[11.5px] font-bold transition-colors"
                        >
                          Detail
                        </button>
                        <a
                          href={normalizeLynkUrl(prod.url)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[var(--color-primary)] text-white rounded-full px-3.5 py-1.5 text-[11.5px] font-bold transition-colors duration-150 inline-flex items-center gap-1 hover:bg-[var(--color-primary-hover)] shadow-xs"
                        >
                          <span>Buka</span>
                          <ExternalLink size={11} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      )}

      {/* ── SCREEN 5.1: AKUN / PROFIL ── */}
      {currentTab === 'akun' && (
        <main className="flex-1 flex flex-col w-full px-5 pt-6 pb-28 animate-fadeIn flex-1">
          {/* User Profile Card */}
          <div className="flex flex-col items-center justify-center my-3">
            <div className="relative">
              <div className="w-[88px] h-[88px] rounded-full bg-[#E1EDFD] flex items-center justify-center text-[#0074FC]">
                <User size={44} />
              </div>
              <div className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-white border-2 border-[#E1EDFD] flex items-center justify-center shadow-sm">
                <Sparkles size={14} className="text-[#0074FC]" />
              </div>
            </div>
            <h3 className="text-[18px] font-bold text-[#0A0E2E] mt-3">
              {leadData.name || 'Pengguna Baru'}
            </h3>
            <span className="text-[13px] font-medium text-[#98A2B3]">
              {leadData.wa || 'Belum mengisi nomor WhatsApp'}
            </span>
          </div>

          {/* Section: Hasil Tes Kamu */}
          <div className="mt-4">
            <div className="text-[12px] font-bold uppercase tracking-wider text-[#98A2B3] mb-2 px-1">
              Hasil Tes Kamu
            </div>
            <div className="bg-white rounded-[16px] border border-[#EDEFF3] overflow-hidden">
              <button
                onClick={() => {
                  if (calculatedResult) switchTab('hasil');
                  else startNewQuiz();
                }}
                className="w-full p-4 flex items-center justify-between hover:bg-[#F8FAFD] transition-colors border-b border-[#EDEFF3]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#DEF6F2] text-[#00A55E] flex items-center justify-center">
                    <FileText size={18} />
                  </div>
                  <div className="text-left">
                    <div className="text-[14.5px] font-bold text-[#0A0E2E]">
                      {calculatedResult ? `“${calculatedResult.persona.name}”` : 'Belum Ada Hasil'}
                    </div>
                    <div className="text-[12px] text-[#98A2B3]">
                      {calculatedResult ? 'Dilihat baru saja' : 'Klik untuk mulai tes'}
                    </div>
                  </div>
                </div>
                <ChevronRight size={18} className="text-[#98A2B3]" />
              </button>

              <button
                onClick={startNewQuiz}
                className="w-full p-4 flex items-center justify-between hover:bg-[#F8FAFD] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#E1EDFD] text-[#0074FC] flex items-center justify-center">
                    <RotateCcw size={18} />
                  </div>
                  <div className="text-left">
                    <div className="text-[14.5px] font-bold text-[#0A0E2E]">
                      Tes Ulang Skill
                    </div>
                    <div className="text-[12px] text-[#98A2B3]">
                      Update preferensi dan skor kecocokan
                    </div>
                  </div>
                </div>
                <ChevronRight size={18} className="text-[#98A2B3]" />
              </button>
            </div>
          </div>

          {/* Section: Pengaturan & Bantuan */}
          <div className="mt-6">
            <div className="text-[12px] font-bold uppercase tracking-wider text-[#98A2B3] mb-2 px-1">
              Pengaturan & Bantuan
            </div>
            <div className="bg-white rounded-[16px] border border-[#EDEFF3] overflow-hidden">
              <a
                href="https://wa.me/6281234567890?text=Halo%20Admin%20CariSideJob"
                target="_blank"
                rel="noreferrer"
                className="w-full p-4 flex items-center justify-between hover:bg-[#F8FAFD] transition-colors border-b border-[#EDEFF3]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#DDF8EF] text-[#00AE66] flex items-center justify-center">
                    <MessageSquare size={18} />
                  </div>
                  <div className="text-left">
                    <div className="text-[14.5px] font-bold text-[#0A0E2E]">
                      Hubungi Kami (WhatsApp)
                    </div>
                    <div className="text-[12px] text-[#98A2B3]">
                      Konsultasi dan tanya jawab
                    </div>
                  </div>
                </div>
                <ChevronRight size={18} className="text-[#98A2B3]" />
              </a>

              <Link
                href="/admin"
                className="w-full p-4 flex items-center justify-between hover:bg-[#F8FAFD] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#EDEDFD] text-[#3E37F9] flex items-center justify-center">
                    <Settings size={18} />
                  </div>
                  <div className="text-left">
                    <div className="text-[14.5px] font-bold text-[#0A0E2E]">
                      Dashboard Admin Owner
                    </div>
                    <div className="text-[12px] text-[#98A2B3]">
                      Kelola leads dan statistik konversi
                    </div>
                  </div>
                </div>
                <ChevronRight size={18} className="text-[#98A2B3]" />
              </Link>
            </div>
          </div>

          {/* Tombol Keluar (Destructive action token: #FDE9EC bg, #E5484D text) */}
          <div className="mt-6">
            <button
              onClick={() => {
                if (confirm('Yakin ingin mereset sesi dan keluar?')) {
                  localStorage.removeItem('arah_user_result');
                  setCalculatedResult(null);
                  setLeadData({ name: '', wa: '', email: '' });
                  switchTab('beranda');
                }
              }}
              className="w-full py-3.5 rounded-full font-bold text-[14px] transition-colors"
              style={{
                backgroundColor: '#FDE9EC',
                color: '#E5484D',
                border: 'none',
              }}
            >
              Keluar
            </button>
          </div>
        </main>
      )}

      {/* ── MODAL: LOWONGAN KERJA REMOTE ── */}
      {isRemoteJobsOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
          <div className="w-full max-w-[440px] bg-white rounded-t-[28px] sm:rounded-[28px] max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="p-4 border-b border-[#EDEFF3] flex items-center justify-between bg-white sticky top-0 z-10">
              <div className="flex items-center gap-2">
                <Briefcase size={20} className="text-[#0074FC]" />
                <h3 className="text-[17px] font-bold text-[#0A0E2E]">Lowongan Kerja Remote</h3>
              </div>
              <button
                onClick={() => setIsRemoteJobsOpen(false)}
                className="w-8 h-8 rounded-full bg-[#F1F3F7] flex items-center justify-center text-[#0A0E2E]"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content List */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
              {remoteJobs.map((job) => (
                <div
                  key={job.id}
                  className="p-3.5 rounded-2xl border border-[#EDEFF3] bg-[#FAFBFC] hover:border-[#0074FC] transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-[14.5px] font-bold text-[#0A0E2E]">{job.title}</h4>
                      <p className="text-[12px] text-[#98A2B3] mt-0.5">{job.company} • {job.location}</p>
                    </div>
                    <span className="text-[12px] font-extrabold text-[#0074FC] bg-[#E1EDFD] px-2.5 py-1 rounded-full whitespace-nowrap">
                      {job.salary}
                    </span>
                  </div>

                  <p className="text-[12px] text-[#3A4160] mt-2 line-clamp-2">
                    {job.description}
                  </p>

                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#EDEFF3]">
                    <span className="text-[11px] text-[#98A2B3]">Diposting {job.posted}</span>
                    <a
                      href={job.applyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[12px] font-bold text-[#0074FC] flex items-center gap-1 hover:underline"
                    >
                      <span>Lamar Sekarang</span>
                      <ExternalLink size={13} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL: PENJELASAN LENGKAP HASIL (Detail Explanation & Roadmap) ── */}
      {isDetailExplanationOpen && calculatedResult && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
          <div className="w-full max-w-[440px] bg-white rounded-t-[28px] sm:rounded-[28px] max-h-[88vh] flex flex-col overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="p-4 border-b border-[#EDEFF3] flex items-center justify-between bg-white sticky top-0 z-10">
              <div>
                <h3 className="text-[17px] font-bold text-[#0A0E2E]">Detail Pemetaan Lengkap</h3>
                <span className="text-[12px] text-[#98A2B3]">Persona: “{calculatedResult.persona.name}”</span>
              </div>
              <button
                onClick={() => setIsDetailExplanationOpen(false)}
                className="w-8 h-8 rounded-full bg-[#F1F3F7] flex items-center justify-center text-[#0A0E2E]"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable details */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
              {/* Readiness Score Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#0074FC] to-[#0B4EC8] text-white">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-semibold text-white/80">Skor Kesiapan Kerja</span>
                  <span className="text-[26px] font-extrabold">{calculatedResult.readinessScore}%</span>
                </div>
                <div className="w-full h-2 bg-white/20 rounded-full mt-2 overflow-hidden">
                  <div
                    className="h-full bg-white rounded-full"
                    style={{ width: `${calculatedResult.readinessScore}%` }}
                  />
                </div>
                <p className="text-[12px] text-white/80 mt-2">
                  Kamu memiliki fondasi yang kuat untuk memulai side job ini dalam 1-2 minggu ke depan.
                </p>
              </div>

              {/* Strengths & Gaps */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-[#DEF6F2] border border-[#BFF0E7]">
                  <span className="text-[12px] font-bold text-[#00A55E]">Kekuatan Kamu</span>
                  <ul className="text-[12px] text-[#0A0E2E] mt-1.5 space-y-1">
                    {calculatedResult.strengths.map((s, i) => (
                      <li key={i}>• {s}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#FDF3E5] border border-[#FBE3BF]">
                  <span className="text-[12px] font-bold text-[#FB9F05]">Area Perlu Dilatih</span>
                  <ul className="text-[12px] text-[#0A0E2E] mt-1.5 space-y-1">
                    {calculatedResult.gaps.map((g, i) => (
                      <li key={i}>• {g}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Top 1 Job Roadmap */}
              <div>
                <h4 className="text-[15px] font-bold text-[#0A0E2E] mb-2">
                  Roadmap Langkah Memulai ({calculatedResult.topMatches[0].name})
                </h4>
                <div className="space-y-2.5">
                  {calculatedResult.topMatches[0].roadmap?.map((r) => (
                    <div key={r.step} className="p-3 rounded-xl bg-[#F8FAFD] border border-[#EDEFF3]">
                      <span className="text-[11.5px] font-bold text-[#0074FC]">Langkah {r.step}: {r.title}</span>
                      <p className="text-[12px] text-[#3A4160] mt-0.5">{r.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lynk.id Guide CTA */}
              <div className="p-4 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE] mt-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11.5px] font-bold text-[#1D64EC] uppercase tracking-wider">Mulai Melangkah</span>
                  <span className="text-[11px] font-bold text-[#059669] bg-[#ECFDF5] px-2 py-0.5 rounded-full">Resmi Lynk.id</span>
                </div>
                <h4 className="text-[14.5px] font-bold text-[#0A0E2E]">
                  Panduan Lengkap Side Job {calculatedResult.topMatches[0].name}
                </h4>
                <p className="text-[12px] text-[#475569] mt-1 mb-3">
                  Dapatkan blueprint langkah kerja, template proposal klien, dan cara mulai menghasilkan dari rumah.
                </p>
                <a
                  href={normalizeLynkUrl(calculatedResult.topMatches[0].linkPanduan)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-[#0074FC] hover:bg-[#0060D1] text-white text-[13px] font-bold inline-flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                >
                  <span>Buka Panduan di Lynk.id</span>
                  <ExternalLink size={14} />
                </a>
              </div>

              {/* Share & Download actions */}
              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={shareToWhatsApp}
                  className="bg-[var(--color-primary)] text-white rounded-[999px] h-[52px] inline-flex items-center justify-center font-[700] text-[15px] w-full shadow-[0_6px_16px_rgba(0,116,252,0.28)] transition-all duration-200 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:bg-[var(--color-primary-hover)] hover:-translate-y-[1px] hover:shadow-[0_8px_20px_rgba(0,116,252,0.36)] disabled:opacity-55 disabled:cursor-not-allowed disabled:shadow-none flex-1 !h-[48px] text-[13.5px]"
                >
                  <Share2 size={16} />
                  <span>Share ke WA</span>
                </button>
                <button
                  onClick={downloadStoryAsImage}
                  className="bg-[var(--color-surface-sunken)] text-[var(--color-ink)] rounded-[999px] h-[52px] inline-flex items-center justify-center font-[700] text-[15px] w-full transition-colors duration-200 hover:bg-[#E6EAF0] flex-1 !h-[48px] text-[13.5px]"
                >
                  <Download size={16} />
                  <span>Download Story</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL: PRODUCT DETAIL ── */}
      {selectedProductDetail && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
          <div className="w-full max-w-[440px] bg-white rounded-t-[28px] sm:rounded-[28px] p-5 flex flex-col shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#EDEFF3]">
              <span className="bg-[var(--lav-tag)] text-[var(--color-ink-soft)] text-[11.5px] font-[600] px-[10px] py-[3px] rounded-full inline-block">{selectedProductDetail.category}</span>
              <button
                onClick={() => setSelectedProductDetail(null)}
                className="w-8 h-8 rounded-full bg-[#F1F3F7] flex items-center justify-center text-[#0A0E2E]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="my-4 flex items-center gap-4">
              {selectedProductDetail.imageUrl ? (
                <div className="w-[80px] h-[80px] rounded-[16px] overflow-hidden flex-shrink-0 bg-slate-100 border border-slate-200 shadow-sm">
                  <img
                    src={selectedProductDetail.imageUrl}
                    alt={selectedProductDetail.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <ProductCover3D type={selectedProductDetail.type || 'digital'} />
              )}
              <div>
                <h3 className="text-[16px] font-bold text-[#0A0E2E] leading-snug">
                  {selectedProductDetail.title}
                </h3>
                {selectedProductDetail.badge && (
                  <span className="text-[12px] font-bold text-[#0074FC] bg-[#EFF6FF] px-2.5 py-0.5 rounded-full inline-block mt-2">
                    {selectedProductDetail.badge}
                  </span>
                )}
              </div>
            </div>

            {selectedProductDetail.desc ? (
              <p className="text-[13.5px] text-[#3A4160] leading-relaxed mb-5">
                {selectedProductDetail.desc}
              </p>
            ) : null}

            <a
              href={normalizeLynkUrl(selectedProductDetail.url)}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[var(--color-primary)] text-white rounded-[999px] h-[52px] inline-flex items-center justify-center font-[700] text-[15px] w-full shadow-[0_6px_16px_rgba(0,116,252,0.28)] transition-all duration-200 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:bg-[var(--color-primary-hover)] hover:-translate-y-[1px] hover:shadow-[0_8px_20px_rgba(0,116,252,0.36)] disabled:opacity-55 disabled:cursor-not-allowed disabled:shadow-none text-[14.5px] gap-2"
            >
              <span>Buka Panduan di Lynk.id</span>
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      )}

      {/* ── BOTTOM NAVIGATION (Fixed 4 tabs) ── */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] h-[64px] bg-white border-t border-[var(--color-border-soft)] flex items-center justify-around px-[8px] py-[2px] pb-[calc(2px+env(safe-area-inset-bottom))] z-50">
        {/* Tab 1: Beranda */}
        <button
          type="button"
          onClick={() => switchTab('beranda')}
          className={`flex flex-col items-center justify-center gap-[3px] px-[12px] py-[6px] transition-colors duration-[180ms] min-w-[60px] ${currentTab === 'beranda' ? 'text-[var(--color-primary)]' : 'text-[var(--nav-inactive)]'}`}
        >
          <Home
            size={22}
            strokeWidth={currentTab === 'beranda' ? 2.5 : 2}
            fill={currentTab === 'beranda' ? '#0074FC' : 'none'}
          />
          <span className="text-[11px] font-[600] leading-none">Beranda</span>
        </button>

        {/* Tab 2: Hasil */}
        <button
          type="button"
          onClick={() => switchTab('hasil')}
          className={`flex flex-col items-center justify-center gap-[3px] px-[12px] py-[6px] transition-colors duration-[180ms] min-w-[60px] ${currentTab === 'hasil' ? 'text-[var(--color-primary)]' : 'text-[var(--nav-inactive)]'}`}
        >
          <FileText
            size={22}
            strokeWidth={currentTab === 'hasil' ? 2.5 : 2}
            fill={currentTab === 'hasil' ? '#0074FC' : 'none'}
          />
          <span className="text-[11px] font-[600] leading-none">Hasil</span>
        </button>

        {/* Tab 3: Rekomendasi */}
        <button
          type="button"
          onClick={() => switchTab('rekomendasi')}
          className={`flex flex-col items-center justify-center gap-[3px] px-[12px] py-[6px] transition-colors duration-[180ms] min-w-[60px] ${currentTab === 'rekomendasi' ? 'text-[var(--color-primary)]' : 'text-[var(--nav-inactive)]'}`}
        >
          <ShoppingBag
            size={22}
            strokeWidth={currentTab === 'rekomendasi' ? 2.5 : 2}
            fill={currentTab === 'rekomendasi' ? '#0074FC' : 'none'}
          />
          <span className="text-[11px] font-[600] leading-none">Rekomendasi</span>
        </button>

        {/* Tab 4: Akun */}
        <button
          type="button"
          onClick={() => switchTab('akun')}
          className={`flex flex-col items-center justify-center gap-[3px] px-[12px] py-[6px] transition-colors duration-[180ms] min-w-[60px] ${currentTab === 'akun' ? 'text-[var(--color-primary)]' : 'text-[var(--nav-inactive)]'}`}
        >
          <User
            size={22}
            strokeWidth={currentTab === 'akun' ? 2.5 : 2}
            fill={currentTab === 'akun' ? '#0074FC' : 'none'}
          />
          <span className="text-[11px] font-[600] leading-none">Akun</span>
        </button>
      </nav>
    </div>
  );
}
