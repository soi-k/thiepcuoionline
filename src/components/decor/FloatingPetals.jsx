import { useMemo } from 'react'

// Cánh hoa rơi nhẹ nhàng khắp trang — thuần CSS animation, không tốn hiệu năng.
function Petal({ left, size, duration, delay, drift, opacity, rotateShape }) {
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
        <path
          d="M12 2c3 3 3 7 0 10-3-3-3-7 0-10z"
          fill="currentColor"
          className="text-wine-400"
        />
      </svg>
    </span>
  )
}

export default function FloatingPetals({ count = 14 }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.round(Math.random() * 100),
        size: 12 + Math.random() * 14,
        duration: 10 + Math.random() * 10,
        delay: Math.random() * 12,
        drift: -60 + Math.random() * 120,
        opacity: 0.35 + Math.random() * 0.4,
        rotateShape: Math.round(Math.random() * 360),
      })),
    [count],
  )

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-40">
      {petals.map((p) => (
        <Petal key={p.id} {...p} />
      ))}
    </div>
  )
}
