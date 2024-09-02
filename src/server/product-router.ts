import { adminProcedure, protectedProcedure, publicProcedure, router } from "./trpc";
import { connectToDB } from "@/lib/mongodb";
import z from "zod";
import { TRPCError } from "@trpc/server";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { ProductFileValidator } from "@/lib/validators/ProductFileValidator";
export const productRouter = router({
    // createProduct: adminProcedure.input(String).mutation(async ({input}) => {
    //     try{
    //         console.log("gotcha");
    //     } catch (err) {
    //         console.log("didn't getchya", err)
    //     }
    // })

})
    

