import { getServerAuthSession } from "@/server/auth";
import NoBudgetsView from "./_components/no-budgets-homescreen";
import { redirect } from "next/navigation";
import { api } from "@/trpc/server";

export default async function DashboardPage() {
  const session = await getServerAuthSession();
  if (!session) {
    redirect('/')
  }
  const budgets = await api.budget.list.query()
  if (!budgets.length) return (
    <NoBudgetsView />
  )
  redirect(`/dashboard/${budgets[0]?.id}`)
}