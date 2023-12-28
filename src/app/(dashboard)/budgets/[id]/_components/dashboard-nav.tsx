import { getBudgetsForUser } from "@/data-layer/budgets";
import BudgetSwitcherNav from "./budget-switcher-nav";
import { AccountNav } from "@/components/navbar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardNav({ params }: { params: { id: string } }) {
  const session = await auth()
  if (!session) {
    redirect('/')
  }
  const budgets = await getBudgetsForUser(session.user.id)
  const budget = budgets.find((e) => e.id === params.id) ?? budgets[0]
  return (
    <div className="hidden flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <BudgetSwitcherNav budgets={budgets} defaultBudgetId={budget.id} />
          <div className="mr-auto pl-4 flex items-center space-x-4">
            <Link href={`/budgets/${budget.id}?plan`}>
              <span className=" font-semibold">Categories</span>
            </Link>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <AccountNav />
          </div>
        </div>
      </div>
    </div>
  )
}

