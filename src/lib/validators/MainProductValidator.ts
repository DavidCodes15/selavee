import {z} from "zod"

export const MainProductValidator = z.object({
    firstProduct: z.string(),
    secondProduct: z.string(),
    thirdProduct: z.string(),
    fourthProduct: z.string(),
}).extend({
    // Accept dynamic secondary image keys
    secondaryImages: z.array(z.string()).optional(),
  });