import localFont from 'next/font/local'
import { Medal } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'

const headingFont = localFont({
  src: '../../../public/fonts/font.woff2',
})

const CampaignOnePage = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <div
        className={cn(
          'flex items-center justify-center flex-col',
          headingFont.className
        )}
      >
        <div className="mb-4 flex items-center border shadow-sm px-4 py-2 bg-amber-100 text-amber-700 rounded-full">
          <Medal className="h-6 w-6 mr-2" />
          Voted the best task manager
        </div>
        <h1 className="text-4xl md:text-6xl text-center text-neutral-800 mb-6">
          Sunsan
        </h1>
        <div className="border drop-shadow-sm">
          <Image
            alt="hero"
            width={800}
            height={100}
            src="/sunsan.gif"
          />
        </div>
      </div>
    </div>
  )
}

export default CampaignOnePage
