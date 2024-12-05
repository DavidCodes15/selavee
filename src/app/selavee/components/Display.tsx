"use client";
import { trpc } from "@/app/trpc/client";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import ProductSkeleton from "@/app/products/skeleton/ProductSkeleton";

import Link from "next/link";
import { Trash } from "lucide-react";
const Display = () => {

    // const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [selectedColors, setSelectedColors] = useState<Record<string, string>>({});
    const handleColorClick = (productId: string, color: string) => {
        // Update the selected color for a specific product
        setSelectedColors((prev) => ({
            ...prev,
            [productId]: color,
        }));
    };
    const { data: products, isLoading, refetch } = trpc.product.fetchAllProducts.useQuery();
    const {mutate} = trpc.product.deleteSpecificProduct.useMutation({
        onSuccess: () => {
            toast.success("product deleted successfully!");
            refetch();
        },
        onError: () => {
            toast.error("Failed to delete the product.");
        },
    });
    // const handleColorClick = (color: string) => {
    //     setSelectedColor(color);
    // };
    const handleDelete = (id: string) => {
        mutate({id});
    }
    return (
        <>
            <div className="rounded-xl bg-[#21222D] p-6 flex flex-col space-y-6 h-full text-white">

                <div className="text-white font-semibold">
                    <span className="text-[22px]">Display</span>
                </div>
                {isLoading ? (
                    <>
                        <ProductSkeleton />
                    </>
                ) : (
                    <>
                        <div className="bg-[#171821] p-6 rounded-xl mt-12 grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-3 md:gap-5">
                            {products?.products.length === 0 ? (
                                <>
                                    <div className="w-full h-[500px] bg-transparent">

                                    </div>
                                    <div className="w-full h-[500px] bg-transparent flex justify-center items-center">
                                        <h2 className="text-[18px] tracking-widest">No products in the store yet</h2>
                                    </div>
                                    <div className="w-full h-[500px] bg-transparent">

                                    </div>
                                </>
                            ) : (
                                <>
                                    {products?.products.map((product) => (
                                        <div key={product._id} className="mx-auto lg:mx-0 flex flex-col justify-center items-start space-y-2 cursor-pointer">
                                            <div className="relative sm:w-full sm:mx-auto md:w-full">
                                                <Link href={`/products/product?id=${product._id}`}>
                                                    <img src={
                                                        selectedColors[product._id] === "pinkGold"
                                                            ? product.pinkGold
                                                            : selectedColors[product._id] === "yellowGold"
                                                                ? product.yellowGold
                                                                : selectedColors[product._id] === "silverGold"
                                                                    ? product.silverGold
                                                                    : product.mainProductImage
                                                    } className="xl:w-full xl:h-[397px] transition-opacity duration-500 ease-in-out opacity-100 hover:opacity-0" />
                                                    <img src={product.mainModelImage} className="absolute top-0 left-0 xl:w-full xl:h-[397px] transition-opacity duration-500 ease-in-out opacity-0 hover:opacity-100" />
                                                </Link>
                                            </div>
                                            <div className="sm:w-full mx-auto md:w-full flex flex-col justify-center items-start space-y-2 cursor-pointer">
                                                <div className="w-full flex justify-between items-center">
                                                    <span className="tracking-widest text-[18px]">{product.productName}</span>

                                                </div>
                                                <div className="w-full flex justify-between items-center">
                                                    <div className="flex justify-center items-center space-x-2">
                                                        <span
                                                            onClick={() => handleColorClick(product._id, "pinkGold")}
                                                            className={`w-[20px] h-[20px] cursor-pointer pink-gradient rounded-full ${selectedColors[product._id] === "pinkGold"
                                                                ? "border-[1px] border-solid border-black"
                                                                : ""
                                                                }`}
                                                        />
                                                        <span
                                                            onClick={() => handleColorClick(product._id, "yellowGold")}
                                                            className={`w-[20px] h-[20px] cursor-pointer gold-gradient rounded-full ${selectedColors[product._id] === "yellowGold"
                                                                ? "border-[1px] border-solid border-black"
                                                                : ""
                                                                }`}
                                                        />
                                                        <span
                                                            onClick={() => handleColorClick(product._id, "silverGold")}
                                                            className={`w-[20px] h-[20px] cursor-pointer silver-gradient rounded-full ${selectedColors[product._id] === "silverGold"
                                                                ? "border-[1px] border-solid border-black"
                                                                : ""
                                                                }`}
                                                        />
                                                    </div>
                                                    <Trash onClick={() => handleDelete(product._id)} className="cursor-pointer" color="red" />
                                                </div>
                                                <div>
                                                    {/* <span>{product.onlyPrice}</span> */}
                                                    
                                                        <span className="font-bold text-[14px]">{product.sizes[0].price} $</span>
                                                    

                                                </div>
                                            </div>
                                        </div>

                                    ))}
                                </>
                            )}

                        </div>
                    </>
                )}


            </div>

        </>
    )

}

export default Display