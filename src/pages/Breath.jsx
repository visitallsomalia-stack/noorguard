import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const PHASES = [
  { name: 'Breathe In', duration: 4, scale: 1, dhikr: null },
  { name: 'Hold', duration: 2, scale: 1, dhikr: null },
  { name: 'Breathe Out', duration: 4, scale: 0.35, dhikr: 'أَسْتَغْفِرُ اللَّهَ' },
  { name: 'Rest', duration: 2, scale: 0.35, dhikr: null },
]

const FINAL_AYAH = {
  arabic: "إِنَّ اللَّهَ غَفُورٌ رَّحِيمٌ",
  translation: "Indeed, Allah is Forgiving, Merciful.",
  ref: "Al-Baqarah 2:173"
}

export default function Breath() {
  const navigate = useNavigate()
  const [running, setRunning] = useState(false)
  const [phase, setPhase] = useState(0)
  const [tick, setTick] = useState(0)
  const [count, setCount] = useState(0) // exhales done
  const [done, setDone] = useState(false)
  const [progress, setProgress] = useState(0)
  const intervalRef = useRef(null)
  const phaseTimerRef = useRef(null)
  const TARGET = 7

  function start() {
    setRunning(true)
    setDone(false)
    setCount(0)
    setPhase(0)
    setTick(PHASES[0].duration)
    setProgress(0)
  }

  useEffect(() => {
    if (!running) return

    const currentPhase = PHASES[phase]
    let elapsed = 0

    intervalRef.current = setInterval(() => {
      elapsed += 0.1
      setProgress(elapsed / currentPhase.duration)
      setTick(Math.ceil(currentPhase.duration - elapsed))
    }, 100)

    phaseTimerRef.current = setTimeout(() => {
      clearInterval(intervalRef.current)
      const nextPhase = (phase + 1) % PHASES.length
      setPhase(nextPhase)
      setProgress(0)
      setTick(PHASES[nextPhase].duration)

      // Count completed exhale cycles (phase 2 = breathe out)
      if (nextPhase === 3) {
        setCount(c => {
          const newCount = c + 1
          if (newCount >= TARGET) {
            setTimeout(() => {
              setRunning(false)
              setDone(true)
            }, PHASES[3].duration * 1000)
          }
          return newCount
        })
      }
    }, currentPhase.duration * 1000)

    return () => {
      clearInterval(intervalRef.current)
      clearTimeout(phaseTimerRef.current)
    }
  }, [running, phase])

  const currentPhase = PHASES[phase]
  const circleSize = 180
  const minScale = 0.35

  return (
    <div className="min-h-dvh flex flex-col items-center justify-between px-6 py-12" style={{ background: 'var(--bg)' }}>
      <div className="w-full flex justify-between items-center">
        <button onClick={() => navigate('/')} style={{ color: 'var(--text-dim)' }} className="text-sm">← Back</button>
        <span className="text-sm" style={{ color: 'var(--text-dim)' }}>Istighfar Breath</span>
      </div>

      {done ? (
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="text-5xl">🌿</div>
          <p className="text-lg font-medium" style={{ color: 'var(--gold)' }}>Astaghfirullah — 7 times</p>
          <div className="p-6 rounded-2xl" style={{ background: 'var(--bg3)', border: '1px solid rgba(201,168,76,0.1)' }}>
            <p className="arabic text-2xl mb-3" style={{ color: 'var(--gold)' }}>{FINAL_AYAH.arabic}</p>
            <p className="text-sm" style={{ color: 'var(--text)' }}>{FINAL_AYAH.translation}</p>
            <p className="text-xs mt-2" style={{ color: 'var(--text-dim)' }}>{FINAL_AYAH.ref}</p>
          </div>
          <button onClick={() => navigate('/')} className="py-3 px-8 rounded-xl text-sm" style={{ background: 'var(--bg3)', color: 'var(--text)', border: '1px solid rgba(201,168,76,0.2)' }}>
            Return Home
          </button>
        </div>
      ) : !running ? (
        <div className="flex flex-col items-center gap-6 text-center">
          <p className="text-2xl font-light" style={{ color: 'var(--text)' }}>Istighfar Breath</p>
          <p className="text-sm max-w-xs leading-relaxed" style={{ color: 'var(--text-dim)' }}>
            7 breath cycles tied to Astaghfirullah. Each exhale is a seeking of forgiveness. Let your body and soul reset together.
          </p>
          <button onClick={start} className="py-4 px-12 rounded-full text-sm font-medium transition-all" style={{ background: 'var(--bg3)', border: '1px solid var(--gold)', color: 'var(--gold)' }}>
            Begin
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-8">
          {/* Breathing Circle */}
          <div className="relative flex items-center justify-center" style={{ width: circleSize + 60, height: circleSize + 60 }}>
            {/* Outer glow ring */}
            <div className="absolute inset-0 rounded-full" style={{
              border: '1px solid rgba(201,168,76,0.1)',
              transform: `scale(${minScale + (1 - minScale) * (currentPhase.scale === 1 ? progress : 1 - progress)})`,
              transition: 'transform 0.1s linear'
            }} />

            {/* Main circle */}
            <div
              className="rounded-full flex flex-col items-center justify-center gap-1 transition-all"
              style={{
                width: circleSize,
                height: circleSize,
                background: 'radial-gradient(circle, rgba(201,168,76,0.15) 0%, transparent 70%)',
                border: '2px solid rgba(201,168,76,0.4)',
                transform: `scale(${currentPhase.scale === 1 ?
                  minScale + (1 - minScale) * progress :
                  1 - (1 - minScale) * progress})`,
                transition: 'transform 0.1s linear',
                boxShadow: '0 0 30px rgba(201,168,76,0.1)'
              }}
            >
              {currentPhase.dhikr && (
                <p className="arabic text-base text-center px-4" style={{ color: 'var(--gold)' }}>
                  {currentPhase.dhikr}
                </p>
              )}
              <p className="text-3xl font-light" style={{ color: 'var(--text)' }}>{tick}</p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-xl font-light mb-1" style={{ color: 'var(--text)' }}>{currentPhase.name}</p>
            <p className="text-xs" style={{ color: 'var(--text-dim)' }}>{count}/{TARGET} completed</p>
          </div>

          {/* Progress dots */}
          <div className="flex gap-2">
            {Array.from({ length: TARGET }).map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full transition-all" style={{
                background: i < count ? 'var(--gold)' : 'var(--bg3)',
                border: '1px solid rgba(201,168,76,0.3)'
              }} />
            ))}
          </div>
        </div>
      )}

      <div className="h-12" />
    </div>
  )
}
