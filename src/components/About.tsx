import { motion } from 'framer-motion'
import { siteConfig } from '../config/site'

export default function About() {
  const { stats } = siteConfig
  const hasStats = stats.followers || stats.views || stats.videos

  return (
    <section id="about" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-panel p-6 sm:p-8 md:p-12 hud-corner"
        >
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-orbitron text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 glitch-hover"
          >
            ABOUT
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-rajdhani text-base sm:text-lg md:text-xl text-muted leading-relaxed mb-6 sm:mb-8"
          >
            I'm a Nigerian content creator passionate about gaming and editing. I started making Blood Strike gameplay edits because I wanted to showcase the intense moments and funny fails that make gaming so entertaining. What began as a hobby has grown into a community of gamers who love high-energy edits and genuine content. Whether it's a clutch play, a hilarious mistake, or a tutorial to help you level up your editing skills, I'm here to keep the content moving.
          </motion.p>

          {hasStats && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-3 gap-3 sm:gap-4 pt-6 sm:pt-8 border-t border-electric/30"
            >
              {stats.followers && (
                <div className="text-center">
                  <div className="font-orbitron text-xl sm:text-2xl md:text-3xl font-bold text-electric">
                    {stats.followers}
                  </div>
                  <div className="font-mono text-xs sm:text-sm text-muted">FOLLOWERS</div>
                </div>
              )}
              {stats.views && (
                <div className="text-center">
                  <div className="font-orbitron text-xl sm:text-2xl md:text-3xl font-bold text-electric">
                    {stats.views}
                  </div>
                  <div className="font-mono text-xs sm:text-sm text-muted">VIEWS</div>
                </div>
              )}
              {stats.videos && (
                <div className="text-center">
                  <div className="font-orbitron text-xl sm:text-2xl md:text-3xl font-bold text-electric">
                    {stats.videos}
                  </div>
                  <div className="font-mono text-xs sm:text-sm text-muted">VIDEOS</div>
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
