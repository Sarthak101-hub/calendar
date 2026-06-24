import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

const entries = [
  {
    company: 'Dr. Bhimrao Ambedkar University',
    role: 'BCA — Bachelor of Computer Applications',
    period: '2025 – 2028',
    location: 'Agra, Uttar Pradesh',
    current: true,
    bullets: [
      'Core subjects: Programming in C, Java, Data Structures, DBMS, Web Technologies',
      'Self-teaching the MERN stack alongside formal studies',
      'Building side projects to apply classroom concepts in real codebases',
      'Every project tracked with Git from day one',
    ],
  },
  {
    company: 'PM Shri Kendriya Vidyalaya O.E.F. Hazratpur',
    role: 'CBSE Class XII — Science Stream',
    period: 'Completed 2025',
    location: 'Hazratpur, Uttar Pradesh',
    current: false,
    bullets: [
      'Physics, Chemistry, Maths — the logical foundation coding relies on',
      'First exposure to programming: basic C programs in school labs',
      'Realized software was the thing I wanted to build for a living',
    ],
  },
  {
    company: 'Self-Learning',
    role: 'Full Stack Developer in Progress',
    period: '2024 – Present',
    location: 'The Internet',
    current: false,
    bullets: [
      'HTML, CSS, Tailwind CSS — responsive layouts from scratch',
      'JavaScript → DOM manipulation → async/await → fetch API',
      'React.js — components, hooks, state, React Router',
      'Node.js + Express + MongoDB — REST APIs, CRUD, Mongoose schemas',
    ],
  },
]

function ExperienceCard({ exp, index }: { exp: typeof entries[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="relative pl-8"
    >
      {/* Timeline dot */}
      <div className="absolute left-0 top-6 w-3 h-3 rounded-full border-2 border-primary/60 bg-bg" />

      <div className="bg-surface border border-primary/10 rounded-[1.5rem] p-7 hover:border-primary/25 transition-colors duration-300">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div>
            <h3 className="text-lg font-medium" style={{ color: '#E1E0CC' }}>{exp.company}</h3>
            <p className="text-sm text-primary/60 italic font-serif">{exp.role}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-xs font-mono text-primary/40">{exp.period}</p>
            <p className="text-xs text-primary/30">{exp.location}</p>
            {exp.current && (
              <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-[10px] font-mono">
                ● live
              </span>
            )}
          </div>
        </div>
        <ul className="flex flex-col gap-2">
          {exp.bullets.map(b => (
            <li key={b} className="flex gap-2 text-sm text-primary/50">
              <span className="text-primary/30 mt-1 flex-shrink-0">—</span>
              {b}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

export default function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(containerRef, { once: true, margin: '-100px' })

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start 0.7', 'end 0.3'] })
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="experience" className="bg-bg py-24 md:py-32 px-6 md:px-20 relative overflow-hidden">
      <div className="max-w-3xl mx-auto">
        <p className="font-mono text-[10px] sm:text-xs text-primary/50 mb-3 tracking-widest uppercase">// the journey</p>
        <h2 className="text-3xl md:text-4xl font-light mb-16" style={{ color: '#E1E0CC' }}>
          How I got here.{' '}
          <span className="font-cursive italic text-primary/50 text-4xl">learning every day.</span>
        </h2>

        <div ref={containerRef} className="relative flex gap-8">
          {/* Vertical timeline line */}
          <div className="relative w-px bg-primary/10 flex-shrink-0 self-stretch">
            <motion.div
              style={{ scaleY, transformOrigin: 'top' }}
              className="absolute inset-0 bg-primary/40"
            />
          </div>

          {/* Cards */}
          <div className="flex flex-col gap-6 flex-1">
            {entries.map((exp, i) => (
              <ExperienceCard key={exp.company} exp={exp} index={i} />
            ))}

            {/* Coming soon */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="pl-8 relative"
            >
              <div className="absolute left-0 top-6 w-3 h-3 rounded-full border-2 border-primary/30 bg-bg" />
              <div className="bg-surface border border-primary/10 rounded-[1.5rem] p-7">
                <p className="text-[10px] font-mono text-primary/30 mb-1 uppercase tracking-widest">Next Chapter</p>
                <h3 className="text-base font-medium" style={{ color: '#E1E0CC' }}>First Projects</h3>
                <p className="text-sm text-primary/50 italic font-serif">Building in public — details dropping soon</p>
                <p className="text-xs font-mono text-primary/30 mt-1">Coming Soon · GitHub</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
