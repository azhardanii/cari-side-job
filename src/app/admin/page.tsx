'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { JOB_CATEGORIES, SIDE_JOBS_DB, getJobCategory, toTitleCase, getCompanyAvatarStyle, getCompanyMonogram } from '@/lib/data';

interface LeadItem {
  id: string; name: string; wa: string; email: string; profesi: string;
  topMatch: string; topMatchScore: number; readinessScore: number;
  personaName: string; skills: string[]; tools: string[]; gaps: string[];
  createdAt: string;
}
interface JobItem {
  id: string; title: string; company: string; location: string; salary: string;
  type: string; posted: string; primarySideJob: string; tags: string[];
  description: string; applyUrl: string;
}
interface StatsData {
  totalStarts: number; totalLeads: number; conversionRate: string;
  avgReadiness: string; popularJob: string;
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

const S = {
  page: { minHeight: '100vh', background: '#F1F5F9', fontFamily: "'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif", color: '#0F172A' },
  header: { background: 'white', borderBottom: '1px solid #E2E8F0', padding: '14px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' as const, gap: '12px', position: 'sticky' as const, top: 0, zIndex: 30, boxShadow: '0 1px 6px rgba(0,0,0,0.06)' },
  logo: { display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', color: 'inherit' },
  logoIcon: { width: 42, height: 42, borderRadius: 12, background: 'linear-gradient(135deg,#1D64EC,#0F3BA0)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: 'white', boxShadow: '0 4px 12px rgba(29,100,236,0.3)', flexShrink: 0 },
  h1: { fontSize: 18, fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: 8, margin: 0, lineHeight: 1.2 },
  badge: { background: '#1D64EC', color: 'white', fontSize: 11, padding: '2px 7px', borderRadius: 6, fontWeight: 800 },
  sub: { fontSize: 12, color: '#64748B', marginTop: 2, fontWeight: 500 },
  hBtns: { display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' as const },
  body: { maxWidth: 1360, margin: '0 auto', padding: '28px 24px 60px' },
  tabRow: { display: 'flex', gap: 0, borderBottom: '2px solid #E2E8F0', marginBottom: 28 },
  metGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 16, marginBottom: 28 },
  panel: { background: 'white', borderRadius: 20, border: '1px solid #E2E8F0', boxShadow: '0 1px 6px rgba(0,0,0,0.04)', overflow: 'hidden' },
  panelHdr: { padding: '20px 24px', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' as const, gap: 12 },
  th: { padding: '12px 16px', fontSize: 11, fontWeight: 700, color: '#64748B', textTransform: 'uppercase' as const, letterSpacing: '0.6px', background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', whiteSpace: 'nowrap' as const },
  td: { padding: '14px 16px', fontSize: 13, borderBottom: '1px solid #F1F5F9', verticalAlign: 'middle' as const },
  pill: (bg: string, color: string, border?: string): React.CSSProperties => ({ background: bg, color, border: border ? `1px solid ${border}` : undefined, padding: '3px 10px', borderRadius: 9999, fontSize: 11, fontWeight: 700, display: 'inline-block', whiteSpace: 'nowrap' as const }),
  jobCard: { border: '1px solid #E2E8F0', borderRadius: 16, padding: 20, background: '#F8FAFC', display: 'flex', flexDirection: 'column' as const, gap: 14 },
  label: { display: 'block', fontSize: 11, fontWeight: 700, color: '#64748B', marginBottom: 4, textTransform: 'uppercase' as const, letterSpacing: '0.4px' },
  input: { width: '100%', padding: '9px 12px', background: 'white', border: '1.5px solid #E2E8F0', borderRadius: 10, fontSize: 13, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' as const, transition: 'border-color 0.2s' },
  textarea: { width: '100%', padding: '9px 12px', background: 'white', border: '1.5px solid #E2E8F0', borderRadius: 10, fontSize: 12, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' as const, resize: 'vertical' as const, transition: 'border-color 0.2s' },
  btnPrimary: { display: 'inline-flex', alignItems: 'center', gap: 6, background: 'linear-gradient(135deg,#1D64EC,#0F3BA0)', color: 'white', border: 'none', padding: '9px 18px', borderRadius: 9999, fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' },
  btnOutline: { display: 'inline-flex', alignItems: 'center', gap: 6, background: 'transparent', color: '#334155', border: '1.5px solid #CBD5E1', padding: '8px 16px', borderRadius: 9999, fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' },
  btnGold: { display: 'inline-flex', alignItems: 'center', gap: 6, background: 'linear-gradient(135deg,#F59E0B,#D97706)', color: 'white', border: 'none', padding: '9px 18px', borderRadius: 9999, fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' },
  btnRed: { display: 'inline-flex', alignItems: 'center', gap: 6, background: '#FEE2E2', color: '#991B1B', border: '1px solid #FECACA', padding: '9px 18px', borderRadius: 9999, fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' },
  btnSec: { display: 'inline-flex', alignItems: 'center', gap: 6, background: '#EFF6FF', color: '#1D64EC', border: '1px solid #BFDBFE', padding: '9px 18px', borderRadius: 9999, fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', width: '100%', justifyContent: 'center' as const },
  overlay: { position: 'fixed' as const, inset: 0, background: 'rgba(15,23,42,0.65)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: 24 },
  modal: { background: 'white', borderRadius: 24, width: '100%', maxWidth: 560, maxHeight: '88vh', overflowY: 'auto' as const, boxShadow: '0 20px 60px rgba(0,0,0,0.2)', position: 'relative' as const },
  modalPad: { padding: '28px 24px 24px' },
  closeBtn: { position: 'absolute' as const, top: 16, right: 16, width: 34, height: 34, background: '#F1F5F9', border: '1px solid #E2E8F0', borderRadius: '50%', fontSize: 14, color: '#64748B', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'inherit' },
};

function MetricCard({ title, value, sub, accent }: { title: string; value: string | number; sub: string; accent?: string }) {
  const accentMap: Record<string, string> = { blue: 'linear-gradient(145deg,#EFF6FF,white)', gold: 'linear-gradient(145deg,#FEF3C7,white)', emerald: 'linear-gradient(145deg,#ECFDF5,white)' };
  const colorMap: Record<string, string> = { blue: '#1D64EC', gold: '#D97706', emerald: '#10B981' };
  return (
    <div style={{ background: accent ? accentMap[accent] : 'white', border: `1px solid ${accent === 'blue' ? '#BFDBFE' : accent === 'gold' ? '#FDE68A' : accent === 'emerald' ? '#A7F3D0' : '#E2E8F0'}`, borderRadius: 16, padding: '20px 18px', boxShadow: '0 1px 4px rgba(15,23,42,0.05)' }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 8 }}>{title}</div>
      <div style={{ fontSize: 28, fontWeight: 900, color: accent ? colorMap[accent] : '#0F172A', lineHeight: 1, letterSpacing: '-0.02em', marginBottom: 4 }}>{value}</div>
      <div style={{ fontSize: 11.5, color: '#94A3B8', fontWeight: 600 }}>{sub}</div>
    </div>
  );
}

function TabBtn({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'transparent', border: 'none', borderBottom: active ? '3px solid #1D64EC' : '3px solid transparent', padding: '10px 20px', fontSize: 14, fontWeight: 700, color: active ? '#1D64EC' : '#64748B', cursor: 'pointer', fontFamily: 'inherit', marginBottom: -2, transition: 'color 0.15s,border-color 0.15s' }}>
      {label}
    </button>
  );
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'leads' | 'loker' | 'produk'>('leads');
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [stats, setStats] = useState<StatsData>({ totalStarts: 0, totalLeads: 0, conversionRate: '0%', avgReadiness: '0%', popularJob: '-' });
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [productSearch, setProductSearch] = useState('');
  const [selectedLead, setSelectedLead] = useState<LeadItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobItem | null>(null);
  const [jobSearch, setJobSearch] = useState('');
  const [jobTypeFilter, setJobTypeFilter] = useState('ALL');
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

  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [importNotification, setImportNotification] = useState<string | null>(null);

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
        setImportNotification('Data produk berhasil dimuat ke formulir.');
        window.history.replaceState({}, '', '/admin');
      }
    }
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products?admin=true');
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
        alert(isEdit ? 'Produk berhasil diperbarui.' : 'Produk berhasil ditambahkan.');
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

  const fetchLeads = async (q = '') => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/leads${q ? `?q=${encodeURIComponent(q)}` : ''}`);
      if (res.status === 401) {
        window.location.href = '/login';
        return;
      }
      const data = await res.json();
      if (data.success) { setLeads(data.leads || []); if (data.stats) setStats(data.stats); }
    } catch (e) { console.error(e); }
    finally { setIsLoading(false); }
  };

  const fetchJobs = async () => {
    try {
      const res = await fetch(`/api/jobs?admin=true&t=${Date.now()}`, {
        cache: 'no-store',
      });
      if (res.status === 401) {
        window.location.href = '/login';
        return;
      }
      const data = await res.json();
      if (data.success && Array.isArray(data.jobs)) setJobs(data.jobs);
    } catch (e) { console.error(e); }
  };

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
        alert(isEdit ? `Lowongan "${jobForm.title}" berhasil diperbarui.` : `Lowongan "${jobForm.title}" berhasil ditambahkan.`);
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
    if (!confirm(`Hapus lowongan "${title}"? Tindakan ini tidak dapat dibatalkan.`)) return;
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
        alert('Lowongan berhasil dihapus.');
      } else {
        alert('Gagal menghapus: ' + (data.error || 'Terjadi kesalahan'));
      }
    } catch (e: any) {
      alert('Gagal menghapus lowongan: ' + (e?.message || 'Terjadi kesalahan jaringan'));
    }
  };

  const deleteLead = async (id: string) => {
    if (!confirm('Yakin hapus lead ini?')) return;
    try {
      const res = await fetch(`/api/leads?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) { setSelectedLead(null); fetchLeads(searchQuery); }
    } catch { alert('Gagal menghapus lead.'); }
  };

  const resetAll = async () => {
    if (!confirm('PERINGATAN: Reset SEMUA data leads dan metrik?')) return;
    try {
      await fetch('/api/leads?reset=true', { method: 'DELETE' });
      fetchLeads();
    } catch { alert('Gagal reset.'); }
  };

  const exportCsv = () => {
    if (!leads.length) return alert('Belum ada data leads.');
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
    return isNaN(d.getTime()) ? '-' : d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
  };

  const fmtWa = (wa: string) => {
    const clean = wa.replace(/\D/g, '');
    return clean.startsWith('0') ? '62' + clean.slice(1) : clean;
  };

  return (
    <div style={S.page}>
      {/* HEADER */}
      <header style={S.header}>
        <Link href="/" style={S.logo}>
          <div style={S.logoIcon}>💼</div>
          <div>
            <h1 style={S.h1}>
              Cari Side Job <span style={S.badge}>Admin</span>
            </h1>
            <p style={S.sub}>Kelola data leads, lowongan, dan produk rekomendasi</p>
          </div>
        </Link>
        <div style={S.hBtns}>
          <Link href="/" style={S.btnOutline}>← Lihat Website</Link>
          <button style={S.btnPrimary} onClick={exportCsv}>Export CSV ({leads.length})</button>
          <button style={S.btnRed} onClick={resetAll}>Reset Data</button>
          <button
            style={{
              ...S.btnOutline,
              borderColor: '#FECACA',
              color: '#DC2626',
              background: '#FEF2F2',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
            }}
            onClick={async () => {
              if (!confirm('Yakin ingin keluar dari panel admin?')) return;
              try {
                await fetch('/api/admin/logout', { method: 'POST' });
              } finally {
                window.location.href = '/login';
              }
            }}
            title="Keluar dari Panel Admin"
          >
            🔒 Keluar
          </button>
        </div>
      </header>

      <div style={S.body}>
        {/* TABS */}
        <div style={S.tabRow}>
          <TabBtn label={`Leads (${leads.length})`} active={activeTab === 'leads'} onClick={() => setActiveTab('leads')} />
          <TabBtn label={`Lowongan Kerja (${jobs.length})`} active={activeTab === 'loker'} onClick={() => setActiveTab('loker')} />
          <TabBtn label={`Produk (${products.length})`} active={activeTab === 'produk'} onClick={() => setActiveTab('produk')} />
        </div>

        {/* TAB: LEADS */}
        {activeTab === 'leads' && (
          <div>
            {/* Metric Cards */}
            <div style={S.metGrid}>
              <MetricCard title="Mulai Asesmen" value={stats.totalStarts} sub="Pengunjung mulai kuis" />
              <MetricCard title="Leads Masuk" value={stats.totalLeads} sub="Kontak tersimpan" accent="blue" />
              <MetricCard title="Tingkat Konversi" value={stats.conversionRate} sub="Penyelesaian asesmen" accent="gold" />
              <MetricCard title="Rata-rata Kesiapan" value={stats.avgReadiness} sub="Skor kesiapan peserta" accent="emerald" />
              <MetricCard title="Rekomendasi Teratas" value={stats.popularJob} sub="Paling sering cocok" />
            </div>

            {/* Table */}
            <div style={S.panel}>
              <div style={S.panelHdr}>
                <div>
                  <h2 style={{ fontSize: 18, fontWeight: 800, margin: 0, marginBottom: 2 }}>Daftar Peserta</h2>
                  <p style={{ fontSize: 12.5, color: '#64748B', margin: 0 }}>Data kontak dan hasil asesmen</p>
                </div>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    style={{ ...S.input, width: 280, paddingLeft: 36 }}
                    placeholder="Cari nama, WA, email, job..."
                    value={searchQuery}
                    onChange={e => { setSearchQuery(e.target.value); fetchLeads(e.target.value); }}
                  />
                </div>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr>
                      {['Waktu', 'Nama', 'WhatsApp', 'Email', 'Profesi', 'Rekomendasi', 'Kesiapan', ''].map(h => (
                        <th key={h} style={S.th}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      <tr><td colSpan={8} style={{ ...S.td, textAlign: 'center', padding: 48, color: '#64748B' }}>Memuat data...</td></tr>
                    ) : leads.length === 0 ? (
                      <tr><td colSpan={8} style={{ ...S.td, textAlign: 'center', padding: 48, color: '#64748B' }}>Belum ada data</td></tr>
                    ) : leads.map(lead => (
                      <tr key={lead.id} style={{ borderBottom: '1px solid #F1F5F9', cursor: 'default' }} onMouseEnter={e => (e.currentTarget.style.background = '#F8FAFC')} onMouseLeave={e => (e.currentTarget.style.background = '')}>
                        <td style={{ ...S.td, color: '#64748B', fontSize: 12, whiteSpace: 'nowrap' }}>{fmtDate(lead.createdAt)}</td>
                        <td style={{ ...S.td, fontWeight: 700 }}>{lead.name}</td>
                        <td style={S.td}>
                          {lead.wa ? (
                            <a href={`https://wa.me/${fmtWa(lead.wa)}?text=${encodeURIComponent(`Halo ${lead.name}, terima kasih sudah coba asesmen Cari Side Job!`)}`} target="_blank" rel="noopener noreferrer" style={{ color: '#16A34A', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4, fontSize: 13 }}>
                              💬 {lead.wa}
                            </a>
                          ) : '-'}
                        </td>
                        <td style={{ ...S.td, fontSize: 12.5, color: '#334155' }}>{lead.email}</td>
                        <td style={S.td}><span style={S.pill('#EFF6FF', '#1D64EC', '#BFDBFE')}>{lead.profesi}</span></td>
                        <td style={S.td}><span style={{ ...S.pill('#FEF3C7', '#92400E', '#FDE68A'), maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', display: 'block' }}>{lead.topMatch}</span></td>
                        <td style={S.td}><span style={S.pill('#DCFCE7', '#166534', '#A7F3D0')}>{lead.readinessScore}%</span></td>
                        <td style={S.td}>
                          <button style={{ ...S.btnOutline, padding: '6px 14px', fontSize: 12 }} onClick={() => setSelectedLead(lead)}>Detail</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB: LOKER */}
        {activeTab === 'loker' && (
          <div>
            {/* METRICS */}
            <div style={S.metGrid}>
              <MetricCard title="Total Lowongan" value={jobs.length} sub="Semua loker terdaftar" accent="blue" />
              <MetricCard title="Kategori Loker" value={new Set(jobs.map(j => getJobCategory(j))).size} sub="Variasi bidang side job" accent="gold" />
              <MetricCard title="Gaji Transparan" value={jobs.filter(j => j.salary && !j.salary.toLowerCase().includes('kompetitif')).length} sub="Rentang nominal tertera" accent="emerald" />
            </div>

            {/* PANEL */}
            <div style={S.panel}>
              <div style={S.panelHdr}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
                  <div>
                    <h2 style={{ fontSize: 18, fontWeight: 800, margin: 0, marginBottom: 2 }}>Kelola Lowongan Kerja Remote</h2>
                    <p style={{ fontSize: 12.5, color: '#64748B', margin: 0 }}>Daftar lowongan kerja yang tayang di website untuk pencari side job</p>
                  </div>
                  <input
                    style={{ ...S.input, width: 230, padding: '7px 12px', fontSize: 12 }}
                    placeholder="Cari judul, perusahaan, skill..."
                    value={jobSearch}
                    onChange={e => setJobSearch(e.target.value)}
                  />
                  <select
                    style={{ ...S.input, width: 180, padding: '7px 10px', fontSize: 12 }}
                    value={jobTypeFilter}
                    onChange={e => setJobTypeFilter(e.target.value)}
                  >
                    <option value="ALL">Semua Tipe Kerja</option>
                    <option value="Full-time Remote">Full-time Remote</option>
                    <option value="Part-time Remote">Part-time Remote</option>
                    <option value="Freelance Project">Freelance Project</option>
                    <option value="Contract Remote">Contract Remote</option>
                  </select>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <button style={S.btnPrimary} onClick={openAddJobModal}>
                    + Tambah Lowongan
                  </button>
                </div>
              </div>

              {/* LIST / EMPTY STATES */}
              {jobs.length === 0 ? (
                <div style={{ padding: '60px 20px', textAlign: 'center' }}>
                  <div style={{ fontSize: 40, marginBottom: 12 }}>💼</div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', marginBottom: 6 }}>Belum Ada Lowongan Kerja</div>
                  <p style={{ fontSize: 13, color: '#64748B', maxWidth: 360, margin: '0 auto 18px', lineHeight: 1.5 }}>
                    Belum ada data lowongan kerja di database. Klik tombol di bawah untuk menambahkan lowongan kerja pertama.
                  </p>
                  <button style={S.btnPrimary} onClick={openAddJobModal}>
                    + Tambah Lowongan Pertama
                  </button>
                </div>
              ) : (() => {
                const filteredAdminJobs = jobs.filter(job => {
                  const q = jobSearch.toLowerCase().trim();
                  const matchesQ = !q ||
                    job.title.toLowerCase().includes(q) ||
                    job.company.toLowerCase().includes(q) ||
                    (job.description || '').toLowerCase().includes(q) ||
                    (job.tags || []).some(t => t.toLowerCase().includes(q));
                  const matchesType = jobTypeFilter === 'ALL' || job.type === jobTypeFilter;
                  return matchesQ && matchesType;
                });

                if (filteredAdminJobs.length === 0) {
                  return (
                    <div style={{ padding: '50px 20px', textAlign: 'center' }}>
                      <div style={{ fontSize: 32, marginBottom: 10 }}>🔍</div>
                      <div style={{ fontSize: 15, fontWeight: 800, color: '#0F172A', marginBottom: 4 }}>
                        Tidak Ada Lowongan yang Sesuai
                      </div>
                      <p style={{ fontSize: 12.5, color: '#64748B', margin: '0 auto 16px' }}>
                        Coba gunakan kata kunci lain atau ubah filter tipe kerja.
                      </p>
                      <button
                        style={{ ...S.btnOutline, padding: '6px 14px', fontSize: 12 }}
                        onClick={() => { setJobSearch(''); setJobTypeFilter('ALL'); }}
                      >
                        Reset Pencarian
                      </button>
                    </div>
                  );
                }

                return (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 16, padding: '22px 24px' }}>
                    {filteredAdminJobs.map((job) => {
                      const avatarBg = getCompanyAvatarStyle(job.company);
                      const monogram = getCompanyMonogram(job.company);

                      return (
                        <div
                          key={job.id}
                          style={{
                            background: 'white',
                            border: '1.5px solid #E2E8F0',
                            borderRadius: 18,
                            padding: '18px 20px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            gap: 14,
                            boxShadow: '0 2px 6px rgba(15,23,42,0.03)',
                            transition: 'border-color 0.15s, box-shadow 0.15s',
                          }}
                        >
                          <div>
                            {/* Top info: Monogram + Company & Location + Category badge */}
                            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10, marginBottom: 10 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                                <div
                                  style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 12,
                                    background: avatarBg,
                                    color: 'white',
                                    fontWeight: 900,
                                    fontSize: 13,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0,
                                    letterSpacing: '0.5px',
                                    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                                  }}
                                >
                                  {monogram}
                                </div>
                                <div style={{ minWidth: 0 }}>
                                  <div style={{ fontWeight: 800, fontSize: 13.5, color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {job.company}
                                  </div>
                                  <div style={{ fontSize: 11.5, color: '#64748B', display: 'flex', alignItems: 'center', gap: 4, marginTop: 1 }}>
                                    <span>📍 {job.location || 'WFH Remote'}</span>
                                  </div>
                                </div>
                              </div>
                              <span style={S.pill('#EFF6FF', '#1D64EC', '#BFDBFE')}>
                                {job.type || 'Remote'}
                              </span>
                            </div>

                            {/* Job Title */}
                            <h3 style={{ margin: '4px 0 10px', fontSize: 15.5, fontWeight: 800, color: '#0F172A', lineHeight: 1.3 }}>
                              {job.title}
                            </h3>

                            {/* Salary & Type badges */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
                              <span style={{ background: '#ECFDF5', color: '#059669', border: '1px solid #A7F3D0', padding: '3px 9px', borderRadius: 8, fontSize: 11.5, fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                                <span>💰</span>
                                <span>{job.salary}</span>
                              </span>
                              <span style={{ background: '#F8FAFC', color: '#475569', border: '1px solid #E2E8F0', padding: '3px 9px', borderRadius: 8, fontSize: 11.5, fontWeight: 700 }}>
                                💼 {job.type}
                              </span>
                            </div>

                            {/* Description snippet */}
                            {job.description && (
                              <p style={{ margin: '0 0 10px', fontSize: 12, color: '#475569', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', background: '#F8FAFC', padding: '8px 12px', borderRadius: 10, border: '1px solid #F1F5F9' }}>
                                {job.description}
                              </p>
                            )}

                            {/* Skill tags */}
                            {job.tags && job.tags.length > 0 && (
                              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                                {job.tags.slice(0, 4).map((tag, tIdx) => (
                                  <span key={tIdx} style={{ fontSize: 10.5, color: '#64748B', background: '#F1F5F9', border: '1px solid #E2E8F0', padding: '2px 8px', borderRadius: 6, fontWeight: 600 }}>
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Footer Actions */}
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, paddingTop: 12, borderTop: '1px solid #F1F5F9' }}>
                            <span style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600 }}>
                              🕒 {job.posted || 'Hari ini'}
                            </span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                              {job.applyUrl && (
                                <a
                                  href={job.applyUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{ ...S.btnOutline, padding: '6px 12px', fontSize: 11.5, textDecoration: 'none' }}
                                  title="Buka link pendaftaran"
                                >
                                  🔗 Link ↗
                                </a>
                              )}
                              <button
                                style={{ ...S.btnOutline, padding: '6px 12px', fontSize: 11.5 }}
                                onClick={() => openEditJobModal(job)}
                              >
                                ✏️ Edit
                              </button>
                              <button
                                style={{ ...S.btnRed, padding: '6px 12px', fontSize: 11.5 }}
                                onClick={() => deleteJob(job.id, job.title)}
                              >
                                Hapus
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
          </div>
        )}

        {/* TAB: PRODUK */}
        {activeTab === 'produk' && (
          <div>
            {/* Import Notification Banner */}
            {importNotification && (
              <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 14, padding: '12px 18px', marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ color: '#1D64EC', fontSize: 16 }}>✓</span>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#1E40AF' }}>{importNotification}</div>
                </div>
                <button
                  style={{ background: '#DBEAFE', color: '#1D4ED8', border: 'none', borderRadius: 9999, padding: '4px 12px', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}
                  onClick={() => setImportNotification(null)}
                >
                  Tutup
                </button>
              </div>
            )}

            {/* METRICS */}
            <div style={S.metGrid}>
              <MetricCard title="Total Produk" value={products.length} sub="Semua produk" accent="blue" />
              <MetricCard title="Produk Aktif" value={products.filter(p => p.isPublished).length} sub="Tampil di website" accent="emerald" />
              <MetricCard title="Kategori" value={new Set(products.map(p => p.category)).size} sub="Variasi kategori" accent="gold" />
            </div>

            {/* PRODUCT PANEL */}
            <div style={S.panel}>
              <div style={S.panelHdr}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                  <div>
                    <h2 style={{ fontSize: 18, fontWeight: 800, margin: 0, marginBottom: 2 }}>Katalog Produk</h2>
                    <p style={{ fontSize: 12.5, color: '#64748B', margin: 0 }}>Kelola produk panduan dan template rekomendasi</p>
                  </div>
                  <input
                    style={{ ...S.input, width: 240, padding: '7px 12px', fontSize: 12 }}
                    placeholder="Cari produk atau kategori..."
                    value={productSearch}
                    onChange={e => setProductSearch(e.target.value)}
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <button style={S.btnPrimary} onClick={openAddProductModal}>
                    + Tambah Produk
                  </button>
                </div>
              </div>

              {/* PRODUCTS LIST */}
              {products.length === 0 ? (
                <div style={{ padding: '60px 20px', textAlign: 'center' }}>
                  <div style={{ fontSize: 40, marginBottom: 12 }}>📦</div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', marginBottom: 6 }}>Belum Ada Produk</div>
                  <p style={{ fontSize: 13, color: '#64748B', maxWidth: 360, margin: '0 auto 18px', lineHeight: 1.5 }}>
                    Tambahkan produk panduan atau materi digital untuk direkomendasikan kepada pengguna.
                  </p>
                  <button style={S.btnPrimary} onClick={openAddProductModal}>
                    + Tambah Produk
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {products
                    .filter(p => p.title.toLowerCase().includes(productSearch.toLowerCase()) || p.category.toLowerCase().includes(productSearch.toLowerCase()))
                    .map((prod) => (
                      <div
                        key={prod.id}
                        style={{
                          padding: '18px 24px',
                          borderBottom: '1px solid #F1F5F9',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: 16,
                          flexWrap: 'wrap',
                          transition: 'background 0.15s',
                        }}
                      >
                        {/* Left: Thumbnail & Details */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flex: 1, minWidth: 280 }}>
                          {/* Thumbnail Cover */}
                          <div style={{ width: 60, height: 60, borderRadius: 12, overflow: 'hidden', background: '#F1F5F9', border: '1px solid #E2E8F0', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {prod.imageUrl ? (
                              <img src={prod.imageUrl} alt={prod.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                              <span style={{ fontSize: 22 }}>📘</span>
                            )}
                          </div>

                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                              <span style={S.pill('#EFF6FF', '#1D64EC', '#BFDBFE')}>{prod.category}</span>
                              {prod.badge && <span style={S.pill('#FEF3C7', '#D97706', '#FDE68A')}>{prod.badge}</span>}
                              <button
                                onClick={() => toggleProductPublish(prod)}
                                style={{
                                  ...S.pill(prod.isPublished ? '#ECFDF5' : '#F1F5F9', prod.isPublished ? '#059669' : '#64748B', prod.isPublished ? '#A7F3D0' : '#CBD5E1'),
                                  cursor: 'pointer',
                                  border: 'none',
                                }}
                              >
                                {prod.isPublished ? '● Tayang' : '○ Draft'}
                              </button>
                            </div>
                            <h4 style={{ margin: '0 0 4px', fontSize: 14.5, fontWeight: 800, color: '#0F172A', lineHeight: 1.3 }}>
                              {prod.title}
                            </h4>
                            <div style={{ fontSize: 12, color: '#64748B', display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                              <span>Target: <strong>{prod.sideJob || 'Semua Persona'}</strong></span>
                              <span>•</span>
                              <span style={{ color: '#1D64EC', fontSize: 11.5, wordBreak: 'break-all' }}>{prod.url}</span>
                            </div>
                          </div>
                        </div>

                        {/* Right: Actions */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <a
                            href={prod.url}
                            target="_blank"
                            rel="noreferrer"
                            style={{ ...S.btnOutline, textDecoration: 'none', padding: '7px 14px', fontSize: 11.5 }}
                          >
                            🔗 Buka Link Produk ↗
                          </a>
                          <button
                            style={{ ...S.btnOutline, padding: '7px 14px', fontSize: 11.5 }}
                            onClick={() => openEditProductModal(prod)}
                          >
                            ✏️ Edit
                          </button>
                          <button
                            style={{ ...S.btnRed, padding: '7px 14px', fontSize: 11.5 }}
                            onClick={() => deleteProduct(prod.id, prod.title)}
                          >
                            Hapus
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* MODAL TAMBAH / EDIT LOWONGAN */}
      {isJobModalOpen && (
        <div style={S.overlay} onClick={() => setIsJobModalOpen(false)}>
          <div style={{ ...S.modal, maxWidth: 620 }} onClick={e => e.stopPropagation()}>
            <button style={S.closeBtn} onClick={() => setIsJobModalOpen(false)}>✕</button>
            <div style={S.modalPad}>
              <h2 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 4px', letterSpacing: '-0.02em' }}>
                {editingJob ? 'Edit Lowongan Kerja' : 'Tambah Lowongan Kerja'}
              </h2>
              <p style={{ fontSize: 12.5, color: '#64748B', margin: '0 0 18px' }}>
                {editingJob ? 'Perbarui detail lowongan kerja remote ini.' : 'Masukkan rincian lowongan kerja remote baru.'}
              </p>

              {/* LIVE CARD PREVIEW */}
              <div style={{ background: '#F8FAFC', border: '1.5px dashed #CBD5E1', borderRadius: 16, padding: '14px 16px', marginBottom: 18 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span>👁️ Preview Tampilan Kandidat</span>
                </div>
                <div style={{ background: 'white', borderRadius: 14, border: '1px solid #E2E8F0', padding: 14, boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10, marginBottom: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 10,
                          background: getCompanyAvatarStyle(jobForm.company || 'Perusahaan'),
                          color: 'white',
                          fontWeight: 900,
                          fontSize: 12,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        {getCompanyMonogram(jobForm.company || 'Perusahaan')}
                      </div>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: 13, color: '#0F172A' }}>
                          {jobForm.company || 'Nama Perusahaan'}
                        </div>
                        <div style={{ fontSize: 11, color: '#64748B' }}>
                          📍 {jobForm.location || 'WFH Remote Indonesia'}
                        </div>
                      </div>
                    </div>
                    <span style={S.pill('#EFF6FF', '#1D64EC', '#BFDBFE')}>
                      {jobForm.type || 'Full-time Remote'}
                    </span>
                  </div>

                  <div style={{ fontWeight: 800, fontSize: 14.5, color: '#0F172A', marginBottom: 6 }}>
                    {jobForm.title || 'Judul Lowongan Kerja'}
                  </div>

                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
                    <span style={{ background: '#ECFDF5', color: '#059669', border: '1px solid #A7F3D0', padding: '2px 8px', borderRadius: 6, fontSize: 11, fontWeight: 800 }}>
                      💰 {jobForm.salary || 'Kompetitif'}
                    </span>
                    <span style={{ background: '#F8FAFC', color: '#475569', border: '1px solid #E2E8F0', padding: '2px 8px', borderRadius: 6, fontSize: 11, fontWeight: 700 }}>
                      💼 {jobForm.type || 'Full-time Remote'}
                    </span>
                  </div>
                </div>
              </div>

              {/* FORM FIELDS */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <label style={S.label}>Judul Lowongan *</label>
                  <input
                    style={S.input}
                    placeholder="Contoh: Virtual Assistant & Operations Coordinator"
                    value={jobForm.title}
                    onChange={e => setJobForm({ ...jobForm, title: e.target.value })}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={S.label}>Nama Perusahaan / Brand *</label>
                    <input
                      style={S.input}
                      placeholder="Contoh: Digital Solutions Asia"
                      value={jobForm.company}
                      onChange={e => setJobForm({ ...jobForm, company: e.target.value })}
                    />
                  </div>
                  <div>
                    <label style={S.label}>Lokasi</label>
                    <input
                      style={S.input}
                      placeholder="Contoh: WFH / Remote Indonesia"
                      value={jobForm.location}
                      onChange={e => setJobForm({ ...jobForm, location: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={S.label}>Estimasi Gaji / Fee</label>
                    <input
                      style={S.input}
                      placeholder="Contoh: Rp 4.500.000 - Rp 6.500.000 / bln"
                      value={jobForm.salary}
                      onChange={e => setJobForm({ ...jobForm, salary: e.target.value })}
                    />
                  </div>
                  <div>
                    <label style={S.label}>Tipe Kerja</label>
                    <select
                      style={S.input}
                      value={jobForm.type}
                      onChange={e => setJobForm({ ...jobForm, type: e.target.value })}
                    >
                      <option value="Full-time Remote">Full-time Remote</option>
                      <option value="Part-time Remote">Part-time Remote</option>
                      <option value="Freelance Project">Freelance Project</option>
                      <option value="Contract Remote">Contract Remote</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={S.label}>Link Pendaftaran / Form / WA *</label>
                  <input
                    style={{ ...S.input, color: '#1D64EC', fontWeight: 600 }}
                    placeholder="https://wa.me/... atau link form"
                    value={jobForm.applyUrl}
                    onChange={e => setJobForm({ ...jobForm, applyUrl: e.target.value })}
                  />
                </div>

                <div>
                  <label style={S.label}>Tags / Keahlian (Pisahkan dengan koma)</label>
                  <input
                    style={S.input}
                    placeholder="Contoh: Canva, Notion, Trello, Customer Care"
                    value={jobForm.tags}
                    onChange={e => setJobForm({ ...jobForm, tags: e.target.value })}
                  />
                </div>

                <div>
                  <label style={S.label}>Deskripsi Singkat & Kualifikasi</label>
                  <textarea
                    style={S.textarea}
                    rows={3}
                    placeholder="Gambaran tanggung jawab dan kualifikasi yang dicari..."
                    value={jobForm.description}
                    onChange={e => setJobForm({ ...jobForm, description: e.target.value })}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 8 }}>
                  <button style={S.btnOutline} onClick={() => setIsJobModalOpen(false)}>
                    Batal
                  </button>
                  <button style={S.btnPrimary} disabled={isSaving} onClick={saveJob}>
                    {isSaving ? 'Menyimpan...' : (editingJob ? 'Simpan Perubahan' : 'Tambah Lowongan')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL TAMBAH / EDIT PRODUK */}
      {isProductModalOpen && (
        <div style={S.overlay} onClick={() => setIsProductModalOpen(false)}>
          <div style={S.modal} onClick={e => e.stopPropagation()}>
            <button style={S.closeBtn} onClick={() => setIsProductModalOpen(false)}>✕</button>
            <div style={S.modalPad}>
              <h2 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 4px', letterSpacing: '-0.02em' }}>
                {editingProduct ? 'Edit Produk' : 'Tambah Produk'}
              </h2>
              <p style={{ fontSize: 12.5, color: '#64748B', margin: '0 0 20px' }}>
                Lengkapi rincian produk panduan atau materi digital rekomendasi.
              </p>

              {/* PREVIEW */}
              {(productForm.title || productForm.imageUrl) && (
                <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 14, padding: 12, marginBottom: 16, display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div style={{ width: 52, height: 52, borderRadius: 10, overflow: 'hidden', background: 'white', border: '1px solid #E2E8F0', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {productForm.imageUrl ? (
                      <img src={productForm.imageUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <span style={{ fontSize: 20 }}>📘</span>
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', gap: 6, marginBottom: 2 }}>
                      <span style={S.pill('#EFF6FF', '#1D64EC', '#BFDBFE')}>{productForm.category}</span>
                      {productForm.badge && <span style={S.pill('#FEF3C7', '#D97706', '#FDE68A')}>{productForm.badge}</span>}
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {productForm.title || 'Judul Produk'}
                    </div>
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {/* Lynk URL */}
                <div>
                  <label style={S.label}>Link Produk *</label>
                  <input
                    style={{ ...S.input, color: '#1D64EC', fontWeight: 600 }}
                    placeholder="https://..."
                    value={productForm.url}
                    onChange={e => setProductForm({ ...productForm, url: e.target.value })}
                  />
                </div>

                {/* Image Cover URL */}
                <div>
                  <label style={S.label}>Link Gambar Cover</label>
                  <input
                    style={S.input}
                    placeholder="https://..."
                    value={productForm.imageUrl}
                    onChange={e => setProductForm({ ...productForm, imageUrl: e.target.value })}
                  />
                </div>

                {/* Judul Produk */}
                <div>
                  <label style={S.label}>Judul Produk *</label>
                  <input
                    style={S.input}
                    placeholder="Contoh: Template Administrasi & Spreadsheet"
                    value={productForm.title}
                    onChange={e => setProductForm({ ...productForm, title: e.target.value })}
                  />
                </div>

                {/* Kategori & Harga */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={S.label}>Kategori *</label>
                    <select
                      style={S.input}
                      value={productForm.category}
                      onChange={e => setProductForm({ ...productForm, category: e.target.value, type: e.target.value.toLowerCase().replace(/\s+/g, '') })}
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
                    <label style={S.label}>Harga</label>
                    <input
                      style={S.input}
                      placeholder="Contoh: Rp 49.000"
                      value={productForm.price}
                      onChange={e => setProductForm({ ...productForm, price: e.target.value })}
                    />
                  </div>
                </div>

                {/* Badge & Target */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={S.label}>Badge (Opsional)</label>
                    <select
                      style={S.input}
                      value={productForm.badge}
                      onChange={e => setProductForm({ ...productForm, badge: e.target.value })}
                    >
                      {BADGE_OPTIONS.map(opt => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                      {productForm.badge && !BADGE_OPTIONS.some(o => o.value === productForm.badge) && (
                        <option value={productForm.badge}>{productForm.badge}</option>
                      )}
                    </select>
                  </div>
                  <div>
                    <label style={S.label}>Target Rekomendasi</label>
                    <select
                      style={S.input}
                      value={productForm.sideJob}
                      onChange={e => setProductForm({ ...productForm, sideJob: e.target.value })}
                    >
                      <option value="Umum / Semua Profil">🌐 Semua Profil (Umum)</option>
                      <optgroup label="── Profil Spesifik ──">
                        {Object.values(SIDE_JOBS_DB).map(job => (
                          <option key={job.id} value={job.name}>{job.icon} {job.name}</option>
                        ))}
                      </optgroup>
                    </select>
                  </div>
                </div>

                {/* Deskripsi */}
                <div>
                  <label style={S.label}>Deskripsi Singkat (Opsional)</label>
                  <textarea
                    style={S.textarea}
                    rows={3}
                    placeholder="Ringkasan singkat isi atau manfaat produk..."
                    value={productForm.desc}
                    onChange={e => setProductForm({ ...productForm, desc: e.target.value })}
                  />
                </div>

                {/* Publish Toggle */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 0' }}>
                  <input
                    type="checkbox"
                    id="isPublishedCheck"
                    checked={productForm.isPublished}
                    onChange={e => setProductForm({ ...productForm, isPublished: e.target.checked })}
                    style={{ width: 18, height: 18, cursor: 'pointer' }}
                  />
                  <label htmlFor="isPublishedCheck" style={{ fontSize: 13, fontWeight: 600, color: '#0F172A', cursor: 'pointer' }}>
                    Tampilkan di website
                  </label>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 10 }}>
                  <button style={S.btnOutline} onClick={() => setIsProductModalOpen(false)}>
                    Batal
                  </button>
                  <button style={S.btnPrimary} disabled={isSaving} onClick={saveProduct}>
                    {isSaving ? 'Menyimpan...' : (editingProduct ? 'Simpan Perubahan' : 'Simpan Produk')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LEAD DETAIL MODAL */}
      {selectedLead && (
        <div style={S.overlay} onClick={() => setSelectedLead(null)}>
          <div style={S.modal} onClick={e => e.stopPropagation()}>
            <button style={S.closeBtn} onClick={() => setSelectedLead(null)}>✕</button>
            <div style={S.modalPad}>
              <h2 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 4px', letterSpacing: '-0.02em' }}>Detail Peserta</h2>
              <p style={{ fontSize: 12.5, color: '#64748B', margin: '0 0 20px' }}>Informasi kontak dan ringkasan hasil asesmen</p>

              {/* Info grid */}
              <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: 16, borderRadius: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}>
                {[
                  { label: 'Nama Lengkap', value: selectedLead.name, bold: true },
                  { label: 'WhatsApp', value: selectedLead.wa, color: '#16A34A', bold: true },
                  { label: 'Email', value: selectedLead.email },
                  { label: 'Profesi', value: selectedLead.profesi },
                ].map(item => (
                  <div key={item.label}>
                    <div style={{ fontSize: 10.5, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 4 }}>{item.label}</div>
                    <div style={{ fontSize: 14.5, fontWeight: item.bold ? 800 : 600, color: item.color || '#0F172A' }}>{item.value || '-'}</div>
                  </div>
                ))}
              </div>

              {/* Scores */}
              <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 14, padding: 16, marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                  <div style={{ textAlign: 'center', flex: 1 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#64748B', marginBottom: 4 }}>TOP MATCH</div>
                    <div style={{ fontSize: 13, fontWeight: 800, color: '#1D64EC', lineHeight: 1.3 }}>{selectedLead.topMatch}</div>
                  </div>
                  <div style={{ textAlign: 'center', flex: 1 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#64748B', marginBottom: 4 }}>SKOR KESIAPAN</div>
                    <div style={{ fontSize: 28, fontWeight: 900, color: '#10B981', lineHeight: 1 }}>{selectedLead.readinessScore}%</div>
                  </div>
                </div>
              </div>

              {/* Gaps */}
              {selectedLead.gaps?.length > 0 && (
                <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', padding: 14, borderRadius: 14, marginBottom: 16 }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: '#92400E', marginBottom: 8 }}>Area Pengembangan:</div>
                  <ul style={{ margin: 0, paddingLeft: 18 }}>
                    {selectedLead.gaps.map((g, i) => (
                      <li key={i} style={{ fontSize: 12.5, color: '#78350F', marginBottom: 4, lineHeight: 1.4 }}>{g}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Skills */}
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 11.5, fontWeight: 700, color: '#64748B', marginBottom: 8 }}>Keahlian:</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {selectedLead.skills?.map((s, i) => (
                    <span key={i} style={S.pill('#F1F5F9', '#334155')}>{toTitleCase(s)}</span>
                  )) || <span style={{ color: '#94A3B8', fontSize: 12 }}>-</span>}
                </div>
              </div>

              {/* Tools */}
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 11.5, fontWeight: 700, color: '#64748B', marginBottom: 8 }}>Tools:</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {selectedLead.tools?.map((t, i) => (
                    <span key={i} style={S.pill('#EFF6FF', '#1D64EC', '#BFDBFE')}>{t}</span>
                  )) || <span style={{ color: '#94A3B8', fontSize: 12 }}>-</span>}
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: 10 }}>
                <button style={{ ...S.btnOutline, flex: 1, justifyContent: 'center' }} onClick={() => setSelectedLead(null)}>Tutup</button>
                <button style={{ ...S.btnRed }} onClick={() => deleteLead(selectedLead.id)}>Hapus Data</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
