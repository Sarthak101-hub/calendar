import { ReactNode } from 'react'
import Navbar from './Navbar'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-bg text-primary min-h-screen">
      <Navbar />
      <main>{children}</main>
      <footer className="border-t border-primary/10 py-8 px-6 md:px-16 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="font-mono text-xs" style={{ color: 'rgba(225,224,204,0.25)' }}>
          © 2026 Sarthak Shrivastav
        </span>
        <span className="font-mono text-xs" style={{ color: 'rgba(225,224,204,0.18)' }}>
          Built with React + TypeScript + Framer Motion
        </span>
      </footer>
    </div>
  )
}
