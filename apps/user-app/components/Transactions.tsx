import { Card } from "@repo/ui";

export default function Transactions({txns}:{txns: {key: string,time: Date, amount: number, status: string, provider: string}[]}){
    return <Card title="Recent Transactions">
    <div className="pt-2">
        {txns?.map(t => <div key={t.key} className="flex justify-between">
            <div>
                <div className="text-md">
                    Received INR
                </div>
                <div className="text-slate-600 text-sm">
                    {t.time.toDateString()}
                </div>
            </div>
            <div className="flex flex-col justify-center pr-16">
                + Rs {t.amount / 100} 
            </div>

        </div>)}
    </div>
</Card>
}
