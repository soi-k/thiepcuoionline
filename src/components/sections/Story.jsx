import { wedding } from '../../lib/weddingConfig.js'
import SectionReveal from '../ui/SectionReveal.jsx'
import FloralDivider from '../decor/FloralDivider.jsx'

export default function Story() {
  return (
    <section className="bg-cream-50 px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <SectionReveal>
          <p className="font-script text-3xl text-wine-600">Chuyện tình của chúng tôi</p>
          <FloralDivider className="my-6" />
          <p className="font-body text-base leading-8 text-ink/80 sm:text-lg">
            {wedding.story}
          </p>
        </SectionReveal>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {wedding.timeline.map((item, i) => (
            <SectionReveal key={item.year} delay={i * 0.1}>
              <div className="relative rounded-2xl border border-gold-200 bg-white/60 p-6 text-left shadow-sm">
                <span className="font-display text-2xl text-wine-600">{item.year}</span>
                <h3 className="mt-2 font-display text-lg text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink/70">{item.desc}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
