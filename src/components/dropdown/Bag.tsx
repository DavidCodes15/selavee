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
const Bag = ({ theme, user }: { theme: string, user: User | "not authorized" | null }) => {
    const { data } = trpc.product.checkTheBag.useQuery(
        user && typeof user !== "string" ? { userId: user._id } : undefined as never,
        {
            enabled: !!user && typeof user !== "string", // Only run query if user is authenticated
            onSuccess: (data) => {
                console.log("bag: ", data);
            },
            onError: (err) => {
                console.error("Error fetching the bag: ", err);
            },
        }
    );
    console.log("data", data);
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="icon">
                <Image
                    src="/icons/bag.svg"
                    width={15}
                    height={23}
                    alt="bag"
                    style={{
                        filter: theme === "dark" ? "invert(1)" : "invert(0)",
                    }}
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="z-20 mt-5 mr-10 w-fit !bg-black !text-white !rounded-none !border-none hover:!bg-black focus:!bg-black" align="center">
                <>
                    {user === "not authorized" ? (
                        <div className="w-full">
                            <div className="w-full flex justify-center items-center">
                                <span className="text-[16px] tracking-widest">
                                    you are not logged in.
                                </span>
                            </div>

                        </div>
                    ) : (
                        <div className="flex flex-col justify-center items-center py-8">
                            <div className="w-full flex flex-col justify-center items-center max-h-[100px] space-y-6 overflow-x-hidden">

                                {data?.checked.length === 0 ? (
                                    <>
                                        {/* <div className="flex justify-center items-center">
                                            <span className="text-[16px] tracking-widest text-center">nothing in the bag</span>
                                        </div> */}
                                    </>
                                ) : (
                                    <>
                                        <div className="w-full flex justify-center items-center px-8">
                                            <button className="flex justify-center items-center bg-transparent text-[16px] text-white tracking-widest border-solid border-white border-[1px] p-2">GO TO SHOPPING BAG</button>
                                        </div>
                                        <div className="w-full flex justify-between items-center px-6">
                                            <div className="text-[14px] tracking-widest flex justify-center items-center space-x-2">
                                                <span className="">Total:</span>
                                                <span className="font-semibold">235$</span>
                                            </div>
                                            <div className="text-[14px] tracking-widest flex justify-center items-center space-x-2">
                                                <span className="font-semibold">4</span>
                                                <span>items</span>
                                            </div>
                                        </div>
                                        <div className="w-full flex justify-center items-center px-8">
                                            {data?.checked.map((product, index) => (
                                                <div key={index} className="w-full flex justify-start items-center space-x-2">
                                                    <div className="w-fit">
                                                        <img src={product.productUrl} className="w-[80px] h-[80px]" />
                                                    </div>
                                                    <div className="w-full flex flex-col justify-center items-start space-y-4">
                                                        <div className="w-full flex justify-between items-center">
                                                            <span></span>
                                                            <span></span>
                                                        </div>
                                                        <div className="w-full flex justify-start items-center">
                                                            <span className="text-[16px] text-white tracking-widest font-semibold">{product.totalPrice}$</span>
                                                        </div>
                                                        <div className="w-full flex justify-between items-center">
                                                            
                                                                <div className="text-white tracking-widet text-[16px]">{product.size}</div>
                                                            
                                                            <div className="text-white tracking-widest text-[16px]">Qty: {product.quantity}</div>
                                                            {product.selectedColor !== "mainProductImage" && (
                                                                <div className="bg-white rounded-full w-[20px] h-[20px]" />
                                                            )}
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        {/* {data?.checked.map((product, index) => (
                                            <div key={index} className="text-white flex justify-between items-center">
                                                <div className="w-1/2">
                                                    <img src={product.productUrl} className="w-full" />
                                                </div>
                                                <div className="w-1/2 flex flex-col justify-center items-end space-y-4">
                                                    <span className="text-[16px] tracking-widest">{product.totalPrice}$</span>
                                                    <span className="text-[16px] tracking-widest">QTY{product.quantity}</span>
                                                </div>
                                            </div>
                                        ))} */}
                                    </>
                                )}

                            </div>
                            <DropdownMenuSeparator />
                            {/* <div className="w-full flex justify-center items-center mt-12">
                                <button className="w-[90%] flex justify-center items-center text-[14px] tracking-widest border-b-[1px] border-black border-solid py-2 px-4"><Link href="/bag">See full page</Link></button>
                            </div> */}
                        </div>
                    )}
                    {user === null && (
                        <>Loading....</>
                    )}
                </>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default Bag