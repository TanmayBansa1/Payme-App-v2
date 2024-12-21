"use server"
import { OnRampStatus, PrismaClient } from "@repo/db/client";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "../auth";

const prisma = new PrismaClient();

export const createOnrampTransaction = async ({amount, provider, userId}: {amount: number, provider: string, userId: string}) => {
    try {
        const session = await getServerSession(NEXT_AUTH);
        
        if (!session?.user?.id) {
            throw new Error("Not authenticated");
        }

        const verifyAuth = session.user.id === userId;
        if (!verifyAuth) {
            throw new Error("Unauthorized request");
        }

        // Find user after auth verification
        const user = await prisma.user.findUnique({
            where: { 
                id: userId,
                // Add additional check to ensure user exists with correct auth type
                authType: session.user.authType
            }
        });
        
        if (!user) {
            console.error("User not found with ID:", userId, "and authType:", session.user.authType);
            throw new Error("User not found");
        }

        const token = (Math.random() * 1000).toString(); //irl get this token from the provider, send a request to the provider with the amount and user details and get the token
        const transaction = await prisma.onRampTransactions.create({
            data: {
                amount,
                provider,
                userId,
                token,
                status: OnRampStatus.Processing,
                endTime: new Date(Date.now() + 1000 * 60 * 60 * 24)
            }
        });

        return {
            transactionId: transaction.id,
            message: "Transaction created successfully"
        };
    } catch (error) {
        console.error("Transaction creation error:", error);
        throw error;
    }
}