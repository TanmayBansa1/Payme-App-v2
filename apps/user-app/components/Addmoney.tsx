"use client"

import { Button, Card, Textinput } from "@repo/ui";
import { useSession } from "next-auth/react";
import { ChangeEvent, useState } from "react";
import { createOnrampTransaction } from "../app/lib/actions/createTransaction";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

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
    const router = useRouter();

    const handleAddMoney = async () => {
        setIsLoading(true);

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

            const result = await createOnrampTransaction({
                amount: amount * 100,
                provider: bank,
                userId: session.data.user.id
            });

            const response = await fetch(`${process.env.NEXT_PUBLIC_BANK_URL}/process-transaction`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    amount: amount*100, 
                    userId: session.data.user.id, 
                    token: result.token 
                })
            });
            const data = await response.json();
            
            // Store return URL
            const returnUrl = `${window.location.origin}/transfer`;
            
            // Try to open bank window
            const bankWindow = window.open(
                redirectUrl,
                '_blank',
                'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=800,height=600'
            );

            if (bankWindow) {
                toast.success("Redirecting to bank...");
                // Set timeout to close bank window and redirect main window
                setTimeout(() => {
                    try {
                        bankWindow.close();
                        window.location.href = returnUrl;
                    } catch (e) {
                        console.error("Error closing window:", e);
                    }
                }, 5000);
            } else {
                // If popup was blocked, redirect in same window
                toast.error("Popup blocked. Redirecting in same window...");
                window.location.href = redirectUrl;
                setTimeout(() => {
                    window.location.href = returnUrl;
                }, 5000);
            }
            
            setAmount(0);
            setIsLoading(false);
            toast.success(data.message);
        } catch (error) {
            setIsLoading(false);
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