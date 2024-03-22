import { getBudgetData } from "@/data-layer/budgets";
import AssignableMoney from "./assignable-money";
import BudgetCategoriesView from "./budget-categories-view";
import BudgetViewSelector from "./budget-view-selector";
import MonthPicker from "./month-picker";

export default async function BudgetTableView({ params }: { params: { id: string, date?: string } }) {
  const date = params.date ? new Date(decodeURIComponent(params.date)) : new Date(new Date().getFullYear(), new Date().getMonth());
  const data = await getBudgetData(params.id, date)
  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex gap-8 items-center p-2">
        <MonthPicker date={date} budgetId={params.id} />
        <AssignableMoney />
      </div>
      <BudgetViewSelector />
      {/* @ts-ignore */}
      <BudgetCategoriesView budgetId={params.id} data={data.categories} month={data.selectedMonth} />
    </div>
  )
}
