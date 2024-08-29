"use client";
import { trpc } from "@/app/trpc/client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {useForm} from "react-hook-form"
import { AuthCredentialsValidator } from "@/lib/validators/AccountCredentialsValidator";
import { TAuthCredentialsValidator } from "@/lib/validators/AccountCredentialsValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodError } from "zod";
const Page = () => {
    // type FormData = {
    //     email: string;
    //     firstName: string;
    //     lastName: string;
    //     phone: string;
    //     password: string;
    //   };
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<TAuthCredentialsValidator>({
        resolver: zodResolver(AuthCredentialsValidator),
      })
      const router = useRouter();
      const {mutate, isLoading} = trpc.auth.createUser.useMutation({
        onError: (err) => {
            if(err.data?.code == "CONFLICT"){
                toast.error("This email is already in use. Sign in instead?")
                return
            }
            if(err instanceof ZodError){
                toast.error(err.issues[0].message)
                return
            }
            toast.error("Something went wrong. Please try again")
        },
        onSuccess: ({sentToEmail}) => {
            toast.success(`Verification email sent to ${sentToEmail}.`)
            router.push(`/auth/verify-email?to=${sentToEmail}`)
        }

      })
      const onSubmit = ({
        email,
        firstName,
        lastName,
        phone,
        password,
      }: TAuthCredentialsValidator) => {
        mutate({ email, firstName, lastName, phone, password })
      }
    //   const onSubmit = ({ email, firstName, lastName, phone, password }: FormData) => {
    //     console.log("Form submitted:", { email, firstName, lastName, phone, password });
    //     mutate({email, firstName, lastName, phone, password}, {
    //         onError: (error) => {
    //             console.error("Error during user creation:", error);
    //           },
    //           onSuccess: (data) => {
    //             console.log("User created successfully:", data);
    //           },
    //     })
    //   };
    return (

        <>
          
            <MaxWidthWrapper className="mt-56 min-h-screen">
        <div className="flex w-full items-center justify-center">
          <div className="flex w-[50%] flex-col items-center justify-center px-4">
            <div className="flex w-[90%] items-center justify-center space-x-8 px-4">
              <div className="flex h-fit w-1/2 items-center justify-center border-b-[2px] border-solid border-black py-2">
                <span className="text-[14px] tracking-widest">Log in</span>
              </div>
              <div className="flex h-fit w-1/2 items-center justify-center border-b-[2px] border-solid border-black py-2">
                <span className="text-[14px] tracking-widest">Register</span>
              </div>
            </div>
            <div className="mt-12 w-full">
                {/**
                 * onSubmit={(e) => {
        //   e.preventDefault(); // Prevent the default form submission
        //   const formData = new FormData(e.currentTarget);
        //   onSubmit({
        //     email: formData.get("email") as string,
        //     firstName: formData.get("firstName") as string,
        //     lastName: formData.get("lastName") as string,
        //     phone: (formData.get("phone")) as string,
        //     password: formData.get("password") as string,
        //   });
                 */}
              <form
              onSubmit={handleSubmit(onSubmit)}
                className="flex w-full flex-col items-start justify-center space-y-4">
                <div className="flex w-full flex-col items-center justify-center space-y-4">
                  <div className="w-full">
                    <input
                    {...register('email')}
                    name="email"
                      type="email"
                      className={cn("w-full border-b-[2px] border-black border-solid bg-transparent p-2 outline-none placeholder:text-[14px] placeholder:text-black", {"border-red-500": errors.email})}
                      placeholder="E-mail"
                    />
                    {errors?.email && (
                    <p className='text-sm text-red-500'>
                      {errors.email.message}
                    </p>
                  )}
                  </div>
                  <div className="w-full">
                 
                    <input
                    {...register('firstName')}
                     name="firstName"
                      type="text"
                      className={cn("w-full border-b-[2px] border-black border-solid bg-transparent p-2 outline-none placeholder:text-[14px] placeholder:text-black", {"border-red-500": errors.firstName})}
                      placeholder="First name"
                    />
                    {errors?.firstName && (
                    <p className='text-sm text-red-500'>
                      {errors.firstName.message}
                    </p>
                  )}
                  </div>
                  <div className="w-full">
                    <input
                    {...register('lastName')}
                     name="lastName"
                      type="text"
                      className={cn("w-full border-b-[2px] border-black border-solid bg-transparent p-2 outline-none placeholder:text-[14px] placeholder:text-black", {"border-red-500": errors.lastName})}
                      placeholder="Last name"
                    />
                    {errors?.lastName && (
                    <p className='text-sm text-red-500'>
                      {errors.lastName.message}
                    </p>
                  )}
                  </div>
                  <div className="w-full">
                    <input
                    {...register('phone')}
                        name="phone"
                      type="number"
                      className={cn("w-full border-b-[2px] border-black border-solid bg-transparent p-2 outline-none placeholder:text-[14px] placeholder:text-black", {"border-red-500": errors.phone})}
                      placeholder="phone number"
                    />
                    {errors?.phone && (
                    <p className='text-sm text-red-500'>
                      {errors.phone.message}
                    </p>
                  )}
                  </div>
                  <div className="w-full">
                    <input
                    {...register('password')}
                    name="password"
                      type="password"
                      className={cn("w-full border-b-[2px] border-black border-solid bg-transparent p-2 outline-none placeholder:text-[14px] placeholder:text-black", {"border-red-500": errors.password})}
                      placeholder="Password"
                    />
                    {errors?.password && (
                    <p className='text-sm text-red-500'>
                      {errors.password.message}
                    </p>
                  )}
                  </div>
                </div>
                <div className="flex w-full items-center justify-start space-x-2">
                  <input required id="checkbox" type="checkbox" />
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
                  <button className="flex w-full items-center justify-center bg-black py-2 text-[16px] tracking-widest text-white">
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>    
             
        </>
    )
}

export default Page