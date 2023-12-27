import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

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

export const budgetRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.budget.findMany({
      where: {
        budgetAccess: {
          some: {
            userId: ctx.session.user.id,
          },
        },
      },
      include: {
        budgetAccess: true,
      },
    });
  }),
  create: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const budget = await ctx.db.budget.create({
        data: {
          name: input.name,
          budgetAccess: {
            create: {
              userId: ctx.session.user.id,
              role: "OWNER",
            },
          },
        },
      });
      for (const category of DEFAULT_CATEGORIES) {
        const parentCategory = await ctx.db.category.create({
          data: {
            name: category.category,
            budgetId: budget.id,
          },
        });
        for (const subCategory of category.subcategories) {
          await ctx.db.category.create({
            data: {
              name: subCategory,
              budgetId: budget.id,
              parentCategoryId: parentCategory.id,
            },
          });
        }
      }
      return budget.id;
    }),
  get: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.budget.findFirst({
        where: {
          id: input.id,
          budgetAccess: {
            some: {
              userId: ctx.session.user.id,
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
    }),
});
