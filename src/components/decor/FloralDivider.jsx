export default function FloralDivider({ className = '' }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`} aria-hidden="true">
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold-500 sm:w-24" />
      <svg width="28" height="28" viewBox="0 0 28 28" className="text-gold-500 shrink-0">
        <path
          d="M14 2c4 4 4 9 0 12-4-3-4-8 0-12zM14 26c4-4 4-9 0-12-4 3-4 8 0 12zM2 14c4-4 9-4 12 0-3 4-8 4-12 0zM26 14c-4-4-9-4-12 0 3 4 8 4 12 0z"
          fill="currentColor"
        />
        <circle cx="14" cy="14" r="2.4" fill="currentColor" />
      </svg>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold-500 sm:w-24" />
    </div>
  )
}
