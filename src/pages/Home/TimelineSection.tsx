import { motion } from 'framer-motion'
import { Clock, Heart, Sparkles, Star, Gift, Music } from 'lucide-react'
import { staggerContainer, fadeInUp } from '@/animations/variants'

interface TimelineItem {
  date: string
  title: string
  description: string
  icon: React.ReactNode
}

const timelineData: TimelineItem[] = [
  {
    date: 'Julio 2023',
    title: 'El Comienzo',
    description: 'El día que nuestras vidas se entrelazaron para siempre.',
    icon: <Heart className="w-4 h-4" fill="currentColor" strokeWidth={0} />,
  },
  {
    date: 'Agosto 2023',
    title: 'Nuestra Primera Cita',
    description: 'El primer café, las primeras risas, el primer "¿y si salimos otra vez?"',
    icon: <Star className="w-4 h-4" />,
  },
  {
    date: 'Diciembre 2023',
    title: 'Primer Año',
    description: 'Celebramos un año juntos con la certeza de que esto era para siempre.',
    icon: <Gift className="w-4 h-4" />,
  },
  {
    date: '2024',
    title: 'Creando Recuerdos',
    description: 'Viajes, aventuras, noches de película y mañanas de desayuno juntos.',
    icon: <Sparkles className="w-4 h-4" />,
  },
  {
    date: '2025',
    title: 'Más Fuertes Que Nunca',
    description: 'Superamos todo juntos. Cada desafío nos hizo más fuertes.',
    icon: <Music className="w-4 h-4" />,
  },
  {
    date: '2026',
    title: 'Nuestro Futuro',
    description: 'Lo mejor está por venir. Y lo viviremos juntos.',
    icon: <Clock className="w-4 h-4" />,
  },
]

export default function TimelineSection() {
  return (
    <section className="relative py-20 px-6 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-3">
          <span className="bg-gradient-to-r from-white via-lila-200 to-lila-400 bg-clip-text text-transparent">
            Nuestra Línea del Tiempo
          </span>
        </h2>
        <p className="text-sm text-white/30 font-light tracking-wide">
          Los hitos que marcaron nuestra historia
        </p>
      </motion.div>

      <div className="max-w-3xl mx-auto relative">
        {/* Center line */}
        <motion.div
          className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px"
          style={{
            background: 'linear-gradient(to bottom, transparent, rgba(204,93,232,0.3), rgba(76,110,245,0.3), transparent)',
          }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="space-y-12"
        >
          {timelineData.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className={`relative flex items-start gap-6 md:gap-0 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Dot */}
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-lila-400 border-2 border-deep-blue-950 z-10 mt-6" />

              {/* Content */}
              <div
                className={`ml-14 md:ml-0 md:w-1/2 ${
                  index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'
                }`}
              >
                <div className="glass rounded-xl p-5 hover:bg-white/10 transition-all duration-300">
                  <div
                    className={`flex items-center gap-2 mb-2 ${
                      index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'
                    }`}
                  >
                    <span className="text-lila-400/70">{item.icon}</span>
                    <span className="text-[10px] text-lila-400/60 font-light tracking-widest uppercase">
                      {item.date}
                    </span>
                  </div>
                  <h3 className="text-white/80 font-medium mb-1">{item.title}</h3>
                  <p className="text-white/40 text-sm font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
