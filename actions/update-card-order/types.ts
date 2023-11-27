import { z } from 'zod'
import { Card } from '@prisma/client'
import { UpdateCardOrder } from './schema'
import { ActionState } from '@/lib/create-safe-action'

export type InputType = z.infer<typeof UpdateCardOrder>
export type ReturnType = ActionState<InputType, Card[]>
