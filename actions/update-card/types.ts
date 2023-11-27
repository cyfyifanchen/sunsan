import { z } from 'zod'
import { Card } from '@prisma/client'
import { UpdateCard } from './schema'
import { ActionState } from '@/lib/create-safe-action'

export type InputType = z.infer<typeof UpdateCard>
export type ReturnType = ActionState<InputType, Card>
