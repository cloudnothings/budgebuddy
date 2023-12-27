import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

const DEFAULT_CATEGORIES = [
  {
    parent: "Bills",
    children: [
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
    parent: "Needs",
    children: [
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
    parent: "Wants",
    children: [
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
  create: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.$transaction(async (prisma) => {
        const budget = await prisma.budget.create({
          data: {
            name: input.name,
          },
        });
        // Create parent categories first
        DEFAULT_CATEGORIES.map(async (category) => {
          const parent = await prisma.category.create({
            data: {
              name: category.parent,
              budgetId: budget.id,
            },
          });
          category.children.map(async (child) => {
            await prisma.category.create({
              data: {
                name: child,
                parentCategoryId: parent.id,
                budgetId: budget.id,
              },
            });
          });
        });

        await prisma.budgetAccess.create({
          data: {
            role: "OWNER",
            userId: ctx.session.user.id,
            budgetId: budget.id,
          },
        });
        return budget.id;
      });
    }),
  get: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const permissions = await ctx.db.budgetAccess.findUnique({
          where: {
            userId_budgetId: {
              userId: ctx.session.user.id,
              budgetId: input.id,
            },
          },
        });
        if (!permissions) {
          throw new Error("No permissions");
        }
        return await ctx.db.budget.findUnique({
          where: { id: input.id },
          include: {
            budgetAccess: true,
            categories: {
              include: {
                parentCategory: {
                  include: {
                    subCategories: true,
                  },
                },
              },
            },
          },
        });
      } catch (e) {
        throw new TRPCError({
          code: "NOT_FOUND",
        });
      }
    }),
});
