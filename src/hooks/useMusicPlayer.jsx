import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { wedding } from '../lib/weddingConfig.js'

const MusicContext = createContext(null)

export function MusicProvider({ children }) {
  const audioRef = useRef(null)
  const [trackIndex, setTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const tracks = wedding.musicTracks

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false))
    } else {
      audio.pause()
    }
  }, [isPlaying, trackIndex])

  const play = () => setIsPlaying(true)
  const pause = () => setIsPlaying(false)
  const toggle = () => setIsPlaying((v) => !v)
  const selectTrack = (index) => {
    setTrackIndex(index)
    setIsPlaying(true)
  }

  const value = {
    tracks,
    trackIndex,
    currentTrack: tracks[trackIndex],
    isPlaying,
    play,
    pause,
    toggle,
    selectTrack,
    audioRef,
  }

  return (
    <MusicContext.Provider value={value}>
      {children}
      <audio ref={audioRef} src={tracks[trackIndex]?.src} loop preload="none" />
    </MusicContext.Provider>
  )
}

export function useMusicPlayer() {
  const ctx = useContext(MusicContext)
  if (!ctx) throw new Error('useMusicPlayer must be used within MusicProvider')
  return ctx
}
