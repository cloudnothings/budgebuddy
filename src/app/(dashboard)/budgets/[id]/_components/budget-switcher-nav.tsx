"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { type Budget } from "@prisma/client"
import { redirect } from "next/navigation"

export default function BudgetSwitcherNav({ budgets, defaultBudgetId }: { budgets: Budget[], defaultBudgetId: string }) {
  return (
    <Select onValueChange={(id) => {
      redirect(`/dashboard/${id}`)
    }}>
      <SelectTrigger className="w-48" >
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