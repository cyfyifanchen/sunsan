import { z } from 'zod'
import { Board } from '@prisma/client'
import { UpdateList } from './schema'
import { ActionState } from '@/lib/create-safe-action'

export type InputType = z.infer<typeof UpdateList>
export type ReturnType = ActionState<InputType, Board>
