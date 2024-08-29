"use client";

import { trpc } from "@/app/trpc/client";

const Page = () => {
    const TestRouter = trpc.testRouter.useQuery();
    
    return (
        <div>
            <div>{JSON.stringify(TestRouter.data)}</div>
        </div>
    )
}


export default Page;