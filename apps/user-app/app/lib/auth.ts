import CredentialsProvider from "next-auth/providers/credentials";
import {PrismaClient, signInuserSchema} from "@repo/db/client";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { compare, hash } from "bcrypt";
import { Account, AuthOptions, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";

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

                const validatedCredentials = signInuserSchema.safeParse(credentials);
                if(!validatedCredentials.success){
                    throw new Error("Invalid credentials");
                }
                const phone = validatedCredentials.data.phone;
                const password = validatedCredentials.data.password;

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
        async signIn({ user, account } :{user: User | AdapterUser , account: Account | null}) {
            if (account?.provider === 'google') {
                const existingUser = await prisma.user.findUnique({
                    where: {
                        email: user.email || ""
                    }
                });

                if (!existingUser) {
                    await prisma.user.create({
                        data: {
                            email: user.email,
                            name: user.name,
                            number: user.email || "", 
                            authType: "Google"
                        }
                    });
                }
            }
            if(account?.provider === "github"){
                const existingUser = await prisma.user.findFirst({
                    where:{
                        email: user.email
                    }   
                })
                if(!existingUser){
                    await prisma.user.create({
                        data: {
                            email: user.email,
                            name: user.name,
                            number: user.email || "",
                            authType: "Github"
                        }
                    })
                }
            }
            return true;
        },
        async jwt({token, user}:{token: JWT, user: User | AdapterUser}){
            if(user){
                token.sub = user.id
            }   
            return token;
        },
        async session({ session,token}: any) {
            if (session?.user) {
                session.user.id = token.sub;
                // If using database sessions
                const dbUser = await prisma.user.findUnique({
                    where: { id: token.sub }
                });
                if (dbUser) {
                    session.user.authType = dbUser.authType;
                    session.user.number = dbUser.number;
                }

            }
            return session;
        },
    }
}