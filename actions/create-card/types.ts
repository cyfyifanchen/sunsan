import { z } from 'zod'
import { Card } from '@prisma/client'
import { CreateCard } from './schema'
import { ActionState } from '@/lib/create-safe-action'

export type InputType = z.infer<typeof CreateCard>
export type ReturnType = ActionState<InputType, Card>
