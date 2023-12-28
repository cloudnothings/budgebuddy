import Navbar from "@/components/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type Budget } from "@prisma/client";
import Link from "next/link";

export default async function BudgetListView({ budgets }: { budgets: Budget[] }) {
  return (
    <>
      <Navbar />
      <Card>
        <CardHeader>
          <CardTitle>
            Your Budgets
          </CardTitle>
        </CardHeader>
        <CardContent>
          {budgets.map(budget => (
            <Link href={`/dashboard/${budget.id}`} key={budget.id}>
              <Card>
                <CardHeader>
                  <CardTitle>
                    {budget.name}
                  </CardTitle>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </CardContent>
      </Card>
    </>
  )
}