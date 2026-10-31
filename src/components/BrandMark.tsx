import { site } from '@/data/site'
import { useImage } from '@/lib/useImage'

// Real logo once public/images/logo.png exists; illustrated pizza mark until then.
export default function BrandMark({ size = 40 }: { size?: number }) {
  const logo = useImage(site.photos.logo)
  if (logo) return <img src={logo} alt="" width={size} height={size} className="flex-none rounded-full object-cover" />
  return (
    <span
      aria-hidden="true"
      className="flex-none rounded-full"
      style={{
        width: size,
        height: size,
        background:
          'radial-gradient(circle at 34% 36%, #e2412b 0 13%, transparent 14%), radial-gradient(circle at 64% 44%, #e2412b 0 13%, transparent 14%), radial-gradient(circle at 46% 68%, #e2412b 0 13%, transparent 14%), radial-gradient(circle, #f2b33d 0 36%, #c5741f 37% 47%, #fff4e2 49%)',
      }}
    />
  )
}
