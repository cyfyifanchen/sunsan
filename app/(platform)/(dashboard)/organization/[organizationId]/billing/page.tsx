import { isSubscribed } from '@/lib/subscription'
import { Info } from '../_components/info'
import { Separator } from '@/components/ui/separator'
import { SubscriptionButton } from './_components/subscription-button'

const BillingPage = async () => {
  const isPro = await isSubscribed()

  return (
    <div className="w-full">
      <Info isPro={isPro} />
      <Separator className="my-2" />
      <SubscriptionButton isPro={isPro}></SubscriptionButton>
    </div>
  )
}

export default BillingPage
