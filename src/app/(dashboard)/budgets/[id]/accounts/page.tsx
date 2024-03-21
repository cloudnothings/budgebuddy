import { auth } from "@/auth"

import { redirect } from "next/navigation"
import TransactionView from "./_components/transaction-view"
import { getAccounts } from "@/data-layer/financialAccount"

export default async function AccountsPage({ params }: { params: { id: string } }) {
  const session = await auth()
  if (!session) {
    redirect('/')
  }
  const accounts = await getAccounts(params.id)

  return (
    <TransactionView accounts={accounts} />
  )
}
