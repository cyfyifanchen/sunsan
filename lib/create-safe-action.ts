import { ActionState } from './create-safe-action'
/**
 * TypeScript code from file create-safe-action.ts
 *
 * This file contains type definitions for creating safe actions in TypeScript.
 * It defines two types: FieldErrors and ActionState.
 *
 * FieldErrors<T> is a generic type that represents an object where each key is a field name of type T,
 * and the corresponding value is an array of strings representing error messages for that field.
 *
 * ActionState<TInput, TOutput> is a generic type that represents the state of an action.
 * It can have optional field errors of type FieldErrors<TInput>, an optional error message of type string or null,
 * and an optional data field of type TOutput.
 *
 * This code is using the zod library, importing the 'z' object from it.
 */

import { z } from 'zod'

export type FieldErrors<T> = {
  [K in keyof T]?: string[]
}

export type ActionState<TInput, TOutput> = {
  fieldErrors?: FieldErrors<TInput>
  error?: string | null
  data?: TOutput
}

export const createSafeAction = <TInput, TOutput>(
  schema: z.Schema<TInput>,
  handler: (validatedData: TInput) => Promise<ActionState<TInput, TOutput>>
) => {
  return async (data: TInput): Promise<ActionState<TInput, TOutput>> => {
    const validationRes = schema.safeParse(data)

    if (!validationRes.success) {
      return {
        fieldErrors: validationRes.error.flatten()
          .fieldErrors as FieldErrors<TInput>,
      }
    }

    return handler(validationRes.data)
  }
}
