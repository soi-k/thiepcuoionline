import { useWeddingConfig } from '../../hooks/useWeddingConfig.jsx'
import { assetUrl } from '../../lib/assetUrl.js'
import { getEmbedUrl } from '../../lib/videoEmbed.js'
import SectionReveal from '../ui/SectionReveal.jsx'
import RevealText from '../ui/RevealText.jsx'
import FloralDivider from '../decor/FloralDivider.jsx'

export default function Story() {
  const { config: wedding } = useWeddingConfig()
  const embedUrl = getEmbedUrl(wedding.storyVideoUrl)

  return (
    <section className="bg-cream-50 px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <SectionReveal>
          <p className="font-script text-3xl text-wine-600">Chuyện tình của chúng tôi</p>
          <FloralDivider className="my-6" />
          <RevealText text={wedding.story} className="font-body text-base leading-8 text-ink/80 sm:text-lg" />
        </SectionReveal>

        {embedUrl && (
          <SectionReveal delay={0.1}>
            <div className="mx-auto mt-10 aspect-video max-w-2xl overflow-hidden rounded-2xl border border-gold-200 shadow-md">
              <iframe
                src={embedUrl}
                title="Video kỷ niệm"
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </SectionReveal>
        )}

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {wedding.timeline.map((item, i) => (
            <SectionReveal key={`${item.year}-${i}`} delay={i * 0.1}>
              <div className="overflow-hidden rounded-2xl border border-gold-200 bg-white/60 text-left shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-lg">
                {item.image && (
                  <img
                    src={assetUrl(item.image)}
                    alt={item.title}
                    loading="lazy"
                    className="h-36 w-full object-cover"
                  />
                )}
                <div className="p-6">
                  <span className="font-display text-2xl text-wine-600">{item.year}</span>
                  <h3 className="mt-2 font-display text-lg text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink/70">{item.desc}</p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
