import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { getRandomAyah } from '../lib/ayahs'

const EMOTIONS = [
  { key: 'all', label: 'Any' },
  { key: 'fear', label: 'I feel watched' },
  { key: 'guilt', label: 'I slipped' },
  { key: 'hope', label: 'I need strength' },
  { key: 'guard', label: 'I need a barrier' },
]

export default function Shield() {
  const navigate = useNavigate()
  const [ayah, setAyah] = useState(() => getRandomAyah())
  const [audioState, setAudioState] = useState('idle') // idle|loading|playing|done|error
  const [emotion, setEmotion] = useState('all')
  const [transitioning, setTransitioning] = useState(false)
  const audioRef = useRef(null)

  const playAudio = useCallback((url) => {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null }
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

  function changeAyah(newAyah) {
    setTransitioning(true)
    setTimeout(() => {
      setAyah(newAyah)
      setTransitioning(false)
      playAudio(newAyah.audioUrl)
    }, 300)
  }

  useEffect(() => {
    playAudio(ayah.audioUrl)
    return () => { if (audioRef.current) audioRef.current.pause() }
  }, [])

  // Shake detection
  useEffect(() => {
    let lastTime = 0, lastX = 0, lastY = 0, lastZ = 0
    function handleMotion(e) {
      const { x = 0, y = 0, z = 0 } = e.accelerationIncludingGravity || {}
      const now = Date.now()
      if (now - lastTime < 200) return
      const delta = Math.abs(x - lastX) + Math.abs(y - lastY) + Math.abs(z - lastZ)
      if (delta > 25) {
        lastTime = now
        changeAyah(getRandomAyah(ayah.id))
      }
      lastX = x; lastY = y; lastZ = z
    }
    window.addEventListener('devicemotion', handleMotion)
    return () => window.removeEventListener('devicemotion', handleMotion)
  }, [ayah])

  const themeMap = {
    watchful: '#C45050',
    guard: '#C9A84C',
    mercy: '#5AAA6A',
    strength: '#5A85C9',
  }
  const accentColor = themeMap[ayah.theme] || '#C9A84C'

  return (
    <div
      className="shield-screen min-h-dvh flex flex-col"
      style={{ background: 'var(--bg)' }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 pt-10 pb-4">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-sm"
          style={{ color: 'var(--text-dim)' }}
        >
          <span style={{ fontSize: 20 }}>‹</span> Back
        </button>

        {/* Audio indicator */}
        <div className="flex items-center gap-2">
          {audioState === 'playing' ? (
            <div className="flex items-end gap-0.5" style={{ height: 20 }}>
              {[...Array(5)].map((_, i) => (
                <div key={i} className="audio-bar" style={{ animationDelay: `${i * 0.12}s` }} />
              ))}
            </div>
          ) : audioState === 'loading' ? (
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--text-dim)', animation: `pulse-ring ${0.8 + i * 0.15}s ease-in-out infinite` }} />
              ))}
            </div>
          ) : audioState === 'error' ? (
            <span className="text-xs" style={{ color: 'var(--text-dim)' }}>No audio</span>
          ) : null}

          {audioState === 'done' && (
            <button
              onClick={() => playAudio(ayah.audioUrl)}
              className="text-xs px-3 py-1 rounded-full"
              style={{ color: 'var(--gold)', border: '1px solid rgba(201,168,76,0.3)' }}
            >
              ↺ Replay
            </button>
          )}
        </div>
      </div>

      {/* Emotion filter pills */}
      <div className="flex gap-2 px-5 pb-6 overflow-x-auto scrollbar-hide">
        {EMOTIONS.map(e => (
          <button
            key={e.key}
            onClick={() => {
              setEmotion(e.key)
              const next = e.key === 'all'
                ? getRandomAyah(ayah.id)
                : (require('../lib/ayahs').getAyahsByEmotion(e.key)[0] || getRandomAyah(ayah.id))
              changeAyah(next)
            }}
            className="whitespace-nowrap text-xs px-3 py-1.5 rounded-full transition-all"
            style={{
              background: emotion === e.key ? accentColor + '22' : 'var(--bg3)',
              border: `1px solid ${emotion === e.key ? accentColor + '88' : 'transparent'}`,
              color: emotion === e.key ? accentColor : 'var(--text-dim)',
              flexShrink: 0
            }}
          >
            {e.label}
          </button>
        ))}
      </div>

      {/* MAIN: Arabic verse — the hero */}
      <div
        className="flex-1 flex flex-col items-center justify-center px-6"
        style={{ opacity: transitioning ? 0 : 1, transition: 'opacity 0.3s ease' }}
      >
        {/* Ambient glow behind text */}
        <div className="absolute" style={{
          width: 300, height: 300,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${accentColor}08, transparent 70%)`,
          filter: 'blur(40px)',
          pointerEvents: 'none'
        }} />

        <div
          className={`arabic-quran text-center flicker ${audioState === 'playing' ? 'verse-playing' : ''}`}
          style={{
            color: 'var(--gold)',
            fontSize: ayah.arabic.length < 60 ? '2.4rem' : ayah.arabic.length < 120 ? '1.9rem' : '1.5rem',
            lineHeight: 2.4,
            textShadow: audioState === 'playing' ? `0 0 40px ${accentColor}60` : 'none',
            transition: 'text-shadow 1s ease, font-size 0.3s ease',
            maxWidth: '100%'
          }}
        >
          {ayah.arabic}
        </div>

        {/* Decorative divider */}
        <div className="flex items-center gap-3 my-6" style={{ width: '60%' }}>
          <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, transparent, ${accentColor}40)` }} />
          <div className="w-1 h-1 rounded-full" style={{ background: accentColor + '60' }} />
          <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${accentColor}40, transparent)` }} />
        </div>

        {/* Translation — secondary, smaller */}
        <p className="text-center leading-relaxed mb-1" style={{ color: 'var(--text-mid)', fontSize: '0.95rem', maxWidth: 320 }}>
          {ayah.translation}
        </p>
        <p className="text-xs tracking-widest" style={{ color: 'var(--text-dim) ' }}>
          {ayah.ref}
        </p>
      </div>

      {/* Bottom controls */}
      <div className="px-5 pb-10 pt-4 flex flex-col gap-3">
        <button
          onClick={() => changeAyah(getRandomAyah(ayah.id))}
          className="w-full py-3.5 rounded-2xl text-sm transition-all"
          style={{
            background: 'var(--bg3)',
            border: `1px solid ${accentColor}20`,
            color: 'var(--text-mid)'
          }}
        >
          Next Verse &nbsp;·&nbsp; <span style={{ color: 'var(--text-dim)', fontSize: '0.75rem' }}>or shake phone</span>
        </button>
      </div>
    </div>
  )
}
