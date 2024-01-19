"use server"

import { createAccount } from "@/data-layer/financialAccount"
import { accountCreationFormSchema } from "@/lib/forms"
import { z } from "zod"

export async function createAccountAction(values:z.infer<typeof accountCreationFormSchema>) { 
  await createAccount(values)
}