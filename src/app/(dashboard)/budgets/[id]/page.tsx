import { auth } from "@/auth"
import { getBudget } from "@/data-layer/budgets"
import { redirect } from "next/navigation"

export default async function BudgetPage({ params }: {
  params: { id: string }
}) {
  const session = await auth()
  if (!session) {
    redirect('/')
  }
  const budget = await getBudget(params.id, session.user.id)
  if (!budget) {
    redirect('/home')
  }
  redirect(`/budgets/${params.id}/budget`)
}