import {z} from "zod";
export * from "@prisma/client";

export const signInuserSchema = z.object({
    password: z.string().min(3),
    phone: z.string().length(10),
})

