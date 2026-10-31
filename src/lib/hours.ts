import { useEffect, useState } from 'react'
import type { Location } from '@/data/site'

// Open/closed status computed in the restaurant's time zone (America/New_York).
export interface Status { open: boolean; dayIndex: number; closesAt?: string; opensAt?: string; opensDay?: number }

const toMin = (hhmm: string) => { const [h, m] = hhmm.split(':').map(Number); return h * 60 + m }

export function nowInFlorida(d = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: false }).formatToParts(d)
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '0'
  const dayIndex = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].indexOf(get('weekday'))
  return { dayIndex, minutes: (Number(get('hour')) % 24) * 60 + Number(get('minute')) }
}

export function getStatus(loc: Location, d = new Date()): Status {
  const { dayIndex, minutes } = nowInFlorida(d)
  const today = loc.hours[dayIndex]
  if (minutes >= toMin(today.open) && minutes < toMin(today.close)) return { open: true, dayIndex, closesAt: today.close }
  if (minutes < toMin(today.open)) return { open: false, dayIndex, opensAt: today.open, opensDay: dayIndex }
  const next = (dayIndex + 1) % 7
  return { open: false, dayIndex, opensAt: loc.hours[next].open, opensDay: next }
}

export function useStatus(loc: Location) {
  const [s, setS] = useState(() => getStatus(loc))
  useEffect(() => {
    const id = setInterval(() => setS(getStatus(loc)), 60_000)
    return () => clearInterval(id)
  }, [loc])
  return s
}

export function fmtTime(hhmm: string, lang: 'en' | 'es') {
  const [h, m] = hhmm.split(':').map(Number)
  const d = new Date(2000, 0, 1, h, m)
  return d.toLocaleTimeString(lang === 'es' ? 'es-US' : 'en-US', { hour: 'numeric', minute: m ? '2-digit' : undefined })
}
