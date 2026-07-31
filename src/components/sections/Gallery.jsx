import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useWeddingConfig } from '../../hooks/useWeddingConfig.jsx'
import SectionReveal from '../ui/SectionReveal.jsx'
import FloralDivider from '../decor/FloralDivider.jsx'

export default function Gallery() {
  const { config: wedding } = useWeddingConfig()
  const [active, setActive] = useState(null)

  return (
    <section className="bg-cream-50 px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl text-center">
        <SectionReveal>
          <p className="font-script text-3xl text-wine-600">Khoảnh khắc của chúng tôi</p>
          <FloralDivider className="my-6" />
        </SectionReveal>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {wedding.gallery.map((photo, i) => (
            <SectionReveal key={`${photo.src}-${i}`} delay={i * 0.06} y={20}>
              <button
                type="button"
                onClick={() => setActive(photo)}
                className="group block aspect-[4/5] w-full overflow-hidden rounded-xl border border-gold-200 shadow-sm"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
              </button>
            </SectionReveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6"
          >
            <motion.img
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              src={active.src}
              alt={active.alt}
              className="max-h-[85vh] max-w-full rounded-lg object-contain"
            />
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label="Đóng"
              className="absolute right-5 top-5 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            >
              <X size={22} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
