import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView, MotionValue } from 'framer-motion'

const experiences = [
  {
    company: 'Dr. Bhimrao Ambedkar University',
    role: 'BCA — Bachelor of Computer Applications',
    period: '2025 – 2028',
    location: 'Agra, Uttar Pradesh',
    current: true,
    color: '#6EE7B7',
    bullets: [
      'Core subjects: Programming in C, Java, Data Structures, DBMS, Web Technologies',
      'Self-teaching the MERN stack (MongoDB, Express.js, React, Node.js) alongside formal studies',
      'Actively building side projects to apply classroom concepts in real codebases',
      'Learning version control with Git and GitHub — every project tracked from day one',
    ],
  },
  {
    company: 'PM Shri Kendriya Vidyalaya O.E.F. Hazratpur',
    role: 'CBSE Class XII — Science Stream',
    period: 'Completed 2025',
    location: 'Hazratpur, Uttar Pradesh',
    current: false,
    color: '#A78BFA',
    bullets: [
      'Physics, Chemistry, Maths — built the logical foundation that coding relies on',
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
    color: '#FFB7B2',
    bullets: [
      'HTML, CSS, Tailwind CSS — built responsive layouts from scratch',
      'JavaScript fundamentals → DOM manipulation → async/await → fetch API',
      'React.js — components, hooks, state management, routing with React Router',
      'Node.js + Express.js — REST APIs, middleware, CRUD operations',
      'MongoDB + Mongoose — schema design, queries, connecting to backend',
    ],
  },
  {
    company: 'First Projects',
    role: 'Building in Public',
    period: 'Coming Soon',
    location: 'GitHub',
    current: false,
    color: '#FBBF24',
    bullets: [
      'Working on first full-stack application — details dropping soon',
      'Every commit documented, every mistake learned from',
      'The goal: a portfolio of real projects, not tutorial clones',
    ],
  },
]

const NODE_POSITIONS = [9, 32, 56, 80] // % from top of path

// NodeCircle as a proper component to allow useTransform hooks
function NodeCircle({
  pos,
  scrollYProgress,
  color,
}: {
  pos: number
  scrollYProgress: MotionValue<number>
  color: string
}) {
  const nodeProgress = pos / 100
  const opacity = useTransform(
    scrollYProgress,
    [Math.max(0, nodeProgress - 0.05), Math.min(1, nodeProgress + 0.03)],
    [0, 1]
  )
  const scale = useTransform(
    scrollYProgress,
    [nodeProgress, Math.min(1, nodeProgress + 0.04)],
    [0.5, 1]
  )
  return (
    <motion.circle
      cx="30"
      cy={20 + (pos / 100) * 960}
      r="6"
      fill="#000"
      stroke={color}
      strokeWidth="1.5"
      style={{ opacity, scale }}
    />
  )
}

// GlowCircle as a proper component to allow useTransform hooks
function GlowCircle({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const cy = useTransform(scrollYProgress, [0, 1], [20, 980])
  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0])
  return (
    <motion.circle
      cx="30"
      r="5"
      fill="#DEDBC8"
      style={{ cy, opacity, filter: 'url(#glow)' }}
    />
  )
}

function ExperienceCard({ exp, index }: { exp: typeof experiences[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px -15% 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className="bg-surface border border-primary/10 rounded-[1.5rem] p-7 relative overflow-hidden hover:border-primary/25 transition-colors duration-300"
    >
      {/* Color glow top-right */}
      <div
        className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl pointer-events-none opacity-20"
        style={{ background: exp.color }}
      />

      {/* Header */}
      <div className="flex items-start justify-between mb-5 relative z-10">
        <div>
          <h3 className="text-lg md:text-xl font-medium mb-1" style={{ color: '#E1E0CC' }}>
            {exp.company}
          </h3>
          <p className="font-serif italic text-sm" style={{ color: 'rgba(225,224,204,0.55)' }}>
            {exp.role}
          </p>
        </div>
        <div className="text-right flex-shrink-0 ml-4">
          <p className="font-mono text-xs mb-1" style={{ color: exp.color }}>
            {exp.period}
          </p>
          <p className="text-xs" style={{ color: 'rgba(225,224,204,0.3)' }}>
            {exp.location}
          </p>
          {exp.current && (
            <span className="inline-block mt-2 px-2 py-0.5 rounded-full text-[10px] font-mono bg-green-500/10 border border-green-500/30 text-green-400">
              ● live
            </span>
          )}
        </div>
      </div>

      {/* Bullets */}
      <ul className="flex flex-col gap-2.5 relative z-10">
        {exp.bullets.map((b, i) => (
          <li key={i} className="flex gap-2.5 text-sm" style={{ color: 'rgba(225,224,204,0.5)' }}>
            <span
              className="flex-shrink-0 mt-[5px] w-1 h-1 rounded-full"
              style={{ background: exp.color }}
            />
            {b}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

export default function ExperiencePage() {
  const sectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.15', 'end 0.85'],
  })

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <div className="bg-bg min-h-screen pt-24">
      {/* Page header */}
      <div className="px-6 md:px-16 mb-16">
        <p
          className="font-mono text-[10px] uppercase tracking-widest mb-3"
          style={{ color: 'rgba(225,224,204,0.3)' }}
        >
          // experience
        </p>
        <h1 className="text-4xl md:text-6xl font-light" style={{ color: '#E1E0CC' }}>
          Where I've shipped.
        </h1>
        <p className="font-cursive italic text-2xl mt-2" style={{ color: 'rgba(225,224,204,0.35)' }}>
          real internships. real code. fr.
        </p>
      </div>

      {/* Main content with SVG journey line */}
      <div ref={sectionRef} className="relative px-4 md:px-16 max-w-5xl mx-auto">
        <div className="flex gap-6 md:gap-12">

          {/* SVG journey line (left column, desktop) */}
          <div
            className="hidden md:flex flex-col items-center flex-shrink-0"
            style={{ width: '60px' }}
          >
            <svg
              width="60"
              viewBox="0 0 60 1000"
              preserveAspectRatio="none"
              className="w-full"
              style={{ height: '100%', minHeight: '800px' }}
            >
              {/* Background guide path (faint) */}
              <path
                d="M 30 20 L 30 980"
                stroke="rgba(222,219,200,0.08)"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
              />

              {/* Animated drawing path */}
              <motion.path
                d="M 30 20 L 30 980"
                stroke="#DEDBC8"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                style={{ pathLength, opacity: 0.6 }}
              />

              {/* Glow circle */}
              <GlowCircle scrollYProgress={scrollYProgress} />

              {/* Node circles at each experience */}
              {NODE_POSITIONS.map((pos, i) => (
                <NodeCircle
                  key={i}
                  pos={pos}
                  scrollYProgress={scrollYProgress}
                  color={experiences[i].color}
                />
              ))}

              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
            </svg>
          </div>

          {/* Cards column */}
          <div className="flex-1 flex flex-col gap-8 pb-24">
            {experiences.map((exp, i) => (
              <ExperienceCard key={exp.company} exp={exp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
