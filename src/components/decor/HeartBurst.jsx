import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

export default function HeartBurst({ x, y, burstId, onDone, count = 10 }) {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        dx: -70 + Math.random() * 140,
        dy: -130 - Math.random() * 90,
        delay: Math.random() * 0.15,
        scale: 0.7 + Math.random() * 0.6,
        rotate: -30 + Math.random() * 60,
        size: 16 + Math.random() * 12,
      })),
    [count],
  )

  return (
    <div className="pointer-events-none fixed z-[70]" style={{ left: x, top: y }}>
      {hearts.map((h) => (
        <motion.span
          key={h.id}
          className="absolute text-wine-500"
          initial={{ opacity: 0, x: 0, y: 0, scale: 0.3 }}
          animate={{ opacity: [0, 1, 1, 0], x: h.dx, y: h.dy, scale: h.scale, rotate: h.rotate }}
          transition={{ duration: 1.1, delay: h.delay, ease: 'easeOut' }}
          onAnimationComplete={() => {
            if (h.id === count - 1) onDone?.(burstId)
          }}
        >
          <Heart size={h.size} fill="currentColor" />
        </motion.span>
      ))}
    </div>
  )
}
