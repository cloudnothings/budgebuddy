import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { CardStackPlusIcon } from "@radix-ui/react-icons"
import CreateBudgetModal from "./new-budget-modal"

export default function NoBudgetsView() {
  return (
    <main className="flex flex-col justify-center items-center p-8">
      <Card className="max-w-md w-full">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl text-center">Welcome to Budge Buddy</CardTitle>
          <CardDescription className="text-center">
            Create your first budget to start planning your finances.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <CardStackPlusIcon className="w-20 h-20 mb-4 text-gray-400" />
          <p className="mb-4 text-center text-gray-600">
            You have no budgets yet. Click the button below to create one.
          </p>
          <CreateBudgetModal />
        </CardContent>
      </Card>
    </main>
  )
}

