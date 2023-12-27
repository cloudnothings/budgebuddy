import { Card, CardContent } from "@/components/ui/card"
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