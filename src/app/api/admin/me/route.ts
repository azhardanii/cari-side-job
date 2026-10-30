import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession, ADMIN_COOKIE_NAME } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const isValid = await verifyAdminSession(token);

  if (!isValid) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    user: {
      role: 'admin',
    },
  });
}
