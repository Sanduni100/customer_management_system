import Link from 'next/link';
import PublicHeader from '../components/PublicHeader';

export default function HomePage() {
  return (
    <>
      <PublicHeader />

      <main className="relative overflow-hidden bg-[#100e1a]">
        <div className="pointer-events-none absolute -right-24 top-0 h-full w-1/2 opacity-90">
          <div className="absolute right-10 top-16 h-72 w-40 rotate-12 rounded-full bg-gradient-to-b from-brand-400 to-brand-600 blur-0" />
          <div className="absolute right-40 top-40 h-96 w-40 rotate-12 rounded-full bg-gradient-to-b from-brand-200 to-brand-500" />
          <div className="absolute right-64 top-72 h-80 w-36 rotate-12 rounded-full bg-gradient-to-b from-brand-100 to-brand-400" />
        </div>

        <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-20 md:grid-cols-2 md:py-28 md:px-10">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-200">
              Form Management, Simplified
            </p>
            <h1 className="font-display text-4xl font-semibold leading-tight text-white md:text-5xl">
              One place to apply,
              <br /> and to manage it all.
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-white/60">
              Customers register, sign in, and submit their application in a couple of
              minutes. Admins get a dashboard to review, edit, filter, and search every
              submission that comes in — no spreadsheets required.
            </p>

            <div className="mt-5 flex gap-2">
              <span className="h-2 w-2 rounded-full bg-white/80" />
              <span className="h-2 w-2 rounded-full bg-white/30" />
              <span className="h-2 w-2 rounded-full bg-white/30" />
              <span className="h-2 w-2 rounded-full bg-white/30" />
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/register"
                className="rounded-full border border-white/70 px-7 py-3 text-sm font-semibold text-white hover:bg-white hover:text-[#100e1a] transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>

          <div className="hidden md:block" />
        </div>

        <div className="relative border-t border-white/10 px-6 py-6 md:px-10">
          <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-4 text-sm text-white/40">
            <span>© {new Date().getFullYear()} Evotec Forms</span>
            <div className="flex gap-6">
              <Link href="/login" className="hover:text-white/70">Customer Login</Link>
              <Link href="/register" className="hover:text-white/70">Register</Link>
              <Link href="/admin/login" className="hover:text-white/70">Admin Login</Link>
            </div>
          </div>
        </div>
      </main>

      <div className="relative -mb-px bg-[#100e1a]">
        <svg
          viewBox="0 0 1440 90"
          preserveAspectRatio="none"
          className="block h-14 w-full md:h-20"
        >
          <path d="M0,40 C320,90 1120,0 1440,45 L1440,90 L0,90 Z" fill="#f6f4f8" />
        </svg>
      </div>

      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-6 bg-[#f6f4f8] px-6 pb-16 pt-2 md:grid-cols-3 md:px-10">
        <div className="rounded-2xl border border-brand-100/40 bg-white p-7 shadow-card">
          <h3 className="mb-2 font-display text-lg font-semibold text-brand-900">Register &amp; apply</h3>
          <p className="text-sm leading-relaxed text-gray-500">
            Create an account and submit your application form in one guided flow.
          </p>
        </div>
        <div className="rounded-2xl border border-brand-100/40 bg-white p-7 shadow-card">
          <h3 className="mb-2 font-display text-lg font-semibold text-brand-900">Role-based access</h3>
          <p className="text-sm leading-relaxed text-gray-500">
            Customers and admins sign in separately, each seeing only what they need.
          </p>
        </div>
        <div className="rounded-2xl border border-brand-100/40 bg-white p-7 shadow-card">
          <h3 className="mb-2 font-display text-lg font-semibold text-brand-900">Built-in review tools</h3>
          <p className="text-sm leading-relaxed text-gray-500">
            Admins can filter by gender and search by name across every submission.
          </p>
        </div>
      </section>
    </>
  );
}
