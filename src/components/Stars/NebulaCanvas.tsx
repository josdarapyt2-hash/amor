import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface Sparkle {
  x: number
  y: number
  size: number
  opacity: number
  twinkleSpeed: number
  phase: number
}

export default function NebulaCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let time = 0
    let sparkles: Sparkle[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < 50; i++) {
      sparkles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.03 + 0.01,
        phase: Math.random() * Math.PI * 2,
      })
    }

    const drawNebula = () => {
      const cx = canvas.width * 0.7
      const cy = canvas.height * 0.3
      const radius = Math.min(canvas.width, canvas.height) * 0.4

      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius)
      gradient.addColorStop(0, `rgba(174, 62, 201, ${0.08 + Math.sin(time * 0.005) * 0.02})`)
      gradient.addColorStop(0.4, `rgba(76, 110, 245, ${0.05 + Math.sin(time * 0.003) * 0.01})`)
      gradient.addColorStop(1, 'rgba(10, 17, 40, 0)')

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const cx2 = canvas.width * 0.2
      const cy2 = canvas.height * 0.7
      const radius2 = Math.min(canvas.width, canvas.height) * 0.3

      const gradient2 = ctx.createRadialGradient(cx2, cy2, 0, cx2, cy2, radius2)
      gradient2.addColorStop(0, `rgba(204, 93, 232, ${0.06 + Math.cos(time * 0.004) * 0.02})`)
      gradient2.addColorStop(0.5, `rgba(59, 91, 219, ${0.03})`)
      gradient2.addColorStop(1, 'rgba(10, 17, 40, 0)')

      ctx.fillStyle = gradient2
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    const drawSparkles = () => {
      sparkles.forEach((s) => {
        s.phase += s.twinkleSpeed
        const alpha = s.opacity * (0.5 + Math.sin(s.phase) * 0.5)

        ctx.beginPath()
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
        ctx.fill()

        if (s.size > 1.5) {
          ctx.beginPath()
          ctx.moveTo(s.x - s.size * 2, s.y)
          ctx.lineTo(s.x + s.size * 2, s.y)
          ctx.moveTo(s.x, s.y - s.size * 2)
          ctx.lineTo(s.x, s.y + s.size * 2)
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.3})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time++
      drawNebula()
      drawSparkles()
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
      style={{ zIndex: 0, willChange: 'transform' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 3 }}
    />
  )
}
