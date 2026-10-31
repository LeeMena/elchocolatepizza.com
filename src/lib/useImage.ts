import { useEffect, useState } from 'react'

// Resolves to the src only once the file actually loads, so photo slots can
// fall back to illustrations until the owner drops real photos in.
export function useImage(src?: string) {
  const [ok, setOk] = useState<string | null>(null)
  useEffect(() => {
    if (!src) return
    let alive = true
    const img = new Image()
    img.onload = () => { if (alive) setOk(src) }
    img.src = src
    return () => { alive = false }
  }, [src])
  return ok
}
