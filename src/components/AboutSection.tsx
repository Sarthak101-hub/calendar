import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import WordsPullUp from './WordsPullUp'

const PARA = "I'm a BCA student at Dr. Bhimrao Ambedkar University, Agra (2025–2028), self-teaching the full stack from the ground up. HTML and CSS led me to JavaScript, which led me to React, which led me down the rabbit hole of Node.js and MongoDB. I've shipped two full-stack apps already — still learning every day, still working on the next crazy thing."

function AnimatedLetter({ char, index, total, scrollYProgress }: {
  char: string; index: number; total: number
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress']
}) {
  const charProgress = index / total
  const opacity = useTransform(scrollYProgress, [charProgress - 0.1, charProgress + 0.06], [0.15, 1])
  return (
    <motion.span style={{ opacity }} className="inline-block whitespace-pre">
      {char}
    </motion.span>
  )
}

const facts = [
  { emoji: '☕', text: 'coffee-powered', cursive: true },
  { emoji: '📚', text: 'BCA 2025–2028' },
  { emoji: '⚛️', text: 'React learner', cursive: true },
  { emoji: '🟢', text: 'Node.js fan' },
  { emoji: '🍃', text: 'MongoDB curious' },
  { emoji: '🎮', text: 'gamer at heart', cursive: true },
  { emoji: '📍', text: 'Agra, India' },
  { emoji: '🚀', text: 'crazy projects soon' },
]

export default function AboutSection() {
  const paraRef = useRef<HTMLDivElement>(null)
  const inView = useInView(paraRef, { once: true, margin: '-100px' })
  const { scrollYProgress } = useScroll({
    target: paraRef,
    offset: ['start 0.8', 'end 0.2'],
  })

  const chars = PARA.split('')

  return (
    <section id="about" className="bg-black py-20 md:py-32 px-6 md:px-20 relative overflow-hidden">
      {/* Softly blobs */}
      <div className="absolute top-[-15%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[130px] pointer-events-none animate-float" style={{ background: 'rgba(255,183,178,0.05)' }} />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[100px] pointer-events-none animate-float-reverse" style={{ background: 'rgba(239,237,244,0.04)' }} />

      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <p className="font-mono text-[10px] sm:text-xs text-primary/50 mb-4 tracking-widest uppercase">// who I am</p>

        {/* Main heading: Prisma WordsPullUpMultiStyle */}
        <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-4xl leading-[0.95] sm:leading-[0.9] mb-10" style={{ color: '#E1E0CC' }}>
          <WordsPullUp
            segments={[
              { text: 'I am Sarthak,', className: 'font-normal' },
              { text: 'a self-taught full stack developer.', className: 'italic font-serif text-primary/80' },
              { text: 'I build for the web and learn every day.', className: 'font-normal' },
            ]}
          />
        </div>

        {/* AnimatedLetter scroll reveal paragraph */}
        <div ref={paraRef} className="max-w-3xl mb-16 text-sm sm:text-base md:text-lg leading-relaxed" style={{ color: '#DEDBC8' }}>
          {chars.map((char, i) => (
            <AnimatedLetter key={i} char={char} index={i} total={chars.length} scrollYProgress={scrollYProgress} />
          ))}
        </div>

        {/* Gen-Z random facts grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3"
        >
          {facts.map((f, i) => (
            <motion.div
              key={f.text}
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="bg-surface border border-primary/10 rounded-2xl p-4 flex flex-col gap-1 hover:border-primary/30 transition-colors duration-300"
              style={{ borderRadius: '1.2rem' }}
            >
              <span className="text-2xl">{f.emoji}</span>
              <span
                className={`text-sm leading-tight ${f.cursive ? 'font-cursive text-lg text-primary/70 italic' : 'text-primary/60 font-light'}`}
              >
                {f.text}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
