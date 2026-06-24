import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface Segment { text: string; className?: string }

interface WordsPullUpProps {
  text?: string
  className?: string
  showAsterisk?: boolean
  segments?: Segment[]
  stagger?: number
}

export default function WordsPullUp({ text, className = '', showAsterisk = false, segments, stagger = 0.08 }: WordsPullUpProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  // Build list of {word, cls} pairs
  const words: { word: string; cls: string }[] = []
  if (segments) {
    segments.forEach(seg => {
      seg.text.split(' ').filter(Boolean).forEach(w => words.push({ word: w, cls: seg.className ?? '' }))
    })
  } else {
    text?.split(' ').filter(Boolean).forEach(w => words.push({ word: w, cls: className }))
  }

  return (
    <span ref={ref} className="inline-flex flex-wrap gap-x-[0.25em]">
      {words.map((item, i) => (
        <span key={i} className="overflow-hidden inline-block">
          <motion.span
            className={`inline-block ${item.cls}`}
            initial={{ y: 24, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: i * stagger, ease: [0.16, 1, 0.3, 1] }}
          >
            {i === words.length - 1 && showAsterisk ? (
              <span className="relative">
                {item.word}
                <span className="absolute" style={{ top: '0.65em', right: '-0.45em', fontSize: '0.31em', lineHeight: 1 }}>*</span>
              </span>
            ) : item.word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
