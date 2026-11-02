'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Users,
  Briefcase,
  ShoppingBag,
  Eye,
  TrendingUp,
  Download,
  RotateCcw,
  LogOut,
  Search,
  Plus,
  ExternalLink,
  Trash2,
  Edit3,
  X,
  CheckCircle2,
  AlertCircle,
  Globe,
  Clock,
  ArrowUpRight,
  Filter,
  Check,
  ChevronDown,
  ChevronUp,
  Activity,
  Layers,
  Sparkles,
  Phone,
  Mail,
  ShieldCheck,
  Smartphone,
  Flame,
  Award,
  GripVertical,
  ArrowUp,
  ArrowDown,
  ArrowUpToLine,
} from 'lucide-react';
import {
  JOB_CATEGORIES,
  SIDE_JOBS_DB,
  getJobCategory,
  toTitleCase,
  getCompanyAvatarStyle,
  getCompanyMonogram,
} from '@/lib/data';

interface LeadItem {
  id: string;
  name: string;
  wa: string;
  email: string;
  profesi: string;
  topMatch: string;
  topMatchScore: number;
  readinessScore: number;
  personaName: string;
  skills: string[];
  tools: string[];
  gaps: string[];
  createdAt: string;
}

interface JobItem {
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

interface StatsData {
  totalStarts: number;
  totalLeads: number;
  conversionRate: string;
  avgReadiness: string;
  popularJob: string;
  totalUniqueVisitors?: number;
  todayUniqueVisitors?: number;
  totalVisits?: number;
  visitorToLeadRate?: string;
}

interface RecentVisitorItem {
  id: string;
  maskedIp: string;
  path: string;
  referrer: string;
  createdAt: string;
}

interface ProductItem {
  id: string;
  title: string;
  category: string;
  type: string;
  desc: string;
  price: string;
  badge: string;
  url: string;
  imageUrl: string;
  sideJob: string;
  isPublished: boolean;
  order: number;
  createdAt: string;
}

type ProductFormData = Omit<ProductItem, 'id' | 'createdAt'>;

const BADGE_OPTIONS = [
  { value: '', label: 'Tanpa Badge (Kosong)' },
  { value: 'Best Seller', label: '🔥 Best Seller' },
  { value: 'Rekomendasi Utama', label: '⭐ Rekomendasi Utama' },
  { value: 'Rekomendasi', label: '👍 Rekomendasi' },
  { value: 'Starter Pack', label: '📦 Starter Pack' },
  { value: 'Paling Diminati', label: '🎯 Paling Diminati' },
  { value: 'Pilihan Mentor', label: '🏆 Pilihan Mentor' },
  { value: 'Wajib Punya', label: '💡 Wajib Punya' },
  { value: 'Diskon Spesial', label: '🏷️ Diskon Spesial' },
  { value: 'Baru / New', label: '✨ Baru / New' },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'leads' | 'loker' | 'produk'>('leads');
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [stats, setStats] = useState<StatsData>({
    totalStarts: 0,
    totalLeads: 0,
    conversionRate: '0%',
    avgReadiness: '0%',
    popularJob: '-',
    totalUniqueVisitors: 0,
    todayUniqueVisitors: 0,
    totalVisits: 0,
    visitorToLeadRate: '0%',
  });
  const [recentVisitors, setRecentVisitors] = useState<RecentVisitorItem[]>([]);
  const [showVisitorLog, setShowVisitorLog] = useState(false);

  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [products, setProducts] = useState<ProductItem[]>([]);

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [leadTierFilter, setLeadTierFilter] = useState<'ALL' | 'HIGH' | 'MID' | 'LOW'>('ALL');
  const [productSearch, setProductSearch] = useState('');
  const [jobSearch, setJobSearch] = useState('');
  const [jobTypeFilter, setJobTypeFilter] = useState('ALL');

  // Modals & Selection
  const [selectedLead, setSelectedLead] = useState<LeadItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Job Modal
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobItem | null>(null);
  const [isLokerFull, setIsLokerFull] = useState(false);
  const [isTogglingFull, setIsTogglingFull] = useState(false);
  const [jobForm, setJobForm] = useState({
    title: '',
    company: '',
    location: 'WFH / Remote Indonesia',
    salary: 'Rp 4.500.000 - Rp 6.500.000 / bln',
    type: 'Full-time Remote',
    category: 'Remote Job',
    tags: '',
    description: '',
    applyUrl: '',
  });

  // Product Modal
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [importNotification, setImportNotification] = useState<string | null>(null);

  // Product Arrange & Reordering State
  const [draggedProductIndex, setDraggedProductIndex] = useState<number | null>(null);
  const [dragOverProductIndex, setDragOverProductIndex] = useState<number | null>(null);
  const [isReorderingProducts, setIsReorderingProducts] = useState(false);
  const [reorderSuccessMsg, setReorderSuccessMsg] = useState<string | null>(null);
  const [productForm, setProductForm] = useState<ProductFormData>({
    title: '',
    category: 'Ebook',
    type: 'digital',
    desc: '',
    price: 'Rp 49.000',
    badge: 'Best Seller',
    url: '',
    imageUrl: '',
    sideJob: 'Umum / Semua Profil',
    isPublished: true,
    order: 0,
  });

  const cleanLynkUrl = (rawUrl: string): string => {
    let url = (rawUrl || '').trim();
    if (!url) return '';
    url = url.split('?')[0].replace(/\/+$/, '');
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = `https://${url}`;
    }
    return url;
  };

  useEffect(() => {
    fetchLeads();
    fetchJobs();
    fetchProducts();
    fetchAnalytics();

    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('tab') === 'produk' || params.get('import') === 'lynk') {
        setActiveTab('produk');
      }
      if (params.get('import') === 'lynk') {
        const rawTitle = params.get('title') || '';
        const rawImage = params.get('image') || '';
        const rawUrl = params.get('url') || '';
        const rawPrice = params.get('price') || '';

        const cleanTitle = rawTitle.replace(/\s*\|\s*LYNK.*$/i, '').trim();
        const cleanUrl = cleanLynkUrl(rawUrl);

        let detectedCat = 'Ebook';
        const tLower = cleanTitle.toLowerCase();
        if (tLower.includes('template') || tLower.includes('sheet') || tLower.includes('notulen') || tLower.includes('excel')) {
          detectedCat = 'Template';
        } else if (tLower.includes('kursus') || tLower.includes('kelas') || tLower.includes('mentoring')) {
          detectedCat = 'Kursus';
        } else if (tLower.includes('starter') || tLower.includes('kit') || tLower.includes('bundle')) {
          detectedCat = 'Starter Pack';
        }

        setProductForm({
          title: cleanTitle,
          price: rawPrice || 'Rp 49.000',
          imageUrl: rawImage,
          desc: '',
          url: cleanUrl,
          category: detectedCat,
          type: detectedCat.toLowerCase().replace(/\s+/g, ''),
          badge: 'Best Seller',
          sideJob: 'Umum / Semua Profil',
          isPublished: true,
          order: 0,
        });
        setEditingProduct(null);
        setIsProductModalOpen(true);
        setImportNotification('Data produk dari Lynk.id berhasil dimuat ke formulir.');
        window.history.replaceState({}, '', '/admin');
      }
    }
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`/api/products?admin=true&t=${Date.now()}`, { cache: 'no-store' });
      if (res.status === 401) {
        window.location.href = '/login';
        return;
      }
      const data = await res.json();
      if (data.success && Array.isArray(data.products)) {
        setProducts(data.products);
      }
    } catch (e) {
      console.error('Error fetching products:', e);
    }
  };

  const saveReorderedProducts = async (reorderedList: ProductItem[]) => {
    setIsReorderingProducts(true);
    try {
      const orderedIds = reorderedList.map(p => p.id);
      const res = await fetch('/api/products', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderedIds }),
      });
      const data = await res.json();
      if (data.success) {
        setReorderSuccessMsg('Urutan produk berhasil disimpan & langsung tayang di website!');
        setTimeout(() => setReorderSuccessMsg(null), 3500);
      } else {
        alert('Gagal menyimpan urutan: ' + (data.error || 'Terjadi kesalahan'));
      }
    } catch (err: any) {
      console.error('Error saving product order:', err);
    } finally {
      setIsReorderingProducts(false);
    }
  };

  const moveProduct = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= products.length || fromIndex === toIndex) return;
    const reordered = [...products];
    const [moved] = reordered.splice(fromIndex, 1);
    reordered.splice(toIndex, 0, moved);
    setProducts(reordered);
    saveReorderedProducts(reordered);
  };

  const moveProductToTop = (fromIndex: number) => {
    if (fromIndex === 0) return;
    moveProduct(fromIndex, 0);
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedProductIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    try {
      e.dataTransfer.setData('text/plain', String(index));
    } catch {
      // fallback
    }
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverProductIndex !== index) {
      setDragOverProductIndex(index);
    }
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedProductIndex !== null && draggedProductIndex !== targetIndex) {
      moveProduct(draggedProductIndex, targetIndex);
    }
    setDraggedProductIndex(null);
    setDragOverProductIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedProductIndex(null);
    setDragOverProductIndex(null);
  };

  const fetchAnalytics = async () => {
    try {
      const res = await fetch('/api/analytics');
      if (res.status === 401) return;
      const data = await res.json();
      if (data.success) {
        if (Array.isArray(data.recentVisitors)) {
          setRecentVisitors(data.recentVisitors);
        }
        if (data.stats) {
          setStats(prev => ({
            ...prev,
            totalUniqueVisitors: data.stats.totalUniqueVisitors || prev.totalUniqueVisitors || 0,
            todayUniqueVisitors: data.stats.todayUniqueVisitors || prev.todayUniqueVisitors || 0,
            totalVisits: data.stats.totalPageViews || prev.totalVisits || 0,
          }));
        }
      }
    } catch (e) {
      console.warn('Gagal memuat analitik:', e);
    }
  };

  const fetchLeads = async (q = '') => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/leads${q ? `?q=${encodeURIComponent(q)}` : ''}`);
      if (res.status === 401) {
        window.location.href = '/login';
        return;
      }
      const data = await res.json();
      if (data.success) {
        setLeads(data.leads || []);
        if (data.stats) setStats(data.stats);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchJobs = async () => {
    try {
      const res = await fetch(`/api/jobs?admin=true&t=${Date.now()}`, { cache: 'no-store' });
      if (res.status === 401) {
        window.location.href = '/login';
        return;
      }
      const data = await res.json();
      if (data.success && Array.isArray(data.jobs)) setJobs(data.jobs);
      if (data.success && typeof data.isLokerFull === 'boolean') {
        setIsLokerFull(data.isLokerFull);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const toggleLokerFull = async () => {
    const nextState = !isLokerFull;
    setIsTogglingFull(true);
    try {
      const res = await fetch('/api/jobs', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isLokerFull: nextState }),
      });
      const data = await res.json();
      if (data.success) {
        setIsLokerFull(data.isLokerFull);
      } else {
        alert(data.error || 'Gagal mengubah status lowongan');
      }
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan saat mengubah status.');
    } finally {
      setIsTogglingFull(false);
    }
  };

  // Job Actions
  const openAddJobModal = () => {
    setEditingJob(null);
    setJobForm({
      title: '',
      company: '',
      location: 'WFH / Remote Indonesia',
      salary: 'Rp 4.500.000 - Rp 6.500.000 / bln',
      type: 'Full-time Remote',
      category: 'Remote Job',
      tags: '',
      description: '',
      applyUrl: '',
    });
    setIsJobModalOpen(true);
  };

  const openEditJobModal = (job: JobItem) => {
    setEditingJob(job);
    setJobForm({
      title: job.title || '',
      company: job.company || '',
      location: job.location || 'WFH / Remote Indonesia',
      salary: job.salary || '',
      type: job.type || 'Full-time Remote',
      category: job.primarySideJob || 'Remote Job',
      tags: Array.isArray(job.tags) ? job.tags.join(', ') : (job.tags || ''),
      description: job.description || '',
      applyUrl: job.applyUrl || '',
    });
    setIsJobModalOpen(true);
  };

  const saveJob = async () => {
    if (!jobForm.title.trim() || !jobForm.company.trim()) {
      alert('Judul lowongan dan nama perusahaan wajib diisi.');
      return;
    }
    setIsSaving(true);
    try {
      const isEdit = Boolean(editingJob?.id);
      const url = '/api/jobs';
      const method = isEdit ? 'PUT' : 'POST';
      const payload = {
        ...(isEdit ? { id: editingJob!.id } : {}),
        ...jobForm,
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setIsJobModalOpen(false);
        setEditingJob(null);
        fetchJobs();
      } else {
        alert('Gagal menyimpan: ' + (data.error || 'Terjadi kesalahan'));
      }
    } catch (e: any) {
      alert('Error: ' + e?.message);
    } finally {
      setIsSaving(false);
    }
  };

  const deleteJob = async (id: string, title: string) => {
    if (!confirm(`Hapus lowongan "${title}"?`)) return;
    try {
      const res = await fetch(`/api/jobs?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        setJobs(prev => prev.filter(j => j.id !== id));
        fetchJobs();
      } else {
        alert('Gagal menghapus: ' + (data.error || 'Terjadi kesalahan'));
      }
    } catch (e: any) {
      alert('Gagal menghapus lowongan: ' + (e?.message || 'Terjadi kesalahan'));
    }
  };

  // Product Actions
  const openAddProductModal = () => {
    setEditingProduct(null);
    setProductForm({
      title: '',
      category: 'Ebook',
      type: 'digital',
      desc: '',
      price: 'Rp 49.000',
      badge: 'Best Seller',
      url: '',
      imageUrl: '',
      sideJob: 'Umum / Semua Profil',
      isPublished: true,
      order: 0,
    });
    setIsProductModalOpen(true);
  };

  const openEditProductModal = (prod: ProductItem) => {
    setEditingProduct(prod);
    setProductForm({
      title: prod.title,
      category: prod.category || 'Ebook',
      type: prod.type || 'digital',
      desc: prod.desc || '',
      price: prod.price || 'Rp 0',
      badge: prod.badge || '',
      url: prod.url || '',
      imageUrl: prod.imageUrl || '',
      sideJob: prod.sideJob || 'Umum / Semua Profil',
      isPublished: prod.isPublished ?? true,
      order: prod.order || 0,
    });
    setIsProductModalOpen(true);
  };

  const saveProduct = async () => {
    if (!productForm.title.trim() || !productForm.url.trim()) {
      alert('Judul dan link produk wajib diisi.');
      return;
    }
    setIsSaving(true);
    try {
      const cleanUrl = cleanLynkUrl(productForm.url);
      const isEdit = Boolean(editingProduct?.id);
      const url = '/api/products';
      const method = isEdit ? 'PUT' : 'POST';
      const payload = {
        ...(isEdit ? { id: editingProduct!.id } : {}),
        ...productForm,
        url: cleanUrl,
        price: productForm.price || 'Rp 0',
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setIsProductModalOpen(false);
        setEditingProduct(null);
        fetchProducts();
      } else {
        alert('Gagal menyimpan: ' + (data.error || 'Terjadi kesalahan'));
      }
    } catch (e: any) {
      alert('Error: ' + e.message);
    } finally {
      setIsSaving(false);
    }
  };

  const deleteProduct = async (id: string, title: string) => {
    if (!confirm(`Hapus produk "${title}"?`)) return;
    try {
      const res = await fetch(`/api/products?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        fetchProducts();
      } else {
        alert('Gagal menghapus: ' + (data.error || 'Terjadi kesalahan'));
      }
    } catch (e: any) {
      alert('Error: ' + e.message);
    }
  };

  const toggleProductPublish = async (prod: ProductItem) => {
    try {
      await fetch('/api/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: prod.id, isPublished: !prod.isPublished }),
      });
      fetchProducts();
    } catch (e) {
      console.error(e);
    }
  };

  // Lead Actions
  const deleteLead = async (id: string) => {
    if (!confirm('Yakin hapus lead ini? Data tidak dapat dipulihkan.')) return;
    try {
      const res = await fetch(`/api/leads?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setSelectedLead(null);
        fetchLeads(searchQuery);
      }
    } catch {
      alert('Gagal menghapus lead.');
    }
  };

  const resetAll = async () => {
    if (!confirm('PERINGATAN: Yakin reset SEMUA data leads dan metrik asesmen?')) return;
    try {
      await fetch('/api/leads?reset=true', { method: 'DELETE' });
      fetchLeads();
    } catch {
      alert('Gagal reset data.');
    }
  };

  const exportCsv = () => {
    if (!leads.length) return alert('Belum ada data leads untuk diekspor.');
    let csv = 'ID,Tanggal,Nama,WhatsApp,Email,Profesi,Top Match,Kesiapan,Gaps,Skills,Tools\n';
    leads.forEach(l => {
      csv += `"${l.id}","${l.createdAt}","${l.name}","${l.wa}","${l.email}","${l.profesi}","${l.topMatch}","${l.readinessScore}%","${(l.gaps || []).join('; ')}","${(l.skills || []).join(', ')}","${(l.tools || []).join(', ')}"\n`;
    });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
    a.download = `CariSideJob_Leads_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  const fmtDate = (iso: string) => {
    const d = new Date(iso);
    return isNaN(d.getTime())
      ? '-'
      : d.toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'short',
          hour: '2-digit',
          minute: '2-digit',
        });
  };

  const fmtWa = (wa: string) => {
    const clean = wa.replace(/\D/g, '');
    return clean.startsWith('0') ? '62' + clean.slice(1) : clean;
  };

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    return leads.filter(l => {
      const q = searchQuery.toLowerCase().trim();
      const matchesQ =
        !q ||
        l.name.toLowerCase().includes(q) ||
        l.wa.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        l.topMatch.toLowerCase().includes(q) ||
        l.profesi.toLowerCase().includes(q);

      let matchesTier = true;
      if (leadTierFilter === 'HIGH') matchesTier = l.readinessScore >= 80;
      else if (leadTierFilter === 'MID') matchesTier = l.readinessScore >= 60 && l.readinessScore < 80;
      else if (leadTierFilter === 'LOW') matchesTier = l.readinessScore < 60;

      return matchesQ && matchesTier;
    });
  }, [leads, searchQuery, leadTierFilter]);

  // Derived Analytics & Funnel Calculations
  const analyticsData = useMemo(() => {
    const totalVisitors = stats.totalUniqueVisitors || Math.max(stats.totalStarts, leads.length, 1);
    const starts = stats.totalStarts || 0;
    const leadsCount = leads.length;

    const startsPct = Math.min(100, Math.round((starts / Math.max(totalVisitors, 1)) * 100));
    const leadsPct = Math.min(100, Math.round((leadsCount / Math.max(starts || totalVisitors, 1)) * 100));

    // Distribution by Top Match
    const jobCounts: Record<string, number> = {};
    leads.forEach(l => {
      const match = l.topMatch || 'Lainnya';
      jobCounts[match] = (jobCounts[match] || 0) + 1;
    });

    const sortedJobCounts = Object.entries(jobCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    // Readiness Tiers
    const highTier = leads.filter(l => l.readinessScore >= 80).length;
    const midTier = leads.filter(l => l.readinessScore >= 60 && l.readinessScore < 80).length;
    const lowTier = leads.filter(l => l.readinessScore < 60).length;

    return {
      totalVisitors,
      starts,
      leadsCount,
      startsPct,
      leadsPct,
      sortedJobCounts,
      highTier,
      midTier,
      lowTier,
    };
  }, [stats, leads]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans antialiased selection:bg-blue-100 selection:text-blue-700">
      {/* TOP HEADER */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          {/* Brand Identity */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                  Cari Side Job
                </span>
                <span className="bg-blue-50 text-blue-700 border border-blue-200/60 text-[10px] font-extrabold px-2 py-0.5 rounded-full tracking-wide uppercase">
                  Admin
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Anti-Spam Unique IP Active</span>
              </div>
            </div>
          </Link>

          {/* Action Toolbar */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <Link
              href="/"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 px-3 py-2 rounded-xl transition-colors"
              title="Kunjungi website publik"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Lihat Website</span>
            </Link>

            <button
              onClick={exportCsv}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 px-3.5 py-2 rounded-xl shadow-xs shadow-blue-500/20 transition-colors"
              title="Download rekapan leads dalam format CSV"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Export</span> CSV ({leads.length})
            </button>

            <button
              onClick={resetAll}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-3 py-2 rounded-xl transition-colors"
              title="Reset data leads"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Reset</span>
            </button>

            <button
              onClick={async () => {
                if (!confirm('Yakin ingin keluar dari panel admin?')) return;
                try {
                  await fetch('/api/admin/logout', { method: 'POST' });
                } finally {
                  window.location.href = '/login';
                }
              }}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-rose-600 bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 px-3 py-2 rounded-xl transition-colors"
              title="Keluar dari Panel Admin"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20">
        {/* SEGMENTED TAB SWITCHER */}
        <div className="flex items-center gap-2 p-1 bg-slate-200/60 rounded-2xl w-full max-w-xl mx-auto mb-8 shadow-inner overflow-x-auto">
          <button
            onClick={() => setActiveTab('leads')}
            className={`flex-1 min-w-[120px] inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'leads'
                ? 'bg-white text-blue-600 shadow-sm shadow-slate-300/50'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/40'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Leads & Metrik</span>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded-full font-extrabold ${
                activeTab === 'leads' ? 'bg-blue-100 text-blue-700' : 'bg-slate-300 text-slate-700'
              }`}
            >
              {leads.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('loker')}
            className={`flex-1 min-w-[120px] inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'loker'
                ? 'bg-white text-blue-600 shadow-sm shadow-slate-300/50'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/40'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Lowongan</span>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded-full font-extrabold ${
                activeTab === 'loker' ? 'bg-blue-100 text-blue-700' : 'bg-slate-300 text-slate-700'
              }`}
            >
              {jobs.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('produk')}
            className={`flex-1 min-w-[120px] inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'produk'
                ? 'bg-white text-blue-600 shadow-sm shadow-slate-300/50'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/40'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Produk</span>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded-full font-extrabold ${
                activeTab === 'produk' ? 'bg-blue-100 text-blue-700' : 'bg-slate-300 text-slate-700'
              }`}
            >
              {products.length}
            </span>
          </button>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            TAB 1: LEADS & ANALITIK
        ════════════════════════════════════════════════════════════════ */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
            {/* BENTO STAT CARDS (2x2 on Mobile, 4-col on Desktop) */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {/* Stat 1: Unique Visitors */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs relative overflow-hidden group hover:border-blue-300 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Pengunjung Unik
                  </span>
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Eye className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {stats.totalUniqueVisitors || stats.totalStarts || 0}
                </div>
                <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200/60">
                    +{stats.todayUniqueVisitors || 0} hari ini
                  </span>
                  <span className="text-[11px] text-slate-600 font-semibold">IP Unik</span>
                </div>
              </div>

              {/* Stat 2: Leads Captured */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs relative overflow-hidden group hover:border-emerald-300 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Total Leads
                  </span>
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {stats.totalLeads}
                </div>
                <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[11px] font-bold border border-blue-200/60">
                    Konversi {stats.conversionRate}
                  </span>
                  <span className="text-[11px] text-slate-600 font-semibold">{stats.totalStarts} asesmen</span>
                </div>
              </div>

              {/* Stat 3: Avg Readiness */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs relative overflow-hidden group hover:border-amber-300 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Rata Kesiapan
                  </span>
                  <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {stats.avgReadiness}
                </div>
                <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-amber-50 text-amber-700 text-[11px] font-bold border border-amber-200/60">
                    {analyticsData.highTier} Siap Kerja
                  </span>
                  <span className="text-[11px] text-slate-600 font-semibold">Skor $\ge 80\%$</span>
                </div>
              </div>

              {/* Stat 4: Top Recommendation */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs relative overflow-hidden group hover:border-violet-300 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Paling Diminati
                  </span>
                  <div className="w-7 h-7 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-lg sm:text-xl font-black text-slate-900 tracking-tight truncate" title={stats.popularJob}>
                  {stats.popularJob || '-'}
                </div>
                <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-violet-50 text-violet-700 text-[11px] font-bold border border-violet-200/60">
                    Top Match
                  </span>
                  <span className="text-[11px] text-slate-600 font-semibold">Paling sering cocok</span>
                </div>
              </div>
            </div>

            {/* INTERACTIVE ANALYTICS & VISUAL FUNNEL */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Card 1: Visual Conversion Funnel */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                        <Layers className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-extrabold text-sm text-slate-900">Funnel Konversi Asesmen</h3>
                        <p className="text-[11px] text-slate-500 font-medium">Alur konversi dari pengunjung hingga menjadi leads</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Live
                    </span>
                  </div>

                  {/* Funnel Visual Steps */}
                  <div className="space-y-3.5">
                    {/* Step 1: Visitors */}
                    <div>
                      <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
                        <span className="flex items-center gap-1.5">
                          <Globe className="w-3.5 h-3.5 text-blue-500" />
                          <span>1. Pengunjung Unik Website</span>
                        </span>
                        <span className="text-slate-900">{analyticsData.totalVisitors} Org (100%)</span>
                      </div>
                      <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full w-full"></div>
                      </div>
                    </div>

                    {/* Step 2: Starts */}
                    <div>
                      <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
                        <span className="flex items-center gap-1.5">
                          <Activity className="w-3.5 h-3.5 text-amber-500" />
                          <span>2. Memulai Kuis Asesmen</span>
                        </span>
                        <span className="text-slate-900">
                          {analyticsData.starts} Org ({analyticsData.startsPct}%)
                        </span>
                      </div>
                      <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full transition-all duration-500"
                          style={{ width: `${Math.max(analyticsData.startsPct, 4)}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Step 3: Completed Leads */}
                    <div>
                      <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
                        <span className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-emerald-500" />
                          <span>3. Menyelesaikan & Kontak Masuk</span>
                        </span>
                        <span className="text-emerald-700 font-extrabold">
                          {analyticsData.leadsCount} Leads ({analyticsData.leadsPct}%)
                        </span>
                      </div>
                      <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
                          style={{ width: `${Math.max(analyticsData.leadsPct, 4)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Perhitungan terlindung dari multiple refresh spam</span>
                  </span>
                  <span className="font-bold text-blue-600">Sesi 30 Menit</span>
                </div>
              </div>

              {/* Card 2: Distribution by Match & Readiness Tiers */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                        <Award className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-extrabold text-sm text-slate-900">Distribusi Kesiapan & Bidang Teratas</h3>
                        <p className="text-[11px] text-slate-500 font-medium">Karakteristik peserta yang mengisi kuis</p>
                      </div>
                    </div>
                  </div>

                  {/* Readiness Pill Badges */}
                  <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                    <div className="bg-emerald-50/70 border border-emerald-200/70 p-2.5 rounded-xl">
                      <div className="text-[10px] font-bold text-emerald-800 uppercase">Siap Kerja ($\ge 80\%$)</div>
                      <div className="text-base font-extrabold text-emerald-700">{analyticsData.highTier} Peserta</div>
                    </div>
                    <div className="bg-amber-50/70 border border-amber-200/70 p-2.5 rounded-xl">
                      <div className="text-[10px] font-bold text-amber-800 uppercase">Potensial (60-79%)</div>
                      <div className="text-base font-extrabold text-amber-700">{analyticsData.midTier} Peserta</div>
                    </div>
                    <div className="bg-slate-100 border border-slate-200 p-2.5 rounded-xl">
                      <div className="text-[10px] font-bold text-slate-700 uppercase">Pemula (&lt; 60%)</div>
                      <div className="text-base font-extrabold text-slate-800">{analyticsData.lowTier} Peserta</div>
                    </div>
                  </div>

                  {/* Top Matching Jobs List */}
                  <div className="space-y-2">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Rekomendasi Terbanyak
                    </div>
                    {analyticsData.sortedJobCounts.length === 0 ? (
                      <p className="text-xs text-slate-600 italic">Belum ada data leads untuk distribusi kategori.</p>
                    ) : (
                      analyticsData.sortedJobCounts.map(([jobName, count], idx) => {
                        const pct = Math.round((count / Math.max(leads.length, 1)) * 100);
                        return (
                          <div key={jobName} className="space-y-1">
                            <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                              <span className="truncate max-w-[200px]">
                                {idx + 1}. {jobName}
                              </span>
                              <span className="text-slate-900 font-bold">
                                {count} ({pct}%)
                              </span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-blue-500 rounded-full"
                                style={{ width: `${Math.max(pct, 5)}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-600 font-medium">Berdasarkan skor asesmen AI</span>
                  <span className="text-[11px] font-bold text-slate-700">{leads.length} Total Data</span>
                </div>
              </div>
            </div>

            {/* LIVE RECENT VISITORS ACCORDION / TOGGLE */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
              <button
                type="button"
                onClick={() => setShowVisitorLog(!showVisitorLog)}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50/70 transition-colors focus:outline-none"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
                    <Globe className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-extrabold text-sm text-slate-900">
                        Live Feed: Pengunjung Terbaru (IP-Masked)
                      </h3>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-50 text-blue-700 border border-blue-200">
                        {recentVisitors.length} Sesi Terakhir
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      IP otomatis disamarkan untuk privasi, dilindungi anti-spam refresh
                    </p>
                  </div>
                </div>
                <div className="text-slate-400">
                  {showVisitorLog ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {showVisitorLog && (
                <div className="border-t border-slate-100 p-4 bg-slate-50/50">
                  {recentVisitors.length === 0 ? (
                    <p className="text-xs text-slate-600 text-center py-4">Belum ada log pengunjung terekam.</p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                      {recentVisitors.map(v => (
                        <div
                          key={v.id}
                          className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs text-xs space-y-1"
                        >
                          <div className="flex items-center justify-between font-bold text-slate-800">
                            <span className="flex items-center gap-1.5 text-blue-600">
                              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                              {v.maskedIp}
                            </span>
                            <span className="text-[10px] text-slate-600 font-normal">{fmtDate(v.createdAt)}</span>
                          </div>
                          <div className="text-[11px] text-slate-600 truncate">
                            <strong>Path:</strong> {v.path || '/'}
                          </div>
                          <div className="text-[10px] text-slate-600 truncate">
                            <strong>Ref:</strong> {v.referrer || 'Direct'}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* LEADS LIST PANEL */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
              {/* Filter & Search Header */}
              <div className="p-4 sm:p-5 border-b border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="font-extrabold text-base text-slate-900">Daftar Leads & Peserta</h2>
                  <p className="text-xs text-slate-500">
                    Menampilkan {filteredLeads.length} dari {leads.length} total peserta terdaftar
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                  {/* Readiness Tier Pills */}
                  <div className="flex items-center bg-slate-100 p-1 rounded-xl gap-1 text-xs font-bold text-slate-600">
                    <button
                      onClick={() => setLeadTierFilter('ALL')}
                      className={`px-2.5 py-1.5 rounded-lg transition-all ${
                        leadTierFilter === 'ALL' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
                      }`}
                    >
                      Semua
                    </button>
                    <button
                      onClick={() => setLeadTierFilter('HIGH')}
                      className={`px-2.5 py-1.5 rounded-lg transition-all ${
                        leadTierFilter === 'HIGH' ? 'bg-white text-emerald-700 shadow-xs' : 'hover:text-slate-900'
                      }`}
                    >
                      $\ge 80\%$
                    </button>
                    <button
                      onClick={() => setLeadTierFilter('MID')}
                      className={`px-2.5 py-1.5 rounded-lg transition-all ${
                        leadTierFilter === 'MID' ? 'bg-white text-amber-700 shadow-xs' : 'hover:text-slate-900'
                      }`}
                    >
                      60-79%
                    </button>
                    <button
                      onClick={() => setLeadTierFilter('LOW')}
                      className={`px-2.5 py-1.5 rounded-lg transition-all ${
                        leadTierFilter === 'LOW' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
                      }`}
                    >
                      &lt;60%
                    </button>
                  </div>

                  {/* Search Input */}
                  <div className="relative min-w-[240px]">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Cari nama, WA, email, job..."
                      value={searchQuery}
                      onChange={e => {
                        setSearchQuery(e.target.value);
                        fetchLeads(e.target.value);
                      }}
                      className="w-full pl-9 pr-3 py-2 text-xs font-medium rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50/50 focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* DESKTOP TABLE VIEW (Visible on tablet & desktop) */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50/70 border-b border-slate-200/80 text-slate-500 font-extrabold uppercase tracking-wider text-[11px]">
                      <th className="py-3 px-4">Waktu</th>
                      <th className="py-3 px-4">Nama Lengkap</th>
                      <th className="py-3 px-4">WhatsApp</th>
                      <th className="py-3 px-4">Email</th>
                      <th className="py-3 px-4">Profesi</th>
                      <th className="py-3 px-4">Top Match</th>
                      <th className="py-3 px-4 text-center">Kesiapan</th>
                      <th className="py-3 px-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {isLoading ? (
                      <tr>
                        <td colSpan={8} className="py-12 text-center text-slate-400">
                          Memuat data leads...
                        </td>
                      </tr>
                    ) : filteredLeads.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-12 text-center text-slate-400">
                          Tidak ada data leads yang cocok dengan kriteria pencarian.
                        </td>
                      </tr>
                    ) : (
                      filteredLeads.map(lead => (
                        <tr key={lead.id} className="hover:bg-blue-50/30 transition-colors">
                          <td className="py-3 px-4 text-slate-500 font-medium whitespace-nowrap">
                            {fmtDate(lead.createdAt)}
                          </td>
                          <td className="py-3 px-4 font-bold text-slate-900">{lead.name}</td>
                          <td className="py-3 px-4 whitespace-nowrap">
                            {lead.wa ? (
                              <a
                                href={`https://wa.me/${fmtWa(lead.wa)}?text=${encodeURIComponent(
                                  `Halo ${lead.name}, terima kasih sudah mencoba asesmen Cari Side Job!`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 font-bold text-emerald-600 hover:text-emerald-700 hover:underline"
                              >
                                <Phone className="w-3.5 h-3.5" />
                                <span>{lead.wa}</span>
                              </a>
                            ) : (
                              <span className="text-slate-400">-</span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-slate-600 font-medium">{lead.email}</td>
                          <td className="py-3 px-4">
                            <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200/60">
                              {lead.profesi}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="inline-block max-w-[180px] truncate px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200/70" title={lead.topMatch}>
                              {lead.topMatch}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span
                              className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-black ${
                                lead.readinessScore >= 80
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : lead.readinessScore >= 60
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-slate-100 text-slate-700'
                              }`}
                            >
                              {lead.readinessScore}%
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => setSelectedLead(lead)}
                                className="px-2.5 py-1 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                              >
                                Detail
                              </button>
                              <button
                                onClick={() => deleteLead(lead.id)}
                                className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                title="Hapus lead"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* MOBILE CARDS VIEW (Ergonomic cards instead of broken horizontal table) */}
              <div className="block md:hidden divide-y divide-slate-100">
                {isLoading ? (
                  <div className="py-12 text-center text-slate-400 text-xs">Memuat data leads...</div>
                ) : filteredLeads.length === 0 ? (
                  <div className="py-12 text-center text-slate-400 text-xs">Belum ada leads terdaftar.</div>
                ) : (
                  filteredLeads.map(lead => (
                    <div key={lead.id} className="p-4 space-y-3 hover:bg-slate-50/50 transition-colors">
                      {/* Top Row: Name + Date */}
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="font-extrabold text-sm text-slate-900">{lead.name}</div>
                          <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                            <Clock className="w-3 h-3" />
                            <span>{fmtDate(lead.createdAt)}</span>
                          </div>
                        </div>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs font-black ${
                            lead.readinessScore >= 80
                              ? 'bg-emerald-100 text-emerald-800'
                              : lead.readinessScore >= 60
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {lead.readinessScore}% Kesiapan
                        </span>
                      </div>

                      {/* Middle: Badges */}
                      <div className="flex items-center gap-1.5 flex-wrap text-xs">
                        <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-bold border border-blue-200/60 text-[11px]">
                          {lead.profesi}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 font-bold border border-amber-200/70 text-[11px]">
                          🎯 {lead.topMatch}
                        </span>
                      </div>

                      {/* Contact & Actions */}
                      <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
                        {lead.wa ? (
                          <a
                            href={`https://wa.me/${fmtWa(lead.wa)}?text=${encodeURIComponent(
                              `Halo ${lead.name}, terima kasih sudah mencoba asesmen Cari Side Job!`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/60 px-3 py-1.5 rounded-xl transition-colors"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            <span>Hubungi WA</span>
                          </a>
                        ) : (
                          <span className="text-xs text-slate-400">Tidak ada WA</span>
                        )}

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setSelectedLead(lead)}
                            className="px-3 py-1.5 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
                          >
                            Lihat Detail
                          </button>
                          <button
                            onClick={() => deleteLead(lead.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 rounded-xl transition-colors"
                            title="Hapus"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════
            TAB 2: LOWONGAN KERJA REMOTE
        ════════════════════════════════════════════════════════════════ */}
        {activeTab === 'loker' && (
          <div className="space-y-6">
            {/* TOGGLE BANNER: POP-UP LOWONGAN SEDANG PENUH */}
            <div
              className={`rounded-2xl p-4 sm:p-5 border transition-all ${
                isLokerFull
                  ? 'bg-amber-50/70 border-amber-300 shadow-sm shadow-amber-500/10'
                  : 'bg-white border-slate-200/80 shadow-xs'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      isLokerFull ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <Flame className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                        Pop-Up Status Lowongan Penuh
                      </h3>
                      <span
                        className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                          isLokerFull
                            ? 'bg-rose-100 text-rose-700 border border-rose-200'
                            : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        }`}
                      >
                        {isLokerFull ? '● POP-UP ON (LOWONGAN PENUH)' : '○ POP-UP OFF (NORMAL)'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {isLokerFull ? (
                        <span className="text-amber-800 font-semibold">
                          Pop-up aktif di web: &ldquo;Mohon Maaf, Saat Ini Lowongan Kerja Remote Sedang Penuh. Informasi Lowongan Terbaru Akan Segera Kami Update.&rdquo;
                        </span>
                      ) : (
                        'Lowongan kerja tampil normal dari database. Aktifkan jika kuota loker remote sedang kosong/penuh.'
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-end shrink-0">
                  <button
                    type="button"
                    onClick={toggleLokerFull}
                    disabled={isTogglingFull}
                    className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                      isLokerFull
                        ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-xs shadow-rose-500/20'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                    }`}
                  >
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        isLokerFull ? 'bg-white animate-pulse' : 'bg-slate-400'
                      }`}
                    ></span>
                    <span>
                      {isTogglingFull
                        ? 'Menyimpan...'
                        : isLokerFull
                        ? 'Matikan Pop-Up'
                        : 'Aktifkan Pop-Up Penuh'}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* QUICK STATS & ACTIONS BAR */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
              {/* Search & Type Filter */}
              <div className="flex items-center gap-2.5 flex-1 flex-wrap">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Cari posisi, perusahaan, skill..."
                    value={jobSearch}
                    onChange={e => setJobSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs font-medium rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50/50 focus:bg-white"
                  />
                </div>

                <select
                  value={jobTypeFilter}
                  onChange={e => setJobTypeFilter(e.target.value)}
                  className="py-2 px-3 text-xs font-bold rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="ALL">Semua Tipe Kerja</option>
                  <option value="Full-time Remote">Full-time Remote</option>
                  <option value="Part-time Remote">Part-time Remote</option>
                  <option value="Freelance Project">Freelance Project</option>
                  <option value="Contract Remote">Contract Remote</option>
                </select>
              </div>

              {/* Add Job CTA */}
              <button
                onClick={openAddJobModal}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-extrabold shadow-xs shadow-blue-500/20 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Lowongan Baru</span>
              </button>
            </div>

            {/* JOBS BENTO GRID */}
            {jobs.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto text-xl">
                  💼
                </div>
                <h3 className="font-extrabold text-base text-slate-900">Belum Ada Lowongan Kerja</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Tambahkan lowongan kerja pertama untuk ditampilkan kepada para pencari side job.
                </p>
                <button
                  onClick={openAddJobModal}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-xs hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Lowongan Sekarang</span>
                </button>
              </div>
            ) : (() => {
              const filteredJobs = jobs.filter(job => {
                const q = jobSearch.toLowerCase().trim();
                const matchesQ =
                  !q ||
                  job.title.toLowerCase().includes(q) ||
                  job.company.toLowerCase().includes(q) ||
                  (job.description || '').toLowerCase().includes(q) ||
                  (job.tags || []).some(t => t.toLowerCase().includes(q));
                const matchesType = jobTypeFilter === 'ALL' || job.type === jobTypeFilter;
                return matchesQ && matchesType;
              });

              if (filteredJobs.length === 0) {
                return (
                  <div className="bg-white rounded-2xl border border-slate-200/80 p-10 text-center space-y-2">
                    <p className="text-sm font-bold text-slate-700">Tidak ada lowongan yang sesuai filter.</p>
                    <button
                      onClick={() => {
                        setJobSearch('');
                        setJobTypeFilter('ALL');
                      }}
                      className="text-xs text-blue-600 font-bold hover:underline"
                    >
                      Reset Pencarian
                    </button>
                  </div>
                );
              }

              return (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredJobs.map(job => {
                    const avatarBg = getCompanyAvatarStyle(job.company);
                    const monogram = getCompanyMonogram(job.company);

                    return (
                      <div
                        key={job.id}
                        className="bg-white rounded-2xl border border-slate-200/80 p-5 flex flex-col justify-between shadow-xs hover:border-blue-300 hover:shadow-md transition-all group"
                      >
                        <div className="space-y-3">
                          {/* Header: Monogram + Company & Location + Type Badge */}
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3 min-w-0">
                              <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-xs shrink-0 shadow-xs"
                                style={{ background: avatarBg }}
                              >
                                {monogram}
                              </div>
                              <div className="min-w-0">
                                <div className="font-extrabold text-xs text-slate-900 truncate">
                                  {job.company}
                                </div>
                                <div className="text-[11px] text-slate-400 truncate">
                                  {job.location || 'WFH Remote'}
                                </div>
                              </div>
                            </div>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-50 text-blue-700 border border-blue-200/60 shrink-0">
                              {job.type}
                            </span>
                          </div>

                          {/* Title */}
                          <h4 className="font-extrabold text-sm text-slate-900 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
                            {job.title}
                          </h4>

                          {/* Salary Pill */}
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200/70 text-xs font-black">
                            <span>💰</span>
                            <span>{job.salary}</span>
                          </div>

                          {/* Description snippet */}
                          {job.description && (
                            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                              {job.description}
                            </p>
                          )}

                          {/* Tags */}
                          {job.tags && job.tags.length > 0 && (
                            <div className="flex items-center gap-1 flex-wrap">
                              {job.tags.slice(0, 3).map((tag, i) => (
                                <span
                                  key={i}
                                  className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Footer Actions */}
                        <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                          <span className="text-[11px] text-slate-400 font-medium">
                            🕒 {job.posted || 'Hari ini'}
                          </span>
                          <div className="flex items-center gap-1">
                            {job.applyUrl && (
                              <a
                                href={job.applyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Buka Link Pendaftaran"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            )}
                            <button
                              onClick={() => openEditJobModal(job)}
                              className="px-2.5 py-1 text-xs font-bold text-slate-700 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deleteJob(job.id, job.title)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                              title="Hapus Lowongan"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════
            TAB 3: KATALOG PRODUK REKOMENDASI
        ════════════════════════════════════════════════════════════════ */}
        {activeTab === 'produk' && (
          <div className="space-y-6">
            {/* Notification Banner for Lynk.id imports */}
            {importNotification && (
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-center justify-between gap-3 text-xs text-blue-800 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>{importNotification}</span>
                </div>
                <button
                  onClick={() => setImportNotification(null)}
                  className="px-2.5 py-1 bg-blue-100 hover:bg-blue-200 rounded-lg text-blue-700 font-bold transition-colors"
                >
                  Tutup
                </button>
              </div>
            )}

            {/* PRODUCT HEADER & ACTIONS */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari judul produk atau kategori..."
                  value={productSearch}
                  onChange={e => setProductSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs font-medium rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50/50 focus:bg-white"
                />
              </div>

              <button
                onClick={openAddProductModal}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-extrabold shadow-xs shadow-blue-500/20 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Produk Baru</span>
              </button>
            </div>

            {/* REORDER INSTRUCTION & LIVE STATUS BANNER */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                  <GripVertical className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-xs flex items-center gap-2 flex-wrap">
                    <span>Pengaturan Urutan Tampil (Arrange / Drag & Drop)</span>
                    {reorderSuccessMsg && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200">
                        ✓ {reorderSuccessMsg}
                      </span>
                    )}
                    {isReorderingProducts && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-100 text-blue-800 animate-pulse">
                        Menyimpan urutan...
                      </span>
                    )}
                  </div>
                  <p className="text-slate-500 text-[11px] mt-0.5 leading-relaxed">
                    Urutan di bawah ini sama persis dengan yang tampil di halaman rekomendasi pengguna. Geser (Drag & drop) atau tekan tombol 🔼 / 🔽 untuk mengatur mana produk yang tampil paling atas.
                  </p>
                </div>
              </div>

              {productSearch && (
                <div className="shrink-0 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 text-[11px] font-semibold">
                  ⚠️ Hapus pencarian untuk drag & drop
                </div>
              )}
            </div>

            {/* PRODUCT LIST */}
            {products.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto text-xl">
                  📦
                </div>
                <h3 className="font-extrabold text-base text-slate-900">Belum Ada Produk</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Tambahkan materi, template, atau panduan side job untuk direkomendasikan kepada peserta asesmen.
                </p>
                <button
                  onClick={openAddProductModal}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-xs hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Produk Pertama</span>
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs divide-y divide-slate-100 overflow-hidden">
                {products
                  .filter(
                    p =>
                      p.title.toLowerCase().includes(productSearch.toLowerCase()) ||
                      p.category.toLowerCase().includes(productSearch.toLowerCase())
                  )
                  .map((prod, displayIdx) => {
                    const actualIdx = products.findIndex(p => p.id === prod.id);
                    const isFirst = actualIdx === 0;
                    const isLast = actualIdx === products.length - 1;
                    const isDraggingThis = draggedProductIndex === actualIdx;
                    const isDragOverThis = dragOverProductIndex === actualIdx;

                    return (
                      <div
                        key={prod.id}
                        draggable={!productSearch}
                        onDragStart={e => handleDragStart(e, actualIdx)}
                        onDragOver={e => handleDragOver(e, actualIdx)}
                        onDrop={e => handleDrop(e, actualIdx)}
                        onDragEnd={handleDragEnd}
                        className={`p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-150 ${
                          isDragOverThis
                            ? 'bg-blue-50/60 border-2 border-dashed border-blue-400'
                            : isDraggingThis
                            ? 'opacity-40 bg-slate-100 scale-[0.99]'
                            : 'hover:bg-slate-50/60'
                        }`}
                      >
                        <div className="flex items-start gap-3.5 flex-1 min-w-0">
                          {/* Drag Handle & Position Badge */}
                          <div className="flex flex-col items-center gap-1 shrink-0 pt-1">
                            <div
                              className={`p-1 rounded-lg transition-colors ${
                                productSearch
                                  ? 'text-slate-300 cursor-not-allowed'
                                  : 'text-slate-400 hover:text-blue-600 hover:bg-slate-100 cursor-grab active:cursor-grabbing'
                              }`}
                              title={productSearch ? 'Kosongkan kolom pencarian untuk drag & drop' : 'Tahan & geser untuk atur urutan'}
                            >
                              <GripVertical className="w-4 h-4" />
                            </div>

                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-black tracking-tight ${
                                actualIdx === 0
                                  ? 'bg-amber-100 text-amber-800 border border-amber-300 shadow-xs'
                                  : 'bg-slate-100 text-slate-600 border border-slate-200'
                              }`}
                              title={`Posisi ke-${actualIdx + 1} di website`}
                            >
                              {actualIdx === 0 ? '⭐ #1' : `#${actualIdx + 1}`}
                            </span>
                          </div>

                          {/* Cover Image */}
                          <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 flex items-center justify-center">
                            {prod.imageUrl ? (
                              <img
                                src={prod.imageUrl}
                                alt={prod.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-xl">📘</span>
                            )}
                          </div>

                          {/* Details */}
                          <div className="space-y-1 min-w-0 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-50 text-blue-700 border border-blue-200/60">
                                {prod.category}
                              </span>
                              {prod.badge && (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-50 text-amber-800 border border-amber-200/70">
                                  {prod.badge}
                                </span>
                              )}
                              <button
                                onClick={() => toggleProductPublish(prod)}
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold border transition-colors ${
                                  prod.isPublished
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                                    : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
                                }`}
                              >
                                {prod.isPublished ? '● Tayang di Web' : '○ Draft'}
                              </button>
                            </div>

                            <h4 className="font-extrabold text-sm text-slate-900 truncate" title={prod.title}>
                              {prod.title}
                            </h4>

                            <div className="flex items-center gap-2 text-xs text-slate-500 flex-wrap">
                              <span className="font-bold text-slate-900">{prod.price || 'Rp 0'}</span>
                              <span>•</span>
                              <span>
                                Target: <strong>{prod.sideJob || 'Semua Profil'}</strong>
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Order Controls & Actions */}
                        <div className="flex items-center justify-between sm:justify-end gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                          {/* Reorder Buttons (Move Up, Down, Top) */}
                          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                            <button
                              type="button"
                              onClick={() => moveProductToTop(actualIdx)}
                              disabled={isFirst || Boolean(productSearch)}
                              className="p-1.5 rounded-lg text-slate-600 hover:text-blue-700 hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-600 transition-colors"
                              title="Pindahkan ke Posisi Paling Atas (#1)"
                            >
                              <ArrowUpToLine className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => moveProduct(actualIdx, actualIdx - 1)}
                              disabled={isFirst || Boolean(productSearch)}
                              className="p-1.5 rounded-lg text-slate-600 hover:text-blue-700 hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-600 transition-colors"
                              title="Pindahkan 1 Posisi ke Atas"
                            >
                              <ArrowUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => moveProduct(actualIdx, actualIdx + 1)}
                              disabled={isLast || Boolean(productSearch)}
                              className="p-1.5 rounded-lg text-slate-600 hover:text-blue-700 hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-600 transition-colors"
                              title="Pindahkan 1 Posisi ke Bawah"
                            >
                              <ArrowDown className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Product Actions */}
                          <div className="flex items-center gap-1">
                            <a
                              href={prod.url}
                              target="_blank"
                              rel="noreferrer"
                              className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                              title="Buka Link Produk"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                            <button
                              onClick={() => openEditProductModal(prod)}
                              className="px-3 py-1.5 text-xs font-bold text-slate-700 hover:text-blue-600 hover:bg-slate-100 rounded-xl transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deleteProduct(prod.id, prod.title)}
                              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                              title="Hapus Produk"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        )}
      </main>

      {/* ════════════════════════════════════════════════════════════════
          MODAL: TAMBAH / EDIT LOWONGAN KERJA
      ════════════════════════════════════════════════════════════════ */}
      {isJobModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setIsJobModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6 relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setIsJobModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <h2 className="font-black text-xl text-slate-900 tracking-tight">
                {editingJob ? 'Edit Lowongan Kerja' : 'Tambah Lowongan Kerja'}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Loker ini akan langsung tayang di modal rekomendasi lowongan kerja publik.
              </p>
            </div>

            {/* Live Preview Card */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Preview Kandidat
              </span>
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-xs shrink-0"
                    style={{ background: getCompanyAvatarStyle(jobForm.company || 'Perusahaan') }}
                  >
                    {getCompanyMonogram(jobForm.company || 'Perusahaan')}
                  </div>
                  <div className="min-w-0">
                    <div className="font-extrabold text-xs text-slate-900 truncate">
                      {jobForm.title || 'Judul Lowongan'}
                    </div>
                    <div className="text-[11px] text-slate-400 truncate">
                      {jobForm.company || 'Nama Perusahaan'} • {jobForm.location}
                    </div>
                  </div>
                </div>
                <span className="text-xs font-black text-emerald-600 shrink-0">
                  {jobForm.salary || 'Kompetitif'}
                </span>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                  Judul Lowongan *
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Remote Data Entry & Spreadsheet Specialist"
                  value={jobForm.title}
                  onChange={e => setJobForm({ ...jobForm, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs font-medium rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                    Nama Perusahaan *
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: PT Solusi Digital"
                    value={jobForm.company}
                    onChange={e => setJobForm({ ...jobForm, company: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs font-medium rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                    Lokasi
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: WFH / Remote Indonesia"
                    value={jobForm.location}
                    onChange={e => setJobForm({ ...jobForm, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs font-medium rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                    Gaji / Fee
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Rp 4.500.000 - Rp 6.200.000 / bln"
                    value={jobForm.salary}
                    onChange={e => setJobForm({ ...jobForm, salary: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs font-medium rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                    Tipe Kerja
                  </label>
                  <select
                    value={jobForm.type}
                    onChange={e => setJobForm({ ...jobForm, type: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs font-bold rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
                  >
                    <option value="Full-time Remote">Full-time Remote</option>
                    <option value="Part-time Remote">Part-time Remote</option>
                    <option value="Freelance Project">Freelance Project</option>
                    <option value="Contract Remote">Contract Remote</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                  Link Lamaran / WA Pendaftaran *
                </label>
                <input
                  type="text"
                  placeholder="https://wa.me/... atau link form"
                  value={jobForm.applyUrl}
                  onChange={e => setJobForm({ ...jobForm, applyUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs font-semibold text-blue-600 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                  Keahlian / Tags (Pisahkan Koma)
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Data Entry, Excel, Google Sheets"
                  value={jobForm.tags}
                  onChange={e => setJobForm({ ...jobForm, tags: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs font-medium rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                  Deskripsi & Kualifikasi
                </label>
                <textarea
                  rows={3}
                  placeholder="Gambaran tanggung jawab dan syarat kandidat..."
                  value={jobForm.description}
                  onChange={e => setJobForm({ ...jobForm, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs font-medium rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsJobModalOpen(false)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={isSaving}
                onClick={saveJob}
                className="px-5 py-2.5 rounded-xl text-xs font-extrabold text-white bg-blue-600 hover:bg-blue-700 shadow-sm shadow-blue-500/20 transition-colors"
              >
                {isSaving ? 'Menyimpan...' : editingJob ? 'Simpan Perubahan' : 'Tambah Lowongan'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════
          MODAL: TAMBAH / EDIT PRODUK REKOMENDASI
      ════════════════════════════════════════════════════════════════ */}
      {isProductModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setIsProductModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6 relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setIsProductModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <h2 className="font-black text-xl text-slate-900 tracking-tight">
                {editingProduct ? 'Edit Produk' : 'Tambah Produk Baru'}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Lengkapi rincian materi digital, template, atau panduan rekomendasi.
              </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                  Link Produk (Lynk.id / Web) *
                </label>
                <input
                  type="text"
                  placeholder="https://lynk.id/..."
                  value={productForm.url}
                  onChange={e => setProductForm({ ...productForm, url: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs font-semibold text-blue-600 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                  Judul Produk *
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Template Administrasi & Notulen Excel"
                  value={productForm.title}
                  onChange={e => setProductForm({ ...productForm, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs font-medium rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                  Link Gambar Cover
                </label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={productForm.imageUrl}
                  onChange={e => setProductForm({ ...productForm, imageUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs font-medium rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                    Kategori *
                  </label>
                  <select
                    value={productForm.category}
                    onChange={e =>
                      setProductForm({
                        ...productForm,
                        category: e.target.value,
                        type: e.target.value.toLowerCase().replace(/\s+/g, ''),
                      })
                    }
                    className="w-full px-3.5 py-2.5 text-xs font-bold rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
                  >
                    <option value="Ebook">Ebook</option>
                    <option value="Template">Template</option>
                    <option value="Kursus">Kursus</option>
                    <option value="Starter Pack">Starter Pack</option>
                    <option value="Tools">Tools</option>
                    <option value="Bundle">Bundle</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                    Harga
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Rp 49.000"
                    value={productForm.price}
                    onChange={e => setProductForm({ ...productForm, price: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs font-medium rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                    Badge Khusus
                  </label>
                  <select
                    value={productForm.badge}
                    onChange={e => setProductForm({ ...productForm, badge: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs font-bold rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
                  >
                    {BADGE_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                    Target Profil
                  </label>
                  <select
                    value={productForm.sideJob}
                    onChange={e => setProductForm({ ...productForm, sideJob: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs font-bold rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
                  >
                    <option value="Umum / Semua Profil">🌐 Semua Profil (Umum)</option>
                    <optgroup label="── Profil Spesifik ──">
                      {Object.values(SIDE_JOBS_DB).map(job => (
                        <option key={job.id} value={job.name}>
                          {job.icon} {job.name}
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isPublishedCheck"
                  checked={productForm.isPublished}
                  onChange={e => setProductForm({ ...productForm, isPublished: e.target.checked })}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <label
                  htmlFor="isPublishedCheck"
                  className="text-xs font-bold text-slate-800 cursor-pointer"
                >
                  Tampilkan di website (Publish)
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsProductModalOpen(false)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={isSaving}
                onClick={saveProduct}
                className="px-5 py-2.5 rounded-xl text-xs font-extrabold text-white bg-blue-600 hover:bg-blue-700 shadow-sm shadow-blue-500/20 transition-colors"
              >
                {isSaving ? 'Menyimpan...' : editingProduct ? 'Simpan Perubahan' : 'Tambah Produk'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════
          MODAL: DETAIL DATA PESERTA (LEAD)
      ════════════════════════════════════════════════════════════════ */}
      {selectedLead && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedLead(null)}
        >
          <div
            className="bg-white rounded-3xl w-full max-w-lg shadow-2xl p-6 sm:p-8 space-y-6 relative max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedLead(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-black text-xl text-slate-900 tracking-tight">Detail Peserta</h2>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-black ${
                    selectedLead.readinessScore >= 80
                      ? 'bg-emerald-100 text-emerald-800'
                      : selectedLead.readinessScore >= 60
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {selectedLead.readinessScore}% Kesiapan
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Terdaftar pada {fmtDate(selectedLead.createdAt)}
              </p>
            </div>

            {/* Profile Grid */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                  Nama Lengkap
                </span>
                <span className="font-extrabold text-slate-900 text-sm">{selectedLead.name}</span>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                  Profesi Asal
                </span>
                <span className="font-bold text-slate-700">{selectedLead.profesi}</span>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                  WhatsApp
                </span>
                {selectedLead.wa ? (
                  <a
                    href={`https://wa.me/${fmtWa(selectedLead.wa)}?text=${encodeURIComponent(
                      `Halo ${selectedLead.name}, salam dari tim Cari Side Job!`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-black text-emerald-600 hover:underline inline-flex items-center gap-1"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{selectedLead.wa}</span>
                  </a>
                ) : (
                  <span className="text-slate-400">-</span>
                )}
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                  Email
                </span>
                <span className="font-semibold text-slate-700 truncate block">
                  {selectedLead.email}
                </span>
              </div>
            </div>

            {/* Top Match Card */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/60 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-700 block">
                  Rekomendasi Side Job Teratas
                </span>
                <span className="font-black text-base text-blue-900 mt-0.5 block">
                  {selectedLead.topMatch}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-700 block">
                  Skor Match
                </span>
                <span className="font-black text-xl text-blue-700">{selectedLead.topMatchScore}%</span>
              </div>
            </div>

            {/* Gaps */}
            {selectedLead.gaps && selectedLead.gaps.length > 0 && (
              <div className="bg-amber-50/70 border border-amber-200/70 rounded-2xl p-4 text-xs space-y-2">
                <span className="font-extrabold text-amber-900 block">Area Peningkatan & Gaps:</span>
                <ul className="list-disc list-inside space-y-1 text-amber-900">
                  {selectedLead.gaps.map((gap, i) => (
                    <li key={i}>{gap}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Skills & Tools */}
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                  Keahlian Terpilih:
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {selectedLead.skills?.map((s, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-bold"
                    >
                      {toTitleCase(s)}
                    </span>
                  )) || <span className="text-slate-400">-</span>}
                </div>
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                  Tools yang Dikuasai:
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {selectedLead.tools?.map((t, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 font-bold border border-blue-200/60"
                    >
                      {t}
                    </span>
                  )) || <span className="text-slate-400">-</span>}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => deleteLead(selectedLead.id)}
                className="px-3.5 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors inline-flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Hapus Lead</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                className="px-5 py-2 text-xs font-extrabold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-xs transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
