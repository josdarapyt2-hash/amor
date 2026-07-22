import { motion } from 'framer-motion'

interface SectionNavProps {
  sections: string[]
  activeIndex: number
  onDotClick: (index: number) => void
}

export default function SectionNav({ sections, activeIndex, onDotClick }: SectionNavProps) {
  return (
    <motion.nav
      className="fixed left-6 bottom-20 z-40 hidden md:flex flex-row items-center gap-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.6 }}
      aria-label="Navegación de secciones"
    >
      {sections.map((section, index) => (
        <button
          key={section}
          onClick={() => onDotClick(index)}
          className="btn-dot group flex items-center gap-2"
          aria-label={`Ir a ${section}`}
        >
          <div className="relative">
            <div
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? 'bg-lila-400 scale-125'
                  : 'bg-white/20 group-hover:bg-white/40'
              }`}
            />
            {activeIndex === index && (
              <motion.div
                className="absolute inset-0 rounded-full bg-lila-400/40"
                layoutId="activeDot"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                style={{ margin: '-3px' }}
              />
            )}
          </div>
          <span
            className={`text-[10px] font-light tracking-widest uppercase transition-all duration-300 ${
              activeIndex === index
                ? 'opacity-100 text-white/70'
                : 'opacity-0 text-white/40 group-hover:opacity-70'
            }`}
          >
            {section}
          </span>
        </button>
      ))}
    </motion.nav>
  )
}
