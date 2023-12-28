"use server";

import { auth } from "@/auth";
import { createBudget } from "@/data-layer/budgets";
import { redirect } from "next/navigation";

export async function createBudgetAction(formData: FormData) {
  const session = await auth();
  if (!session) {
    return { error: "Not logged in" };
  }
  const name = (formData.get("name") as string).trim();

  if (!name) {
    return { error: "No name provided" };
  }
  if (name.length > 24) {
    return { error: "Max length is 24 characters" };
  }
  const budget = await createBudget(name, session.user.id);
  redirect(`/budgets/${budget}`);
}
