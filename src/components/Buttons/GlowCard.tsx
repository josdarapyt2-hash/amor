import { useRef, useState, useCallback, memo } from 'react'
import { motion } from 'framer-motion'

interface GlowCardProps {
  children: React.ReactNode
  className?: string
}

function GlowCardInner({ children, className = '' }: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return
      const rect = cardRef.current.getBoundingClientRect()
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    },
    [],
  )

  return (
    <motion.div
      ref={cardRef}
      className={`relative glass rounded-2xl overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.3 }}
    >
      {isHovered && (
        <div
          className="absolute pointer-events-none"
          style={{
            left: mousePos.x - 150,
            top: mousePos.y - 150,
            width: 300,
            height: 300,
            background: 'radial-gradient(circle, rgba(204,93,232,0.12) 0%, transparent 70%)',
            transition: 'left 0.15s ease-out, top 0.15s ease-out',
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}

const GlowCard = memo(GlowCardInner)
export default GlowCard
