import BudgetSwitcherNav from "./budget-switcher-nav";
import { AccountNav } from "@/components/navbar";

export default async function DashboardNav({ params }: { params: { id: string } }) {
  return (
    <div className="hidden flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <BudgetSwitcherNav params={params} />
          <div className="ml-auto flex items-center space-x-4">
            <AccountNav />
          </div>
        </div>
      </div>
    </div>
  )
}

