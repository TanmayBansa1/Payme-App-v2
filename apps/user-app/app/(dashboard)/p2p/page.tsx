import { getServerSession } from "next-auth";
import P2P from "../../../components/P2P";
import ShowBalance from "../../../components/ShowBalance";
import { PrismaClient } from "@repo/db/client";
import { NEXT_AUTH } from "../../lib/auth";
import Transactions from "../../../components/Transactions";

const prisma = new PrismaClient();
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
async function getp2pTransactions() {
    const session = await getServerSession(NEXT_AUTH);
    const senttxns = await prisma.p2PTransaction.findMany({
        where: {
            senderId: session?.user?.id
        }
    });
    const receivedtxns = await prisma.p2PTransaction.findMany({
        where: {
            recipientId: session?.user?.id
        }
    });
    return [...senttxns, ...receivedtxns].map(t => ({
        key: t.id,
        time: t.createdAt,
        amount: t.amount,
        status: t.status,
        provider: t.recipientId === session?.user?.id ? t.senderId : t.recipientId,
        message: t.recipientId === session?.user?.id ? "Received" : "Sent"
    }))
}

export default async function p2p(){

    const {amount, locked} = await getBalance();
    const txns = await getp2pTransactions();
    return <div>
        <h1 className="text-5xl font-bold text-amber-900 p-8">Send Money</h1>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 pr-14 pl-14">
            <P2P />
            <ShowBalance amount={amount} locked={locked}/>
            <Transactions txns={txns}/>
        </div>
    </div>
}