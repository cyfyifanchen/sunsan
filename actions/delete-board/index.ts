'use server'

import { DeleteBoard } from './schema'
import { auth } from '@clerk/nextjs'
import { InputType, ReturnType } from './types'
import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { createSafeAction } from '@/lib/create-safe-action'
import { redirect } from 'next/navigation'
import { createAuditLog } from '@/lib/create-audit-log'
import { ACTION, ENTITY_TYPE } from '@prisma/client'
import { decreaseAvailableCount } from '@/lib/org-limit'
import { isSubscribed } from '@/lib/subscription'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      error: 'Unauthorized',
    }
  }

  const isPro = await isSubscribed()

  const { id } = data
  let board

  try {
    board = await db.board.delete({
      where: {
        id,
        orgId,
      },
    })

    if (!isPro) {
      await decreaseAvailableCount()
    }

    await createAuditLog({
      entityId: board.id,
      entityTitle: board.title,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.DELETE,
    })
  } catch (error) {
    return {
      error: 'Failed to delete the board',
    }
  }

  revalidatePath(`/organization/${orgId}`)
  redirect(`/organization/${orgId}`)
}

export const deleteBoard = createSafeAction(DeleteBoard, handler)
