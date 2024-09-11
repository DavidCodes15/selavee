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

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import CheckoutPage from "@/components/stripe/checkout";
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
    return (
        <>
            <MaxWidthWrapper className="mt-44 min-h-screen">
                <div className="w-full flex justify-center items-center">
                    <h1 className="tracking-widest text-[24px]">Shopping bag</h1>
                </div>
                {isLoading ? (
                    <>
                        <div className="animate-pulse w-full mt-26 flex justify-center items-center space-x-2">
                            <div className="w-[748px] h-[870px] bg-gray-300 rounded" />


                            <div className="flex flex-col justify-center items-center space-y-4">
                                <div className="bg-gray-300 w-[428px] h-[382px] rounded" />
                                <div className="bg-gray-300 w-[428pxh-[128px] rounded" />
                            </div>


                        </div>
                    </>
                ) : (
                    <>
                        <div className="w-full mt-28 flex justify-center items-start space-x-2">
                            {/* <div className="w-[748px] h-[870px] bg-gray-300 rounded" /> */}
                            <div className="border-black border-solid border-[1px] px-12 py-6">
                                <div className="w-full flex justify-center items-center">
                                    <div className="w-full flex flex-col justify-center items-start space-y-6">
                                        <div>
                                            <span className="text-[14px] font-semibold tracking-widest">Products ({data?.checked.length})</span>
                                        </div>
                                        {data?.checked.map((product, index) => (
                                            <>
                                                <div key={index} className="w-full flex justify-start items-center space-x-4">
                                                    <div className="max-w-[160px] max-h-[172px]">
                                                        <img src={product.productUrl} />
                                                    </div>
                                                    <div className="flex flex-col justify-between h-full items-start">
                                                        <div>
                                                            <span>{product.totalPrice}$</span>
                                                        </div>
                                                        <div className="flex justify-start items-center space-x-4">
                                                            <div>
                                                                Qty: {product.quantity}
                                                            </div>
                                                            <div>
                                                                Size: {product.size}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        ))}
                                        {/* <div className="w-full flex justify-start items-center space-x-4">
                                            <div className="max-w-[160px] max-h-[172px]">
                                                <img src={data?.checked}
                                                </div>
                                        </div> */}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col justify-center items-center space-y-4">
                                {/* <div className="bg-gray-300 w-[428px] h-[382px] rounded" /> */}
                                <div className="border-black border-solid border-[1px] w-[428px] py-16">
                                    <div className="w-full flex justify-center items-center">
                                        <div className="w-full flex flex-col justify-center items-start space-y-6 px-6">
                                            <div>
                                                <span className="font-semibold">Total</span>
                                            </div>
                                            <div className="w-full flex flex-col justify-center items-start space-y-4">
                                                <span>SUB-TOTAL: ${totalPrice}</span>
                                                <span>DISCOUNT: $0</span>
                                                <span>DELIVERY: FREE</span>
                                                <span className="font-semibold">TOTAL: ${totalPrice}</span>
                                                <Elements
                                                    stripe={stripePromise}
                                                    options={{
                                                        mode: "payment",
                                                        amount: convertToSubcurrency(totalPrice),
                                                        currency: "usd",
                                                    }}
                                                >
                                                    {/* <button className="w-full bg-black text-white tracking-widest text-[16px] py-2">CHECKOUT</button> */}
                                                    <CheckoutPage amount={totalPrice} />
                                                </Elements>
                                               
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-black border-solid border-[1px] w-[428px] py-16">
                                    <div className="w-full flex justify-center items-center space-x-2">
                                        <input type="checkbox" />
                                        <div className="flex justify-center items-center space-x-2">
                                            <span className="font-semibold tracking-widest">is this a gift?</span>
                                            <img src="/icons/gift.svg" className="w-[24px] h-[24px]" />
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </>
                )}

            </MaxWidthWrapper>
        </>
    )
}

export default BagPage