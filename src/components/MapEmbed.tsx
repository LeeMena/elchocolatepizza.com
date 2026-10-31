import { primaryLocation, mapsEmbed } from '@/data/site'

export default function MapEmbed({ className = '' }: { className?: string }) {
  return (
    <div className={`overflow-hidden rounded-[28px] border border-border bg-surface ${className}`}>
      <iframe
        title="Map — Pizzeria El Chocolate"
        src={mapsEmbed(primaryLocation)}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-full min-h-[360px] w-full border-0 [filter:saturate(.85)_contrast(1.05)]"
      />
    </div>
  )
}
