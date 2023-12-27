/**
 * v0 by Vercel.
 * @see https://v0.dev/t/4Nl7bjzf2sn
 */
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CardStackPlusIcon } from "@radix-ui/react-icons"

export default function NoBudgetsView() {
  return (
    <main className="flex flex-col justify-center items-center h-screen bg-[#f1f5f9]">
      <Card className="max-w-md w-full">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl text-center">Welcome to Budget Planner</CardTitle>
          <CardDescription className="text-gray-500 text-center">
            Create your first budget to start planning your finances.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <CardStackPlusIcon className="w-20 h-20 mb-4 text-gray-400" />
          <p className="mb-4 text-center text-gray-600">
            You have no budgets yet. Click the button below to create one.
          </p>
          <Link className="self-stretch" href="#">
            <Button className="w-full h-12 text-white bg-[#3b82f6] hover:bg-[#2563eb]">Create Budget</Button>
          </Link>
        </CardContent>
      </Card>
    </main>
  )
}

