import { z } from 'zod'
import { Board } from '@prisma/client'
import { DeleteBoard } from './schema'
import { ActionState } from '@/lib/create-safe-action'

export type InputType = z.infer<typeof DeleteBoard>
export type ReturnType = ActionState<InputType, Board>
