import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const chapters = [
  {
    id: 'origin',
    heading: 'where\nI\'m from.',
    sub: 'Agra, India → The Web',
    content: [
      'Born and raised in Agra — the city of the Taj Mahal. Pursuing BCA at Dr. Bhimrao Ambedkar University (2025–2028).',
      'Cleared CBSE 12th from PM Shri Kendriya Vidyalaya O.E.F. Hazratpur, then took a full leap into Computer Applications.',
      'The internet is my classroom. YouTube, docs, and GitHub are my teachers.',
    ],
    emoji: '📍',
    color: 'rgba(167,139,250,0.15)',
    accent: '#A78BFA',
  },
  {
    id: 'craft',
    heading: 'what\nI build.',
    sub: 'HTML → React → Node.js → MongoDB',
    content: [
      'I started with HTML & CSS, moved to Tailwind, then JavaScript. React clicked immediately — component thinking made sense to me.',
      'On the backend, I\'m learning Node.js + Express. MongoDB for data. The full MERN stack is my current focus.',
      'First projects are in progress. I build to learn, and I learn by building.',
    ],
    emoji: '⚙️',
    color: 'rgba(110,231,183,0.12)',
    accent: '#6EE7B7',
  },
  {
    id: 'learning',
    heading: 'how\nI learn.',
    sub: 'Docs → Build → Break → Fix',
    content: [
      'I don\'t just follow tutorials. I read the docs, build something, break it, understand why, and fix it. That\'s the loop.',
      'C and Java from college gave me strong fundamentals — memory, OOP, data structures. That base matters.',
      'Currently building my first full-stack project. Git commits document the journey.',
    ],
    emoji: '📚',
    color: 'rgba(255,183,178,0.12)',
    accent: '#FFB7B2',
  },
  {
    id: 'next',
    heading: 'what\'s\nnext.',
    sub: 'First job → Open to internships',
    content: [
      'Graduating in 2028. Open to internships, junior developer roles, and anything that puts me in a real codebase.',
      'Building in public. Every project, every mistake, every win — documented here.',
      'Goal: become a developer that companies actually want to hire. Getting there, one commit at a time.',
    ],
    emoji: '🔭',
    color: 'rgba(250,204,21,0.1)',
    accent: '#FBBF24',
  },
]

function RightPanel({ chapter }: { chapter: typeof chapters[0] }) {
  return (
    <div className="min-h-[80vh] flex items-center py-16">
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-20% 0px -20% 0px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="bg-surface border border-primary/10 rounded-[1.5rem] p-8 md:p-10 w-full relative overflow-hidden"
        style={{ boxShadow: '0 20px 60px -10px rgba(0,0,0,0.5)' }}
      >
        <div
          className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl pointer-events-none"
          style={{ background: chapter.color }}
        />
        <span className="text-4xl mb-5 block">{chapter.emoji}</span>
        <p className="font-mono text-xs mb-4 tracking-widest" style={{ color: chapter.accent }}>
          {chapter.sub}
        </p>
        <div className="flex flex-col gap-4 relative z-10">
          {chapter.content.map((line, i) => (
            <p
              key={i}
              className="text-sm md:text-base leading-[1.75]"
              style={{ color: 'rgba(225,224,204,0.6)' }}
            >
              {line}
            </p>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default function StickySwitch() {
  const [activeId, setActiveId] = useState(chapters[0].id)
  const active = chapters.find(c => c.id === activeId) ?? chapters[0]
  const panelRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const onScroll = () => {
      const viewportCenter = window.scrollY + window.innerHeight * 0.5
      let closestId = chapters[0].id
      let minDist = Infinity
      panelRefs.current.forEach((el, i) => {
        if (!el) return
        const top = el.getBoundingClientRect().top + window.scrollY
        const elCenter = top + el.offsetHeight / 2
        const dist = Math.abs(viewportCenter - elCenter)
        if (dist < minDist) {
          minDist = dist
          closestId = chapters[i].id
        }
      })
      setActiveId(closestId)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="bg-bg py-16 px-6 md:px-16 relative">
      <p
        className="font-mono text-[10px] uppercase tracking-widest mb-12"
        style={{ color: 'rgba(225,224,204,0.3)' }}
      >
        // the story
      </p>

      <div className="flex gap-8 md:gap-16 max-w-6xl mx-auto">

        {/* LEFT: sticky heading */}
        <div className="hidden md:flex flex-col justify-start" style={{ width: '240px', flexShrink: 0 }}>
          <div className="sticky" style={{ top: 'calc(50vh - 120px)' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <h2
                  className="text-4xl lg:text-5xl font-light leading-[1.05] whitespace-pre-line mb-4"
                  style={{ color: '#E1E0CC' }}
                >
                  {active.heading}
                </h2>
                <motion.div
                  className="h-px w-12"
                  style={{ background: active.accent }}
                  layoutId="switch-bar"
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                />
                <p className="font-mono text-xs mt-4" style={{ color: 'rgba(225,224,204,0.25)' }}>
                  {String(chapters.findIndex(c => c.id === activeId) + 1).padStart(2, '0')} /{' '}
                  {String(chapters.length).padStart(2, '0')}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* RIGHT: scrollable panels */}
        <div className="flex-1 flex flex-col">
          {/* Mobile heading */}
          <AnimatePresence mode="wait">
            <motion.h2
              key={`mobile-${activeId}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="md:hidden text-3xl font-light mb-8 whitespace-pre-line"
              style={{ color: '#E1E0CC' }}
            >
              {active.heading}
            </motion.h2>
          </AnimatePresence>

          {chapters.map((chapter, i) => (
            <div
              key={chapter.id}
              ref={el => { panelRefs.current[i] = el }}
            >
              <RightPanel chapter={chapter} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
