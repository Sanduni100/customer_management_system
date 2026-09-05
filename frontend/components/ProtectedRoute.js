'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSession } from '../lib/auth';

export default function ProtectedRoute({ role, children }) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const session = getSession();
    if (!session || session.user?.role !== role) {
      router.replace(role === 'ADMIN' ? '/admin/login' : '/login');
      return;
    }
    setChecked(true);
  }, [role, router]);

  if (!checked) {
    return <p className="px-6 py-16 text-center text-sm text-gray-500">Checking access…</p>;
  }

  return children;
}
