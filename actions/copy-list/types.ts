import { z } from 'zod'
import { List } from '@prisma/client'
import { CopyList } from './schema'
import { ActionState } from '@/lib/create-safe-action'

export type InputType = z.infer<typeof CopyList>
export type ReturnType = ActionState<InputType, List>
