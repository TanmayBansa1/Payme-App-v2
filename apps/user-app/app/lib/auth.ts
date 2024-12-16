import CredentialsProvider from "next-auth/providers/credentials";
import {PrismaClient} from "@repo/db/client";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { compare, hash } from "bcrypt";
import { AuthOptions } from "next-auth";

const prisma = new PrismaClient();
export const NEXT_AUTH : AuthOptions = {
    providers: [

        CredentialsProvider({            
            name: "Credentials",
            credentials: {
                phone: { label: "phone", type: "text" },
                password: { label: "Password", type: "password" },
                
            },
            async authorize(credentials: Record<"phone" | "password", string> | undefined) {


                const phone = credentials?.phone || "";
                const password = credentials?.password || "";

                const existingUser = await prisma.user.findUnique({
                    where: {
                        number: phone,
                    }
                })     
                if (!existingUser) {
                    const hashedPassword = await hash(password, 10);
                    try{
                        const user = await prisma.user.create({
                            data: {
                                number: phone,
                                password: hashedPassword,
                                authType: "Phone",
                            }
                        })
                        return user;
                    }   catch(e){
                        throw new Error("User not found");
                    }   
                              
                }
                const passwordMatch = await compare(password, existingUser.password || ".");
                if (!passwordMatch) {
                    throw new Error("Invalid password");
                }
                return existingUser;
                
                
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),        
    ],
    secret: process.env.NEXTAUTH_SECRET || "secret",
    callbacks: {
        async signIn({ user, account, profile }: any) {
            return true;
        },
        async session({ session, user }: any) {
            return session;
        },
    }
}