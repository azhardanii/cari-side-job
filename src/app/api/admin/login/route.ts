import { NextRequest, NextResponse } from 'next/server';
import {
  verifyAdminPassword,
  createAdminSessionToken,
  checkLoginRateLimit,
  recordFailedLogin,
  resetLoginAttempts,
  getAdminCookieOptions,
} from '@/lib/auth';

export const dynamic = 'force-dynamic';

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  const realIp = req.headers.get('x-real-ip');
  if (realIp) {
    return realIp.trim();
  }
  return '127.0.0.1';
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);

    // 1. Rate limiting / Brute-force shield
    const rateCheck = checkLoginRateLimit(ip);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          error: `Terlalu banyak percobaan gagal. Akses diblokir sementara. Silakan coba lagi dalam ${rateCheck.retryAfterSeconds} detik.`,
          retryAfter: rateCheck.retryAfterSeconds,
        },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const { password } = body;

    if (!password || typeof password !== 'string') {
      return NextResponse.json(
        { error: 'Password wajib dimasukkan.' },
        { status: 400 }
      );
    }

    // 2. Constant-time password verification against environment variable
    const isValid = await verifyAdminPassword(password);

    if (!isValid) {
      const failStatus = recordFailedLogin(ip);

      // Artificial delay to prevent timing and automated dictionary attacks
      await new Promise((resolve) => setTimeout(resolve, 600));

      if (failStatus.isLocked) {
        return NextResponse.json(
          {
            error: 'Terlalu banyak percobaan gagal berturut-turut. Akses Anda dikunci selama 15 menit.',
            isLocked: true,
          },
          { status: 429 }
        );
      }

      return NextResponse.json(
        {
          error: 'Password salah. Akses ditolak.',
          remainingAttempts: failStatus.remainingAttempts,
        },
        { status: 401 }
      );
    }

    // 3. Password valid: reset rate limit & create secure session token
    resetLoginAttempts(ip);
    const token = await createAdminSessionToken();

    // 4. Create response with HttpOnly, Secure, SameSite=Lax cookie
    const response = NextResponse.json({
      success: true,
      message: 'Autentikasi admin berhasil.',
      redirectUrl: '/admin',
    });

    const cookieOptions = getAdminCookieOptions();
    response.cookies.set({
      name: cookieOptions.name,
      value: token,
      httpOnly: cookieOptions.httpOnly,
      secure: cookieOptions.secure,
      sameSite: cookieOptions.sameSite,
      path: cookieOptions.path,
      maxAge: cookieOptions.maxAge,
    });

    return response;
  } catch (error: any) {
    console.error('Error during admin login:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan sistem saat autentikasi.' },
      { status: 500 }
    );
  }
}
