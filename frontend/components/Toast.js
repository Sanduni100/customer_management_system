'use client';

import toast from 'react-hot-toast';

const DURATION_MS = 4000;
const TOAST_ID = 'app-toast'; 

const ICONS = {
  success: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
      <path
        fillRule="evenodd"
        d="M16.7 5.3a1 1 0 010 1.4l-7.4 7.4a1 1 0 01-1.4 0L3.3 9.5a1 1 0 111.4-1.4l3.6 3.6 6.7-6.7a1 1 0 011.4 0z"
        clipRule="evenodd"
      />
    </svg>
  ),
  error: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v4a1 1 0 102 0V7zm-1 8a1.1 1.1 0 100-2.2 1.1 1.1 0 000 2.2z"
        clipRule="evenodd"
      />
    </svg>
  ),
};

const THEME = {
  success: { iconBg: 'bg-emerald-500', bar: 'bg-emerald-500' },
  error: { iconBg: 'bg-red-500', bar: 'bg-red-500' },
};

function ToastCard({ t, type, message, nonce }) {
  const theme = THEME[type];

  return (
    <div
      className={`pointer-events-auto relative w-80 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black/5 transition-opacity duration-200 ${
        t.visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="flex items-start gap-3 p-4 pr-8">
        <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white ${theme.iconBg}`}>
          {ICONS[type]}
        </span>
        <p className="text-sm leading-snug text-gray-700">{message}</p>
        <button
          onClick={() => toast.dismiss(t.id)}
          className="absolute right-2.5 top-2.5 text-gray-300 hover:text-gray-500"
          aria-label="Dismiss"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>
      </div>
      {/* keyed on nonce so the shrink animation restarts every time this toast is re-triggered */}
      <div key={nonce} className="h-1 w-full bg-gray-100">
        <div
          className={`h-full ${theme.bar} animate-toast-bar`}
          style={{ animationDuration: `${DURATION_MS}ms` }}
        />
      </div>
    </div>
  );
}

export const notify = {
  success: (message) =>
    toast.custom((t) => <ToastCard t={t} type="success" message={message} nonce={t.createdAt} />, {
      id: TOAST_ID,
      duration: DURATION_MS,
    }),
  error: (message) =>
    toast.custom((t) => <ToastCard t={t} type="error" message={message} nonce={t.createdAt} />, {
      id: TOAST_ID,
      duration: DURATION_MS,
    }),
};
