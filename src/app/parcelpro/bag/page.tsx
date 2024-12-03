"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useState, useEffect } from "react";
import { getAuthUser } from "@/server/get-auth-user";
import { trpc } from "@/app/trpc/client";
import Link from "next/link";
import { Trash } from "lucide-react";
type User = {
    _id: string;
    email?: string;
    [key: string]: any;
};
const Page = () => {
    const [user, setUser] = useState<User | "not authorized" | null>(null);
    const [fetched, setFetched] = useState(false);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = (await getAuthUser({
                    shouldRedirect: false,
                })) as unknown as User;
                if (user && typeof user !== "string") {
                    setUser(user);
                } else {
                    setUser("not authorized");
                }
            } catch (error) {
                setUser("not authorized");
            }
        };

        fetchUser();
    }, [fetched])
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
    return <>
        <MaxWidthWrapper className=" mt-80">
            <div className="w-fit absolute bg-black text-white top-[150px] right-[80px]">

                {user === "not authorized" ? (
                    <div className="w-full">
                        <div className="w-full flex justify-center items-center">
                            <span className="text-[16px] tracking-widest">
                                you are not logged in.
                            </span>
                        </div>

                    </div>
                ) : (
                    <div className="w-full flex flex-col justify-center items-center space-y-8 p-12">
                        <div className="w-full flex flex-col justify-center items-center space-y-4">
                            <div className="w-full flex justify-center items-center px-4">
                                <button className="flex justify-center items-center bg-transparent text-[16px] text-white tracking-widest border-solid border-white border-[1px] p-2"><Link href="/bag">GO TO SHOPPING BAG</Link></button>
                            </div>
                            <div className="w-full flex justify-between items-center">
                                <span className="">Total:</span>
                                <span className="font-semibold">235$</span>

                            </div>
                        </div>
                        <div className="w-full flex justify-center items-center">
                            {data?.checked.map((product, index) => (
                                <div key={index} className="w-full flex justify-start items-center space-x-2">
                                    <div>
                                        <img src={product.productUrl} className="w-[120px] h-[80px]" />
                                    </div>
                                    <div className="w-full flex flex-col justify-center items-start space-y-2">
                                        <div className="w-full flex justify-between items-center">
                                            <span className="text-white text-[15px] tracking-widest">Earring 202</span>
                                            <span><Trash className="w-[20px] h-[20px]" /> </span>
                                        </div>
                                        <div className="w-full flex justify-start items-center">
                                            <span className="text-[16px] text-white tracking-widest font-semibold">{product.totalPrice}$</span>
                                        </div>
                                        <div className="w-full flex justify-between items-center">

                                            <div className="text-white tracking-widet text-[16px]">{product.size}</div>

                                            <div className="text-white tracking-widest text-[16px]">Qty: {product.quantity}</div>
                                           
                                                <div className="bg-white rounded-full w-[20px] h-[20px]" />
                                            

                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>


        </MaxWidthWrapper>
    </>
}

export default Page