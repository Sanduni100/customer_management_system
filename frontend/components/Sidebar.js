'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSession, clearSession } from '../lib/auth';

export default function Sidebar() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  useEffect(() => {
    const session = getSession();
    setEmail(session?.user?.email || '');
  }, []);

  function handleLogout() {
    clearSession();
    router.push('/admin/login');
  }

  return (
    <aside className="flex w-60 shrink-0 flex-col bg-[#252140] px-4 py-6 text-white">
      <Link href="/" className="mb-7 flex items-center gap-2.5 px-1 font-display font-semibold hover:opacity-80">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-600 to-brand-400 text-sm font-bold">
          E
        </span>
        Evotec Forms
      </Link>

      <div className="mb-1 px-2 text-xs font-semibold tracking-wide text-white/40">Overview</div>
      <button className="mb-4 flex w-full items-center gap-2.5 rounded-lg bg-brand-600 px-3 py-2.5 text-left text-sm font-medium text-white">
        <span>📊</span> Dashboard
      </button>

      <div className="mb-1 px-2 text-xs font-semibold tracking-wide text-white/40">Account</div>
      <button
        onClick={handleLogout}
        className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-white/60 hover:bg-white/5 hover:text-white"
      >
        <span>🚪</span> Logout
      </button>

      <div className="mt-auto border-t border-white/10 pt-4">
        <div className="text-xs text-white/40">Signed in as</div>
        <div className="break-all text-sm text-white">{email}</div>
      </div>
    </aside>
  );
}
