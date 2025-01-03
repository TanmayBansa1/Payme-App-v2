"use client";

import { User } from "@repo/db/client";
import { Button } from "@repo/ui/button";

export default function Appbar({
    onSignin, 
    onSignout, 
    user
}: {
    onSignin: () => void, 
    onSignout: () => void, 
    user: User | null | undefined
}) {
    return <div className="flex justify-between p-4">
        <div className="text-3xl font-bold text-amber-950">
            PayMe
        </div>
        <div>
            {user?.email || user?.number}
        </div>
        <div>
            {user ? <Button onClick={onSignout}>Sign Out</Button> : <Button onClick={onSignin}>Sign In</Button>}
        </div>
    </div>
}