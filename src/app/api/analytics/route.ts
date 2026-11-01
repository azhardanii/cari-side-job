import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminSession, ADMIN_COOKIE_NAME } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// In-memory cache for IP deduplication (30 minutes session window)
// Prevents database spam when user refreshes or clicks repeatedly
const ipVisitCache = new Map<string, number>();
const SESSION_COOLDOWN_MS = 30 * 60 * 1000; // 30 minutes

function cleanOldCache() {
  const now = Date.now();
  for (const [ip, timestamp] of ipVisitCache.entries()) {
    if (now - timestamp > SESSION_COOLDOWN_MS) {
      ipVisitCache.delete(ip);
    }
  }
}

// Clean in-memory cache periodically (every 100 requests)
let requestCounter = 0;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { eventType, label, metadata } = body;

    if (!eventType) {
      return NextResponse.json({ error: 'eventType wajib diisi' }, { status: 400 });
    }

    // ── KHUSUS EVENT: PAGE_VIEW (PENGUNJUNG WEBSITE) ──
    if (eventType === 'PAGE_VIEW') {
      const forwarded = req.headers.get('x-forwarded-for');
      const rawIp = forwarded
        ? forwarded.split(',')[0].trim()
        : req.headers.get('x-real-ip') || '127.0.0.1';

      const userAgent = req.headers.get('user-agent') || '';
      const uaLower = userAgent.toLowerCase();

      // Abaikan bot / crawler mesin pencari agar data akurat
      const isBot = /bot|googlebot|bingbot|yandex|duckduckbot|slurp|crawler|spider|robot|crawling|lighthouse|uptime/i.test(uaLower);
      if (isBot) {
        return NextResponse.json({ success: true, ignored: 'bot' });
      }

      // Jangan hitung jika visitor memiliki cookie admin yang sedang aktif (admin preview)
      const adminCookie = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
      if (adminCookie) {
        const isAuthedAdmin = await verifyAdminSession(adminCookie);
        if (isAuthedAdmin) {
          return NextResponse.json({ success: true, ignored: 'admin_preview' });
        }
      }

      // ── CEK IN-MEMORY CACHE (ANTI-SPAM / REFRESH BERULANG) ──
      const now = Date.now();
      const lastVisitTime = ipVisitCache.get(rawIp);

      requestCounter++;
      if (requestCounter > 100) {
        cleanOldCache();
        requestCounter = 0;
      }

      if (lastVisitTime && now - lastVisitTime < SESSION_COOLDOWN_MS) {
        // IP ini sudah tercatat dalam 30 menit terakhir, abaikan spam refresh
        return NextResponse.json({ success: true, isNewVisit: false });
      }

      // ── CEK DATABASE (JIKA SERVER BARU RESTART) ──
      const thirtyMinutesAgo = new Date(now - SESSION_COOLDOWN_MS);
      const recentDbVisit = await prisma.analyticMetric.findFirst({
        where: {
          eventType: 'PAGE_VIEW',
          label: rawIp,
          createdAt: { gte: thirtyMinutesAgo },
        },
        select: { id: true },
      });

      if (recentDbVisit) {
        ipVisitCache.set(rawIp, now);
        return NextResponse.json({ success: true, isNewVisit: false });
      }

      // Simpan kunjungan baru ke database
      ipVisitCache.set(rawIp, now);
      const metric = await prisma.analyticMetric.create({
        data: {
          eventType: 'PAGE_VIEW',
          label: rawIp,
          metadata: {
            path: metadata?.path || '/',
            referrer: metadata?.referrer || '',
            url: metadata?.url || '',
            userAgent: userAgent.slice(0, 150),
          },
        },
      });

      return NextResponse.json({ success: true, isNewVisit: true, id: metric.id });
    }

    // ── EVENT ANALYTICS LAINNYA ──
    const metric = await prisma.analyticMetric.create({
      data: {
        eventType,
        label: label || undefined,
        metadata: metadata || undefined,
      },
    });

    return NextResponse.json({ success: true, metric });
  } catch (error: any) {
    console.error('Error tracking analytics event:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

// GET analytics overview for Admin Dashboard
export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const isAuthed = await verifyAdminSession(token);
    if (!isAuthed) {
      return NextResponse.json({ error: 'Akses ditolak. Sesi admin diperlukan.' }, { status: 401 });
    }

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const [uniqueVisitorsGroup, todayVisitorsGroup, totalPageViews, recentVisitors] = await Promise.all([
      // 1. Total Unique IPs (All-Time)
      prisma.analyticMetric.groupBy({
        by: ['label'],
        where: {
          eventType: 'PAGE_VIEW',
          label: { not: null },
        },
      }),

      // 2. Today's Unique IPs
      prisma.analyticMetric.groupBy({
        by: ['label'],
        where: {
          eventType: 'PAGE_VIEW',
          label: { not: null },
          createdAt: { gte: startOfToday },
        },
      }),

      // 3. Total Pageviews / Visits
      prisma.analyticMetric.count({
        where: { eventType: 'PAGE_VIEW' },
      }),

      // 4. Recent Visitor logs (last 8 entries)
      prisma.analyticMetric.findMany({
        where: { eventType: 'PAGE_VIEW' },
        orderBy: { createdAt: 'desc' },
        take: 8,
        select: {
          id: true,
          label: true,
          metadata: true,
          createdAt: true,
        },
      }),
    ]);

    const totalUniqueVisitors = uniqueVisitorsGroup.length;
    const todayUniqueVisitors = todayVisitorsGroup.length;

    // Mask IP for admin privacy display (e.g. 114.122.***.***)
    const formattedRecent = recentVisitors.map((v) => {
      const ip = v.label || '127.0.0.1';
      const parts = ip.split('.');
      const maskedIp = parts.length === 4 ? `${parts[0]}.${parts[1]}.***.***` : ip;
      const meta = (v.metadata || {}) as Record<string, any>;
      return {
        id: v.id,
        maskedIp,
        path: meta.path || '/',
        referrer: meta.referrer ? meta.referrer.replace(/^https?:\/\//i, '').slice(0, 30) : 'Direct / Link Langsung',
        createdAt: v.createdAt,
      };
    });

    return NextResponse.json({
      success: true,
      stats: {
        totalUniqueVisitors,
        todayUniqueVisitors,
        totalPageViews,
      },
      recentVisitors: formattedRecent,
    });
  } catch (error: any) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json({ success: false, error: error?.message }, { status: 500 });
  }
}
