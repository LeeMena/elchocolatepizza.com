// =========================================================================
// SITE FACTS — single source of truth for contact, hours, links, photos.
// Compiled Oct 2026 from the restaurant's own site (search-index copy) and
// public listings (Slice, DoorDash, Yelp, Birdeye). Items flagged VERIFY
// had conflicting info across sources — confirm with the owner.
// =========================================================================

export type Bi = { en: string; es: string }

export interface Hours { day: Bi; open: string; close: string } // 24h "HH:MM"

export interface Location {
  id: string
  name: string
  street: string
  city: string
  state: string
  zip: string
  phone: string // VERIFY: some directories list (239) 471-0463
  mapsQuery: string
  hours: Hours[] // index 0 = Monday
}

const daily = (open: string, close: string): Hours[] =>
  [
    { en: 'Monday', es: 'Lunes' },
    { en: 'Tuesday', es: 'Martes' },
    { en: 'Wednesday', es: 'Miércoles' },
    { en: 'Thursday', es: 'Jueves' },
    { en: 'Friday', es: 'Viernes' },
    { en: 'Saturday', es: 'Sábado' },
    { en: 'Sunday', es: 'Domingo' },
  ].map((day) => ({ day, open, close }))

export const SITE_URL = 'https://elchocolatepizza.com'

export const site = {
  name: 'Pizzeria El Chocolate',
  locations: [
    {
      id: 'north-fort-myers',
      name: 'North Fort Myers',
      street: '899 Pondella Rd',
      city: 'North Fort Myers',
      state: 'FL',
      zip: '33903',
      phone: '(239) 946-9006',
      mapsQuery: '899 Pondella Rd, North Fort Myers, FL 33903',
      hours: daily('11:00', '21:00'), // VERIFY: listings disagree, esp. Saturday
    },
    // Sister location? Cafeteria El Chocolate — 1419 SE 47th Terrace, Cape Coral, FL 33904.
    // Add it here if it belongs to the same family; every page picks it up.
  ] as Location[],

  order: [
    { id: 'slice', label: 'Slice', url: 'https://slicelife.com/restaurants/fl/north-fort-myers/33903/pizzeria-el-chocolate/menu', primary: true },
    { id: 'doordash', label: 'DoorDash', url: 'https://www.doordash.com/store/pizzer%C3%ADa-el-chocolate-north-fort-myers-27728032/' },
  ],

  instagram: { url: 'https://www.instagram.com/pizzeriaelchocolate/', handle: '@pizzeriaelchocolate' },

  rating: { score: 4.6, count: 175, source: 'Birdeye' },

  // PHOTOS — drop files into public/images/ with these names. Missing files
  // fall back to the illustrated design automatically (no code change).
  photos: {
    logo: '/images/logo.png',
    story: '/images/story.jpg',
    cocodrilo: '/images/cocodrilo.jpg',
    chocolate: '/images/chocolate.jpg',
    storefront: '/images/storefront.jpg',
    gallery: [
      { src: '/images/ig-1.jpg', alt: { en: 'Cuban cheese pizza', es: 'Pizza cubana de queso' } },
      { src: '/images/ig-2.jpg', alt: { en: 'Lobster pizza', es: 'Pizza de langosta' } },
      { src: '/images/ig-3.jpg', alt: { en: 'Croquetas', es: 'Croquetas' } },
      { src: '/images/ig-4.jpg', alt: { en: 'Mamey shake', es: 'Batido de mamey' } },
      { src: '/images/ig-5.jpg', alt: { en: 'Chocolate pizza', es: 'Pizza de chocolate' } },
      { src: '/images/ig-6.jpg', alt: { en: 'Alligator pizza', es: 'Pizza de cocodrilo' } },
    ],
  },
}

export const primaryLocation = site.locations[0]
export const primaryOrder = site.order.find((o) => o.primary) ?? site.order[0]
export const telHref = (phone: string) => `tel:+1${phone.replace(/\D/g, '')}`
export const mapsDirections = (l: Location) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(l.mapsQuery)}`
export const mapsEmbed = (l: Location) =>
  `https://maps.google.com/maps?q=${encodeURIComponent(l.mapsQuery)}&z=15&output=embed`
