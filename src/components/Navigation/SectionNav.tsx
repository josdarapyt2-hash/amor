import { motion } from 'framer-motion'

interface SectionNavProps {
  sections: string[]
  activeIndex: number
  onDotClick: (index: number) => void
}

export default function SectionNav({ sections, activeIndex, onDotClick }: SectionNavProps) {
  return (
    <motion.nav
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end gap-3"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.5, duration: 0.6 }}
    >
      {sections.map((section, index) => (
        <button
          key={section}
          onClick={() => onDotClick(index)}
          className="group flex items-center gap-3 cursor-pointer"
          aria-label={`Ir a ${section}`}
        >
          <span
            className={`text-[10px] font-light tracking-widest uppercase transition-all duration-300 ${
              activeIndex === index
                ? 'opacity-100 text-white/70 translate-x-0'
                : 'opacity-0 text-white/40 translate-x-2 group-hover:opacity-70 group-hover:translate-x-0'
            }`}
          >
            {section}
          </span>
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
        </button>
      ))}
    </motion.nav>
  )
}
