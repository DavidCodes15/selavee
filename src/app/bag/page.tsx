"use client";
import { trpc } from "@/app/trpc/client";
type User = {
    _id: string;
    email?: string;
    [key: string]: any;
};
import { toast } from "sonner";
import { getAuthUser } from "@/server/get-auth-user";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useState, useEffect, useMemo } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "@/app/globals.css";
if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
import Link from "next/link";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import CheckoutPage from "@/components/stripe/checkout";
import { X } from "lucide-react";
import { useStateChange } from "@/hooks/use-state";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
const BagPage = () => {
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
    const totalPrice = useMemo(() => {
        if (data?.checked) {
            return data.checked.reduce((acc, product) => acc + product.totalPrice, 0);
        }
        return 0;
    }, [data?.checked]);
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
    const { items, removeItem } = useStateChange();
    const itemCount = items.length;
    console.log(data?.checked);
    return (
        <>
            <MaxWidthWrapper className="mt-44 min-h-screen">
                <div className="w-full flex justify-center items-center">
                    <h1 className="tracking-widest text-[24px]">Shopping bag</h1>
                </div>
                <div className="w-full mt-28 flex justify-between items-start space-x-2">
                    <div className="w-[60%] border-black border-solid border-[1px] px-12 py-6">
                        <div className="w-full flex justify-center items-center">
                            <div className="w-full flex flex-col justify-center items-start space-y-6">
                                <div>
                                    <span className="text-[14px] font-semibold tracking-widest">Products ({itemCount})</span>
                                </div>
                                {items.map(({ product }) => (
                                    <div key={product._id} className="w-full flex justify-between items-start">


                                        <div className="w-full flex justify-start space-x-4">
                                            <div className="w-[160px]">
                                                <img src={product.selectedImageUrl} />
                                            </div>
                                            <div>
                                                <div>
                                                    <span className="text-[16px] tracking-widest">{product.productDetail}</span>
                                                </div>
                                                <div>
                                                    <span className="text-[16px] tracking-widest">{product.productName}</span>
                                                </div>
                                                <div>
                                                    <span className="text-[16px] tracking-widest font-semibold">{product.totalPrice}$</span>
                                                </div>
                                                {/* <div className="w-[20px] h-[20px] pink-gradient rounded-full"/> */}
                                                <div className="flex justify-start items-center space-x-[3px] mt-5">
                                                    <div className="w-[20px] h-[20px] cursor-pointer pink-gradient rounded-full " />
                                                    <div className="w-[20px] h-[20px] cursor-pointer gold-gradient rounded-full" />
                                                    <div className="w-[20px] h-[20px] cursor-pointer silver-gradient rounded-full" />
                                                </div>
                                                {/* <div>
                                            <span className={`w-[20px] h-[20px] cursor-pointer pink-gradient rounded-full ${product.selectedColor === "pinkGold" ? 'border-[1px] border-solid border-black' : ''}`} />
                                            <span className={`w-[20px] h-[20px] cursor-pointer gold-gradient rounded-full ${product.selectedColor === "yellowGold" ? 'border-[1px] border-solid border-black' : ''}`} />
                                            <span className={`w-[20px] h-[20px] cursor-pointer silver-gradient rounded-full ${product.selectedColor === "silverGold" ? 'border-[1px] border-solid border-black' : ''}`} />
                                        </div> */}
                                                <div className="flex justify-start items-center space-x-4 mt-2">
                                                    <div>
                                                        Qty: {product.quantity}
                                                    </div>
                                                    <div>
                                                        Size: {product.sizes[0].size}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-center items-center">
                                            <X className="cursor-pointer" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="w-[40%] border-black border-solid border-[1px] pt-16 pb-5">
                        <div className="w-full flex justify-center items-center">
                            <div className="w-full flex flex-col justify-center space-y-6 px-6">
                                {/* <div>
                                                <span className="font-semibold">Total</span>
                                            </div> */}
                                <div className="w-full flex justify-start items-center space-x-2">
                                    <input type="checkbox" />
                                    <div className="flex justify-center items-center space-x-2">
                                        <span className="font-semibold tracking-widest">is this a gift?</span>
                                        <img src="/icons/gift.svg" className="w-[24px] h-[24px]" />
                                    </div>
                                </div>
                                <div className="w-full flex flex-col justify-center items-end space-y-4">

                                    <button className="w-full bg-black text-white tracking-widest text-[16px] py-2"><Link href="/checkout">Checkout</Link></button>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </MaxWidthWrapper>
        </>
    )
}

export default BagPage