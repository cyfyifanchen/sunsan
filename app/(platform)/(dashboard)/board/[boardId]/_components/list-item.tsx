'use client'

import { ListWithCards } from '@/type'

interface ListItemProps {
  data: ListWithCards
  index: number
}
export const ListItem = ({ data, index }: ListItemProps) => {
  return (
    <li className="shrink-0 h-full w-[272px] select-none">
      <div className="w-full rounded-md bg-[#1f1f2f4] shadow-md pb-2"></div>
    </li>
  )
}
