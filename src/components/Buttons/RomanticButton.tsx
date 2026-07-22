import { memo } from 'react'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

interface RomanticButtonProps {
  children: React.ReactNode
  onClick?: () => void
  href?: string
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  className?: string
}

function RomanticButtonInner({
  children,
  onClick,
  href,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
}: RomanticButtonProps) {
  const sizeClass =
    size === 'sm' ? 'btn-sm' : size === 'lg' ? 'btn-lg' : 'btn-md'
  const variantClass = variant === 'primary' ? 'btn-primary' : 'btn-secondary'
  const classes = `btn ${variantClass} ${sizeClass} ${className}`

  const Tag = href ? motion.a : motion.button
  const extraProps = href ? { href } : { onClick, disabled }

  return (
    <Tag
      className={classes}
      whileHover={disabled ? undefined : { scale: 1.04 }}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      {...extraProps}
    >
      <Heart className="w-3.5 h-3.5" fill="currentColor" strokeWidth={0} aria-hidden="true" />
      <span>{children}</span>
    </Tag>
  )
}

const RomanticButton = memo(RomanticButtonInner)
export default RomanticButton
