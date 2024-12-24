import { getServerSession } from "next-auth";
import Addmoney from "../../../components/Addmoney";
import ShowBalance from "../../../components/ShowBalance";

const prisma = new PrismaClient();
import Transactions from "../../../components/Transactions";
import { NEXT_AUTH } from "../../lib/auth";
import { PrismaClient } from "@repo/db/client";

async function getBalance(){
    const session = await getServerSession(NEXT_AUTH);
    const userId = session?.user?.id;
    const balance = await prisma.balance.findFirst({
        where:{
            userId: userId
        },
        select:{
            amount: true,
            locked: true
        }
    })
    
    return {amount: balance?.amount, locked: balance?.locked};
}
async function getOnRampTransactions() {
    const session = await getServerSession(NEXT_AUTH);
    const txns = await prisma.onRampTransactions.findMany({
        where: {
            userId: session?.user?.id
        }
    });
    return txns.map((t:{id:string, startTime:Date, amount:number, status:string, provider:string}) => ({
        key: t.id,
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider,
        message: "Deposited"
    }))
}

export default async function TransferPage(){

    const {amount, locked} = await getBalance();
    const txns = await getOnRampTransactions();
        
    return<div className="w-full">
        <h1 className="text-5xl font-bold text-amber-900 p-8">Transfer</h1>

     <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 pr-14 pl-14">
        
        
        <Addmoney></Addmoney>
        <ShowBalance amount={amount} locked={locked}></ShowBalance>
        <Transactions txns={txns}></Transactions>
    
    </div>
    </div>
}

