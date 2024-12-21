import express from "express";
import {OnRampStatus, PrismaClient} from "@repo/db/client";
const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.use('/hdfcwebhook', async (req, res) => {

    // this is info you recieve from the bank
    console.log(req.body);
    // you need to validate the request check if its actually hdfc, use a webhook signature/secret
    const paymentInfo:{
        amount: number,
        token: string,
        userId: string
    } = {
        amount: req.body.amount, 
        token: req.body.token,
        userId: req.body.userId,
    }
    //check if the transaction is already processed
    const existingTransaction = await prisma.onRampTransactions.findFirst({
        where:{
            token: paymentInfo.token
        }
    })
    if(existingTransaction?.status !== OnRampStatus.Processing){
        res.status(200).send("transaction already processed");
        return;
    }

    //handle db operations here
    try{
        await prisma.$transaction(async (tx) => {

            const existingBalance = await tx.balance.findFirst({
                where:{
                    userId: paymentInfo.userId
                }
            })
            if(!existingBalance){
                await tx.balance.create({
                    data:{
                        userId: paymentInfo.userId,
                        amount: 0,
                        locked: 0
                    }
                })

            }   
           await tx.balance.updateMany({
                where:{
                    userId: paymentInfo.userId
                },
                data:{
                    amount: {
                        increment: Number(paymentInfo.amount)
                    }
                }
            })  
            console.log("balance updated");

            await tx.onRampTransactions.updateMany({
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

        console.log(error);
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
app.listen(3002, () => {
    console.log("server is running on port 3002");
})
