import { getServerAuthSession } from "@/server/auth"
import { api } from "@/trpc/server"
import { redirect } from "next/navigation"

export default async function BudgetPage({ params }: {
  params: { id: string }
}) {
  const session = await getServerAuthSession()
  if (!session) {
    redirect('/')
  }

  const budget = await api.budget.get.query({ id: params.id })
  return <div>Budget</div>
}