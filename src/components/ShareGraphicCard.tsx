'use client';

import React, { useState } from 'react';
import { Share2, Download, Eye, X, Check, ExternalLink } from 'lucide-react';
import {
  ShareGraphicParams,
  renderStoryGraphicCanvas,
  downloadStoryGraphic,
  getSideJobGraphicUrl,
} from '@/lib/shareGraphic';

interface ShareGraphicCardProps {
  params: ShareGraphicParams;
  onShareWhatsApp: () => void;
}

export function ShareGraphicCard({ params, onShareWhatsApp }: ShareGraphicCardProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const [hasCopiedToast, setHasCopiedToast] = useState(false);

  // Invalidate cached preview when lead/matches change
  React.useEffect(() => {
    setPreviewImageUrl(null);
  }, [params.leadName, params.gender, params.personaName, params.topMatches]);

  // Lazy render the high-res canvas when opening fullscreen or sharing
  const handleOpenFullscreen = async () => {
    setIsFullscreenOpen(true);
    if (!previewImageUrl) {
      try {
        setIsGenerating(true);
        const canvas = await renderStoryGraphicCanvas(params);
        const url = canvas.toDataURL('image/png');
        setPreviewImageUrl(url);
      } catch (err) {
        console.error('Error rendering preview:', err);
      } finally {
        setIsGenerating(false);
      }
    }
  };

  const handleDownload = async () => {
    try {
      setIsGenerating(true);
      await downloadStoryGraphic(params);
      setHasCopiedToast(true);
      setTimeout(() => setHasCopiedToast(false), 3000);
    } catch (err) {
      console.error('Download error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShareStory = async () => {
    try {
      setIsGenerating(true);
      const canvas = await renderStoryGraphicCanvas(params);
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
      if (!blob) throw new Error('No blob generated');

      const cleanName = (params.leadName || 'hasil').replace(/\s+/g, '_');
      const file = new File([blob], `CariSideJob_${cleanName}_Story.png`, { type: 'image/png' });

      // Native mobile Web Share API with file support
      if (typeof navigator !== 'undefined' && navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            title: 'Hasil Tes Potensi Cari Side Job',
            text: `Aku adalah "${params.personaName}"! Side Job paling cocok buatku: ${params.topMatches[0]?.name} (${params.topMatches[0]?.matchPercent}% Cocok). Cek side job kamu di https://carisidejob.id`,
            files: [file],
          });
          return;
        } catch (shareErr: any) {
          if (shareErr?.name === 'AbortError') return;
        }
      }

      // Fallback: download automatically & open Instagram
      await downloadStoryGraphic(params);
      setHasCopiedToast(true);
      setTimeout(() => setHasCopiedToast(false), 4000);
      window.location.href = 'https://www.instagram.com/';
    } catch (err: any) {
      if (err?.name !== 'AbortError') {
        console.error('Story share error:', err);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const m1 = params.topMatches[0] || { id: 'va', name: 'Virtual Assistant', matchPercent: 96 };
  const m2 = params.topMatches[1] || { id: 'videoeditor', name: 'Video Editor', matchPercent: 82 };
  const m3 = params.topMatches[2] || { id: 'copywriter', name: 'Copywriter', matchPercent: 75 };

  return (
    <div className="mt-5 p-[18px] rounded-[22px] bg-white border border-[#EDEFF3] shadow-[0_4px_18px_rgba(10,14,46,0.05)]">
      {/* Header Info */}
      <div className="flex items-center justify-between mb-3.5">
        <div>
          <span className="text-[11.5px] font-bold uppercase tracking-wider text-[#0074FC] bg-[#EFF6FF] px-2.5 py-0.5 rounded-full inline-block">
            Grafis Siap Dibagikan ✨
          </span>
          <h4 className="text-[15px] font-[800] text-[#0A0E2E] mt-1 leading-snug">
            Pamerkan Hasil Tes Kamu
          </h4>
        </div>
        <div className="w-8 h-8 rounded-full bg-[#E1EDFD] text-[#0074FC] flex items-center justify-center flex-shrink-0">
          <Share2 size={16} />
        </div>
      </div>

      {/* ── INTERACTIVE GRAPHIC PREVIEW CARD (Accurate 9:16 Miniature) ── */}
      <div
        onClick={handleOpenFullscreen}
        className="relative w-full aspect-[9/13.5] max-w-[290px] mx-auto rounded-[20px] overflow-hidden border border-[#DCE6F5] shadow-[0_8px_24px_rgba(0,116,252,0.1)] cursor-pointer group transition-all duration-300 hover:shadow-[0_12px_32px_rgba(0,116,252,0.18)] hover:-translate-y-0.5 bg-white select-none flex flex-col justify-between p-4"
      >
        {/* Subtle Ambient Background Light */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 85% 15%, rgba(215, 235, 255, 0.45) 0%, transparent 60%), radial-gradient(circle at 15% 55%, rgba(225, 240, 255, 0.5) 0%, transparent 55%), linear-gradient(180deg, #FFFFFF 0%, #F5F9FF 100%)',
          }}
        />

        {/* Top Mini Brand Logo */}
        <div className="relative z-10 flex items-center justify-between">
          <img src="/logo.webp" alt="Cari Side Job" className="h-[22px] w-auto object-contain" />
          <span className="text-[9.5px] font-bold text-[#0074FC] bg-white/80 px-2 py-0.5 rounded-full border border-blue-100 shadow-2xs">
            Story 9:16
          </span>
        </div>

        {/* Mini Persona Header */}
        <div className="relative z-10 text-center my-1">
          <div className="text-[11px] font-bold text-[#0A0E2E]">
            Hi <span className="text-[#0074FC]">{params.leadName || 'Sobat'}!</span> Kamu Adalah
          </div>
          <div className="text-[14px] font-[900] text-[#0B3580] leading-tight mt-0.5 tracking-tight uppercase line-clamp-1">
            {params.personaName || 'Andalan Semua Orang'}
          </div>
          <div className="text-[8.5px] text-[#64748B] mt-0.5 leading-snug line-clamp-2 px-2">
            {params.personaTagline}
          </div>
        </div>

        {/* Mini Section Headline */}
        <div className="relative z-10 text-center text-[8.5px] font-[900] text-[#0A0E2E] leading-tight uppercase">
          PELUANG <span className="text-[#0074FC]">SIDE JOB</span> &amp; <span className="text-[#0074FC]">KERJA REMOTE</span>
          <div className="text-[8px] font-extrabold text-[#0A0E2E]">YANG COCOK UNTUK KAMU</div>
        </div>

        {/* ── 3 Mini 3D Glass Spheres ── */}
        <div className="relative z-10 flex flex-col gap-1.5 my-1">
          {/* Match 1 */}
          <div className="flex items-center gap-2">
            {/* 3D Sphere 1 */}
            <div className="w-[54px] h-[54px] rounded-full relative flex-shrink-0 flex items-center justify-center p-1 shadow-sm overflow-hidden border border-white/90"
              style={{
                background: 'radial-gradient(circle at 30% 30%, #FFFFFF 0%, #EDF5FF 45%, #D4E7FE 90%, #BED8FC 100%)',
                boxShadow: '0 4px 10px rgba(10, 30, 80, 0.12)',
              }}
            >
              <img
                src={getSideJobGraphicUrl(m1.id || m1.name, params.gender)}
                alt={m1.name}
                className="w-full h-full object-contain pointer-events-none drop-shadow-xs"
              />
              {/* Glass sheen highlight */}
              <div className="absolute top-0.5 left-1 w-6 h-3 rounded-full bg-white/70 -rotate-45 pointer-events-none blur-[0.5px]" />
            </div>
            {/* Text 1 */}
            <div className="min-w-0">
              <div className="text-[10px] font-[900] text-[#0074FC] uppercase leading-tight line-clamp-2">
                {m1.name}
              </div>
              <div className="text-[8.5px] font-bold text-[#0074FC]">
                ({m1.matchPercent}% Cocok)
              </div>
            </div>
          </div>

          {/* Match 2 (Zig-zag right) */}
          <div className="flex items-center justify-end gap-2">
            {/* Text 2 */}
            <div className="min-w-0 text-right">
              <div className="text-[9.5px] font-[900] text-[#0074FC] uppercase leading-tight line-clamp-2">
                {m2.name}
              </div>
              <div className="text-[8px] font-bold text-[#0074FC]">
                ({m2.matchPercent}% Cocok)
              </div>
            </div>
            {/* 3D Sphere 2 */}
            <div className="w-[48px] h-[48px] rounded-full relative flex-shrink-0 flex items-center justify-center p-1 shadow-sm overflow-hidden border border-white/90"
              style={{
                background: 'radial-gradient(circle at 30% 30%, #FFFFFF 0%, #EDF5FF 45%, #D4E7FE 90%, #BED8FC 100%)',
                boxShadow: '0 4px 10px rgba(10, 30, 80, 0.12)',
              }}
            >
              <img
                src={getSideJobGraphicUrl(m2.id || m2.name, params.gender)}
                alt={m2.name}
                className="w-full h-full object-contain pointer-events-none drop-shadow-xs"
              />
              <div className="absolute top-0.5 left-1 w-5 h-2.5 rounded-full bg-white/70 -rotate-45 pointer-events-none blur-[0.5px]" />
            </div>
          </div>

          {/* Match 3 (Zig-zag left) */}
          <div className="flex items-center gap-2">
            {/* 3D Sphere 3 */}
            <div className="w-[42px] h-[42px] rounded-full relative flex-shrink-0 flex items-center justify-center p-0.5 shadow-sm overflow-hidden border border-white/90"
              style={{
                background: 'radial-gradient(circle at 30% 30%, #FFFFFF 0%, #EDF5FF 45%, #D4E7FE 90%, #BED8FC 100%)',
                boxShadow: '0 4px 10px rgba(10, 30, 80, 0.12)',
              }}
            >
              <img
                src={getSideJobGraphicUrl(m3.id || m3.name, params.gender)}
                alt={m3.name}
                className="w-full h-full object-contain pointer-events-none drop-shadow-xs"
              />
              <div className="absolute top-0.5 left-0.5 w-4 h-2 rounded-full bg-white/70 -rotate-45 pointer-events-none blur-[0.5px]" />
            </div>
            {/* Text 3 */}
            <div className="min-w-0">
              <div className="text-[9px] font-[900] text-[#0074FC] uppercase leading-tight line-clamp-1">
                {m3.name}
              </div>
              <div className="text-[7.5px] font-bold text-[#0074FC]">
                ({m3.matchPercent}% Cocok)
              </div>
            </div>
          </div>
        </div>

        {/* Mini Footer */}
        <div className="relative z-10 text-center pt-1 border-t border-slate-100/70">
          <div className="text-[7.5px] font-bold text-[#0A0E2E]">
            Cari Side Job Yang Cocok Buat Kamu di
          </div>
          <div className="text-[8.5px] font-[900] text-[#0A0E2E]">
            carisidejob.id
          </div>
        </div>

        {/* Hover / Tap Overlay hint */}
        <div className="absolute inset-0 bg-[#0A0E2E]/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center text-white z-20">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mb-1">
            <Eye size={20} />
          </div>
          <span className="text-[12px] font-bold">Ketuk untuk Memperbesar</span>
        </div>
      </div>

      {/* ── ACTION BUTTONS ── */}
      <div className="grid grid-cols-2 gap-2.5 mt-4">
        {/* Button 1: Share ke Story (IG) */}
        <button
          type="button"
          disabled={isGenerating}
          onClick={handleShareStory}
          className="flex items-center justify-center gap-2 h-[48px] px-3.5 rounded-[14px] bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045] hover:opacity-95 text-white font-bold text-[13px] shadow-[0_4px_14px_rgba(253,29,29,0.25)] active:scale-[0.98] transition-all duration-150 disabled:opacity-60"
        >
          <svg className="w-4 h-4 fill-none stroke-current flex-shrink-0 text-white" viewBox="0 0 24 24" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
          <span className="whitespace-nowrap">
            {isGenerating ? 'Menyiapkan...' : 'Share ke Story'}
          </span>
        </button>

        {/* Button 2: Share ke WA */}
        <button
          type="button"
          onClick={onShareWhatsApp}
          className="flex items-center justify-center gap-2 h-[48px] px-3.5 rounded-[14px] bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-[13px] shadow-[0_4px_14px_rgba(37,211,102,0.25)] active:scale-[0.98] transition-all duration-150"
        >
          <svg className="w-4 h-4 fill-current flex-shrink-0" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.301-.15-1.776-.877-2.05-0.976-.275-.099-.474-.15-.674.15-.2.299-.775.976-.95 1.174-.175.2-.35.224-.651.075s-1.272-.469-2.424-1.496c-.896-.799-1.501-1.785-1.677-2.086-.175-.3-.019-.462.132-.611.135-.134.3-.35.45-.525.15-.175.2-.299.3-.499.1-.2.05-.374-.025-.524-.075-.15-.674-1.625-.925-2.224-.243-.585-.49-.506-.674-.515-.174-.009-.374-.01-.574-.01-.2 0-.524.075-.798.374-.275.299-1.05 1.026-1.05 2.502 0 1.475 1.074 2.899 1.224 3.1 0.15.2 2.115 3.23 5.124 4.529.715.309 1.274.494 1.709.633.719.228 1.374.196 1.892.118.577-.087 1.775-.726 2.025-1.426.25-.699.25-1.299.175-1.425-.075-.125-.275-.2-.575-.35zM12.04 2C6.52 2 2.04 6.48 2.04 12c0 1.98.58 3.82 1.58 5.37L2 22l4.8-1.54C8.28 21.36 10.1 22 12.04 22c5.52 0 10-4.48 10-10S17.56 2 12.04 2z"/>
          </svg>
          <span className="whitespace-nowrap">Share ke WA</span>
        </button>
      </div>

      {/* Button 3: Download Gambar HD */}
      <button
        type="button"
        disabled={isGenerating}
        onClick={handleDownload}
        className="w-full mt-2.5 h-[44px] rounded-[14px] bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#0074FC] font-bold text-[13px] flex items-center justify-center gap-2 border border-[#BFDBFE] transition-colors duration-150"
      >
        <Download size={15} />
        <span>{isGenerating ? 'Memproses Gambar...' : 'Download Gambar HD (1080x1920)'}</span>
      </button>

      {/* Notification Toast */}
      {hasCopiedToast && (
        <div className="mt-2 text-center text-[12px] font-semibold text-[#10B981] bg-[#ECFDF5] py-1.5 px-3 rounded-lg flex items-center justify-center gap-1.5 animate-fadeIn">
          <Check size={14} />
          <span>Gambar berhasil diunduh ke galeri kamu! Siap di-upload ke Story.</span>
        </div>
      )}

      {/* ── FULLSCREEN MODAL PREVIEW ── */}
      {isFullscreenOpen && (
        <div className="fixed inset-0 z-50 bg-[#0A0E2E]/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="relative w-full max-w-[380px] bg-white rounded-[26px] overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
            {/* Modal Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-[15px] font-extrabold text-[#0A0E2E]">
                  Pratinjau Grafis Story
                </h3>
                <p className="text-[12px] text-[#64748B]">Format Story Instagram (1080 × 1920)</p>
              </div>
              <button
                type="button"
                onClick={() => setIsFullscreenOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body: Image view */}
            <div className="p-4 overflow-y-auto flex items-center justify-center bg-slate-50">
              {previewImageUrl ? (
                <img
                  src={previewImageUrl}
                  alt="Grafis Story Cari Side Job"
                  className="w-full h-auto rounded-[16px] shadow-md border border-slate-200"
                />
              ) : (
                <div className="py-20 text-center">
                  <div className="w-8 h-8 border-3 border-[#0074FC] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                  <span className="text-[13px] font-semibold text-slate-500">Membuat Grafis Kualitas HD...</span>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="p-4 border-t border-slate-100 flex flex-col gap-2">
              <button
                type="button"
                onClick={handleDownload}
                className="w-full h-[48px] rounded-[14px] bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-bold text-[14px] flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(0,116,252,0.25)] transition-all"
              >
                <Download size={16} />
                <span>Simpan Gambar ke Galeri</span>
              </button>
              <button
                type="button"
                onClick={handleShareStory}
                className="w-full h-[44px] rounded-[14px] bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045] text-white font-bold text-[13px] flex items-center justify-center gap-2 shadow-sm"
              >
                <ExternalLink size={15} />
                <span>Buka Instagram Story</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
