import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function AccountsPage({ params }: { params: { id: string } }) {
  const session = await auth()
  if (!session) {
    redirect('/')
  }
  return (
    <>
      <h1>Accounts</h1>
    </>
  )
}
