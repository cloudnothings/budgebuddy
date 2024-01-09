import { Card } from "@/components/ui/card"
import AssignableMoneyDropdown from "./assignable-money-dropdown"

export default async function AssignableMoney() {
  const AssignableAmount = 242.421
  return (
    <Card className="flex justify-between rounded p-4 gap-12">
      <div className="flex flex-col">
        <span className="font-bold text-xl">${AssignableAmount}</span>
        <span>Ready to Assign</span>
      </div>
      <div className="flex items-center">
        <AssignableMoneyDropdown />
      </div>
    </Card>
  )
}