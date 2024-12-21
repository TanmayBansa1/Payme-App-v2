import { Card } from "@repo/ui";

export default function Transactions({txns}:{txns: {key: string,time: Date, amount: number, status: string, provider: string, message: string}[]}){
    return <Card title="Recent Transactions">
    <div className="pt-2 mb-12 max-w-[600px]">
        {txns?.map(t => <div key={t.key} className="flex gap-2 justify-between w-full border-b border-slate-300
">
                <div>
                    {transactionIcon()}
                </div>
            <div className=" pb-2 w-full">
                <div className="text-md">
                    {t.message} INR
                </div>
                <div className="text-slate-600 text-sm">
                    {t.time.toDateString()}
                </div>
            </div>
            <div className="flex flex-col justify-center pb-2 w-full ">
                {(t.message === "Received" || t.message === "Deposited") ? "+" : "-"} Rs {t.amount / 100} 
            </div>

        </div>)}
    </div>
</Card>
}

function transactionIcon(){

    return <div className="w-8 h-8 bg-slate-300 rounded-full flex items-center justify-center">
        <svg className="text-themeColor-500 w-8 h-8" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20" fill="currentColor"> <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 5a1 1 0 100 2h1a2 2 0 011.732 1H7a1 1 0 100 2h2.732A2 2 0 018 11H7a1 1 0 00-.707 1.707l3 3a1 1 0 001.414-1.414l-1.483-1.484A4.008 4.008 0 0011.874 10H13a1 1 0 100-2h-1.126a3.976 3.976 0 00-.41-1H13a1 1 0 100-2H7z" clipRule="evenodd"/></svg>
    </div>
}