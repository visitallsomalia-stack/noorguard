import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { getTodayCounts } from '../lib/supabase'

export default function Home() {
  const navigate = useNavigate()
  const [counts, setCounts] = useState({ total: 0 })
  const [pressed, setPressed] = useState(false)
  const tapCount = useRef(0)
  const tapTimer = useRef(null)

  useEffect(() => {
    getTodayCounts().then(setCounts)
  }, [])

  // Double-tap top-left corner → stealth calculator
  function handleLogoTap() {
    tapCount.current += 1
    if (tapTimer.current) clearTimeout(tapTimer.current)
    tapTimer.current = setTimeout(() => { tapCount.current = 0 }, 400)
    if (tapCount.current >= 2) {
      tapCount.current = 0
      navigate('/stealth')
    }
  }

  function handlePanic() {
    setPressed(true)
    setTimeout(() => navigate('/shield'), 120)
  }

  return (
    <div
      className="min-h-dvh flex flex-col"
      style={{ background: 'var(--bg)' }}
    >
      {/* Status bar area */}
      <div className="flex items-center justify-between px-5 pt-10 pb-2">
        {/* Logo — double tap = stealth */}
        <button onClick={handleLogoTap} className="text-left select-none">
          <p className="arabic-quran text-xl" style={{ color: 'var(--gold)', lineHeight: 1 }}>نور</p>
          <p className="text-xs tracking-[0.2em]" style={{ color: 'var(--text-dim)' }}>NOORGUARD</p>
        </button>

        <button
          onClick={() => navigate('/solidarity')}
          className="flex flex-col items-center gap-1"
        >
          <div className="flex gap-1 text-sm">💔 🤲 🛡️</div>
          <span className="text-xs" style={{ color: 'var(--text-dim)' }}>
            {counts.total > 0 ? `${counts.total.toLocaleString()} today` : 'Ummah'}
          </span>
        </button>
      </div>

      {/* Spacer */}
      <div className="flex-1 flex flex-col items-center justify-center gap-10 px-6">

        {/* Greeting */}
        <div className="text-center">
          <p className="text-sm" style={{ color: 'var(--text-dim)' }}>
            {getGreeting()}
          </p>
        </div>

        {/* Panic Button */}
        <div className="relative flex items-center justify-center">
          {/* Outer pulse rings */}
          <div className="absolute w-64 h-64 rounded-full" style={{
            border: '1px solid rgba(201,168,76,0.08)',
            animation: 'pulse-ring 3s ease-in-out infinite'
          }} />
          <div className="absolute w-72 h-72 rounded-full" style={{
            border: '1px solid rgba(201,168,76,0.04)',
            animation: 'pulse-ring 3s ease-in-out infinite',
            animationDelay: '0.5s'
          }} />

          <button
            onClick={handlePanic}
            className={`panic-btn relative w-52 h-52 rounded-full flex flex-col items-center justify-center gap-3 transition-all duration-100 ${pressed ? 'scale-90' : 'scale-100'}`}
            style={{
              background: 'radial-gradient(circle at 40% 35%, #1C2E00, #0A1500 70%)',
              border: '1.5px solid rgba(201,168,76,0.5)',
              boxShadow: '0 0 60px rgba(201,168,76,0.08), inset 0 0 40px rgba(0,0,0,0.6)'
            }}
          >
            {/* Inner ring */}
            <div className="absolute inset-3 rounded-full" style={{
              border: '1px solid rgba(201,168,76,0.12)'
            }} />

            <span
              className="arabic-quran shimmer-text select-none"
              style={{ fontSize: '2rem', lineHeight: 1 }}
            >
              حَصِّنِّي
            </span>
            <span className="text-xs tracking-[0.25em] select-none" style={{ color: 'rgba(201,168,76,0.5)' }}>
              FORTIFY ME
            </span>
          </button>
        </div>

        <p className="text-center text-xs leading-loose max-w-xs" style={{ color: 'var(--text-dim)' }}>
          "Whoever fears Allah — He will make a way out for him."
          <br />
          <span style={{ color: 'var(--gold-dim)' }}>At-Talaq 65:2</span>
        </p>
      </div>

      {/* Bottom Nav */}
      <div className="grid grid-cols-3 gap-3 px-5 pb-10">
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
      className="flex flex-col items-center gap-2 py-4 rounded-2xl transition-all active:scale-95"
      style={{
        background: 'var(--bg3)',
        border: '1px solid rgba(201,168,76,0.07)'
      }}
    >
      <span style={{ fontSize: '1.4rem' }}>{icon}</span>
      <span className="text-xs" style={{ color: 'var(--text-dim)' }}>{label}</span>
    </button>
  )
}

function getGreeting() {
  const h = new Date().getHours()
  if (h < 5) return 'The night watches you, and Allah watches over you.'
  if (h < 12) return 'A new day — a clean slate. bismillah.'
  if (h < 17) return 'Stay firm. The afternoon is long.'
  if (h < 20) return 'Evening. Guard yourself now.'
  return 'The night is when battles are won or lost.'
}
