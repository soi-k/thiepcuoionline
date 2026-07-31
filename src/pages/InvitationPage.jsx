import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import confetti from 'canvas-confetti'
import { useGuestName } from '../hooks/useGuestName.js'
import { MusicProvider, useMusicPlayer } from '../hooks/useMusicPlayer.jsx'
import InvitationGate from '../components/InvitationGate.jsx'
import MusicPlayer from '../components/MusicPlayer.jsx'
import FloatingPetals from '../components/decor/FloatingPetals.jsx'
import Hero from '../components/sections/Hero.jsx'
import CoupleIntro from '../components/sections/CoupleIntro.jsx'
import Story from '../components/sections/Story.jsx'
import Events from '../components/sections/Events.jsx'
import Gallery from '../components/sections/Gallery.jsx'
import Rsvp from '../components/sections/Rsvp.jsx'
import GiftQr from '../components/sections/GiftQr.jsx'
import Guestbook from '../components/sections/Guestbook.jsx'
import Footer from '../components/sections/Footer.jsx'

function InvitationContent({ guestName }) {
  const [isOpen, setIsOpen] = useState(false)
  const { play } = useMusicPlayer()

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'auto' : 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  const handleOpen = () => {
    setIsOpen(true)
    play()
    confetti({
      particleCount: 90,
      spread: 75,
      startVelocity: 38,
      origin: { y: 0.6 },
      colors: ['#d9b567', '#f3e4bd', '#7a1122', '#ad1a33'],
    })
  }

  return (
    <>
      <AnimatePresence>
        {!isOpen && <InvitationGate guestName={guestName} onOpen={handleOpen} />}
      </AnimatePresence>

      <FloatingPetals />
      <main>
        <Hero guestName={guestName} />
        <CoupleIntro />
        <Story />
        <Events />
        <Gallery guestName={guestName} />
        <Rsvp guestName={guestName} />
        <GiftQr />
        <Guestbook guestName={guestName} />
        <Footer />
      </main>
      <MusicPlayer />
    </>
  )
}

export default function InvitationPage() {
  const guestName = useGuestName()

  return (
    <MusicProvider>
      <InvitationContent guestName={guestName} />
      {/* Chỉ hiện với chủ thiệp xem bản gốc (không có tên khách trong link) */}
      {!guestName && (
        <div className="fixed bottom-5 left-5 z-50 flex flex-col gap-2 sm:flex-row">
          <Link
            to="/tuy-chinh"
            className="rounded-full border border-gold-300/60 bg-cream-50/90 px-3 py-1.5 text-xs font-medium text-wine-700 shadow-md backdrop-blur transition hover:bg-gold-100"
          >
            Tuỳ chỉnh nội dung
          </Link>
          <Link
            to="/tao-thiep"
            className="rounded-full border border-gold-300/60 bg-cream-50/90 px-3 py-1.5 text-xs font-medium text-wine-700 shadow-md backdrop-blur transition hover:bg-gold-100"
          >
            Tạo link mời khách
          </Link>
        </div>
      )}
    </MusicProvider>
  )
}
