
import { authRouter } from "./auth-router";
import { publicProcedure, router, t, protectedProcedure } from "./trpc";
import { getMeHandler } from "./user-controller";
import { createContext } from "./trpc-context";
import { productRouter } from "./product-router";
const userRouter = t.router({
  getMe: protectedProcedure.query(({ ctx }) => getMeHandler({ ctx })),
});

export const appRouter = router({
  auth: authRouter,
  user: userRouter,
  product: productRouter,
  testRouter: publicProcedure.query(async () => {
    return "hello from test router trpc";
  }),

});
export const createCaller = t.createCallerFactory(appRouter);

export const createAsyncCaller = async () => {
  const context = await createContext();
  return createCaller(context);
};

export type AppRouter = typeof appRouter;
