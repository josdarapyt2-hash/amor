import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface Star {
  x: number
  y: number
  angle: number
  speed: number
  length: number
  life: number
  maxLife: number
}

export default function ShootingStars() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let stars: Star[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resize()
    window.addEventListener('resize', resize)

    const createStar = (): Star => {
      const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.5
      return {
        x: Math.random() * canvas.width * 0.8,
        y: Math.random() * canvas.height * 0.5,
        angle,
        speed: 8 + Math.random() * 6,
        length: 60 + Math.random() * 80,
        life: 1,
        maxLife: 1,
      }
    }

    let spawnTimer = 0
    const spawnInterval = 200 + Math.floor(Math.random() * 300)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      spawnTimer++
      if (spawnTimer >= spawnInterval) {
        spawnTimer = 0
        stars.push(createStar())
      }

      stars = stars.filter((s) => s.life > 0)

      stars.forEach((s) => {
        s.x += Math.cos(s.angle) * s.speed
        s.y += Math.sin(s.angle) * s.speed
        s.life -= 0.015

        const tailX = s.x - Math.cos(s.angle) * s.length * s.life
        const tailY = s.y - Math.sin(s.angle) * s.length * s.life

        const gradient = ctx.createLinearGradient(tailX, tailY, s.x, s.y)
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0)')
        gradient.addColorStop(0.7, `rgba(200, 200, 255, ${s.life * 0.4})`)
        gradient.addColorStop(1, `rgba(255, 255, 255, ${s.life * 0.8})`)

        ctx.beginPath()
        ctx.moveTo(tailX, tailY)
        ctx.lineTo(s.x, s.y)
        ctx.strokeStyle = gradient
        ctx.lineWidth = 1.5
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(s.x, s.y, 1.5 * s.life, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${s.life})`
        ctx.fill()
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
      style={{ zIndex: 1, willChange: 'transform' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.6 }}
      transition={{ duration: 2, delay: 2 }}
    />
  )
}
