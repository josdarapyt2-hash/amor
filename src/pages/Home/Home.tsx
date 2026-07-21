import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Heart, ArrowRight, Sparkles, Star, Music } from 'lucide-react'
import LoadingScreen from '@/components/LoadingScreen/LoadingScreen'
import AnimatedPage from '@/components/AnimatedPage/AnimatedPage'
import ParticlesBackground from '@/components/Stars/ParticlesBackground'
import NebulaCanvas from '@/components/Stars/NebulaCanvas'
import FloatingHearts from '@/components/FloatingHearts/FloatingHearts'
import FireworksCanvas from '@/components/Fireworks/FireworksCanvas'
import ShootingStars from '@/components/Stars/ShootingStars'
import MusicPlayer from '@/components/MusicPlayer/MusicPlayer'
import ScrollProgress from '@/components/ScrollProgress/ScrollProgress'
import SectionNav from '@/components/Navigation/SectionNav'
import RomanticButton from '@/components/Buttons/RomanticButton'
import GlowCard from '@/components/Buttons/GlowCard'
import BackToTop from '@/components/Navigation/BackToTop'
import HeroCarousel from '@/components/Hero/HeroCarousel'
import DedicationsSection from './DedicationsSection'
import { staggerContainer, fadeInUp, fadeIn } from '@/animations/variants'

function useTimeSince(date: Date) {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const diff = now.getTime() - date.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)

  return { days, hours, minutes, seconds }
}

const ANNIVERSARY_DATE = new Date('2024-06-23')
const SECTION_NAMES = ['Inicio', 'Tiempo', 'Palabras', 'Momentos', 'Promesas', 'Final']

function CountdownBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="glass rounded-xl w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
        <motion.span
          key={value}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-2xl md:text-3xl font-light text-white/90 tabular-nums"
        >
          {String(value).padStart(2, '0')}
        </motion.span>
      </div>
      <span className="mt-2 text-[11px] md:text-xs text-white/40 font-light tracking-widest uppercase">
        {label}
      </span>
    </div>
  )
}

function useActiveSection(sectionCount: number) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const sections = document.querySelectorAll('section[data-section]')
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = parseInt(entry.target.getAttribute('data-section') || '0')
            setActiveIndex(idx)
          }
        })
      },
      { threshold: 0.4 },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [sectionCount])

  const scrollToSection = (index: number) => {
    const section = document.querySelector(`section[data-section="${index}"]`)
    section?.scrollIntoView({ behavior: 'smooth' })
  }

  return { activeIndex, scrollToSection }
}

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 100])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <motion.section
      ref={ref}
      data-section="0"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6"
      style={{ opacity }}
    >
      <HeroCarousel />
      <motion.div className="relative z-10 text-center max-w-4xl mx-auto" style={{ y }}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          <motion.div variants={fadeIn}>
            <Sparkles className="w-6 h-6 text-lila-400/60 mb-4" />
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-5xl sm:text-6xl md:text-8xl font-light tracking-tight mb-4 leading-[1.1]"
          >
            <span className="bg-gradient-to-r from-white via-lila-200 to-lila-400 bg-clip-text text-transparent">
              Nuestro
            </span>
            <br />
            <span className="bg-gradient-to-r from-lila-300 via-lila-400 to-deep-blue-400 bg-clip-text text-transparent">
              Aniversario
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-base md:text-xl text-white/50 font-light mb-4 leading-relaxed max-w-xl"
          >
            Un recorrido por los momentos más especiales que hemos vivido juntos.
          </motion.p>

          <motion.div variants={fadeIn} className="flex items-center gap-2 mb-10">
            <Heart className="w-3.5 h-3.5 text-lila-400" fill="currentColor" strokeWidth={0} />
            <span className="text-sm text-white/30 font-light">Para ti, con amor</span>
            <Heart className="w-3.5 h-3.5 text-lila-400" fill="currentColor" strokeWidth={0} />
          </motion.div>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 items-center">
            <RomanticButton href="/gallery" variant="primary">
              Explorar Galería
            </RomanticButton>
            <RomanticButton href="/letter" variant="secondary">
              Leer Carta
              <ArrowRight className="w-4 h-4" />
            </RomanticButton>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-[10px] text-white/20 tracking-widest uppercase">Desliza</span>
            <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}

function CountdownSection() {
  const { days, hours, minutes, seconds } = useTimeSince(ANNIVERSARY_DATE)

  return (
    <section data-section="1" className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl mx-auto"
      >
        <Star className="w-5 h-5 text-lila-400/50 mx-auto mb-6" />

        <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-3">
          <span className="bg-gradient-to-r from-white via-lila-200 to-lila-400 bg-clip-text text-transparent">
            Juntos Desde
          </span>
        </h2>

        <p className="text-sm text-white/30 font-light mb-10 tracking-wide">
          23 de junio, 2024
        </p>

        <div className="flex gap-4 md:gap-6 justify-center items-center mb-12">
          <CountdownBlock value={days} label="Días" />
          <span className="text-white/20 text-2xl font-light mt-[-20px]">:</span>
          <CountdownBlock value={hours} label="Horas" />
          <span className="text-white/20 text-2xl font-light mt-[-20px]">:</span>
          <CountdownBlock value={minutes} label="Min" />
          <span className="text-white/20 text-2xl font-light mt-[-20px]">:</span>
          <CountdownBlock value={seconds} label="Seg" />
        </div>

        <motion.div
          className="glass rounded-2xl p-6 md:p-8 max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Music className="w-5 h-5 text-lila-400/60 mx-auto mb-3" />
          <p className="text-white/50 text-sm font-light leading-relaxed italic">
            "Cada día a tu lado es un regalo. Gracias por hacer de mi vida algo mágico."
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}

function MomentsSection() {
  const moments = [
    {
      icon: <Heart className="w-5 h-5" />,
      title: 'El Primer Encuentro',
      description: 'El día que nuestras miradas se cruzaron y todo cambió para siempre.',
    },
    {
      icon: <Star className="w-5 h-5" />,
      title: 'Los Sueños Compartidos',
      description: 'Cada plan, cada risa, cada locura que solo nosotros entendemos.',
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: 'El Futuro Nos Espera',
      description: 'Porque lo mejor de nuestra historia aún está por escribirse.',
    },
  ]

  return (
    <section data-section="2" className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-3">
          <span className="bg-gradient-to-r from-white via-lila-200 to-lila-400 bg-clip-text text-transparent">
            Nuestra Historia
          </span>
        </h2>
        <p className="text-sm text-white/30 font-light tracking-wide">
          Momentos que definieron nuestra historia de amor
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {moments.map((moment, index) => (
          <GlowCard key={index} className="p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-lila-500/20 to-deep-blue-500/20 flex items-center justify-center mx-auto mb-5 text-lila-400/70">
              {moment.icon}
            </div>
            <h3 className="text-lg font-medium text-white/80 mb-3">{moment.title}</h3>
            <p className="text-sm text-white/40 font-light leading-relaxed">
              {moment.description}
            </p>
          </GlowCard>
        ))}
      </div>
    </section>
  )
}

function PromiseSection() {
  const promises = [
    { title: 'Siempre juntos', text: 'Prometo estar a tu lado en cada momento, en cada aventura, en cada desafío.' },
    { title: 'Mi refugio', text: 'Seré tu lugar seguro, tu calma, tu hogar sin importar dónde estemos.' },
    { title: 'Crecer juntos', text: 'Prometo aprender, cambiar y crecer a tu lado, siempre.' },
  ]

  return (
    <section data-section="3" className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-3">
          <span className="bg-gradient-to-r from-white via-lila-200 to-lila-400 bg-clip-text text-transparent">
            Mis Promesas
          </span>
        </h2>
        <p className="text-sm text-white/30 font-light tracking-wide">
          Palabras que salen del corazón
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl w-full">
        {promises.map((promise, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="glass rounded-2xl p-6 text-center hover:bg-white/8 transition-all duration-500"
            whileHover={{ y: -3 }}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-lila-500/20 to-deep-blue-500/20 flex items-center justify-center mx-auto mb-4">
              <Heart className="w-5 h-5 text-lila-400/70" fill="currentColor" strokeWidth={0} />
            </div>
            <h4 className="text-white/80 font-medium text-sm mb-3">{promise.title}</h4>
            <p className="text-white/40 text-sm font-light leading-relaxed italic">
              "{promise.text}"
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function FooterSection() {
  return (
    <section data-section="4" className="relative py-20 px-6">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="text-center max-w-md mx-auto"
      >
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-lila-400/30 to-transparent mx-auto mb-8" />
        <Heart className="w-8 h-8 text-lila-400/40 mx-auto mb-4" fill="currentColor" strokeWidth={0} />
        <p className="text-white/30 text-sm font-light">
          Hecho con amor, para el amor
        </p>
        <p className="text-white/20 text-xs font-light mt-2">
          Nuestro aniversario &mdash; una celebración de lo que somos
        </p>
      </motion.div>
    </section>
  )
}

export default function Home() {
  const [loading, setLoading] = useState(true)
  const handleLoadingComplete = useCallback(() => setLoading(false), [])
  const { activeIndex, scrollToSection } = useActiveSection(5)

  if (loading) return <LoadingScreen onComplete={handleLoadingComplete} />

  return (
    <AnimatedPage>
      <NebulaCanvas />
      <ParticlesBackground />
      <FloatingHearts />
      <FireworksCanvas />
      <ShootingStars />
      <ScrollProgress />
      <BackToTop />
      <MusicPlayer />
      <SectionNav
        sections={SECTION_NAMES}
        activeIndex={activeIndex}
        onDotClick={scrollToSection}
      />

      <main className="relative z-10">
        <HeroSection />
        <CountdownSection />
        <DedicationsSection />
        <MomentsSection />
        <PromiseSection />
        <FooterSection />
      </main>
    </AnimatedPage>
  )
}
