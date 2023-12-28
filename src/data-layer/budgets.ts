import { db } from "@/db";
import { unstable_noStore } from "next/cache";

export async function getBudget(id: string, userId: string) {
  unstable_noStore();
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
      categories: {
        include: {
          subCategories: true,
        },
      },
    },
  });
}
export async function getBudgetsForUser(userId: string) {
  unstable_noStore();
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

export async function createBudget(name: string, userId: string) {
  const budget = await db.budget.create({
    data: {
      name,
      budgetAccess: {
        create: {
          userId,
          role: "OWNER",
        },
      },
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
