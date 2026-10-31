// =========================================================================
// Procedural SVG pizza renderer. pieSvg('langosta', 'id') returns the inner
// markup for a 400x400 viewBox: crust, cheese (or chocolate), blistering,
// toppings scattered deterministically per recipe, slice cuts and a sheen.
// =========================================================================
import type { PieKey } from '@/data/menu'

function rng(seed: string) {
  let h = 1779033703 ^ seed.length
  for (let i = 0; i < seed.length; i++) { h = Math.imul(h ^ seed.charCodeAt(i), 3432918353); h = (h << 13) | (h >>> 19) }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507); h = Math.imul(h ^ (h >>> 13), 3266489909)
    return ((h ^= h >>> 16) >>> 0) / 4294967296
  }
}

type Pt = { x: number; y: number }
function scatter(rand: () => number, n: number, R: number, minD: number, taken: Pt[]) {
  const pts: Pt[] = []
  let tries = 0
  while (pts.length < n && tries < n * 60) {
    tries++
    const a = rand() * Math.PI * 2, r = Math.sqrt(rand()) * R
    const p = { x: 200 + Math.cos(a) * r, y: 200 + Math.sin(a) * r }
    if ([...pts, ...taken].every((q) => (q.x - p.x) ** 2 + (q.y - p.y) ** 2 > minD * minD)) pts.push(p)
  }
  taken.push(...pts)
  return pts
}

const camaron = `<path d="M-11 -2 a12 12 0 1 0 15 -9" fill="none" stroke="#f47b52" stroke-width="10" stroke-linecap="round"/><path d="M-11 -2 a12 12 0 1 0 15 -9" fill="none" stroke="#ffd2bd" stroke-width="2.5" stroke-dasharray="2 5" stroke-linecap="round"/><circle cx="5" cy="-11" r="2" fill="#c4502f"/>`

const ART: Record<string, string> = {
  pepperoni: `<circle r="17" fill="#c1362a" stroke="#8a1f15" stroke-width="2.5"/><circle cx="-6" cy="-5" r="2.4" fill="#8a1f15" opacity=".55"/><circle cx="5" cy="3" r="2" fill="#8a1f15" opacity=".5"/><circle cx="-1" cy="8" r="1.6" fill="#8a1f15" opacity=".5"/><ellipse cx="-5" cy="-7" rx="6" ry="3" fill="#fff" opacity=".18"/>`,
  chorizo: `<circle r="15" fill="#a8321e" stroke="#7a1d10" stroke-width="2.5"/><circle cx="-5" cy="-3" r="2.6" fill="#f2b796"/><circle cx="5" cy="4" r="2.2" fill="#f2b796"/><circle cx="3" cy="-7" r="1.8" fill="#f2b796"/><circle cx="-4" cy="7" r="1.6" fill="#f2b796"/>`,
  jamon: `<rect x="-13" y="-11" width="26" height="22" rx="4" fill="#f3a29b" stroke="#d27c74" stroke-width="2"/><path d="M-8 -3 q8 -5 16 0" stroke="#fbd0cb" stroke-width="3" fill="none" stroke-linecap="round"/>`,
  bacon: `<path d="M-22 0 q5.5 -7 11 0 t11 0 t11 0 t11 0" stroke="#92331f" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M-22 0 q5.5 -7 11 0 t11 0 t11 0 t11 0" stroke="#f3c4a6" stroke-width="3" fill="none" stroke-linecap="round"/>`,
  cebolla: `<circle r="12" fill="none" stroke="#f7f0de" stroke-width="3.2" opacity=".95"/><path d="M-7 0 a7 7 0 0 1 14 0" fill="none" stroke="#efe2c4" stroke-width="2.6"/>`,
  aji: `<path d="M-14 2 a14 14 0 0 1 28 0" stroke="#2f7d32" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M-11 0 a11 11 0 0 1 22 0" stroke="#7cc46a" stroke-width="2" fill="none" stroke-linecap="round"/>`,
  hongos: `<path d="M-14 2 a14 12 0 0 1 28 0 z" fill="#d9b78f" stroke="#9b7653" stroke-width="2"/><rect x="-4.5" y="1" width="9" height="11" rx="3.5" fill="#ead0ad" stroke="#9b7653" stroke-width="2"/>`,
  atun: `<ellipse cx="-5" cy="-2" rx="8" ry="6" fill="#dcb69c" stroke="#b48a70" stroke-width="1.5"/><ellipse cx="6" cy="1" rx="7" ry="5" fill="#e6c4ab" stroke="#b48a70" stroke-width="1.5"/><ellipse cx="-1" cy="6" rx="6" ry="4" fill="#d6ac90" stroke="#b48a70" stroke-width="1.5"/>`,
  pina: `<path d="M0 -11 L11 8 L-11 8 Z" fill="#ffd84a" stroke="#e1ae1c" stroke-width="2.5" stroke-linejoin="round"/><path d="M-4 3 h8" stroke="#fff1a8" stroke-width="2" stroke-linecap="round"/>`,
  camaron,
  langostino: `<g transform="scale(1.35)">${camaron}</g>`,
  langosta: `<path d="M-15 -5 q6 -12 19 -5 q11 6 3 15 q-8 9 -19 3 q-9 -6 -3 -13z" fill="#ff7148" stroke="#d24f2c" stroke-width="2"/><path d="M-9 -3 q5 -5 12 -1 M-6 4 q5 2 10 -2" stroke="#fff3ea" stroke-width="3" fill="none" stroke-linecap="round" opacity=".85"/>`,
  cocodrilo: `<path d="M-14 -4 q4 -10 16 -6 q12 5 4 14 q-8 8 -17 3 q-8 -5 -3 -11z" fill="#efe0c4" stroke="#c4a87d" stroke-width="2"/><path d="M-7 -1 l9 2 M-4 5 l8 -1" stroke="#d8c19a" stroke-width="2" stroke-linecap="round"/>`,
  herb: `<ellipse rx="3.6" ry="1.6" fill="#4f8a32"/>`,
  sugar: `<circle r="1.8" fill="#fffaf2" opacity=".95"/>`,
  chip: `<path d="M0 -5 L4 3 L-4 3 Z" fill="#3a1a0e" stroke="#2a1209" stroke-width="1" stroke-linejoin="round"/>`,
}

type Layer = [art: string, count: number, minD: number]
const RECIPES: Record<PieKey, Layer[]> = {
  queso: [],
  cebolla: [['cebolla', 15, 30]],
  aji: [['aji', 15, 30]],
  hongos: [['hongos', 14, 32]],
  jamon: [['jamon', 14, 33]],
  pepperoni: [['pepperoni', 14, 36]],
  chorizo: [['chorizo', 15, 32]],
  bacon: [['bacon', 10, 42]],
  atun: [['atun', 13, 32]],
  hawaiana: [['jamon', 9, 32], ['pina', 10, 28]],
  mixta: [['jamon', 6, 32], ['chorizo', 6, 32], ['aji', 5, 28], ['cebolla', 5, 28]],
  camarones: [['camaron', 12, 34]],
  langostino: [['langostino', 8, 46]],
  langosta: [['langosta', 11, 38], ['herb', 14, 10]],
  cocodrilo: [['cocodrilo', 11, 38], ['herb', 18, 10]],
  chocolate: [['sugar', 70, 8], ['chip', 16, 18]],
}

const BLISTERS = (() => {
  const br = rng('blister')
  let b = ''
  for (let i = 0; i < 26; i++) {
    const a = br() * Math.PI * 2, r = 120 + br() * 44
    const x = (200 + Math.cos(a) * r).toFixed(1), y = (200 + Math.sin(a) * r).toFixed(1)
    b += `<ellipse cx="${x}" cy="${y}" rx="${(6 + br() * 10).toFixed(1)}" ry="${(4 + br() * 5).toFixed(1)}" transform="rotate(${(a * 57.3).toFixed(0)} ${x} ${y})"/>`
  }
  for (let i = 0; i < 10; i++) {
    const a = br() * Math.PI * 2, r = br() * 110
    b += `<ellipse cx="${(200 + Math.cos(a) * r).toFixed(1)}" cy="${(200 + Math.sin(a) * r).toFixed(1)}" rx="${(5 + br() * 8).toFixed(1)}" ry="${(3 + br() * 4).toFixed(1)}"/>`
  }
  return `<g fill="#c9772a" opacity=".5">${b}</g>`
})()

export function pieSvg(key: PieKey = 'queso', id = 'pie', animate = true): string {
  const recipe = RECIPES[key] ?? RECIPES.queso
  const rand = rng(key)
  const choc = key === 'chocolate'

  const defs = `<defs>
    <radialGradient id="${id}c" cx="50%" cy="45%" r="55%"><stop offset="0" stop-color="#f7c66a"/><stop offset=".78" stop-color="#e59a3a"/><stop offset="1" stop-color="#a65a1e"/></radialGradient>
    <radialGradient id="${id}q" cx="45%" cy="40%" r="60%">${choc
      ? '<stop offset="0" stop-color="#6b3620"/><stop offset=".7" stop-color="#4a2314"/><stop offset="1" stop-color="#2f150b"/>'
      : '<stop offset="0" stop-color="#ffe7a3"/><stop offset=".6" stop-color="#f8c650"/><stop offset="1" stop-color="#e8962f"/>'}</radialGradient>
    <radialGradient id="${id}s" cx="40%" cy="30%" r="70%"><stop offset="0" stop-color="#fff" stop-opacity=".28"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/></radialGradient>
  </defs>`

  let base = `<circle cx="200" cy="200" r="190" fill="url(#${id}c)"/><circle cx="200" cy="200" r="166" fill="url(#${id}q)"/>`
  if (!choc) base += BLISTERS

  const taken: Pt[] = []
  let tops = '', n = 0
  for (const [art, count, minD] of recipe) {
    const loose = art === 'sugar' || art === 'herb'
    for (const p of scatter(rand, count, loose ? 150 : 138, minD, loose ? [] : taken)) {
      const rot = (rand() * 360).toFixed(0)
      const delay = animate ? ` style="animation-delay:${n * 28}ms"` : ''
      tops += `<g transform="translate(${p.x.toFixed(1)} ${p.y.toFixed(1)}) rotate(${rot})"><g class="tp"${delay}>${ART[art]}</g></g>`
      n++
    }
  }

  const cuts = `<g stroke="${choc ? '#2a1209' : '#a65a1e'}" stroke-width="2.5" opacity=".4"><line x1="200" y1="14" x2="200" y2="386"/><line x1="14" y1="200" x2="386" y2="200"/><line x1="68" y1="68" x2="332" y2="332"/><line x1="332" y1="68" x2="68" y2="332"/></g>`
  const shine = `<circle cx="200" cy="200" r="190" fill="url(#${id}s)" pointer-events="none"/>`
  return defs + base + `<g class="tops${animate ? ' is-anim' : ''}">${tops}</g>` + cuts + shine
}
