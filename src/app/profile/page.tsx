"use client";
import { trpc } from "@/app/trpc/client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { getAuthUser } from "@/server/get-auth-user";
type User = {
    _id: string;
    email?: string;
    [key: string]: any;
};
const Page = () => {
    const [selectedCategory, setSelectedCategory] = useState("Main-info");
    const categories = ['Main-info', 'My orders', 'Address', 'Password', 'Payment method'];
    const [isHover, setIsHover] = useState(0);
    const [firstName, setFirstName] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [repeatNewPassword, setRepeatNewPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category);
    };
    const handleInputChange = (
        setState: React.Dispatch<React.SetStateAction<string>>,
      ) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setState(event.target.value);
      };
    const [user, setUser] = useState<User | "not authorized" | null>(null);
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
    const {mutate: firstNameMutate, isLoading: firstNameLoading} = trpc.auth.updateUsersFirstName.useMutation({
        onError: (err) => {
            toast.error("something went wrong.");
          },
          onSuccess: () => {
            
            toast.success("successfully changed the first name.");
          },
    });
    const {mutate: passwordMutate, isLoading: passwordLoading} = trpc.auth.updateUsersPassword.useMutation({
        onError: (err) => {
            toast.error("something went wrong.");
          },
          onSuccess: () => {
            
            toast.success("successfully changed the password name.");
          },
    })
    const handleInfoSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (typeof user !== 'string' && user?._id) {
            firstNameMutate({firstName, userId: user._id});
            
          } else{
            console.log("User is not authorized");
            toast.error("you have to be logged in!");
          }
    }
    const handlePasswordSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (typeof user !== 'string' && user?._id) {
            if(newPassword === repeatNewPassword) {
                passwordMutate({currentPassword, newPassword, userId: user?._id});
            } else {
                toast.error("passwords should match.")
            }
            
            
          } else{
            console.log("User is not authorized");
            toast.error("you have to be logged in!");
          }
    }
    return (
        <>
            <MaxWidthWrapper className="mt-80 min-h-screen">

                <div className="w-full flex flex-col justify-center items-center space-y-16">
                    <div className="w-full flex justify-center items-center">
                        <h1 className="text-[24px] tracking-widest">Profile</h1>
                    </div>
                    <div className="flex justify-center items-center w-full">
                        <ul className="flex justify-center items-center space-x-8 tracking-widest text-[16px] text-[#666666]">
                            {categories.map((category) => (
                                <li
                                    key={category}
                                    onClick={() => handleCategoryClick(category)}
                                    className={`cursor-pointer pb-2 ${selectedCategory === category ? 'border-b-2 border-black' : ''
                                        }`}
                                >
                                    {category}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="w-full flex justify-center items-center">
                        {selectedCategory === "Main-info" && (
                            <>
                                <div className="w-full flex justify-center items-center border-black border-solid border-[2px]">
                                    <form onSubmit={handleInfoSubmit} className="m-24 w-[30%] flex flex-col justify-center items-center spcae-y-4">
                                        
                                       {user !== "not authorized" ? (
                                        <>
                                            <input value={firstName} placeholder={user?.firstName} onChange={handleInputChange(setFirstName)} type="text" className="w-full outline-none border-b-[1px] border-black border-solid px-4 py-6 placeholder:text-black placeholder:tracking-widest" />
                                            <input type="text" value={user?.lastName} className="tracking-widest w-full outline-none border-b-[1px] border-black border-solid px-4 py-6" />
                                            <input type="text" value={user?.email} className="tracking-widest w-full outline-none border-b-[1px] border-black border-solid px-4 py-6 " />
                                           
                                        </>
                                       ): (
                                        <>
                                        </>
                                       )}
                                       <button type="submit" className="w-full bg-black text-white font-semibold text-[16px] tracking-widest py-4">
                                       {firstNameLoading ? (
                                                        <>
                                                        SAVING...
                                                        </>
                                                    ): (
                                                        <>
                                                         SAVE THE CHANGES
                                                        </>
                                                    )}
                                       </button>
                                    </form>
                                </div>
                            </>
                        )}
                        {selectedCategory === "My orders" && (
                            <>
                                <div className="w-full flex justify-center items-center border-black border-solid border-2">
                                    <div className="m-80 w-[40%] flex justify-center items-center">
                                        <h2 className="text-[18px] tracking-widest">No Orders Made Yet</h2>
                                    </div>
                                </div>
                            </>
                        )}
                        {selectedCategory === "Address" && (
                            <>
                                 <div className="w-full flex justify-center items-center border-black border-solid border-2">
                                    <div className="m-80 w-[40%] flex justify-center items-center">
                                        <h2 className="text-[18px] tracking-widest">Not Added Yet</h2>
                                    </div>
                                </div>
                            </>
                        )}
                        {selectedCategory === "Password" && (
                            <>
                                <div className="w-full flex justify-center items-center border-black border-solid border-[2px]">
                                    <form onSubmit={handlePasswordSubmit} className="m-24 w-[30%] flex flex-col justify-center items-center spcae-y-4">
                                        
                                       {user !== "not authorized" ? (
                                        <>
                                            <input value={currentPassword} placeholder="enter current password" onChange={handleInputChange(setCurrentPassword)} type="password" className="w-full outline-none border-b-[1px] border-black border-solid px-4 py-6 placeholder:text-black placeholder:tracking-widest" />
                                            <input value={newPassword} placeholder="enter new password" onChange={handleInputChange(setNewPassword)} type="password" className="w-full outline-none border-b-[1px] border-black border-solid px-4 py-6 placeholder:text-black placeholder:tracking-widest" />
                                            <input value={repeatNewPassword} placeholder="repeat new password" onChange={handleInputChange(setRepeatNewPassword)} type="password" className="w-full outline-none border-b-[1px] border-black border-solid px-4 py-6 placeholder:text-black placeholder:tracking-widest" />
                                            
                                        </>
                                       ): (
                                        <>
                                        </>
                                       )}
                                       <button type="submit" className="mt-12 w-full bg-black text-white font-semibold text-[16px] tracking-widest py-4">
                                       {passwordLoading ? (
                                                        <>
                                                        SAVING...
                                                        </>
                                                    ): (
                                                        <>
                                                         SAVE THE CHANGES
                                                        </>
                                                    )}
                                       </button>

                                    </form>
                                </div>
                            </>
                        )}
                        {selectedCategory === "Payment method" && (
                            <>
                                 <div className="w-full flex justify-center items-center border-black border-solid border-2">
                                    <div className="m-80 w-[40%] flex justify-center items-center">
                                        <h2 className="text-[18px] tracking-widest">Using Stripe</h2>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </MaxWidthWrapper>
        </>
    )
}

export default Page