import { router, publicProcedure } from "../trpc";

export const categories = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.customer.findMany({
      include: {
        cases: true,
      },
    });
  }),
});
