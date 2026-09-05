'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSession, clearSession } from '../lib/auth';

export default function PublicHeader() {
  const router = useRouter();
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(getSession());
  }, []);

  function handleLogout() {
    clearSession();
    setSession(null);
    router.push('/');
  }

  return (
    <>
      <header className="flex items-center justify-between border-b border-white/10 bg-[#100e1a] px-6 py-4 md:px-10">
      <Link href="/" className="flex items-center gap-2.5 font-display font-semibold text-lg text-white">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand-600 to-brand-400 font-display font-bold text-white">
          E
        </span>
        Evotec Forms
      </Link>

      <nav className="flex items-center gap-6">
        {!session && (
          <>
            <Link href="/login" className="hidden sm:block text-sm font-medium text-white/60 hover:text-white">
              Customer Login
            </Link>
            <Link href="/admin/login" className="hidden sm:block text-sm font-medium text-white/60 hover:text-white">
              Admin Login
            </Link>
            <Link
              href="/register"
              className="rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700 transition-colors"
            >
              Register
            </Link>
          </>
        )}
        {session?.user?.role === 'CUSTOMER' && (
          <>
            <Link href="/application" className="text-sm font-medium text-white/60 hover:text-white">
              Application
            </Link>
            <button
              onClick={handleLogout}
              className="rounded-full border border-white/20 px-4 py-1.5 text-sm font-medium text-white/80 hover:border-white/50 hover:text-white"
            >
              Logout
            </button>
          </>
        )}
        {session?.user?.role === 'ADMIN' && (
          <>
            <Link href="/admin/dashboard" className="text-sm font-medium text-white/60 hover:text-white">
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="rounded-full border border-white/20 px-4 py-1.5 text-sm font-medium text-white/80 hover:border-white/50 hover:text-white"
            >
              Logout
            </button>
          </>
        )}
      </nav>
      </header>
      <div className="h-1 w-full bg-gradient-to-r from-brand-600 via-brand-400 to-brand-100" />
    </>
  );
}
