import { menu } from '@/data/menu'
import { SITE_URL } from '@/data/site'
import { getT } from '@/i18n/copy'
import { FAQ_KEYS } from '@/data/faq'

export function menuSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    '@id': `${SITE_URL}/menu#menu`,
    name: 'Pizzeria El Chocolate Menu',
    url: `${SITE_URL}/menu`,
    inLanguage: ['en', 'es'],
    hasMenuSection: menu.map((c) => ({
      '@type': 'MenuSection',
      name: c.title.en,
      description: c.blurb.en,
      hasMenuItem: c.items.map((i) => ({
        '@type': 'MenuItem',
        name: i.name.en === i.name.es ? i.name.en : `${i.name.en} (${i.name.es})`,
        ...(i.note ? { description: i.note.en } : {}),
        ...(i.price != null ? { offers: { '@type': 'Offer', price: i.price.toFixed(2), priceCurrency: 'USD' } } : {}),
      })),
    })),
  }
}

export function faqSchema() {
  const t = getT('en')
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_KEYS.map((n) => ({
      '@type': 'Question',
      name: t(`faq.q${n}`),
      acceptedAnswer: { '@type': 'Answer', text: t(`faq.a${n}`) },
    })),
  }
}
