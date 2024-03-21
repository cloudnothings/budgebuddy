"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AccountCreationDialog from "../accounts/_components/account-creation";
import { FinancialAccount } from "@prisma/client";

export default function BudgetSidebarNav({ params, accounts }: { params: { id: string }, accounts: FinancialAccount[], }) {
  const pathname = usePathname();

  // Enhanced paths list to include accounts with a dynamic check for the 'accounts' link.
  const enhancedPaths = [
    ...['budget', 'reports', 'accounts'].map(path => ({
      path: `/budgets/${params.id}/${path}`,
      name: path,
      isActive: path === 'accounts' ? pathname === `/budgets/${params.id}/accounts` : pathname.startsWith(`/budgets/${params.id}/${path}`),
    })),
    ...accounts.map(account => ({
      path: `/budgets/${params.id}/accounts/${account.id}`,
      name: account.name,
      isActive: pathname.startsWith(`/budgets/${params.id}/accounts/${account.id}`),
    })),
  ];

  return (
    <div className="flex flex-col gap-2 min-h-full p-2">
      {enhancedPaths.map(({ path, name, isActive }) => (
        <Link href={path} key={name}>
          <Button className="w-full" variant={isActive ? 'default' : 'ghost'}>
            {name}
          </Button>
        </Link>
      ))}
      <AccountCreationDialog budgetId={params.id} />
    </div>
  );
}