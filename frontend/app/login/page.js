'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PublicHeader from '../../components/PublicHeader';
import AuthShell from '../../components/AuthShell';
import LoadingOverlay from '../../components/LoadingOverlay';
import { notify } from '../../components/Toast';
import { api } from '../../lib/api';
import { saveSession } from '../../lib/auth';
import { useDelayedLoading } from '../../lib/useDelayedLoading';

const inputClass =
  'w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20';
const labelClass = 'mb-1.5 block text-sm font-semibold text-brand-900';

export default function CustomerLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const showOverlay = useDelayedLoading(loading);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await api.loginCustomer(form);
      saveSession(data);
      notify.success('Welcome back!');
      router.push('/application');
    } catch (err) {
      notify.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {showOverlay && <LoadingOverlay />}
      <PublicHeader />
      <AuthShell
        eyebrow="Welcome Back"
        title="Good to see you again"
        description="Sign in to pick up right where you left off with your application."
      >
        <p className="mb-1 text-sm font-semibold text-brand-400">Welcome back</p>
        <h1 className="mb-6 font-display text-2xl font-semibold text-brand-900">Customer login</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={labelClass}>Email</label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Password</label>
            <input
              type="password"
              name="password"
              required
              value={form.password}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-brand-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Logging in…' : 'Login'}
          </button>
        </form>

        <p className="mt-5 text-sm text-gray-500">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="font-medium text-brand-600 hover:underline">
            Register
          </Link>
        </p>
      </AuthShell>
    </>
  );
}
