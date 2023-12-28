import NoBudgetsView from "./_components/no-budgets-homescreen";
import { redirect } from "next/navigation";
import { getBudgetsForUser } from "@/data-layer/budgets";
import { auth } from "@/auth";


export default async function DashboardPage() {
  const session = await auth()
  if (!session) {
    redirect('/')
  }
  const budgets = await getBudgetsForUser(session.user.id)
  if (!budgets.length) return (
    <NoBudgetsView />
  )
  redirect(`/dashboard/${budgets[0]?.id}`)
}