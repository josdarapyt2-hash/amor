import { motion } from 'framer-motion'
import { ArrowLeft, Camera, Heart } from 'lucide-react'
import AnimatedPage from '@/components/AnimatedPage/AnimatedPage'
import ParticlesBackground from '@/components/Stars/ParticlesBackground'
import NebulaCanvas from '@/components/Stars/NebulaCanvas'
import FloatingHearts from '@/components/FloatingHearts/FloatingHearts'
import ShootingStars from '@/components/Stars/ShootingStars'
import MusicPlayer from '@/components/MusicPlayer/MusicPlayer'
import ScrollProgress from '@/components/ScrollProgress/ScrollProgress'
import RomanticButton from '@/components/Buttons/RomanticButton'
import GalleryGrid from '@/components/Gallery/GalleryGrid'
import BackToTop from '@/components/Navigation/BackToTop'
import { staggerContainer, fadeInUp } from '@/animations/variants'

// Coloca tus imágenes en: public/images/gallery/
// Nombres esperados: foto-1.jpg, foto-2.jpg, foto-3.jpg, foto-4.jpg, foto-5.jpg, foto-6.jpg
const galleryImages = [
  {
    src: '/images/gallery/foto-1.jpg',
    alt: '',
  },
  {
    src: '/images/gallery/foto-2.jpg',
    alt: '',
  },
  {
    src: '/images/gallery/foto-3.jpg',
    alt: 'Un atardecer especial',
  },
  {
    src: '/images/gallery/foto-4.jpg',
    alt: 'Risa y alegría',
  },
  {
    src: '/images/gallery/foto-5.jpg',
    alt: 'Aventuras juntos',
  },
  {
    src: '/images/gallery/foto-6.jpg',
    alt: 'Momento tranquilo',
  },
]

export default function Gallery() {
  return (
    <AnimatedPage>
      <NebulaCanvas />
      <ParticlesBackground />
      <FloatingHearts />
      <ShootingStars />
      <ScrollProgress />
      <BackToTop />
      <MusicPlayer />

      <div className="relative z-10 min-h-screen">
        <div className="px-6 py-10 md:py-16 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-12"
          >
            <RomanticButton href="/" variant="secondary">
              <ArrowLeft className="w-4 h-4" />
              Volver
            </RomanticButton>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp}>
              <Camera className="w-8 h-8 text-lila-400/60 mx-auto mb-5" />
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight mb-4"
            >
              <span className="bg-gradient-to-r from-white via-lila-200 to-lila-400 bg-clip-text text-transparent">
                Nuestra Galería
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-white/40 font-light max-w-lg mx-auto leading-relaxed"
            >
              Un recorrido visual por nuestros momentos más especiales.
              Cada imagen cuenta una parte de nuestra historia.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex items-center justify-center gap-2 mt-6"
            >
              <Heart
                className="w-3 h-3 text-lila-400/40"
                fill="currentColor"
                strokeWidth={0}
              />
              <span className="text-xs text-white/25 font-light tracking-widest uppercase">
                {galleryImages.length} momentos
              </span>
              <Heart
                className="w-3 h-3 text-lila-400/40"
                fill="currentColor"
                strokeWidth={0}
              />
            </motion.div>
          </motion.div>

          <GalleryGrid images={galleryImages} />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mt-20"
          >
            <div className="glass rounded-2xl p-8 max-w-md mx-auto">
              <Heart
                className="w-6 h-6 text-lila-400/50 mx-auto mb-4"
                fill="currentColor"
                strokeWidth={0}
              />
              <p className="text-white/40 text-sm font-light leading-relaxed italic">
                "Las fotos capturan momentos, pero el amor que sentimos no cabe en
                ninguna imagen."
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedPage>
  )
}
