import { Card } from "@repo/ui";

export default function Transactions({txns}:{txns: {time: Date, amount: number, status: string, provider: string}[]}){
    return <div>
        
        <Card title="Transactions">
            <div>
                {txns?.map((txn) => (
                    <div>
                        <div>{txn.time.toLocaleString()}</div>
                        <div>{txn.amount}</div>
                        <div>{txn.status}</div>
                        <div>{txn.provider}</div>
                    </div>
                ))}
            </div>
        </Card>
    </div>
}
