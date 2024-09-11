"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";

interface PageProps {
    searchParams: {
        [key: string]: string
    }
}
const page = ({ searchParams }: PageProps) => {
    const amount = searchParams.amount
    return <>
        <MaxWidthWrapper className="mt-44 min-h-screen">
            <div className="w-full flex flex-col justify-center items-center">
                <h1 className="text-[18px] font-semibold tracking-widest">
                    Thank you for buying the product!
                </h1>
                <p className="text-[16px] tracking-widest">
                    will get shipping email from parcelpro
                </p>
                <p className="text-[15px] tracking-widest text-gray-500">purchase: ${amount}</p>
            </div>
        </MaxWidthWrapper>
    </>
}

export default page