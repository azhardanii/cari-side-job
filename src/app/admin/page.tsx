'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { JOB_CATEGORIES, SIDE_JOBS_DB, getJobCategory } from '@/lib/data';

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
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [origin, setOrigin] = useState('http://localhost:3000');
  const [copiedBookmarklet, setCopiedBookmarklet] = useState(false);
  const [importNotification, setImportNotification] = useState<string | null>(null);
  const [showSmartPaste, setShowSmartPaste] = useState(false);
  const [smartPasteText, setSmartPasteText] = useState('');
  const bookmarkletRef = React.useRef<HTMLAnchorElement>(null);

  const [newJob, setNewJob] = useState({
    title: '',
    company: '',
    location: 'WFH / Remote Indonesia',
    salary: 'Rp 4.500.000 - Rp 6.500.000 / bln',
    type: 'Full-time Remote',
    category: JOB_CATEGORIES[0] as string,
    tags: '',
    description: '',
    applyUrl: '',
  });

  const [productForm, setProductForm] = useState<ProductFormData>({
    title: '',
    category: 'Ebook',
    type: 'digital',
    desc: '',
    price: 'Rp 49.000',
    badge: 'Best Seller',
    url: '',
    imageUrl: '',
    sideJob: JOB_CATEGORIES[0] || 'Data Entry Specialist',
    isPublished: true,
    order: 0,
  });

  const bookmarkletCode = `javascript:(function(){try{var doc=document,win=window,tabName=(doc.title||'').replace(/\\s*\\|\\s*LYNK.*$/i,'').trim(),pathUser=(win.location.pathname.split('/')[1]||'').toLowerCase(),t='';try{var ndEl=doc.getElementById('__NEXT_DATA__');if(ndEl){var nd=JSON.parse(ndEl.textContent||'{}'),pp=nd.props&&nd.props.pageProps;if(pp){var cand=pp.product||pp.item||pp.data||pp.productDetail||{};if(cand.title&&typeof cand.title==='string')t=cand.title.trim();else if(cand.name&&typeof cand.name==='string')t=cand.name.trim();}}}catch(e){}if(!t){var sel=(win.getSelection?win.getSelection().toString():'').trim();if(sel&&sel.length>4&&sel.length<120&&!sel.includes('\\n'))t=sel;}var bodyText=doc.body?doc.body.innerText:'',lines=bodyText.split('\\n').map(function(l){return l.trim();}).filter(Boolean);if(!t){for(var i=0;i<lines.length;i++){var l=lines[i];if(/^(?:rp\\.?|idr)\\s*[\\d\\.,]+/i.test(l)||/\\b(?:rp\\.?|idr)\\s*\\d+/i.test(l)){for(var k=i-1;k>=Math.max(0,i-3);k--){var prev=lines[k],pLow=prev.toLowerCase();if(prev.length>4&&prev.length<120&&pLow!==tabName.toLowerCase()&&pLow!==pathUser&&!pLow.includes('lynk')&&!/^(?:rp\\.?|idr|http)/i.test(prev)){t=prev;break;}}if(t)break;}}}if(!t){var headings=Array.from(doc.querySelectorAll('h1, h2, [role=\"heading\"], [class*=\"title\" i]'));for(var h=0;h<headings.length;h++){var ht=(headings[h].innerText||headings[h].textContent||'').trim(),hLow=ht.toLowerCase();if(ht.length>4&&ht.length<120&&hLow!==tabName.toLowerCase()&&hLow!==pathUser&&!hLow.includes('lynk')&&!/^(?:rp\\.?|idr|http)/i.test(ht)&&!['beli sekarang','checkout','bagikan','deskripsi'].includes(hLow)){t=ht;break;}}}if(!t){t=lines.find(function(l){var lLow=l.toLowerCase();return !l.startsWith('http')&&!lLow.startsWith('rp')&&!lLow.startsWith('idr')&&l.length>4&&l.length<90&&lLow!==tabName.toLowerCase()&&lLow!==pathUser&&!lLow.includes('lynk')&&!['beli sekarang','checkout','bagikan','deskripsi'].includes(lLow);})||'';}if(!t)t=tabName;var price='',priceMatch=bodyText.match(/(?:Rp\\.?|IDR)\\s*[\\d\\.,]+/i);if(priceMatch)price=priceMatch[0].trim();var imgEl=doc.querySelector('img[src*=\"cdn.lynkid.my.id\"]')||doc.querySelector('img[src*=\"lynk\"]')||doc.querySelector('meta[property=\"og:image\"]'),img=imgEl?(imgEl.src||imgEl.content||''):'';var u=win.location.href.split('?')[0].replace(/\\/+$/,'').replace(/\\/checkout$/,'');var target='${origin}/admin?tab=produk&import=lynk&title='+encodeURIComponent(t)+'&image='+encodeURIComponent(img)+'&price='+encodeURIComponent(price)+'&url='+encodeURIComponent(u);var w=win.open(target,'_blank');if(!w||w.closed||typeof w.closed==='undefined'){win.location.href=target;}}catch(e){alert('Gagal impor Lynk.id: '+e.message);}})();`;

  // Attach real javascript: code via native DOM ref to bypass React's security block
  useEffect(() => {
    if (bookmarkletRef.current) {
      bookmarkletRef.current.setAttribute('href', bookmarkletCode);
    }
  }, [bookmarkletCode, origin, activeTab]);

  const cleanLynkUrl = (rawUrl: string): string => {
    let url = (rawUrl || '').trim();
    if (!url) return '';
    url = url.split('?')[0].replace(/\/+$/, '');
    url = url.replace(/\/checkout$/, '');
    return url;
  };

  const handleSmartPaste = (raw: string) => {
    setSmartPasteText(raw);
    if (!raw.trim()) return;

    // Detect image URL from cdn.lynkid.my.id
    const imgMatch = raw.match(/https:\/\/cdn\.lynkid\.my\.id\/[^\s\"\'<>\)]+/i);
    // Detect lynk.id URL
    const urlMatch = raw.match(/https:\/\/lynk\.id\/[^\s\"\'<>\)]+/i);
    let cleanUrl = urlMatch ? cleanLynkUrl(urlMatch[0]) : '';
    // Detect price if present in paste
    const priceMatch = raw.match(/(?:Rp\.?|IDR)\s*[\d\.,]+/i);

    const lines = raw.split('\n').map(l => l.trim()).filter(Boolean);
    const candidateTitle = lines.find(l => !l.startsWith('http') && !l.toLowerCase().startsWith('rp') && !l.toLowerCase().startsWith('idr') && l.length > 4 && l.length < 90);

    setProductForm(prev => ({
      ...prev,
      title: candidateTitle || prev.title,
      price: priceMatch ? priceMatch[0].trim() : prev.price,
      imageUrl: imgMatch ? imgMatch[0].trim() : prev.imageUrl,
      url: cleanUrl || prev.url,
    }));
  };

  useEffect(() => {
    fetchLeads();
    fetchJobs();
    fetchProducts();

    if (typeof window !== 'undefined') {
      setOrigin(window.location.origin);

      // Auto-detect import query parameters from Bookmarklet
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
          sideJob: JOB_CATEGORIES[0] || 'Data Entry Specialist',
          isPublished: true,
          order: 0,
        });
        setEditingProduct(null);
        setIsProductModalOpen(true);
        setImportNotification('🎉 Data produk Lynk.id berhasil dideteksi! Form siap disimpan.');
        window.history.replaceState({}, '', '/admin');
      }
    }
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products?admin=true');
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
      sideJob: JOB_CATEGORIES[0] || 'Data Entry Specialist',
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
      sideJob: prod.sideJob || JOB_CATEGORIES[0] || 'Data Entry Specialist',
      isPublished: prod.isPublished ?? true,
      order: prod.order || 0,
    });
    setIsProductModalOpen(true);
  };

  const saveProduct = async () => {
    if (!productForm.title.trim() || !productForm.url.trim()) {
      alert('Judul dan URL produk Lynk.id wajib diisi.');
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
        price: '',
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
        alert(isEdit ? 'Produk berhasil diperbarui!' : 'Produk berhasil disimpan ke database!');
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
    if (!confirm(`Hapus produk "${title}" dari database?`)) return;
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
      const data = await res.json();
      if (data.success) { setLeads(data.leads || []); if (data.stats) setStats(data.stats); }
    } catch (e) { console.error(e); }
    finally { setIsLoading(false); }
  };

  const fetchJobs = async () => {
    try {
      const res = await fetch('/api/jobs');
      const data = await res.json();
      if (data.success && Array.isArray(data.jobs)) setJobs(data.jobs);
    } catch (e) { console.error(e); }
  };

  const createJob = async () => {
    if (!newJob.title.trim() || !newJob.company.trim()) {
      alert('Judul lowongan dan nama perusahaan wajib diisi.');
      return;
    }
    setIsSaving(true);
    try {
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newJob),
      });
      const data = await res.json();
      if (data.success) {
        alert(`Berhasil menambahkan lowongan "${newJob.title}"`);
        setIsAddModalOpen(false);
        setNewJob({
          title: '',
          company: '',
          location: 'WFH / Remote Indonesia',
          salary: 'Rp 4.500.000 - Rp 6.500.000 / bln',
          type: 'Full-time Remote',
          category: JOB_CATEGORIES[0],
          tags: '',
          description: '',
          applyUrl: '',
        });
        fetchJobs();
      } else {
        alert('Gagal: ' + data.error);
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
      });
      const data = await res.json();
      if (data.success) {
        setJobs(prev => prev.filter(j => j.id !== id));
        alert('Lowongan berhasil dihapus.');
      } else {
        alert('Gagal menghapus: ' + data.error);
      }
    } catch {
      alert('Gagal menghapus lowongan.');
    }
  };

  const saveJob = async (job: JobItem) => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/jobs', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...job,
          category: job.primarySideJob,
        }),
      });
      const data = await res.json();
      if (data.success) alert(`Berhasil menyimpan perubahan lowongan "${job.title}"`);
      else alert('Gagal: ' + data.error);
    } catch (e: any) { alert('Error: ' + e?.message); }
    finally { setIsSaving(false); }
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
              CARI <span style={S.badge}>SIDE JOB</span>
              <span style={{ color: '#64748B', fontWeight: 500, fontSize: 14 }}>• Admin Dashboard</span>
            </h1>
            <p style={S.sub}>Dashboard Admin · Cari Side Job</p>
          </div>
        </Link>
        <div style={S.hBtns}>
          <Link href="/" style={S.btnOutline}>← Kembali</Link>
          <button style={S.btnPrimary} onClick={exportCsv}>Export CSV ({leads.length})</button>
          <button style={S.btnRed} onClick={resetAll}>Reset Data</button>
        </div>
      </header>

      <div style={S.body}>
        {/* TABS */}
        <div style={S.tabRow}>
          <TabBtn label={`Data Leads (${leads.length})`} active={activeTab === 'leads'} onClick={() => setActiveTab('leads')} />
          <TabBtn label={`Lowongan (${jobs.length})`} active={activeTab === 'loker'} onClick={() => setActiveTab('loker')} />
          <TabBtn label={`Produk Lynk.id (${products.length})`} active={activeTab === 'produk'} onClick={() => setActiveTab('produk')} />
        </div>

        {/* TAB: LEADS */}
        {activeTab === 'leads' && (
          <div>
            {/* Metric Cards */}
            <div style={S.metGrid}>
              <MetricCard title="Total Mulai Asesmen" value={stats.totalStarts} sub="Klik tombol kuis" />
              <MetricCard title="Leads" value={stats.totalLeads} sub="Total lead masuk" accent="blue" />
              <MetricCard title="Conversion Rate" value={stats.conversionRate} sub="Rasio pengisian lead" accent="gold" />
              <MetricCard title="Rata-rata Kesiapan" value={stats.avgReadiness} sub="Skor kesiapan user" accent="emerald" />
              <MetricCard title="Side Job Terpopuler" value={stats.popularJob} sub="Paling banyak cocok" />
            </div>

            {/* Table */}
            <div style={S.panel}>
              <div style={S.panelHdr}>
                <div>
                  <h2 style={{ fontSize: 18, fontWeight: 800, margin: 0, marginBottom: 2 }}>Daftar Leads</h2>
                  <p style={{ fontSize: 12.5, color: '#64748B', margin: 0 }}>Data hasil asesmen user</p>
                </div>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    style={{ ...S.input, width: 280, paddingLeft: 36 }}
                    placeholder="🔍 Cari nama, WA, email, job..."
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
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
              <div>
                <h2 style={{ fontSize: 22, fontWeight: 800, margin: 0, marginBottom: 6, letterSpacing: '-0.02em' }}>Kelola Lowongan Remote</h2>
                <p style={{ fontSize: 13.5, color: '#64748B', margin: 0, lineHeight: 1.5 }}>
                  Tambah lowongan baru, sesuaikan kategori, perbarui link pendaftaran, atau hapus lowongan.
                </p>
              </div>
              <button style={S.btnPrimary} onClick={() => setIsAddModalOpen(true)}>
                + Tambah Lowongan
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(340px,1fr))', gap: 20 }}>
              {jobs.map((job, idx) => (
                <div key={job.id} style={S.jobCard}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={S.pill('#EFF6FF', '#1D64EC', '#BFDBFE')}>#{idx + 1} {getJobCategory(job)}</span>
                    <span style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600 }}>{job.posted}</span>
                  </div>

                  <div>
                    <label style={S.label}>Judul Lowongan</label>
                    <input style={S.input} value={job.title} onChange={e => { const u = [...jobs]; u[idx] = { ...u[idx], title: e.target.value }; setJobs(u); }} />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div>
                      <label style={S.label}>Perusahaan</label>
                      <input style={S.input} value={job.company} onChange={e => { const u = [...jobs]; u[idx] = { ...u[idx], company: e.target.value }; setJobs(u); }} />
                    </div>
                    <div>
                      <label style={S.label}>Kategori</label>
                      <select
                        style={S.input}
                        value={getJobCategory(job)}
                        onChange={e => {
                          const u = [...jobs];
                          u[idx] = { ...u[idx], primarySideJob: e.target.value };
                          setJobs(u);
                        }}
                      >
                        {JOB_CATEGORIES.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div>
                      <label style={S.label}>Gaji</label>
                      <input style={S.input} value={job.salary} onChange={e => { const u = [...jobs]; u[idx] = { ...u[idx], salary: e.target.value }; setJobs(u); }} />
                    </div>
                    <div>
                      <label style={S.label}>Tipe Kerja</label>
                      <input style={S.input} value={job.type} onChange={e => { const u = [...jobs]; u[idx] = { ...u[idx], type: e.target.value }; setJobs(u); }} />
                    </div>
                  </div>

                  <div>
                    <label style={S.label}>Link Pendaftaran</label>
                    <input style={{ ...S.input, color: '#1D64EC', fontWeight: 600 }} value={job.applyUrl} onChange={e => { const u = [...jobs]; u[idx] = { ...u[idx], applyUrl: e.target.value }; setJobs(u); }} />
                  </div>

                  <div>
                    <label style={S.label}>Deskripsi Singkat</label>
                    <textarea style={S.textarea} rows={2} value={job.description} onChange={e => { const u = [...jobs]; u[idx] = { ...u[idx], description: e.target.value }; setJobs(u); }} />
                  </div>

                  <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                    <button style={{ ...S.btnPrimary, flex: 1, justifyContent: 'center' as const }} disabled={isSaving} onClick={() => saveJob(job)}>
                      {isSaving ? 'Menyimpan...' : 'Simpan'}
                    </button>
                    <button style={S.btnRed} onClick={() => deleteJob(job.id, job.title)}>
                      Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: PRODUK LYNK.ID */}
        {activeTab === 'produk' && (
          <div>
            {/* Import Notification Banner */}
            {importNotification && (
              <div style={{ background: '#EFF6FF', border: '1.5px solid #60A5FA', borderRadius: 16, padding: '16px 20px', marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 24 }}>⚡</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: '#1D4ED8' }}>Lynk.id Auto-Detect Aktif</div>
                    <div style={{ fontSize: 12.5, color: '#1E40AF', marginTop: 2 }}>{importNotification}</div>
                  </div>
                </div>
                <button
                  style={{ background: '#DBEAFE', color: '#1D4ED8', border: 'none', borderRadius: 9999, padding: '6px 14px', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}
                  onClick={() => setImportNotification(null)}
                >
                  Tutup
                </button>
              </div>
            )}

            {/* METRICS & QUICK ACTIONS */}
            <div style={S.metGrid}>
              <MetricCard title="Total Produk" value={products.length} sub="Terdaftar di database" accent="blue" />
              <MetricCard title="Produk Aktif" value={products.filter(p => p.isPublished).length} sub="Tampil di rekomendasi user" accent="emerald" />
              <MetricCard title="Kategori" value={new Set(products.map(p => p.category)).size} sub="Variasi jenis produk" accent="gold" />
            </div>

            {/* 1-CLICK BOOKMARKLET IMPORTER CARD */}
            <div style={{ background: 'linear-gradient(135deg, #0F172A, #1E293B)', borderRadius: 20, padding: '24px 28px', color: 'white', marginBottom: 28, boxShadow: '0 10px 30px rgba(15,23,42,0.15)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
                <div style={{ maxWidth: 650 }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(59,130,246,0.2)', border: '1px solid rgba(59,130,246,0.4)', padding: '4px 12px', borderRadius: 9999, fontSize: 11.5, fontWeight: 800, color: '#93C5FD', marginBottom: 12 }}>
                    <span>🚀</span> FITUR ANDALAN: 1-KLIK IMPOR PRODUK DARI LYNK.ID
                  </div>
                  <h3 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 8px', letterSpacing: '-0.02em', color: 'white' }}>
                    Tarik Data Produk Otomatis Tanpa Upload Ulang Cover
                  </h3>
                  <p style={{ fontSize: 13, color: '#94A3B8', margin: 0, lineHeight: 1.6 }}>
                    Karena Lynk.id dilindungi Cloudflare, gunakan tombol bookmark ini langsung di browser Anda saat sedang membuka halaman produk di Lynk.id. Script akan otomatis menyedot Judul, Harga, Cover Image CDN, dan Link Produk ke form Admin ini!
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start' }}>
                  {/* Draggable bookmarklet link attached via native ref */}
                  <a
                    ref={bookmarkletRef}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      alert('💡 CARA PAKAI DI MICROSOFT EDGE:\n1. Tekan tombol Ctrl + Shift + B di keyboard agar Baris Favorit Edge muncul.\n2. Tarik (drag) tombol biru ini ke Baris Favorit di atas.\n3. Buka produk Lynk.id Anda, lalu klik favorit tersebut!');
                    }}
                    draggable
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      background: 'linear-gradient(135deg, #1D64EC, #0F3BA0)',
                      color: 'white',
                      padding: '12px 22px',
                      borderRadius: 9999,
                      fontSize: 13,
                      fontWeight: 800,
                      textDecoration: 'none',
                      cursor: 'grab',
                      boxShadow: '0 4px 16px rgba(29,100,236,0.5)',
                      border: '1.5px solid rgba(255,255,255,0.2)',
                    }}
                  >
                    <span>⚡</span> Seret Ini ke Baris Favorit (Edge / Chrome)
                  </a>

                  <button
                    style={{ background: 'rgba(255,255,255,0.1)', color: '#CBD5E1', border: '1px solid rgba(255,255,255,0.2)', padding: '8px 16px', borderRadius: 9999, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}
                    onClick={() => {
                      navigator.clipboard.writeText(bookmarkletCode);
                      setCopiedBookmarklet(true);
                      setTimeout(() => setCopiedBookmarklet(false), 2500);
                    }}
                  >
                    {copiedBookmarklet ? '✓ Script Tersalin ke Clipboard!' : '📋 Salin Kode Bookmarklet'}
                  </button>
                </div>
              </div>

              {/* 3 Step Tutorial */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginTop: 20, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ display: 'flex', gap: 12 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 9999, background: 'rgba(59,130,246,0.3)', color: '#93C5FD', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, flexShrink: 0 }}>1</div>
                  <div style={{ fontSize: 12, color: '#CBD5E1', lineHeight: 1.5 }}>
                    <strong style={{ color: 'white' }}>Munculkan Baris Favorit:</strong> Di Edge / Chrome, tekan tombol <span style={{ background: 'rgba(255,255,255,0.2)', padding: '2px 6px', borderRadius: 4, color: '#93C5FD', fontWeight: 700 }}>Ctrl + Shift + B</span> di keyboard. Lalu seret tombol biru ke baris tersebut.
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 9999, background: 'rgba(59,130,246,0.3)', color: '#93C5FD', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, flexShrink: 0 }}>2</div>
                  <div style={{ fontSize: 12, color: '#CBD5E1', lineHeight: 1.5 }}>
                    <strong style={{ color: 'white' }}>Buka Lynk.id:</strong> Buka halaman produk digital Anda di browser Edge/Chrome seperti biasa.
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 9999, background: 'rgba(59,130,246,0.3)', color: '#93C5FD', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, flexShrink: 0 }}>3</div>
                  <div style={{ fontSize: 12, color: '#CBD5E1', lineHeight: 1.5 }}>
                    <strong style={{ color: 'white' }}>Klik Bookmark/Favorit:</strong> Tab Admin terbuka otomatis dengan Cover, Judul, Harga & Link terisi 100%!
                  </div>
                </div>
              </div>
            </div>

            {/* PRODUCT PANEL */}
            <div style={S.panel}>
              <div style={S.panelHdr}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 16, fontWeight: 800, color: '#0F172A' }}>Katalog Produk Rekomendasi</span>
                  <input
                    style={{ ...S.input, width: 260, padding: '7px 12px', fontSize: 12 }}
                    placeholder="Cari produk atau kategori..."
                    value={productSearch}
                    onChange={e => setProductSearch(e.target.value)}
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <a
                    href="https://lynk.id/adithdigital"
                    target="_blank"
                    rel="noreferrer"
                    style={{ ...S.btnOutline, textDecoration: 'none' }}
                  >
                    🌐 Buka Toko Lynk.id ↗
                  </a>
                  <button style={S.btnPrimary} onClick={openAddProductModal}>
                    + Tambah Produk Manual
                  </button>
                </div>
              </div>

              {/* PRODUCTS LIST */}
              {products.length === 0 ? (
                <div style={{ padding: '60px 20px', textAlign: 'center' }}>
                  <div style={{ fontSize: 42, marginBottom: 12 }}>📦</div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', marginBottom: 6 }}>Belum Ada Produk di Database</div>
                  <p style={{ fontSize: 13, color: '#64748B', maxWidth: 420, margin: '0 auto 20px', lineHeight: 1.5 }}>
                    Produk lama yang hardcode sudah dihapus. Sekarang Anda bisa memasukkan produk real dari Lynk.id menggunakan tombol bookmark atau tambah manual.
                  </p>
                  <button style={S.btnPrimary} onClick={openAddProductModal}>
                    + Tambah Produk Pertama
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
                            🔗 Buka Lynk.id ↗
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

      {/* MODAL TAMBAH LOWONGAN */}
      {isAddModalOpen && (
        <div style={S.overlay} onClick={() => setIsAddModalOpen(false)}>
          <div style={S.modal} onClick={e => e.stopPropagation()}>
            <button style={S.closeBtn} onClick={() => setIsAddModalOpen(false)}>✕</button>
            <div style={S.modalPad}>
              <h2 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 6px', letterSpacing: '-0.02em' }}>Tambah Lowongan Remote</h2>
              <p style={{ fontSize: 12.5, color: '#64748B', margin: '0 0 20px' }}>Lowongan baru akan langsung tampil di halaman user sesuai kategorinya.</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <label style={S.label}>Judul Lowongan *</label>
                  <input
                    style={S.input}
                    placeholder="Cth: Junior Graphic Designer & Canva Specialist"
                    value={newJob.title}
                    onChange={e => setNewJob({ ...newJob, title: e.target.value })}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={S.label}>Perusahaan *</label>
                    <input
                      style={S.input}
                      placeholder="Cth: PT Digital Media Kreasi"
                      value={newJob.company}
                      onChange={e => setNewJob({ ...newJob, company: e.target.value })}
                    />
                  </div>
                  <div>
                    <label style={S.label}>Kategori Lowongan *</label>
                    <select
                      style={S.input}
                      value={newJob.category}
                      onChange={e => setNewJob({ ...newJob, category: e.target.value })}
                    >
                      {JOB_CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={S.label}>Gaji</label>
                    <input
                      style={S.input}
                      placeholder="Cth: Rp 4.500.000 - Rp 6.000.000 / bln"
                      value={newJob.salary}
                      onChange={e => setNewJob({ ...newJob, salary: e.target.value })}
                    />
                  </div>
                  <div>
                    <label style={S.label}>Tipe Kerja</label>
                    <select
                      style={S.input}
                      value={newJob.type}
                      onChange={e => setNewJob({ ...newJob, type: e.target.value })}
                    >
                      <option value="Full-time Remote">Full-time Remote</option>
                      <option value="Part-time Remote">Part-time Remote</option>
                      <option value="Freelance Project">Freelance Project</option>
                      <option value="Contract Remote">Contract Remote</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={S.label}>Lokasi</label>
                  <input
                    style={S.input}
                    placeholder="Cth: WFH / Remote Indonesia"
                    value={newJob.location}
                    onChange={e => setNewJob({ ...newJob, location: e.target.value })}
                  />
                </div>

                <div>
                  <label style={S.label}>Link Pendaftaran (URL / WhatsApp)</label>
                  <input
                    style={{ ...S.input, color: '#1D64EC', fontWeight: 600 }}
                    placeholder="Cth: https://wa.me/628123456789 atau https://example.com/apply"
                    value={newJob.applyUrl}
                    onChange={e => setNewJob({ ...newJob, applyUrl: e.target.value })}
                  />
                </div>

                <div>
                  <label style={S.label}>Tags (Pisahkan dengan koma)</label>
                  <input
                    style={S.input}
                    placeholder="Cth: Canva, Design, Photoshop, Remote"
                    value={newJob.tags}
                    onChange={e => setNewJob({ ...newJob, tags: e.target.value })}
                  />
                </div>

                <div>
                  <label style={S.label}>Deskripsi Singkat</label>
                  <textarea
                    style={S.textarea}
                    rows={3}
                    placeholder="Tuliskan gambaran pekerjaan singkat, kriteria, dan benefit..."
                    value={newJob.description}
                    onChange={e => setNewJob({ ...newJob, description: e.target.value })}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 10 }}>
                  <button style={S.btnOutline} onClick={() => setIsAddModalOpen(false)}>
                    Batal
                  </button>
                  <button style={S.btnPrimary} disabled={isSaving} onClick={createJob}>
                    {isSaving ? 'Menyimpan...' : 'Simpan Lowongan'}
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
              <h2 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 6px', letterSpacing: '-0.02em' }}>
                {editingProduct ? 'Edit Data Produk' : 'Tambah Produk Baru (Lynk.id)'}
              </h2>
              <p style={{ fontSize: 12.5, color: '#64748B', margin: '0 0 20px' }}>
                Produk ini akan direkomendasikan pada hasil asesmen sesuai kategori dan target persona.
              </p>

              {/* REAL-TIME PREVIEW CARD */}
              <div style={{ background: '#F8FAFC', border: '1.5px dashed #CBD5E1', borderRadius: 16, padding: 14, marginBottom: 16, display: 'flex', gap: 14, alignItems: 'center' }}>
                <div style={{ width: 64, height: 64, borderRadius: 12, overflow: 'hidden', background: 'white', border: '1px solid #E2E8F0', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {productForm.imageUrl ? (
                    <img src={productForm.imageUrl} alt="Cover Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <span style={{ fontSize: 24 }}>📘</span>
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', gap: 6, marginBottom: 4 }}>
                    <span style={S.pill('#EFF6FF', '#1D64EC', '#BFDBFE')}>{productForm.category}</span>
                    {productForm.badge && <span style={S.pill('#FEF3C7', '#D97706', '#FDE68A')}>{productForm.badge}</span>}
                  </div>
                  <div style={{ fontSize: 13.5, fontWeight: 800, color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {productForm.title || 'Judul Produk Anda'}
                  </div>
                  <div style={{ fontSize: 11.5, color: '#1D64EC', fontWeight: 600, marginTop: 2, wordBreak: 'break-all' }}>
                    {productForm.url || 'https://lynk.id/username/produk'}
                  </div>
                </div>
              </div>

              {/* SMART PASTE OPTION */}
              <div style={{ marginBottom: 16 }}>
                <button
                  type="button"
                  onClick={() => setShowSmartPaste(!showSmartPaste)}
                  style={{ background: showSmartPaste ? '#EFF6FF' : '#F8FAFC', color: '#1D64EC', border: '1px solid #BFDBFE', padding: '6px 14px', borderRadius: 9999, fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6 }}
                >
                  <span>✨</span> {showSmartPaste ? 'Sembunyikan Smart Paste' : 'Alternatif Cepat: Smart Paste dari Lynk.id'}
                </button>

                {showSmartPaste && (
                  <div style={{ marginTop: 10, background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 14, padding: 12 }}>
                    <label style={{ ...S.label, color: '#166534', marginBottom: 4 }}>
                      Tempel Teks dari Halaman Produk Lynk.id (Ctrl+A lalu Ctrl+C di Lynk.id):
                    </label>
                    <textarea
                      style={{ ...S.textarea, border: '1.5px solid #86EFAC', fontSize: 11.5 }}
                      rows={3}
                      placeholder="Tempel apa saja dari halaman Lynk.id (misal: judul, harga Rp 49.000, link cover CDN, dll)..."
                      value={smartPasteText}
                      onChange={e => handleSmartPaste(e.target.value)}
                    />
                    <span style={{ fontSize: 11, color: '#15803D', marginTop: 4, display: 'block' }}>
                      ✓ Sistem otomatis mengekstrak Judul, Harga, URL Gambar CDN, dan Link ke form di bawah!
                    </span>
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {/* Lynk URL */}
                <div>
                  <label style={S.label}>URL Produk Lynk.id *</label>
                  <input
                    style={{ ...S.input, color: '#1D64EC', fontWeight: 600 }}
                    placeholder="https://lynk.id/adithdigital/180ypg6147e2"
                    value={productForm.url}
                    onChange={e => setProductForm({ ...productForm, url: e.target.value })}
                  />
                  <span style={{ fontSize: 11, color: '#64748B', marginTop: 3, display: 'block' }}>
                    *Link halaman produk di Lynk.id yang akan dibuka oleh calon pembeli.
                  </span>
                </div>

                {/* Image Cover URL (CDN) */}
                <div>
                  <label style={S.label}>URL Cover Gambar (CDN Lynk.id)</label>
                  <input
                    style={S.input}
                    placeholder="https://cdn.lynkid.my.id/products/..."
                    value={productForm.imageUrl}
                    onChange={e => setProductForm({ ...productForm, imageUrl: e.target.value })}
                  />
                  <span style={{ fontSize: 11, color: '#94A3B8', marginTop: 3, display: 'block' }}>
                    *Gambar langsung dari CDN Lynk.id, tidak perlu upload ulang ke server.
                  </span>
                </div>

                {/* Judul Produk */}
                <div>
                  <label style={S.label}>Judul Produk *</label>
                  <input
                    style={S.input}
                    placeholder="Cth: Template Administrasi Siap Pakai"
                    value={productForm.title}
                    onChange={e => setProductForm({ ...productForm, title: e.target.value })}
                  />
                </div>

                {/* Kategori & Badge */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={S.label}>Kategori Produk *</label>
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
                    <label style={S.label}>Badge Label</label>
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
                        <option value={productForm.badge}>{productForm.badge} (Tersimpan)</option>
                      )}
                    </select>
                  </div>
                </div>

                {/* Target Persona */}
                <div>
                  <label style={S.label}>Target Side Job / Persona</label>
                  <p style={{ fontSize: 11, color: '#64748B', marginTop: -2, marginBottom: 6 }}>Pilih profil yang cocok agar produk ini hanya muncul untuk user dengan hasil tes yang relevan.</p>
                  <select
                    style={S.input}
                    value={productForm.sideJob}
                    onChange={e => setProductForm({ ...productForm, sideJob: e.target.value })}
                  >
                    <option value="Umum / Semua Profil">🌐 Umum / Semua Profil (tampil untuk semua)</option>
                    <optgroup label="── Side Job Spesifik ──">
                      {Object.values(SIDE_JOBS_DB).map(job => (
                        <option key={job.id} value={job.name}>{job.icon} {job.name}</option>
                      ))}
                    </optgroup>
                  </select>
                </div>

                {/* Deskripsi */}
                <div>
                  <label style={S.label}>Deskripsi Singkat (Opsional - Diisi Manual jika Perlu)</label>
                  <textarea
                    style={S.textarea}
                    rows={3}
                    placeholder="Boleh dikosongkan atau tulis ringkasan manfaat produk..."
                    value={productForm.desc}
                    onChange={e => setProductForm({ ...productForm, desc: e.target.value })}
                  />
                </div>

                {/* Publish Toggle */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0' }}>
                  <input
                    type="checkbox"
                    id="isPublishedCheck"
                    checked={productForm.isPublished}
                    onChange={e => setProductForm({ ...productForm, isPublished: e.target.checked })}
                    style={{ width: 18, height: 18, cursor: 'pointer' }}
                  />
                  <label htmlFor="isPublishedCheck" style={{ fontSize: 13, fontWeight: 600, color: '#0F172A', cursor: 'pointer' }}>
                    Publikasikan ke Hasil Rekomendasi Pengguna
                  </label>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 10 }}>
                  <button style={S.btnOutline} onClick={() => setIsProductModalOpen(false)}>
                    Batal
                  </button>
                  <button style={S.btnPrimary} disabled={isSaving} onClick={saveProduct}>
                    {isSaving ? 'Menyimpan...' : (editingProduct ? 'Perbarui Produk' : 'Simpan ke Database')}
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
              <h2 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 4px', letterSpacing: '-0.02em' }}>Detail Lead</h2>
              <p style={{ fontSize: 12.5, color: '#64748B', margin: '0 0 20px' }}>Informasi profil dan hasil asesmen</p>

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
                  <div style={{ fontSize: 12, fontWeight: 800, color: '#92400E', marginBottom: 8 }}>⚠️ Catatan Gap Kesiapan:</div>
                  <ul style={{ margin: 0, paddingLeft: 18 }}>
                    {selectedLead.gaps.map((g, i) => (
                      <li key={i} style={{ fontSize: 12.5, color: '#78350F', marginBottom: 4, lineHeight: 1.4 }}>{g}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Skills */}
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 11.5, fontWeight: 700, color: '#64748B', marginBottom: 8 }}>Skill Terpilih:</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {selectedLead.skills?.map((s, i) => (
                    <span key={i} style={S.pill('#F1F5F9', '#334155')}>{s}</span>
                  )) || <span style={{ color: '#94A3B8', fontSize: 12 }}>-</span>}
                </div>
              </div>

              {/* Tools */}
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 11.5, fontWeight: 700, color: '#64748B', marginBottom: 8 }}>Tools Terpilih:</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {selectedLead.tools?.map((t, i) => (
                    <span key={i} style={S.pill('#EFF6FF', '#1D64EC', '#BFDBFE')}>{t}</span>
                  )) || <span style={{ color: '#94A3B8', fontSize: 12 }}>-</span>}
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: 10 }}>
                <button style={{ ...S.btnOutline, flex: 1, justifyContent: 'center' }} onClick={() => setSelectedLead(null)}>Tutup</button>
                <button style={{ ...S.btnRed }} onClick={() => deleteLead(selectedLead.id)}>🗑️ Hapus Lead</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
