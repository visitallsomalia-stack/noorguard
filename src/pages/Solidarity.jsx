import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { submitVote, getTodayCounts, hasVotedToday, markVotedToday } from '../lib/supabase'

const VOTES = [
  { type: 'heart', emoji: '💔', label: "I'm struggling", color: '#FF6B6B', prayer: 'forgive' },
  { type: 'hands', emoji: '🤲', label: "I'm holding on", color: '#C9A84C', prayer: 'strengthen' },
  { type: 'shield', emoji: '🛡️', label: "I overcame today", color: '#6DC87A', prayer: 'accept from' },
]

export default function Solidarity() {
  const navigate = useNavigate()
  const [counts, setCounts] = useState(null)
  const [voted, setVoted] = useState(false)
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getTodayCounts().then(setCounts)
    if (hasVotedToday()) setVoted(true)
  }, [])

  async function handleVote(type) {
    if (voted || loading) return
    setLoading(true)
    setSelected(type)
    const ok = await submitVote(type)
    if (ok) {
      markVotedToday()
      setVoted(true)
      const updated = await getTodayCounts()
      setCounts(updated)
    }
    setLoading(false)
  }

  // Collective dua
  function buildDua() {
    if (!counts) return ''
    const parts = []
    if (counts.heart > 0) parts.push(`forgive the ${counts.heart.toLocaleString()} 💔`)
    if (counts.hands > 0) parts.push(`strengthen the ${counts.hands.toLocaleString()} 🤲`)
    if (counts.shield > 0) parts.push(`accept from the ${counts.shield.toLocaleString()} 🛡️`)
    return parts.length ? `"O Allah, ${parts.join(', and ')}."` : ''
  }

  return (
    <div className="min-h-dvh flex flex-col items-center justify-between px-6 py-12" style={{ background: 'var(--bg)' }}>
      <div className="w-full flex justify-between items-center">
        <button onClick={() => navigate('/')} style={{ color: 'var(--text-dim)' }} className="text-sm">← Back</button>
        <span className="text-sm" style={{ color: 'var(--text-dim)' }}>Ummah</span>
      </div>

      <div className="flex flex-col items-center gap-6 w-full max-w-sm text-center">
        <div>
          <p className="text-xs tracking-widest uppercase mb-1" style={{ color: 'var(--text-dim)' }}>Silent Brotherhood</p>
          <p className="text-lg font-light" style={{ color: 'var(--text)' }}>
            {counts?.total ? `${counts.total.toLocaleString()} brothers in this army today` : 'You are not alone.'}
          </p>
        </div>

        {/* Vote Buttons */}
        {!voted ? (
          <div className="w-full flex flex-col gap-3">
            <p className="text-xs mb-2" style={{ color: 'var(--text-dim)' }}>Where are you right now?</p>
            {VOTES.map(v => (
              <button
                key={v.type}
                onClick={() => handleVote(v.type)}
                disabled={loading}
                className="w-full py-4 rounded-xl flex items-center gap-4 px-5 transition-all"
                style={{
                  background: 'var(--bg3)',
                  border: `1px solid ${v.color}33`,
                  opacity: loading && selected !== v.type ? 0.4 : 1
                }}
              >
                <span className="text-2xl">{v.emoji}</span>
                <span className="text-sm" style={{ color: 'var(--text)' }}>{v.label}</span>
              </button>
            ))}
            <p className="text-xs mt-2" style={{ color: 'var(--text-dim)' }}>
              No profiles. No names. Just you, your brothers, and Allah.
            </p>
          </div>
        ) : (
          <div className="w-full flex flex-col gap-4">
            {/* Counts */}
            <div className="grid grid-cols-3 gap-2">
              {VOTES.map(v => (
                <div key={v.type} className="flex flex-col items-center gap-1 py-4 rounded-xl" style={{ background: 'var(--bg3)', border: `1px solid ${v.color}22` }}>
                  <span className="text-xl">{v.emoji}</span>
                  <span className="text-lg font-semibold" style={{ color: v.color }}>
                    {counts ? (counts[v.type] || 0).toLocaleString() : '…'}
                  </span>
                </div>
              ))}
            </div>

            {/* Collective Dua */}
            {counts && counts.total > 0 && (
              <div className="p-4 rounded-xl" style={{ background: 'var(--bg3)', border: '1px solid rgba(201,168,76,0.1)' }}>
                <p className="text-xs mb-2" style={{ color: 'var(--text-dim)' }}>Today's collective du'a</p>
                <p className="text-sm italic leading-relaxed" style={{ color: 'var(--gold)' }}>{buildDua()}</p>
              </div>
            )}

            <p className="text-xs" style={{ color: 'var(--text-dim)' }}>
              Come back tomorrow to vote again.{selected && ` Today you said: ${VOTES.find(v=>v.type===selected)?.emoji}`}
            </p>
          </div>
        )}
      </div>

      <div className="h-8" />
    </div>
  )
}
