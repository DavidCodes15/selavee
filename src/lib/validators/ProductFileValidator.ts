import {z} from "zod"

export const ProductFileValidator = z.object({
    
        productCategory: z.string(),
        productName: z.string(),
        completeSet: z.string(),
        otherCreations: z.string(),
        productDetail: z.string(),
        productStyleCode: z.string(),
        productDimensions: z.string(),
        productDiamondPurity: z.string(),
        productDiamondGrossWeight: z.string(),
        productDiamondPcs: z.string(),
        productMetalPurity: z.string(),
        productMetalGrossWeight: z.string(),
        productStoneShape: z.string(),
        productStoneType: z.string(),
        mainProductImage: z.string(),
        mainModelImage: z.string(),
        pinkGold: z.string(),
        yellowGold: z.string(),
        silverGold: z.string(),
        sizes: z.array(
          z.object({
            size: z.string(),
            price: z.string(),
          })
        ),
        // Accept dynamic secondary image keys
       
}).extend({
    // Accept dynamic secondary image keys
    secondaryImages: z.array(z.string()).optional(),
  });