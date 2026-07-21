import { lazy, Suspense, useEffect } from 'react'
import { createBrowserRouter, useLocation } from 'react-router-dom'
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary'

const Home = lazy(() => import('@/pages/Home/Home'))
const Gallery = lazy(() => import('@/pages/Gallery/Gallery'))
const Letter = lazy(() => import('@/pages/Letter/Letter'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function PageLoader() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background:
          'linear-gradient(135deg, #0a1128 0%, #1e3a8a 50%, #0a1128 100%)',
      }}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 rounded-full border-2 border-lila-400/30 border-t-lila-400 animate-spin" />
        <span className="text-xs text-white/30 font-light tracking-widest uppercase">
          Cargando...
        </span>
      </div>
    </div>
  )
}

function SuspenseWrapper({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>
}

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ErrorBoundary>
        <SuspenseWrapper>
          <ScrollToTop />
          <Home />
        </SuspenseWrapper>
      </ErrorBoundary>
    ),
  },
  {
    path: '/gallery',
    element: (
      <ErrorBoundary>
        <SuspenseWrapper>
          <ScrollToTop />
          <Gallery />
        </SuspenseWrapper>
      </ErrorBoundary>
    ),
  },
  {
    path: '/letter',
    element: (
      <ErrorBoundary>
        <SuspenseWrapper>
          <ScrollToTop />
          <Letter />
        </SuspenseWrapper>
      </ErrorBoundary>
    ),
  },
])

export default router
