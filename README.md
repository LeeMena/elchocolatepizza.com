# Pizzeria El Chocolate — Website

A fast, static, bilingual (ES/EN) site for a Cuban pizzeria. It has no build step and no framework, so it works on GitHub Pages, Netlify, Vercel or any other static host.

```
index.html            page structure + SEO (meta, Open Graph, schema.org Restaurant JSON-LD)
assets/css/styles.css design system (chocolate · Havana cream · tomato · mango · palm)
assets/js/data.js     ← ALL CONTENT LIVES HERE: menu, prices, hours, links, photos
assets/js/app.js      rendering, ES/EN toggle, live open/closed status (Florida time)
assets/img/           drop real photos here
_headers              Cloudflare Pages security/cache headers
docs/                 preview screenshots (not linked from the site)
```

To preview locally, open `index.html` or run `python3 -m http.server` in this folder.

## What's on the page
- **Hero.** Headline, order and menu buttons, rating, hours and starting price.
- **"¿Qué es la pizza cubana?"** Three cards on the dough, the sauce and the cheese.
- **Tabbed menu.** Pizza Cubana, Especialidades, Aperitivos, Spaghetti, Batidos, Postres. Each item shows its name in both languages, its price and any badges.
- **Feature cards.** Alligator Pizza and Chocolate Pizza.
- **Instagram grid.** Links to @pizzeriaelchocolate. Each tile shows an illustrated placeholder until you add a photo.
- **Visit section.** Live open/closed status, today's hours highlighted, tap-to-call, directions and an embedded map.
- **Reviews band** and footer.
- **Mobile bar.** Fixed Call / Directions / Order buttons on phones.

## Where the content came from (Oct 2026)
The session network blocked direct access to pizzeriaelchocolate.com and instagram.com. The content was compiled from search-index copies of the official site and from public listings (Slice, DoorDash, Yelp, Birdeye):

| Item | Value | Status |
|---|---|---|
| Address | 899 Pondella Rd, North Fort Myers, FL 33903 | confirmed by several sources |
| Phone | (239) 946-9006 (official site) | some directories list (239) 471-0463 |
| Hours | 11 AM – 9 PM daily (official site) | other listings differ; verify Sat |
| Rating | 4.6★ / 175 reviews (Birdeye) | |
| Ordering | Slice (primary), DoorDash | |
| Pizza Cubana | Queso 10.99 · Cebolla/Ají/Hongos/Jamón 11.99 · Pepperoni/Chorizo/Bacon/Atún/Hawaiana 12.99 | official site |
| Especialidades | Mixta 15.99 · Camarones 17.99 · Langostino 21.99 · Langosta 22.99 · Cocodrilo 26.99 | official site |
| Aperitivos | Pan de Ajo 3.99 · Croquetas 1.75 c/u | official site |
| Spaghetti | Napolitano 8.99 · Jamón 9.99 · Chorizo, Langosta (price unknown) | DoorDash |
| Batidos | Chocolate 4.99 · Mamey 4.99 · Guanábana 6.99 | DoorDash / Slice |
| Postres | Pizza de Chocolate 9.99 · Creama de Queso (price unknown) | DoorDash / official |

Items without a price show "Preguntar / Ask us". Set `price` in `data.js` to fill them in.

## To-do before launch
- [ ] Add real photos (Instagram exports) to `assets/img/` and set `img:` in the `gallery` array
- [ ] Add `assets/img/og.jpg` (1200×630) and an `og:image` meta tag so link previews show a photo
- [ ] Confirm phone, hours, croqueta flavors, and the missing prices
- [ ] Sister location? *Cafeteria El Chocolate*, 1419 SE 47th Terrace, Cape Coral, has a similar Cuban-pizza menu. If it's part of the same family, uncomment it in `data.js`
- [ ] Add a logo file if you have one (the current mark is CSS-drawn)

## Deploying on Cloudflare Pages
1. In the Cloudflare dashboard, go to **Workers & Pages → Create → Pages → Connect to Git**, then pick `LeeMena/elchocolatepizza.com`.
2. Use these build settings:
   - **Framework preset:** None
   - **Build command:** *(leave empty)*
   - **Build output directory:** `/`
   - **Production branch:** `main`
3. After the first deploy, open the project's **Custom domains** tab and add `elchocolatepizza.com` (and optionally `www.elchocolatepizza.com`). The zone is already on Cloudflare, so the DNS records are created automatically.

From then on, every push to `main` redeploys the site. `_headers` sets the security and cache headers, and `docs/` holds the preview screenshots, which are kept out of search results.
