"use client"

import { useBalance } from "@repo/store/useBalance";

export const ShowBalance = () => {
    const balance = useBalance();
    return <div>{balance}</div>;
}