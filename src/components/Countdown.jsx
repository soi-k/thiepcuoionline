import { useCountdown } from '../hooks/useCountdown.js'

const UNITS = [
  { key: 'days', label: 'Ngày' },
  { key: 'hours', label: 'Giờ' },
  { key: 'minutes', label: 'Phút' },
  { key: 'seconds', label: 'Giây' },
]

export default function Countdown({ targetDate }) {
  const timeLeft = useCountdown(targetDate)

  if (timeLeft.done) {
    return (
      <p className="font-display text-lg text-gold-200">Chúng tôi đã nên duyên vợ chồng!</p>
    )
  }

  return (
    <div className="flex items-center justify-center gap-3 sm:gap-5">
      {UNITS.map((unit) => (
        <div
          key={unit.key}
          className="flex w-16 flex-col items-center rounded-xl border border-gold-300/40 bg-white/5 py-3 backdrop-blur-sm sm:w-20"
        >
          <span className="font-display text-2xl tabular-nums text-gold-100 sm:text-3xl">
            {String(timeLeft[unit.key]).padStart(2, '0')}
          </span>
          <span className="mt-1 text-[11px] uppercase tracking-widest text-gold-300/80">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  )
}
