import { MapPin, Clock, CalendarHeart } from 'lucide-react'
import { useWeddingConfig } from '../../hooks/useWeddingConfig.jsx'
import SectionReveal from '../ui/SectionReveal.jsx'
import FloralDivider from '../decor/FloralDivider.jsx'

export default function Events() {
  const { config: wedding } = useWeddingConfig()

  return (
    <section className="bg-wine-800 px-6 py-20 text-gold-100 sm:py-28">
      <div className="mx-auto max-w-4xl text-center">
        <SectionReveal>
          <p className="font-script text-3xl text-gold-300">Thông tin lễ cưới</p>
          <FloralDivider className="my-6" />
        </SectionReveal>

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {wedding.events.map((event, i) => (
            <SectionReveal key={`${event.label}-${i}`} delay={i * 0.12}>
              <div className="flex h-full flex-col rounded-2xl border border-gold-300/30 bg-white/5 p-7 text-left backdrop-blur-sm">
                <p className="font-display text-xl text-gold-200">{event.label}</p>
                <div className="mt-4 space-y-3 text-sm text-gold-100/85">
                  <p className="flex items-center gap-2">
                    <CalendarHeart size={16} className="text-gold-400" />
                    {event.date}
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock size={16} className="text-gold-400" />
                    {event.time}
                  </p>
                  <p className="flex items-start gap-2">
                    <MapPin size={16} className="mt-0.5 shrink-0 text-gold-400" />
                    <span>
                      <span className="font-medium text-gold-100">{event.venue}</span>
                      <br />
                      {event.address}
                    </span>
                  </p>
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.mapQuery)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-gold-300/60 px-4 py-2 text-xs font-medium tracking-wide uppercase transition hover:bg-gold-400/10"
                >
                  Xem bản đồ
                </a>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
