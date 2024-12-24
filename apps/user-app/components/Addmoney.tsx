"use client"

import { Button, Card, Textinput } from "@repo/ui";
import { useSession } from "next-auth/react";
import { ChangeEvent, useState } from "react";
import { createOnrampTransaction } from "../app/lib/actions/createTransaction";
import { toast } from "react-hot-toast";

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
    const [bank, setBank] = useState(SUPPORTED_BANKS[0]?.name);
    const session = useSession();
    const [isLoading, setIsLoading] = useState(false);

    const handleAddMoney = async () => {

        if(amount <= 0){
            toast.error("Amount must be greater than 0");
            return;
        }

        if(!bank){
            toast.error("Please select a bank");
            return;
        }

        try {
            if (!session?.data?.user?.id) {
                toast.error("Please sign in first");
                return;
            }

            await createOnrampTransaction({
                amount: amount * 100,
                provider: bank,
                userId: session.data.user.id
            });

            toast.success("Transaction created successfully");
            setIsLoading(false);
            setAmount(0);
            //redirecturl?token=result.token 
            window.location.href = redirectUrl || "";
        } catch (error) {
            console.error("Add money error:", error);
            toast.error(error instanceof Error ? error.message : "Failed to process transaction");
        }
    };

    return <div className="w-full">
          <Card title="Add Money">
            <div>
                <Textinput label="Amount" placeholder="Enter Amount" onChange={(e: ChangeEvent<HTMLInputElement>) => setAmount(Number(e.target.value))}></Textinput>
                
            </div>
            <div>
                <h3 className="text-md font-semibold my-2 mx-4">Select Bank</h3>
                <select 
                    name="banks" 
                    className="w-full p-2 mx-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-72"
                    onChange={(e) => {
                        const selectedBank = SUPPORTED_BANKS.find(bank => bank.name === e.target.value);
                        setBank(selectedBank?.name || SUPPORTED_BANKS[0].name);
                        setRedirectUrl(selectedBank?.redirectUrl || SUPPORTED_BANKS[0].redirectUrl);
                    }}
                >
                    <option value="SBI">SBI</option>
                    <option value="HDFC">HDFC</option>
                </select>
            </div>
            <div className="mx-4 my-4 flex justify-center w-72">
                <Button onClick={handleAddMoney}>{isLoading ? "Processing..." : "Add Money"}</Button>
            </div>
          </Card>
    </div>
}