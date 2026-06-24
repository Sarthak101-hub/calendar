import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Each item is text or a symbol/icon node
type TickerItem =
  | { type: 'text'; content: string; accent?: boolean; cursive?: boolean }
  | { type: 'svg' }
  | { type: 'dot' }

const items: TickerItem[] = [
  { type: 'text', content: 'full stack' },
  { type: 'svg' },
  { type: 'text', content: 'always learning' },
  { type: 'text', content: 'React ⚛️', cursive: true },
  { type: 'dot' },
  { type: 'text', content: 'building with' },
  { type: 'text', content: 'Node.js', accent: true },
  { type: 'svg' },
  { type: 'text', content: 'data lives in' },
  { type: 'text', content: 'MongoDB', accent: true },
  { type: 'dot' },
  { type: 'text', content: 'powered by' },
  { type: 'text', content: 'curiosity ✨', cursive: true },
  { type: 'svg' },
  { type: 'text', content: 'debugging at 2am' },
  { type: 'dot' },
  { type: 'text', content: 'Ajaia Docs' },
  { type: 'text', content: 'is live 🚀', accent: true },
  { type: 'svg' },
  { type: 'text', content: 'open to work' },
  { type: 'dot' },
  { type: 'text', content: 'next crazy thing', cursive: true },
  { type: 'svg' },
  { type: 'text', content: 'from Agra' },
  { type: 'text', content: 'to the world', cursive: true },
  { type: 'svg' },
]

// Duplicate for seamless infinite feel
const tickerItems = [...items, ...items, ...items]

function CurveIcon() {
  return (
    <svg width="40" height="24" viewBox="0 0 40 24" fill="none" className="flex-shrink-0 opacity-40">
      <path d="M2 22 C10 22, 15 2, 20 12 S30 22, 38 2" stroke="#DEDBC8" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  )
}

function DotIcon() {
  return <span className="w-1.5 h-1.5 rounded-full bg-primary/40 flex-shrink-0 self-center" />
}

export default function TickerSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const track = trackRef.current
    if (!container || !track) return

    const totalWidth = track.scrollWidth / 3 // one third = one copy

    const tl = gsap.to(track, {
      x: -totalWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.8,
      },
    })

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [])

  return (
    <section ref={containerRef} className="py-8 overflow-hidden border-y border-primary/10 relative">
      {/* Subtle bg noise */}
      <div className="bg-noise absolute inset-0 opacity-[0.08] pointer-events-none" />

      <div
        ref={trackRef}
        className="flex items-center gap-6 will-change-transform"
        style={{ width: 'max-content' }}
      >
        {tickerItems.map((item, i) => {
          if (item.type === 'svg') return <CurveIcon key={i} />
          if (item.type === 'dot') return <DotIcon key={i} />
          return (
            <span
              key={i}
              className={`flex-shrink-0 whitespace-nowrap text-lg md:text-xl lg:text-2xl font-light tracking-[-0.02em] ${
                item.accent ? 'text-primary font-medium' : 'text-primary/50'
              } ${item.cursive ? 'font-cursive italic text-2xl md:text-3xl text-primary/70' : ''}`}
            >
              {item.content}
            </span>
          )
        })}
      </div>
    </section>
  )
}
