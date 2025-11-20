import React from 'react';

export default function Rocket({ progress = 0, coins = 0, revenue = 0 }) {
  const pct = Math.max(0, Math.min(1, progress));
  const fuelHeight = Math.round(pct * 100);
  const isLaunched = pct >= 1;

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative w-44 h-72">
        {/* Fuel tank behind rocket */}
        <div className="absolute inset-x-1/2 -translate-x-1/2 bottom-0 w-5 h-60 rounded-lg border border-white/10 bg-slate-900/60 overflow-hidden">
          <div
            className={`absolute bottom-0 left-0 right-0 transition-all duration-700 ${isLaunched ? 'bg-gradient-to-t from-emerald-400 via-emerald-300 to-amber-200' : 'bg-gradient-to-t from-emerald-500/90 via-emerald-400/80 to-emerald-300/70'}`}
            style={{ height: `${fuelHeight}%` }}
          />
          <div className="absolute top-1 left-1 right-1 text-[10px] text-center text-slate-400">FUEL</div>
        </div>

        {/* Rocket body (simple SVG) */}
        <svg className="absolute inset-x-0 bottom-6 mx-auto" width="140" height="220" viewBox="0 0 140 220" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Shadow */}
          <ellipse cx="70" cy="210" rx="36" ry="6" fill="#0F172A" opacity="0.6" />
          {/* Body */}
          <path d="M70 10C98 36 110 80 110 130V168H30V130C30 80 42 36 70 10Z" fill="url(#grad-body)" stroke="rgba(255,255,255,0.1)" />
          {/* Window */}
          <circle cx="70" cy="92" r="14" fill="#0EA5E9" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
          {/* Fins */}
          <path d="M30 150L10 170H30V150Z" fill="#94A3B8" opacity="0.9" />
          <path d="M110 150L130 170H110V150Z" fill="#94A3B8" opacity="0.9" />
          {/* Engine */}
          <rect x="56" y="168" width="28" height="16" rx="4" fill="#334155" />
          {/* Flame */}
          <g className={`${pct > 0 ? 'animate-pulse' : ''}`}>
            <path d="M70 200C86 190 84 178 70 168C56 178 54 190 70 200Z" fill="url(#grad-flame)" opacity={pct > 0 ? 0.95 : 0} />
          </g>
          {/* Thruster glow */}
          <ellipse cx="70" cy="188" rx="12" ry="6" fill="#f59e0b" opacity={pct > 0 ? 0.5 : 0} />

          <defs>
            <linearGradient id="grad-body" x1="70" y1="10" x2="70" y2="168" gradientUnits="userSpaceOnUse">
              <stop stopColor="#e2e8f0" />
              <stop offset="1" stopColor="#94a3b8" />
            </linearGradient>
            <linearGradient id="grad-flame" x1="70" y1="168" x2="70" y2="200" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fb923c" />
              <stop offset="1" stopColor="#fde68a" />
            </linearGradient>
          </defs>
        </svg>

        {/* HUD badges */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-center">
          <div className="text-xs text-slate-300">Progreso</div>
          <div className="text-2xl font-semibold text-white">{Math.round(pct * 100)}%</div>
        </div>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-3">
          <div className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] text-emerald-300">{coins} AVC</div>
          <div className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] text-emerald-300">${revenue?.toFixed?.(0) ?? 0}</div>
        </div>
      </div>
    </div>
  );
}
