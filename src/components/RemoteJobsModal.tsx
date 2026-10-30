'use client';

import React, { useState, useMemo } from 'react';
import {
  Briefcase,
  Search,
  X,
  ExternalLink,
  MapPin,
  Clock,
  Sparkles,
  Building2,
  DollarSign,
  Tag,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { RemoteJobItem, JOB_CATEGORIES, getCompanyAvatarStyle, getCompanyMonogram } from '@/lib/data';

interface RemoteJobsModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobs: RemoteJobItem[];
}

export function RemoteJobsModal({ isOpen, onClose, jobs }: RemoteJobsModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  // Available unique categories derived from jobs
  const categories = useMemo(() => {
    const set = new Set<string>();
    jobs.forEach((j) => {
      if (j.primarySideJob && j.primarySideJob !== 'Remote Job') set.add(j.primarySideJob);
    });
    return Array.from(set);
  }, [jobs]);

  // Filtered jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        job.title.toLowerCase().includes(q) ||
        job.company.toLowerCase().includes(q) ||
        job.description.toLowerCase().includes(q) ||
        job.location.toLowerCase().includes(q) ||
        (job.tags || []).some((t) => t.toLowerCase().includes(q));

      const matchesCat =
        selectedCategory === 'Semua' ||
        job.primarySideJob === selectedCategory ||
        (job.tags || []).includes(selectedCategory);

      return matchesSearch && matchesCat;
    });
  }, [jobs, searchQuery, selectedCategory]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-[#0A0E2E]/65 backdrop-blur-[6px] flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn"
      style={{ zIndex: 100 }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[480px] bg-white rounded-t-[32px] sm:rounded-[28px] max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border-t sm:border border-[#EDEFF3] animate-slideUp"
      >
        {/* Mobile Pull Indicator */}
        <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mt-2.5 mb-1 sm:hidden flex-shrink-0" />

        {/* ── HEADER ── */}
        <div className="px-5 pt-3 pb-3 border-b border-[#EDEFF3] bg-white sticky top-0 z-20 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center text-[#0074FC] shadow-2xs">
                <Briefcase size={19} />
              </div>
              <div>
                <h3 className="text-[17px] font-[800] text-[#0A0E2E] leading-snug tracking-tight">
                  Lowongan Kerja Remote
                </h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      jobs.length > 0 ? 'bg-[#10B981] animate-pulse' : 'bg-slate-300'
                    }`}
                  />
                  <span className="text-[11.5px] font-semibold text-[#64748B]">
                    {jobs.length > 0 ? `${jobs.length} Lowongan Terverifikasi` : '0 Lowongan Tersedia'}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0] hover:text-[#0A0E2E] flex items-center justify-center transition-colors flex-shrink-0"
              aria-label="Tutup"
            >
              <X size={17} />
            </button>
          </div>

          {/* ── SEARCH INPUT ── */}
          <div className="relative mt-3">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari posisi, skill (e.g. Canva, Excel), atau nama PT..."
              className="w-full h-[42px] pl-10 pr-9 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[14px] text-[13px] font-medium text-[#0A0E2E] placeholder:text-[#94A3B8] outline-none focus:bg-white focus:border-[#0074FC] focus:ring-3 focus:ring-blue-100 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center hover:bg-slate-300"
              >
                <X size={12} />
              </button>
            )}
          </div>

          {/* ── CATEGORY PILLS (Horizontal Scroll) ── */}
          {categories.length > 0 && (
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-2.5 pb-0.5 -mx-1 px-1">
              {['Semua', ...categories].map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-[11.5px] font-bold whitespace-nowrap transition-all duration-150 flex-shrink-0 ${
                      isActive
                        ? 'bg-[#0074FC] text-white shadow-[0_2px_8px_rgba(0,116,252,0.3)]'
                        : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0] hover:text-[#0A0E2E]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* ── JOB CARDS LIST ── */}
        <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3 bg-[#F8FAFC]">
          {jobs.length === 0 ? (
            <div className="py-14 text-center px-4">
              <div className="w-14 h-14 rounded-2xl bg-[#EFF6FF] border border-blue-100 flex items-center justify-center mx-auto mb-3 text-2xl shadow-sm">
                💼
              </div>
              <h4 className="text-[15px] font-bold text-[#0A0E2E]">Belum Ada Lowongan Aktif</h4>
              <p className="text-[12.5px] text-[#64748B] mt-1 max-w-[280px] mx-auto leading-relaxed">
                Lowongan kerja remote sedang diperbarui oleh tim admin. Silakan cek kembali beberapa saat lagi!
              </p>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="py-14 text-center px-4">
              <div className="w-14 h-14 rounded-2xl bg-[#EFF6FF] border border-blue-100 flex items-center justify-center mx-auto mb-3 text-2xl shadow-sm">
                🔍
              </div>
              <h4 className="text-[15px] font-bold text-[#0A0E2E]">Tidak Ada Lowongan Ditemukan</h4>
              <p className="text-[12.5px] text-[#64748B] mt-1 max-w-[280px] mx-auto leading-relaxed">
                Coba gunakan kata kunci pencarian yang berbeda atau reset filter kategori.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('Semua');
                }}
                className="mt-4 px-4 py-2 rounded-full bg-[#0074FC] text-white text-[12px] font-bold shadow-sm hover:bg-blue-600 transition-colors"
              >
                Reset Pencarian
              </button>
            </div>
          ) : (
            filteredJobs.map((job) => {
              const avatarBg = getCompanyAvatarStyle(job.company);
              const monogram = getCompanyMonogram(job.company);

              return (
                <div
                  key={job.id}
                  className="bg-white rounded-[20px] border border-[#EDEFF3] p-[16px] shadow-[0_2px_8px_rgba(10,14,46,0.04)] hover:border-[#93C5FD] hover:shadow-[0_6px_20px_rgba(0,116,252,0.08)] transition-all duration-200 group flex flex-col justify-between"
                >
                  {/* Card Top: Monogram + Title + Company + Location */}
                  <div>
                    <div className="flex items-start gap-3">
                      {/* Monogram Avatar */}
                      <div
                        className="w-[44px] h-[44px] rounded-[14px] flex items-center justify-center text-white font-[900] text-[14px] shadow-sm flex-shrink-0 tracking-wider"
                        style={{ background: avatarBg }}
                      >
                        {monogram}
                      </div>

                      {/* Main Titles */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {job.primarySideJob && job.primarySideJob !== 'Remote Job' && (
                            <span className="text-[10.5px] font-bold text-[#0074FC] bg-[#EFF6FF] px-2 py-0.5 rounded-full inline-block">
                              {job.primarySideJob}
                            </span>
                          )}
                          <span className="text-[10.5px] font-semibold text-[#64748B] bg-slate-100 px-2 py-0.5 rounded-full">
                            {job.type}
                          </span>
                        </div>

                        <h4 className="text-[15.5px] font-[800] text-[#0A0E2E] mt-1 leading-snug group-hover:text-[#0074FC] transition-colors">
                          {job.title}
                        </h4>

                        <div className="flex items-center gap-2 mt-1 flex-wrap text-[12px]">
                          <span className="font-semibold text-[#334155] flex items-center gap-1">
                            <Building2 size={13} className="text-[#94A3B8]" />
                            {job.company}
                          </span>
                          <span className="text-slate-300">•</span>
                          <span className="text-[#64748B] flex items-center gap-0.5">
                            <MapPin size={12} className="text-[#94A3B8]" />
                            {job.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Salary Highlight Badge */}
                    <div className="mt-3 inline-flex items-center gap-1.5 bg-[#ECFDF5] border border-[#A7F3D0] text-[#059669] px-3 py-1.5 rounded-[12px] text-[12px] font-extrabold shadow-2xs">
                      <span>💰</span>
                      <span>{job.salary}</span>
                    </div>

                    {/* Short Description */}
                    {job.description && (
                      <p className="text-[12.5px] text-[#475569] mt-2.5 line-clamp-2 leading-relaxed bg-[#F8FAFC] p-2.5 rounded-[12px] border border-slate-100">
                        {job.description}
                      </p>
                    )}

                    {/* Skill Tags */}
                    {job.tags && job.tags.length > 0 && (
                      <div className="flex items-center gap-1.5 flex-wrap mt-2.5">
                        {job.tags.slice(0, 4).map((t, tIdx) => (
                          <span
                            key={tIdx}
                            className="bg-white border border-[#E2E8F0] text-[#475569] text-[11px] font-medium px-2 py-0.5 rounded-md"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Card Bottom / Footer Actions */}
                  <div className="flex items-center justify-between mt-3.5 pt-3 border-t border-[#F1F5F9]">
                    <div className="flex items-center gap-1 text-[11px] font-medium text-[#94A3B8]">
                      <Clock size={12} />
                      <span>Diposting {job.posted}</span>
                    </div>

                    <a
                      href={job.applyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-[12.5px] font-[800] px-4 py-2 rounded-full shadow-[0_4px_12px_rgba(0,116,252,0.25)] hover:shadow-[0_6px_16px_rgba(0,116,252,0.35)] active:scale-95 transition-all"
                    >
                      <span>Lamar Sekarang</span>
                      <ExternalLink size={13} />
                    </a>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
