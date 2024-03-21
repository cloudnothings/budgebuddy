"use server";

import { auth } from "@/auth";
import { updateMonthlySubcategoryBudgetAssignedAmount } from "@/data-layer/budgets";
import { db } from "@/db";
import { unstable_noStore as noStore } from "next/cache";

export async function updateMonthlySubcategoryBudgetAssignedAmountAction({
  budgetId,
  monthlyBudgetId,
  assignedAmount,
  month,
  subcategoryId,
}: 
  {budgetId: string,
  monthlyBudgetId: string | null,
  assignedAmount: number,
  month: Date,
  subcategoryId: string,}
) {
  return await updateMonthlySubcategoryBudgetAssignedAmount({
    budgetId,
    monthlySubcategoryBudgetId: monthlyBudgetId ?? undefined,
    amount: assignedAmount,
    categoryId: subcategoryId,
    month
  }
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
