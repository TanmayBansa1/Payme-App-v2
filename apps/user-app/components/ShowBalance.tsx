import { Card } from "@repo/ui/card";

export default function ShowBalance({
  amount,
  locked,
}: {
  amount: number | undefined;
  locked: number | undefined;
}): JSX.Element {
  return (
    <div>
      <Card title={"Balance"}>
        <div className="flex justify-between border-b border-slate-300 pb-2 mt-2">
          <div>Unlocked balance</div>
          <div>{amount ? amount / 100 : 0} INR</div>
        </div>
        <div className="flex justify-between border-b border-slate-300 py-2">
          <div>Total Locked Balance</div>
          <div>{locked ? locked / 100 : 0} INR</div>
        </div>
        <div className="flex justify-between border-b border-slate-300 py-2">
          <div>Total Balance</div>
            <div>{ (locked && amount) ? (locked + amount) / 100 : 0} INR</div>
        </div>
      </Card>
    </div>
  );
}
