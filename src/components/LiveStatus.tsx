import { useStatusText } from '@/lib/useStatusText'

export default function LiveStatus({ className = '', short = false }: { className?: string; short?: boolean }) {
  const { open, state, detail } = useStatusText()
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className={`live-dot ${open ? '' : 'is-closed'}`} aria-hidden="true" />
      <span>{short ? state : `${state} · ${detail}`}</span>
    </span>
  )
}
