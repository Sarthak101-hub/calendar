import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

interface Node { x: number; y: number; vx: number; vy: number; r: number; o: number; od: number }
interface Edge { a: number; b: number; o: number; d: number }

function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let animId: number
    let nodes: Node[] = []
    let edges: Edge[] = []
    const N = 35

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    const init = () => {
      resize()
      nodes = Array.from({ length: N }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.8 + 0.8,
        o: Math.random() * 0.5 + 0.25,
        od: Math.random() > 0.5 ? 1 : -1,
      }))
      edges = []
      for (let i = 0; i < N; i++)
        for (let j = i + 1; j < N; j++)
          if (Math.random() < 0.07)
            edges.push({ a: i, b: j, o: Math.random() * 0.2 + 0.05, d: Math.random() > 0.5 ? 1 : -1 })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const e of edges) {
        e.o += 0.002 * e.d
        if (e.o > 0.3) e.d = -1
        if (e.o < 0.02) e.d = 1
        const na = nodes[e.a]; const nb = nodes[e.b]
        const dist = Math.hypot(na.x - nb.x, na.y - nb.y)
        if (dist > 200) continue
        ctx.beginPath()
        ctx.strokeStyle = `rgba(222,219,200,${e.o * (1 - dist / 200)})`
        ctx.lineWidth = 0.4
        ctx.moveTo(na.x, na.y); ctx.lineTo(nb.x, nb.y); ctx.stroke()
      }
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1
        n.o += 0.003 * n.od
        if (n.o > 0.85) n.od = -1
        if (n.o < 0.15) n.od = 1
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(222,219,200,${n.o})`; ctx.fill()
      }
      animId = requestAnimationFrame(draw)
    }
    init(); draw()
    const ro = new ResizeObserver(resize); ro.observe(canvas)
    return () => { cancelAnimationFrame(animId); ro.disconnect() }
  }, [])
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ opacity: 0.35 }} />
}

function BlinkingCursor() {
  const [v, setV] = useState(true)
  useEffect(() => { const id = setInterval(() => setV(x => !x), 530); return () => clearInterval(id) }, [])
  return <span className="inline-block w-0.5 h-10 md:h-14 bg-primary ml-1 align-middle" style={{ opacity: v ? 1 : 0, transition: 'opacity 0.05s' }} />
}

const socials = [
  { label: 'GitHub', href: 'https://github.com/Sarthak101-hub' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/sarthak-shrivastava-284752379/' },
  { label: 'Email', href: 'mailto:sarthakshrivastava4634@gmail.com' },
]

export default function ContactSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="contact" className="relative min-h-screen flex flex-col items-center justify-center py-24 px-6 overflow-hidden bg-bg">
      <NetworkCanvas />
      <div className="absolute inset-0 bg-black/50 pointer-events-none" />

      <div ref={ref} className="relative z-10 text-center max-w-3xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-mono text-[10px] sm:text-xs text-primary/40 mb-4 tracking-widest uppercase"
        >
          // contact
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-6xl font-medium mb-4 flex items-center justify-center flex-wrap gap-1"
          style={{ color: '#E1E0CC' }}
        >
          Let's build something.<BlinkingCursor />
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base mb-10 leading-relaxed"
          style={{ color: 'rgba(225,224,204,0.5)' }}
        >
          Open to internships, junior developer roles, and collaborating on cool projects.
        </motion.p>

        <motion.a
          href="mailto:sarthakshrivastava4634@gmail.com"
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          whileHover={{ scale: 1.03 }}
          className="block text-lg md:text-2xl font-mono mb-12 hover:underline underline-offset-4 transition-all duration-200"
          style={{ color: '#E1E0CC' }}
        >
          sarthakshrivastava4634@gmail.com
        </motion.a>

        {/* Social pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-2 mb-20"
        >
          {socials.map(s => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-5 py-2 rounded-full border text-sm transition-all duration-200"
              style={{ color: 'rgba(225,224,204,0.7)', borderColor: 'rgba(225,224,204,0.15)', background: 'rgba(0,0,0,0.4)' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#000'; e.currentTarget.style.background = '#DEDBC8'; e.currentTarget.style.borderColor = '#DEDBC8' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(225,224,204,0.7)'; e.currentTarget.style.background = 'rgba(0,0,0,0.4)'; e.currentTarget.style.borderColor = 'rgba(225,224,204,0.15)' }}
            >
              {s.label}
              <ArrowRight size={12} className="-rotate-45" />
            </a>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="font-mono text-xs"
          style={{ color: 'rgba(225,224,204,0.25)' }}
        >
          Built with React + TypeScript + Framer Motion + GSAP · © 2025 Sarthak Shrivastav
        </motion.p>
      </div>
    </section>
  )
}
