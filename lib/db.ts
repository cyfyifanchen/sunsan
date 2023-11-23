/**
 * This is a TypeScript code file named db.ts.
 *
 * The code exports a database instance from PrismaClient. It also declares a global variable named "prisma" of type PrismaClient or undefined.
 *
 * The code initializes the "db" constant with the global "prisma" variable or creates a new instance of PrismaClient if "prisma" is undefined.
 *
 * If the environment is not set to production, the global "prisma" variable is assigned the value of "db".
 */
import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

export const db = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') global.prisma = db
