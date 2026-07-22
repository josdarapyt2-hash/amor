import { useRef, useCallback, useEffect } from 'react'

interface SwipeHandlers {
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  threshold?: number
}

export function useSwipe({
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  threshold = 50,
}: SwipeHandlers) {
  const startRef = useRef<{ x: number; y: number } | null>(null)

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0]
    startRef.current = { x: touch.clientX, y: touch.clientY }
  }, [])

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!startRef.current) return

      const touch = e.changedTouches[0]
      const deltaX = touch.clientX - startRef.current.x
      const deltaY = touch.clientY - startRef.current.y
      startRef.current = null

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > threshold) onSwipeRight?.()
        else if (deltaX < -threshold) onSwipeLeft?.()
      } else {
        if (deltaY < -threshold) onSwipeUp?.()
      }
    },
    [onSwipeLeft, onSwipeRight, onSwipeUp, threshold],
  )

  return { onTouchStart, onTouchEnd } as const
}

interface KeyboardNavHandlers {
  onEscape?: () => void
  onArrowLeft?: () => void
  onArrowRight?: () => void
}

export function useKeyboardNav(handlers: KeyboardNavHandlers) {
  const handlersRef = useRef(handlers)
  handlersRef.current = handlers

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handlersRef.current.onEscape?.()
      if (e.key === 'ArrowLeft') handlersRef.current.onArrowLeft?.()
      if (e.key === 'ArrowRight') handlersRef.current.onArrowRight?.()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])
}
