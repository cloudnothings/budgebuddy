import { auth } from "@/auth";
import { db } from "@/db";
import { unstable_noStore as noStore } from "next/cache";

export async function getTransactionsForAccounts(accountIds: string[]) {
  noStore();
  const data = await auth();
  if (!data) throw new Error("Not logged in");
  return db.transaction.findMany({
    where: {
      financialAccountId: {
        in: accountIds,
      },
      userId: data.user.id,
    },
    include: {
      category: true,
      subTransactions: {
        include: {
          category: true,
          transaction: true,
        },
      },
      payee: true,
      financialAccount: true,
    },
    orderBy: {
      date: "asc",
    },
  });
}
