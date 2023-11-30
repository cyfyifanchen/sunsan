import { Suspense } from 'react'

import { Separator } from '@/components/ui/separator'

import { ActivityList } from './_components/activity-list'
import { isSubscribed } from '@/lib/subscription'
import { Info } from '../_components/info'

const ActivityPage = async () => {
  const isPro = await isSubscribed()
  return (
    <div className="w-full">
      <Info isPro={isPro} />
      <Separator className="my-2" />
      <Suspense fallback={<ActivityList.Skeleton />}>
        <ActivityList />
      </Suspense>
    </div>
  )
}

export default ActivityPage
