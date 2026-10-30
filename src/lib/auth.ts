/**
 * Server-Side Admin Authentication & Cryptographic Session Security
 *
 * Defense-in-depth security model:
 * 1. Environment-only secret (Never exposed to client bundle, no NEXT_PUBLIC_ prefix).
 * 2. Constant-time password verification against timing attacks.
 * 3. HMAC-SHA256 cryptographically signed session tokens.
 * 4. HttpOnly, Secure, SameSite=Lax cookie storage (immune to client-side XSS stealing).
 * 5. IP-based rate limiting & brute-force lockout.
 */

export const ADMIN_COOKIE_NAME = 'carisidejob_admin_session';
const SESSION_MAX_AGE_SECONDS = 7 * 24 * 60 * 60; // 7 days

// In-memory rate limiter for login brute-force protection
interface RateLimitRecord {
  attempts: number;
  lockoutUntil: number;
}

const loginAttempts = new Map<string, RateLimitRecord>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes

export function checkLoginRateLimit(ip: string): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const record = loginAttempts.get(ip);

  if (!record) {
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (record.lockoutUntil > now) {
    const remaining = Math.ceil((record.lockoutUntil - now) / 1000);
    return { allowed: false, retryAfterSeconds: remaining };
  }

  // Lockout expired, reset
  if (record.lockoutUntil !== 0 && record.lockoutUntil <= now) {
    loginAttempts.delete(ip);
    return { allowed: true, retryAfterSeconds: 0 };
  }

  return { allowed: true, retryAfterSeconds: 0 };
}

export function recordFailedLogin(ip: string): { remainingAttempts: number; isLocked: boolean } {
  const now = Date.now();
  const record = loginAttempts.get(ip) || { attempts: 0, lockoutUntil: 0 };

  record.attempts += 1;

  if (record.attempts >= MAX_ATTEMPTS) {
    record.lockoutUntil = now + LOCKOUT_DURATION_MS;
    loginAttempts.set(ip, record);
    return { remainingAttempts: 0, isLocked: true };
  }

  loginAttempts.set(ip, record);
  return { remainingAttempts: MAX_ATTEMPTS - record.attempts, isLocked: false };
}

export function resetLoginAttempts(ip: string): void {
  loginAttempts.delete(ip);
}

// Base64URL encoding/decoding safe across Edge, Node, and browser
function toBase64Url(buffer: ArrayBuffer | Uint8Array): string {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromBase64Url(str: string): Uint8Array {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

/**
 * Returns the cryptographically secure key for signing session tokens.
 */
async function getCryptoKey(): Promise<CryptoKey> {
  const secret = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || 'fallback-cari-sidejob-secret-must-set-env';
  const enc = new TextEncoder();
  return crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

/**
 * Create a signed admin session token.
 */
export async function createAdminSessionToken(): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    role: 'admin',
    sub: 'carisidejob_admin',
    iat: now,
    exp: now + SESSION_MAX_AGE_SECONDS,
  };

  const enc = new TextEncoder();
  const payloadStr = JSON.stringify(payload);
  const payloadBase64 = toBase64Url(enc.encode(payloadStr));

  const key = await getCryptoKey();
  const signatureBuffer = await crypto.subtle.sign('HMAC', key, enc.encode(payloadBase64));
  const signatureBase64 = toBase64Url(signatureBuffer);

  return `${payloadBase64}.${signatureBase64}`;
}

/**
 * Verifies an admin session token.
 * Returns true if the token is valid, intact, signed with our secret, and not expired.
 */
export async function verifyAdminSession(token: string | undefined | null): Promise<boolean> {
  if (!token || typeof token !== 'string') {
    return false;
  }

  const parts = token.split('.');
  if (parts.length !== 2) {
    return false;
  }

  const [payloadBase64, signatureBase64] = parts;

  try {
    const enc = new TextEncoder();
    const key = await getCryptoKey();
    const signatureBytes = fromBase64Url(signatureBase64);

    const isValidSig = await crypto.subtle.verify(
      'HMAC',
      key,
      signatureBytes as unknown as BufferSource,
      enc.encode(payloadBase64)
    );

    if (!isValidSig) {
      return false;
    }

    const payloadJsonBytes = fromBase64Url(payloadBase64);
    const dec = new TextDecoder();
    const payload = JSON.parse(dec.decode(payloadJsonBytes));

    const now = Math.floor(Date.now() / 1000);

    if (payload.role !== 'admin') {
      return false;
    }

    if (!payload.exp || typeof payload.exp !== 'number' || payload.exp < now) {
      return false; // Expired
    }

    if (!payload.iat || typeof payload.iat !== 'number' || payload.iat > now + 60) {
      return false; // Invalid issued-at
    }

    return true;
  } catch (err) {
    return false;
  }
}

/**
 * Constant-time comparison of two Uint8Arrays to prevent timing attacks.
 */
function constantTimeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) {
    return false;
  }
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a[i] ^ b[i];
  }
  return diff === 0;
}

/**
 * Verify input password against environment variable ADMIN_PASSWORD in constant time.
 */
export async function verifyAdminPassword(inputPassword: string): Promise<boolean> {
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword || typeof adminPassword !== 'string' || adminPassword.trim() === '') {
    console.error('[SECURITY ALERT] ADMIN_PASSWORD environment variable is not configured!');
    return false;
  }

  if (!inputPassword || typeof inputPassword !== 'string') {
    return false;
  }

  const enc = new TextEncoder();
  const inputHash = new Uint8Array(await crypto.subtle.digest('SHA-256', enc.encode(inputPassword)));
  const targetHash = new Uint8Array(await crypto.subtle.digest('SHA-256', enc.encode(adminPassword)));

  return constantTimeEqual(inputHash, targetHash);
}

/**
 * Standard cookie configuration for admin session.
 */
export function getAdminCookieOptions() {
  return {
    name: ADMIN_COOKIE_NAME,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: SESSION_MAX_AGE_SECONDS,
  };
}
