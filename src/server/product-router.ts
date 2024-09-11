import { connectToDB } from "@/lib/mongodb";
import { ProductFileValidator } from "@/lib/validators/ProductFileValidator";
import { adminProcedure, protectedProcedure, publicProcedure, router } from "./trpc";
import { z } from "zod"
import { ObjectId } from "mongodb";
import { TRPCError } from "@trpc/server";
import { ProductFilterValidator } from "@/lib/validators/ProductFilterValidator";
import { MainProductValidator } from "@/lib/validators/MainProductValidator";
const stoneTypeMapping: Record<string, string> = {
    "ruby-stone": "Ruby",
    "emerald-stone": "Emerald",
    "diamond-stone": "Diamond",
    "blue-sapphires-stone": "Blue Sapphire",
    "pink-sapphires-stone": "Pink Sapphire"
};
export const productRouter = router({
    createProduct: adminProcedure.input(ProductFileValidator).mutation(async ({ input }) => {
        try {
            const db = await connectToDB();
            console.log(input);
            await db!.collection("products").insertOne(input);
            return {
                success: true,
            };
        } catch (error) {
            console.error("Error during inserting the product:", error);
            throw new Error("Failed to insert product.");
        }
    }),
    createMainPageProduct: adminProcedure.input(MainProductValidator).mutation(async ({input}) => {
        try{
            const db = await connectToDB();
            console.log(input);
            await db!.collection("mainProducts").insertOne(input);
            return {
                success: true,
            };
        } catch(err){
            console.error("Error during inserting the product:", err);
            throw new Error("Failed to insert product.");
        }
    }),
    fetchMainPageProducts: publicProcedure.query(async () => {
        try{
            const db = await connectToDB();
            const products = await db!.collection("mainProducts").find({}).toArray();
            return {
                success: true,
                products,
            }
        } catch (err) {
            console.error("Error during fetching the product:", err);
            throw new Error("Failed to fetching product.");
        }
    }),
    deleteMainPageProducts: adminProcedure.mutation(async () => {
        try{
            const db = await connectToDB();
            const deletion = await db!.collection("mainProducts").deleteMany({});
            return {
                success: true,
                deletion,
            }

        } catch (err) {
            console.error("Error during deleting the product:", err);
            throw new Error("Failed to delete product.");
        }
    }),
    deleteAboutUsText: adminProcedure.mutation(async () => {
        try{
            const db = await connectToDB();
            const deletion = await db!.collection("aboutUsText").deleteMany({});
            return {
                success: true,
                deletion,
            }

        } catch (err) {
            console.error("Error during deleting the about us text:", err);
            throw new Error("Failed to delete about us text.");
        }
    }),
    createAboutUsText: adminProcedure.input(z.object({
        firstText: z.string(),
        secondText: z.string(),
        thirdText: z.string(),
        fourthText: z.string(),
    })).mutation(async ({input}) => {
        try{
            const db = await connectToDB();
            // const {firstText, secondText, thirdText, fourthText} = input;
            await db!.collection("aboutUsText").insertOne(input);
            return {
                success: true,
            };
        } catch (err) {
            console.error("Error during creating the about us text:", err);
            throw new Error("Failed to create about us text.");
        }
    }),
    fetchAboutUsText: publicProcedure.query(async () => {
        try{
            const db = await connectToDB();
            const texts = await db!.collection("aboutUsText").find({}).toArray();
            return{
                success: true,
                texts,
            }
        } catch (err){
            console.error("Error during fetcing the about us text:", err);
            throw new Error("Failed to fetch about us text.");
        } 
    }),
    fetchProductsByCategory: publicProcedure.input(z.object({
        selectedCategory: z.string().optional(),
        page: z.number().default(1),
        limit: z.number().default(9),
    })).query(async ({ input }) => {
        const { selectedCategory, page, limit } = input;
        const query = selectedCategory ? { productCategory: selectedCategory } : {};
        const db = await connectToDB();
        const products = await db!.collection("products").find(query).skip((page - 1) * limit).limit(limit).toArray();
        console.log(products);
        const totalProducts = await db!.collection("products").countDocuments(query);
        return {
            products,
            totalPages: Math.ceil(totalProducts / limit),
            currentPage: page,
        }
    }),
    fetchSpecificProduct: publicProcedure.input(z.object({
        productId: z.string(),
    })).query(async ({ input }) => {
        const { productId } = input;
        const db = await connectToDB();
        // const query = productId ? { _id: productId } : {};
        const specificProduct = await db!.collection("products").findOne({ _id: new ObjectId(productId) });
        if (!specificProduct) {
            throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        }

        return {
            success: true,
            specificProduct
        };
    }),
    likedProducts: protectedProcedure.input(z.object({
        userId: z.string(),
        productId: z.string(),
    })).mutation(async ({ input }) => {
        // const {userId, productId} = input;
        // console.log(userId, productId);
        try {
            const db = await connectToDB();
            await db!.collection("likedProducts").insertOne(input);
            return {
                success: true,
            }
        } catch (error) {
            console.error("Error during inserting the liked product:", error);
            throw new Error("Failed to insert liked product.");
        }

    }),
    dislikeProduct: protectedProcedure.input(z.object({
        userId: z.string(),
        productId: z.string(),
    })).mutation(async ({ input }) => {
        try {
            const db = await connectToDB();
            const { userId, productId } = input;
            console.log(userId, productId);
            const deletion = await db!.collection("likedProducts").deleteOne({ userId, productId });
            console.log(deletion);
            // await db!.collection("likedProducts").deleteOne({userId, productId});
            return {
                success: true,
            }
        } catch (err) {
            console.log("error during finding a product and disliking it.", err);
            throw new Error("Failed to dislike a product");
        }
    }),
    checkLikedProduct: protectedProcedure.input(z.object({
        userId: z.string(),
    })).query(async ({ input }) => {
        const { userId } = input;
        const db = await connectToDB();
        const likedProducts = await db!.collection("likedProducts").find({ userId }).toArray();
        return {
            success: true,
            likedProducts,
        };
    }),
    addToBag: protectedProcedure.input(z.object({
        userId: z.string(),
        productId: z.string(),
        quantity: z.number().int(),
        totalPrice: z.number().positive(),
        selectedColor: z.string(),
        size: z.string(),
        price: z.string(),
        productUrl: z.string(),
    })).mutation(async ({ input }) => {
        try {
            const db = await connectToDB();
            const { userId, productId, quantity, totalPrice, selectedColor, size, price, productUrl } = input;
            await db!.collection("bag").insertOne({ userId, productId, quantity, totalPrice, selectedColor, size, price, productUrl });
            return {
                success: true,
            }
        } catch (err) {
            console.log("something went wrong", err);
        }
    }),
    checkTheBag: protectedProcedure.input(z.object({
        userId: z.string(),
    })).query(async ({ input }) => {
        try {
            const db = await connectToDB();
            const { userId } = input;
            console.log(userId);
            const checked = await db!.collection("bag").find({ userId: userId }).toArray();
            console.log(checked);
            return {
                success: true,
                checked
            }
        } catch (err) {
            console.log("something went wrong", err);
        }

    }),
    fetchProductsByIds: publicProcedure
        .input(z.object({
            productIds: z.array(z.string()), // Array of product IDs as strings
        }))
        .query(async ({ input }) => {
            const { productIds } = input;
            const db = await connectToDB();

            try {
                // Convert string productIds to ObjectId
                const objectIdArray = productIds.map((id) => new ObjectId(id));

                // Fetch products matching the array of ObjectIds
                const products = await db!.collection("products").find({ _id: { $in: objectIdArray } }).toArray();

                if (!products || products.length === 0) {
                    throw new TRPCError({ code: "NOT_FOUND", message: "No products found" });
                }

                return {
                    success: true,
                    products,
                };
            } catch (error) {
                console.error("Error fetching products by IDs:", error);
                throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to fetch products" });
            }
        }),

    filteredProductsBy: publicProcedure.input(z.object({
        style: z.string().optional(),
        metal: z.string().optional(),
        type: z.string().optional(),
    })).query(async ({ input }) => {
        try {
            const db = await connectToDB();
            const { style, metal, type } = input;
            console.log("style, metal, type", style, metal, type);
            console.log(style, metal, type);
            if ((style !== '') && (type !== '')) {
                const filteredProducts = await db!.collection("products").find({ productStyleCode: style, productStoneType: type }).toArray();
                return {
                    success: true,
                    filteredProducts,
                }
            }
            if (style !== '') {
                console.log("style is not emtpy")
                 const filteredProducts = await db!.collection("products").find({ productStyleCode: style }).toArray();
                return {
                    success: true,
                    filteredProducts,
                }
            }
            if (type !== '') {
                const filteredProducts = await db!.collection("products").find({ productStoneType: type }).toArray();
                return {
                    success: true,
                    filteredProducts,
                }
            }
        } catch (err) {
            console.log("something went wrong", err);
        }
    }),
    filteredProducts: publicProcedure.input(ProductFilterValidator).query(async ({input}) => {
        try {
            const db = await connectToDB();
            const { category, style, stone_type, stone_shape  } = input;
    
            // Initialize query object
            const query: any = {};
    
            // Filtering by product category
            if (category.length > 0 && !category.includes("All")) {
                query.productCategory = { $in: category };
            }
            if (input.style?.length > 0) {
                query.productStyleCode = { $in: input.style };
            }
            // if (input.metal?.length > 0) {
            //     query.productMetalPurity = { $in: input.metal };
            // }
            if (input.metal?.length > 0) {
                query.$or = [];
    
                // Add conditions based on the selected metals
                if (input.metal.includes("white")) {
                    query.$or.push({ silverGold: { $exists: true } });
                }
                if (input.metal.includes("yellow")) {
                    query.$or.push({ yellowGold: { $exists: true } });
                }
                if (input.metal.includes("rose")) {
                    query.$or.push({ pinkGold: { $exists: true } });
                }
            }
            // if (stone_type?.length > 0) {
            //     query.productStoneType = {
            //         $in: stone_type.map((type: string) => new RegExp(`^${type}$`, 'i')) // Case-insensitive regex
            //     };
            // }
            if (stone_type?.length > 0) {
                const mappedStoneTypes = stone_type.map((type: string) => stoneTypeMapping[type] || type);
                query.productStoneType = { $in: mappedStoneTypes };
            }
            // Filtering by stone_shape with case-insensitivity
            if (stone_shape?.length > 0) {
                query.productStoneShape = {
                    $in: stone_shape.map((shape: string) => new RegExp(`^${shape}$`, 'i')) // Case-insensitive regex
                };
            }
    
    
            // Log the query for debugging
            console.log("Constructed Query:", query);
    
            // Fetching filtered products from the database
            const filteredProducts = await db!.collection("products")
                .find(query)
                .toArray();
    
            // Return the filtered products
            console.log("filtered products", filteredProducts)
            return {
                success: true,
                filteredProducts,
            };
    
           
    
        } catch (err) {
            console.error("Error during filtering products:", err);
            throw new Error("Failed to fetch filtered products.");
        }
    }),
    deleteSpecificProduct: adminProcedure.input(z.object({
        id: z.string(),
    })).mutation(async ({input}) => {
        try{
            const db = await connectToDB();
            const {id} = input;
            const deletion = await db!.collection("products").findOneAndDelete({_id: new ObjectId(id)});
            return {
                success: true,
                deletion,
            }
        } catch (err) {
            console.error("Error during deleting a product:", err);
            throw new Error("Failed to delete a product.");
        }
    }) 



})


