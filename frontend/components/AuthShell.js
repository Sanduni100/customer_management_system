'use client';

import Link from 'next/link';

export default function AuthShell({ eyebrow, title, description, children }) {
  return (
    <main className="flex min-h-[calc(100vh-77px)] w-full flex-col md:flex-row">
        <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-gradient-to-br from-[#100e1a] via-brand-700 to-brand-500 p-12 text-white md:flex">
          <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-40 rotate-12 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute -bottom-24 -left-10 h-80 w-44 rotate-12 rounded-full bg-white/5" />

          <div className="relative flex items-center justify-between">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 font-display font-bold backdrop-blur">
              E
            </span>
            <Link
              href="/"
              className="flex items-center gap-1.5 text-sm font-medium text-white/60 hover:text-white"
            >
              ← Back to Home
            </Link>
          </div>

          <div className="relative">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand-100">{eyebrow}</p>
            <h2 className="font-display text-3xl font-semibold leading-snug">{title}</h2>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/60">{description}</p>
          </div>

          <p className="relative text-xs text-white/30">Evotec Forms</p>
        </div>

        <div className="flex w-full items-center justify-center bg-white px-6 py-12 md:w-1/2 md:px-16">
          <div className="w-full max-w-sm">
            <Link
              href="/"
              className="mb-6 flex items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-brand-600 md:hidden"
            >
              ← Back to Home
            </Link>
            {children}
          </div>
        </div>
      </main>
  );
}
