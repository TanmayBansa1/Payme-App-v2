"use server";

import { P2PTransactionStatus, PrismaClient } from "@repo/db/client";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "../auth";

const prisma = new PrismaClient();

export async function sendP2PRequest({amount, recipient}: {amount: number, recipient: string}){

    const session = await getServerSession(NEXT_AUTH);
    if(!session?.user?.id){
        throw new Error("Not authenticated");
    }

    const userId = session.user.id;

    const userFrom = await prisma.user.findUnique({where: {id: userId}});

    if(!userFrom){
        throw new Error("Sending User not found");
    }
    
    const userTo = await prisma.user.findUnique({where: {number: recipient}});

    if(!userTo){
        throw new Error("Receiving User not found");
    }
    try{
        await prisma.$transaction(async(tx)=>{
            await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${userFrom.id} FOR UPDATE`;
            const fromBalance = await tx.balance.findUnique({
                where: { userId: userFrom.id },
            });
              if (!fromBalance || fromBalance.amount < amount) {
                throw new Error('Insufficient funds');
            }
            const transaction = await tx.p2PTransaction.create({
                data:{
                    senderId: userFrom.id,
                    recipientId: userTo.id,
                    amount: amount,
                    status: P2PTransactionStatus.Processing
                }
            })
            await tx.balance.update({
                where:{userId: userFrom.id},
                data:{
                    amount:{
                        decrement: amount
                    }
                }
            })
            await tx.balance.update({
                where:{userId: userTo.id},
                data:{
                    amount:{
                        increment: amount
                    }
                }
            })
        });
        return {message: "Transaction successful"};
    }catch(error){
        console.log(error);
        
        throw new Error("Transaction failed");
    }
}
