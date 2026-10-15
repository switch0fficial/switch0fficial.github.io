import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaEnvelope, FaCopy } from 'react-icons/fa'
import { siteConfig } from '../config/site'

export default function Business() {
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.links.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy email:', err)
    }
  }

  return (
    <section id="contact" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel p-6 sm:p-8 md:p-12 hud-corner text-center"
        >
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-orbitron text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 glitch-hover"
          >
            BUSINESS / COLLABORATIONS
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-rajdhani text-base sm:text-lg md:text-xl text-muted mb-6 sm:mb-8 max-w-2xl mx-auto px-4"
          >
            For business inquiries, collaborations, partnerships and creator opportunities.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4"
          >
            <a
              href={`mailto:${siteConfig.links.email}?subject=Collab inquiry - SWITCH`}
              className="flex items-center gap-2 px-4 sm:px-6 py-3 border-2 border-electric text-electric hover:bg-electric hover:text-white font-bold rounded-sm transition-all duration-300 text-sm sm:text-base w-full sm:w-auto justify-center"
            >
              <FaEnvelope />
              {siteConfig.links.email}
            </a>
            <button
              onClick={handleCopyEmail}
              className="flex items-center gap-2 px-4 sm:px-6 py-3 bg-surface border border-electric/30 text-white hover:border-electric transition-all duration-300 rounded-sm text-sm sm:text-base w-full sm:w-auto justify-center"
            >
              <FaCopy />
              {copied ? 'Copied!' : 'Copy email'}
            </button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="font-rajdhani text-muted mt-4 sm:mt-6 text-sm sm:text-base"
          >
            You can also reach me by TikTok DM.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
