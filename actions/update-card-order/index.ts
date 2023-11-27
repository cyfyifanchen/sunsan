'use server'

import { UpdateCardOrder } from './schema'
import { auth } from '@clerk/nextjs'
import { InputType, ReturnType } from './types'
import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { createSafeAction } from '@/lib/create-safe-action'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      error: 'Unauthorized',
    }
  }

  const { items, boardId } = data
  let updatedCards

  try {
    const transaction = items.map((card) =>
      db.card.update({
        where: {
          id: card.id,
          list: {
            board: {
              orgId,
            },
          },
        },
        data: {
          order: card.order,
          listId: card.listId,
        },
      })
    )

    updatedCards = await db.$transaction(transaction)
  } catch (error) {
    return {
      error: 'Failed to reorder card',
    }
  }

  revalidatePath(`/board/${boardId}`)
  return { data: updatedCards }
}

export const updateCardOrder = createSafeAction(UpdateCardOrder, handler)
