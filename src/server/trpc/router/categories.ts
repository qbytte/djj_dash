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
          },
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
      },
    });
  }),
  updateCase: publicProcedure
    .input(z.object({
      id: z.string().nullish(),
      stealthNotes: z.string().nullish(),
      notes: z.string().nullish(),
      atention: z.boolean().nullish()
    }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.cases.update({
        where: {
          id: input.id || "",
        },
        data: {
          stealthNotes: input.stealthNotes || "",
          notes: input.notes || "",
          atention: input.atention || false,
        },
      });
    }),
});

