import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Music, Pause, Play } from 'lucide-react'
import { useMusicPlayer } from '../hooks/useMusicPlayer.jsx'

export default function MusicPlayer() {
  const { tracks, trackIndex, isPlaying, toggle, selectTrack } = useMusicPlayer()
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-60 overflow-hidden rounded-2xl border border-gold-300/60 bg-cream-50/95 shadow-xl backdrop-blur"
          >
            <p className="border-b border-gold-200 px-4 py-2.5 font-display text-sm tracking-wide text-wine-700">
              Chọn nhạc nền
            </p>
            <ul className="max-h-56 overflow-y-auto py-1">
              {tracks.map((track, i) => (
                <li key={track.id}>
                  <button
                    type="button"
                    onClick={() => selectTrack(i)}
                    className={`flex w-full items-center justify-between px-4 py-2 text-left text-sm transition-colors hover:bg-gold-100 ${
                      i === trackIndex ? 'text-wine-700 font-medium' : 'text-ink/70'
                    }`}
                  >
                    <span>{track.title}</span>
                    {i === trackIndex && isPlaying && (
                      <span className="flex gap-0.5" aria-hidden="true">
                        <span className="h-2.5 w-0.5 animate-pulse bg-wine-600" />
                        <span className="h-3.5 w-0.5 animate-pulse bg-wine-600 [animation-delay:150ms]" />
                        <span className="h-2 w-0.5 animate-pulse bg-wine-600 [animation-delay:300ms]" />
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="rounded-full border border-gold-300 bg-cream-50/90 px-3 py-1.5 text-xs font-medium text-wine-700 shadow-md backdrop-blur transition hover:bg-gold-100"
        >
          <Music size={14} className="inline -mt-0.5 mr-1" />
          Nhạc nền
        </button>

        <button
          type="button"
          onClick={toggle}
          aria-label={isPlaying ? 'Tạm dừng nhạc' : 'Phát nhạc'}
          className={`flex h-12 w-12 items-center justify-center rounded-full border-2 border-gold-300 bg-wine-700 text-gold-100 shadow-lg transition hover:bg-wine-600 ${
            isPlaying ? 'animate-[spin_6s_linear_infinite]' : ''
          }`}
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
        </button>
      </div>
    </div>
  )
}
