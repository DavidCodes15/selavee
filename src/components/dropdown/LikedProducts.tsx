"use client";
import { trpc } from "@/app/trpc/client";
import { useEffect, useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
    DropdownMenuItem,
} from "../ui/dropdown-menu";
import Image from "next/image";
type User = {
    _id: string;
    email?: string;
    [key: string]: any;
};
import Link from "next/link";

const LikedProducts = ({ theme, user }: { theme: string, user: User | "not authorized" | null }) => {
    const { data, isLoading } = trpc.product.checkLikedProduct.useQuery(
        user && typeof user !== "string" ? { userId: user._id } : undefined as never,
        {
            enabled: !!user && typeof user !== "string", // Only run query if user is authenticated
            onSuccess: (data) => {
                console.log("liked products: ", data);
            },
            onError: (err) => {
                console.error("liked products: ", err);
            },
        }
    );
    const productIds = data?.likedProducts.map((likedProduct) => likedProduct.productId) || [];

    // Step 3: Use a single useQuery to fetch all the products based on those productIds
    const { data: productsData, isLoading: isProductsLoading } = trpc.product.fetchProductsByIds.useQuery(
        { productIds }, // Using the new endpoint
        {
            enabled: productIds.length > 0,
        }
    );
    
    console.log("liked product ids", data);
    console.log("whole products", productsData);
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="icon">
                <Image
                    src="/icons/heart.svg"
                    width={24}
                    height={18.8}
                    alt="heart"
                    style={{
                        filter: theme === "dark" ? "invert(1)" : "invert(0)",
                    }}
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="z-20 mt-5 mr-10 w-fit bg-white" align="center">
                <>
                    {user === "not authorized" ? (
                        <DropdownMenuItem className="w-full">
                            <div className="w-full flex justify-center items-center">
                                <span className="text-[16px] tracking-widest">
                                    you are not logged in.
                                </span>
                            </div>

                        </DropdownMenuItem>
                    ) : (
                        <DropdownMenuItem className="max-w-[200px] flex flex-col justify-center items-center ">
                            <div className="w-full flex flex-col justify-center items-center max-h-[150px] overflow-x-hidden">
                                {data?.likedProducts.length === 0 ? (
                                    <span className="text-[16px] tracking-widest text-center flex justify-center items-center h-full w-full ">no liked products yet</span>
                                ) : (
                                    <>
                                    {productsData?.products.map((product, index) => (
                                    <div key={index} className="flex justify-between items-center">
                                        <div className="w-1/2">
                                            <img src={product.mainProductImage} className="w-full" />
                                        </div>
                                        <div className="w-1/2 flex flex-col justify-center items-end space-y-4">
                                            <span className="text-[12px] tracking-widest">{product.sizes[0].price}$</span>
                                            {/* <span className="text-[12px] tracking-widest text-center">{product.productName}</span> */}
                                            <span className="text-[13px] text-gray-500 tracking-widest">{product.productCategory}</span>
                                        </div>
                                    </div>
                                ))}
                                    </>
                                )}
                            </div>
                            <DropdownMenuSeparator />
                            <div className="w-full flex justify-center items-center mt-12">
                                <button className="w-[90%] flex justify-center items-center text-[14px] tracking-widest border-b-[1px] border-black border-solid py-2 px-4"><Link href="/liked-products">See full page</Link></button>
                            </div>
                        </DropdownMenuItem>
                    )}
                    {user === null && (
                        <>Loading....</>
                    )}
                </>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default LikedProducts