import { useEffect } from 'react'
import { useLanguage } from '@/context/LanguageProvider'
import { SITE_URL } from '@/data/site'

// Literal title/description/path props are also read at build time by
// scripts/generate-route-meta.mjs, so non-JS crawlers and link previews
// get per-route meta from the edge. Keep them as plain string literals.
interface Props {
  title: string
  description: string
  path: string
  titleEs?: string
  descriptionEs?: string
  image?: string
  noindex?: boolean
  schema?: Record<string, unknown> | Record<string, unknown>[]
}

const DEFAULT_IMAGE = `${SITE_URL}/images/og.png`

function setMeta(selector: string, attr: string, value: string, create?: () => HTMLElement) {
  let el = document.head.querySelector(selector) as HTMLElement | null
  if (!el && create) { el = create(); document.head.appendChild(el) }
  el?.setAttribute(attr, value)
}

export default function SEO({ title, description, path, titleEs, descriptionEs, image, noindex, schema }: Props) {
  const { lang } = useLanguage()
  const t = lang === 'es' && titleEs ? titleEs : title
  const d = lang === 'es' && descriptionEs ? descriptionEs : description
  const url = `${SITE_URL}${path === '/' ? '/' : path}`
  const img = image ?? DEFAULT_IMAGE

  useEffect(() => {
    document.title = t
    setMeta('meta[name="description"]', 'content', d)
    setMeta('link[rel="canonical"]', 'href', url)
    setMeta('meta[property="og:title"]', 'content', t)
    setMeta('meta[property="og:description"]', 'content', d)
    setMeta('meta[property="og:url"]', 'content', url)
    setMeta('meta[property="og:image"]', 'content', img)
    setMeta('meta[property="og:locale"]', 'content', lang === 'es' ? 'es_US' : 'en_US')
    setMeta('meta[name="twitter:title"]', 'content', t)
    setMeta('meta[name="twitter:description"]', 'content', d)
    setMeta('meta[name="twitter:image"]', 'content', img)

    const robots = document.head.querySelector('meta[name="robots"]')
    if (noindex) setMeta('meta[name="robots"]', 'content', 'noindex, follow', () => { const m = document.createElement('meta'); m.setAttribute('name', 'robots'); return m })
    else robots?.remove()

    const id = 'page-schema'
    document.getElementById(id)?.remove()
    if (schema) {
      const s = document.createElement('script')
      s.type = 'application/ld+json'
      s.id = id
      s.text = JSON.stringify(schema)
      document.head.appendChild(s)
    }
  }, [t, d, url, img, lang, noindex, schema])

  return null
}
