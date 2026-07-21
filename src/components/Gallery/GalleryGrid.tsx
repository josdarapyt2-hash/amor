import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart } from 'lucide-react'
import { useSwipe, useKeyboardNav } from '@/hooks/useSwipe'

interface GalleryImage {
  src: string
  alt: string
  caption?: string
}

const placeholderGradients = [
  'linear-gradient(135deg, #1e3a8a 0%, #cc5de8 50%, #0a1128 100%)',
  'linear-gradient(135deg, #0a1128 0%, #748ffc 50%, #1e3a8a 100%)',
  'linear-gradient(135deg, #2b44a8 0%, #e599f7 40%, #0f1d42 100%)',
  'linear-gradient(135deg, #0f1d42 0%, #be4bdb 60%, #1e3a8a 100%)',
  'linear-gradient(135deg, #1a1a3e 0%, #4c6ef5 50%, #862e9c 100%)',
  'linear-gradient(135deg, #0a1128 0%, #ae3ec9 40%, #3b5bdb 100%)',
]

function PlaceholderImage({ index, alt }: { index: number; alt: string }) {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center gap-3 relative overflow-hidden"
      style={{ background: placeholderGradients[index % placeholderGradients.length] }}
    >
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-24 h-24 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute bottom-1/3 right-1/4 w-32 h-32 rounded-full bg-lila-400/10 blur-3xl" />
      </div>
      <Heart className="w-8 h-8 text-white/30 relative z-10" fill="currentColor" strokeWidth={0} />
      <span className="text-white/40 text-xs font-light relative z-10 text-center px-4">{alt}</span>
      <span className="text-white/20 text-[10px] font-light relative z-10 tracking-wider uppercase">
        Agrega tu foto
      </span>
    </div>
  )
}

interface ImageLightboxProps {
  image: GalleryImage
  imageIndex: number
  onClose: () => void
  onNext: () => void
  onPrev: () => void
  hasNext: boolean
  hasPrev: boolean
}

function ImageLightbox({
  image,
  imageIndex,
  onClose,
  onNext,
  onPrev,
  hasNext,
  hasPrev,
}: ImageLightboxProps) {
  const swipeHandlers = useSwipe({
    onSwipeLeft: hasNext ? onNext : undefined,
    onSwipeRight: hasPrev ? onPrev : undefined,
    onSwipeUp: onClose,
    threshold: 50,
  })

  const keyboardHandlers = {
    onEscape: onClose,
    onArrowLeft: hasPrev ? onPrev : undefined,
    onArrowRight: hasNext ? onNext : undefined,
  }

  useKeyboardNav(keyboardHandlers)

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      {...swipeHandlers}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 max-w-4xl w-full mx-4">
        <motion.div
          className="relative rounded-2xl overflow-hidden glass"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {image.src ? (
            <img
              src={image.src}
              alt={image.alt}
              className="w-full max-h-[70vh] object-contain"
            />
          ) : (
            <div className="w-full h-[50vh]">
              <PlaceholderImage index={imageIndex} alt={image.alt} />
            </div>
          )}

        </motion.div>

        {hasPrev && (
          <button
            onClick={onPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 rounded-full glass flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer hidden sm:flex"
          >
            &#8249;
          </button>
        )}

        {hasNext && (
          <button
            onClick={onNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 rounded-full glass flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer hidden sm:flex"
          >
            &#8250;
          </button>
        )}

        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
        >
          &times;
        </button>

        <div className="absolute bottom-4 inset-x-0 flex justify-center sm:hidden">
          <div className="flex gap-2">
            {hasPrev && (
              <button
                onClick={onPrev}
                className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
              >
                &#8249;
              </button>
            )}
            {hasNext && (
              <button
                onClick={onNext}
                className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
              >
                &#8250;
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

interface GalleryGridProps {
  images: GalleryImage[]
}

export default function GalleryGrid({ images }: GalleryGridProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => (prev !== null && prev < images.length - 1 ? prev + 1 : prev))
  }, [images.length])

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev))
  }, [])

  const handleClose = useCallback(() => {
    setSelectedIndex(null)
  }, [])

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="group relative rounded-2xl overflow-hidden cursor-pointer h-64 sm:h-72 lg:h-80"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => setSelectedIndex(index)}
          >
            {image.src ? (
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
            ) : (
              <PlaceholderImage index={index} alt={image.alt} />
            )}

            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Heart className="w-4 h-4 text-lila-300" fill="currentColor" strokeWidth={0} />
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <ImageLightbox
            image={images[selectedIndex]}
            imageIndex={selectedIndex}
            onClose={handleClose}
            onNext={handleNext}
            onPrev={handlePrev}
            hasNext={selectedIndex < images.length - 1}
            hasPrev={selectedIndex > 0}
          />
        )}
      </AnimatePresence>
    </>
  )
}
