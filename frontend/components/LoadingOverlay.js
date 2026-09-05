'use client';

const BAR_HEIGHTS = [18, 32, 44, 32, 18];
const BAR_DELAYS = ['0s', '0.1s', '0.2s', '0.3s', '0.4s'];

export default function LoadingOverlay({ label = 'LOADING' }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-[#100e1a] via-[#1c1830] to-brand-600">
      <div className="flex flex-col items-center gap-5">
        <div className="flex h-12 items-end gap-1.5">
          {BAR_HEIGHTS.map((h, i) => (
            <span
              key={i}
              className="w-1.5 origin-bottom rounded-full bg-brand-100 animate-eq-bar"
              style={{ height: `${h}px`, animationDelay: BAR_DELAYS[i] }}
            />
          ))}
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">{label}</p>
      </div>
    </div>
  );
}
