import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AccountCreationDialog from "../accounts/_components/account-creation";

export default function BudgetSidebarNav({ params, isCollapsed }: { params: { id: string }, isCollapsed?: boolean }) {
  const paths = [
    'budget',
    'reports',
    'accounts'
  ]
  const pathname = usePathname()

  return (
    <div className="flex flex-col gap-2 min-h-full p-2 ">
      {paths.map(path => {
        const isActive = pathname.startsWith(`/budgets/${params.id}/${path}`)
        return (
          <Link href={`/budgets/${params.id}/${path}`} key={path}>
            <Button className='w-full' variant={isActive ? 'default' : 'ghost'}>
              {path}
            </Button>
          </Link>
        )
      })}
      {!isCollapsed && <AccountCreationDialog />}
    </div>

  )
}