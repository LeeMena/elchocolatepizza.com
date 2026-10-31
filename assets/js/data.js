/* =========================================================================
   PIZZERIA EL CHOCOLATE — SITE CONTENT
   Edit this file to update menu, prices, hours, links and photos.
   Everything on the page is rendered from here.

   Sources compiled (Oct 2026): pizzeriaelchocolate.com (via search index),
   Slice, DoorDash, Yelp/Birdeye listings. Items marked `verify: true`
   had conflicting or missing info — confirm before launch.
   ========================================================================= */

window.SITE = {
  name: "Pizzeria El Chocolate",
  tagline: { es: "La auténtica pizza cubana", en: "Authentic Cuban pizza" },

  // Primary location
  locations: [
    {
      id: "nfm",
      name: { es: "North Fort Myers", en: "North Fort Myers" },
      street: "899 Pondella Rd",
      city: "North Fort Myers",
      state: "FL",
      zip: "33903",
      phone: "(239) 946-9006",      // from official site; some directories list (239) 471-0463
      lat: 26.6676, lng: -81.8790,  // approx — verify
      hours: [                       // official site: 11–9; structured data suggested later close Sat — verify
        { d: { es: "Lunes", en: "Monday" },    h: "11:00 AM – 9:00 PM" },
        { d: { es: "Martes", en: "Tuesday" },   h: "11:00 AM – 9:00 PM" },
        { d: { es: "Miércoles", en: "Wednesday" }, h: "11:00 AM – 9:00 PM" },
        { d: { es: "Jueves", en: "Thursday" },  h: "11:00 AM – 9:00 PM" },
        { d: { es: "Viernes", en: "Friday" },   h: "11:00 AM – 9:00 PM" },
        { d: { es: "Sábado", en: "Saturday" },  h: "11:00 AM – 9:00 PM" },
        { d: { es: "Domingo", en: "Sunday" },   h: "11:00 AM – 9:00 PM" }
      ]
    }
    // Sister location? "Cafeteria El Chocolate" — 1419 SE 47th Terrace, Cape Coral, FL 33904.
    // Uncomment if it's part of the same family:
    // ,{ id:"cc", name:{es:"Cape Coral",en:"Cape Coral"}, street:"1419 SE 47th Terrace",
    //    city:"Cape Coral", state:"FL", zip:"33904", phone:"(239) 214-5908", hours:[...] }
  ],

  order: [
    { label: "Slice",    url: "https://slicelife.com/restaurants/fl/north-fort-myers/33903/pizzeria-el-chocolate/menu", primary: true },
    { label: "DoorDash", url: "https://www.doordash.com/store/pizzer%C3%ADa-el-chocolate-north-fort-myers-27728032/" }
  ],

  social: {
    instagram: "https://www.instagram.com/pizzeriaelchocolate/",
    handle: "@pizzeriaelchocolate"
  },

  rating: { score: 4.6, count: 175, source: "Birdeye" },

  /* Drop real photos in assets/img/ and set `img` on any item or gallery tile.
     Leave blank to show the illustrated fallback. */
  gallery: [
    { img: "", alt: "Pizza Cubana de queso" },
    { img: "", alt: "Pizza de langosta" },
    { img: "", alt: "Croquetas" },
    { img: "", alt: "Batido de mamey" },
    { img: "", alt: "Pizza de chocolate" },
    { img: "", alt: "Pizza de cocodrilo" }
  ],

  menu: [
    {
      id: "pizza",
      title: { es: "Pizza Cubana", en: "Cuban Pizza" },
      blurb: {
        es: "Masa gruesa y dulce, salsa criolla y mucho queso dorado hasta el borde.",
        en: "Thick, slightly sweet dough, Cuban-style sauce and cheese baked golden right to the edge."
      },
      items: [
        { es: "Queso", en: "Cheese", price: 10.99, tag: "fav" },
        { es: "Cebolla", en: "Onion", price: 11.99 },
        { es: "Ají", en: "Pepper", price: 11.99 },
        { es: "Hongos", en: "Mushroom", price: 11.99 },
        { es: "Jamón", en: "Ham", price: 11.99, tag: "fav" },
        { es: "Pepperoni", en: "Pepperoni", price: 12.99 },
        { es: "Chorizo", en: "Chorizo", price: 12.99, tag: "fav" },
        { es: "Bacon", en: "Bacon", price: 12.99 },
        { es: "Atún", en: "Tuna", price: 12.99 },
        { es: "Hawaiana", en: "Hawaiian", price: 12.99 }
      ]
    },
    {
      id: "especiales",
      title: { es: "Especialidades", en: "Specialty Pies" },
      blurb: {
        es: "Del mar y de la Florida. Para los que vienen con hambre de verdad.",
        en: "From the sea and the swamp. For when you came hungry."
      },
      items: [
        { es: "Mixta", en: "Mixed", price: 15.99 },
        { es: "Camarones", en: "Shrimp", price: 17.99 },
        { es: "Langostino", en: "Prawn", price: 21.99 },
        { es: "Langosta", en: "Lobster", price: 22.99, tag: "star" },
        { es: "Cocodrilo", en: "Alligator", price: 26.99, tag: "star",
          note: { es: "La leyenda de la casa", en: "The house legend" } }
      ]
    },
    {
      id: "aperitivos",
      title: { es: "Aperitivos", en: "Starters" },
      blurb: { es: "Para picar mientras sale la pizza.", en: "Something to pick at while the pie bakes." },
      items: [
        { es: "Pan de Ajo", en: "Garlic Bread", price: 3.99 },
        { es: "Croquetas caseras", en: "Homemade Croquetas", price: 1.75, unit: { es: "c/u", en: "each" },
          note: { es: "Jamón, pollo, bacalao, queso y más — pregunte por los sabores del día",
                  en: "Ham, chicken, salt cod, cheese & more — ask for today's flavors" } }
      ]
    },
    {
      id: "spaghetti",
      title: { es: "Spaghetti", en: "Spaghetti" },
      blurb: { es: "Al estilo cubano, como en casa.", en: "Cuban-style, the way abuela makes it." },
      items: [
        { es: "Napolitano", en: "Napolitano", price: 8.99 },
        { es: "Jamón", en: "Ham", price: 9.99 },
        { es: "Chorizo", en: "Chorizo", price: null, verify: true },
        { es: "Langosta", en: "Lobster", price: null, verify: true }
      ]
    },
    {
      id: "batidos",
      title: { es: "Batidos", en: "Shakes" },
      blurb: { es: "Frutas tropicales, batidas en el momento.", en: "Tropical fruit, blended to order." },
      items: [
        { es: "Chocolate", en: "Chocolate", price: 4.99 },
        { es: "Mamey", en: "Mamey", price: 4.99, tag: "fav" },
        { es: "Guanábana", en: "Soursop", price: 6.99, verify: true }
      ]
    },
    {
      id: "postres",
      title: { es: "Postres", en: "Dessert" },
      blurb: { es: "Por algo nos llamamos El Chocolate.", en: "There's a reason we're called El Chocolate." },
      items: [
        { es: "Pizza de Chocolate", en: "Chocolate Pizza", price: 9.99, tag: "star",
          note: { es: "Crema de chocolate y azúcar en polvo", en: "Chocolate spread & powdered sugar" } },
        { es: "Creama de Queso", en: "Cheese Creama", price: null, verify: true }
      ]
    }
  ]
};
