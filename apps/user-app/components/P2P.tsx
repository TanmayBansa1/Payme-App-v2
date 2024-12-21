"use client";
import { Button, Card, Textinput } from "@repo/ui";
import { ChangeEvent, useState } from "react";
import { sendP2PRequest } from "../app/lib/actions/sendP2PRequest";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function P2P() {
  const [amount, setAmount] = useState(0);
  const [recipient, setRecipient] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleTransfer = async () => {
    try {
      setIsLoading(true);
      await sendP2PRequest({
        amount: amount * 100,
        recipient: recipient
      });
      
      toast.success("Transfer successful!");
      setAmount(0);
      setRecipient("");
      
      // Refresh the page data without full reload
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Transfer failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Card title="P2P Transfer">
        <div className="flex flex-col w-full">
          <Textinput
            placeholder="Enter the amount"
            label="Amount"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setAmount(Number(e.target.value));
            }}
          />
          <Textinput
            placeholder="XXXXXXXXXX or abc@gmail.com"
            label="Recipient's Phone Number or Email"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setRecipient(e.target.value);
            }}
          />
          <div className="mx-4 my-4 flex justify-center w-72">
            <Button 
              onClick={handleTransfer}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Send"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
