// =========================================================================
// MENU — every item, bilingual. `pie` selects the illustrated pizza style.
// price: null renders as "Ask us" (price not published anywhere yet).
// =========================================================================
import type { Bi } from './site'

export type PieKey =
  | 'queso' | 'cebolla' | 'aji' | 'hongos' | 'jamon' | 'pepperoni' | 'chorizo' | 'bacon' | 'atun'
  | 'hawaiana' | 'mixta' | 'camarones' | 'langostino' | 'langosta' | 'cocodrilo' | 'chocolate'

export interface MenuItem {
  id: string
  name: Bi
  price: number | null
  unit?: Bi
  note?: Bi
  tag?: 'fav' | 'star'
  pie?: PieKey
}

export interface MenuCategory {
  id: string
  title: Bi
  blurb: Bi
  items: MenuItem[]
}

export const menu: MenuCategory[] = [
  {
    id: 'cuban-pizza',
    title: { en: 'Cuban Pizza', es: 'Pizza Cubana' },
    blurb: {
      en: 'Thick, slightly sweet dough, Cuban-style sauce and cheese baked golden right to the edge.',
      es: 'Masa gruesa y dulce, salsa criolla y queso dorado hasta el borde.',
    },
    items: [
      { id: 'queso', name: { en: 'Cheese', es: 'Queso' }, price: 10.99, tag: 'fav', pie: 'queso' },
      { id: 'cebolla', name: { en: 'Onion', es: 'Cebolla' }, price: 11.99, pie: 'cebolla' },
      { id: 'aji', name: { en: 'Pepper', es: 'Ají' }, price: 11.99, pie: 'aji' },
      { id: 'hongos', name: { en: 'Mushroom', es: 'Hongos' }, price: 11.99, pie: 'hongos' },
      { id: 'jamon', name: { en: 'Ham', es: 'Jamón' }, price: 11.99, tag: 'fav', pie: 'jamon' },
      { id: 'pepperoni', name: { en: 'Pepperoni', es: 'Pepperoni' }, price: 12.99, pie: 'pepperoni' },
      { id: 'chorizo', name: { en: 'Chorizo', es: 'Chorizo' }, price: 12.99, tag: 'fav', pie: 'chorizo' },
      { id: 'bacon', name: { en: 'Bacon', es: 'Bacon' }, price: 12.99, pie: 'bacon' },
      { id: 'atun', name: { en: 'Tuna', es: 'Atún' }, price: 12.99, pie: 'atun' },
      { id: 'hawaiana', name: { en: 'Hawaiian', es: 'Hawaiana' }, price: 12.99, pie: 'hawaiana' },
    ],
  },
  {
    id: 'specialty',
    title: { en: 'Specialty Pies', es: 'Especialidades' },
    blurb: { en: 'From the sea and the swamp. For when you came hungry.', es: 'Del mar y de la Florida. Para los que vienen con hambre.' },
    items: [
      { id: 'mixta', name: { en: 'Mixed', es: 'Mixta' }, price: 15.99, pie: 'mixta', note: { en: 'Ham, chorizo, pepper & onion', es: 'Jamón, chorizo, ají y cebolla' } },
      { id: 'camarones', name: { en: 'Shrimp', es: 'Camarones' }, price: 17.99, pie: 'camarones' },
      { id: 'langostino', name: { en: 'Prawn', es: 'Langostino' }, price: 21.99, pie: 'langostino' },
      { id: 'langosta', name: { en: 'Lobster', es: 'Langosta' }, price: 22.99, tag: 'star', pie: 'langosta' },
      { id: 'cocodrilo', name: { en: 'Alligator', es: 'Cocodrilo' }, price: 26.99, tag: 'star', pie: 'cocodrilo', note: { en: 'The house legend', es: 'La leyenda de la casa' } },
    ],
  },
  {
    id: 'starters',
    title: { en: 'Starters', es: 'Aperitivos' },
    blurb: { en: 'Something to pick at while the pie bakes.', es: 'Para picar mientras sale la pizza.' },
    items: [
      { id: 'pan-de-ajo', name: { en: 'Garlic Bread', es: 'Pan de Ajo' }, price: 3.99 },
      {
        id: 'croquetas', name: { en: 'Homemade Croquetas', es: 'Croquetas Caseras' }, price: 1.75, tag: 'fav',
        unit: { en: 'each', es: 'c/u' },
        note: { en: "Ham, chicken, salt cod, cheese & more — ask for today's flavors", es: 'Jamón, pollo, bacalao, queso y más — pregunte por los sabores del día' },
      },
    ],
  },
  {
    id: 'spaghetti',
    title: { en: 'Spaghetti', es: 'Spaghetti' },
    blurb: { en: 'Cuban-style, the way abuela makes it.', es: 'Al estilo cubano, como lo hace la abuela.' },
    items: [
      { id: 'spaghetti-napolitano', name: { en: 'Napolitano', es: 'Napolitano' }, price: 8.99 },
      { id: 'spaghetti-jamon', name: { en: 'Ham', es: 'Jamón' }, price: 9.99 },
      { id: 'spaghetti-chorizo', name: { en: 'Chorizo', es: 'Chorizo' }, price: null },
      { id: 'spaghetti-langosta', name: { en: 'Lobster', es: 'Langosta' }, price: null },
    ],
  },
  {
    id: 'shakes',
    title: { en: 'Shakes', es: 'Batidos' },
    blurb: { en: 'Tropical fruit, blended to order.', es: 'Frutas tropicales, batidas al momento.' },
    items: [
      { id: 'batido-chocolate', name: { en: 'Chocolate', es: 'Chocolate' }, price: 4.99 },
      { id: 'batido-mamey', name: { en: 'Mamey', es: 'Mamey' }, price: 4.99, tag: 'fav' },
      { id: 'batido-guanabana', name: { en: 'Soursop (Guanábana)', es: 'Guanábana' }, price: 6.99 },
    ],
  },
  {
    id: 'dessert',
    title: { en: 'Dessert', es: 'Postres' },
    blurb: { en: "There's a reason we're called El Chocolate.", es: 'Por algo nos llamamos El Chocolate.' },
    items: [
      { id: 'pizza-chocolate', name: { en: 'Chocolate Pizza', es: 'Pizza de Chocolate' }, price: 9.99, tag: 'star', pie: 'chocolate', note: { en: 'Chocolate spread & powdered sugar', es: 'Crema de chocolate y azúcar en polvo' } },
      { id: 'creama-queso', name: { en: 'Cheese Creama', es: 'Creama de Queso' }, price: null },
    ],
  },
]

export const allItems = menu.flatMap((c) => c.items.map((i) => ({ ...i, category: c })))
export const findItem = (id: string) => allItems.find((i) => i.id === id)
export const fmtPrice = (p: number) => `$${p.toFixed(2)}`
