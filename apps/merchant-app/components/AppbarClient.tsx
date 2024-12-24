"use client"

import { User } from "@repo/db/client";
import Appbar from "@repo/ui/Appbar";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default function AppbarClient() {
    const router = useRouter();
    const session = useSession();

    const handleSignIn = useCallback(() => {
        signIn();
    }, []);

    const handleSignOut = useCallback(async () => {
        await signOut();
        router.push("/api/auth/signin");
    }, [router]);

    return (
        <div>
            <Appbar 
                onSignin={handleSignIn} 
                onSignout={handleSignOut} 
                user={session.data?.user as User}
            />
        </div>
    );
}
