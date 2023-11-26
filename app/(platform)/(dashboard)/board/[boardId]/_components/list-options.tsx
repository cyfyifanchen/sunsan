'use client'

import { List } from '@prisma/client'

interface ListOptionsProps {
  data: List
  onAddCard: () => void
}

export const ListOptions = ({ data, onAddCard }: ListOptionsProps) => {
  return <div className="">List Options</div>
}
