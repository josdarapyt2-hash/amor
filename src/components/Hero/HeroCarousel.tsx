import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Slide {
  gradient: string
  label: string
  sublabel: string
}

const slides: Slide[] = [
  {
    gradient:
      'linear-gradient(135deg, #0a1128 0%, #1e3a8a 40%, #cc5de8 100%)',
    label: 'Nuestro Amor',
    sublabel: 'Un viaje sin final',
  },
  {
    gradient:
      'linear-gradient(135deg, #1a1a3e 0%, #4c6ef5 50%, #862e9c 100%)',
    label: 'Momentos',
    sublabel: 'Recuerdos eternos',
  },
  {
    gradient:
      'linear-gradient(135deg, #0f1d42 0%, #ae3ec9 40%, #3b5bdb 100%)',
    label: 'Para Siempre',
    sublabel: 'Contigo y solo contigo',
  },
]

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className="absolute inset-0"
          style={{ background: slides[current].gradient }}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        />
      </AnimatePresence>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1 rounded-full transition-all duration-500 cursor-pointer ${
              i === current
                ? 'w-8 bg-white/60'
                : 'w-2 bg-white/20 hover:bg-white/30'
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
