import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from 'react'

interface Props { children: ReactNode; className?: string; delay?: number; direction?: 'up' | 'down' | 'left' | 'right'; style?: CSSProperties }

const SPRING = 'cubic-bezier(0.16, 1, 0.3, 1)'
const T = { up: 'translateY(28px)', down: 'translateY(-28px)', left: 'translateX(28px)', right: 'translateX(-28px)' }

export default function ScrollReveal({ children, className = '', delay = 0, direction = 'up', style }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setVisible(true); return }
    const fallback = setTimeout(() => setVisible(true), 1600 + delay) // never leave content hidden
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { clearTimeout(fallback); setVisible(true); io.disconnect() }
    }, { rootMargin: '0px 0px -40px 0px' })
    io.observe(el)
    return () => { clearTimeout(fallback); io.disconnect() }
  }, [delay])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : T[direction],
        transition: `opacity .7s ${SPRING} ${delay}ms, transform .7s ${SPRING} ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}
