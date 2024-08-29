"use client"
import z from "zod"
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {useForm} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "@/app/trpc/client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { cn } from "@/lib/utils";
const SignInValidator = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });
  
  type TSignInValidator = z.infer<typeof SignInValidator>;
const Page = () => {
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
    onSuccess: ({ token }) => {
      localStorage.setItem("token", token);
      toast.success("Signed in successfully.");
      router.push("/selavee/admin");
    },
  });
  const onSubmit = ({ email, password }: TSignInValidator) => {
    mutate({ email, password });
  };

  return (
    <MaxWidthWrapper>
        <div className="min-h-screen w-full flex justify-center items-center">
            <div className="w-full flex flex-col space-y-6 justify-center items-center">
            <div className="flex w-[50%] items-center justify-center space-x-8 px-4">
              <div className="flex h-fit w-1/2 items-center justify-center border-b-[2px] border-solid border-black py-2">
                <span className="text-[14px] tracking-widest">Log in</span>
              </div>
              <div className="flex h-fit w-1/2 items-center justify-center border-b-[2px] border-solid border-black py-2">
                <span className="text-[14px] tracking-widest">Register</span>
              </div>
            </div>
            <form className="w-[50%] px-4 flex flex-col justify-center items-center space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full">
              <input
                {...register("email")}
                type="email"
                placeholder="E-mail"
                className={cn(
                  "w-full border-b-[2px] outline-none border-black bg-transparent p-2",
                  { "border-red-500": errors.email }
                )}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="w-full">
              <input
                {...register("password")}
                type="password"
                placeholder="Password"
                className={cn(
                  "w-full border-b-[2px] outline-none border-black bg-transparent p-2",
                  { "border-red-500": errors.password }
                )}
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="flex justify-center w-full">
              <button
                type="submit"
                className="bg-black text-[16px] tracking-widest py-2 px-4 text-white w-full"
                disabled={isLoading}
              >
                Log in
              </button>
            </div>
            </form>
            </div>
        </div>
    </MaxWidthWrapper>
  )

}

export default Page