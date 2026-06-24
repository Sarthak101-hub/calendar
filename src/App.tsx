import { BrowserRouter, Routes, Route } from 'react-router-dom'
import GrainOverlay from './components/GrainOverlay'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import WorkPage from './pages/WorkPage'
import ExperiencePage from './pages/ExperiencePage'
import TechPage from './pages/TechPage'
import BlogPage from './pages/BlogPage'
import LifePage from './pages/LifePage'

export default function App() {
  return (
    <BrowserRouter>
      <GrainOverlay />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/tech" element={<TechPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/life" element={<LifePage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
