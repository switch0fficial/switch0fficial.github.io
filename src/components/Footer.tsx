import { motion } from 'framer-motion'
import { FaTiktok } from 'react-icons/fa'
import { FaWhatsapp } from 'react-icons/fa6'
import { siteConfig } from '../config/site'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 border-t border-electric/30">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-orbitron text-xl sm:text-2xl font-bold text-white"
          >
            SWITCH
          </motion.div>

          {/* Social icons */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 sm:gap-6"
          >
            <a
              href={siteConfig.links.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="text-muted hover:text-glow transition-colors text-xl sm:text-2xl"
            >
              <FaTiktok />
            </a>
            <a
              href={siteConfig.links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="text-muted hover:text-glow transition-colors text-xl sm:text-2xl"
            >
              <FaWhatsapp />
            </a>
          </motion.div>

          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-rajdhani text-muted text-xs sm:text-sm"
          >
            © {currentYear} SWITCH · Made in Nigeria
          </motion.p>
        </div>
      </div>
    </footer>
  )
}
