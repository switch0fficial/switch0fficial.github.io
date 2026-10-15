import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function BootLoader({ onComplete }: { onComplete: () => void }) {
  const [isOn, setIsOn] = useState(false)
  const [showText, setShowText] = useState(false)
  const [skipped, setSkipped] = useState(false)

  useEffect(() => {
    const timer1 = setTimeout(() => setIsOn(true), 300)
    const timer2 = setTimeout(() => setShowText(true), 800)
    const timer3 = setTimeout(() => {
      if (!skipped) onComplete()
    }, 2000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [onComplete, skipped])

  const handleSkip = () => {
    setSkipped(true)
    onComplete()
  }

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-bg"
    >
      <div className="text-center">
        {/* Animated switch */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <svg
            width="120"
            height="120"
            viewBox="0 0 100 100"
            className="mx-auto"
          >
            <motion.g
              fill="none"
              stroke="#1F6BFF"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ opacity: 0.3 }}
              animate={{ opacity: isOn ? 1 : 0.3 }}
              transition={{ duration: 0.3 }}
            >
              <circle cx="50" cy="50" r="35" />
              <motion.line
                x1="50"
                y1="25"
                x2="50"
                y2="50"
                initial={{ y2: 25 }}
                animate={{ y2: isOn ? 50 : 25 }}
                transition={{ duration: 0.3 }}
              />
            </motion.g>
          </svg>
        </motion.div>

        {/* Glitch text reveal */}
        {showText && (
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-orbitron text-4xl md:text-6xl font-bold text-white glitch-hover"
          >
            SWITCH
          </motion.h1>
        )}

        {/* Skip button */}
        <button
          onClick={handleSkip}
          className="mt-8 px-4 py-2 text-muted text-sm hover:text-glow transition-colors"
        >
          SKIP
        </button>
      </div>
    </motion.div>
  )
}
