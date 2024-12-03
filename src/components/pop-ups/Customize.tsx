"use client";
type User = {
    _id: string;
    email?: string;
    [key: string]: any;
};

import { useState, useEffect } from "react";
import { getAuthUser } from "@/server/get-auth-user";
import { trpc } from "@/app/trpc/client";
import { toast } from "sonner";
const Customize = () => {
    const [user, setUser] = useState<User | "not authorized" | null>(null);
    const [email, setEmail] = useState<string>("");
    const [textareaContent, setTextareaContent] = useState<string>("");
    const {mutate, isLoading} = trpc.auth.customize.useMutation({
        onError: (err) => {
            toast.error("something went wrong",);
            console.log(err);
        },
        onSuccess: () => {
            toast.success("message delivered successfully");
            setTextareaContent("");
        }
    })
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
    // useEffect(() => {
    //     if (user && typeof user !== "string") {
    //         setEmail(user?.email || "")
    //     } else {
    //         setEmail("");
    //     }
    // })
    useEffect(() => {
        if (user && typeof user !== "string") {
            setEmail(user?.email || "");
        }
    }, [user]);
    const handleInputChange = (
        setState: React.Dispatch<React.SetStateAction<string>>,
    ) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setState(event.target.value);
    };
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!email || !textareaContent) {
            toast.error("Please fill out all fields.");
            return;
        }
        if (user && typeof user !== "string")
        mutate({userId: user?._id, email, message: textareaContent});

    }
    return (
        <>
            <div className="w-full flex justify-start items-center">
                <div className="w-full flex flex-col justify-center items-start space-y-6">
                    <span className="text-[16px] font-semibold tracking-widest">Customize</span>
                    <p className="max-w-[450px] tracking-widest text-[15px]">Jewellery you can count on. Upgrade your ear stack with these small</p>

                    <form onSubmit={handleSubmit} className="w-full flex flex-col justify-center items-start space-y-4">
                        <input value={email}
                            onChange={handleInputChange(setEmail)} type="text" className="w-full border-b-[1px] border-solid border-black py-4 outline-none" placeholder="Your email" />
                        <textarea value={textareaContent}
                            onChange={handleInputChange(setTextareaContent)} className="outline-none border-b-[1px] border-solid border-black w-full h-[200px] placeholder:text-black placeholder:tracking-widest placeholder:text-[14px]" placeholder="Text here" />
                        <button type="submit" className="cursor-pointer w-full bg-black flex justify-center items-center text-white tracking-widest text-[16px] py-2">
                            {isLoading ? (
                                <>Submitting....</>
                            ): (
                                <>
                                Submit
                                </>
                            )}
                            </button>
                    </form>

                </div>

            </div>
        </>
    )
}

export default Customize;