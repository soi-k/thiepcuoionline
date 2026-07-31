import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, ImagePlus, X } from 'lucide-react'
import { useWeddingConfig } from '../../hooks/useWeddingConfig.jsx'
import { useCollection } from '../../hooks/useCollection.js'
import { assetUrl } from '../../lib/assetUrl.js'
import { resizeImageFile } from '../../lib/imageUpload.js'
import SectionReveal from '../ui/SectionReveal.jsx'
import FloralDivider from '../decor/FloralDivider.jsx'
import DemoNote from '../DemoNote.jsx'

const GUEST_CATEGORY = 'Từ khách mời'
const ALL_CATEGORY = 'Tất cả'

export default function Gallery({ guestName }) {
  const { config: wedding } = useWeddingConfig()
  const { items: guestPhotos, add: addGuestPhoto } = useCollection('guestPhotos')
  const fileInputRef = useRef(null)

  const allPhotos = useMemo(() => {
    const fromGuests = guestPhotos.map((p) => ({
      src: p.src,
      alt: `Ảnh từ ${p.uploadedBy || 'khách mời'}`,
      category: GUEST_CATEGORY,
    }))
    return [...wedding.gallery, ...fromGuests]
  }, [wedding.gallery, guestPhotos])

  const categories = useMemo(() => {
    const unique = [...new Set(allPhotos.map((p) => p.category).filter(Boolean))]
    return [ALL_CATEGORY, ...unique]
  }, [allPhotos])

  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY)
  const [activeIndex, setActiveIndex] = useState(null)

  const visiblePhotos = useMemo(
    () =>
      activeCategory === ALL_CATEGORY
        ? allPhotos
        : allPhotos.filter((p) => p.category === activeCategory),
    [allPhotos, activeCategory],
  )

  useEffect(() => {
    if (activeIndex === null) return
    const handleKey = (e) => {
      if (e.key === 'Escape') setActiveIndex(null)
      if (e.key === 'ArrowRight') setActiveIndex((i) => (i + 1) % visiblePhotos.length)
      if (e.key === 'ArrowLeft') setActiveIndex((i) => (i - 1 + visiblePhotos.length) % visiblePhotos.length)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [activeIndex, visiblePhotos.length])

  const handleUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const dataUrl = await resizeImageFile(file, { maxWidth: 1200 })
    await addGuestPhoto({ src: dataUrl, uploadedBy: guestName ?? 'Khách mời' })
    e.target.value = ''
  }

  const active = activeIndex !== null ? visiblePhotos[activeIndex] : null

  return (
    <section className="bg-cream-50 px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl text-center">
        <SectionReveal>
          <p className="font-script text-3xl text-wine-600">Khoảnh khắc của chúng tôi</p>
          <FloralDivider className="my-6" />
        </SectionReveal>

        {categories.length > 1 && (
          <SectionReveal delay={0.05}>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full border px-4 py-1.5 text-xs font-medium tracking-wide transition ${
                    activeCategory === cat
                      ? 'border-wine-700 bg-wine-700 text-gold-100'
                      : 'border-gold-300 text-wine-700 hover:bg-gold-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </SectionReveal>
        )}

        <div className="mt-10 columns-2 gap-3 sm:columns-3 sm:gap-4">
          {visiblePhotos.map((photo, i) => (
            <SectionReveal key={`${photo.src}-${i}`} delay={Math.min(i, 8) * 0.05} y={20}>
              <button
                type="button"
                onClick={() => setActiveIndex(i)}
                className="group mb-3 block w-full overflow-hidden rounded-xl border border-gold-200 shadow-sm sm:mb-4"
              >
                <img
                  src={assetUrl(photo.src)}
                  alt={photo.alt}
                  loading="lazy"
                  className="w-full object-cover transition duration-500 group-hover:scale-110"
                />
              </button>
            </SectionReveal>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center gap-3">
          <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={handleUpload} />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-2 rounded-full border border-gold-300 bg-white px-5 py-2.5 text-sm font-medium text-wine-700 transition hover:bg-gold-100"
          >
            <ImagePlus size={16} />
            Chia sẻ ảnh của bạn vào album
          </button>
          <DemoNote />
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveIndex(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-6"
          >
            <motion.img
              key={active.src}
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              src={assetUrl(active.src)}
              alt={active.alt}
              className="max-h-[85vh] max-w-full rounded-lg object-contain"
            />

            {visiblePhotos.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setActiveIndex((i) => (i - 1 + visiblePhotos.length) % visiblePhotos.length)
                  }}
                  aria-label="Ảnh trước"
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 sm:left-6"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setActiveIndex((i) => (i + 1) % visiblePhotos.length)
                  }}
                  aria-label="Ảnh tiếp theo"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 sm:right-6"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            <button
              type="button"
              onClick={() => setActiveIndex(null)}
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
