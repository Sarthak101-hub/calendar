import { useState } from 'react'
import { motion } from 'framer-motion'

interface Post {
  id: string
  date: string
  title: string
  tags: string[]
  content: string
  mood: string
}

const posts: Post[] = [
  {
    id: '1',
    date: '2025-06-18',
    title: 'I shipped Ajaia Docs. Here\'s what building it actually taught me.',
    tags: ['Full Stack', 'React', 'Supabase'],
    mood: '🚀',
    content: `I built Ajaia Docs as a job assessment — a collaborative document editor with auth, real-time saves, file uploads, and document sharing. Here's what I didn't expect.

The hardest part wasn't the code. It was deciding what "done" actually means for a feature. The rich text editor (TipTap) took 20 minutes to set up. Making the toolbar feel natural, handling edge cases in the save state, showing the right status indicator at the right time — that took two days.

Auto-save sounds trivial: debounce the editor updates, POST to the API, show "saved." But what about when the save fails? What about concurrent edits from the same user in two tabs? What about the initial load where you don't want to trigger a save immediately? Each question revealed another layer.

The biggest lesson: real features are 20% implementation and 80% handling the edge cases. Tutorials never show the 80%.`,
  },
  {
    id: '2',
    date: '2025-06-10',
    title: 'Supabase made auth feel like cheating — and that\'s the point',
    tags: ['Supabase', 'Auth', 'Backend'],
    mood: '💡',
    content: `Before Supabase, my mental model for auth was: set up Passport.js, write JWT logic, manage refresh tokens, build a users table, hash passwords with bcrypt. A full day of plumbing before you even build the product.

With Supabase: three lines of client code and you have email/password sign-up, session management, and a users table with Row Level Security. The session persists in localStorage automatically. You just call supabase.auth.signUp() and it works.

What surprised me: RLS (Row Level Security) policies. Instead of filtering data in your API routes, you write SQL policies that say "users can only read rows where user_id = auth.uid()." The database enforces it. You can't accidentally return the wrong user's data because the query itself is scoped.

It's not magic — it's Postgres under the hood and you can see every query in the dashboard. That transparency is what makes it trustworthy.`,
  },
  {
    id: '3',
    date: '2025-06-02',
    title: 'TipTap is the best thing I\'ve found for rich text in React',
    tags: ['React', 'Frontend', 'Editor'],
    mood: '✍️',
    content: `I tried three rich text editor libraries before landing on TipTap. Draft.js felt like learning a framework inside a framework. Quill's React integration felt hacky — the library doesn't think in components. TipTap clicked immediately.

The mental model: TipTap is built on ProseMirror but exposes everything as React-friendly extensions. You compose your editor from extensions — Bold, Italic, Heading, BulletList — and each one is a self-contained unit you can configure or replace.

The toolbar is just buttons that call editor.chain().focus().toggleBold().run(). You control everything. No magic class names, no fighting with the DOM.

The gotcha I hit: TipTap's output is HTML by default. If you want to store it as JSON (cleaner for diffs and versioning), you need the .getJSON() method and to restore with editor.commands.setContent(jsonContent). I learned this after already storing HTML in Supabase — migrating was annoying.`,
  },
  {
    id: '4',
    date: '2025-05-25',
    title: 'Deploying full-stack apps for free: Vercel + Render setup',
    tags: ['DevOps', 'Deployment', 'Node.js'],
    mood: '☁️',
    content: `For Ajaia Docs I needed to deploy a React frontend and a Node.js/Express backend separately — both for free. Here's exactly what I did.

Frontend → Vercel. Connect GitHub repo, set the build command (npm run build), set the output directory (dist for Vite). Add environment variables in the Vercel dashboard. Done. Every push to main auto-deploys.

Backend → Render. Create a Web Service, point it at the backend folder. Set the start command (node server.js or npm start). Free tier spins down after 15 minutes of inactivity — the first request after idle takes 30-60 seconds. For a demo app this is fine. For production you'd use a paid plan.

The tricky part: CORS. Your Render backend needs to allow requests from your Vercel domain. I set ALLOWED_ORIGIN as an environment variable and used it in the cors() middleware. Don't hardcode it — you'll forget to change it and spend an hour debugging 403s.

One more thing: set all secrets as environment variables in both platforms. Never commit .env files.`,
  },
  {
    id: '5',
    date: '2025-05-15',
    title: 'Building a finance tracker taught me what "state management" actually means',
    tags: ['React', 'Firebase', 'Frontend'],
    mood: '📊',
    content: `For the Smart Finance project I used Firebase Firestore as the database with real-time listeners. This forced me to think about state differently than I had before.

With a REST API, state is simple: fetch on mount, store in useState, re-fetch when the user does something. With Firestore's onSnapshot(), the database pushes updates to your app whenever data changes. Your UI is always in sync — but you have to manage subscriptions manually.

The bug I kept hitting: I'd set up a listener inside a useEffect, but forget to return the unsubscribe function. The listener would keep running after the component unmounted, trying to update state on a component that no longer existed. React would throw "Can't perform a state update on an unmounted component." Fix: always return the unsubscribe from your useEffect cleanup.

This taught me that state management isn't just "where does the data live." It's "who owns the data lifecycle, and what happens when that owner goes away."`,
  },
]

const ALL_TAGS = Array.from(new Set(posts.flatMap(p => p.tags)))

export default function BlogPage() {
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const filtered = activeTag ? posts.filter(p => p.tags.includes(activeTag)) : posts

  return (
    <div className="bg-bg min-h-screen pt-24 px-6 md:px-16 pb-32">
      {/* Header */}
      <div className="mb-12">
        <p
          className="font-mono text-[10px] uppercase tracking-widest mb-3"
          style={{ color: 'rgba(225,224,204,0.3)' }}
        >
          // learning_log
        </p>
        <h1 className="text-4xl md:text-6xl font-light mb-2" style={{ color: '#E1E0CC' }}>
          What I'm learning.
        </h1>
        <p className="font-cursive italic text-xl" style={{ color: 'rgba(225,224,204,0.35)' }}>
          building in public. documenting everything.
        </p>
      </div>

      {/* Tag filter */}
      <div className="flex flex-wrap gap-2 mb-10">
        <button
          onClick={() => setActiveTag(null)}
          className="px-3 py-1 rounded-full text-xs font-mono transition-all duration-200"
          style={{
            background: activeTag === null ? '#DEDBC8' : 'rgba(255,255,255,0.05)',
            color: activeTag === null ? '#000' : 'rgba(225,224,204,0.5)',
            border: '1px solid rgba(225,224,204,0.12)',
          }}
        >
          all
        </button>
        {ALL_TAGS.map(tag => (
          <button
            key={tag}
            onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            className="px-3 py-1 rounded-full text-xs font-mono transition-all duration-200"
            style={{
              background: activeTag === tag ? '#DEDBC8' : 'rgba(255,255,255,0.05)',
              color: activeTag === tag ? '#000' : 'rgba(225,224,204,0.5)',
              border: '1px solid rgba(225,224,204,0.12)',
            }}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Posts */}
      <div className="flex flex-col gap-6 max-w-3xl mx-auto">
        {filtered.map((post, i) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="bg-surface border border-primary/10 rounded-[1.25rem] p-7 hover:border-primary/25 transition-colors duration-300"
          >
            {/* Meta */}
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span className="text-xl">{post.mood}</span>
              <span className="font-mono text-[11px]" style={{ color: 'rgba(225,224,204,0.3)' }}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
              <div className="flex gap-1.5 flex-wrap">
                {post.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-full text-[10px] font-mono cursor-pointer"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      color: 'rgba(225,224,204,0.4)',
                      border: '1px solid rgba(225,224,204,0.1)',
                    }}
                    onClick={() => setActiveTag(tag)}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Title */}
            <h2
              className="text-lg md:text-xl font-medium mb-4 leading-tight"
              style={{ color: '#E1E0CC' }}
            >
              {post.title}
            </h2>

            {/* Content — first paragraph only */}
            <p className="text-sm leading-[1.75]" style={{ color: 'rgba(225,224,204,0.5)' }}>
              {post.content.split('\n\n')[0]}
            </p>
          </motion.article>
        ))}
      </div>

      {/* Coming soon */}
      <div className="mt-16 max-w-3xl mx-auto">
        <div className="border border-primary/10 rounded-2xl p-6 text-center">
          <p className="font-cursive italic text-xl mb-2" style={{ color: 'rgba(225,224,204,0.4)' }}>
            more dropping soon.
          </p>
          <p className="font-mono text-xs" style={{ color: 'rgba(225,224,204,0.2)' }}>
            building in public — github.com/Sarthak101-hub
          </p>
        </div>
      </div>
    </div>
  )
}
