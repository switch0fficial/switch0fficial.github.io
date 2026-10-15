import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaTiktok } from 'react-icons/fa'
import { FaWhatsapp } from 'react-icons/fa6'
import { siteConfig } from '../config/site'

export default function Hero() {
  const [imageExists, setImageExists] = useState(false)

  useEffect(() => {
    // Check if profile image exists
    const img = new Image()
    img.onload = () => setImageExists(true)
    img.onerror = () => setImageExists(false)
    img.src = siteConfig.paths.profile
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 relative">
      <div className="max-w-[1400px] mx-auto text-center w-full">
        {/* Profile picture HUD */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 mx-auto mb-6 sm:mb-8"
        >
          <div className="absolute inset-0 rounded-full border-2 border-electric" />
          <div className="absolute inset-2 rounded-full overflow-hidden bg-surface/50">
            {imageExists ? (
              <img
                src={siteConfig.paths.profile}
                alt="SWITCH profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted font-mono text-xs sm:text-sm">
                ADD YOUR PHOTO
              </div>
            )}
          </div>
          {/* Scanline effect */}
          <div className="absolute inset-0 scanline pointer-events-none" />
          {/* Glowing ring */}
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-full border border-glow opacity-50"
          />
        </motion.div>

        {/* Animated title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-orbitron text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-4 sm:mb-6 glitch-hover px-2"
        >
          SWITCH
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-rajdhani text-base sm:text-lg md:text-xl lg:text-2xl text-muted mb-8 sm:mb-10 px-4 sm:px-6 max-w-3xl mx-auto"
        >
          Blood Strike edits & funny gaming clips, straight from Nigeria 🇳🇬
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-10 sm:mb-12 px-4 sm:px-0"
        >
          <a
            href={siteConfig.links.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 sm:px-8 py-3 bg-electric hover:bg-glow text-white font-bold rounded-sm transition-all duration-300 flex items-center justify-center gap-2 group text-sm sm:text-base w-full sm:w-auto"
          >
            <FaTiktok className="text-lg sm:text-xl" />
            Follow on TikTok
          </a>
          <a
            href={siteConfig.links.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 sm:px-8 py-3 border-2 border-electric text-electric hover:bg-electric hover:text-white font-bold rounded-sm transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base w-full sm:w-auto"
          >
            <FaWhatsapp className="text-lg sm:text-xl" />
            Join WhatsApp Channel
          </a>
        </motion.div>

        {/* Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="overflow-hidden py-3 sm:py-4 border-y border-electric/30 bg-surface/30"
        >
          <div className="whitespace-nowrap marquee font-mono text-xs sm:text-sm text-electric">
            BLOOD STRIKE • GAMEPLAY EDITS • FUNNY CLIPS • EDITING TUTORIALS • BLOOD STRIKE • GAMEPLAY EDITS • FUNNY CLIPS • EDITING TUTORIALS •
          </div>
        </motion.div>
      </div>
    </section>
  )
}
