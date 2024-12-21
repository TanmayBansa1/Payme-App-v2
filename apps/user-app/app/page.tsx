
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "./lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(NEXT_AUTH);
  
  if(session?.user){
    return redirect("/dashboard");
  }else{
    return redirect("/api/auth/signin");
  }
}
