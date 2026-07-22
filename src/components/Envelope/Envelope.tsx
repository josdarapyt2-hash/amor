import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart } from 'lucide-react'

interface EnvelopeProps {
  onOpen: () => void
  isOpen: boolean
}

export default function Envelope({ onOpen, isOpen }: EnvelopeProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ perspective: '1200px' }}
    >
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="envelope"
            className="relative cursor-pointer"
            initial={{ opacity: 0, scale: 0.6, rotateY: -15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{
              opacity: 0,
              scale: 1.3,
              rotateX: -60,
              y: -80,
              filter: 'blur(8px)',
            }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            onClick={onOpen}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            whileHover={{ scale: 1.06, y: -8 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="relative w-56 h-40 sm:w-64 sm:h-44 md:w-80 md:h-56">
              <div className="absolute inset-0 rounded-xl glass overflow-hidden shadow-[0_0_40px_rgba(204,93,232,0.15)]">
                <div className="absolute inset-0 bg-gradient-to-br from-lila-500/20 to-deep-blue-500/20" />

                <div
                  className="absolute top-0 left-0 right-0 h-1/2 origin-top transition-transform duration-500 ease-out"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(204,93,232,0.35), rgba(76,110,245,0.35))',
                    clipPath: 'polygon(0 0, 50% 50%, 100% 0)',
                    transform: hovered ? 'rotateX(30deg)' : 'rotateX(0deg)',
                  }}
                />

                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={
                      hovered
                        ? { scale: [1, 1.3, 1], rotate: [0, 5, -5, 0] }
                        : {}
                    }
                    transition={{
                      duration: 0.8,
                      repeat: hovered ? Infinity : 0,
                    }}
                  >
                    <Heart
                      className="w-12 h-12 text-lila-400/70 drop-shadow-[0_0_12px_rgba(204,93,232,0.4)]"
                      fill="currentColor"
                      strokeWidth={0}
                    />
                  </motion.div>
                </div>

                <div
                  className="absolute inset-x-0 bottom-0 h-1/2 origin-top"
                  style={{
                    background:
                      'linear-gradient(to bottom, rgba(204,93,232,0.15), rgba(76,110,245,0.3))',
                    clipPath:
                      'polygon(0 0, 50% 55%, 100% 0, 100% 100%, 0 100%)',
                  }}
                />
              </div>

              {hovered && (
                <motion.div
                  className="absolute -inset-8 rounded-3xl pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(204,93,232,0.2) 0%, transparent 70%)',
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}

              <motion.div
                className="absolute -top-1 -right-1"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Heart
                  className="w-4 h-4 text-lila-300/50"
                  fill="currentColor"
                  strokeWidth={0}
                />
              </motion.div>
            </div>

            <motion.p
              className="mt-8 text-sm text-white/40 font-light tracking-wide text-center"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              Toca para abrir
            </motion.p>

            <motion.div
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-48 h-px"
              style={{
                background:
                  'linear-gradient(90deg, transparent, rgba(204,93,232,0.3), transparent)',
              }}
              animate={{ scaleX: [0.8, 1, 0.8] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>
        ) : (
          <motion.div
            key="open-envelope"
            className="relative"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="absolute w-56 h-40 sm:w-64 sm:h-44 md:w-80 md:h-56 -top-4">
              <div
                className="absolute inset-0 rounded-xl overflow-hidden"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(204,93,232,0.2), rgba(76,110,245,0.2))',
                  clipPath: 'polygon(0 0, 50% 45%, 100% 0)',
                  transform: 'rotateX(180deg)',
                  transformOrigin: 'top',
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
