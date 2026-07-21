import { useMemo } from 'react'
import Particles from '@tsparticles/react'
import { useParticlesProvider } from '@tsparticles/react'
import type { ISourceOptions } from '@tsparticles/engine'

export default function ParticlesBackground() {
  const { loaded } = useParticlesProvider()

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: { enable: true, zIndex: 0 },
      fpsLimit: 60,
      particles: {
        number: {
          value: 80,
          density: { enable: true },
        },
        color: {
          value: ['#ffffff', '#cc5de8', '#748ffc', '#bac8ff'],
        },
        shape: { type: 'circle' },
        opacity: {
          value: { min: 0.1, max: 0.5 },
          animation: {
            enable: true,
            speed: 0.5,
            sync: false,
          },
        },
        size: {
          value: { min: 0.5, max: 2.5 },
          animation: {
            enable: true,
            speed: 1,
            sync: false,
          },
        },
        move: {
          enable: true,
          speed: 0.3,
          direction: 'none' as const,
          random: true,
          straight: false,
          outModes: { default: 'out' as const },
        },
        twinkle: {
          particles: {
            enable: true,
            frequency: 0.05,
            opacity: 0.8,
            color: '#ffffff',
          },
        },
      },
      detectRetina: true,
    }),
    [],
  )

  if (!loaded) return null

  return <Particles id="tsparticles" options={options} />
}
