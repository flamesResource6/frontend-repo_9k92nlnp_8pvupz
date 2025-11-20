import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Gradient overlay for readability, non-blocking */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/30 to-slate-950/80" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200 backdrop-blur">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Programa activo • Misión AMVISION 10K
          </div>
          <h1 className="mt-5 text-4xl md:text-6xl font-semibold tracking-tight text-white">
            Lanza tu tienda y desbloquea mundos
          </h1>
          <p className="mt-4 text-slate-300 md:text-lg">
            Avanza por hitos simples, gana AV Coins por velocidad y alcanza los primeros $1.000 para acceder al siguiente mundo.
          </p>
        </div>
      </div>
    </section>
  );
}
