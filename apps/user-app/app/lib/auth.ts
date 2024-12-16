import CredentialsProvider from "next-auth/providers/credentials";
import {PrismaClient} from "@repo/db/client";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import { hash } from "bcrypt";

const prisma = new PrismaClient();
export const NEXT_AUTH = {
    providers: [

        CredentialsProvider({
            
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
                
            },
            async authorize(credentials: Record<"email" | "password", string> | undefined) {


                const email = credentials?.email || "";
                const password = credentials?.password || "";

                const existingUser = await prisma.user.findUnique({
                    where: {
                        email: email,
                    }
                })

                if (!existingUser) {
                    const user = await prisma.user.create({
                        data: {
                            email: email,
                            password: password,
                        }
                    })
                    return user;
                }

                return existingUser;    
            }
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        Github({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),

        
    ],
    secret: process.env.NEXTAUTH_SECRET || "",
    pages: {
        signIn: "/signin",
    },
    callbacks: {

    },
}