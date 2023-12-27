import { getServerAuthSession } from "@/server/auth";
import LandingPage from "./_components/landing";
import { redirect } from "next/navigation";


export default async function Home() {
  const session = await getServerAuthSession();
  if (session) {
    redirect('/dashboard')
  }
  return <LandingPage />
}

