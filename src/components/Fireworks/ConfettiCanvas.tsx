import { useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

interface ConfettiPiece {
  x: number
  y: number
  vx: number
  vy: number
  rotation: number
  rotationSpeed: number
  width: number
  height: number
  color: string
  life: number
  decay: number
  gravity: number
}

interface ConfettiCanvasProps {
  active: boolean
}

export default function ConfettiCanvas({ active }: ConfettiCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const createBurst = useCallback((canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d')
    if (!ctx) return []

    const pieces: ConfettiPiece[] = []
    const colors = ['#da77f2', '#748ffc', '#ffffff', '#cc5de8', '#bac8ff', '#e599f7', '#be4bdb']
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2

    for (let i = 0; i < 80; i++) {
      const angle = (Math.PI * 2 * i) / 80
      const speed = 4 + Math.random() * 8
      pieces.push({
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * speed * (0.5 + Math.random()),
        vy: Math.sin(angle) * speed * (0.5 + Math.random()) - 3,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 12,
        width: 4 + Math.random() * 6,
        height: 2 + Math.random() * 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1,
        decay: 0.008 + Math.random() * 0.006,
        gravity: 0.08 + Math.random() * 0.04,
      })
    }

    return pieces
  }, [])

  useEffect(() => {
    if (!active) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let animationId: number
    let pieces = createBurst(canvas)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      pieces = pieces.filter((p) => p.life > 0)

      pieces.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        p.vy += p.gravity
        p.vx *= 0.99
        p.rotation += p.rotationSpeed
        p.life -= p.decay

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rotation * Math.PI) / 180)
        ctx.globalAlpha = p.life
        ctx.fillStyle = p.color
        ctx.fillRect(-p.width / 2, -p.height / 2, p.width, p.height)
        ctx.restore()
      })

      if (pieces.length > 0) {
        animationId = requestAnimationFrame(animate)
      }
    }

    animate()

    return () => cancelAnimationFrame(animationId)
  }, [active, createBurst])

  if (!active) return null

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 50, willChange: 'transform' }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
    />
  )
}
