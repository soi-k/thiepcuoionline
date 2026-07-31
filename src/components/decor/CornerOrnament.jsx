const ROTATIONS = {
  'top-left': 'rotate-0',
  'top-right': 'rotate-90',
  'bottom-right': 'rotate-180',
  'bottom-left': '-rotate-90',
}

const POSITIONS = {
  'top-left': 'top-3 left-3 sm:top-6 sm:left-6',
  'top-right': 'top-3 right-3 sm:top-6 sm:right-6',
  'bottom-right': 'bottom-3 right-3 sm:bottom-6 sm:right-6',
  'bottom-left': 'bottom-3 left-3 sm:bottom-6 sm:left-6',
}

export default function CornerOrnament({ corner = 'top-left' }) {
  return (
    <svg
      className={`absolute ${POSITIONS[corner]} ${ROTATIONS[corner]} h-14 w-14 text-gold-400 opacity-80 sm:h-20 sm:w-20`}
      viewBox="0 0 80 80"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 4v28M4 4h28"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M4 4c18 2 30 14 32 32"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.7"
      />
      <circle cx="4" cy="4" r="2.4" fill="currentColor" />
    </svg>
  )
}
