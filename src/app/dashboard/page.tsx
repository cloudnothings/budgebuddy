import { getServerAuthSession } from "@/server/auth";
import NoBudgetsView from "./_components/no-budgets-homescreen";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerAuthSession();
  if (!session) {
    redirect('/')
  }

  return (
    <NoBudgetsView />
  )
}