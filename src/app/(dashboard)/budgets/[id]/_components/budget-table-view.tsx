import { getBudgetData } from "@/data-layer/budgets";
import AssignableMoney from "./assignable-money";
import BudgetCategoriesView from "./budget-categories-view";
import BudgetViewSelector from "./budget-view-selector";
import MonthPicker from "./month-picker";
import { ScrollArea } from "@/components/ui/scroll-area";
export default async function BudgetTableView({ params }: { params: { id: string } }) {
  const data = await getBudgetData(params.id)
  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex gap-8 items-center p-2">
        <MonthPicker />
        <AssignableMoney />
      </div>
      <BudgetViewSelector />

      {/* @ts-ignore */}
      <BudgetCategoriesView budgetId={params.id} data={data.categories} month={data.selectedMonth} />

    </div>
  )
}
