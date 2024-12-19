import express from "express";
import {OnRampStatus, PrismaClient} from "@repo/db/client";
const app = express();
const prisma = new PrismaClient();

app.use('/hdfcwebhook', async (req, res) => {

    // this is info you recieve from the bank
    // you need to validate the request check if its actually hdfc, use a webhook signature/secret
    const paymentInfo = {
        amount: req.body.amount,
        token: req.body.token,
        userId: req.body.userId,
    }

    //handle db operations here
    try{
        await prisma.$transaction(async (tx) => {
            await tx.balance.update({
                where:{
                    userId: paymentInfo.userId
            },
            data:{
                amount: {
                    increment: paymentInfo.amount
                }
                }
            })

            await tx.onRampTransactions.update({
                where:{
                token: paymentInfo.token
                },
                data:{
                    status: OnRampStatus.Success,
                    endTime: new Date()
                }
            })
        })
        res.status(200).send("payment success");

    }catch(error){

        await prisma.onRampTransactions.update({
            where:{
                token: paymentInfo.token
            },
            data:{
                status: OnRampStatus.Failed,
                endTime: new Date()
            }
        })  
        res.status(500).send("payment failed");

    }
    

});
