import { inferAsyncReturnType } from "@trpc/server";
import { checkAdmin } from "./admin-middleware";

export const adminContext = async () => checkAdmin();
export type AdminContext = inferAsyncReturnType<typeof adminContext>