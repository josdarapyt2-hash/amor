import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { staggerContainer, fadeInUp } from '@/animations/variants'

const quotes = [
  'El amor no se mide en tiempo, se mide en momentos.',
  'Eres mi lugar favorito en todo el universo.',
  'Cada día contigo es mi nuevo día favorito.',
  'No necesito ver el futuro, porque sé que estarás en él.',
]

export default function DedicationsSection() {
  return (
    <section className="relative py-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-3">
          <span className="bg-gradient-to-r from-white via-lila-200 to-lila-400 bg-clip-text text-transparent">
            Palabras Para Ti
          </span>
        </h2>
        <p className="text-sm text-white/30 font-light tracking-wide">
          Pequeñas dedicatorias desde lo más profundo
        </p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
      >
        {quotes.map((quote, index) => (
          <motion.div
            key={index}
            variants={fadeInUp}
            className="glass rounded-2xl p-6 md:p-8 relative overflow-hidden group hover:bg-white/8 transition-all duration-500"
            whileHover={{ y: -2 }}
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-lila-400/5 to-transparent rounded-bl-full" />
            <Heart
              className="w-4 h-4 text-lila-400/30 mb-3"
              fill="currentColor"
              strokeWidth={0}
            />
            <p className="text-white/50 text-sm md:text-base font-light leading-relaxed italic">
              "{quote}"
            </p>
            <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-lila-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-center mt-12"
      >
        <div className="inline-flex items-center gap-3 glass rounded-full px-6 py-3">
          <Heart className="w-4 h-4 text-lila-400" fill="currentColor" strokeWidth={0} />
          <span className="text-white/40 text-sm font-light">Y todo lo que no puedo decir con palabras</span>
          <Heart className="w-4 h-4 text-lila-400" fill="currentColor" strokeWidth={0} />
        </div>
      </motion.div>
    </section>
  )
}
