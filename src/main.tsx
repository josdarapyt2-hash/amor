import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ParticlesProvider } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import type { Engine } from '@tsparticles/engine'
import router from './router/AppRouter'
import './index.css'

const initParticles = async (engine: Engine) => {
  await loadSlim(engine)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ParticlesProvider init={initParticles}>
      <RouterProvider router={router} />
    </ParticlesProvider>
  </StrictMode>,
)
