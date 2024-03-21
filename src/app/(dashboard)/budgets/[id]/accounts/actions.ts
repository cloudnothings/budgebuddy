"use server"

import { createAccount, getAccount, getAccounts } from "@/data-layer/financialAccount"
import { getTransactionsForAccounts } from "@/data-layer/transactions";
import { accountCreationFormSchema } from "@/lib/forms"
import { z } from "zod"

interface CreateAccountParams extends z.infer<typeof accountCreationFormSchema> {
  budgetId: string;
}

export async function createAccountAction(values: CreateAccountParams) { 
  return await createAccount(values)
}

export async function getAccountsAction(budgetId:string) {
  return await getAccounts(budgetId)
}

export async function getAccountAction(id: string) {
  return await getAccount(id)
}

export async function getTransactionsForAccountsAction(accountIds: string[]) {
  return await getTransactionsForAccounts(accountIds)
}
