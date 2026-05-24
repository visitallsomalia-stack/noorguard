import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getRandomDeed } from '../lib/ayahs'

export default function Deeds() {
  const navigate = useNavigate()
  const [deed, setDeed] = useState(() => getRandomDeed())
  const [done, setDone] = useState(false)
  const [streak, setStreak] = useState(() => parseInt(localStorage.getItem('ng_deed_streak') || '0'))

  function markDone() {
    const newStreak = streak + 1
    setStreak(newStreak)
    localStorage.setItem('ng_deed_streak', newStreak)
    localStorage.setItem('ng_last_deed', new Date().toISOString().split('T')[0])
    setDone(true)
  }

  function next() {
    setDeed(getRandomDeed())
    setDone(false)
  }

  return (
    <div className="min-h-dvh flex flex-col items-center justify-between px-6 py-12" style={{ background: 'var(--bg)' }}>
      <div className="w-full flex justify-between items-center">
        <button onClick={() => navigate('/')} style={{ color: 'var(--text-dim)' }} className="text-sm">← Back</button>
        <div className="flex items-center gap-2">
          <span className="text-xs" style={{ color: 'var(--text-dim)' }}>Secret Deeds</span>
          {streak > 0 && <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'var(--bg3)', color: 'var(--gold)', border: '1px solid rgba(201,168,76,0.3)' }}>×{streak}</span>}
        </div>
      </div>

      <div className="flex flex-col items-center gap-6 w-full max-w-sm">
        <div className="text-center">
          <p className="text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--text-dim)' }}>صَدَقَةُ السِّرِّ</p>
          <p className="text-sm" style={{ color: 'var(--text-dim)' }}>Charity of the Secret</p>
        </div>

        {/* Deed Card */}
        <div className="w-full rounded-2xl p-6 flex flex-col gap-4" style={{
          background: 'var(--bg3)',
          border: '1px solid rgba(201,168,76,0.15)',
          boxShadow: '0 0 40px rgba(0,0,0,0.3)'
        }}>
          <div className="text-4xl text-center">{deed.icon}</div>
          <p className="text-center text-sm leading-relaxed" style={{ color: 'var(--text)' }}>{deed.text}</p>
          <div className="pt-2 border-t" style={{ borderColor: 'rgba(201,168,76,0.1)' }}>
            <p className="text-xs text-center" style={{ color: 'var(--gold-dim)' }}>
              ✦ {deed.reward}
            </p>
          </div>
        </div>

        <p className="text-xs text-center" style={{ color: 'var(--text-dim)' }}>
          Only Allah knows what you do right now. This deed is yours and His alone.
        </p>
      </div>

      <div className="w-full flex flex-col gap-3">
        {!done ? (
          <button onClick={markDone} className="w-full py-4 rounded-xl font-medium transition-all" style={{
            background: 'linear-gradient(135deg, #1A2800, #2D4A00)',
            border: '1px solid rgba(201,168,76,0.4)',
            color: 'var(--gold)'
          }}>
            ✓ I did this deed — for Allah
          </button>
        ) : (
          <div className="text-center">
            <p className="text-base mb-3" style={{ color: 'var(--gold)' }}>🌿 Accepted, in sha Allah</p>
            <button onClick={next} className="w-full py-3.5 rounded-xl text-sm" style={{ background: 'var(--bg3)', color: 'var(--text)', border: '1px solid rgba(201,168,76,0.1)' }}>
              Another Secret Deed
            </button>
          </div>
        )}

        <button onClick={next} className="text-xs text-center py-2" style={{ color: 'var(--text-dim)' }}>
          ↻ Different deed
        </button>
      </div>
    </div>
  )
}
