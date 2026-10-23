// ============================================================================
// CARI SIDE JOB - HIGH-FIDELITY STORY SHARE GRAPHIC GENERATOR (1080 x 1920)
// Crafted to match the approved executive graphic mockups:
// - Modern high-key aesthetic with subtle ambient lighting
// - Official Brand Logo
// - Personalized greeting: Hi [Name]! Kamu Adalah [PERSONA] + Tagline
// - "PELUANG SIDE JOB & KERJA REMOTE YANG COCOK UNTUK KAMU"
// - 3 Floating 3D Asymmetric Glass Spheres with Job Artworks & Match %
// - Clean verified footer with carisidejob.id watermark
// ============================================================================

export interface ShareGraphicParams {
  leadName: string;
  personaName: string;
  personaTagline: string;
  topMatches: Array<{
    id: string;
    name: string;
    matchPercent: number;
    kategori?: string;
  }>;
}

/**
 * Returns tailored vector SVG artwork for the inside of the 3D glass sphere
 */
export function getJobIllustrationSvg(jobId: string, jobName: string): string {
  const id = (jobId || '').toLowerCase();
  const name = (jobName || '').toLowerCase();

  // 1. Virtual Assistant
  if (id.includes('va') || name.includes('virtual assistant')) {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320" width="320" height="320">
        <defs>
          <linearGradient id="vaDesk" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#E2E8F0"/>
            <stop offset="100%" stop-color="#CBD5E1"/>
          </linearGradient>
          <linearGradient id="vaBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#6366F1"/>
            <stop offset="100%" stop-color="#4F46E5"/>
          </linearGradient>
          <linearGradient id="vaSkin" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#FED7AA"/>
            <stop offset="100%" stop-color="#FDBA74"/>
          </linearGradient>
        </defs>

        <!-- Floating Task Window Panels -->
        <g opacity="0.9">
          <!-- Calendar panel top right -->
          <rect x="200" y="60" width="75" height="55" rx="10" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2"/>
          <rect x="200" y="60" width="75" height="16" rx="10" fill="#0074FC"/>
          <circle cx="215" cy="90" r="4" fill="#3B82F6"/>
          <circle cx="235" cy="90" r="4" fill="#10B981"/>
          <circle cx="255" cy="90" r="4" fill="#F59E0B"/>

          <!-- Checklist card top left -->
          <rect x="50" y="80" width="70" height="50" rx="8" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2"/>
          <rect x="62" y="92" width="46" height="5" rx="2.5" fill="#94A3B8"/>
          <rect x="62" y="103" width="32" height="5" rx="2.5" fill="#38BDF8"/>
          <circle cx="106" cy="115" r="5" fill="#10B981"/>

          <!-- Sticky Note -->
          <rect x="65" y="140" width="38" height="38" rx="6" fill="#FEF08A" transform="rotate(-6 65 140)"/>
          <line x1="72" y1="152" x2="94" y2="152" stroke="#CA8A04" stroke-width="2" stroke-linecap="round"/>
          <line x1="72" y1="162" x2="90" y2="162" stroke="#CA8A04" stroke-width="2" stroke-linecap="round"/>
        </g>

        <!-- Desk Surface -->
        <rect x="35" y="240" width="250" height="14" rx="7" fill="url(#vaDesk)"/>

        <!-- Coffee Mug & Plant -->
        <rect x="55" y="220" width="18" height="20" rx="4" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.5"/>
        <path d="M73 224 C78 224 78 232 73 234" stroke="#CBD5E1" stroke-width="2" fill="none"/>
        <rect x="245" y="215" width="22" height="25" rx="5" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.5"/>
        <circle cx="256" cy="210" r="8" fill="#10B981"/>
        <circle cx="250" cy="205" r="6" fill="#059669"/>
        <circle cx="262" cy="205" r="6" fill="#34D399"/>

        <!-- Person Character -->
        <!-- Hair -->
        <path d="M136 105 C136 90 184 90 184 105 C184 115 136 115 136 105 Z" fill="#1E1B4B"/>
        <circle cx="160" cy="112" r="24" fill="#1E1B4B"/>
        <!-- Face -->
        <circle cx="160" cy="122" r="18" fill="url(#vaSkin)"/>
        <!-- Smile -->
        <path d="M156 128 Q160 133 164 128" stroke="#7C2D12" stroke-width="2" stroke-linecap="round" fill="none"/>
        <!-- Body / Sweater -->
        <path d="M128 240 C128 175 192 175 192 240 Z" fill="url(#vaBody)"/>
        <!-- White collar -->
        <polygon points="152,155 160,168 168,155" fill="#FFFFFF"/>

        <!-- Arm raised / working -->
        <path d="M130 185 Q115 160 125 140" stroke="#4F46E5" stroke-width="12" stroke-linecap="round" fill="none"/>
        <circle cx="125" cy="140" r="8" fill="url(#vaSkin)"/>

        <!-- Laptop in front -->
        <path d="M125 240 L195 240 L190 195 L130 195 Z" fill="#0F172A"/>
        <rect x="134" y="198" width="52" height="34" rx="3" fill="#38BDF8"/>
        <!-- Apple/Screen logo glow -->
        <circle cx="160" cy="215" r="4" fill="#FFFFFF"/>
        <!-- Laptop Base -->
        <rect x="115" y="238" width="90" height="6" rx="3" fill="#94A3B8"/>
      </svg>
    `;
  }

  // 2. Video Editor
  if (id.includes('video') || name.includes('video editor') || name.includes('editing')) {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320" width="320" height="320">
        <defs>
          <linearGradient id="veDesk" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#E2E8F0"/>
            <stop offset="100%" stop-color="#CBD5E1"/>
          </linearGradient>
          <linearGradient id="veSkin" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#FED7AA"/>
            <stop offset="100%" stop-color="#FDBA74"/>
          </linearGradient>
          <linearGradient id="vePlay" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#3B82F6"/>
            <stop offset="100%" stop-color="#1D4ED8"/>
          </linearGradient>
        </defs>

        <!-- Film Reel in Background -->
        <circle cx="225" cy="100" r="45" fill="none" stroke="#CBD5E1" stroke-width="8" stroke-dasharray="14 10"/>
        <circle cx="225" cy="100" r="22" fill="#E2E8F0"/>
        <circle cx="225" cy="100" r="8" fill="#94A3B8"/>

        <!-- Cinema Clapperboard (Top Left) -->
        <g transform="translate(60, 65) rotate(-12)">
          <rect x="0" y="24" width="75" height="52" rx="6" fill="#0F172A"/>
          <!-- Top chevron stripes -->
          <rect x="0" y="0" width="75" height="20" rx="4" fill="#0F172A"/>
          <polygon points="12,0 24,0 16,20 4,20" fill="#FFFFFF"/>
          <polygon points="36,0 48,0 40,20 28,20" fill="#FFFFFF"/>
          <polygon points="60,0 72,0 64,20 52,20" fill="#FFFFFF"/>
          <!-- Play icon in clapperboard -->
          <polygon points="32,40 50,50 32,60" fill="url(#vePlay)"/>
        </g>

        <!-- Desk Surface -->
        <rect x="35" y="245" width="250" height="14" rx="7" fill="url(#veDesk)"/>

        <!-- Video Camera on Mini Tripod (Right) -->
        <rect x="235" y="195" width="36" height="24" rx="5" fill="#0F172A"/>
        <polygon points="271,200 285,193 285,221 271,214" fill="#334155"/>
        <circle cx="247" cy="207" r="7" fill="#38BDF8"/>
        <!-- Tripod Legs -->
        <line x1="243" y1="219" x2="235" y2="245" stroke="#475569" stroke-width="3" stroke-linecap="round"/>
        <line x1="263" y1="219" x2="271" y2="245" stroke="#475569" stroke-width="3" stroke-linecap="round"/>
        <line x1="253" y1="219" x2="253" y2="245" stroke="#475569" stroke-width="3" stroke-linecap="round"/>

        <!-- Person Character (Editor at work) -->
        <circle cx="140" cy="120" r="22" fill="#0F172A"/>
        <circle cx="140" cy="126" r="17" fill="url(#veSkin)"/>
        <!-- Smile -->
        <path d="M136 132 Q140 137 144 132" stroke="#7C2D12" stroke-width="2" stroke-linecap="round" fill="none"/>
        <!-- Headphones -->
        <path d="M120 126 C120 100 160 100 160 126" stroke="#0074FC" stroke-width="5" fill="none"/>
        <rect x="118" y="120" width="8" height="14" rx="4" fill="#0074FC"/>
        <rect x="154" y="120" width="8" height="14" rx="4" fill="#0074FC"/>

        <!-- Body with red/pink hoodie -->
        <path d="M110 245 C110 180 170 180 170 245 Z" fill="#E11D48"/>
        <!-- Arm to laptop -->
        <path d="M155 195 Q175 220 165 240" stroke="#BE123C" stroke-width="10" stroke-linecap="round" fill="none"/>

        <!-- Laptop with Video Timeline Screen -->
        <path d="M125 245 L195 245 L190 200 L130 200 Z" fill="#0F172A"/>
        <rect x="133" y="203" width="54" height="34" rx="3" fill="#1E293B"/>
        <!-- Timeline color tracks -->
        <rect x="136" y="222" width="20" height="4" rx="1.5" fill="#38BDF8"/>
        <rect x="159" y="222" width="24" height="4" rx="1.5" fill="#A855F7"/>
        <rect x="136" y="228" width="47" height="4" rx="1.5" fill="#10B981"/>
        <line x1="152" y1="218" x2="152" y2="234" stroke="#EF4444" stroke-width="2"/>
        <rect x="115" y="243" width="90" height="6" rx="3" fill="#94A3B8"/>
      </svg>
    `;
  }

  // 3. Copywriter / Content Writer
  if (id.includes('copywriter') || id.includes('writer') || name.includes('copywriter') || name.includes('writer')) {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320" width="320" height="320">
        <defs>
          <linearGradient id="cwDesk" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#E2E8F0"/>
            <stop offset="100%" stop-color="#CBD5E1"/>
          </linearGradient>
          <linearGradient id="cwSkin" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#FED7AA"/>
            <stop offset="100%" stop-color="#FDBA74"/>
          </linearGradient>
        </defs>

        <!-- Idea Lightbulb (Top Right) -->
        <g transform="translate(220, 65)">
          <circle cx="20" cy="20" r="16" fill="#FACC15"/>
          <rect x="14" y="34" width="12" height="6" rx="2" fill="#94A3B8"/>
          <!-- Spark Rays -->
          <line x1="20" y1="-2" x2="20" y2="3" stroke="#EAB308" stroke-width="3" stroke-linecap="round"/>
          <line x1="42" y1="20" x2="37" y2="20" stroke="#EAB308" stroke-width="3" stroke-linecap="round"/>
          <line x1="-2" y1="20" x2="3" y2="20" stroke="#EAB308" stroke-width="3" stroke-linecap="round"/>
        </g>

        <!-- Flying Writing Notes (Top Left) -->
        <g opacity="0.9">
          <rect x="65" y="75" width="48" height="60" rx="6" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2" transform="rotate(-10 65 75)"/>
          <line x1="72" y1="90" x2="102" y2="85" stroke="#94A3B8" stroke-width="2.5" stroke-linecap="round"/>
          <line x1="74" y1="102" x2="98" y2="98" stroke="#0074FC" stroke-width="2.5" stroke-linecap="round"/>
          <line x1="76" y1="114" x2="100" y2="110" stroke="#94A3B8" stroke-width="2.5" stroke-linecap="round"/>
        </g>

        <!-- Desk Surface -->
        <rect x="35" y="245" width="250" height="14" rx="7" fill="url(#cwDesk)"/>

        <!-- Desk Potted Plant -->
        <rect x="55" y="222" width="20" height="23" rx="4" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.5"/>
        <path d="M65 220 Q55 200 48 206 Q58 214 65 220 Z" fill="#10B981"/>
        <path d="M65 220 Q75 198 82 205 Q72 214 65 220 Z" fill="#059669"/>

        <!-- Female Writer Character -->
        <circle cx="160" cy="115" r="26" fill="#1E293B"/>
        <!-- Hair strands -->
        <path d="M136 120 C136 170 148 170 148 140" stroke="#1E293B" stroke-width="8" stroke-linecap="round" fill="none"/>
        <path d="M184 120 C184 170 172 170 172 140" stroke="#1E293B" stroke-width="8" stroke-linecap="round" fill="none"/>
        <!-- Face -->
        <circle cx="160" cy="125" r="17" fill="url(#cwSkin)"/>
        <!-- Wink / Smile -->
        <path d="M156 130 Q160 135 164 130" stroke="#7C2D12" stroke-width="2" stroke-linecap="round" fill="none"/>

        <!-- Green Cardigan / Sweater -->
        <path d="M125 245 C125 180 195 180 195 245 Z" fill="#059669"/>
        <!-- White top inside -->
        <polygon points="152,160 160,175 168,160" fill="#FFFFFF"/>

        <!-- Laptop in front -->
        <path d="M130 245 L190 245 L186 205 L134 205 Z" fill="#0F172A"/>
        <rect x="138" y="208" width="44" height="28" rx="3" fill="#F8FAFC"/>
        <!-- Lines of copy on screen -->
        <line x1="143" y1="215" x2="175" y2="215" stroke="#0074FC" stroke-width="2" stroke-linecap="round"/>
        <line x1="143" y1="221" x2="168" y2="221" stroke="#64748B" stroke-width="2" stroke-linecap="round"/>
        <line x1="143" y1="227" x2="172" y2="227" stroke="#64748B" stroke-width="2" stroke-linecap="round"/>
        <rect x="120" y="243" width="80" height="6" rx="3" fill="#94A3B8"/>
      </svg>
    `;
  }

  // 4. Graphic Designer
  if (id.includes('designer') || name.includes('graphic') || name.includes('design')) {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320" width="320" height="320">
        <defs>
          <linearGradient id="gdDesk" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#E2E8F0"/>
            <stop offset="100%" stop-color="#CBD5E1"/>
          </linearGradient>
          <linearGradient id="gdSkin" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#FED7AA"/>
            <stop offset="100%" stop-color="#FDBA74"/>
          </linearGradient>
        </defs>

        <!-- Floating Color Palette Wheel (Top Right) -->
        <g transform="translate(225, 80)">
          <circle cx="20" cy="20" r="24" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2"/>
          <circle cx="12" cy="14" r="5" fill="#EF4444"/>
          <circle cx="26" cy="12" r="5" fill="#F59E0B"/>
          <circle cx="28" cy="26" r="5" fill="#10B981"/>
          <circle cx="14" cy="28" r="5" fill="#3B82F6"/>
        </g>

        <!-- Floating Bezier Pen Shapes (Top Left) -->
        <path d="M60 110 Q90 60 110 95" stroke="#A855F7" stroke-width="3" fill="none" stroke-linecap="round"/>
        <rect x="56" y="106" width="8" height="8" fill="#A855F7"/>
        <rect x="106" y="91" width="8" height="8" fill="#A855F7"/>

        <!-- Desk Surface -->
        <rect x="35" y="245" width="250" height="14" rx="7" fill="url(#gdDesk)"/>

        <!-- Designer Character -->
        <circle cx="160" cy="115" r="24" fill="#0F172A"/>
        <circle cx="160" cy="122" r="18" fill="url(#gdSkin)"/>
        <!-- Glasses -->
        <circle cx="153" cy="122" r="6" stroke="#0074FC" stroke-width="2" fill="none"/>
        <circle cx="167" cy="122" r="6" stroke="#0074FC" stroke-width="2" fill="none"/>
        <line x1="159" y1="122" x2="161" y2="122" stroke="#0074FC" stroke-width="2"/>

        <!-- Body / Shirt -->
        <path d="M125 245 C125 180 195 180 195 245 Z" fill="#8B5CF6"/>

        <!-- Drawing Tablet / Stylus -->
        <rect x="125" y="210" width="70" height="36" rx="5" fill="#1E293B"/>
        <rect x="130" y="214" width="60" height="28" rx="3" fill="#38BDF8"/>
        <!-- Artwork on canvas screen -->
        <circle cx="150" cy="226" r="6" fill="#FACC15"/>
        <polygon points="140,238 165,225 180,238" fill="#EC4899"/>
        <rect x="115" y="243" width="90" height="6" rx="3" fill="#94A3B8"/>
      </svg>
    `;
  }

  // 5. Social Media Management
  if (id.includes('social') || name.includes('social media')) {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320" width="320" height="320">
        <defs>
          <linearGradient id="smDesk" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#E2E8F0"/>
            <stop offset="100%" stop-color="#CBD5E1"/>
          </linearGradient>
          <linearGradient id="smSkin" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#FED7AA"/>
            <stop offset="100%" stop-color="#FDBA74"/>
          </linearGradient>
        </defs>

        <!-- Floating Likes & Hearts -->
        <g transform="translate(225, 75)">
          <rect x="0" y="0" width="45" height="45" rx="14" fill="#EC4899"/>
          <path d="M22 28 L15 21 C12 18 12 13 16 11 C19 10 22 13 22 13 C22 13 25 10 28 11 C32 13 32 18 29 21 Z" fill="#FFFFFF"/>
        </g>
        <!-- Speech Bubble (Top Left) -->
        <g transform="translate(60, 75)">
          <rect x="0" y="0" width="46" height="34" rx="10" fill="#0074FC"/>
          <circle cx="14" cy="17" r="3" fill="#FFFFFF"/>
          <circle cx="23" cy="17" r="3" fill="#FFFFFF"/>
          <circle cx="32" cy="17" r="3" fill="#FFFFFF"/>
        </g>

        <!-- Desk Surface -->
        <rect x="35" y="245" width="250" height="14" rx="7" fill="url(#smDesk)"/>

        <!-- Person Character -->
        <circle cx="160" cy="115" r="24" fill="#3B0764"/>
        <circle cx="160" cy="122" r="18" fill="url(#smSkin)"/>
        <!-- Smile -->
        <path d="M156 128 Q160 133 164 128" stroke="#7C2D12" stroke-width="2" stroke-linecap="round" fill="none"/>

        <!-- Hoodie -->
        <path d="M125 245 C125 180 195 180 195 245 Z" fill="#0284C7"/>

        <!-- Smartphone held up -->
        <rect x="145" y="185" width="30" height="55" rx="6" fill="#0F172A"/>
        <rect x="148" y="190" width="24" height="42" rx="3" fill="#38BDF8"/>
        <!-- Chart on phone -->
        <polyline points="152,222 158,212 164,216 170,202" fill="none" stroke="#FFFFFF" stroke-width="2"/>
        <rect x="120" y="243" width="80" height="6" rx="3" fill="#94A3B8"/>
      </svg>
    `;
  }

  // 6. Universal Creative Remote Pro (Fallback for other jobs)
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320" width="320" height="320">
      <defs>
        <linearGradient id="unDesk" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#E2E8F0"/>
          <stop offset="100%" stop-color="#CBD5E1"/>
        </linearGradient>
        <linearGradient id="unSkin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#FED7AA"/>
          <stop offset="100%" stop-color="#FDBA74"/>
        </linearGradient>
      </defs>

      <!-- Floating Achievement Badges -->
      <circle cx="85" cy="95" r="20" fill="#E0F2FE"/>
      <path d="M78 95 L83 100 L93 90" stroke="#0284C7" stroke-width="3" stroke-linecap="round" fill="none"/>

      <circle cx="235" cy="95" r="22" fill="#FEF3C7"/>
      <!-- Star -->
      <polygon points="235,84 238,92 246,92 240,97 242,105 235,100 228,105 230,97 224,92 232,92" fill="#F59E0B"/>

      <!-- Desk Surface -->
      <rect x="35" y="245" width="250" height="14" rx="7" fill="url(#unDesk)"/>

      <!-- Person Character -->
      <circle cx="160" cy="115" r="24" fill="#1E293B"/>
      <circle cx="160" cy="122" r="18" fill="url(#unSkin)"/>
      <path d="M156 128 Q160 133 164 128" stroke="#7C2D12" stroke-width="2" stroke-linecap="round" fill="none"/>

      <path d="M125 245 C125 180 195 180 195 245 Z" fill="#0074FC"/>

      <!-- Laptop with rocket/growth -->
      <path d="M128 245 L192 245 L188 202 L132 202 Z" fill="#0F172A"/>
      <rect x="136" y="206" width="48" height="30" rx="3" fill="#38BDF8"/>
      <circle cx="160" cy="221" r="5" fill="#FFFFFF"/>
      <rect x="115" y="243" width="90" height="6" rx="3" fill="#94A3B8"/>
    </svg>
  `;
}

/**
 * Draws the photo-realistic 3D glossy glass sphere with highlights and drop shadows
 */
export function drawGlassSphere(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
  artworkImg?: HTMLImageElement | null
) {
  ctx.save();

  // 1. Soft Ambient Drop Shadow under the bubble
  ctx.save();
  const shadowGrad = ctx.createRadialGradient(cx, cy + r * 0.82, r * 0.15, cx, cy + r * 0.82, r * 0.95);
  shadowGrad.addColorStop(0, 'rgba(10, 30, 80, 0.13)');
  shadowGrad.addColorStop(0.5, 'rgba(10, 30, 80, 0.05)');
  shadowGrad.addColorStop(1, 'rgba(10, 30, 80, 0)');
  ctx.fillStyle = shadowGrad;
  ctx.beginPath();
  ctx.ellipse(cx, cy + r * 0.86, r * 0.92, r * 0.28, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // 2. Base Sphere Fill with Translucent Liquid Radial Gradient
  const sphereBase = ctx.createRadialGradient(cx - r * 0.35, cy - r * 0.35, r * 0.05, cx, cy, r);
  sphereBase.addColorStop(0, 'rgba(255, 255, 255, 0.98)');
  sphereBase.addColorStop(0.45, 'rgba(246, 251, 255, 0.94)');
  sphereBase.addColorStop(0.78, 'rgba(230, 242, 255, 0.72)');
  sphereBase.addColorStop(0.92, 'rgba(205, 228, 255, 0.86)');
  sphereBase.addColorStop(1, 'rgba(182, 214, 255, 0.96)');

  ctx.fillStyle = sphereBase;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();

  // 3. Render Inner Artwork (clipped within the sphere circle)
  if (artworkImg) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.88, 0, Math.PI * 2);
    ctx.clip();
    const artSize = r * 1.76;
    ctx.drawImage(artworkImg, cx - artSize / 2, cy - artSize / 2, artSize, artSize);
    ctx.restore();
  }

  // 4. Inner Glass Shading & Translucent Reflection Layer
  const innerReflect = ctx.createRadialGradient(cx, cy, r * 0.65, cx, cy, r);
  innerReflect.addColorStop(0, 'rgba(255, 255, 255, 0)');
  innerReflect.addColorStop(0.85, 'rgba(230, 242, 255, 0.25)');
  innerReflect.addColorStop(1, 'rgba(180, 215, 255, 0.55)');
  ctx.fillStyle = innerReflect;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();

  // 5. Crisp Outer Glass Rim (Fresnel ring)
  const rimGrad = ctx.createLinearGradient(cx - r, cy - r, cx + r, cy + r);
  rimGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
  rimGrad.addColorStop(0.35, 'rgba(185, 218, 255, 0.5)');
  rimGrad.addColorStop(0.7, 'rgba(255, 255, 255, 0.85)');
  rimGrad.addColorStop(1, 'rgba(145, 192, 255, 0.65)');
  ctx.strokeStyle = rimGrad;
  ctx.lineWidth = Math.max(3, r * 0.038);
  ctx.beginPath();
  ctx.arc(cx, cy, r - ctx.lineWidth / 2, 0, Math.PI * 2);
  ctx.stroke();

  // 6. Top-Left Primary Specular Highlight (Curved Glass Sheen)
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(-Math.PI / 4);
  const hlGrad = ctx.createRadialGradient(0, -r * 0.72, r * 0.02, 0, -r * 0.72, r * 0.35);
  hlGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
  hlGrad.addColorStop(0.3, 'rgba(255, 255, 255, 0.75)');
  hlGrad.addColorStop(0.65, 'rgba(255, 255, 255, 0.25)');
  hlGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = hlGrad;
  ctx.beginPath();
  ctx.ellipse(0, -r * 0.72, r * 0.42, r * 0.18, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // 7. Secondary Soft Specular Rim (Opposite Lower-Right Glow)
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(Math.PI * 0.75);
  const hl2Grad = ctx.createRadialGradient(0, -r * 0.8, r * 0.05, 0, -r * 0.8, r * 0.25);
  hl2Grad.addColorStop(0, 'rgba(255, 255, 255, 0.7)');
  hl2Grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.25)');
  hl2Grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = hl2Grad;
  ctx.beginPath();
  ctx.ellipse(0, -r * 0.8, r * 0.35, r * 0.1, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.restore();
}

/**
 * Loads an image from URL or SVG string into an HTMLImageElement
 */
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
    img.src = src;
  });
}

/**
 * Helper to split long job name into 1 or 2 uppercase lines
 */
function formatJobTitleLines(title: string): string[] {
  const upper = title.trim().toUpperCase();
  const words = upper.split(/\s+/);
  if (words.length <= 1) return [upper];
  if (words.length === 2) {
    // e.g. "VIRTUAL ASSISTANT" or "VIDEO EDITOR" -> if combined length > 14 split, or split naturally
    return [words[0], words[1]];
  }
  // 3 or more words: e.g. "SOCIAL MEDIA MANAGEMENT" -> ["SOCIAL MEDIA", "MANAGEMENT"]
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(' '), words.slice(mid).join(' ')];
}

/**
 * Helper to wrap text into multiple lines given a max-width
 */
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = words[0] || '';

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const width = ctx.measureText(currentLine + ' ' + word).width;
    if (width < maxWidth) {
      currentLine += ' ' + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

/**
 * Generates the full 1080 x 1920 Story Canvas matching the approved graphic mockup
 */
export async function renderStoryGraphicCanvas(params: ShareGraphicParams): Promise<HTMLCanvasElement> {
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1920;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get 2D canvas context');

  // Ensure high quality rendering
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  // ── 1. BACKGROUND (Pure White + Ambient Radiant Glows) ──
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, 1080, 1920);

  // Top-Right Ambient Glow
  const glow1 = ctx.createRadialGradient(900, 260, 50, 900, 260, 750);
  glow1.addColorStop(0, 'rgba(215, 235, 255, 0.45)');
  glow1.addColorStop(0.6, 'rgba(240, 248, 255, 0.2)');
  glow1.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = glow1;
  ctx.fillRect(0, 0, 1080, 1920);

  // Mid-Left Ambient Glow
  const glow2 = ctx.createRadialGradient(150, 920, 80, 150, 920, 700);
  glow2.addColorStop(0, 'rgba(225, 240, 255, 0.45)');
  glow2.addColorStop(0.7, 'rgba(245, 250, 255, 0.15)');
  glow2.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = glow2;
  ctx.fillRect(0, 0, 1080, 1920);

  // Bottom Ambient Mist
  const glow3 = ctx.createLinearGradient(540, 1400, 540, 1920);
  glow3.addColorStop(0, 'rgba(255, 255, 255, 0)');
  glow3.addColorStop(1, 'rgba(228, 242, 255, 0.55)');
  ctx.fillStyle = glow3;
  ctx.fillRect(0, 1400, 1080, 520);

  // ── 2. LOGO (Top-Left) ──
  try {
    const logoImg = await loadImage('/logo.webp');
    // Aspect ratio preservation
    const logoW = 240;
    const logoH = (logoImg.height / logoImg.width) * logoW;
    ctx.drawImage(logoImg, 65, 65, logoW, logoH);
  } catch (err) {
    // Fallback vector wordmark if image fails
    ctx.fillStyle = '#0A0E2E';
    ctx.font = '900 40px Outfit, Plus Jakarta Sans, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('CARI ', 65, 110);
    const cariW = ctx.measureText('CARI ').width;
    ctx.fillStyle = '#0074FC';
    ctx.fillText('SIDE JOB', 65 + cariW, 110);
  }

  // ── 3. HEADER GREETING & PERSONA ──
  const cleanName = (params.leadName || 'Sobat').trim();

  // "Hi [Name]! Kamu Adalah"
  ctx.textAlign = 'center';
  ctx.font = 'bold 36px Outfit, Plus Jakarta Sans, sans-serif';

  const part1 = 'Hi ';
  const part2 = `${cleanName}! `;
  const part3 = 'Kamu Adalah';
  const w1 = ctx.measureText(part1).width;
  const w2 = ctx.measureText(part2).width;
  const w3 = ctx.measureText(part3).width;
  const totalGreetingW = w1 + w2 + w3;
  let startX = 540 - totalGreetingW / 2;

  ctx.textAlign = 'left';
  ctx.fillStyle = '#0A0E2E';
  ctx.fillText(part1, startX, 290);
  startX += w1;
  ctx.fillStyle = '#0074FC';
  ctx.fillText(part2, startX, 290);
  startX += w2;
  ctx.fillStyle = '#0A0E2E';
  ctx.fillText(part3, startX, 290);

  // Large Persona Title: "ANDALAN SEMUA ORANG"
  ctx.textAlign = 'center';
  ctx.font = '900 52px Outfit, Plus Jakarta Sans, sans-serif';
  ctx.fillStyle = '#0B3580';
  const personaTitle = (params.personaName || 'Andalan Semua Orang').toUpperCase();
  ctx.fillText(personaTitle, 540, 360);

  // Tagline description (2 lines wrapped)
  ctx.font = '500 24px Plus Jakarta Sans, sans-serif';
  ctx.fillStyle = '#4A5568';
  const tagline = params.personaTagline || 'Kamu sosok yang terorganisir, komunikatif, dan lihai meringankan beban operasional orang lain secara remote.';
  const taglineLines = wrapText(ctx, tagline, 860);
  taglineLines.slice(0, 3).forEach((line, idx) => {
    ctx.fillText(line, 540, 420 + idx * 36);
  });

  // ── 4. SECTION HEADING ──
  // Line 1: PELUANG [SIDE JOB] & [KERJA REMOTE]
  ctx.font = '900 32px Outfit, Plus Jakarta Sans, sans-serif';
  const sPart1 = 'PELUANG ';
  const sPart2 = 'SIDE JOB';
  const sPart3 = ' & ';
  const sPart4 = 'KERJA REMOTE';
  const sw1 = ctx.measureText(sPart1).width;
  const sw2 = ctx.measureText(sPart2).width;
  const sw3 = ctx.measureText(sPart3).width;
  const sw4 = ctx.measureText(sPart4).width;
  const totalSecW = sw1 + sw2 + sw3 + sw4;
  let secX = 540 - totalSecW / 2;

  ctx.textAlign = 'left';
  ctx.fillStyle = '#0A0E2E';
  ctx.fillText(sPart1, secX, 555);
  secX += sw1;
  ctx.fillStyle = '#0074FC';
  ctx.fillText(sPart2, secX, 555);
  secX += sw2;
  ctx.fillStyle = '#0A0E2E';
  ctx.fillText(sPart3, secX, 555);
  secX += sw3;
  ctx.fillStyle = '#0074FC';
  ctx.fillText(sPart4, secX, 555);

  // Line 2: YANG COCOK UNTUK KAMU
  ctx.textAlign = 'center';
  ctx.fillStyle = '#0A0E2E';
  ctx.fillText('YANG COCOK UNTUK KAMU', 540, 600);

  // ── 5. ASYMMETRIC 3D GLASS SPHERES WITH TAILORED ARTWORK ──
  const matches = params.topMatches || [];
  const m1 = matches[0] || { id: 'va', name: 'Virtual Assistant', matchPercent: 96 };
  const m2 = matches[1] || { id: 'videoeditor', name: 'Video Editor', matchPercent: 82 };
  const m3 = matches[2] || { id: 'copywriter', name: 'Copywriter', matchPercent: 75 };

  // Pre-load artworks as SVG images in parallel
  const [art1, art2, art3] = await Promise.all([
    loadImage('data:image/svg+xml;charset=utf-8,' + encodeURIComponent(getJobIllustrationSvg(m1.id, m1.name))).catch(() => null),
    loadImage('data:image/svg+xml;charset=utf-8,' + encodeURIComponent(getJobIllustrationSvg(m2.id, m2.name))).catch(() => null),
    loadImage('data:image/svg+xml;charset=utf-8,' + encodeURIComponent(getJobIllustrationSvg(m3.id, m3.name))).catch(() => null),
  ]);

  // ── SPHERE 1 (TOP MATCH): Left side, Large
  // Center: (300, 840), Radius: 160
  drawGlassSphere(ctx, 300, 840, 160, art1);

  // Match 1 Text: Right of Sphere
  ctx.textAlign = 'left';
  const m1Lines = formatJobTitleLines(m1.name);
  ctx.font = '900 48px Outfit, Plus Jakarta Sans, sans-serif';
  ctx.fillStyle = '#0074FC';

  if (m1Lines.length === 1) {
    ctx.fillText(m1Lines[0], 510, 830);
    ctx.font = '700 36px Outfit, Plus Jakarta Sans, sans-serif';
    ctx.fillText(`(${m1.matchPercent}% Cocok)`, 510, 885);
  } else {
    ctx.fillText(m1Lines[0], 510, 810);
    ctx.fillText(m1Lines[1], 510, 865);
    ctx.font = '700 36px Outfit, Plus Jakarta Sans, sans-serif';
    ctx.fillText(`(${m1.matchPercent}% Cocok)`, 510, 920);
  }

  // ── SPHERE 2 (SECOND MATCH): Right side, Medium (Zig-zag)
  // Center: (740, 1170), Radius: 140
  drawGlassSphere(ctx, 740, 1170, 140, art2);

  // Match 2 Text: Left of Sphere (Right-aligned)
  ctx.textAlign = 'right';
  const m2Lines = formatJobTitleLines(m2.name);
  ctx.font = '900 44px Outfit, Plus Jakarta Sans, sans-serif';
  ctx.fillStyle = '#0074FC';

  if (m2Lines.length === 1) {
    ctx.fillText(m2Lines[0], 565, 1160);
    ctx.font = '700 32px Outfit, Plus Jakarta Sans, sans-serif';
    ctx.fillText(`(${m2.matchPercent}% Cocok)`, 565, 1215);
  } else {
    ctx.fillText(m2Lines[0], 565, 1140);
    ctx.fillText(m2Lines[1], 565, 1195);
    ctx.font = '700 32px Outfit, Plus Jakarta Sans, sans-serif';
    ctx.fillText(`(${m2.matchPercent}% Cocok)`, 565, 1250);
  }

  // ── SPHERE 3 (THIRD MATCH): Left side, Small (Zig-zag)
  // Center: (330, 1475), Radius: 105
  drawGlassSphere(ctx, 330, 1475, 105, art3);

  // Match 3 Text: Right of Sphere
  ctx.textAlign = 'left';
  const m3Lines = formatJobTitleLines(m3.name);
  ctx.font = '900 38px Outfit, Plus Jakarta Sans, sans-serif';
  ctx.fillStyle = '#0074FC';

  if (m3Lines.length === 1) {
    ctx.fillText(m3Lines[0], 475, 1465);
    ctx.font = '700 28px Outfit, Plus Jakarta Sans, sans-serif';
    ctx.fillText(`(${m3.matchPercent}% Cocok)`, 475, 1515);
  } else {
    ctx.fillText(m3Lines[0], 475, 1450);
    ctx.fillText(m3Lines[1], 475, 1495);
    ctx.font = '700 28px Outfit, Plus Jakarta Sans, sans-serif';
    ctx.fillText(`(${m3.matchPercent}% Cocok)`, 475, 1545);
  }

  // ── 6. FOOTER WATERMARK / CTA ──
  ctx.textAlign = 'center';
  ctx.font = 'bold 30px Outfit, Plus Jakarta Sans, sans-serif';
  ctx.fillStyle = '#0A0E2E';
  ctx.fillText('Cari Side Job Yang Cocok Buat Kamu di', 540, 1750);
  ctx.font = '900 33px Outfit, Plus Jakarta Sans, sans-serif';
  ctx.fillText('carisidejob.id', 540, 1795);

  return canvas;
}

/**
 * Triggers a direct download of the generated PNG file
 */
export async function downloadStoryGraphic(params: ShareGraphicParams): Promise<void> {
  const canvas = await renderStoryGraphicCanvas(params);
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
  if (!blob) throw new Error('Could not convert canvas to PNG blob');

  const cleanName = (params.leadName || 'hasil').replace(/\s+/g, '_');
  const fileName = `CariSideJob_${cleanName}_Story.png`;
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = fileName;
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}
