import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "../../lib/auth";
import { PrismaClient } from "@repo/db/client";
import Transactions from "../../../components/Transactions";

const prisma = new PrismaClient();
async function getOnRampTransactions() {
    const session = await getServerSession(NEXT_AUTH);
    const txns = await prisma.onRampTransactions.findMany({
        where: {
            userId: session?.user?.id
        }
    });
    return txns.map(t => ({
        key: t.id,
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider,
        message: "Deposited"
    }))
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
    return [...senttxns, ...receivedtxns].map((t:{id:string, createdAt:Date, amount:number, status:string, senderId:string, recipientId:string}) => ({
        key: t.id,
        time: t.createdAt,
        amount: t.amount,
        status: t.status,
        provider: t.recipientId === session?.user?.id ? t.senderId : t.recipientId,
        message: t.recipientId === session?.user?.id ? "Received" : "Sent"
    }))
}


export default async function TransactionsPage(){
    const onramp = await getOnRampTransactions();
    const p2p = await getp2pTransactions();
    const txns = [...onramp, ...p2p];
    return <div className="w-full">
        <h1 className="text-5xl font-bold text-amber-900 p-8">Transactions</h1>
        <div className="w-full pl-14">
            <Transactions txns={txns} />
        </div>
    </div>
}
