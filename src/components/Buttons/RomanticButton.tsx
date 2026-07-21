import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

interface RomanticButtonProps {
  children: React.ReactNode
  onClick?: () => void
  href?: string
  variant?: 'primary' | 'secondary'
}

export default function RomanticButton({
  children,
  onClick,
  href,
  variant = 'primary',
}: RomanticButtonProps) {
  const baseClasses =
    'relative inline-flex items-center gap-2 px-8 py-3 rounded-full font-medium text-sm tracking-wider transition-all duration-300 cursor-pointer overflow-hidden'

  const variantClasses =
    variant === 'primary'
      ? 'bg-gradient-to-r from-lila-500 to-deep-blue-500 text-white shadow-[0_0_30px_rgba(204,93,232,0.3)]'
      : 'glass glass-hover text-white/90'

  const Tag = href ? motion.a : motion.button
  const extraProps = href ? { href } : { onClick }

  return (
    <Tag
      className={`${baseClasses} ${variantClasses}`}
      whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(204,93,232,0.4)' }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      {...extraProps}
    >
      <span className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-full" />
      <Heart className="w-4 h-4" fill="currentColor" strokeWidth={0} />
      <span className="relative z-10">{children}</span>
    </Tag>
  )
}
