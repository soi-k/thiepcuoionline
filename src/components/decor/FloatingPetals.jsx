import { useMemo } from 'react'

const SHAPES = {
  petal: 'M12 2c3 3 3 7 0 10-3-3-3-7 0-10z',
  heart: 'M12 21s-7-4.35-9.5-8.5C.5 8 2.5 4 6.5 4 8.5 4 10 5 12 7c2-2 3.5-3 5.5-3 4 0 6 4 4 8.5C19 16.65 12 21 12 21z',
  sparkle: 'M12 2l1.6 6.4L20 10l-6.4 1.6L12 18l-1.6-6.4L4 10l6.4-1.6z',
}

const COLORS = ['text-wine-400', 'text-gold-400', 'text-gold-300']
const SHAPE_KEYS = Object.keys(SHAPES)

// Cánh hoa/tim/lấp lánh rơi nhẹ nhàng khắp trang — thuần CSS animation, không tốn hiệu năng.
function Particle({ left, size, duration, delay, drift, opacity, rotateShape, shape, color }) {
  return (
    <span
      className="pointer-events-none fixed top-0 z-40"
      style={{
        left: `${left}%`,
        width: size,
        height: size,
        animation: `fall ${duration}s linear ${delay}s infinite`,
        '--drift': `${drift}px`,
      }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" style={{ opacity, transform: `rotate(${rotateShape}deg)` }}>
        <path d={SHAPES[shape]} fill="currentColor" className={color} />
      </svg>
    </span>
  )
}

export default function FloatingPetals({ count = 22 }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.round(Math.random() * 100),
        size: 10 + Math.random() * 15,
        duration: 9 + Math.random() * 12,
        delay: Math.random() * 14,
        drift: -70 + Math.random() * 140,
        opacity: 0.3 + Math.random() * 0.45,
        rotateShape: Math.round(Math.random() * 360),
        shape: SHAPE_KEYS[i % SHAPE_KEYS.length],
        color: COLORS[i % COLORS.length],
      })),
    [count],
  )

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-40">
      {particles.map((p) => (
        <Particle key={p.id} {...p} />
      ))}
    </div>
  )
}
