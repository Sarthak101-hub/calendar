import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import WordsPullUp from './WordsPullUp'

const HERO_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_171521_25968ba2-b594-4b32-aab7-f6b69398a6fa.mp4'
const TYPEWRITER_TEXT = 'full stack developer. building for the web. one commit at a time.'

function useTypewriter(text: string, speed = 40, startDelay = 900) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  useEffect(() => {
    let idx = 0
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        idx++
        setDisplayed(text.slice(0, idx))
        if (idx >= text.length) {
          clearInterval(interval)
          setDone(true)
        }
      }, speed)
      return () => clearInterval(interval)
    }, startDelay)
    return () => clearTimeout(timeout)
  }, [text, speed, startDelay])
  return { displayed, done }
}

const MAIL = 'mailto:sankalpshrivastav2001@gmail.com'

const pillButtons = [
  { label: 'Hire me', href: MAIL },
  { label: 'See my work', href: '/work' },
  { label: "Let's connect", href: MAIL },
]

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [pillsVisible, setPillsVisible] = useState(false)
  const { displayed, done } = useTypewriter(TYPEWRITER_TEXT)

  // Pills appear 400ms after load — independent of typewriter
  useEffect(() => {
    const t = setTimeout(() => setPillsVisible(true), 400)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className="h-screen p-3 md:p-5 relative overflow-hidden">
      {/* Rounded inset container */}
      <div className="relative w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden">

        {/* Autoplay video — GPU-composited, no JS seek */}
        <video
          ref={videoRef}
          src={HERO_VIDEO}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: '70% center', willChange: 'transform' }}
        />

        {/* Lightweight gradient overlay — no mix-blend-mode */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.65) 100%)',
          }}
        />

        {/* Bottom content: 12-col grid */}
        <div className="absolute bottom-0 left-0 right-0 grid grid-cols-12 gap-2 p-5 md:p-8">
          {/* Left col: giant name — no overflow-hidden here, WordsPullUp handles its own per-word clipping */}
          <div className="col-span-8">
            <h1
              className="font-medium tracking-[-0.07em]"
              style={{
                fontSize: 'clamp(16vw, 20vw, 20vw)',
                lineHeight: 1,
                color: '#E1E0CC',
                textShadow: '0 2px 40px rgba(0,0,0,0.4)',
                paddingBottom: '0.12em',
              }}
            >
              <WordsPullUp text="Sarthak" showAsterisk className="" />
            </h1>
          </div>

          {/* Right col: intro + typewriter + pills */}
          <div className="col-span-4 flex flex-col justify-end pb-1 gap-3">
            {/* Intro label — readable, subtle not blurred */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-[10px] sm:text-xs leading-[1.4] font-light"
              style={{ color: 'rgba(225,224,204,0.55)' }}
            >
              Hey, I'm Sarthak —<br />
              a full stack developer in the making.
            </motion.p>

            {/* Typewriter */}
            <p
              className="text-[11px] sm:text-[13px] leading-[1.35] min-h-[32px]"
              style={{ color: 'rgba(225,224,204,0.9)' }}
            >
              {displayed}
              {!done && (
                <span
                  className="inline-block w-[1.5px] h-[0.85em] bg-primary align-middle ml-[2px]"
                  style={{ animation: 'blink 1s step-end infinite' }}
                />
              )}
            </p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-[10px] sm:text-xs leading-[1.3] hidden sm:block"
              style={{ color: 'rgba(222,219,200,0.5)' }}
            >
              Building with React, Node.js, and MongoDB. BCA student from Agra, India. Open to opportunities.
            </motion.p>

            {/* Action pills */}
            <div
              className="flex flex-wrap gap-y-1"
              style={{
                opacity: pillsVisible ? 1 : 0,
                transform: pillsVisible ? 'translateY(0)' : 'translateY(8px)',
                transition: 'opacity 0.4s ease, transform 0.4s ease',
              }}
            >
              {pillButtons.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  {...(href.startsWith('mailto') ? {} : { onClick: (e) => { e.preventDefault(); window.location.href = href } })}
                  className="inline-flex items-center justify-center bg-black/50 border border-primary/20 rounded-full text-[10px] sm:text-[11px] px-3 py-[0.25em] mx-[0.15em] mb-[0.3em] whitespace-nowrap transition-all duration-200 hover:bg-primary hover:text-black cursor-pointer"
                  style={{ color: 'rgba(225,224,204,0.8)' }}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
