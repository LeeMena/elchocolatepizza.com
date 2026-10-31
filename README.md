# elchocolatepizza.com

Website for **Pizzeria El Chocolate**, an authentic Cuban pizzeria at 899 Pondella Rd, North Fort Myers, FL. The site is bilingual: **English is primary**, with a Spanish (ES) toggle.

It uses the same architecture as `LeeMena/leandermena-main`: the same stack, i18n pattern, SEO component, edge meta rewriting and CI, re-skinned for a Cuban pizzeria.

[![CI](https://github.com/LeeMena/elchocolatepizza.com/actions/workflows/ci.yml/badge.svg)](https://github.com/LeeMena/elchocolatepizza.com/actions/workflows/ci.yml)

## Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build | Vite 5 (route-level code splitting) |
| Styling | Tailwind CSS 3 + CSS design tokens (dark "chocolate" / light "cream" themes) |
| Routing | React Router 6 |
| Motion | Framer Motion (respects `prefers-reduced-motion`) |
| Search | cmdk command palette (⌘K / Ctrl+K) |
| Hosting | Cloudflare Pages + Pages Functions (edge SEO) |
| Analytics | Plausible (privacy-first, no cookies) |

## Features

- **EN / ES toggle.** All UI copy is in `src/i18n/copy.ts`, and menu items are bilingual in `src/data/menu.ts`. Page titles and descriptions switch language too.
- **Live pizza renderer** (`src/lib/pie.ts`). Each menu pizza is drawn procedurally with its real toppings: queso, jamón, chorizo, langosta, cocodrilo and the rest.
  - **Hero.** Cycles through the signature pies, with toppings dropping in and a 3D tilt that follows the cursor.
  - **Pizza Lab** on `/menu`. Tap any pizza to see it built. On phones, it expands inline.
- **Live open/closed status**, computed in Florida time. It appears in the nav, hero, footer and hours tables.
- **Menu tools.** Instant menu search (accent-insensitive: "guanabana" finds Guanábana), scroll-spy category chips, and a print-ready menu.
- **⌘K command palette.** Search every pizza and page, plus actions: order, call, directions, language and theme.
- **Phone-first layout.** A thumb-zone action bar (Call · Directions · Order), a full-screen mobile drawer, and a dismissible announcement bar.
- **Schema.org.** `Restaurant` + `WebSite` sitewide, a full `Menu` with prices on `/menu`, and `FAQPage` on `/visit`.
- **Edge SEO** (`functions/_middleware.js`):
  - Per-route title, description, canonical and Open Graph tags, plus real page content for non-JS crawlers and link previews.
  - www → apex redirect, legacy URL 301s and real 404s.
- **Photo slots.** Drop files into `public/images/` with the names in `src/data/site.ts` (`logo.png`, `story.jpg`, `cocodrilo.jpg`, `chocolate.jpg`, `storefront.jpg`, `ig-1.jpg` … `ig-6.jpg`). Each one swaps in automatically; until then the illustrated design shows.

## Pages

| Route | What |
|---|---|
| `/` | Hero + live pie, highlights grid, fan favorites, ways to order, Instagram, visit, reviews |
| `/menu` | Full menu + Pizza Lab, search, print |
| `/our-pizza` | What makes Cuban pizza different; specialty pie explorer |
| `/order` | Slice, DoorDash, call |
| `/visit` | Address, live hours, map, FAQ |
| `/privacy` | Privacy notice |

## Develop

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # prebuild regenerates functions/route-meta.json -> dist/
npm run lint && npm run type-check
```

## Editing content

| What | Where |
|---|---|
| Phone, address, hours, order links, rating, photos | `src/data/site.ts` |
| Menu items and prices | `src/data/menu.ts` (`price: null` shows "Ask us") |
| Any wording (EN + ES) | `src/i18n/copy.ts` |
| Page title and description for search and link previews | the `<SEO …/>` props at the top of each `src/pages/*.tsx` |

After changing `<SEO/>` props, run `npm run build` and commit the regenerated `functions/route-meta.json`. CI checks that it's fresh.

## Deploy (Cloudflare Pages)

1. In the Cloudflare dashboard, go to **Workers & Pages → Create → Pages → Connect to Git** and select `LeeMena/elchocolatepizza.com`.
2. Use these build settings:
   - **Framework preset:** Vite (or None)
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Environment variable:** `NODE_VERSION = 22`
3. Under **Custom domains**, add `elchocolatepizza.com` and `www.elchocolatepizza.com`. The middleware 301s www → apex.

Every push to `main` deploys. The optional cache purge in `.github/workflows/deploy.yml` runs if `CF_ZONE_ID` and `CF_CACHE_TOKEN` are set as repo secrets.

## To confirm before launch

- [ ] Phone: the restaurant's site says (239) 946-9006, but some directories list (239) 471-0463.
- [ ] Hours: 11 AM – 9 PM daily per the restaurant's site. Other listings differ, especially Saturday.
- [ ] Missing prices: spaghetti chorizo and lobster, and the cheese creama.
- [ ] Croqueta flavors.
- [ ] Sister location? Cafeteria El Chocolate, 1419 SE 47th Terrace, Cape Coral. If it's yours, add it to `site.locations`.
- [ ] Photos: logo, food shots and Instagram picks (see Photo slots above).
- [ ] Plausible: create the `elchocolatepizza.com` site at plausible.io, or remove the script from `index.html`.

Content sources (Oct 2026): pizzeriaelchocolate.com via search-index copies, plus public listings on Slice, DoorDash, Yelp and Birdeye.
