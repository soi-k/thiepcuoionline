import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useWeddingConfig } from '../hooks/useWeddingConfig.jsx'
import { useHeartBursts } from '../hooks/useHeartBursts.jsx'
import FloralDivider from './decor/FloralDivider.jsx'

const OPEN_DURATION = 900

export default function InvitationGate({ guestName, onOpen }) {
  const { config: wedding } = useWeddingConfig()
  const [opening, setOpening] = useState(false)
  const envelopeRef = useRef(null)
  const { trigger, portal } = useHeartBursts()

  const handleOpen = () => {
    if (opening) return
    setOpening(true)

    const rect = envelopeRef.current?.getBoundingClientRect()
    if (rect) {
      trigger(rect.left + rect.width / 2, rect.top + rect.height * 0.35)
    }

    setTimeout(onOpen, OPEN_DURATION)
  }

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-wine-800 px-6 text-center text-gold-100"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(217,143,130,0.2),transparent_60%)]" />

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
          onClick={handleOpen}
          disabled={opening}
          aria-label="Chạm để mở thiệp"
          className="group mt-10 disabled:pointer-events-none"
          style={{ perspective: 900 }}
        >
          <div ref={envelopeRef} className="relative h-36 w-64 sm:h-40 sm:w-72">
            {/* Thân phong bì */}
            <div className="absolute inset-0 overflow-hidden rounded-lg bg-wine-700 shadow-xl">
              <div
                className="absolute inset-0 bg-wine-800/70"
                style={{ clipPath: 'polygon(0 0, 50% 58%, 100% 0, 100% 100%, 0 100%)' }}
              />
            </div>

            {/* Thiệp trượt lên khi mở */}
            <motion.div
              className="absolute left-1/2 top-2 h-28 w-[78%] -translate-x-1/2 rounded-md bg-cream-50 shadow-lg sm:h-32"
              initial={false}
              animate={
                opening
                  ? { y: '-72%', opacity: 1, scale: 1.04 }
                  : { y: '6%', opacity: 0, scale: 0.92 }
              }
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: opening ? 0.15 : 0 }}
              style={{ zIndex: 15 }}
            >
              <div className="flex h-full flex-col items-center justify-center gap-1 px-3 text-wine-700">
                <span className="font-script text-xl">
                  {wedding.groom.shortName} &amp; {wedding.bride.shortName}
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-wine-600/70">
                  Save the date
                </span>
              </div>
            </motion.div>

            {/* Nắp phong bì */}
            <motion.div
              className="absolute inset-x-0 top-0 h-[58%] bg-wine-600"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                transformOrigin: 'top center',
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
                zIndex: 20,
              }}
              animate={{ rotateX: opening ? -165 : 0 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            />

            {/* Dấu niêm phong sáp */}
            <motion.div
              className="absolute left-1/2 top-[52%] flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full shadow-md"
              style={{
                zIndex: 25,
                background: 'radial-gradient(circle at 35% 30%, #c4756844, transparent), var(--color-gold-600)',
              }}
              animate={
                opening
                  ? { opacity: 0, scale: 0.4, rotate: 25 }
                  : { opacity: 1, scale: 1, rotate: 0 }
              }
              transition={{ duration: 0.35 }}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-gold-100" fill="currentColor">
                <path d="M12 21s-7-4.35-9.5-8.5C.5 8 2.5 4 6.5 4 8.5 4 10 5 12 7c2-2 3.5-3 5.5-3 4 0 6 4 4 8.5C19 16.65 12 21 12 21z" />
              </svg>
            </motion.div>
          </div>

          <span className="mt-5 block font-script text-lg text-gold-200/90">
            {opening ? 'Đang mở thiệp...' : 'Chạm để mở thiệp'}
          </span>
        </button>
      </motion.div>

      {portal}
    </motion.div>
  )
}
