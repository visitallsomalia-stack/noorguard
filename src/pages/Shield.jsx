import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { getRandomAyah, getAyahsByEmotion } from '../lib/ayahs'

const EMOTIONS = [
  { key: 'all',   label: 'Any verse' },
  { key: 'fear',  label: 'I feel watched' },
  { key: 'guilt', label: 'I slipped' },
  { key: 'hope',  label: 'I need strength' },
  { key: 'guard', label: 'I need a barrier' },
]

const THEME_COLORS = {
  watchful: '#C45050',
  guard:    '#C9A84C',
  mercy:    '#5AAA6A',
  strength: '#5A85C9',
}

export default function Shield() {
  const navigate = useNavigate()
  const [ayah, setAyah] = useState(() => getRandomAyah())
  const [emotion, setEmotion] = useState('all')
  const [audioState, setAudioState] = useState('loading') // loading | playing | done | error
  const [visible, setVisible] = useState(true)
  const audioRef = useRef(null)

  const accent = THEME_COLORS[ayah.theme] || '#C9A84C'

  // Play audio — always tied to current ayah.audioUrl
  function playAudio(url) {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.oncanplaythrough = null
      audioRef.current.onended = null
      audioRef.current.onerror = null
      audioRef.current = null
    }
    setAudioState('loading')
    const audio = new Audio()
    audio.crossOrigin = 'anonymous'
    audioRef.current = audio

    audio.oncanplaythrough = () => {
      setAudioState('playing')
      audio.play().catch(() => setAudioState('error'))
    }
    audio.onended = () => setAudioState('done')
    audio.onerror = () => setAudioState('error')
    audio.src = url
    audio.load()
  }

  // Change ayah with fade transition
  function switchAyah(next) {
    setVisible(false)
    setTimeout(() => {
      setAyah(next)
      setVisible(true)
      playAudio(next.audioUrl)
    }, 250)
  }

  function handleNextAyah() {
    let pool = emotion === 'all' ? null : getAyahsByEmotion(emotion)
    let candidates = pool ? pool.filter(a => a.id !== ayah.id) : null
    if (!candidates || candidates.length === 0) candidates = null
    const next = candidates
      ? candidates[Math.floor(Math.random() * candidates.length)]
      : getRandomAyah(ayah.id)
    switchAyah(next)
  }

  function handleEmotionChange(key) {
    setEmotion(key)
    const pool = key === 'all' ? null : getAyahsByEmotion(key)
    const next = pool && pool.length
      ? pool[Math.floor(Math.random() * pool.length)]
      : getRandomAyah(ayah.id)
    if (next.id !== ayah.id) switchAyah(next)
  }

  // Play on mount
  useEffect(() => {
    playAudio(ayah.audioUrl)
    return () => { if (audioRef.current) audioRef.current.pause() }
  }, [])

  // Shake to change
  useEffect(() => {
    let lastTime = 0, lx = 0, ly = 0, lz = 0
    function onMotion(e) {
      const { x = 0, y = 0, z = 0 } = e.accelerationIncludingGravity || {}
      const now = Date.now()
      if (now - lastTime < 300) return
      if (Math.abs(x-lx) + Math.abs(y-ly) + Math.abs(z-lz) > 28) {
        lastTime = now; lx = x; ly = y; lz = z
        handleNextAyah()
      }
    }
    window.addEventListener('devicemotion', onMotion)
    return () => window.removeEventListener('devicemotion', onMotion)
  }, [ayah, emotion])

  const arabicSize = ayah.arabic.length < 50 ? '2.6rem'
    : ayah.arabic.length < 100 ? '2rem'
    : ayah.arabic.length < 160 ? '1.65rem'
    : '1.35rem'

  return (
    <div className="shield-screen min-h-dvh flex flex-col" style={{ background: 'var(--bg)' }}>

      {/* Top bar */}
      <div className="flex items-center justify-between px-5 pt-10 pb-3">
        <button onClick={() => navigate('/')} style={{ color: 'var(--text-dim)', fontSize: '0.875rem' }}>
          ‹ Back
        </button>

        {/* Audio status */}
        <div className="flex items-center gap-2 h-6">
          {audioState === 'playing' && (
            <div className="flex items-end gap-0.5">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="audio-bar" style={{ animationDelay: `${i * 0.13}s` }} />
              ))}
            </div>
          )}
          {audioState === 'loading' && (
            <p style={{ color: 'var(--text-dim)', fontSize: '0.7rem', letterSpacing: '0.1em' }}>LOADING…</p>
          )}
          {audioState === 'done' && (
            <button
              onClick={() => playAudio(ayah.audioUrl)}
              style={{ color: 'var(--gold)', fontSize: '0.75rem', border: '1px solid rgba(201,168,76,0.3)', padding: '2px 10px', borderRadius: 99 }}
            >
              ↺ replay
            </button>
          )}
          {audioState === 'error' && (
            <p style={{ color: 'var(--text-dim)', fontSize: '0.7rem' }}>no audio</p>
          )}
        </div>
      </div>

      {/* Emotion pills */}
      <div className="flex gap-2 px-5 pb-5 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        {EMOTIONS.map(e => (
          <button
            key={e.key}
            onClick={() => handleEmotionChange(e.key)}
            style={{
              flexShrink: 0,
              padding: '6px 14px',
              borderRadius: 99,
              fontSize: '0.75rem',
              border: `1px solid ${emotion === e.key ? accent + 'AA' : 'transparent'}`,
              background: emotion === e.key ? accent + '18' : 'var(--bg3)',
              color: emotion === e.key ? accent : 'var(--text-dim)',
              transition: 'all 0.2s'
            }}
          >
            {e.label}
          </button>
        ))}
      </div>

      {/* ── HERO: Arabic verse ── */}
      <div
        className="flex-1 flex flex-col items-center justify-center px-7"
        style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.25s ease' }}
      >
        {/* Soft glow blob */}
        <div style={{
          position: 'absolute',
          width: 280, height: 280,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${accent}0A, transparent 70%)`,
          filter: 'blur(50px)',
          pointerEvents: 'none',
          zIndex: 0
        }} />

        {/* Arabic text — the star */}
        <p
          className={`arabic-quran text-center flicker ${audioState === 'playing' ? 'verse-playing' : ''}`}
          style={{
            position: 'relative',
            zIndex: 1,
            color: 'var(--gold)',
            fontSize: arabicSize,
            lineHeight: 2.5,
            transition: 'font-size 0.3s ease, text-shadow 1s ease',
            textShadow: audioState === 'playing'
              ? `0 0 50px ${accent}70, 0 0 20px ${accent}40`
              : 'none',
          }}
        >
          {ayah.arabic}
        </p>

        {/* Divider */}
        <div className="flex items-center gap-3 my-7" style={{ width: '55%' }}>
          <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, transparent, ${accent}50)` }} />
          <div style={{ width: 4, height: 4, borderRadius: '50%', background: accent + '70' }} />
          <div className="flex-1 h-px" style={{ background: `linear-gradient(to left, transparent, ${accent}50)` }} />
        </div>

        {/* Translation — secondary */}
        <p
          className="text-center leading-relaxed"
          style={{ color: 'var(--text-mid)', fontSize: '0.9rem', maxWidth: 300, position: 'relative', zIndex: 1 }}
        >
          {ayah.translation}
        </p>
        <p style={{ color: 'var(--text-dim)', fontSize: '0.7rem', letterSpacing: '0.15em', marginTop: 10 }}>
          {ayah.ref}
        </p>
      </div>

      {/* Bottom */}
      <div className="px-5 pb-10 pt-4">
        <button
          onClick={handleNextAyah}
          className="w-full py-4 rounded-2xl text-sm transition-all active:scale-95"
          style={{
            background: 'var(--bg3)',
            border: `1px solid ${accent}25`,
            color: 'var(--text-mid)'
          }}
        >
          Next verse &nbsp;·&nbsp;
          <span style={{ color: 'var(--text-dim)', fontSize: '0.72rem' }}>or shake your phone</span>
        </button>
      </div>
    </div>
  )
}
