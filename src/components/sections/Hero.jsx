import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useWeddingConfig } from '../../hooks/useWeddingConfig.jsx'
import Countdown from '../Countdown.jsx'
import FloralDivider from '../decor/FloralDivider.jsx'
import CornerOrnament from '../decor/CornerOrnament.jsx'

export default function Hero({ guestName }) {
  const { config: wedding } = useWeddingConfig()
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const glowY = useTransform(scrollYProgress, [0, 1], ['0%', '35%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-wine-800 via-wine-700 to-wine-800 px-6 py-20 text-center text-gold-100"
    >
      <motion.div
        style={{ y: glowY }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(217,181,103,0.22),transparent_55%)]"
      />
      <div className="pointer-events-none absolute inset-6 rounded-[2rem] border border-gold-300/25 sm:inset-10" />
      <CornerOrnament corner="top-left" />
      <CornerOrnament corner="top-right" />
      <CornerOrnament corner="bottom-left" />
      <CornerOrnament corner="bottom-right" />

      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="relative flex flex-col items-center">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-script text-2xl text-gold-300 sm:text-3xl"
        >
          {wedding.hero.heading}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="mt-4 font-display text-4xl leading-tight sm:text-6xl"
        >
          <span className="shimmer-gold">{wedding.groom.shortName}</span>
          <span className="mx-3 text-gold-300 sm:mx-5">&amp;</span>
          <span className="shimmer-gold">{wedding.bride.shortName}</span>
        </motion.h1>

        <FloralDivider className="my-6" />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-md text-sm tracking-wide text-gold-200/90 sm:text-base"
        >
          {wedding.hero.subheading}
        </motion.p>

        {guestName && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mt-6 text-sm text-gold-200/80"
          >
            {wedding.defaultGuestGreeting}{' '}
            <span className="font-display text-base text-gold-100">{guestName}</span>
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-10"
        >
          <Countdown targetDate={wedding.weddingDate} />
        </motion.div>
      </motion.div>
    </section>
  )
}
