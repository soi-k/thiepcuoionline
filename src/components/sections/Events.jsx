import { MapPin, Clock, CalendarHeart, ExternalLink, Shirt } from 'lucide-react'
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
              <div className="flex h-full flex-col rounded-2xl border border-gold-300/30 bg-white/5 p-7 text-left backdrop-blur-sm transition duration-300 hover:-translate-y-1.5 hover:border-gold-300/60">
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

                {event.mapQuery && (
                  <div className="mt-4 overflow-hidden rounded-xl border border-gold-300/30">
                    <iframe
                      title={`Bản đồ ${event.venue}`}
                      src={`https://www.google.com/maps?q=${encodeURIComponent(event.mapQuery)}&output=embed`}
                      className="h-40 w-full grayscale-[15%]"
                      loading="lazy"
                    />
                  </div>
                )}

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.mapQuery)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex w-fit items-center gap-1.5 text-xs font-medium tracking-wide text-gold-300 hover:underline"
                >
                  Mở trong Google Maps
                  <ExternalLink size={12} />
                </a>
              </div>
            </SectionReveal>
          ))}
        </div>

        {wedding.dressCode?.note && (
          <SectionReveal delay={0.25}>
            <div className="mx-auto mt-10 flex max-w-md flex-col items-center rounded-2xl border border-gold-300/30 bg-white/5 p-6">
              <Shirt className="text-gold-400" size={22} />
              <p className="mt-3 text-sm leading-6 text-gold-200/85">{wedding.dressCode.note}</p>
              {wedding.dressCode.colors?.length > 0 && (
                <div className="mt-4 flex gap-2.5">
                  {wedding.dressCode.colors.map((color) => (
                    <span
                      key={color}
                      className="h-8 w-8 rounded-full border-2 border-gold-200/60 shadow"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              )}
            </div>
          </SectionReveal>
        )}
      </div>
    </section>
  )
}
