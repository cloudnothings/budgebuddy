
import { auth } from "@/auth"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getBudgetsForUser } from "@/data-layer/budgets"
import { redirect } from "next/navigation"

export default async function BudgetSwitcherNav({ params }: { params: { id: string } }) {
  const session = await auth()
  if (!session) {
    redirect('/')
  }
  const budgets = await getBudgetsForUser(session.user.id)
  if (!budgets) return null
  return (
    <Select onValueChange={(id) => {
      redirect(`/dashboard/${id}`)
    }}>
      <SelectTrigger className="w-72" >
        <SelectValue defaultValue={params.id} placeholder={budgets.find((e) => e.id === params.id)?.name} />
      </SelectTrigger>
      <SelectContent>
        {budgets?.map((budget) => (
          <SelectItem key={budget.id} value={budget.id} className="flex items-center space-x-2">
            {budget.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}