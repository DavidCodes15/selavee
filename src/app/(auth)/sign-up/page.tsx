"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { AuthCredentialsValidator, TAuthCredentialsValidator } from "../../../lib/validators/AccountCredentialsValidator";
import {trpc} from "../../../app/trpc/client"
const SignUp = () => {

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  });

  const {mutate} = trpc.auth.createUser.useMutation({})

  const onSubmit = ({email, firstName, lastName, phone, password}: TAuthCredentialsValidator) => {
    console.log("Form submitted:", {email, firstName, lastName, phone, password});
    // mutate({email, firstName, lastName, phone, password}, {
    //   onError: (error) => {
    //     console.log("error", error)
    //   },
    //   onSuccess: (data) => {
    //     console.log("success", data)
    //   }
    // })
    // mutate({email, firstName, lastName, phone, password}, {
    //   onError: (error) => {
    //     console.error("Error during user creation:", error);
    //   },
    //   onSuccess: (data) => {
    //     console.log("User created successfully:", data);
    //   },
    // })
  }
  return (
    <>
      <Navbar theme="dark" />
      <MaxWidthWrapper className="mt-56 min-h-screen">
        <div className="flex w-full items-center justify-center bg-blue-400">
          <div className="flex w-[50%] flex-col items-center justify-center bg-gray-500 px-4">
            <div className="flex w-[90%] items-center justify-center space-x-8 px-4">
              <div className="flex h-fit w-1/2 items-center justify-center border-b-[2px] border-solid border-black py-2">
                <span className="text-[14px] tracking-widest">Log in</span>
              </div>
              <div className="flex h-fit w-1/2 items-center justify-center border-b-[2px] border-solid border-black py-2">
                <span className="text-[14px] tracking-widest">Register</span>
              </div>
            </div>
            <div className="mt-12 w-full">
              <form method="POST" onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col items-start justify-center space-y-4">
                <div className="flex w-full flex-col items-center justify-center space-y-2">
                  <div className="w-full">
                    <input
                    {...register("email")}
                      type="email"
                      className={cn("w-full border-b-[2px] border-black border-solid bg-transparent p-2 outline-none placeholder:text-[14px] placeholder:text-black", {"border-red-500": errors.email})}
                      placeholder="E-mail"
                    />
                  </div>
                  <div className="w-full">
                 
                    <input
                     {...register("firstName")}
                      type="text"
                      className="w-full border-b-[2px] border-solid border-black bg-transparent p-2 outline-none placeholder:text-[14px] placeholder:text-black"
                      placeholder="First name"
                    />
                  </div>
                  <div className="w-full">
                    <input
                     {...register("lastName")}
                      type="text"
                      className="w-full border-b-[2px] border-solid border-black bg-transparent p-2 outline-none placeholder:text-[14px] placeholder:text-black"
                      placeholder="Last name"
                    />
                  </div>
                  <div className="w-full">
                    <input
                     {...register("phone")}
                      type="number"
                      className="w-full border-b-[2px] border-solid border-black bg-transparent p-2 outline-none placeholder:text-[14px] placeholder:text-black"
                      placeholder="phone number"
                    />
                  </div>
                  <div className="w-full">
                    <input
                     {...register("password")}
                      type="password"
                      className="w-full border-b-[2px] border-solid border-black bg-transparent p-2 outline-none placeholder:text-[14px] placeholder:text-black"
                      placeholder="Password"
                    />
                  </div>
                </div>
                <div className="flex w-full items-center justify-start space-x-2">
                  <input id="checkbox" type="checkbox" />
                  <label
                    htmlFor="checkbox"
                    className="flex items-center justify-center space-x-2 text-[13px] tracking-widest"
                  >
                    <span className="text-gray-300">I agree</span>
                    <span className="border-b-[2px] border-solid border-black text-black">
                      terms and conditions
                    </span>
                  </label>
                </div>
                <div className="flex w-full items-center justify-center">
                  <button type="submit" className="flex w-full items-center justify-center bg-black py-2 text-[16px] tracking-widest text-white">
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  );
};

export default SignUp;
