import { useEffect } from 'react'

// Plausible custom events. The stub in index.html queues events fired before
// the script loads. Register each name as a Goal in the Plausible dashboard.
type EventProps = Record<string, string>
interface PlausibleWindow { plausible?: (name: string, options?: { props?: EventProps }) => void }

export function trackEvent(name: string, props?: EventProps) {
  try { (window as unknown as PlausibleWindow).plausible?.(name, props ? { props } : undefined) } catch { /* never break the app */ }
}

// Site-wide conversion tracking, mounted once in Layout (delegated listener):
//  - "Order Click"       any link to an ordering partner (Slice, DoorDash)
//  - "Call Click"        any tel: link
//  - "Directions Click"  any Google Maps directions link
//  - "Instagram Click"   any link to the Instagram profile
export function useConversionTracking() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a')
      if (!a) return
      const href = a.getAttribute('href') || ''
      const page = window.location.pathname
      if (href.includes('slicelife.com')) trackEvent('Order Click', { provider: 'Slice', page })
      else if (href.includes('doordash.com')) trackEvent('Order Click', { provider: 'DoorDash', page })
      else if (href.startsWith('tel:')) trackEvent('Call Click', { page })
      else if (href.includes('google.com/maps/dir')) trackEvent('Directions Click', { page })
      else if (href.includes('instagram.com')) trackEvent('Instagram Click', { page })
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [])
}
