import { useEffect, useRef } from 'react'
import './App.css'

const CARD_DATA = {
  clubNameEn: 'LIKELION KNU',
  university: '강남대학교',
  name: '박신형',
  nameEn: 'Park Sinhyeong',
  studentId: '202204050',
  part: 'Backend Dev.',
  major: 'ICT융합공학부 소프트웨어전공',
  year: '14',
}

/* ── Canvas: twinkling galaxy (no shooting stars) ────────── */
function StarCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const STAR_COUNT = 220
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.2,
      alpha: Math.random(),
      speed: Math.random() * 0.007 + 0.002,
      offset: Math.random() * Math.PI * 2,
      blue: Math.random() > 0.6,
    }))

    let raf: number
    let t = 0

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Nebula glow
      const nebula = (x: number, y: number, r: number, color: string) => {
        const g = ctx.createRadialGradient(x, y, 0, x, y, r)
        g.addColorStop(0, color)
        g.addColorStop(1, 'transparent')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fill()
      }
      nebula(canvas.width * 0.15, canvas.height * 0.18, 220, 'rgba(37,99,235,0.08)')
      nebula(canvas.width * 0.82, canvas.height * 0.55, 170, 'rgba(99,102,241,0.07)')
      nebula(canvas.width * 0.5,  canvas.height * 0.85, 190, 'rgba(14,165,233,0.06)')

      // Twinkling stars
      for (const s of stars) {
        const flicker = Math.sin(t * s.speed * 60 + s.offset) * 0.5 + 0.5
        const alpha = 0.2 + flicker * 0.8

        ctx.fillStyle = s.blue
          ? `rgba(147,197,253,${alpha})`
          : `rgba(255,255,255,${alpha})`
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fill()

        // 큰 별엔 십자 sparkle
        if (s.r > 1.2 && flicker > 0.88) {
          ctx.strokeStyle = `rgba(255,255,255,${alpha * 0.35})`
          ctx.lineWidth = 0.5
          ctx.beginPath()
          ctx.moveTo(s.x - s.r * 3.5, s.y)
          ctx.lineTo(s.x + s.r * 3.5, s.y)
          ctx.moveTo(s.x, s.y - s.r * 3.5)
          ctx.lineTo(s.x, s.y + s.r * 3.5)
          ctx.stroke()
        }
      }

      t += 0.016
      raf = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="star-canvas" />
}

/* ── LN Logo ─────────────────────────────────────────────── */
function LNLogo({ size = 28 }: { size?: number }) {
  // 유니크 ID (인스턴스별 충돌 방지)
  const id = 'ln'
  return (
    <svg width={size} height={size} viewBox="0 0 110 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`${id}a`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22D3EE"/>
          <stop offset="100%" stopColor="#2563EB"/>
        </linearGradient>
        <linearGradient id={`${id}b`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#818CF8"/>
          <stop offset="100%" stopColor="#6D28D9"/>
        </linearGradient>
        <linearGradient id={`${id}c`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#38BDF8"/>
          <stop offset="100%" stopColor="#3B82F6"/>
        </linearGradient>
      </defs>

      {/* === L shape === */}
      {/* L vertical */}
      <rect x="4" y="8" width="17" height="66" rx="2.5" fill={`url(#${id}a)`}/>
      {/* L horizontal */}
      <rect x="4" y="59" width="48" height="17" rx="2.5" fill={`url(#${id}c)`}/>

      {/* === N shape === */}
      {/* N left bar */}
      <rect x="56" y="8" width="14" height="60" rx="2.5" fill={`url(#${id}b)`}/>
      {/* N right bar */}
      <rect x="92" y="8" width="14" height="60" rx="2.5" fill={`url(#${id}b)`}/>
      {/* N diagonal stroke */}
      <polygon points="56,8 70,8 106,60 92,60" fill={`url(#${id}b)`} opacity="0.9"/>
    </svg>
  )
}

/* ── Cute graduation-cap lion SVG ────────────────────────── */
function LionCharacter() {
  return (
    <svg width="110" height="120" viewBox="0 0 110 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* === Graduation cap === */}
      {/* Board (mortarboard top) */}
      <polygon points="55,4 100,22 55,40 10,22" fill="#1E40AF" />
      <polygon points="55,4 100,22 55,40 10,22" fill="url(#capTop)" opacity="0.9"/>
      {/* Cap sides shading */}
      <polygon points="55,40 55,56 10,38 10,22" fill="#1D3461" opacity="0.7"/>
      {/* Tassel string */}
      <line x1="100" y1="22" x2="100" y2="44" stroke="#93C5FD" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Tassel ball */}
      <circle cx="100" cy="47" r="4.5" fill="#60A5FA"/>
      {/* Tassel fringe */}
      <line x1="98" y1="50" x2="95" y2="60" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="100" y1="51" x2="100" y2="62" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="102" y1="50" x2="105" y2="60" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round"/>

      {/* === Mane (behind head) === */}
      <circle cx="55" cy="80" r="30" fill="url(#mane)" />

      {/* === Face === */}
      <ellipse cx="55" cy="82" rx="23" ry="24" fill="url(#face)" />

      {/* === Inner face (muzzle area lighter) === */}
      <ellipse cx="55" cy="88" rx="13" ry="11" fill="url(#muzzle)" />

      {/* === Eyes === */}
      {/* Eye whites */}
      <ellipse cx="44" cy="78" rx="6" ry="6.5" fill="white"/>
      <ellipse cx="66" cy="78" rx="6" ry="6.5" fill="white"/>
      {/* Irises */}
      <circle cx="44" cy="79" r="4" fill="#1E40AF"/>
      <circle cx="66" cy="79" r="4" fill="#1E40AF"/>
      {/* Pupils */}
      <circle cx="44.5" cy="79.5" r="2.2" fill="#0F172A"/>
      <circle cx="66.5" cy="79.5" r="2.2" fill="#0F172A"/>
      {/* Eye shine */}
      <circle cx="45.8" cy="78.2" r="1" fill="white"/>
      <circle cx="67.8" cy="78.2" r="1" fill="white"/>

      {/* === Eyebrows (cute) === */}
      <path d="M39 73 Q44 70 49 73" stroke="#92400E" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
      <path d="M61 73 Q66 70 71 73" stroke="#92400E" strokeWidth="1.8" strokeLinecap="round" fill="none"/>

      {/* === Nose === */}
      <ellipse cx="55" cy="86.5" rx="3.5" ry="2.5" fill="#D97706"/>

      {/* === Mouth (smile) === */}
      <path d="M49 91 Q55 96 61 91" stroke="#B45309" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
      {/* Cheek blush */}
      <ellipse cx="39" cy="87" rx="5" ry="3" fill="rgba(251,146,60,0.3)"/>
      <ellipse cx="71" cy="87" rx="5" ry="3" fill="rgba(251,146,60,0.3)"/>

      {/* === Ears (behind mane) === */}
      <ellipse cx="31" cy="68" rx="8" ry="9" fill="url(#earColor)"/>
      <ellipse cx="31" cy="68" rx="4.5" ry="5.5" fill="#FBBF24" opacity="0.5"/>
      <ellipse cx="79" cy="68" rx="8" ry="9" fill="url(#earColor)"/>
      <ellipse cx="79" cy="68" rx="4.5" ry="5.5" fill="#FBBF24" opacity="0.5"/>

      {/* === Paws at bottom === */}
      <ellipse cx="40" cy="112" rx="11" ry="7" fill="url(#paw)"/>
      <ellipse cx="70" cy="112" rx="11" ry="7" fill="url(#paw)"/>
      {/* Toe marks */}
      <circle cx="35" cy="110" r="2" fill="rgba(251,191,36,0.4)"/>
      <circle cx="40" cy="108" r="2.2" fill="rgba(251,191,36,0.4)"/>
      <circle cx="45" cy="110" r="2" fill="rgba(251,191,36,0.4)"/>
      <circle cx="65" cy="110" r="2" fill="rgba(251,191,36,0.4)"/>
      <circle cx="70" cy="108" r="2.2" fill="rgba(251,191,36,0.4)"/>
      <circle cx="75" cy="110" r="2" fill="rgba(251,191,36,0.4)"/>

      {/* Body silhouette */}
      <path d="M32 100 Q30 92 34 88 Q40 84 55 84 Q70 84 76 88 Q80 92 78 100 Q70 108 55 110 Q40 108 32 100Z"
        fill="url(#body)" />

      <defs>
        <linearGradient id="capTop" x1="10" y1="4" x2="100" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3B82F6"/>
          <stop offset="100%" stopColor="#1D4ED8"/>
        </linearGradient>
        <radialGradient id="mane" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#F59E0B"/>
          <stop offset="60%" stopColor="#D97706"/>
          <stop offset="100%" stopColor="#92400E"/>
        </radialGradient>
        <radialGradient id="face" cx="50%" cy="40%">
          <stop offset="0%" stopColor="#FDE68A"/>
          <stop offset="100%" stopColor="#F59E0B"/>
        </radialGradient>
        <radialGradient id="muzzle" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#FEF3C7"/>
          <stop offset="100%" stopColor="#FDE68A"/>
        </radialGradient>
        <linearGradient id="earColor" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F59E0B"/>
          <stop offset="100%" stopColor="#B45309"/>
        </linearGradient>
        <linearGradient id="body" x1="55" y1="84" x2="55" y2="110" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F59E0B"/>
          <stop offset="100%" stopColor="#D97706"/>
        </linearGradient>
        <linearGradient id="paw" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FBBF24"/>
          <stop offset="100%" stopColor="#F59E0B"/>
        </linearGradient>
      </defs>
    </svg>
  )
}

export default function App() {
  return (
    <div className="app">
      <StarCanvas />

      <div className="card-wrapper">
        {/* Main card */}
        <div className="id-card">
          <div className="card-glow" />

          {/* Header */}
          <div className="card-header">
            <div>
              <div className="header-club">{CARD_DATA.clubNameEn} <span className="header-year">14th</span></div>
              <div className="header-sub">MEMBERSHIP CARD · {CARD_DATA.university}</div>
            </div>
          </div>

          {/* Photo */}
          <div className="photo-area">
            <div className="photo-frame">
              <img src="/park2.jpeg" alt="lion" className="photo-img" />
            </div>
          </div>

          {/* Name */}
          <div className="name-area">
            <h1 className="member-name">{CARD_DATA.name}</h1>
            <p className="member-name-en">{CARD_DATA.nameEn}</p>
          </div>

          {/* Part badge */}
          <div className="part-badge-wrap">
            <div className="part-badge">
              <span className="part-dot" />
              <span>{CARD_DATA.part}</span>
            </div>
          </div>

          {/* Divider */}
          <div className="card-divider" />

          {/* Info */}
          <div className="info-list">
            <div className="info-row">
              <span className="info-label">학번</span>
              <span className="info-value mono">{CARD_DATA.studentId}</span>
            </div>
            <div className="info-row">
              <span className="info-label">전공</span>
              <span className="info-value">{CARD_DATA.major}</span>
            </div>
            <div className="info-row">
              <span className="info-label">소속</span>
              <span className="info-value">{CARD_DATA.university}</span>
            </div>
          </div>

          {/* Footer strip */}
          <div className="card-footer-strip">
            <div className="footer-line" />
            <div className="footer-content">
              <span className="footer-text">강남대학교 멋쟁이사자처럼</span>
              <div className="verified-chip">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M5 0.5L6.15 2.35L8.25 2L7.95 4.1L9.75 5.25L7.95 6.4L8.25 8.5L6.15 8.15L5 10L3.85 8.15L1.75 8.5L2.05 6.4L0.25 5.25L2.05 4.1L1.75 2L3.85 2.35L5 0.5Z" fill="#60A5FA"/>
                  <path d="M3.5 5L4.5 6L6.5 4" stroke="white" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Verified</span>
              </div>
            </div>
          </div>

          <div className="card-blur-1" />
          <div className="card-blur-2" />
        </div>

        <p className="bottom-hint">멋쟁이사자처럼 강남대학교 · 동아리원증</p>
      </div>
    </div>
  )
}
