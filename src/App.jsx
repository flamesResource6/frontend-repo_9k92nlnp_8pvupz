import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProgressBoard from './components/ProgressBoard';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <Navbar />
      <Hero />
      <ProgressBoard />
      <footer className="py-10 text-center text-slate-400 text-xs">© 2025 AMVISION • Misión 10K</footer>
    </div>
  )
}

export default App
