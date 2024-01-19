"use server";

import { auth } from "@/auth";
import { updateMonthlySubcategoryBudgetAssignedAmount } from "@/data-layer/budgets";
import { db } from "@/db";
import { unstable_noStore as noStore } from "next/cache";

export async function updateMonthlySubcategoryBudgetAssignedAmountAction(
  month: Date,
  subcategoryId: string,
  assignedAmount: number,
  monthlyBudgetId: string | null,
) {
  return await updateMonthlySubcategoryBudgetAssignedAmount(
    subcategoryId,
    assignedAmount,
    month,
    monthlyBudgetId ?? undefined,
  );
}
export async function updateCategoryNameAction(
  categoryId: string,
  name: string,
) {
  noStore();
  const user = await auth();

  return await db.category.update({
    where: {
      id: categoryId,
      budget: {
        budgetAccess: {
          some: {
            userId: user?.user.id,
          },
        },
      },
    },
    data: {
      name,
    },
  });
}
export async function getBudgetDataAction(id: string, month: Date) {
  noStore();
  const user = await auth();
  const budget = await db.budget.findFirst({
    where: {
      id,
      budgetAccess: {
        some: {
          userId: user?.user.id,
        },
      },
    },
    include: {
      budgetAccess: true,
      categories: {
        where: {
          parentCategoryId: null,
        },
        include: {
          subCategories: {
            include: {
              MonthlySubcategoryBudget: {
                where: {
                  month: {
                    equals: month,
                  },
                },
              },
            },
          },
        },
      },
    },
  });
  return budget?.categories;
}
