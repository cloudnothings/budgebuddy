import LandingPage from "./_components/landing";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth()
  if (session) {
    redirect('/dashboard')
  }
  return <LandingPage />
}

