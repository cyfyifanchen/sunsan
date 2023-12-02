import { Separator } from '@/components/ui/separator'
import { Info } from './_components/info'
import { Suspense } from 'react'
import { isSubscribed } from '@/lib/subscription'
import { BoardList } from './_components/board-list'

const OrganizationIdPage = async () => {
  const isPro = await isSubscribed()

  return (
    <div className="w-full mb-20">
      <Info isPro={isPro} />
      <Separator className="my-4" />
      <div className="px-2 md:px-4">
        <Suspense fallback={<BoardList.Skeleton />}>
          <BoardList />
        </Suspense>
      </div>
    </div>
  )
}

export default OrganizationIdPage
