import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface TechCard {
  num: string
  category: string
  emoji: string
  vibe: string
  items: string[]
  snippet: string
  accentColor: string
}

const cards: TechCard[] = [
  {
    num: '01',
    category: 'Languages',
    emoji: '🧠',
    vibe: 'the foundation',
    items: ['JavaScript ES6+', 'C (college)', 'Java (college)'],
    snippet: 'const vibe = "immaculate";',
    accentColor: 'rgba(255,183,178,0.12)',
  },
  {
    num: '02',
    category: 'Frontend',
    emoji: '🎨',
    vibe: 'yes i do the ui',
    items: ['HTML5 / CSS3', 'Tailwind CSS', 'React.js', 'React Router'],
    snippet: '<Sarthak mode="building" />',
    accentColor: 'rgba(167,139,250,0.1)',
  },
  {
    num: '03',
    category: 'Backend',
    emoji: '⚙️',
    vibe: 'learning my home',
    items: ['Node.js', 'Express.js', 'REST APIs', 'Middleware'],
    snippet: 'app.listen(3000, () => ship())',
    accentColor: 'rgba(110,231,183,0.1)',
  },
  {
    num: '04',
    category: 'Database',
    emoji: '🗄️',
    vibe: 'where the tea is stored',
    items: ['MongoDB', 'Mongoose', 'Schema design', 'CRUD queries'],
    snippet: 'db.find({ vibe: "good" })',
    accentColor: 'rgba(250,204,21,0.08)',
  },
  {
    num: '05',
    category: 'Tools',
    emoji: '🛠️',
    vibe: 'the daily lineup',
    items: ['Git / GitHub', 'VS Code', 'Postman', 'npm'],
    snippet: 'git push origin main',
    accentColor: 'rgba(96,165,250,0.1)',
  },
  {
    num: '06',
    category: 'Learning Next',
    emoji: '🚀',
    vibe: 'pipeline is full',
    items: ['TypeScript', 'Next.js', 'Docker', 'SQL basics'],
    snippet: '// TODO: ship something big',
    accentColor: 'rgba(222,219,200,0.06)',
  },
]

export default function TechSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })

  useEffect(() => {
    const container = containerRef.current
    const track = trackRef.current
    if (!container || !track) return

    let ctx: gsap.Context | null = null

    const setup = () => {
      ctx?.revert()

      const trackWidth = track.scrollWidth
      const viewWidth = window.innerWidth
      const totalMove = Math.max(0, trackWidth - viewWidth + 64)

      if (totalMove === 0) return

      ctx = gsap.context(() => {
        gsap.to(track, {
          x: -totalMove,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: `+=${totalMove}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
      })
    }

    const timeout = setTimeout(setup, 300)

    return () => {
      clearTimeout(timeout)
      ctx?.revert()
    }
  }, [])

  return (
    <section id="tech" ref={containerRef} className="bg-bg">
      <div
        className="flex flex-col justify-center overflow-hidden"
        style={{ minHeight: '100vh' }}
      >
        {/* Section header */}
        <div ref={headerRef} className="px-6 md:px-16 pt-16 pb-8 flex-shrink-0">
          <p className="font-mono text-[10px] sm:text-xs text-primary/50 mb-3 tracking-widest uppercase">
            // tech_stack
          </p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl md:text-4xl lg:text-5xl font-light"
            style={{ color: '#E1E0CC' }}
          >
            the tools behind the magic.{' '}
            <span className="font-cursive italic text-primary/60 text-4xl md:text-5xl">still stacking.</span>
          </motion.h2>
        </div>

        {/* Horizontal scrolling track */}
        <div
          ref={trackRef}
          className="flex gap-4 pl-6 md:pl-16 pb-16 will-change-transform"
          style={{ width: 'max-content', paddingRight: '4rem' }}
        >
          {cards.map((card) => (
            <div
              key={card.category}
              className="flex-shrink-0 w-[270px] sm:w-[290px] bg-surface border border-primary/10 rounded-[1.5rem] p-6 flex flex-col gap-4 relative overflow-hidden hover:border-primary/25 transition-colors duration-300"
              style={{ minHeight: '360px' }}
            >
              {/* Accent blob */}
              <div
                className="absolute top-0 right-0 w-28 h-28 rounded-full blur-3xl pointer-events-none"
                style={{ background: card.accentColor }}
              />

              {/* Number */}
              <span className="font-mono text-xs text-primary/25 absolute top-5 right-5">
                {card.num}
              </span>

              {/* Emoji + title + vibe */}
              <div>
                <span className="text-3xl mb-2 block">{card.emoji}</span>
                <h3 className="text-base font-medium" style={{ color: '#E1E0CC' }}>
                  {card.category}
                </h3>
                <p className="font-cursive italic text-sm text-primary/45 mt-0.5">{card.vibe}</p>
              </div>

              {/* Tech list */}
              <ul className="flex flex-col gap-2 flex-1">
                {card.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-primary/60">
                    <span className="w-1 h-1 rounded-full bg-primary/35 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Code snippet */}
              <div className="bg-black/50 rounded-xl px-4 py-3 border border-primary/10">
                <code className="font-mono text-[11px] text-primary/55 break-all">
                  {card.snippet}
                </code>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
