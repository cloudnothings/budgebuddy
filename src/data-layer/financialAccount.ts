import { auth } from "@/auth";
import { db } from "@/db";
import { accountCreationFormSchema } from "@/lib/forms";
import { unstable_noStore as noStore } from "next/cache";
import { z } from "zod";

export async function getAccounts() {
  noStore();
  const data = await auth();
  return db.financialAccount.findMany({
    where: {
      userId: data?.user.id,
    },
  });
}

export async function createAccount({ name, balance, type }: z.infer<typeof accountCreationFormSchema>) {
  noStore();
  const data = await auth();
  if (!data) throw new Error("Not logged in");
  await db.financialAccount.create({
    data: {
      name,
      balance,
      type,
      userId: data?.user.id,
    },
  })
}