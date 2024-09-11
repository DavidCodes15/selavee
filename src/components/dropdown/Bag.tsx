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
                       ): (
                        <DropdownMenuItem className="max-w-[200px] flex flex-col justify-center items-center ">
                            <div className="w-full flex flex-col justify-center items-center max-h-[100px] space-y-2 overflow-x-hidden">
                                
                                {data?.checked.length === 0 ?  (
                                    <>
                                        <div className="flex justify-center items-center">
                                            <span className="text-[16px] tracking-widest text-center">nothing in the bag</span>
                                        </div>
                                    </>
                                ): (
                                    <>
                                        {data?.checked.map((product, index) => (
                                    <div key={index} className="flex justify-between items-center">
                                        <div className="w-1/2">
                                            <img src={product.productUrl} className="w-full" />
                                        </div>
                                        <div className="w-1/2 flex flex-col justify-center items-end space-y-4">
                                            <span className="text-[16px] tracking-widest">{product.totalPrice}$</span>
                                            <span className="text-[16px] tracking-widest">QTY{product.quantity}</span>
                                        </div>
                                    </div>
                                ))}
                                    </> 
                                )}
                               
                            </div>
                            <DropdownMenuSeparator />
                            <div className="w-full flex justify-center items-center mt-12">
                                <button className="w-[90%] flex justify-center items-center text-[14px] tracking-widest border-b-[1px] border-black border-solid py-2 px-4"><Link href="/bag">See full page</Link></button>
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

export default Bag