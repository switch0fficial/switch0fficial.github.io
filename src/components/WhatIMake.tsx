import { motion } from 'framer-motion'
import { FaGamepad, FaLaugh, FaVideo } from 'react-icons/fa'

export default function WhatIMake() {
  const cards = [
    {
      icon: FaGamepad,
      title: 'Gameplay Edits',
      description: 'High-energy Blood Strike montages and gameplay from other games. Quick cuts, sync to beat, and clutch plays.',
    },
    {
      icon: FaLaugh,
      title: 'Funny Clips',
      description: 'Epic fails, hilarious moments, and the kind of content that makes you laugh out loud.',
    },
    {
      icon: FaVideo,
      title: 'Editing Tutorials',
      description: 'Learn my editing techniques on the WhatsApp channel. From basics to advanced effects.',
    },
  ]

  return (
    <section id="what-i-make" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-orbitron text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-8 sm:mb-12 text-center glitch-hover"
        >
          WHAT I MAKE
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="glass-panel p-5 sm:p-6 hud-corner cursor-pointer group"
            >
              <motion.div
                className="text-3xl sm:text-4xl text-electric mb-3 sm:mb-4 group-hover:text-glow transition-colors"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <card.icon />
              </motion.div>
              <h3 className="font-orbitron text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">
                {card.title}
              </h3>
              <p className="font-rajdhani text-sm sm:text-base text-muted leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
