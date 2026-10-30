import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyAdminSession, ADMIN_COOKIE_NAME } from '@/lib/auth';

/**
 * Server Component Layout Guard for /admin
 *
 * This provides Defense-in-Depth Layer 2:
 * Even if proxy/middleware were bypassed, this server-side check runs
 * BEFORE any admin child component or data is rendered. If no valid
 * session is present, it immediately redirects to /login.
 */
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  const isValid = await verifyAdminSession(sessionCookie);

  if (!isValid) {
    redirect('/login');
  }

  return <>{children}</>;
}
