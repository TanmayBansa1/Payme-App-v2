import { Card } from "@repo/ui";

export default function Transactions({txns}:{txns: {key: string,time: Date, amount: number, status: string, provider: string, message: string}[]}){
    return <Card title="Recent Transactions">
    <div className="pt-2 mb-12">
        {txns?.map(t => <div key={t.key} className="flex justify-between w-1/2">
            <div className="border-b border-slate-300 pb-2 w-full">
                <div className="text-md">
                    {t.message} INR
                </div>
                <div className="text-slate-600 text-sm">
                    {t.time.toDateString()}
                </div>
            </div>
            <div className="flex flex-col justify-center pl-16 border-b border-slate-300 pb-2 w-full ">
                {(t.message === "Received" || t.message === "Deposited") ? "+" : "-"} Rs {t.amount / 100} 
            </div>

        </div>)}
    </div>
</Card>
}
