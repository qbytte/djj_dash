// src/server/trpc/router/_app.ts
import { router } from "../trpc";
import { exampleRouter } from "./example";
import { authRouter } from "./auth";
import { categories } from "./categories";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  categories: categories,
});

// export type definition of API
export type AppRouter = typeof appRouter;
