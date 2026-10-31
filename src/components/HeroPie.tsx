import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Pie from './Pie'
import { findItem, fmtPrice, type PieKey } from '@/data/menu'
import { useT } from '@/i18n/useT'
import { pick } from '@/i18n/copy'

const SHOWCASE = ['chorizo', 'queso', 'jamon', 'langosta', 'cocodrilo'] as const

// Signature hero: a pizza that cycles through real menu pies, toppings
// dropping in, tilting in 3D toward the pointer. Pickers let guests choose.
export default function HeroPie() {
  const { t, lang } = useT()
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const art = useRef<HTMLDivElement>(null)
  const id = SHOWCASE[i]
  const item = findItem(id)!

  useEffect(() => {
    if (paused || reduce) return
    const tm = setInterval(() => setI((n) => (n + 1) % SHOWCASE.length), 3600)
    return () => clearInterval(tm)
  }, [paused, reduce])

  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== 'mouse' || !art.current) return
    const r = art.current.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    art.current.style.transform = `perspective(900px) rotateX(${(-y * 14).toFixed(2)}deg) rotateY(${(x * 14).toFixed(2)}deg)`
  }
  const onLeave = () => { if (art.current) art.current.style.transform = '' }

  return (
    <div className="flex flex-col items-center" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div
        ref={art}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className="relative aspect-square w-full max-w-[min(500px,86vw)] transition-transform duration-300 ease-out [transform-style:preserve-3d]"
      >
        <div className="absolute inset-[4%] grid place-items-center rounded-full bg-[radial-gradient(circle,#f6efe3_60%,#e3d3bd_61%_64%,#f6efe3_65%)] shadow-[0_40px_80px_-20px_rgba(0,0,0,.65),inset_0_-8px_20px_rgba(0,0,0,.08)]">
          <div className="h-[86%] w-[86%] animate-spin-slow drop-shadow-[0_8px_10px_rgba(80,30,10,.35)]">
            <Pie pie={item.pie as PieKey} className="h-full w-full" label={pick(item.name, lang)} />
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute left-[-2%] top-[4%] -rotate-[8deg] rounded-2xl bg-mango px-4 py-3 font-display text-[clamp(.8rem,1.6vw,1rem)] font-extrabold italic leading-tight text-choc-800 shadow-xl [transform:translateZ(40px)_rotate(-8deg)]"
          dangerouslySetInnerHTML={{ __html: t('hero.sticker') }}
        />
      </div>

      <div className="mt-4 flex min-h-[64px] items-baseline gap-3 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-cream backdrop-blur" aria-live="polite">
        <span className="hidden text-[0.7rem] font-bold uppercase tracking-[0.18em] text-cream-2/70 sm:inline">{t('hero.now')}</span>
        <AnimatePresence mode="wait">
          <motion.span
            key={id + lang}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="font-display text-[1.4rem] font-extrabold italic"
          >
            {pick(item.name, lang)} <span className="not-italic text-mango">{fmtPrice(item.price!)}</span>
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-2" role="group" aria-label={t('hero.pick')}>
        {SHOWCASE.map((k, n) => {
          const it = findItem(k)!
          return (
            <button
              key={k}
              onClick={() => setI(n)}
              aria-pressed={n === i}
              className={`rounded-full border px-3.5 py-1.5 text-[0.82rem] font-semibold transition ${
                n === i ? 'border-mango bg-mango text-choc-800' : 'border-white/20 text-cream-2 hover:border-cream'
              }`}
            >
              {pick(it.name, lang)}
            </button>
          )
        })}
      </div>
    </div>
  )
}
