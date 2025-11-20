import { useEffect, useState } from 'react';

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

const steps = [
  { id: 'm1', title: 'Define tu nicho' },
  { id: 'm2', title: 'Catálogo base' },
  { id: 'm3', title: 'Checkout y pagos' },
  { id: 'm4', title: 'Primera campaña' },
  { id: 'm5', title: 'Primeras ventas' },
];

export default function ProgressBoard() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Ensure milestones exist on first load
    fetch(`${API}/api/bootstrap`, { method: 'POST' }).catch(() => {});
  }, []);

  const ensurePlayer = async () => {
    if (!email || !name) return;
    await fetch(`${API}/api/player`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    });
    await loadSummary(email);
  };

  const loadSummary = async (e) => {
    const res = await fetch(`${API}/api/player/summary?email=${encodeURIComponent(e)}`);
    if (res.ok) {
      const data = await res.json();
      setSummary(data);
    }
  };

  const complete = async (milestoneId, speed='normal') => {
    if (!email) return;
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch(`${API}/api/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ player_email: email, milestone_id: milestoneId, speed, revenue_increase: milestoneId === 'm5' ? 1000 : 0 }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(data.message + (data.unlocked_world ? ` • Nuevo mundo: ${data.unlocked_world}` : ''));
        await loadSummary(email);
      } else {
        setMessage(data.detail || 'Error');
      }
    } finally {
      setLoading(false);
    }
  };

  const completed = new Set(summary?.completed_milestones || []);

  return (
    <section className="relative py-14">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 md:p-8">
          <div className="grid md:grid-cols-3 gap-6 items-start">
            <div className="md:col-span-1">
              <h2 className="text-white text-2xl font-semibold">Tu misión</h2>
              <p className="text-slate-300 text-sm mt-2">Regístrate, completa hitos y gana AV Coins por velocidad.</p>
              <div className="mt-4 grid gap-3">
                <input value={name} onChange={e=>setName(e.target.value)} placeholder="Nombre" className="bg-slate-900/60 border border-white/10 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-400/40" />
                <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="bg-slate-900/60 border border-white/10 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-400/40" />
                <button onClick={ensurePlayer} className="inline-flex justify-center items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-medium rounded-lg px-4 py-2 transition-colors">Comenzar</button>
              </div>

              {summary && (
                <div className="mt-6 text-slate-200 text-sm space-y-1">
                  <div>AV Coins: <span className="text-emerald-400 font-semibold">{summary.av_coins}</span></div>
                  <div>Revenue: <span className="text-emerald-400 font-semibold">${summary.revenue_usd?.toFixed(0)}</span></div>
                  <div>Mundos: {summary.unlocked_worlds?.length || 0}</div>
                </div>
              )}

              {message && <p className="mt-4 text-emerald-300 text-sm">{message}</p>}
            </div>

            <div className="md:col-span-2">
              <ol className="grid sm:grid-cols-2 gap-4">
                {steps.map((s, idx) => {
                  const isDone = completed.has(s.id);
                  return (
                    <li key={s.id} className={`rounded-xl border p-4 transition ${isDone ? 'border-emerald-400/40 bg-emerald-400/5' : 'border-white/10 bg-white/5'}`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-slate-200 text-sm opacity-70">Hito {idx+1}</p>
                          <h3 className="text-white font-medium">{s.title}</h3>
                        </div>
                        <span className={`h-2.5 w-2.5 rounded-full ${isDone ? 'bg-emerald-400' : 'bg-slate-500'}`}></span>
                      </div>
                      <div className="mt-4 flex items-center gap-2">
                        <button disabled={!email || isDone || loading} onClick={()=>complete(s.id, 'fast')} className="px-3 py-1.5 rounded-md bg-emerald-500 text-slate-900 text-sm disabled:opacity-50">Rápido (+150)</button>
                        <button disabled={!email || isDone || loading} onClick={()=>complete(s.id, 'normal')} className="px-3 py-1.5 rounded-md bg-white/10 text-white text-sm hover:bg-white/20 disabled:opacity-50">Normal (+130)</button>
                        <button disabled={!email || isDone || loading} onClick={()=>complete(s.id, 'slow')} className="px-3 py-1.5 rounded-md bg-white/10 text-white text-sm hover:bg-white/20 disabled:opacity-50">Tranquilo (+115)</button>
                      </div>
                    </li>
                  )
                })}
              </ol>

              {summary?.unlocked_worlds?.includes('world_1') && (
                <div className="mt-6 p-4 rounded-xl border border-violet-400/40 bg-violet-400/5">
                  <h4 className="text-white font-medium">Nuevo mundo desbloqueado</h4>
                  <p className="text-slate-300 text-sm mt-1">Has generado $1.000. Accede al mundo de aceleración con auditoría express y bundles de growth.</p>
                  <a href="#" className="inline-block mt-3 text-violet-300 hover:text-violet-200 text-sm underline">Quiero saber más</a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
