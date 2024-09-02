import {initTRPC, TRPCError} from "@trpc/server";
import { Context } from "./trpc-context";
import { AdminContext } from "./admin/admin-context";
export const t = initTRPC.context<Context>().create()
export const admin = initTRPC.context<AdminContext>().create();
const isAdmin = admin.middleware(({ next, ctx }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You must be admin to access this resource',
    });
  }
  return next();
});
const isAuthed = t.middleware(({ next, ctx }) => {
    if (!ctx.user) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'You must be logged in to access this resource',
      });
    }
    return next();
  });
// const t = initTRPC.create();

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);
export const adminProcedure = admin.procedure.use(isAdmin);