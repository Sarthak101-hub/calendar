import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

interface Node {
  id: string
  label: string
  emoji: string
  angle: number
  distance: number
  color: string
  items: string[]
  snippet: string
}

const CENTER = { x: 300, y: 300 }

const satellites: Node[] = [
  {
    id: 'languages',
    label: 'Languages',
    emoji: '🧠',
    angle: -90,
    distance: 190,
    color: '#FFB7B2',
    items: ['JavaScript ES6+', 'C (fundamentals)', 'Java (OOP)'],
    snippet: 'const vibe = "immaculate";',
  },
  {
    id: 'frontend',
    label: 'Frontend',
    emoji: '🎨',
    angle: -18,
    distance: 190,
    color: '#A78BFA',
    items: ['HTML5 / CSS3', 'Tailwind CSS', 'React.js', 'React Router'],
    snippet: '<Sarthak mode="building" />',
  },
  {
    id: 'backend',
    label: 'Backend',
    emoji: '⚙️',
    angle: 54,
    distance: 190,
    color: '#6EE7B7',
    items: ['Node.js', 'Express.js', 'REST APIs', 'Middleware'],
    snippet: 'app.listen(3000, () => ship())',
  },
  {
    id: 'database',
    label: 'Database',
    emoji: '🗄️',
    angle: 126,
    distance: 190,
    color: '#FBBF24',
    items: ['MongoDB', 'Mongoose', 'Schema design', 'CRUD queries'],
    snippet: 'db.find({ vibe: "good" })',
  },
  {
    id: 'tools',
    label: 'Tools',
    emoji: '🛠️',
    angle: 198,
    distance: 190,
    color: '#60A5FA',
    items: ['Git / GitHub', 'VS Code', 'Postman', 'npm'],
    snippet: 'git push origin main',
  },
]

function polar(cx: number, cy: number, angleDeg: number, r: number) {
  const rad = (angleDeg - 90) * (Math.PI / 180)
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  }
}

function SatelliteNode({
  node,
  centerInView,
  delay,
  onSelect,
  isSelected,
}: {
  node: Node
  centerInView: boolean
  delay: number
  onSelect: () => void
  isSelected: boolean
}) {
  const pos = polar(CENTER.x, CENTER.y, node.angle, node.distance)
  const labelY = node.angle > 90 && node.angle < 270 ? pos.y + 44 : pos.y - 34

  return (
    <g>
      <motion.line
        x1={CENTER.x}
        y1={CENTER.y}
        x2={pos.x}
        y2={pos.y}
        stroke={node.color}
        strokeWidth="1"
        strokeOpacity="0.35"
        strokeDasharray="4 4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={centerInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 0.8, delay, ease: 'easeInOut' }}
      />

      <motion.circle
        cx={pos.x}
        cy={pos.y}
        r={isSelected ? 28 : 22}
        fill="#101010"
        stroke={node.color}
        strokeWidth={isSelected ? 2 : 1}
        style={{ cursor: 'pointer' }}
        initial={{ scale: 0, opacity: 0 }}
        animate={centerInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.5, delay: delay + 0.3, ease: [0.16, 1, 0.3, 1] }}
        onClick={onSelect}
        whileHover={{ scale: 1.15 }}
      />

      <motion.text
        x={pos.x}
        y={pos.y + 5}
        textAnchor="middle"
        fontSize="14"
        initial={{ opacity: 0 }}
        animate={centerInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3, delay: delay + 0.5 }}
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      >
        {node.emoji}
      </motion.text>

      <motion.text
        x={pos.x}
        y={labelY}
        textAnchor="middle"
        fontSize="11"
        fill={node.color}
        fontFamily="'JetBrains Mono', monospace"
        initial={{ opacity: 0 }}
        animate={centerInView ? { opacity: 0.8 } : { opacity: 0 }}
        transition={{ duration: 0.4, delay: delay + 0.6 }}
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      >
        {node.label}
      </motion.text>
    </g>
  )
}

export default function TechPage() {
  const constellationRef = useRef<HTMLDivElement>(null)
  const centerInView = useInView(constellationRef, { once: true, margin: '-20% 0px -20% 0px' })
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const selected = satellites.find(s => s.id === selectedId)

  return (
    <div className="bg-bg min-h-screen pt-24">
      {/* Page header */}
      <div className="px-6 md:px-16 mb-16">
        <p
          className="font-mono text-[10px] uppercase tracking-widest mb-3"
          style={{ color: 'rgba(225,224,204,0.3)' }}
        >
          // tech_stack
        </p>
        <h1 className="text-4xl md:text-6xl font-light" style={{ color: '#E1E0CC' }}>
          The tools behind the magic.
        </h1>
        <p className="font-cursive italic text-2xl mt-2" style={{ color: 'rgba(225,224,204,0.35)' }}>
          click a node to explore.
        </p>
      </div>

      {/* Constellation */}
      <div
        ref={constellationRef}
        className="flex flex-col lg:flex-row items-center gap-12 px-6 md:px-16 max-w-6xl mx-auto py-12"
      >
        {/* SVG Constellation */}
        <div className="relative flex-shrink-0" style={{ width: '600px', maxWidth: '100%' }}>
          <svg
            viewBox="0 0 600 600"
            className="w-full"
            style={{ overflow: 'visible' }}
          >
            {/* Background grid dots */}
            {Array.from({ length: 8 }).map((_, row) =>
              Array.from({ length: 8 }).map((_, col) => (
                <circle
                  key={`${row}-${col}`}
                  cx={50 + col * 72}
                  cy={50 + row * 72}
                  r="1"
                  fill="rgba(222,219,200,0.06)"
                />
              ))
            )}

            {satellites.map((node, i) => (
              <SatelliteNode
                key={node.id}
                node={node}
                centerInView={centerInView}
                delay={i * 0.12}
                onSelect={() => setSelectedId(selectedId === node.id ? null : node.id)}
                isSelected={selectedId === node.id}
              />
            ))}

            {/* Center node */}
            <motion.circle
              cx={CENTER.x}
              cy={CENTER.y}
              r="48"
              fill="#101010"
              stroke="#DEDBC8"
              strokeWidth="1.5"
              initial={{ scale: 0.3, opacity: 0 }}
              animate={centerInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.circle
              cx={CENTER.x}
              cy={CENTER.y}
              r="58"
              fill="none"
              stroke="rgba(222,219,200,0.12)"
              strokeWidth="1"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={centerInView ? { scale: [1, 1.15, 1], opacity: [0, 0.4, 0] } : {}}
              transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
            />
            <motion.text
              x={CENTER.x}
              y={CENTER.y - 8}
              textAnchor="middle"
              fontSize="22"
              initial={{ opacity: 0 }}
              animate={centerInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
            >
              🌐
            </motion.text>
            <motion.text
              x={CENTER.x}
              y={CENTER.y + 14}
              textAnchor="middle"
              fontSize="10"
              fill="rgba(222,219,200,0.7)"
              fontFamily="'JetBrains Mono', monospace"
              initial={{ opacity: 0 }}
              animate={centerInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
            >
              Full Stack
            </motion.text>
          </svg>
        </div>

        {/* Detail panel */}
        <div className="flex-1 min-h-[280px] flex items-center">
          <AnimatePresence mode="wait">
            {selected ? (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.97 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="bg-surface border border-primary/10 rounded-[1.5rem] p-8 w-full relative overflow-hidden"
              >
                <div
                  className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-20 pointer-events-none"
                  style={{ background: selected.color }}
                />
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-3xl">{selected.emoji}</span>
                  <div>
                    <h3 className="text-xl font-medium" style={{ color: '#E1E0CC' }}>
                      {selected.label}
                    </h3>
                    <p
                      className="font-cursive italic text-base"
                      style={{ color: `${selected.color}99` }}
                    >
                      my toolkit
                    </p>
                  </div>
                </div>
                <ul className="flex flex-col gap-2 mb-6">
                  {selected.items.map(item => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm"
                      style={{ color: 'rgba(225,224,204,0.6)' }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: selected.color }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="bg-black/60 rounded-xl px-4 py-3 border border-primary/10">
                  <code className="font-mono text-[12px]" style={{ color: `${selected.color}cc` }}>
                    {selected.snippet}
                  </code>
                </div>
                <p className="font-mono text-[10px] mt-4" style={{ color: 'rgba(225,224,204,0.2)' }}>
                  click node again to deselect
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full text-center py-12"
              >
                <p className="text-4xl mb-3">👆</p>
                <p
                  className="font-cursive italic text-xl"
                  style={{ color: 'rgba(225,224,204,0.3)' }}
                >
                  click a node to explore the stack
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
