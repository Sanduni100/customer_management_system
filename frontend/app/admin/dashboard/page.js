'use client';

import { useEffect, useState, useCallback } from 'react';
import { notify } from '../../../components/Toast';
import ProtectedRoute from '../../../components/ProtectedRoute';
import Sidebar from '../../../components/Sidebar';
import { api } from '../../../lib/api';
import { getSession } from '../../../lib/auth';

const inputClass =
  'w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20';
const labelClass = 'mb-1.5 block text-sm font-semibold text-brand-900';

function genderBadgeClass(gender) {
  if (gender === 'MALE') return 'bg-blue-50 text-blue-700';
  if (gender === 'FEMALE') return 'bg-pink-50 text-pink-700';
  return 'bg-purple-50 text-purple-700';
}

function EditModal({ submission, onClose, onSaved }) {
  const [form, setForm] = useState({ ...submission });
  const [saving, setSaving] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSave() {
    setSaving(true);
    const session = getSession();
    try {
      const { submission: updated } = await api.updateSubmission(
        submission.id,
        {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          gender: form.gender,
          mobileNumber: form.mobileNumber,
          address: form.address,
          feedback: form.feedback,
        },
        session.accessToken
      );
      notify.success('Submission updated');
      onSaved(updated);
    } catch (err) {
      notify.error(err.errors ? err.errors.join(', ') : err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4">
      <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-7 shadow-2xl">
        <p className="mb-1 text-sm font-semibold text-brand-400">Submission #{submission.id}</p>
        <h2 className="mb-5 font-display text-lg font-semibold text-brand-900">Edit details</h2>

        <div className="space-y-3.5">
          <div>
            <label className={labelClass}>First Name</label>
            <input name="firstName" value={form.firstName} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Last Name</label>
            <input name="lastName" value={form.lastName} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Email</label>
            <input name="email" value={form.email} onChange={handleChange} className={inputClass} />
          </div>
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
            <input name="mobileNumber" value={form.mobileNumber} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Address</label>
            <input name="address" value={form.address} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Feedback</label>
            <textarea name="feedback" rows={3} value={form.feedback || ''} onChange={handleChange} className={inputClass} />
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-50"
          >
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
          <button
            onClick={onClose}
            disabled={saving}
            className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-semibold text-brand-600 hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function CreateAdminModal({ onClose }) {
  const [email, setEmail] = useState('');
  const [creating, setCreating] = useState(false);
  const [result, setResult] = useState(null); 
  const [copied, setCopied] = useState(false);

  async function handleCreate(e) {
    e.preventDefault();
    setCreating(true);
    const session = getSession();
    try {
      const data = await api.createAdmin({ email }, session.accessToken);
      setResult(data);
      notify.success('Admin account created');
    } catch (err) {
      notify.error(err.message);
    } finally {
      setCreating(false);
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(result.generatedPassword);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-7 shadow-2xl">
        <p className="mb-1 text-sm font-semibold text-brand-400">Admin Accounts</p>
        <h2 className="mb-5 font-display text-lg font-semibold text-brand-900">Create a new admin</h2>

        {!result ? (
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className={labelClass}>Admin Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                placeholder="newadmin@evotec.software"
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={creating}
                className="rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-50"
              >
                {creating ? 'Creating…' : 'Create Admin'}
              </button>
              <button
                type="button"
                onClick={onClose}
                disabled={creating}
                className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-semibold text-brand-600 hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div>
            <p className="mb-4 text-sm text-gray-600">
              Account created for <span className="font-semibold text-brand-900">{result.admin.email}</span>.
              Save this password now — it won&apos;t be shown again.
            </p>
            <div className="mb-4 flex items-center justify-between gap-3 rounded-lg border border-brand-100 bg-brand-50/40 px-4 py-3">
              <code className="text-sm font-semibold tracking-wide text-brand-900">
                {result.generatedPassword}
              </code>
              <button
                onClick={handleCopy}
                className="shrink-0 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-brand-600 hover:border-brand-400"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <button
              onClick={onClose}
              className="w-full rounded-lg bg-brand-600 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Dashboard() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [gender, setGender] = useState('');
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState(null);
  const [creatingAdmin, setCreatingAdmin] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');

  useEffect(() => {
    const session = getSession();
    setAdminEmail(session?.user?.email || '');
  }, []);

  const fetchSubmissions = useCallback(async () => {
    setLoading(true);
    const session = getSession();
    try {
      const params = {};
      if (gender) params.gender = gender;
      if (search) params.search = search;
      const data = await api.getSubmissions(session.accessToken, params);
      setSubmissions(data.submissions);
    } catch (err) {
      notify.error(err.message);
    } finally {
      setLoading(false);
    }
  }, [gender, search]);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  async function handleDelete(id) {
    if (!confirm('Delete this submission?')) return;
    const session = getSession();
    try {
      await api.deleteSubmission(id, session.accessToken);
      setSubmissions((prev) => prev.filter((s) => s.id !== id));
      notify.success('Submission deleted');
    } catch (err) {
      notify.error(err.message);
    }
  }

  function handleSaved(updated) {
    setSubmissions((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
    setEditing(null);
  }

  const total = submissions.length;
  const maleCount = submissions.filter((s) => s.gender === 'MALE').length;
  const femaleCount = submissions.filter((s) => s.gender === 'FEMALE').length;
  const otherCount = submissions.filter((s) => s.gender === 'OTHER').length;

  const stats = [
    { label: 'Total Submissions', value: total, accent: 'before:bg-brand-600' },
    { label: 'Male', value: maleCount, accent: 'before:bg-blue-500' },
    { label: 'Female', value: femaleCount, accent: 'before:bg-pink-500' },
    { label: 'Other', value: otherCount, accent: 'before:bg-purple-500' },
  ];

  return (
    <div className="flex min-h-screen bg-[#f6f4f8]">
      <Sidebar />

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between border-b border-brand-100/40 bg-white px-8 py-4">
          <h1 className="font-display text-xl font-semibold text-brand-900">Dashboard</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCreatingAdmin(true)}
              className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
            >
              + Create Admin
            </button>
            <div className="flex items-center gap-2.5 text-sm text-gray-500">
              <span>{adminEmail}</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-sm font-semibold text-white">
                {adminEmail ? adminEmail[0].toUpperCase() : 'A'}
              </span>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className={`relative overflow-hidden rounded-xl border border-brand-100/40 bg-white p-5 shadow-card before:absolute before:left-0 before:top-0 before:h-full before:w-1 ${s.accent}`}
              >
                <div className="mb-2 text-sm font-medium text-gray-500">{s.label}</div>
                <div className="font-display text-2xl font-semibold text-brand-900">{s.value}</div>
              </div>
            ))}
          </div>

          <div className="mb-5 flex flex-wrap items-center gap-3">
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-sm focus:border-brand-500 focus:outline-none"
            >
              <option value="">All Genders</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
            <input
              placeholder="Search by first or last name…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="min-w-[220px] rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-sm focus:border-brand-500 focus:outline-none"
            />
            <button
              onClick={fetchSubmissions}
              className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-brand-600 hover:bg-gray-50"
            >
              Refresh
            </button>
          </div>

          <div className="overflow-hidden rounded-xl border border-brand-100/40 bg-white shadow-card">
            {loading ? (
              <p className="p-5 text-sm text-gray-500">Loading…</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#f1eaf1] text-xs font-semibold text-gray-500">
                    <tr>
                      <th className="px-4 py-3">ID</th>
                      <th className="px-4 py-3">Name</th>
                      <th className="px-4 py-3">Email</th>
                      <th className="px-4 py-3">Gender</th>
                      <th className="px-4 py-3">Mobile</th>
                      <th className="px-4 py-3">Address</th>
                      <th className="px-4 py-3">Created By</th>
                      <th className="px-4 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissions.length === 0 && (
                      <tr>
                        <td colSpan={8} className="px-4 py-8 text-center text-gray-400">
                          No submissions found.
                        </td>
                      </tr>
                    )}
                    {submissions.map((s) => (
                      <tr key={s.id} className="border-t border-gray-100 hover:bg-gray-50">
                        <td className="px-4 py-3">{s.id}</td>
                        <td className="px-4 py-3">
                          {s.firstName} {s.lastName}
                        </td>
                        <td className="px-4 py-3">{s.email}</td>
                        <td className="px-4 py-3">
                          <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${genderBadgeClass(s.gender)}`}>
                            {s.gender}
                          </span>
                        </td>
                        <td className="px-4 py-3">{s.mobileNumber}</td>
                        <td className="px-4 py-3">{s.address}</td>
                        <td className="px-4 py-3">{s.userCreated}</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button
                              onClick={() => setEditing(s)}
                              className="rounded-md border border-gray-200 px-2.5 py-1 text-xs font-medium text-brand-600 hover:border-brand-400"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(s.id)}
                              className="rounded-md border border-red-200 px-2.5 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {editing && (
        <EditModal submission={editing} onClose={() => setEditing(null)} onSaved={handleSaved} />
      )}
      {creatingAdmin && <CreateAdminModal onClose={() => setCreatingAdmin(false)} />}
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <ProtectedRoute role="ADMIN">
      <Dashboard />
    </ProtectedRoute>
  );
}
