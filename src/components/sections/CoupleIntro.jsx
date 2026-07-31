import { useWeddingConfig } from '../../hooks/useWeddingConfig.jsx'
import { assetUrl } from '../../lib/assetUrl.js'
import SectionReveal from '../ui/SectionReveal.jsx'
import FloralDivider from '../decor/FloralDivider.jsx'

function Person({ person, align }) {
  return (
    <div className={`flex flex-col items-center text-center ${align}`}>
      <div className="h-36 w-36 overflow-hidden rounded-full border-4 border-gold-300 shadow-lg sm:h-44 sm:w-44">
        <img src={assetUrl(person.avatar)} alt={person.fullName} className="h-full w-full object-cover" />
      </div>
      <h3 className="mt-5 font-display text-2xl text-wine-700">{person.fullName}</h3>
      <p className="mt-2 max-w-[16rem] text-sm leading-6 text-ink/60">{person.parents}</p>
    </div>
  )
}

export default function CoupleIntro() {
  const { config: wedding } = useWeddingConfig()

  return (
    <section className="bg-cream-50 px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <SectionReveal>
          <p className="font-script text-3xl text-wine-600">Cô dâu &amp; Chú rể</p>
          <FloralDivider className="my-6" />
        </SectionReveal>

        <div className="mt-6 flex flex-col items-center justify-center gap-10 sm:flex-row sm:items-start sm:gap-16">
          <SectionReveal delay={0.05}>
            <Person person={wedding.groom} />
          </SectionReveal>

          <SectionReveal delay={0.15}>
            <span className="font-script text-4xl text-gold-500 sm:mt-14">&amp;</span>
          </SectionReveal>

          <SectionReveal delay={0.25}>
            <Person person={wedding.bride} />
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
