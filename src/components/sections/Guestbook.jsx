import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, MessageCircleHeart, Send } from 'lucide-react'
import { useCollection } from '../../hooks/useCollection.js'
import SectionReveal from '../ui/SectionReveal.jsx'
import FloralDivider from '../decor/FloralDivider.jsx'
import DemoNote from '../DemoNote.jsx'

function timeAgo(timestamp) {
  const seconds = Math.floor((Date.now() - timestamp) / 1000)
  if (seconds < 60) return 'vừa xong'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes} phút trước`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} giờ trước`
  return `${Math.floor(hours / 24)} ngày trước`
}

export default function Guestbook({ guestName }) {
  const { items, loaded, add, update } = useCollection('wishes')
  const [name, setName] = useState(guestName ?? '')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim() || !message.trim()) return
    setSubmitting(true)
    await add({ name: name.trim(), message: message.trim(), hearts: 0 })
    setMessage('')
    setSubmitting(false)
  }

  const handleHeart = (item) => {
    update(item.id, { hearts: (item.hearts ?? 0) + 1 })
  }

  const sorted = [...items].sort((a, b) => b.createdAt - a.createdAt)

  return (
    <section className="bg-cream-50 px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <SectionReveal>
          <MessageCircleHeart className="mx-auto text-wine-600" size={30} />
          <p className="mt-4 font-script text-3xl text-wine-600">Sổ lưu bút</p>
          <FloralDivider className="my-6" />
          <p className="text-sm text-ink/70">Gửi lời chúc phúc đến cô dâu chú rể</p>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-3 rounded-2xl border border-gold-200 bg-white/70 p-5 text-left shadow-sm"
          >
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tên của bạn"
              className="w-full rounded-lg border border-gold-200 bg-cream-50 px-3 py-2 text-sm text-ink outline-none focus:border-wine-400"
            />
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Lời chúc của bạn..."
              rows={3}
              className="w-full resize-y rounded-lg border border-gold-200 bg-cream-50 px-3 py-2 text-sm text-ink outline-none focus:border-wine-400"
            />
            <button
              type="submit"
              disabled={submitting || !name.trim() || !message.trim()}
              className="inline-flex items-center gap-2 rounded-full bg-wine-700 px-5 py-2 text-sm font-medium text-gold-100 transition hover:bg-wine-600 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Send size={14} />
              Gửi lời chúc
            </button>
          </form>
        </SectionReveal>

        <div className="mt-8 space-y-3 text-left">
          {loaded && sorted.length === 0 && (
            <p className="text-center text-sm text-ink/40">
              Chưa có lời chúc nào — hãy là người đầu tiên!
            </p>
          )}
          {sorted.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-gold-200 bg-white/60 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-display text-base text-wine-700">{item.name}</p>
                  <p className="mt-1 text-sm leading-6 text-ink/80">{item.message}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleHeart(item)}
                  className="flex shrink-0 flex-col items-center gap-0.5 text-wine-500 transition hover:text-wine-700"
                  aria-label="Thả tim"
                >
                  <Heart size={16} fill={item.hearts ? 'currentColor' : 'none'} />
                  <span className="text-[11px]">{item.hearts ?? 0}</span>
                </button>
              </div>
              <p className="mt-2 text-[11px] uppercase tracking-wide text-ink/35">
                {timeAgo(item.createdAt)}
              </p>
            </motion.div>
          ))}
        </div>

        <DemoNote className="mt-6" />
      </div>
    </section>
  )
}
