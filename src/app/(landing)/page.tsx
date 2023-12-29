
import { auth } from "@/auth";
import Hero from "./hero";
import { redirect } from "next/navigation";
export default async function Home() {
  const session = await auth()
  if (session) {
    redirect("/home")
  }
  return (
    <>
      <Hero />
    </>
  )
}

