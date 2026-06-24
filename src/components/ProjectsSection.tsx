import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

interface Project {
  id: number
  num: string
  type: string
  name: string
  year: string
  vibe: string
  description: string
  tags: string[]
  gradFrom: string
  gradTo: string
  accent: string
  image?: string
  liveUrl?: string
}

const projects: Project[] = [
  {
    id: 0,
    num: '01',
    type: 'Personal Brand',
    name: 'This Portfolio',
    year: '2026',
    vibe: 'built from scratch. every animation hand-crafted.',
    description:
      'The portfolio you\'re on right now. React + TypeScript + Tailwind CSS + Framer Motion + GSAP. Scroll-linked SVG path drawing, GSAP horizontal scroll, sticky content switch, canvas network background. Still shipping.',
    tags: ['React', 'TypeScript', 'Framer Motion', 'GSAP', 'Tailwind CSS'],
    gradFrom: '#0a0a14',
    gradTo: '#141414',
    accent: '#DEDBC8',
    image: '/portfolio.png',
  },
  {
    id: 1,
    num: '02',
    type: 'Full Stack App',
    name: 'Smart Finance',
    year: '2026',
    vibe: 'personal finance tracker. ai insights. actually useful.',
    description:
      'A personal finance management system with budgeting, goals, reports, and an AI-powered finance assistant. Built with React + Firebase Auth + Firestore on the frontend, Node.js + Express on the backend, and Google Gemini for smart insights.',
    tags: ['React', 'Firebase', 'Node.js', 'Express', 'Gemini AI', 'Chart.js', 'MUI'],
    gradFrom: '#0d0a1a',
    gradTo: '#1a1030',
    accent: '#A78BFA',
    image: '/finaance management system.png',
    liveUrl: 'https://smart-personal-finance-management-s-beta.vercel.app/',
  },
  {
    id: 2,
    num: '03',
    type: 'Full Stack App',
    name: 'Ajaia Docs',
    year: '2026',
    vibe: 'collaborative doc editing. real users. fully deployed.',
    description:
      'A full-stack collaborative document editor built as a job assessment. Email/password auth via Supabase, rich text editing with TipTap, auto-save every 30 seconds, file uploads (.txt/.md), and document sharing by email. Deployed on Vercel + Render.',
    tags: ['React', 'Node.js', 'Express', 'Supabase', 'TipTap', 'Tailwind CSS'],
    gradFrom: '#071410',
    gradTo: '#0d2018',
    accent: '#6EE7B7',
    image: '/ajaia docs.png',
    liveUrl: 'https://ajaia-docss.vercel.app',
  },
]

function MockBrowser({ project }: { project: Project }) {
  return (
    <div
      className="w-full rounded-xl overflow-hidden flex flex-col"
      style={{ border: '1px solid rgba(255,255,255,0.07)' }}
    >
      <div
        className="flex items-center gap-1.5 px-3 py-2.5 flex-shrink-0"
        style={{ background: 'rgba(0,0,0,0.6)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/50" />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: `${project.accent}88` }} />
        <div
          className="ml-2 flex-1 rounded-md px-2 py-0.5 text-[10px] font-mono truncate"
          style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(225,224,204,0.22)' }}
        >
          {project.liveUrl ?? 'localhost:3000'}
        </div>
      </div>
      <div
        className="overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${project.gradFrom}, ${project.gradTo})` }}
      >
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.name} screenshot`}
            className="w-full h-auto block"
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-3 p-6" style={{ height: '280px' }}>
            <div
              className="w-24 h-24 rounded-full blur-3xl absolute"
              style={{ background: project.accent, opacity: 0.2 }}
            />
            <div className="w-24 h-2 rounded-full" style={{ background: `${project.accent}44` }} />
            <div className="w-36 h-1.5 rounded-full" style={{ background: `${project.accent}22` }} />
            <div className="w-28 h-1.5 rounded-full" style={{ background: `${project.accent}18` }} />
            <div
              className="mt-4 w-28 h-8 rounded-full flex items-center justify-center"
              style={{ border: `1px solid ${project.accent}33`, background: `${project.accent}0d` }}
            >
              <div className="w-12 h-1 rounded-full" style={{ background: `${project.accent}55` }} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div
      className="w-full overflow-hidden"
      style={{
        borderRadius: '1.5rem',
        background: `linear-gradient(145deg, ${project.gradFrom} 0%, ${project.gradTo} 100%)`,
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow: '0 32px 80px -16px rgba(0,0,0,0.9)',
        /* Tall enough to fully cover the card beneath it when stacked */
        height: 'calc(100vh - 110px)',
        minHeight: '500px',
      }}
    >
      <div className="flex flex-col md:flex-row h-full">
        {/* Left: info */}
        <div className="flex-1 p-8 md:p-10 flex flex-col">
          <div className="flex items-start justify-between mb-6">
            <div className="flex flex-col gap-2">
              <span
                className="font-mono text-[10px] uppercase tracking-widest"
                style={{ color: 'rgba(225,224,204,0.22)' }}
              >
                {project.num}
              </span>
              <span
                className="inline-block text-[10px] font-mono px-3 py-[0.3em] rounded-full border w-fit"
                style={{
                  color: project.accent,
                  borderColor: `${project.accent}2e`,
                  background: `${project.accent}12`,
                }}
              >
                {project.type}
              </span>
            </div>
            <span className="font-mono text-xs tabular-nums" style={{ color: 'rgba(225,224,204,0.16)' }}>
              {project.year}
            </span>
          </div>

          <h3
            className="font-medium mb-2"
            style={{ color: '#E1E0CC', fontSize: 'clamp(1.7rem, 3.2vw, 2.4rem)', lineHeight: 1.05 }}
          >
            {project.name}
          </h3>

          <p
            className="font-cursive italic text-[1.3rem] md:text-[1.5rem] mb-5 leading-tight"
            style={{ color: `${project.accent}95` }}
          >
            {project.vibe}
          </p>

          <p
            className="text-sm leading-[1.7] mb-auto max-w-md"
            style={{ color: 'rgba(225,224,204,0.44)' }}
          >
            {project.description}
          </p>

          <div className="mt-6 flex items-end justify-between gap-4 flex-wrap">
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-[0.28em] rounded-full text-[11px] font-mono"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    color: 'rgba(225,224,204,0.32)',
                    border: '1px solid rgba(225,224,204,0.08)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex-shrink-0 flex items-center gap-1.5 text-sm font-medium transition-opacity duration-200 hover:opacity-60"
                style={{ color: project.accent }}
              >
                Live app
                <ArrowUpRight
                  size={15}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                />
              </a>
            ) : (
              <span className="flex-shrink-0 font-mono text-xs" style={{ color: `${project.accent}55` }}>
                details soon →
              </span>
            )}
          </div>
        </div>

        {/* Right: mock browser */}
        <div className="hidden md:flex w-[520px] flex-shrink-0 p-6 items-center">
          <div className="w-full">
            <MockBrowser project={project} />
          </div>
        </div>
      </div>
    </div>
  )
}

function SectionHeader() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="px-6 md:px-16 pt-12 pb-10"
    >
      <p className="font-mono text-[10px] uppercase tracking-widest mb-3" style={{ color: 'rgba(225,224,204,0.3)' }}>
        // featured_work
      </p>
      <h2 className="text-3xl md:text-5xl font-light leading-tight mb-1" style={{ color: '#E1E0CC' }}>
        Projects that shipped.
      </h2>
      <p className="font-cursive italic text-2xl" style={{ color: 'rgba(225,224,204,0.32)' }}>
        real code. live apps. no cap.
      </p>
    </motion.div>
  )
}

export default function ProjectsSection() {
  return (
    <section id="work" className="bg-bg">
      <SectionHeader />

      {/*
       * STICKY STACKING — HOW THIS WORKS
       * ──────────────────────────────────
       * All three cards are SIBLINGS inside one tall container.
       * Every card shares the same sticky scope (the container).
       *
       * As the user scrolls:
       *  1. Card 1 hits top:90px and sticks  (z-index 10)
       *  2. Card 2 rises from below, hits top:90px and sticks ON TOP of card 1 (z-index 11)
       *  3. Card 3 does the same over card 2 (z-index 12)
       *
       * Container height controls pacing — each card sticks ~100vh apart.
       * Cards are viewport-height so each fully covers the one beneath.
       *
       * CRITICAL: do NOT add y-transform animations to sticky cards —
       * they fight the sticky position and cause jumps.
       */}
      <div
        className="px-4 md:px-8"
        style={{ height: `${projects.length * 100 + 50}vh` }}
      >
        {projects.map((project, i) => (
          <div
            key={project.id}
            className="sticky"
            style={{ top: '90px', zIndex: 10 + i }}
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>

      {/* Breathing room after last card */}
      <div style={{ height: '30vh' }} aria-hidden />
    </section>
  )
}
