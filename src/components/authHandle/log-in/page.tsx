"use client";
import { cn } from "@/lib/utils";
import z from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "@/app/trpc/client";
import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { getAuthUser } from "@/server/get-auth-user";

const SignInValidator = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type TSignInValidator = z.infer<typeof SignInValidator>;

const LogIn = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [token, setToken] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<TSignInValidator>({
        resolver: zodResolver(SignInValidator),
      });
      const router = useRouter();
    
      const { mutate, isLoading } = trpc.auth.signIn.useMutation({
        onError: (err) => {
          toast.error("Invalid email or password.");
        },
        onSuccess: ({token}) => {
          console.log(token);
          toast.success("Signed in successfully.");
          setIsSuccess(true);
          setToken(token);
          
        },
      });
      
  
      const onSubmit = ({ email, password }: TSignInValidator) => {
        mutate({ email, password });

      };

     
      return(

        
          <div className="w-full relative">  
          {isSuccess ? (
              <div className="flex w-full justify-center items-center">
                  <span className="text-[14px] tracking-widest font-semibold">You are all set!</span>
              </div>
          ): (
            <form
            className="flex w-full flex-col items-center justify-center space-y-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="w-full">
              <input
                {...register("email")}
                type="email"
                placeholder="E-mail"
                className={cn(
                  "w-full border-b-[1px] border-black bg-transparent px-2 py-[12px] outline-none placeholder:text-[14px] placeholder:tracking-widest placeholder:text-black",
                  { "border-red-500": errors.email },
                )}
              />
              {errors.email && (
                <p className="text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="w-full">
              <input
                {...register("password")}
                type="password"
                placeholder="Password"
                className={cn(
                  "w-full border-b-[1px] border-black bg-transparent px-2 py-[12px] outline-none placeholder:text-[14px] placeholder:tracking-widest placeholder:text-black",
                  { "border-red-500": errors.password },
                )}
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="flex w-full justify-center">
              <button
                type="submit"
                className="w-full bg-black px-4 py-2 text-[16px] tracking-widest text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex justify-center items-center space-x-2">
                      <span>Loading</span>
                      <Loader2 className='animate-spin h-8 w-8 text-zinc-300' />
                  </span>
                ): (
                  <span>Log in</span>
                )}
              </button>
            </div>
          </form>
          )}    
                
              </div>
        
       
      )

}

export default LogIn