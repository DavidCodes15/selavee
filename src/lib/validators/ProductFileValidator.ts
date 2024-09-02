import {z} from "zod"

export const ProductFileValidator = z.object({
    name: z.string(),
    contentType: z.string(),
    size: z.string(),

})