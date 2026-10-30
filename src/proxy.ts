import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAdminSession, ADMIN_COOKIE_NAME } from '@/lib/auth';

/**
 * Next.js 16 Proxy Guard
 * Intercepts requests before they reach route handlers or renderers.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Protection for /admin and all subpaths
  if (pathname.startsWith('/admin')) {
    const sessionCookie = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const isValid = await verifyAdminSession(sessionCookie);

    if (!isValid) {
      // Immediate 307 redirect to /login
      const loginUrl = new URL('/login', request.url);
      // Optional: keep target route for redirecting back after login
      if (pathname !== '/admin') {
        loginUrl.searchParams.set('next', pathname);
      }
      return NextResponse.redirect(loginUrl);
    }
  }

  // 2. Protection for /login: if already logged in, jump directly to /admin
  if (pathname === '/login') {
    const sessionCookie = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const isValid = await verifyAdminSession(sessionCookie);

    if (isValid) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export default proxy;

export const config = {
  matcher: ['/admin/:path*', '/login'],
};
