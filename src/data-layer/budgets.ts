import { auth } from "@/auth";
import { db } from "@/db";
import { unstable_noStore as noStore } from "next/cache";

export async function getBudget(id: string, userId: string) {
  noStore();
  return await db.budget.findFirst({
    where: {
      id,
      budgetAccess: {
        some: {
          userId,
        },
      },
    },
    include: {
      budgetAccess: true,
    },
  });
}
export async function updateMonthlySubcategoryBudgetAssignedAmount({
  budgetId,
  categoryId,
  amount,
  month,
  monthlySubcategoryBudgetId,
}:
  {budgetId: string,
  categoryId: string,
  amount: number,
  month: Date,
  monthlySubcategoryBudgetId?: string,}
) {
  noStore();
  if (monthlySubcategoryBudgetId) {
    return await db.monthlySubcategoryBudget.update({
      where: {
        id: monthlySubcategoryBudgetId,
      },
      data: {
        assigned: amount,
      },
    });
  }
  const exists = await db.monthlySubcategoryBudget.findFirst({
    where: {
      month,
      subcategory: {
        id: categoryId,
      },
    },
  });
  if (exists) {
    return await db.monthlySubcategoryBudget.update({
      where: {
        id: exists.id,
      },
      data: {
        assigned: amount,
      },
    });
  }
  return await db.monthlySubcategoryBudget.create({
    data: {
      assigned: amount,
      month,
      subcategory: {
        connect: {
          id: categoryId,
        },
      },
      budget: {
        connect: {
          id: budgetId,
        },
      },
    },
  });
}
export async function getBudgetData(id: string, month?: Date) {
  noStore();
  const user = await auth();
  const selectedMonth =
    month ?? new Date(new Date().getFullYear(), new Date().getMonth());
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
                take: 1,
                where: {
                  month: selectedMonth,
                },
              },
              transactions: {
                where: {
                  date: {
                    gte: selectedMonth,
                    lt: new Date(
                      selectedMonth.getFullYear(),
                      selectedMonth.getMonth() + 1,
                    ),
                  },
                },
              },
            },
          },
        },
      },
    },
  });
  return { ...budget, selectedMonth };
}
export async function getBudgetsForUser(userId: string) {
  noStore();
  return await db.budget.findMany({
    where: {
      budgetAccess: {
        some: {
          userId,
        },
      },
    },
    include: {
      budgetAccess: true,
    },
  });
}

export async function createDefaultBudget(name: string, userId: string) {
  noStore();
  const budget = await db.budget.create({
    data: {
      name,
      budgetAccess: {
        create: {
          userId,
          role: "OWNER",
        },
      },
      ownerId: userId,
    },
  });
  for (const category of DEFAULT_CATEGORIES) {
    const parentCategory = await db.category.create({
      data: {
        name: category.category,
        budgetId: budget.id,
      },
    });
    for (const subCategory of category.subcategories) {
      await db.category.create({
        data: {
          name: subCategory,
          budgetId: budget.id,
          parentCategoryId: parentCategory.id,
        },
      });
    }
  }
  return budget.id;
}
const DEFAULT_CATEGORIES = [
  {
    category: "Bills",
    subcategories: [
      "Rent",
      "Water",
      "Gas/Heating",
      "Electricity",
      "Garbage",
      "Internet",
      "Auto loans",
      "Auto insurance",
      "Health insurance",
      "Music streaming",
      "Video streaming",
    ],
  },
  {
    category: "Needs",
    subcategories: [
      "Groceries",
      "Annual credit card fees",
      "Gas",
      "Auto maintenance",
      "Home maintenance",
      "Investments",
      "Personal care",
      "Pet insurance",
      "Pet food",
      "Pet boarding",
      "Pet grooming",
      "Pet toys and treats",
    ],
  },
  {
    category: "Wants",
    subcategories: [
      "Dining out",
      "Entertainment",
      "Vacation",
      "Video Games",
      "Gifts",
      "Clothing",
      "Charity",
      "Alcohol",
      "Tobacco",
      "Holidays/Celebrations",
    ],
  },
] as const;
