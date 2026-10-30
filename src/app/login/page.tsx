'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus and check if already logged in
  useEffect(() => {
    async function checkExistingSession() {
      try {
        const res = await fetch('/api/admin/me');
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated) {
            router.replace('/admin');
            return;
          }
        }
      } catch {
        // Not logged in, proceed to show login form
      } finally {
        setIsCheckingSession(false);
        setTimeout(() => inputRef.current?.focus(), 100);
      }
    }
    checkExistingSession();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim() || isLoading) return;

    setIsLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || 'Password salah. Akses ditolak.');
        setIsLoading(false);
        setTimeout(() => inputRef.current?.select(), 100);
        return;
      }

      setIsSuccess(true);
      // Hard redirect to ensure server components & layout re-verify session
      window.location.href = data.redirectUrl || '/admin';
    } catch {
      setErrorMsg('Gagal terhubung ke server. Periksa koneksi internet Anda.');
      setIsLoading(false);
    }
  };

  if (isCheckingSession) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8FAFC' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 36, height: 36, border: '3px solid #E2E8F0', borderTopColor: '#1D64EC', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
          <span style={{ fontSize: 13, color: '#64748B', fontWeight: 600 }}>Memverifikasi sesi...</span>
        </div>
        <style jsx global>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(ellipse at 50% -10%, #E0EDFF 0%, #F8FAFC 60%, #F1F5F9 100%)',
        fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
        color: '#0F172A',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 420,
          background: 'white',
          borderRadius: 24,
          padding: '36px 32px 32px',
          boxShadow: '0 20px 45px -15px rgba(15, 23, 42, 0.08), 0 0 0 1px rgba(226, 232, 240, 0.8)',
          position: 'relative',
        }}
      >
        {/* Brand Icon & Heading */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div
            style={{
              width: 52,
              height: 52,
              margin: '0 auto 16px',
              borderRadius: 16,
              background: 'linear-gradient(135deg, #1D64EC 0%, #0F3BA0 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 24,
              color: 'white',
              boxShadow: '0 8px 20px rgba(29, 100, 236, 0.28)',
            }}
          >
            🛡️
          </div>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '3px 10px',
              borderRadius: 9999,
              background: '#EFF6FF',
              border: '1px solid #BFDBFE',
              color: '#1D64EC',
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              marginBottom: 10,
            }}
          >
            Akses Terbatas
          </div>

          <h1
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: '#0F172A',
              margin: '0 0 6px 0',
              letterSpacing: '-0.02em',
            }}
          >
            Portal Administrator
          </h1>
          <p
            style={{
              fontSize: 13,
              color: '#64748B',
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            Masukkan password otorisasi untuk mengakses kontrol dashboard CariSidejob.
          </p>
        </div>

        {/* Error Notification */}
        {errorMsg && (
          <div
            style={{
              background: '#FEF2F2',
              border: '1px solid #FECACA',
              borderRadius: 12,
              padding: '12px 14px',
              marginBottom: 20,
              display: 'flex',
              alignItems: 'flex-start',
              gap: 10,
              animation: 'shake 0.3s ease-in-out',
            }}
          >
            <span style={{ fontSize: 16, flexShrink: 0 }}>⚠️</span>
            <div style={{ fontSize: 12.5, color: '#991B1B', fontWeight: 600, lineHeight: 1.4 }}>
              {errorMsg}
            </div>
          </div>
        )}

        {/* Success Notification */}
        {isSuccess && (
          <div
            style={{
              background: '#ECFDF5',
              border: '1px solid #A7F3D0',
              borderRadius: 12,
              padding: '12px 14px',
              marginBottom: 20,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <span style={{ fontSize: 16, flexShrink: 0 }}>✅</span>
            <div style={{ fontSize: 12.5, color: '#065F46', fontWeight: 700 }}>
              Otorisasi berhasil. Membuka dashboard admin...
            </div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 20 }}>
            <label
              htmlFor="admin-password"
              style={{
                display: 'block',
                fontSize: 12,
                fontWeight: 700,
                color: '#334155',
                marginBottom: 8,
              }}
            >
              Password Admin
            </label>
            <div style={{ position: 'relative' }}>
              <input
                ref={inputRef}
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ketik password admin..."
                disabled={isLoading || isSuccess}
                style={{
                  width: '100%',
                  padding: '12px 42px 12px 14px',
                  background: '#F8FAFC',
                  border: errorMsg ? '1.5px solid #EF4444' : '1.5px solid #CBD5E1',
                  borderRadius: 12,
                  fontSize: 14,
                  fontFamily: 'inherit',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.15s, background-color 0.15s',
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 4,
                  color: '#64748B',
                  fontSize: 15,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                title={showPassword ? 'Sembunyikan password' : 'Lihat password'}
                aria-label="Toggle password visibility"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || isSuccess || !password.trim()}
            style={{
              width: '100%',
              padding: '12px 18px',
              borderRadius: 12,
              border: 'none',
              background: isLoading || !password.trim()
                ? '#94A3B8'
                : 'linear-gradient(135deg, #1D64EC 0%, #0F3BA0 100%)',
              color: 'white',
              fontSize: 13.5,
              fontWeight: 800,
              cursor: isLoading || !password.trim() ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              boxShadow: isLoading || !password.trim()
                ? 'none'
                : '0 4px 14px rgba(29, 100, 236, 0.3)',
              transition: 'transform 0.1s, opacity 0.15s',
            }}
          >
            {isLoading ? (
              <>
                <span style={{ width: 16, height: 16, border: '2px solid white', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite', display: 'inline-block' }} />
                <span>Memverifikasi...</span>
              </>
            ) : (
              <span>Buka Akses Admin →</span>
            )}
          </button>
        </form>

        {/* Back link */}
        <div style={{ textAlign: 'center', marginTop: 24, paddingTop: 18, borderTop: '1px solid #F1F5F9' }}>
          <Link
            href="/"
            style={{
              fontSize: 12,
              color: '#64748B',
              textDecoration: 'none',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            ← Kembali ke Beranda
          </Link>
        </div>
      </div>

      <style jsx global>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-6px); }
          40%, 80% { transform: translateX(6px); }
        }
      `}</style>
    </div>
  );
}
