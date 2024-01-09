import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "lucide-react"
export default async function MonthPicker() {
  return (
    <div className="flex gap-4 items-center h-12">
      <button>
        <ArrowLeftCircleIcon />
      </button>
      <MonthBox />
      <button>
        <ArrowRightCircleIcon />
      </button>
    </div>
  )
}


export async function MonthBox() {
  return (
    <div className="flex flex-col">
      <DropdownMenu>
        <DropdownMenuTrigger className="text-xl select-none">Jan 2024</DropdownMenuTrigger>
        <DropdownMenuContent>
          <span>TODO: Date picker</span>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger className="select-none text-xs">Notes</DropdownMenuTrigger>
        <DropdownMenuContent>
          <span>TODO: Note editor for the month</span>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}