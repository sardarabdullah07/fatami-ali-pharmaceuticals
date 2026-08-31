import { Suspense, lazy } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ScrollManager } from '@/components/ScrollManager'
import { usePrefersReducedMotion } from '@/hooks/useReducedMotion'
import Home from '@/pages/Home'

const About = lazy(() => import('@/pages/About'))
const Contact = lazy(() => import('@/pages/Contact'))
const NotFound = lazy(() => import('@/pages/NotFound'))

function RouteFallback() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center" role="status" aria-live="polite">
      <span className="sr-only">Loading page</span>
      <span aria-hidden="true" className="h-1.5 w-1.5 animate-pulse-node rounded-full bg-accent" />
    </div>
  )
}

export default function App() {
  const location = useLocation()
  const reduced = usePrefersReducedMotion()

  return (
    <>
      <ScrollManager />
      <Navbar />
      <main id="main">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: reduced ? 0 : 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            <Suspense fallback={<RouteFallback />}>
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                {/* The site was previously structured around /solutions. Keep
                    those links working rather than dropping them on a 404. */}
                <Route path="/solutions" element={<Navigate to="/about#products" replace />} />
                <Route path="/products" element={<Navigate to="/about#products" replace />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </>
  )
}
