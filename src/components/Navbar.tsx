import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar({ fxEnabled, onToggleFx }: { fxEnabled: boolean, onToggleFx: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'What I Make', href: '#what-i-make' },
    { name: 'Community', href: '#community' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'glass-panel py-3' : 'py-4 sm:py-5'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="font-orbitron text-xl sm:text-2xl font-bold text-white hover:text-glow transition-colors">
          SWITCH
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-muted hover:text-white transition-colors text-sm font-medium"
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={onToggleFx}
            className="px-3 py-1 border border-electric text-electric hover:bg-electric hover:text-white transition-all text-xs font-mono"
          >
            FX {fxEnabled ? 'ON' : 'OFF'}
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white p-2"
          aria-label="Toggle menu"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {mobileMenuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-panel border-t border-electric/30"
          >
            <div className="px-4 sm:px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-muted hover:text-white transition-colors text-base"
                >
                  {link.name}
                </a>
              ))}
              <button
                onClick={() => {
                  onToggleFx()
                  setMobileMenuOpen(false)
                }}
                className="px-3 py-1 border border-electric text-electric hover:bg-electric hover:text-white transition-all text-xs font-mono w-fit"
              >
                FX {fxEnabled ? 'ON' : 'OFF'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
