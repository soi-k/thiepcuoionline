import { useRef, useState } from 'react'
import { ClipboardCheck, Gift, Heart, Send, Sparkles } from 'lucide-react'
import { useCollection } from '../hooks/useCollection.js'
import { useHeartBursts } from '../hooks/useHeartBursts.jsx'

const LIKE_KEY = 'thiepcuoi:likeCount'

function readLikeCount() {
  try {
    return Number(localStorage.getItem(LIKE_KEY)) || 0
  } catch {
    return 0
  }
}

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function FloatingActionBar({ guestName }) {
  const { add: addWish } = useCollection('wishes')
  const { trigger, portal } = useHeartBursts()
  const [message, setMessage] = useState('')
  const [likeCount, setLikeCount] = useState(readLikeCount)
  const heartBtnRef = useRef(null)

  const handleQuickWish = async (e) => {
    e.preventDefault()
    if (!message.trim()) return
    await addWish({ name: guestName ?? 'Khách', message: message.trim(), hearts: 0 })
    setMessage('')
  }

  const handleBurstHearts = () => {
    const rect = heartBtnRef.current?.getBoundingClientRect()
    if (rect) trigger(rect.left + rect.width / 2, rect.top)
  }

  const handleLike = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    trigger(rect.left + rect.width / 2, rect.top)
    setLikeCount((c) => {
      const next = c + 1
      try {
        localStorage.setItem(LIKE_KEY, String(next))
      } catch {
        // localStorage bị chặn — số đếm chỉ tồn tại trong phiên này.
      }
      return next
    })
  }

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gold-200 bg-cream-50/95 px-2 py-2 backdrop-blur sm:px-4">
        <div className="mx-auto flex max-w-2xl items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={() => scrollToId('rsvp-section')}
            aria-label="Xác nhận tham dự"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-wine-700 text-gold-100 shadow-sm transition hover:bg-wine-600"
          >
            <ClipboardCheck size={17} />
          </button>

          <form onSubmit={handleQuickWish} className="flex min-w-0 flex-1 items-center">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Gửi lời chúc..."
              className="h-10 w-full min-w-0 rounded-full border border-gold-200 bg-white px-4 text-sm text-ink outline-none focus:border-wine-400"
            />
            <button
              type="submit"
              aria-label="Gửi lời chúc"
              className="-ml-9 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-wine-600 transition hover:text-wine-700"
            >
              <Send size={15} />
            </button>
          </form>

          <button
            ref={heartBtnRef}
            type="button"
            onClick={handleBurstHearts}
            aria-label="Bắn tim"
            className="flex h-10 shrink-0 items-center gap-1 rounded-full bg-gold-400 px-3 text-wine-900 shadow-sm transition hover:bg-gold-300"
          >
            <Sparkles size={15} />
            <span className="hidden text-xs font-medium sm:inline">Bắn tim</span>
          </button>

          <button
            type="button"
            onClick={() => scrollToId('gift-section')}
            aria-label="Mừng cưới"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-wine-700 text-gold-100 shadow-sm transition hover:bg-wine-600"
          >
            <Gift size={17} />
          </button>

          <button
            type="button"
            onClick={handleLike}
            aria-label="Thích trang này"
            className="flex h-10 shrink-0 items-center gap-1 rounded-full border border-gold-300 bg-white px-3 text-wine-600 shadow-sm transition hover:bg-gold-100"
          >
            <Heart size={16} fill={likeCount > 0 ? 'currentColor' : 'none'} />
            <span className="text-xs font-medium">{likeCount}</span>
          </button>
        </div>
      </div>

      {portal}
    </>
  )
}
