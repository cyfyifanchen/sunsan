'use server'

import { UpdateCard } from './schema'
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

  const { boardId, id, ...values } = data
  let card

  try {
    card = await db.card.update({
      where: {
        id,
        list: {
          board: {
            orgId,
          },
        },
      },
      data: {
        ...values,
      },
    })
  } catch (error) {
    return {
      error: 'Failed to update the card',
    }
  }

  revalidatePath(`/board/${boardId}`)
  return { data: card }
}

export const updateCard = createSafeAction(UpdateCard, handler)
