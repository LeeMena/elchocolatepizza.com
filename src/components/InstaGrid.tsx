import { site } from '@/data/site'
import { useImage } from '@/lib/useImage'
import { useT } from '@/i18n/useT'
import { pick } from '@/i18n/copy'
import type { Bi } from '@/data/site'

const PH = ['bg-tomato text-white', 'bg-palm text-cream', 'bg-mango text-choc-800', 'bg-choc-500 text-cream', 'bg-choc-800 text-cream', 'bg-sky text-choc-800']

function Tile({ src, alt, i }: { src: string; alt: Bi; i: number }) {
  const { lang } = useT()
  const ok = useImage(src)
  const label = pick(alt, lang)
  return (
    <a
      href={site.instagram.url}
      target="_blank"
      rel="noopener"
      aria-label={ok ? undefined : label}
      className={`group relative block aspect-square overflow-hidden rounded-2xl no-underline ${ok ? 'bg-choc-800' : PH[i % PH.length]}`}
    >
      {ok ? (
        <img src={ok} alt={label} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
      ) : (
        <span className="absolute inset-0 grid place-items-center p-3 text-center font-display text-[0.95rem] font-bold italic leading-tight">
          <span className="absolute inset-2.5 rounded-xl border-[1.5px] border-dashed border-current opacity-30" />
          {label}
        </span>
      )}
    </a>
  )
}

export default function InstaGrid() {
  return (
    <div className="grid grid-cols-3 gap-2.5 md:grid-cols-6">
      {site.photos.gallery.map((g, i) => <Tile key={g.src} src={g.src} alt={g.alt} i={i} />)}
    </div>
  )
}
