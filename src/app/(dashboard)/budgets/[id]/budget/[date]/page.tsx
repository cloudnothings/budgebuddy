import { auth } from "@/auth"
import { redirect } from "next/navigation"
import BudgetTableView from "../../_components/budget-table-view"

export default async function BudgetDatePage({ params }: { params: { id: string, date: string } }) {
  const session = await auth()
  if (!session) {
    redirect('/')
  }
  return (
    <BudgetTableView params={params} />
  )
}