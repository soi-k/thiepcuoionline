import { useState } from 'react'
import { CheckCircle2, ClipboardCheck } from 'lucide-react'
import { useCollection } from '../../hooks/useCollection.js'
import SectionReveal from '../ui/SectionReveal.jsx'
import FloralDivider from '../decor/FloralDivider.jsx'
import DemoNote from '../DemoNote.jsx'

export default function Rsvp({ guestName }) {
  const { add } = useCollection('rsvp')
  const [name, setName] = useState(guestName ?? '')
  const [attending, setAttending] = useState('yes')
  const [guestCount, setGuestCount] = useState(1)
  const [note, setNote] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim()) return
    setSubmitting(true)
    await add({
      guestName: name.trim(),
      attending: attending === 'yes',
      guestCount: attending === 'yes' ? Number(guestCount) : 0,
      note: note.trim(),
    })
    setSubmitting(false)
    setSubmitted(true)
  }

  return (
    <section className="bg-wine-800 px-6 py-20 text-gold-100 sm:py-28">
      <div className="mx-auto max-w-xl text-center">
        <SectionReveal>
          <ClipboardCheck className="mx-auto text-gold-400" size={30} />
          <p className="mt-4 font-script text-3xl text-gold-300">Xác nhận tham dự</p>
          <FloralDivider className="my-6" />
          <p className="text-sm text-gold-200/80">
            Vui lòng phản hồi giúp chúng tôi chuẩn bị chu đáo hơn cho ngày trọng đại
          </p>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          {submitted ? (
            <div className="mt-8 flex flex-col items-center gap-2 rounded-2xl border border-gold-300/40 bg-white/5 p-8">
              <CheckCircle2 className="text-gold-300" size={32} />
              <p className="font-display text-lg">Cảm ơn bạn đã phản hồi!</p>
              <p className="text-sm text-gold-200/70">Hẹn gặp bạn trong ngày vui của chúng tôi.</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-4 rounded-2xl border border-gold-300/30 bg-white/5 p-6 text-left backdrop-blur-sm"
            >
              <label className="block text-sm">
                <span className="mb-1.5 block font-medium text-gold-200">Họ tên</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nhập họ tên của bạn"
                  className="w-full rounded-lg border border-gold-300/40 bg-white/10 px-3 py-2 text-sm text-gold-100 placeholder:text-gold-200/40 outline-none focus:border-gold-300"
                />
              </label>

              <div className="text-sm">
                <span className="mb-1.5 block font-medium text-gold-200">Bạn có thể tham dự?</span>
                <div className="flex gap-3">
                  {[
                    { value: 'yes', label: 'Có, tôi sẽ đến' },
                    { value: 'no', label: 'Rất tiếc, không thể' },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setAttending(opt.value)}
                      className={`flex-1 rounded-lg border px-3 py-2 text-xs font-medium transition ${
                        attending === opt.value
                          ? 'border-gold-300 bg-gold-400/20 text-gold-100'
                          : 'border-gold-300/30 text-gold-200/70 hover:bg-white/5'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {attending === 'yes' && (
                <label className="block text-sm">
                  <span className="mb-1.5 block font-medium text-gold-200">Số người tham dự</span>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    className="w-full rounded-lg border border-gold-300/40 bg-white/10 px-3 py-2 text-sm text-gold-100 outline-none focus:border-gold-300"
                  />
                </label>
              )}

              <label className="block text-sm">
                <span className="mb-1.5 block font-medium text-gold-200">Lời nhắn (không bắt buộc)</span>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={2}
                  className="w-full resize-y rounded-lg border border-gold-300/40 bg-white/10 px-3 py-2 text-sm text-gold-100 outline-none focus:border-gold-300"
                />
              </label>

              <button
                type="submit"
                disabled={submitting || !name.trim()}
                className="w-full rounded-full bg-gold-400 py-2.5 text-sm font-medium text-wine-900 transition hover:bg-gold-300 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Gửi phản hồi
              </button>
            </form>
          )}
        </SectionReveal>

        <DemoNote className="mt-6" />
      </div>
    </section>
  )
}
