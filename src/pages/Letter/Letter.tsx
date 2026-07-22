import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Heart, Mail, Sparkles } from 'lucide-react'
import AnimatedPage from '@/components/AnimatedPage/AnimatedPage'
import ParticlesBackground from '@/components/Stars/ParticlesBackground'
import NebulaCanvas from '@/components/Stars/NebulaCanvas'
import FloatingHearts from '@/components/FloatingHearts/FloatingHearts'
import ShootingStars from '@/components/Stars/ShootingStars'
import ConfettiCanvas from '@/components/Fireworks/ConfettiCanvas'
import MusicPlayer from '@/components/MusicPlayer/MusicPlayer'
import ScrollProgress from '@/components/ScrollProgress/ScrollProgress'
import RomanticButton from '@/components/Buttons/RomanticButton'
import Envelope from '@/components/Envelope/Envelope'
import BackToTop from '@/components/Navigation/BackToTop'
import { staggerContainer, fadeInUp } from '@/animations/variants'

const letterContent = [
  'Hoy celebramos dos años y un mes juntos, y quiero que sepas que cada día a tu lado ha sido el regalo más hermoso que la vida me ha dado.',
  'Recuerdo perfectamente el momento en que te conocí. Algo en ti me atrajo de una forma que no puedo describir con palabras. Era como si el universo hubiera conspirado para que nuestros caminos se cruzaran.',
  'Desde entonces, cada sunrise, cada lluvia, cada risa compartida se ha convertido en un tesoro que guardo en lo más profundo de mi corazón.',
  'Gracias por tu paciencia, por tu ternura, por cada abrazo que hace que el mundo entero desaparezca. Gracias por ser mi refugio y mi aventura favorita.',
  'No necesito grandes gestos ni regalos costosos. Solo necesito tu mano en la mía, tus ojos mirándome, y saber que este amor que construimos es real y eterno.',
  'Por todos los momentos vividos, por los que están por venir, y por el infinito que construiremos juntos: te amo, hoy y siempre.',
]

function TypewriterText({ text, onComplete }: { text: string; onComplete?: () => void }) {
  const [displayedText, setDisplayedText] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    let index = 0
    setDisplayedText('')
    setDone(false)

    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1))
        index++
      } else {
        clearInterval(timer)
        setDone(true)
        onComplete?.()
      }
    }, 30)

    return () => clearInterval(timer)
  }, [text, onComplete])

  return (
    <span>
      {displayedText}
      {!done && (
        <span className="inline-block w-0.5 h-4 bg-lila-400/60 ml-0.5 animate-pulse" />
      )}
    </span>
  )
}

function LetterContent() {
  const [currentParagraph, setCurrentParagraph] = useState(0)
  const [completedParagraphs, setCompletedParagraphs] = useState<number[]>([])
  const [skipped, setSkipped] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleParagraphComplete = () => {
    setCompletedParagraphs((prev) => [...prev, currentParagraph])
    if (currentParagraph < letterContent.length - 1) {
      setTimeout(() => setCurrentParagraph((prev) => prev + 1), 500)
    }
  }

  const handleSkip = () => {
    setSkipped(true)
    setCompletedParagraphs(letterContent.map((_, i) => i))
    setCurrentParagraph(letterContent.length)
  }

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [completedParagraphs, currentParagraph])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="glass rounded-3xl p-5 sm:p-6 md:p-10 lg:p-12 max-w-2xl mx-auto relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-lila-400/30 to-transparent" />

        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-lila-400" fill="currentColor" strokeWidth={0} />
            <span className="text-[10px] sm:text-xs text-white/30 font-light tracking-widest uppercase">Carta de amor</span>
          </div>
          {!skipped && currentParagraph < letterContent.length && (
            <button
              onClick={handleSkip}
              className="btn btn-ghost btn-sm"
            >
              Saltar
            </button>
          )}
        </div>

        <div
          ref={containerRef}
          className="space-y-5 sm:space-y-6 max-h-[50vh] overflow-y-auto pr-2 scrollbar-thin text-center"
        >
          {completedParagraphs.map((pIndex) => (
            <motion.p
              key={pIndex}
              initial={{ opacity: 0.8 }}
              animate={{ opacity: 1 }}
              className="text-white/60 text-xs sm:text-sm md:text-base font-light leading-relaxed"
            >
              {letterContent[pIndex]}
            </motion.p>
          ))}

          {currentParagraph < letterContent.length && !completedParagraphs.includes(currentParagraph) && (
            <p className="text-white/70 text-xs sm:text-sm md:text-base font-light leading-relaxed">
              <TypewriterText
                text={letterContent[currentParagraph]}
                onComplete={handleParagraphComplete}
              />
            </p>
          )}
        </div>

        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-lila-400/20 to-transparent mt-8" />

        <AnimatePresence>
          {completedParagraphs.length === letterContent.length && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-center mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-white/5"
            >
              <p className="text-white/50 text-xs sm:text-sm font-light italic">
                Con todo mi amor, siempre tuyo
              </p>
              <Heart className="w-5 h-5 text-lila-400/60 mx-auto mt-3" fill="currentColor" strokeWidth={0} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default function Letter() {
  const [envelopeOpened, setEnvelopeOpened] = useState(false)
  const [showLetter, setShowLetter] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const handleEnvelopeOpen = () => {
    setEnvelopeOpened(true)
    setShowConfetti(true)
    setTimeout(() => setShowLetter(true), 800)
    setTimeout(() => setShowConfetti(false), 3000)
  }

  return (
    <AnimatedPage>
      <NebulaCanvas />
      <ParticlesBackground />
      <FloatingHearts />
      <ShootingStars />
      <ConfettiCanvas active={showConfetti} />
      <ScrollProgress />
      <BackToTop />

      <div className="relative z-10 min-h-screen flex flex-col">
        <div className="px-5 sm:px-8 pt-10 sm:pt-14 max-w-3xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-8 text-center sm:text-left"
          >
            <RomanticButton href="/" variant="secondary">
              <ArrowLeft className="w-4 h-4" />
              Volver
            </RomanticButton>
          </motion.div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-5 sm:px-8 pb-28 sm:pb-32">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="text-center mb-6 sm:mb-8"
          >
            <motion.div variants={fadeInUp}>
              <Mail className="w-7 h-7 sm:w-8 sm:h-8 text-lila-400/60 mx-auto mb-4 sm:mb-5" />
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-3 sm:mb-4"
            >
              <span className="bg-gradient-to-r from-white via-lila-200 to-lila-400 bg-clip-text text-transparent">
                Una Carta Para Ti
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xs sm:text-sm md:text-base text-white/40 font-light max-w-md mx-auto px-4"
            >
              Palabras escritas desde lo más profundo de mi corazón
            </motion.p>
          </motion.div>

          <AnimatePresence mode="wait">
            {!envelopeOpened ? (
              <motion.div
                key="envelope"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Envelope onOpen={handleEnvelopeOpen} isOpen={false} />
              </motion.div>
            ) : showLetter ? (
              <motion.div
                key="letter"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-2xl mx-auto"
              >
                <LetterContent />
              </motion.div>
            ) : (
              <motion.div
                key="transition"
                className="flex items-center justify-center py-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, ease: 'linear' }}
                >
                  <Sparkles className="w-8 h-8 text-lila-400/60" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
          <MusicPlayer position="relative" />
        </div>
      </div>
    </AnimatedPage>
  )
}
