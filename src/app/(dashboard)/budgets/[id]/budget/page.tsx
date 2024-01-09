import { auth } from "@/auth"
import { redirect } from "next/navigation"
import BudgetTableView from "../_components/budget-table-view"

export default async function BudgetPage({ params }: { params: { id: string } }) {
  const session = await auth()
  if (!session) {
    redirect('/')
  }
  return (
    <BudgetTableView params={params} />
  )
}