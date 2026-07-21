import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface Heart {
  x: number
  y: number
  size: number
  speed: number
  opacity: number
  wobble: number
  wobbleSpeed: number
}

export default function FloatingHearts() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let hearts: Heart[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resize()
    window.addEventListener('resize', resize)

    const createHeart = (): Heart => ({
      x: Math.random() * canvas.width,
      y: canvas.height + 20,
      size: Math.random() * 10 + 6,
      speed: Math.random() * 0.5 + 0.2,
      opacity: Math.random() * 0.15 + 0.05,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.02 + 0.005,
    })

    for (let i = 0; i < 12; i++) {
      const h = createHeart()
      h.y = Math.random() * canvas.height
      hearts.push(h)
    }

    const drawHeart = (x: number, y: number, size: number) => {
      ctx.beginPath()
      const topCurveHeight = size * 0.3
      ctx.moveTo(x, y + topCurveHeight)
      ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight)
      ctx.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + (size + topCurveHeight) / 1.5, x, y + size)
      ctx.bezierCurveTo(x, y + (size + topCurveHeight) / 1.5, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight)
      ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight)
      ctx.closePath()
      ctx.fill()
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      hearts.forEach((heart) => {
        heart.y -= heart.speed
        heart.wobble += heart.wobbleSpeed

        const wobbleX = Math.sin(heart.wobble) * 30

        ctx.globalAlpha = heart.opacity
        ctx.fillStyle = '#da77f2'
        drawHeart(heart.x + wobbleX, heart.y, heart.size)

        if (heart.y < -heart.size * 2) {
          Object.assign(heart, createHeart())
        }
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay: 0.5 }}
    />
  )
}
