'use client';

import { useState } from 'react';
import Link from 'next/link';
import PublicHeader from '../../components/PublicHeader';
import ProtectedRoute from '../../components/ProtectedRoute';
import LoadingOverlay from '../../components/LoadingOverlay';
import { notify } from '../../components/Toast';
import { api } from '../../lib/api';
import { getSession } from '../../lib/auth';
import { useDelayedLoading } from '../../lib/useDelayedLoading';

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  gender: 'MALE',
  mobileNumber: '',
  address: '',
  feedback: '',
};

const inputClass =
  'w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20';
const labelClass = 'mb-1.5 block text-sm font-semibold text-brand-900';

function ApplicationForm() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const showOverlay = useDelayedLoading(loading);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const session = getSession();
    try {
      await api.submitForm(form, session.accessToken);
      notify.success('Application submitted successfully!');
      setForm(initialForm);
    } catch (err) {
      notify.error(err.errors ? err.errors.join(', ') : err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {showOverlay && <LoadingOverlay />}
      <PublicHeader />
      <main className="min-h-[calc(100vh-73px)] bg-[#f6f4f8] px-6 py-16">
        <div className="mx-auto max-w-xl rounded-2xl border border-brand-100/40 bg-white p-9 shadow-card">
          <Link href="/" className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-brand-600">
            ← Back to Home
          </Link>
          <p className="mb-1 text-sm font-semibold text-brand-400">Application Form</p>
          <h1 className="mb-6 font-display text-2xl font-semibold text-brand-900">Submit your application</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>First Name</label>
                <input name="firstName" required value={form.firstName} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Last Name</label>
                <input name="lastName" required value={form.lastName} onChange={handleChange} className={inputClass} />
              </div>
            </div>
            <div>
              <label className={labelClass}>Email</label>
              <input type="email" name="email" required value={form.email} onChange={handleChange} className={inputClass} />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Gender</label>
                <select name="gender" value={form.gender} onChange={handleChange} className={inputClass}>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Mobile Number</label>
                <input
                  name="mobileNumber"
                  placeholder="0771234567"
                  required
                  value={form.mobileNumber}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <label className={labelClass}>Address</label>
              <input name="address" required value={form.address} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Feedback (optional)</label>
              <textarea name="feedback" rows={3} value={form.feedback} onChange={handleChange} className={inputClass} />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-brand-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'Submitting…' : 'Submit'}
            </button>
          </form>
        </div>
      </main>
    </>
  );
}

export default function ApplicationPage() {
  return (
    <ProtectedRoute role="CUSTOMER">
      <ApplicationForm />
    </ProtectedRoute>
  );
}
