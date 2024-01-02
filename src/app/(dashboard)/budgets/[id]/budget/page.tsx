import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function BudgetPage() {
  const session = await auth()
  if (!session) {
    redirect('/')
  }
  return (
    <></>
  )
}