import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const categories = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.customer.findMany({
      include: {
        cases: true,
      },
    });
  }),
  getCustomer: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.customer.findUnique({
      where: {
        id: input,
      },
      include: {
        cases: {
          orderBy: {
            id: "desc",
          }
        },
        sites: true,
      },
      
    });
  }),
  getAllCases: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.cases.findMany({
      include: {
        customer: true,
        site: true,
      },
      orderBy: {
        id: "desc",
      }
    });
  }),
});
