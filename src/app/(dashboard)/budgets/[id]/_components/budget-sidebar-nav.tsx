"use client"

import { buttonVariants } from "@/components/ui/button"
import { usePathname } from "next/navigation";
import AccountCreationDialog from "../accounts/_components/account-creation";
import { FinancialAccount } from "@prisma/client";
import { BarChart4Icon, LandmarkIcon, LucideIcon, PencilIcon, WalletIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

export default function BudgetSidebarNav({ params, accounts }: { params: { id: string }, accounts: FinancialAccount[], }) {
  const pathname = usePathname();

  const sidebarLinks = useMemo(() => {
    const defaultLinks = [
      {
        path: `/budgets/${params.id}`,
        name: 'Overview',
        isActive: pathname === `/budgets/${params.id}`,
        Icon: LandmarkIcon,
        type: 'overview'
      },
      {
        path: `/budgets/${params.id}/transactions`,
        name: 'Transactions',
        isActive: pathname === `/budgets/${params.id}/transactions`,
        Icon: WalletIcon,
        type: 'transactions'
      },
      {
        path: `/budgets/${params.id}/categories`,
        name: 'Categories',
        isActive: pathname === `/budgets/${params.id}/categories`,
        Icon: BarChart4Icon,
        type: 'categories'
      }
    ]
    return [...defaultLinks, ...accounts.map(account => ({
      path: `/budgets/${params.id}/accounts/${account.id}`,
      name: account.name,
      isActive: pathname === `/budgets/${params.id}/accounts/${account.id}`,
      Icon: PencilIcon,
      type: 'custom'
    }))]
  }, [params.id, pathname])


  return (
    <div className="flex-1 flex-col gap-2 min-h-full p-2">
      <div className="space-y-1">
        {sidebarLinks.map((stuff, i) => (
          <ButtonLinks key={i} {...stuff} />
        ))}
        <AccountCreationDialog budgetId={params.id} />
      </div>
    </div>
  );
}

const ButtonLinks = ({ name, path, isActive, type, Icon }: {
  name: string, path: string, isActive: boolean, type: string, Icon: LucideIcon
}) => {
  return (
    <Link
      className={cn(
        buttonVariants({ variant: isActive ? 'secondary' : 'ghost' }),
        'group w-full flex justify-start items-center transition-none overflow-hidden',
        type === 'custom' ? 'cursor-pointer' : ''
      )}
      href={path}
    >
      {type === 'custom' ? (
        <div className="flex items-center w-full">
          <button onClick={(e) => e.preventDefault()}>
            <Icon className="mr-2 h-4 w-4 flex-shrink-0 opacity-0 group-hover:opacity-100" />
          </button>
          <span className="truncate">
            {name}
          </span>
        </div>
      ) : (
        <>
          <Icon className={cn(
            "mr-2 h-4 w-4 flex-shrink-0",
            type === 'custom' ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
          )} />
          <span className="truncate">
            {name}
          </span>
        </>
      )}
    </Link>
  )
}