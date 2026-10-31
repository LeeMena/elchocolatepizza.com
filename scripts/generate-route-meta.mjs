// generate-route-meta.mjs
// ---------------------------------------------------------------
// Builds functions/route-meta.json: route -> head metadata + crawler body,
// consumed by functions/_middleware.js to rewrite <head> at the edge so
// non-JS crawlers and link-preview scrapers (Facebook, iMessage, WhatsApp,
// Google) see per-route titles, descriptions and real page content.
//
// Sources of truth (no duplication):
//   - <SEO .../> literal props in each src/pages/*.tsx
//   - src/data/menu.ts + src/data/site.ts for crawler body text
//   - src/routes.ts coverage contract: every route must resolve or the build fails
//
// Runs automatically via the npm `prebuild` hook. CI checks the committed
// JSON is fresh (generate + git diff --exit-code).
// ---------------------------------------------------------------
import { readFileSync, readdirSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { tmpdir } from 'node:os'
import { buildSync } from 'esbuild'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const pagesDir = join(root, 'src', 'pages')
const outFile = join(root, 'functions', 'route-meta.json')

const ENT = { amp: '&', quot: '"', apos: "'", lt: '<', gt: '>', nbsp: ' ', middot: '·' }
const decode = (s) => s.replace(/&([a-z]+);/gi, (m, e) => ENT[e] ?? m)
const prop = (block, name) => {
  const m = block.match(new RegExp(`\\b${name}="([^"]*)"`))
  return m ? decode(m[1]) : undefined
}
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))

// ---- 1. <SEO/> props from page components ----
const meta = {}
for (const file of readdirSync(pagesDir).sort()) {
  if (!file.endsWith('.tsx')) continue
  const src = readFileSync(join(pagesDir, file), 'utf8')
  const m = src.match(/<SEO\b([\s\S]*?)\/>/)
  if (!m) throw new Error(`route-meta: no <SEO/> block in ${file}`)
  const title = prop(m[1], 'title'), description = prop(m[1], 'description'), path = prop(m[1], 'path')
  if (!title || !description || !path) throw new Error(`route-meta: missing title/description/path in ${file}`)
  const entry = { title, description }
  const h1 = src.match(/<h1[^>]*>([^<{]+)<\/h1>/)
  if (h1) entry.h1 = h1[1].trim()
  if (/\bnoindex\b/.test(m[1])) entry.noindex = true
  meta[path === '/404' ? '__404__' : path] = entry
}

// ---- 2. Crawler body text from data files ----
const tmp = mkdtempSync(join(tmpdir(), 'route-meta-'))
try {
  const load = async (rel) => {
    const out = join(tmp, rel.replace(/\W/g, '_') + '.mjs')
    buildSync({ entryPoints: [join(root, rel)], outfile: out, bundle: true, format: 'esm', platform: 'neutral', logLevel: 'silent' })
    return import(pathToFileURL(out).href)
  }
  const { menu } = await load('src/data/menu.ts')
  const { site } = await load('src/data/site.ts')
  const { routes } = await load('src/routes.ts')
  const loc = site.locations[0]
  const ampm = (hhmm) => { const [h, m] = hhmm.split(':').map(Number); return `${h % 12 || 12}${m ? ':' + String(m).padStart(2, '0') : ''} ${h < 12 ? 'AM' : 'PM'}` }
  const money = (p) => (p == null ? 'Ask us' : `$${p.toFixed(2)}`)
  const hours = `<p>Open daily ${ampm(loc.hours[0].open)}–${ampm(loc.hours[0].close)}. ${esc(loc.street)}, ${esc(loc.city)}, ${loc.state} ${loc.zip}. Phone ${esc(loc.phone)}.</p>`

  const menuBody = menu.map((c) =>
    `<section><h2>${esc(c.title.en)} / ${esc(c.title.es)}</h2><p>${esc(c.blurb.en)}</p><ul>` +
    c.items.map((i) => `<li>${esc(i.name.en)}${i.name.es !== i.name.en ? ` (${esc(i.name.es)})` : ''} — ${money(i.price)}${i.note ? `. ${esc(i.note.en)}` : ''}</li>`).join('') +
    '</ul></section>').join('')

  if (meta['/menu']) meta['/menu'].body = menuBody
  if (meta['/']) meta['/'].body = hours + `<p>Cuban pizza from $10.99, specialty lobster and alligator pies, croquetas, tropical shakes and chocolate pizza.</p>`
  if (meta['/visit']) meta['/visit'].body = hours
  if (meta['/order']) meta['/order'].body = `<ul>${site.order.map((o) => `<li><a href="${esc(o.url)}">Order on ${esc(o.label)}</a></li>`).join('')}<li>Call ${esc(loc.phone)}</li></ul>`

  // ---- 3. Coverage contract ----
  const missing = routes.filter((r) => !meta[r])
  if (missing.length) throw new Error(`route-meta: no <SEO/> for routes: ${missing.join(', ')}`)
  if (!meta['__404__']) throw new Error('route-meta: NotFound page must declare path="/404"')
} finally {
  rmSync(tmp, { recursive: true, force: true })
}

const sorted = Object.fromEntries(Object.keys(meta).sort().map((k) => [k, meta[k]]))
writeFileSync(outFile, JSON.stringify(sorted, null, 2) + '\n')
console.log(`route-meta: wrote ${Object.keys(sorted).length} entries -> functions/route-meta.json`)
