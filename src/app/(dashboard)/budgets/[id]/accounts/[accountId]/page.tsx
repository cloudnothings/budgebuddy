import { auth } from "@/auth"

import { redirect } from "next/navigation"

import { getAccount } from "@/data-layer/financialAccount"
import TransactionView from "../_components/transaction-view"

export default async function AccountsPage({ params }: { params: { id: string, accountId: string } }) {
  const session = await auth()
  if (!session) {
    redirect('/')
  }
  const accounts = await getAccount(params.accountId)

  return (
    <TransactionView accounts={accounts} />
  )
}
