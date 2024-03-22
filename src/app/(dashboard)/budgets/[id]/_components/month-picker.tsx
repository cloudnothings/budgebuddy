import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "lucide-react";
import Link from "next/link";


function MonthPicker({ date, budgetId }: { budgetId: string, date: Date }) {
  return (
    <div className="flex gap-4 items-center h-12">
      <Link
        href={`/budgets/${budgetId}/budget/${encodeURIComponent(
          (new Date(date.getFullYear(), date.getMonth() - 1)).toISOString()
        )}`}
      >
        <ArrowLeftCircleIcon />
      </Link>
      <MonthBox date={date} />
      <Link
        href={`/budgets/${budgetId}/budget/${encodeURIComponent(
          (new Date(date.getFullYear(), date.getMonth() + 1)).toISOString()
        )}`}
      >
        <ArrowRightCircleIcon />
      </Link>
    </div>
  );
}

function MonthBox({ date }: { date: Date }) {
  const monthYearFormat: Intl.DateTimeFormatOptions = { month: "long", year: "numeric" };
  const formattedDate = date.toLocaleDateString("default", monthYearFormat);

  return (
    <div className="flex flex-col w-32">
      <DropdownMenu>
        <DropdownMenuTrigger className="text-xl select-none">
          {formattedDate}
        </DropdownMenuTrigger>
        <DropdownMenuContent>

        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger className="select-none text-xs">Notes</DropdownMenuTrigger>
        <DropdownMenuContent>
          <span>TODO: Note editor for the month</span>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default MonthPicker;
