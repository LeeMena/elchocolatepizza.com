/* Pizzeria El Chocolate — renders content from data.js, handles ES/EN + open/closed status */
(function () {
  "use strict";
  const S = window.SITE;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------- Strings ---------- */
  const T = {
    es: {
      "nav.menu": "Menú", "nav.story": "Nuestra pizza", "nav.visit": "Visítanos",
      "cta.order": "Ordenar", "cta.orderOnline": "Ordenar en línea", "cta.seeMenu": "Ver el menú",
      "cta.orderPickup": "Ordenar para recoger", "cta.call": "Llamar", "cta.dir": "Cómo llegar",
      "hero.eyebrow": "North Fort Myers, Florida", "hero.t1": "Pizza", "hero.t2": "cubana", "hero.t3": "de verdad.",
      "hero.lede": "Masa gruesa y dulce, salsa criolla y queso dorado de borde a borde. Como la de La Habana — pero en Pondella Road.",
      "hero.reviews": "reseñas", "hero.daily": "todos los días", "hero.from": "pizza desde",
      "sticker.a": "Desde queso<br>hasta cocodrilo",
      "story.kicker": "¿Qué es la pizza cubana?",
      "story.title": "No es italiana. No es de Nueva York. <em>Es de Cuba.</em>",
      "story.p1t": "La masa", "story.p1": "Gruesa, suave y un poquito dulce. Se hornea en molde, así que queda esponjosa por dentro y crujiente por abajo.",
      "story.p2t": "La salsa", "story.p2": "Salsa criolla con sofrito — más sabrosa que una salsa de tomate simple. Es el corazón de la pizza.",
      "story.p3t": "El queso", "story.p3": "Mucho. Hasta el borde. Se dora y se tuesta en las orillas — esa es la parte que todos se pelean.",
      "menu.kicker": "El menú", "menu.title": "Lo que sale del horno",
      "menu.fine": "Precios sujetos a cambio. Los precios en apps de entrega pueden variar. Avísenos de cualquier alergia.",
      "menu.items": "platos", "menu.ask": "Preguntar", "badge.fav": "Favorito", "badge.star": "Especial",
      "feat.k1": "Solo en Florida", "feat.t1": "Pizza de Cocodrilo",
      "feat.d1": "Sí, de verdad. Nuestra especialidad más famosa — pídela una vez y la cuentas para siempre.",
      "feat.k2": "El nombre lo dice", "feat.t2": "Pizza de Chocolate",
      "feat.d2": "Masa cubana, crema de chocolate y azúcar en polvo. Postre para compartir… o no.",
      "ig.kicker": "Síguenos", "ig.cta": "Ver en Instagram",
      "visit.kicker": "Visítanos", "visit.open": "Abierto ahora", "visit.closed": "Cerrado ahora",
      "visit.closes": "cierra a las", "visit.opens": "abre a las",
      "rev.count": "reseñas",
      "rev.line": "“La mejor pizza cubana del pueblo” — eso es lo que más repiten nuestros clientes. Ven y compruébalo.",
      "foot.tag": "La auténtica pizza cubana en el suroeste de la Florida.",
      "foot.order": "Ordenar", "foot.find": "Encuéntranos", "foot.top": "Volver arriba ↑"
    },
    en: {
      "nav.menu": "Menu", "nav.story": "Our pizza", "nav.visit": "Visit",
      "cta.order": "Order", "cta.orderOnline": "Order online", "cta.seeMenu": "See the menu",
      "cta.orderPickup": "Order for pickup", "cta.call": "Call", "cta.dir": "Directions",
      "hero.eyebrow": "North Fort Myers, Florida", "hero.t1": "Real", "hero.t2": "Cuban", "hero.t3": "pizza.",
      "hero.lede": "Thick, slightly sweet dough, Cuban-style sauce and golden cheese edge to edge. Just like Havana — but on Pondella Road.",
      "hero.reviews": "reviews", "hero.daily": "every day", "hero.from": "pizza from",
      "sticker.a": "From cheese<br>to alligator",
      "story.kicker": "What is Cuban pizza?",
      "story.title": "Not Italian. Not New York. <em>It's Cuban.</em>",
      "story.p1t": "The dough", "story.p1": "Thick, soft and a little sweet. Baked in a pan so it's fluffy inside and crisp on the bottom.",
      "story.p2t": "The sauce", "story.p2": "Cuban-style sauce built on sofrito — richer than a plain tomato sauce. It's the heart of the pie.",
      "story.p3t": "The cheese", "story.p3": "A lot. All the way to the edge, where it browns and crisps — the part everyone fights over.",
      "menu.kicker": "The menu", "menu.title": "Fresh out of the oven",
      "menu.fine": "Prices subject to change. Delivery-app prices may differ. Please tell us about any allergies.",
      "menu.items": "items", "menu.ask": "Ask us", "badge.fav": "Favorite", "badge.star": "Signature",
      "feat.k1": "Only in Florida", "feat.t1": "Alligator Pizza",
      "feat.d1": "Yes, really. Our most famous specialty — order it once and you'll be telling the story forever.",
      "feat.k2": "It's in the name", "feat.t2": "Chocolate Pizza",
      "feat.d2": "Cuban dough, chocolate spread and powdered sugar. Dessert for sharing… or not.",
      "ig.kicker": "Follow along", "ig.cta": "View on Instagram",
      "visit.kicker": "Come by", "visit.open": "Open now", "visit.closed": "Closed now",
      "visit.closes": "closes at", "visit.opens": "opens at",
      "rev.count": "reviews",
      "rev.line": "“Best Cuban pizza in town” — that's what our customers say most. Come see for yourself.",
      "foot.tag": "Authentic Cuban pizza in Southwest Florida.",
      "foot.order": "Order", "foot.find": "Find us", "foot.top": "Back to top ↑"
    }
  };

  let lang = "es";
  try { lang = localStorage.getItem("pec-lang") || ((navigator.language || "es").toLowerCase().startsWith("es") ? "es" : "en"); } catch (e) {}
  const t = (k) => (T[lang] && T[lang][k]) || T.es[k] || k;
  const L = (o) => (o && typeof o === "object" ? o[lang] || o.es : o);

  /* ---------- Links ---------- */
  const loc = S.locations[0];
  const primary = S.order.find((o) => o.primary) || S.order[0];
  const telHref = (p) => "tel:+1" + p.replace(/\D/g, "");
  const mapsHref = (l) => "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(`${l.street}, ${l.city}, ${l.state} ${l.zip}`);

  function wireLinks() {
    $$("[data-order-primary]").forEach((a) => (a.href = primary.url));
    $$("[data-ig-link]").forEach((a) => (a.href = S.social.instagram));
    $$("[data-ig-handle]").forEach((el) => (el.textContent = S.social.handle));
    $$("[data-call], [data-foot-phone]").forEach((a) => (a.href = telHref(loc.phone)));
    $$("[data-foot-phone]").forEach((a) => (a.textContent = loc.phone));
    $$("[data-directions]").forEach((a) => (a.href = mapsHref(loc)));
    $$("[data-rating-score]").forEach((el) => (el.textContent = S.rating.score));
    $$("[data-rating-count]").forEach((el) => (el.textContent = S.rating.count));
    $$("[data-rating-source]").forEach((el) => (el.textContent = S.rating.source));
    $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
    $("[data-order-list]").innerHTML = S.order
      .map((o) => `<li><a href="${esc(o.url)}" target="_blank" rel="noopener">${esc(o.label)}</a></li>`)
      .join("") + `<li><a href="${telHref(loc.phone)}">${esc(loc.phone)}</a></li>`;
  }

  /* ---------- Menu ---------- */
  let activeTab = S.menu[0].id;
  function renderMenu() {
    const tabs = $("[data-menu-tabs]");
    const panels = $("[data-menu-panels]");
    tabs.innerHTML = S.menu.map((c) =>
      `<button class="tab" role="tab" id="tab-${c.id}" aria-controls="panel-${c.id}" aria-selected="${c.id === activeTab}" tabindex="${c.id === activeTab ? 0 : -1}" data-tab="${c.id}">${esc(L(c.title))}</button>`
    ).join("");

    panels.innerHTML = S.menu.map((c) => {
      const items = c.items.map((it) => {
        const name = it[lang] || it.es;
        const alt = lang === "es" ? it.en : it.es;
        const badge = it.tag ? `<span class="badge ${it.tag === "star" ? "badge--star" : ""}">${t("badge." + it.tag)}</span>` : "";
        const price = it.price != null
          ? `<span class="item__price">$${it.price.toFixed(2)}${it.unit ? `<small>${esc(L(it.unit))}</small>` : ""}</span>`
          : `<span class="item__price item__price--ask">${t("menu.ask")}</span>`;
        return `<li class="item">
          <span class="item__name">${esc(name)} ${badge}</span>
          ${price}
          ${alt && alt !== name ? `<span class="item__alt">${esc(alt)}</span>` : ""}
          ${it.note ? `<span class="item__note">${esc(L(it.note))}</span>` : ""}
        </li>`;
      }).join("");
      return `<div class="panel" role="tabpanel" id="panel-${c.id}" aria-labelledby="tab-${c.id}" ${c.id === activeTab ? "" : "hidden"}>
        <div class="panel__intro">
          <h3>${esc(L(c.title))}</h3>
          <p>${esc(L(c.blurb))}</p>
          <span class="count">${c.items.length} ${t("menu.items")}</span>
        </div>
        <ul class="items">${items}</ul>
      </div>`;
    }).join("");
  }
  function selectTab(id, focus) {
    activeTab = id;
    $$(".tab").forEach((b) => {
      const on = b.dataset.tab === id;
      b.setAttribute("aria-selected", on);
      b.tabIndex = on ? 0 : -1;
      if (on && focus) b.focus();
      if (on) {
        const bar = b.parentElement;
        const x = b.offsetLeft - bar.offsetLeft - 16;
        if (x < bar.scrollLeft || x + b.offsetWidth > bar.scrollLeft + bar.clientWidth) bar.scrollTo({ left: x, behavior: "smooth" });
      }
    });
    $$(".panel").forEach((p) => (p.hidden = p.id !== "panel-" + id));
  }
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-tab]");
    if (b) selectTab(b.dataset.tab);
  });
  document.addEventListener("keydown", (e) => {
    if (!e.target.matches(".tab") || !["ArrowLeft", "ArrowRight"].includes(e.key)) return;
    const ids = S.menu.map((c) => c.id);
    const i = ids.indexOf(activeTab) + (e.key === "ArrowRight" ? 1 : -1);
    selectTab(ids[(i + ids.length) % ids.length], true);
  });

  /* ---------- Gallery ---------- */
  function renderGallery() {
    $("[data-gallery]").innerHTML = S.gallery.map((g) =>
      g.img
        ? `<a class="tile" href="${esc(S.social.instagram)}" target="_blank" rel="noopener"><img src="${esc(g.img)}" alt="${esc(g.alt)}" loading="lazy"></a>`
        : `<a class="tile tile--ph" href="${esc(S.social.instagram)}" target="_blank" rel="noopener" aria-label="${esc(g.alt)}">${esc(g.alt)}</a>`
    ).join("");
  }

  /* ---------- Hours / open status (America/New_York) ---------- */
  function toMin(s) {
    const m = s.trim().match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
    if (!m) return null;
    let h = +m[1] % 12; if (m[3].toUpperCase() === "PM") h += 12;
    return h * 60 + +m[2];
  }
  function nowFL() {
    const parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/New_York", weekday: "short", hour: "numeric", minute: "numeric", hour12: false }).formatToParts(new Date());
    const get = (k) => parts.find((p) => p.type === k).value;
    const wd = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].indexOf(get("weekday"));
    return { day: wd, min: (+get("hour") % 24) * 60 + +get("minute") };
  }
  function status(l) {
    const n = nowFL();
    const today = l.hours[n.day];
    const [o, c] = today.h.split(/[–-]/).map(toMin);
    if (o == null || c == null) return { open: false, text: "" };
    if (n.min >= o && n.min < c) return { open: true, text: `${t("visit.open")} · ${t("visit.closes")} ${today.h.split(/[–-]/)[1].trim()}` };
    const next = n.min < o ? today : l.hours[(n.day + 1) % 7];
    return { open: false, text: `${t("visit.closed")} · ${t("visit.opens")} ${next.h.split(/[–-]/)[0].trim()}` };
  }

  function renderLocations() {
    const n = nowFL();
    $("[data-locations]").innerHTML = S.locations.map((l) => {
      const st = status(l);
      return `<div class="loc">
        <p class="kicker">${t("visit.kicker")}</p>
        <h2>${esc(L(l.name))}</h2>
        <p class="loc__addr">${esc(l.street)}<br>${esc(l.city)}, ${esc(l.state)} ${esc(l.zip)}</p>
        <p class="loc__status"><span class="dot ${st.open ? "" : "is-closed"}"></span>${esc(st.text)}</p>
        <div class="loc__btns">
          <a class="btn btn--hot" href="${telHref(l.phone)}">☎ ${esc(l.phone)}</a>
          <a class="btn btn--ghost" href="${mapsHref(l)}" target="_blank" rel="noopener">${t("cta.dir")} →</a>
        </div>
        <table class="hours"><tbody>
          ${l.hours.map((h, i) => `<tr class="${i === n.day ? "is-today" : ""}"><td>${esc(L(h.d))}</td><td>${esc(h.h)}</td></tr>`).join("")}
        </tbody></table>
      </div>`;
    }).join("");
    const st = status(loc);
    const dot = $(".hero .dot");
    if (dot) dot.classList.toggle("is-closed", !st.open);
  }

  /* ---------- i18n ---------- */
  function applyLang() {
    document.documentElement.lang = lang;
    $$("[data-i18n]").forEach((el) => {
      const v = t(el.dataset.i18n);
      if (v.includes("<")) el.innerHTML = v; else el.textContent = v;
    });
    document.title = lang === "es"
      ? "Pizzeria El Chocolate | Pizza Cubana en North Fort Myers, FL"
      : "Pizzeria El Chocolate | Cuban Pizza in North Fort Myers, FL";
    renderMenu();
    selectTab(activeTab);
    renderLocations();
  }
  $("[data-lang-toggle]").addEventListener("click", () => {
    lang = lang === "es" ? "en" : "es";
    try { localStorage.setItem("pec-lang", lang); } catch (e) {}
    applyLang();
  });

  wireLinks();
  renderGallery();
  applyLang();
})();
