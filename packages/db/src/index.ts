import { z } from "zod";
import { PrismaClient, Prisma } from "@prisma/client";

export * from "@prisma/client";

// Create and export a singleton PrismaClient instance
export const prisma = new PrismaClient();

export const signInuserSchema = z.object({
    password: z.string().min(3),
    phone: z.string().length(10),
});

// Remove type keyword to export enums as values
export {
    OnRampStatus,
    P2PTransactionStatus,
    AuthType
} from "@prisma/client";

// Keep type exports for interfaces
export type {
    User,
    Balance,
    OnRampTransactions,
    P2PTransaction
} from "@prisma/client";

