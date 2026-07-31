import { motion } from 'framer-motion'
import { useWeddingConfig } from '../hooks/useWeddingConfig.jsx'
import FloralDivider from './decor/FloralDivider.jsx'

export default function InvitationGate({ guestName, onOpen }) {
  const { config: wedding } = useWeddingConfig()

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-wine-800 px-6 text-center text-gold-100"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(217,181,103,0.18),transparent_60%)]" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative flex max-w-md flex-col items-center"
      >
        <p className="font-script text-3xl text-gold-300">Wedding Invitation</p>
        <FloralDivider className="my-5" />
        <h1 className="font-display text-2xl leading-tight sm:text-3xl">
          {wedding.groom.shortName} <span className="text-gold-300">&amp;</span> {wedding.bride.shortName}
        </h1>

        {guestName && (
          <p className="mt-6 text-sm tracking-wide text-gold-200/90">
            {wedding.defaultGuestGreeting}
            <br />
            <span className="font-display text-lg text-gold-100">{guestName}</span>
          </p>
        )}

        <button
          type="button"
          onClick={onOpen}
          className="group relative mt-10 overflow-hidden rounded-full border border-gold-300/70 px-8 py-3 font-display text-sm tracking-[0.2em] uppercase text-gold-100 transition hover:border-gold-200"
        >
          <span className="relative z-10">Mở Thiệp Mời</span>
          <span className="absolute inset-0 -translate-x-full bg-gold-400/20 transition-transform duration-500 group-hover:translate-x-0" />
        </button>
      </motion.div>
    </motion.div>
  )
}
