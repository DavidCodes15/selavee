"use server";

import { checkAdmin } from "./admin-middleware";

export const getAdmin = async () => {
    const caller = await checkAdmin();
    return caller;
}