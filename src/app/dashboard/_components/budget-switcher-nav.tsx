"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { api } from "@/trpc/react"
import { redirect } from "next/navigation"


export default function BudgetSwitcherNav({ params }: { params: { id: string } }) {
  const budgets = api.budget.list.useQuery()
  if (!budgets.data) return null
  return (
    <Select onValueChange={(id) => {
      redirect(`/dashboard/${id}`)
    }}>
      <SelectTrigger className="w-72" >
        <SelectValue defaultValue={params.id} placeholder={budgets.data.find((e) => e.id === params.id)?.name} />
      </SelectTrigger>
      <SelectContent>
        {budgets.data?.map((budget) => (
          <SelectItem key={budget.id} value={budget.id} className="flex items-center space-x-2">
            {budget.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}