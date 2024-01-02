"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { type Budget } from "@prisma/client"
import { redirect } from "next/navigation"

interface BudgetSwitcherNavProps extends React.HTMLAttributes<HTMLDivElement> {
  budgets: Budget[]
  defaultBudgetId: string
}
export default function BudgetSwitcherNav({ budgets, defaultBudgetId, className }: BudgetSwitcherNavProps) {
  return (
    <Select onValueChange={(id) => {
      if (id === defaultBudgetId) return
      redirect(`/budgets/${id}`)
    }}>
      <SelectTrigger className={className} >
        <SelectValue defaultValue={defaultBudgetId} placeholder={budgets.find((e) => e.id === defaultBudgetId)?.name} />
      </SelectTrigger>
      <SelectContent>
        {budgets.map((budget) => (
          <SelectItem key={budget.id} value={budget.id} className="flex items-center space-x-2">
            {budget.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}