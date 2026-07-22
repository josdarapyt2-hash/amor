import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Music } from 'lucide-react'

const AUDIO_SRC = '/audio/cancion.mp3'

interface MusicPlayerProps {
  position?: 'bottom-right' | 'top-right' | 'relative'
}

export default function MusicPlayer({ position = 'bottom-right' }: MusicPlayerProps) {
  const [hasError, setHasError] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = new Audio(AUDIO_SRC)
    audio.volume = 0.3
    audio.preload = 'metadata'
    audioRef.current = audio

    audio.addEventListener('error', () => {
      setHasError(true)
    })

    return () => {
      audio.pause()
      audio.src = ''
    }
  }, [])

  const handlePlay = () => {
    const audio = audioRef.current
    if (!audio || hasError) return
    audio.currentTime = 0
    audio.play().catch(() => {
      setHasError(true)
    })
  }

  if (hasError) return null

  const positionClasses =
    position === 'relative'
      ? 'relative z-auto'
      : position === 'top-right'
        ? 'fixed bottom-6 left-1/2 -translate-x-1/2 z-40'
        : 'fixed bottom-6 left-1/2 -translate-x-1/2 z-40'

  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onClick={handlePlay}
      className={`${positionClasses} btn btn-secondary btn-md`}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      aria-label="Reproducir música"
    >
      <Music className="w-4 h-4" />
      <span className="text-sm font-light">Reproducir música</span>
    </motion.button>
  )
}
