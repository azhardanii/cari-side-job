'use client';

import React from 'react';

/**
 * High-fidelity vector illustrations crafted to match the approved Cari Side Job mockups:
 * 1. BrandLogo: Wordmark Cari / Side Job + spark glyph + tagline
 * 2. HeroCharacterVisual: Semi-3D male character at laptop with floating badges (Skill, Peluang, Penghasilan)
 * 3. EnvelopeChecklistVisual: Blue envelope with checkmark badge & radiating spark rays
 * 4. ThumbsUpCharacterVisual: Friendly character giving thumbs up with trait badge
 * 5. ProductCover3D: 3D book & kit mockups for Ebook, Template, and Course
 */

// Brand Logo Wordmark
export function BrandLogo({ onClick }: { onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      className="flex flex-col select-none cursor-pointer group items-start justify-center"
    >
      <img
        src="/logo.webp"
        alt="Cari Side Job"
        className="h-[46px] w-auto object-contain"
      />
    </div>
  );
}

// Screen 1: Hero Character with Laptop & Floating Badges
export function HeroCharacterVisual() {
  return (
    <div className="relative w-full max-w-[340px] mx-auto my-3 flex flex-col items-center justify-center">
      {/* Soft circular background glow */}
      <div
        className="absolute w-[260px] h-[260px] rounded-full -z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(225, 237, 253, 0.9) 0%, rgba(240, 246, 254, 0.4) 65%, rgba(255,255,255,0) 100%)',
          top: '45%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Floating Badge 1: 💡 Skill (Amber) */}
      <div
        className="absolute z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-sm select-none animate-float-slow"
        style={{
          top: '32px',
          right: '54px',
          backgroundColor: 'var(--amber-bg, #FDF3E5)',
          border: '1px solid rgba(251, 159, 5, 0.18)',
        }}
      >
        <span className="text-[13px]">💡</span>
        <span
          style={{
            fontSize: '11.5px',
            fontWeight: 700,
            color: '#A15C00',
          }}
        >
          Skill
        </span>
      </div>

      {/* Floating Badge 2: 💼 Peluang (Mint) */}
      <div
        className="absolute z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-sm select-none animate-float-delayed"
        style={{
          top: '78px',
          right: '2px',
          backgroundColor: 'var(--mint-bg, #DDF8EF)',
          border: '1px solid rgba(0, 174, 102, 0.18)',
        }}
      >
        <span className="text-[13px]">💼</span>
        <span
          style={{
            fontSize: '11.5px',
            fontWeight: 700,
            color: 'var(--mint-icon, #00AE66)',
          }}
        >
          Peluang
        </span>
      </div>

      {/* Floating Badge 3: 📊 Penghasilan (Lavender) */}
      <div
        className="absolute z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-sm select-none animate-float-reverse"
        style={{
          top: '124px',
          right: '20px',
          backgroundColor: 'var(--lav-bg, #EDEDFD)',
          border: '1px solid rgba(62, 55, 249, 0.18)',
        }}
      >
        <span className="text-[13px]">📊</span>
        <span
          style={{
            fontSize: '11.5px',
            fontWeight: 700,
            color: 'var(--lav-icon, #3E37F9)',
          }}
        >
          Penghasilan
        </span>
      </div>

      {/* Main Character Vector Graphic */}
      <div className="w-[280px] h-[240px] relative">
        <svg
          viewBox="0 0 320 280"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
        >
          <defs>
            <linearGradient id="bodyBlue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#256DF6" />
              <stop offset="100%" stopColor="#0B4EC8" />
            </linearGradient>
            <linearGradient id="sleeveBlue" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#357DFF" />
              <stop offset="100%" stopColor="#1353CE" />
            </linearGradient>
            <linearGradient id="skin" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FED8BA" />
              <stop offset="100%" stopColor="#F9C39B" />
            </linearGradient>
            <linearGradient id="hairGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#302018" />
              <stop offset="100%" stopColor="#1B120C" />
            </linearGradient>
            <linearGradient id="laptopLid" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#CBD5E1" />
              <stop offset="100%" stopColor="#94A3B8" />
            </linearGradient>
            <filter id="softShadow" x="-10%" y="-10%" width="130%" height="130%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.1" />
            </filter>
          </defs>

          {/* Torso / Blue Sweatshirt */}
          <path
            d="M60 280 C60 220 85 185 125 180 L160 180 C200 185 225 220 225 280 Z"
            fill="url(#bodyBlue)"
          />
          {/* Collar */}
          <path
            d="M125 180 C135 192 150 192 160 180"
            stroke="#1D56BF"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Left Arm / Shoulder */}
          <path
            d="M70 240 C65 210 85 190 110 185 L95 245 Z"
            fill="url(#sleeveBlue)"
          />

          {/* Right Arm forward towards laptop */}
          <path
            d="M215 240 C220 210 200 190 175 185 L190 245 Z"
            fill="url(#sleeveBlue)"
          />

          {/* Neck */}
          <rect x="131" y="152" width="23" height="32" rx="6" fill="url(#skin)" />
          {/* Neck shadow under chin */}
          <path d="M131 155 Q142 165 154 155 Z" fill="#E8A97C" opacity="0.6" />

          {/* Ears */}
          <circle cx="111" cy="132" r="9" fill="#F8BFA0" />
          <circle cx="174" cy="132" r="9" fill="#F8BFA0" />

          {/* Head */}
          <rect x="114" y="92" width="57" height="66" rx="26" fill="url(#skin)" />

          {/* Eyes */}
          <ellipse cx="131" cy="130" rx="3.5" ry="4" fill="#1E293B" />
          <circle cx="132.5" cy="128.5" r="1.2" fill="#FFFFFF" />
          <ellipse cx="154" cy="130" rx="3.5" ry="4" fill="#1E293B" />
          <circle cx="155.5" cy="128.5" r="1.2" fill="#FFFFFF" />

          {/* Eyebrows */}
          <path d="M125 122 Q131 119 137 122" stroke="#2D1A10" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M148 122 Q154 119 160 122" stroke="#2D1A10" strokeWidth="2.5" strokeLinecap="round" />

          {/* Cute Smile */}
          <path d="M136 142 Q142.5 148 149 142" stroke="#C26A4D" strokeWidth="2.5" strokeLinecap="round" />

          {/* Soft Blush */}
          <circle cx="123" cy="138" r="5" fill="#F472B6" opacity="0.35" />
          <circle cx="162" cy="138" r="5" fill="#F472B6" opacity="0.35" />

          {/* Stylized Modern Hair */}
          <path
            d="M110 115 C108 90 125 72 142 72 C162 72 178 88 176 115 C176 115 170 100 156 98 C142 96 136 102 126 98 C118 95 110 115 110 115 Z"
            fill="url(#hairGrad)"
          />
          {/* Hair volume top */}
          <path
            d="M120 80 Q142 66 165 78 Q174 88 174 100 Q162 82 140 82 Q125 82 120 80 Z"
            fill="#422C20"
          />

          {/* Laptop Behind Bottom Desk */}
          <g filter="url(#softShadow)">
            {/* Open Laptop Screen */}
            <path
              d="M102 215 L198 215 L204 278 L96 278 Z"
              fill="url(#laptopLid)"
              rx="6"
            />
            {/* Laptop Inner Bezel */}
            <rect x="105" y="222" width="90" height="52" rx="4" fill="#0F172A" opacity="0.08" />
            {/* Laptop Back Logo Circle */}
            <circle cx="150" cy="245" r="7" fill="#FFFFFF" opacity="0.8" />
          </g>
        </svg>
      </div>

      {/* Decorative arrow & note: "+ Kerja fleksibel, hidup lebih bebas" */}
      <div className="w-full flex items-center justify-end px-3 -mt-3 select-none">
        <div className="flex items-center gap-1.5 text-right">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#0074FC]">
            <path
              d="M3 7 C12 6, 17 12, 18 19 M14 17 L18 19 L19 14"
              stroke="#0074FC"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 600,
              color: 'var(--color-ink-soft, #3A4160)',
              lineHeight: 1.25,
            }}
          >
            Kerja fleksibel,<br />hidup lebih bebas
          </span>
        </div>
      </div>
    </div>
  );
}

// Screen 3: Lead Capture Form Graphic (Blue Open Envelope + Checklist Badge + Rays)
export function EnvelopeChecklistVisual() {
  return (
    <div className="relative w-[180px] h-[160px] mx-auto my-3 flex items-center justify-center select-none">
      {/* Background Soft Glow */}
      <div
        className="absolute w-[160px] h-[160px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0, 116, 252, 0.18) 0%, rgba(225, 237, 253, 0.3) 60%, rgba(255,255,255,0) 100%)',
        }}
      />

      {/* Radiating Spark Rays */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 200 180"
        fill="none"
      >
        {/* Ray 1: Top Left */}
        <line x1="42" y1="44" x2="24" y2="28" stroke="#0074FC" strokeWidth="3" strokeLinecap="round" />
        {/* Ray 2: Top Right */}
        <line x1="158" y1="44" x2="176" y2="28" stroke="#0074FC" strokeWidth="3" strokeLinecap="round" />
        {/* Ray 3: Left */}
        <line x1="32" y1="78" x2="15" y2="78" stroke="#0074FC" strokeWidth="3" strokeLinecap="round" />
        {/* Ray 4: Right */}
        <line x1="168" y1="78" x2="185" y2="78" stroke="#0074FC" strokeWidth="3" strokeLinecap="round" />
      </svg>

      {/* Main 3D Styled Open Envelope */}
      <div className="relative w-[130px] h-[110px] mt-4 flex items-center justify-center">
        <svg viewBox="0 0 140 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
          <defs>
            <linearGradient id="envFlap" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4CA5FD" />
              <stop offset="100%" stopColor="#0074FC" />
            </linearGradient>
            <linearGradient id="envBody" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0074FC" />
              <stop offset="100%" stopColor="#0058C7" />
            </linearGradient>
            <linearGradient id="envInner" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0047A3" />
              <stop offset="100%" stopColor="#00357A" />
            </linearGradient>
          </defs>

          {/* Open Back Flap Triangle */}
          <path d="M15 50 L70 12 L125 50 Z" fill="url(#envInner)" />

          {/* Envelope Body (pocket) */}
          <rect x="15" y="48" width="110" height="66" rx="14" fill="url(#envBody)" />

          {/* Front Fold Lines */}
          <path d="M15 48 L70 85 L125 48" stroke="#3A95FD" strokeWidth="2.5" opacity="0.6" />
          <path d="M15 110 L54 75" stroke="#004FB8" strokeWidth="2" opacity="0.4" />
          <path d="M125 110 L86 75" stroke="#004FB8" strokeWidth="2" opacity="0.4" />
        </svg>

        {/* Popping Checkmark Badge */}
        <div
          className="absolute -top-3 w-[52px] h-[52px] rounded-full flex items-center justify-center shadow-lg border-2 border-white animate-bounce-subtle"
          style={{
            background: 'linear-gradient(135deg, #2A8DFF 0%, #0074FC 100%)',
            boxShadow: '0 8px 18px rgba(0, 116, 252, 0.4)',
          }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 13L9.5 17.5L19 7"
              stroke="#FFFFFF"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

// Screen 4: Thumbs Up Character with Trait Card
export function ThumbsUpCharacterVisual({ traits = ['Teliti', 'Terorganisir', 'Analitis'] }: { traits?: string[] }) {
  return (
    <div className="relative w-full max-w-[340px] mx-auto my-3 flex items-center justify-center">
      {/* Background Soft Glow */}
      <div
        className="absolute w-[240px] h-[240px] rounded-full -z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(225, 237, 253, 0.85) 0%, rgba(240, 246, 254, 0.3) 60%, rgba(255,255,255,0) 100%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Floating Trait Card on the Left */}
      <div
        className="absolute left-1 top-8 z-10 p-3 rounded-2xl shadow-sm bg-white/95 backdrop-blur-sm flex flex-col items-start gap-1 select-none"
        style={{
          border: '1px solid #E1EDFD',
          boxShadow: '0 4px 14px rgba(10, 14, 46, 0.06)',
          minWidth: '100px',
        }}
      >
        <div className="w-6 h-6 rounded-lg bg-[#E1EDFD] flex items-center justify-center text-[13px] mb-1">
          📊
        </div>
        {traits.slice(0, 3).map((t, idx) => (
          <span
            key={idx}
            style={{
              fontSize: '11px',
              fontWeight: 600,
              color: 'var(--color-ink, #0A0E2E)',
              lineHeight: 1.25,
            }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* Male Character Giving Thumbs Up */}
      <div className="w-[260px] h-[210px] relative ml-12">
        <svg
          viewBox="0 0 300 250"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
        >
          <defs>
            <linearGradient id="tuBodyBlue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#256DF6" />
              <stop offset="100%" stopColor="#0B4EC8" />
            </linearGradient>
            <linearGradient id="tuSkin" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FED8BA" />
              <stop offset="100%" stopColor="#F9C39B" />
            </linearGradient>
            <linearGradient id="tuHair" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#302018" />
              <stop offset="100%" stopColor="#1B120C" />
            </linearGradient>
          </defs>

          {/* Torso */}
          <path
            d="M50 250 C50 195 75 165 115 160 L150 160 C190 165 215 195 215 250 Z"
            fill="url(#tuBodyBlue)"
          />
          {/* Collar */}
          <path d="M115 160 C125 172 140 172 150 160" stroke="#1D56BF" strokeWidth="4" strokeLinecap="round" />

          {/* Left Arm forward */}
          <path d="M60 215 C60 185 85 168 105 165 L88 230 Z" fill="#357DFF" />

          {/* Right Arm raised for Thumbs Up */}
          <path d="M175 165 C195 168 215 175 228 150 L205 210 Z" fill="#357DFF" />

          {/* Thumbs Up Hand */}
          <g transform="translate(216, 125)">
            {/* Wrist */}
            <rect x="0" y="20" width="16" height="18" rx="5" fill="url(#tuSkin)" />
            {/* Fist */}
            <circle cx="12" cy="18" r="10" fill="url(#tuSkin)" />
            {/* Thumb Up */}
            <path
              d="M12 18 C12 8 18 2 21 4 C24 6 20 16 16 20 Z"
              fill="url(#tuSkin)"
              stroke="#E8A97C"
              strokeWidth="1.5"
            />
          </g>

          {/* Neck */}
          <rect x="121" y="132" width="23" height="32" rx="6" fill="url(#tuSkin)" />
          <path d="M121 135 Q132 145 144 135 Z" fill="#E8A97C" opacity="0.6" />

          {/* Ears */}
          <circle cx="101" cy="112" r="9" fill="#F8BFA0" />
          <circle cx="164" cy="112" r="9" fill="#F8BFA0" />

          {/* Head */}
          <rect x="104" y="72" width="57" height="66" rx="26" fill="url(#tuSkin)" />

          {/* Eyes - Happy curved */}
          <path d="M116 109 Q122 104 128 109" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M140 109 Q146 104 152 109" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" fill="none" />

          {/* Wide Smile */}
          <path d="M124 122 Q134 133 144 122 Z" fill="#E11D48" />
          <path d="M126 122 Q134 126 142 122" fill="#FFFFFF" />

          {/* Blush */}
          <circle cx="113" cy="118" r="5" fill="#F472B6" opacity="0.4" />
          <circle cx="153" cy="118" r="5" fill="#F472B6" opacity="0.4" />

          {/* Hair */}
          <path
            d="M100 95 C98 70 115 52 132 52 C152 52 168 68 166 95 C166 95 160 80 146 78 C132 76 126 82 116 78 C108 75 100 95 100 95 Z"
            fill="url(#tuHair)"
          />

          {/* Laptop on desk in foreground */}
          <path d="M70 205 L160 205 L166 250 L64 250 Z" fill="#CBD5E1" rx="4" />
          <circle cx="115" cy="227" r="5.5" fill="#FFFFFF" opacity="0.8" />
        </svg>
      </div>
    </div>
  );
}

// Screen 5: 3D Product Book Mockup
export function ProductCover3D({ type }: { type: 'dataentry' | 'template' | 'va' | string }) {
  if (type === 'dataentry' || type.includes('data') || type.includes('Data')) {
    // 3D Blue Book: DATA ENTRY UNTUK PEMULA
    return (
      <div className="relative w-[88px] h-[116px] flex-shrink-0 select-none transform transition-transform hover:scale-105">
        <svg viewBox="0 0 100 130" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
          {/* Book Spine 3D */}
          <path d="M10 8 L18 4 L18 124 L10 128 Z" fill="#0058C7" />
          <line x1="14" y1="6" x2="14" y2="126" stroke="#004BB3" strokeWidth="1" />

          {/* Book Front Cover */}
          <rect x="18" y="4" width="76" height="120" rx="4" fill="#0074FC" />
          {/* Subtle sheen highlight */}
          <path d="M18 4 L45 4 L30 124 L18 124 Z" fill="white" opacity="0.08" />

          {/* Top Title: DATA ENTRY */}
          <text x="26" y="24" fill="#FFFFFF" fontSize="9" fontWeight="800" fontFamily="sans-serif" letterSpacing="0.5">
            DATA
          </text>
          <text x="26" y="34" fill="#FFFFFF" fontSize="9" fontWeight="800" fontFamily="sans-serif" letterSpacing="0.5">
            ENTRY
          </text>
          <text x="26" y="43" fill="rgba(255,255,255,0.75)" fontSize="5.5" fontWeight="600" fontFamily="sans-serif">
            UNTUK PEMULA
          </text>

          {/* Laptop Graphic on Cover */}
          <g transform="translate(30, 56)">
            <rect x="0" y="0" width="36" height="24" rx="2" fill="#FFFFFF" opacity="0.9" />
            <rect x="3" y="3" width="30" height="18" rx="1" fill="#0058C7" />
            <rect x="-4" y="24" width="44" height="4" rx="2" fill="#E2E8F0" />
            {/* Screen lines */}
            <line x1="6" y1="7" x2="20" y2="7" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="6" y1="12" x2="26" y2="12" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="6" y1="16" x2="16" y2="16" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round" />
          </g>

          {/* Bottom badge */}
          <rect x="26" y="98" width="40" height="12" rx="6" fill="#0058C7" />
          <text x="31" y="106.5" fill="#FFFFFF" fontSize="5" fontWeight="700" fontFamily="sans-serif">
            FULL EBOOK
          </text>
        </svg>
      </div>
    );
  }

  if (type === 'template' || type.includes('admin') || type.includes('excel')) {
    // 3D Green Book: TEMPLATE ADMINISTRASI
    return (
      <div className="relative w-[88px] h-[116px] flex-shrink-0 select-none transform transition-transform hover:scale-105">
        <svg viewBox="0 0 100 130" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
          {/* Book Spine 3D */}
          <path d="M10 8 L18 4 L18 124 L10 128 Z" fill="#008048" />

          {/* Book Front Cover */}
          <rect x="18" y="4" width="76" height="120" rx="4" fill="#00A55E" />
          <path d="M18 4 L45 4 L30 124 L18 124 Z" fill="white" opacity="0.08" />

          {/* Top Title: TEMPLATE ADMINISTRASI */}
          <text x="24" y="24" fill="#FFFFFF" fontSize="7.5" fontWeight="800" fontFamily="sans-serif">
            TEMPLATE
          </text>
          <text x="24" y="33" fill="#FFFFFF" fontSize="7" fontWeight="800" fontFamily="sans-serif">
            ADMINISTRASI
          </text>

          {/* Excel Spreadsheet Icon Graphic */}
          <g transform="translate(34, 52)">
            {/* Green Excel Folder/Sheet Box */}
            <rect x="0" y="0" width="30" height="34" rx="4" fill="#FFFFFF" />
            <rect x="3" y="3" width="24" height="28" rx="2" fill="#008048" />
            {/* Grid Lines */}
            <line x1="7" y1="12" x2="23" y2="12" stroke="#A7F3D0" strokeWidth="1" />
            <line x1="7" y1="18" x2="23" y2="18" stroke="#A7F3D0" strokeWidth="1" />
            <line x1="7" y1="24" x2="23" y2="24" stroke="#A7F3D0" strokeWidth="1" />
            <line x1="14" y1="7" x2="14" y2="28" stroke="#A7F3D0" strokeWidth="1" />
            {/* Big X for Excel */}
            <text x="11" y="21" fill="#FFFFFF" fontSize="12" fontWeight="900" fontFamily="sans-serif">
              X
            </text>
          </g>

          <rect x="24" y="98" width="46" height="12" rx="6" fill="#008048" />
          <text x="28" y="106.5" fill="#FFFFFF" fontSize="5" fontWeight="700" fontFamily="sans-serif">
            25+ SPREADSHEET
          </text>
        </svg>
      </div>
    );
  }

  // 3D Kit: VIRTUAL ASSISTANT STARTER KIT (Grey/Blue Binder)
  return (
    <div className="relative w-[88px] h-[116px] flex-shrink-0 select-none transform transition-transform hover:scale-105">
      <svg viewBox="0 0 100 130" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
        {/* Book Spine 3D */}
        <path d="M10 8 L18 4 L18 124 L10 128 Z" fill="#475569" />

        {/* Front Cover */}
        <rect x="18" y="4" width="76" height="120" rx="4" fill="#E2E8F0" />
        <rect x="22" y="8" width="68" height="112" rx="3" fill="#F8FAFC" />

        {/* Title */}
        <text x="26" y="24" fill="#0A0E2E" fontSize="7" fontWeight="800" fontFamily="sans-serif">
          VIRTUAL
        </text>
        <text x="26" y="32" fill="#0A0E2E" fontSize="7" fontWeight="800" fontFamily="sans-serif">
          ASSISTANT
        </text>
        <text x="26" y="40" fill="#0074FC" fontSize="6.5" fontWeight="800" fontFamily="sans-serif">
          STARTER KIT
        </text>

        {/* Laptop & Workspace graphic */}
        <g transform="translate(32, 54)">
          <rect x="0" y="0" width="34" height="24" rx="2" fill="#0074FC" />
          <rect x="3" y="3" width="28" height="18" rx="1" fill="#FFFFFF" />
          <circle cx="17" cy="12" r="5" fill="#E1EDFD" />
          <path d="M15 12 L19 12 M17 10 L17 14" stroke="#0074FC" strokeWidth="1.2" />
        </g>

        <rect x="26" y="96" width="46" height="13" rx="6" fill="#0074FC" />
        <text x="30" y="105" fill="#FFFFFF" fontSize="5" fontWeight="700" fontFamily="sans-serif">
          VIDEO & TEMPLATE
        </text>
      </svg>
    </div>
  );
}
