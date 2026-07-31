import { Heart } from 'lucide-react'
import { useWeddingConfig } from '../../hooks/useWeddingConfig.jsx'
import SectionReveal from '../ui/SectionReveal.jsx'
import FloralDivider from '../decor/FloralDivider.jsx'

export default function Footer() {
  const { config: wedding } = useWeddingConfig()

  return (
    <footer className="relative overflow-hidden bg-wine-900 px-6 py-16 text-center text-gold-200">
      <SectionReveal>
        <Heart className="mx-auto text-gold-400" size={28} fill="currentColor" />
        <p className="mt-5 font-script text-2xl text-gold-300">
          {wedding.groom.shortName} &amp; {wedding.bride.shortName}
        </p>
        <FloralDivider className="my-5" />
        <p className="mx-auto max-w-md text-sm leading-7 text-gold-200/80">
          Sự hiện diện của bạn là niềm vinh hạnh cho gia đình chúng tôi trong ngày trọng đại này.
          Rất mong được đón tiếp!
        </p>
        <p className="mt-8 text-xs uppercase tracking-[0.2em] text-gold-300/50">
          Made with love — {new Date().getFullYear()}
        </p>
      </SectionReveal>
    </footer>
  )
}
