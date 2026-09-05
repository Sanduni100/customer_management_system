const STORAGE_KEY = 'evotec_session';

export function saveSession({ accessToken, refreshToken, user }) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ accessToken, refreshToken, user }));
}

export function getSession() {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function clearSession() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

export function isRole(role) {
  const session = getSession();
  return !!session && session.user?.role === role;
}
