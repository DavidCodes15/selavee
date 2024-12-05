"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";

interface PageProps {
    searchParams: {
        [key: string]: string
    }
}
import { useState, useEffect, useMemo } from "react";
type User = {
    _id: string;
    email?: string;
    [key: string]: any;
};
import { toast } from "sonner";
import { useStateChange, useOrdersChange } from "@/hooks/use-state";
import { trpc } from "@/app/trpc/client";
import { getAuthUser } from "@/server/get-auth-user";
const Page = ({ searchParams }: PageProps) => {
    const { items, clear: clearBag } = useStateChange();
  const { addMultipleOrders } = useOrdersChange();
    const [user, setUser] = useState<User | "not authorized" | null>(null);
    const { data, isLoading } = trpc.product.checkTheBag.useQuery(
        user && typeof user !== "string" ? { userId: user._id } : undefined as never,
        {
            enabled: !!user && typeof user !== "string", // Only run query if user is authenticated
            onSuccess: (data) => {
                console.log("Liked Products: ", data);
            },
            onError: (err) => {
                console.error("Error fetching liked products: ", err);
            },
        }
    );
    console.log(data);
    // useEffect(() => {
    //     const orderAmount = parseFloat(searchParams.amount);
    //     const purchasedAt = new Date().toISOString();
    //     if (isNaN(orderAmount)) {
    //         console.error("Invalid amount provided:", searchParams.amount);
    //         toast.error("Failed to process the order. Invalid amount.");
    //         return;
    //     }
    
    //     const ordersToAdd = items.map(({ product }) => ({
    //         product,
    //         purchasedAt,
    //         tracking_number: searchParams.tracking, // Use the correct property name for tracking number
    //         amount: orderAmount,
    //     }));

    //   // Ensure items exist before moving to orders
    //   if (items.length > 0) {
    //     addMultipleOrders(ordersToAdd);
    //     clearBag();
    //     toast.success("Purchase successful! Products moved to your orders.");
    //   } else {
    //     toast.error("No items in the bag to process.");
    //   }
    // }, []);
    useEffect(() => {
        if (items.length === 0) {
            console.warn("No items in the bag to process.");
            return;
        }
    
        const orderAmount = parseFloat(searchParams.amount);
        const purchasedAt = new Date().toISOString();
    
        if (isNaN(orderAmount)) {
            console.error("Invalid amount provided:", searchParams.amount);
            toast.error("Failed to process the order. Invalid amount.");
            return;
        }
    
        // const ordersToAdd = items.map(({ product }) => ({
        //     product,
        //     purchasedAt,
        //     tracking_number: searchParams.tracking, // Correct property name
        //     amount: orderAmount,
        // }));
        const order = {
            products: items.map(({ product }) => product), // All products in the bag
            purchasedAt,
            tracking_number: searchParams.tracking, // Correct property name
            amount: orderAmount,
        };
    
        addMultipleOrders([order]);
        clearBag();
        toast.success("Purchase successful! Products moved to your orders.");
    }, [items]);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = (await getAuthUser({
                    shouldRedirect: false,
                })) as unknown as User;
                if (user && typeof user !== "string") {
                    setUser(user);
                    console.log(user);
                } else {
                    setUser("not authorized");
                }
            } catch (error) {
                setUser("not authorized");
            }
        };

        fetchUser();
    }, []);
    console.log(data?.checked);
    const amount = searchParams.amount;
    const tracking_number = searchParams.tracking;
    const shipmentID = searchParams.shipment;
    return <>
        {/* <MaxWidthWrapper className="mt-80 min-h-screen">
            <div className="mt-44 w-full flex flex-col justify-center items-center">
                <h1 className="text-[24px] font-semibold tracking-widest">
                    Thank you for buying the product!
                </h1>
                <p className="text-[22px] tracking-widest">
                    Email was sent to you!
                </p>
                <p className="text-[15px] tracking-widest text-gray-500">purchase: ${amount}</p>
                <p className="text-[18px] tracking-widest text-gray-500">tracking number: {tracking_number}</p>
                <p className="text-[18px] tracking-widest text-gray-500">shipment ID: {shipmentID}</p>
            </div>
        </MaxWidthWrapper> */}
        <MaxWidthWrapper className="mt-80 min-h-screen">
            <div className="w-full flex justify-between items-center border-black border-solid border-[1px] py-6">
                <div className="w-[60%] justify-center items-center px-12 py-6">
                    <div className="w-full flex flex-col justify-center items-start space-y-6">
                        <div>
                            <h1 className="text-[24px] font-semibold tracking-widest">
                                Thank you for buying the product!
                            </h1>
                        </div>
                        <div className="flex flex-col justify-center items-start space-y-4">
                            <span className="text-[20px] tracking-widest">Track your product with a given number</span>
                            <span className="text-[16px] text-gray-500">{tracking_number}</span>
                        </div>
                        <div className="flex flex-col justify-center items-start space-y-4">
                            <span className="text-[20px] tracking-widest">Get your Shipment ID</span>
                            <span className="text-[16px] text-gray-500">{shipmentID}</span>
                        </div>
                        <div>
                            <span className="tracking-widest text-gray-500 text-[15px]">Email was sent to you with additional product details</span>
                        </div>
                    </div>
                </div>
                <div className="w-[40%] flex justify-end items-center">
                    <div className="flex flex-col justify-center items-center space-y-6">
                        <div>
                            <span className="text-[20px] font-semibold tracking-widest">Amount: ${amount}</span>

                        </div>
                        <div className="flex justify-center items-center space-x-2">
                            {data?.checked.map((product, index) => (
                                <>
                                    <div key={index} className="flex flex-col justify-center items-end space-y-2">
                                        <div className="">
                                            <img src={product.productUrl} className="h-[172px] w-[160px]" />
                                        </div>
                                        <div className="flex flex-col justify-center items-end space-y-2 mt-5">
                                        

                                            <div className="flex justify-start items-center space-x-[3px]">
                                                <div className={`w-[20px] h-[20px] cursor-pointer pink-gradient rounded-full ${product.selectedColor === "pinkGold" ? 'border-[1px] border-solid border-black' : ''}`} />
                                                <div className={`w-[20px] h-[20px] cursor-pointer gold-gradient rounded-full ${product.selectedColor === "yellowGold" ? 'border-[1px] border-solid border-black' : ''}`} />
                                                <div className={`w-[20px] h-[20px] cursor-pointer silver-gradient rounded-full ${product.selectedColor === "silverGold" ? 'border-[1px] border-solid border-black' : ''}`} />
                                            </div>
                                            <div className="flex flex-col justify-center items-end">
                                            <div>
                                                    Size: {product.size}
                                                </div>
                                                <div>
                                                    Qty: {product.quantity}
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </MaxWidthWrapper>
    </>
}

export default Page