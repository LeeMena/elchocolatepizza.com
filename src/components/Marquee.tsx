const WORDS = ['Pizza Cubana', 'Croquetas', 'Batido de Mamey', 'Langosta', 'Cocodrilo', 'Pizza de Chocolate', 'Pan de Ajo', 'Guanábana']

export default function Marquee() {
  const row = WORDS.flatMap((w) => [w, '✦'])
  return (
    <div aria-hidden="true" className="overflow-hidden border-y-[3px] border-choc-950 bg-tomato text-white">
      <div className="inline-flex animate-marquee gap-7 whitespace-nowrap py-3.5 font-display text-[1.35rem] font-extrabold italic">
        {[...row, ...row].map((w, i) => <span key={i} className={w === '✦' ? 'not-italic text-mango' : ''}>{w}</span>)}
      </div>
    </div>
  )
}
