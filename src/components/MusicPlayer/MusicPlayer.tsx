import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Music } from 'lucide-react'

const AUDIO_SRC = '/audio/cancion.mp3'

export default function MusicPlayer({
  position = 'bottom-right',
}: {
  position?: 'bottom-right' | 'top-right'
}) {
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
    position === 'top-right'
      ? 'fixed top-6 right-6 z-40'
      : 'fixed bottom-6 right-6 z-40'

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      onClick={handlePlay}
      className={`${positionClasses} flex items-center gap-2 px-4 py-2.5 rounded-full glass text-lila-400 hover:text-white hover:bg-white/10 transition-all duration-300 cursor-pointer`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title="Reproducir música"
      aria-label="Reproducir música"
    >
      <Music className="w-4 h-4" />
      <span className="text-sm font-light">Reproducir música</span>
    </motion.button>
  )
}
