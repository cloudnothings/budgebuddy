import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const budgetRouter = createTRPCRouter({
  create: protectedProcedure.input(z.object({})).mutation(async ({ ctx }) => {
    return {
      id: "1",
      name: "test",
      amount: 100,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }),
});
