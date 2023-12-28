import { auth } from "@/auth"
import { Card, CardContent } from "@/components/ui/card"
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
    redirect('/dashboard')
  }
  return (
    <div className="flex flex-col p-4">
      <Card>
        <CardContent>
          {budget.categories.filter((e) => e.subCategories.length !== 0).map(category => (
            <div key={category.id}>
              {category.name}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}