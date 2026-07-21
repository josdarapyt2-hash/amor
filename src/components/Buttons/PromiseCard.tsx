import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

interface PromiseCardProps {
  title: string
  text: string
  index: number
}

export default function PromiseCard({ title, text, index }: PromiseCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <motion.div
      className="w-full max-w-xs h-56 cursor-pointer perspective-[1000px]"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 glass rounded-2xl p-6 flex flex-col items-center justify-center text-center"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-lila-500/20 to-deep-blue-500/20 flex items-center justify-center mb-4">
            <Heart className="w-5 h-5 text-lila-400/70" fill="currentColor" strokeWidth={0} />
          </div>
          <h4 className="text-white/80 font-medium text-sm mb-2">{title}</h4>
          <p className="text-white/30 text-xs font-light">Toca para revelar</p>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 glass-strong rounded-2xl p-6 flex flex-col items-center justify-center text-center"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <p className="text-white/60 text-sm font-light leading-relaxed italic">
            {text}
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}
