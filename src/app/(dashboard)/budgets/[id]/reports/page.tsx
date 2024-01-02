import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function ReportsPage({ params }: { params: { id: string } }) {
  const session = await auth()
  if (!session) {
    redirect('/')
  }
  return (
    <>
      <h1>Reports</h1>
    </>
  )
}
