// Stealth screen — looks like a real calculator
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const BUTTONS = [
  ['AC', '+/-', '%', '÷'],
  ['7', '8', '9', '×'],
  ['4', '5', '6', '−'],
  ['1', '2', '3', '+'],
  ['0', '.', '='],
]

export default function Calculator() {
  const navigate = useNavigate()
  const [display, setDisplay] = useState('0')
  const [prev, setPrev] = useState(null)
  const [op, setOp] = useState(null)
  const [fresh, setFresh] = useState(true)
  const [secretCode, setSecretCode] = useState('')

  // Secret code: type 786 then = to return to app
  function handleBtn(btn) {
    if (btn === '=' && secretCode === '786') {
      navigate('/')
      return
    }

    if (['÷','×','−','+'].includes(btn)) {
      setPrev(parseFloat(display))
      setOp(btn)
      setFresh(true)
      return
    }
    if (btn === '=') {
      if (prev !== null && op) {
        const cur = parseFloat(display)
        const ops = { '÷': prev/cur, '×': prev*cur, '−': prev-cur, '+': prev+cur }
        const result = ops[op]
        setDisplay(String(parseFloat(result.toFixed(8))))
        setPrev(null); setOp(null); setFresh(true)
      }
      setSecretCode('')
      return
    }
    if (btn === 'AC') { setDisplay('0'); setPrev(null); setOp(null); setFresh(true); setSecretCode(''); return }
    if (btn === '+/-') { setDisplay(String(parseFloat(display) * -1)); return }
    if (btn === '%') { setDisplay(String(parseFloat(display) / 100)); return }

    // Track digits for secret code
    if (/\d/.test(btn)) setSecretCode(p => (p + btn).slice(-3))

    if (fresh) {
      setDisplay(btn === '.' ? '0.' : btn)
      setFresh(false)
    } else {
      if (btn === '.' && display.includes('.')) return
      setDisplay(display === '0' && btn !== '.' ? btn : display + btn)
    }
  }

  return (
    <div className="min-h-dvh flex flex-col justify-end" style={{ background: '#1C1C1E' }}>
      {/* Display */}
      <div className="px-6 py-4 text-right">
        {op && <p style={{ color: '#666', fontSize: 20 }}>{prev} {op}</p>}
        <p style={{
          color: 'white',
          fontSize: display.length > 9 ? 40 : display.length > 6 ? 52 : 72,
          fontWeight: 300,
          letterSpacing: -2,
          lineHeight: 1.1,
          fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
          transition: 'font-size 0.15s'
        }}>
          {display.length > 12 ? parseFloat(parseFloat(display).toPrecision(9)).toString() : display}
        </p>
      </div>

      {/* Buttons */}
      <div style={{ padding: '0 16px 40px', display: 'grid', gap: 12 }}>
        {BUTTONS.map((row, ri) => (
          <div key={ri} style={{ display: 'grid', gap: 12, gridTemplateColumns: ri === 4 ? '2fr 1fr 1fr' : 'repeat(4, 1fr)' }}>
            {row.map(btn => {
              const isOp = ['÷','×','−','+','='].includes(btn)
              const isTop = ['AC','+/-','%'].includes(btn)
              return (
                <button
                  key={btn}
                  onClick={() => handleBtn(btn)}
                  style={{
                    height: 80,
                    borderRadius: 40,
                    border: 'none',
                    fontSize: btn === 'AC' ? 22 : 28,
                    fontWeight: isTop ? 400 : 300,
                    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                    cursor: 'pointer',
                    background: isOp ? '#FF9F0A' : isTop ? '#636366' : '#2C2C2E',
                    color: isTop ? 'black' : 'white',
                    transition: 'filter 0.1s',
                  }}
                  onMouseDown={e => e.currentTarget.style.filter = 'brightness(1.3)'}
                  onMouseUp={e => e.currentTarget.style.filter = 'none'}
                  onTouchStart={e => e.currentTarget.style.filter = 'brightness(1.3)'}
                  onTouchEnd={e => e.currentTarget.style.filter = 'none'}
                >
                  {btn}
                </button>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
