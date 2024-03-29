import { getBudgetsForUser } from "@/data-layer/budgets";
import BudgetSwitcherNav from "./budget-switcher-nav";
import { AccountNav } from "@/components/navbar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardNav({ params }: { params: { id: string } }) {
  const session = await auth()
  if (!session) {
    redirect('/')
  }
  const budgets = await getBudgetsForUser(session.user.id)
  const budget = budgets.find((e) => e.id === params.id) ?? budgets[0]
  return (
    <div className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center mx-3">
        <div className="mr-4 flex">
          <BudgetSwitcherNav className="mr-6 flex items-center space-x-2" budgets={budgets} defaultBudgetId={budget.id} />
        </div>
        <div className="flex flex-1 items-center space-x-2 justify-end ">
          <div className="flex items-center">
            <AccountNav />
          </div>
        </div>
      </div>
    </div>
  )
}

