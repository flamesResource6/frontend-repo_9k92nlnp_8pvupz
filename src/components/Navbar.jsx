export default function Navbar(){
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur bg-slate-950/50 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 rounded-md bg-gradient-to-br from-white to-slate-400" />
          <span className="text-white font-medium tracking-tight">AMVISION</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
          <a className="hover:text-white" href="#">Misión</a>
          <a className="hover:text-white" href="#">Recompensas</a>
          <a className="hover:text-white" href="#">Soporte</a>
        </nav>
        <button className="text-xs px-3 py-1.5 rounded-md bg-white/10 text-white hover:bg-white/20">Entrar</button>
      </div>
    </header>
  )
}
