"use client"
import { Button, Card, Textinput } from "@repo/ui";
import { useSession } from "next-auth/react";
import { ChangeEvent, useState } from "react";

const SUPPORTED_BANKS = [{
    name: "SBI",
    redirectUrl: "https://www.onlinesbi.sbi/"
}, {
    name: "HDFC",
    redirectUrl: "https://netbanking.hdfcbank.com"
}]

export default function Addmoney(){
    const [amount, setAmount] = useState(0);
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);

    return <div className="w-full">
          <Card title="Add Money">
            <div>
                <Textinput label="Amount" placeholder="Enter Amount" onChange={(e: ChangeEvent<HTMLInputElement>) => setAmount(Number(e.target.value))}></Textinput>
                
            </div>
            <div>
                <h3 className="text-md font-semibold my-2 mx-4">Select Bank</h3>
                <select name="banks" className="w-full p-2 mx-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-72">
                    <option value="SBI">SBI</option>
                    <option value="HDFC">HDFC</option>
                </select>
            </div>
            <div className="mx-4 my-4 flex justify-center w-72">
                <Button onClick={() => {
                    window.location.href = redirectUrl || "";
                }}>Add Money</Button>
            </div>
          </Card>
    </div>
}