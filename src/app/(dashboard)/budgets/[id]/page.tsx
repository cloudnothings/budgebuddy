import { auth } from "@/auth"
import { RichMarkdownEditor } from "@/components/rich-markdown-editor"
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
    redirect('/home')
  }
  return (
    <div className="flex flex-col p-4">
      <Card>
        <CardContent>
          {budget.categories.map(category => (
            <div key={category.id}>
              <span className="text-xl text-white">
                {category.name}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
      <RichMarkdownEditor />
    </div>
  )
}