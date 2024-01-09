import { Button } from "@/components/ui/button";

export default async function BudgetViewSelector() {

  return (
    <div className="flex gap-2 px-2">
      <Button size={"sm"}>
        All
      </Button>
      <Button size={"sm"}>
        Underfunded
      </Button>
      <Button size={"sm"}>
        Overfunded
      </Button>
    </div>
  )
}