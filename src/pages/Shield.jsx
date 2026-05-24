import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { getRandomAyah } from '../lib/ayahs'

export default function Shield() {
  const navigate = useNavigate()
  const [ayah, setAyah] = useState(() => getRandomAyah())
  const [audioState, setAudioState] = useState('loading') // loading | playing | done | error
  const [shaking, setShaking] = useState(false)
  const audioRef = useRef(null)

  const playAudio = useCallback((url) => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.src = ''
    }
    setAudioState('loading')
    const audio = new Audio(url)
    audioRef.current = audio
    audio.oncanplaythrough = () => {
      setAudioState('playing')
      audio.play().catch(() => setAudioState('error'))
    }
    audio.onended = () => setAudioState('done')
    audio.onerror = () => setAudioState('error')
    audio.load()
  }, [])

  useEffect(() => {
    playAudio(ayah.audioUrl)
    return () => { if (audioRef.current) audioRef.current.pause() }
  }, [ayah, playAudio])

  // Shake to change ayah
  useEffect(() => {
    let lastTime = 0
    let lastX = 0, lastY = 0, lastZ = 0

    function handleMotion(e) {
      const { x, y, z } = e.accelerationIncludingGravity || {}
      const now = Date.now()
      if (now - lastTime < 100) return
      const delta = Math.abs(x - lastX) + Math.abs(y - lastY) + Math.abs(z - lastZ)
      if (delta > 30) {
        setShaking(true)
        setTimeout(() => setShaking(false), 600)
        const next = getRandomAyah(ayah.id)
        setAyah(next)
        playAudio(next.audioUrl)
      }
      lastX = x; lastY = y; lastZ = z; lastTime = now
    }

    window.addEventListener('devicemotion', handleMotion)
    return () => window.removeEventListener('devicemotion', handleMotion)
  }, [ayah, playAudio])

  function handleNewAyah() {
    const next = getRandomAyah(ayah.id)
    setAyah(next)
    playAudio(next.audioUrl)
  }

  const themeColors = {
    watchful: { glow: 'rgba(255,100,100,0.08)', accent: '#FF6B6B' },
    guard: { glow: 'rgba(201,168,76,0.08)', accent: '#C9A84C' },
    mercy: { glow: 'rgba(100,200,100,0.08)', accent: '#6DC87A' },
    strength: { glow: 'rgba(100,150,255,0.08)', accent: '#6B9DFF' },
  }
  const theme = themeColors[ayah.theme] || themeColors.guard

  return (
    <div
      className={`shield-screen min-h-dvh flex flex-col items-center justify-between px-6 py-12 ${shaking ? 'opacity-0' : ''} transition-opacity duration-300`}
      style={{
        background: `radial-gradient(ellipse at 50% 30%, ${theme.glow}, var(--bg) 60%)`,
      }}
    >
      {/* Top */}
      <div className="w-full flex justify-between items-center">
        <button onClick={() => navigate('/')} style={{ color: 'var(--text-dim)' }} className="text-sm">
          ← Back
        </button>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full" style={{
            background: audioState === 'playing' ? '#6DC87A' : audioState === 'loading' ? theme.accent : 'var(--text-dim)',
            animation: audioState === 'playing' ? 'pulse-gold 1.5s infinite' : 'none'
          }} />
          <span className="text-xs" style={{ color: 'var(--text-dim)' }}>
            {audioState === 'loading' ? 'Loading recitation...' : audioState === 'playing' ? 'Playing' : audioState === 'error' ? 'No audio' : 'Done'}
          </span>
        </div>
      </div>

      {/* Ayah */}
      <div className="flex flex-col items-center gap-8 text-center max-w-sm">
        <div className="flicker">
          <p className="arabic text-4xl leading-loose" style={{ color: 'var(--gold)' }}>
            {ayah.arabic}
          </p>
        </div>

        <div className="w-16 h-px" style={{ background: `linear-gradient(90deg, transparent, ${theme.accent}, transparent)` }} />

        <div>
          <p className="text-base leading-relaxed mb-2" style={{ color: 'var(--text)' }}>
            {ayah.translation}
          </p>
          <p className="text-xs tracking-wider" style={{ color: 'var(--text-dim)' }}>
            {ayah.ref}
          </p>
        </div>
      </div>

      {/* Bottom */}
      <div className="w-full flex flex-col gap-3">
        <button
          onClick={handleNewAyah}
          className="w-full py-3.5 rounded-xl text-sm font-medium transition-all"
          style={{
            background: 'var(--bg3)',
            border: `1px solid ${theme.accent}33`,
            color: 'var(--text)'
          }}
        >
          🔄 Another Ayah (or shake phone)
        </button>

        <div className="text-center">
          <p className="text-xs" style={{ color: 'var(--text-dim)' }}>
            Tap the back button when you feel steady
          </p>
        </div>
      </div>
    </div>
  )
}
