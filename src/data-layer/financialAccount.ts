import { auth } from "@/auth";
import { db } from "@/db";
import { accountCreationFormSchema } from "@/lib/forms";
import { unstable_noStore as noStore } from "next/cache";
import { z } from "zod";

export async function getAccounts(budgetId: string) {
  noStore();
  const data = await auth();
  return db.financialAccount.findMany({
    where: {
      userId: data?.user.id,
      budgetId,
    },
  });
}

export async function getAccount(id: string) {
  noStore();
  const data = await auth();

  if (!data) throw new Error("Not logged in");
  return db.financialAccount.findMany({
    where: {
      userId: data.user.id,
      id,
    },
  });
}

interface CreateAccountParams
  extends z.infer<typeof accountCreationFormSchema> {
  budgetId: string;
}
export async function createAccount({
  name,
  balance,
  type,
  budgetId,
}: CreateAccountParams) {
  noStore();
  const data = await auth();
  if (!data) throw new Error("Not logged in");
  const date = new Date();
  const account = await db.financialAccount.create({
    data: {
      name,
      balance,
      type,
      userId: data?.user.id,
      budgetId,
    },
  });
  let payee = await db.payee.findFirst({
    where: {
      name: "Starting Balance",
      userId: data.user.id,
    },
  });
  if (!payee) {
    payee = await db.payee.create({
      data: {
        name: "Starting Balance",
        userId: data.user.id,
      },
    });
  }
  await db.transaction.create({
    data: {
      amount: balance,
      financialAccountId: account.id,
      budgetId,
      date,
      userId: data.user.id,
      cleared: true,
      payeeId: payee.id,
    },
  });
  return account;
}
