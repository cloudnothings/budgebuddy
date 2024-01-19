import { auth } from "@/auth"
import { getAccounts as getAllAccounts } from "@/data-layer/financialAccount"
import { redirect } from "next/navigation"
import TransactionView from "./_components/transaction-view"

export default async function AccountsPage() {
  const session = await auth()
  if (!session) {
    redirect('/')
  }
  const accounts = await getAllAccounts()

  return (
    <TransactionView />
  )
}
