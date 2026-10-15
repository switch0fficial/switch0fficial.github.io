import { motion } from 'framer-motion'
import { FaTiktok } from 'react-icons/fa'
import { siteConfig } from '../config/site'

export default function Support() {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
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
            SUPPORT SWITCH
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-rajdhani text-base sm:text-lg md:text-xl text-muted mb-6 sm:mb-8 max-w-2xl mx-auto px-4"
          >
            If you enjoy the edits, follow the journey on TikTok and help keep the content moving.
          </motion.p>

          <motion.a
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={siteConfig.links.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 bg-electric hover:bg-glow text-white font-bold rounded-sm transition-all duration-300 text-sm sm:text-base"
          >
            <FaTiktok className="text-lg sm:text-xl" />
            Follow on TikTok
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
