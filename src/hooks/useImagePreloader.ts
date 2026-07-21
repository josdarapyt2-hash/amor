import { useState, useEffect, useCallback } from 'react'

export function useImagePreloader(imageUrls: string[]) {
  const [loaded, setLoaded] = useState(false)
  const [progress, setProgress] = useState(0)

  const preload = useCallback(async () => {
    if (imageUrls.length === 0) {
      setLoaded(true)
      return
    }

    let loadedCount = 0

    const promises = imageUrls.map(
      (url) =>
        new Promise<void>((resolve) => {
          const img = new Image()
          img.onload = img.onerror = () => {
            loadedCount++
            setProgress((loadedCount / imageUrls.length) * 100)
            resolve()
          }
          img.src = url
        }),
    )

    await Promise.all(promises)
    setLoaded(true)
  }, [imageUrls])

  useEffect(() => {
    preload()
  }, [preload])

  return { loaded, progress }
}

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    setMatches(media.matches)

    const listener = (e: MediaQueryListEvent) => setMatches(e.matches)
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [query])

  return matches
}
