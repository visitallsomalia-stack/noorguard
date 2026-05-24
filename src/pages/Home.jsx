import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getTodayCounts } from '../lib/supabase'

export default function Home() {
  const navigate = useNavigate()
  const [counts, setCounts] = useState({ total: 0 })
  const [pressed, setPressed] = useState(false)

  useEffect(() => {
    getTodayCounts().then(setCounts)
  }, [])

  function handlePanic() {
    setPressed(true)
    setTimeout(() => navigate('/shield'), 150)
  }

  return (
    <div className="min-h-dvh flex flex-col items-center justify-between px-6 py-10" style={{ background: 'var(--bg)' }}>

      {/* Header */}
      <div className="w-full flex items-center justify-between">
        <div>
          <p className="text-xs tracking-[0.3em] uppercase" style={{ color: 'var(--text-dim)' }}>نور</p>
          <p className="text-lg font-semibold" style={{ color: 'var(--gold)' }}>NoorGuard</p>
        </div>
        <button
          onClick={() => navigate('/solidarity')}
          className="flex flex-col items-center gap-1"
        >
          <div className="flex gap-1 text-sm">
            <span>💔</span><span>🤲</span><span>🛡️</span>
          </div>
          <span className="text-xs" style={{ color: 'var(--text-dim)' }}>
            {counts.total > 0 ? `${counts.total.toLocaleString()} today` : 'Community'}
          </span>
        </button>
      </div>

      {/* Main Panic Button */}
      <div className="flex flex-col items-center gap-8">
        <div className="text-center">
          <p className="text-sm tracking-widest uppercase mb-1" style={{ color: 'var(--text-dim)' }}>Tap when you need strength</p>
        </div>

        <button
          onClick={handlePanic}
          className={`panic-btn relative w-52 h-52 rounded-full flex flex-col items-center justify-center gap-2 transition-all duration-150 ${pressed ? 'scale-95' : 'scale-100'}`}
          style={{
            background: 'radial-gradient(circle at 40% 35%, #1A2800, #0A1500)',
            border: '2px solid var(--gold)',
            boxShadow: '0 0 40px rgba(201,168,76,0.15), inset 0 0 30px rgba(0,0,0,0.5)'
          }}
        >
          <div className="absolute inset-2 rounded-full" style={{
            border: '1px solid rgba(201,168,76,0.2)',
            background: 'transparent'
          }} />
          <span className="arabic text-3xl leading-none" style={{ color: 'var(--gold)' }}>حَصِّنِّي</span>
          <span className="text-xs tracking-wider" style={{ color: 'var(--text-dim)' }}>FORTIFY ME</span>
        </button>

        <p className="text-center text-xs max-w-xs leading-relaxed" style={{ color: 'var(--text-dim)' }}>
          "And whoever fears Allah — He will make a way out for him."
          <br /><span style={{ color: 'var(--gold-dim)' }}>At-Talaq 65:2</span>
        </p>
      </div>

      {/* Bottom Nav */}
      <div className="w-full grid grid-cols-3 gap-3">
        <NavBtn onClick={() => navigate('/breath')} icon="🌬️" label="Breathe" />
        <NavBtn onClick={() => navigate('/deeds')} icon="🤫" label="Secret Deed" />
        <NavBtn onClick={() => navigate('/solidarity')} icon="🤲" label="Ummah" />
      </div>
    </div>
  )
}

function NavBtn({ onClick, icon, label }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1.5 py-3 rounded-xl transition-all"
      style={{ background: 'var(--bg3)', border: '1px solid rgba(201,168,76,0.1)' }}
    >
      <span className="text-xl">{icon}</span>
      <span className="text-xs" style={{ color: 'var(--text-dim)' }}>{label}</span>
    </button>
  )
}
