import { useState, useEffect, Suspense, lazy } from 'react'
import { AnimatePresence } from 'framer-motion'
import Lenis from 'lenis'
import BootLoader from './components/BootLoader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import WhatIMake from './components/WhatIMake'
import Community from './components/Community'
import Support from './components/Support'
import Business from './components/Business'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'

// Lazy load the 3D scene
const Scene3D = lazy(() => import('./components/Scene3D'))

function App() {
  const [loading, setLoading] = useState(true)
  const [fxEnabled, setFxEnabled] = useState(true)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches)
      if (e.matches) {
        setFxEnabled(false)
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    // Initialize Lenis smooth scroll
    if (!reducedMotion) {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
      })

      function raf(time: number) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }

      requestAnimationFrame(raf)

      return () => {
        lenis.destroy()
      }
    }
  }, [reducedMotion])

  return (
    <>
      {/* Skip link for accessibility */}
      <a href="#main" className="skip-link">
        Skip to main content
      </a>

      {/* Custom cursor (desktop only) */}
      <CustomCursor />

      {/* Pinned 3D background */}
      <Suspense fallback={null}>
        <Scene3D fxEnabled={fxEnabled && !reducedMotion} />
      </Suspense>

      {/* Boot loader */}
      <AnimatePresence>
        {loading && (
          <BootLoader onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {/* Navbar */}
      <Navbar fxEnabled={fxEnabled} onToggleFx={() => setFxEnabled(!fxEnabled)} />

      {/* Main content */}
      <main id="main" className="relative z-10">
        <Hero />
        <About />
        <WhatIMake />
        <Community />
        <Support />
        <Business />
        <Footer />
      </main>

      {/* Fallback background when FX is disabled */}
      {!fxEnabled && (
        <div className="fixed inset-0 z-0 pointer-events-none grid-fallback" />
      )}
    </>
  )
}

export default App
