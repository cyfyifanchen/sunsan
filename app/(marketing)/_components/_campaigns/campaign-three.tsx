'use client'

import localFont from 'next/font/local'
import { Loader2, Medal } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { unsplash } from '@/lib/unsplash'
import { useEffect, useState } from 'react'
import { defaultImages } from '@/constants/images'

const headingFont = localFont({
  src: '../../../../public/fonts/font.woff2',
})

const CampaignThreePage = () => {
  const [images, setImages] = useState(defaultImages)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await unsplash.photos.getRandom({
          collectionIds: ['317099'],
          count: 1,
        })
        if (res) console.log(res)
      } catch (error) {
        console.log(`Failed to get Unsplash images ${error}`)
      } finally {
        setIsLoading(false)
      }
    }
    fetchImage()
  }, [])

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <Loader2 className="h-6 w-6 text-sky-700 animate-spin" />
      </div>
    )
  }

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
        <div className="drop-shadow-lg">
          {/* <Image
            alt="hero"
            width={800}
            height={100}
            src={images.id}
          /> */}
        </div>
      </div>
    </div>
  )
}

export default CampaignThreePage
