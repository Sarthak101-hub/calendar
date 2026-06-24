import { motion } from 'framer-motion'

const photos = [
  {
    id: 1,
    label: 'Agra, UP',
    sub: 'home base',
    accent: '#A78BFA',
    size: 'tall' as const,
    src: '/Gemini_Generated_Image_cw72njcw72njcw72.png',
    position: 'center top',
  },
  {
    id: 2,
    label: 'at the keyboard',
    sub: '2am session',
    accent: '#6EE7B7',
    size: 'normal' as const,
    src: '/Gemini_Generated_Image_kktpiykktpiykktp.png',
    position: 'center center',
  },
  {
    id: 3,
    label: 'first commit',
    sub: 'the beginning',
    accent: '#FFB7B2',
    size: 'normal' as const,
    src: '/Gemini_Generated_Image_6enwua6enwua6enw.png',
    position: 'center center',
  },
  {
    id: 4,
    label: 'debugging mode',
    sub: 'the grind',
    accent: '#60A5FA',
    size: 'tall' as const,
    src: '/Gemini_Generated_Image_77q8yd77q8yd77q8.png',
    position: 'center top',
  },
  {
    id: 5,
    label: 'learning docs',
    sub: 'always reading',
    accent: '#FBBF24',
    size: 'normal' as const,
    src: '/Gemini_Generated_Image_igqnzmigqnzmigqn.png',
    position: 'center center',
  },
  {
    id: 6,
    label: 'the Taj',
    sub: 'my backyard',
    accent: '#DEDBC8',
    size: 'normal' as const,
    src: '/Gemini_Generated_Image_gydnecgydnecgydn.png',
    position: 'center center',
  },
]

const interests = [
  { emoji: '🎮', label: 'Gaming', sub: 'FPS & strategy' },
  { emoji: '☕', label: 'Coffee', sub: 'fuels the sessions' },
  { emoji: '🎵', label: 'Music', sub: 'lo-fi while coding' },
  { emoji: '📚', label: 'Reading', sub: 'docs + tech blogs' },
  { emoji: '🏛️', label: 'Agra', sub: 'Taj in the backyard' },
  { emoji: '🌐', label: 'Open Web', sub: 'building in public' },
]

const vibes = [
  '"I don\'t follow tutorials. I read the docs, build something, break it, and understand why."',
  '"Every commit is a snapshot of where I was. The message is a note to my future self."',
  '"Being a beginner is a superpower — you have no bad habits yet."',
  '"Ship something broken rather than wait for perfect. Perfect never ships."',
  '"The best way to learn React is to build something you actually want to use."',
]

export default function LifePage() {
  return (
    <div className="bg-bg min-h-screen pt-24 pb-32">
      {/* Header */}
      <div className="px-6 md:px-16 mb-16">
        <p
          className="font-mono text-[10px] uppercase tracking-widest mb-3"
          style={{ color: 'rgba(225,224,204,0.3)' }}
        >
          // life
        </p>
        <h1 className="text-4xl md:text-6xl font-light mb-2" style={{ color: '#E1E0CC' }}>
          Beyond the terminal.
        </h1>
        <p className="font-cursive italic text-2xl" style={{ color: 'rgba(225,224,204,0.35)' }}>
          the human behind the code.
        </p>
      </div>

      {/* Photo grid */}
      <div className="px-4 md:px-8 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-5xl mx-auto">
          {photos.map((photo, i) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-[1.25rem] group cursor-pointer"
              style={{
                gridRow: photo.size === 'tall' ? 'span 2' : 'span 1',
                minHeight: photo.size === 'tall' ? '380px' : '180px',
                border: '1px solid rgba(255,255,255,0.06)',
                background: '#0a0a0a',
              }}
            >
              {/* Actual image */}
              <img
                src={photo.src}
                alt={photo.label}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ objectPosition: photo.position }}
                loading="lazy"
              />

              {/* Permanent subtle vignette so labels are always readable */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 pointer-events-none" />

              {/* Hover label overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/75 via-black/10 to-transparent">
                <p className="text-sm font-medium" style={{ color: '#E1E0CC' }}>{photo.label}</p>
                <p className="text-xs font-cursive italic" style={{ color: `${photo.accent}dd` }}>
                  {photo.sub}
                </p>
              </div>

              {/* Accent corner dot */}
              <div
                className="absolute top-3 right-3 w-5 h-5 rounded-full opacity-70"
                style={{ background: photo.accent, boxShadow: `0 0 8px ${photo.accent}88` }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Interests */}
      <div className="px-6 md:px-16 mb-20">
        <p
          className="font-mono text-[10px] uppercase tracking-widest mb-6"
          style={{ color: 'rgba(225,224,204,0.3)' }}
        >
          // when not coding
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 max-w-4xl">
          {interests.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="bg-surface border border-primary/10 rounded-2xl p-4 flex flex-col gap-1 hover:border-primary/25 transition-colors duration-200"
            >
              <span className="text-2xl">{item.emoji}</span>
              <span className="text-sm font-medium" style={{ color: '#E1E0CC' }}>{item.label}</span>
              <span className="text-xs font-cursive italic" style={{ color: 'rgba(225,224,204,0.45)' }}>
                {item.sub}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Philosophy quotes */}
      <div className="px-6 md:px-16">
        <p
          className="font-mono text-[10px] uppercase tracking-widest mb-8"
          style={{ color: 'rgba(225,224,204,0.3)' }}
        >
          // things i believe
        </p>
        <div className="flex flex-col gap-4 max-w-3xl">
          {vibes.map((vibe, i) => (
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="border-l-2 border-primary/20 pl-5 py-1"
            >
              <p className="font-cursive italic text-xl leading-snug" style={{ color: 'rgba(225,224,204,0.55)' }}>
                {vibe}
              </p>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </div>
  )
}
