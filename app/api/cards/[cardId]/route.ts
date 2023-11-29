import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

import { db } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: { cardId: string } }
) {
  try {
    const { userId, orgId } = auth()

    if (!userId || !orgId) {
      return new NextResponse('Unauthorized failed to Auth on GET card', {
        status: 401,
      })
    }

    const card = await db.card.findUnique({
      where: {
        id: params.cardId,
        list: {
          board: {
            orgId,
          },
        },
      },
      include: {
        list: {
          select: {
            title: true,
          },
        },
      },
    })

    return NextResponse.json(card)
  } catch (error) {
    return new NextResponse('Internal Error, failed to GET card', {
      status: 500,
    })
  }
}
