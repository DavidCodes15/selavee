"use client";
import { cn } from "@/lib/utils";
import z from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "@/app/trpc/client";
import { AuthCredentialsValidator } from "@/lib/validators/AccountCredentialsValidator";
import { TAuthCredentialsValidator } from "@/lib/validators/AccountCredentialsValidator";
import { ZodError } from "zod";
import { Loader2, MailCheckIcon, MailCheck } from "lucide-react";
import { useState, useEffect } from "react";
const Register = () => {
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [sentCode, setSentCode] = useState("");  // Store the sent code
  const [enteredCode, setEnteredCode] = useState(""); // Store the entered code
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [isLoadingClick, setIsLoadingClick] = useState(false);
  const handleVerificationCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredCode(e.target.value);
  };
  useEffect(() => {
    // Validate the entered code whenever it changes
    if (enteredCode.length === 7) {
      setIsLoadingClick(true);
      if (enteredCode === sentCode) {
        setVerificationSuccess(true);
        setIsLoadingClick(false);
        toast.success("Email verified successfully!");
        // Perform further actions if needed
      } else {
        toast.error("Invalid verification code. Please try again.");
        setEnteredCode("");
        setIsLoadingClick(false);
      }
      setIsLoadingClick(false);
    }
  }, [enteredCode, sentCode]);
  // const handleVerificationSubmit = () => {
  //   setIsLoadingClick(!isLoadingClick);
  //   if (enteredCode === sentCode) {
  //     setVerificationSuccess(true);
  //     toast.success("Email verified successfully!");
  //     // You can redirect the user to another page or perform further actions
  //   } else {
  //     toast.error("Invalid verification code. Please try again.");
  //     setEnteredCode("");
  //     setIsLoadingClick(false);
  //   }
  // };
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
        onSuccess: ({sentToEmail, code}) => {
            toast.success(`Verification email sent to ${sentToEmail}.`)
            // router.push(`/auth/verify-email?to=${sentToEmail}`)
            setSuccess(true);
            setSentCode(code);
            // setSuccessMessage(`Verification email sent to ${sentToEmail}.`);
        }

      })
      // const {data, isLoading: isVerifyLoading} = trpc.auth.verifyEmail.useQuery({
      //   emailVerificationCode: enteredCode,
      // })
      const onSubmit = ({
        email,
        firstName,
        lastName,
        phone,
        password,
      }: TAuthCredentialsValidator) => {
        mutate({ email, firstName, lastName, phone, password })
      }
      return(
        <div className="w-full">
          {success ? (
            verificationSuccess ? (
              <div className="flex w-full flex-col items-center justify-center space-y-4">
              <MailCheck className="h-8 w-8"/>
              <p className="text-[14px] tracking-widest">you successfully verified your email !</p>
              <p className="text-[14px] tracking-widest">now please try and log in</p>
            </div>
            ): (
              <div className="flex w-full flex-col items-center justify-center space-y-4">
              <MailCheckIcon className="h-8 w-8"/>
              <p className="text-[14px] tracking-widest">{successMessage}</p>
              {/* <form className="flex flex-col justify-center items-center" onSubmit={handleVerificationSubmit}> */}
                <label className="text-center text-[16px] tracking-widest w-[200px]">
                  {isLoadingClick ? (
                    <>
                    Verifying...
                    </>
                  ): (
                    <>
                    Please Verify your email!
                    </>
                  )}
                
                  </label>
              <input maxLength={7} className="verification-code" value={enteredCode} onChange={handleVerificationCodeChange}/>
              {/* <button disabled={isLoadingClick} onClick={handleVerificationSubmit} type="submit" className="w-full py-2 text-white text-[14px] tracking-widest bg-black">
                Verify
              </button> */}
              {/* </form> */}
            </div>
            )
              
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
                    {...register('firstName')}
                     name="firstName"
                      type="text"
                      className={cn("w-full border-b-[1px] border-black border-solid bg-transparent px-2 py-[12px] outline-none placeholder:text-[14px] placeholder:tracking-widest placeholder:text-black", {"border-red-500": errors.firstName})}
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
                      className={cn("w-full border-b-[1px] border-black border-solid bg-transparent px-2 py-[12px] outline-none placeholder:text-[14px] placeholder:tracking-widest placeholder:text-black", {"border-red-500": errors.lastName})}
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
                      className={cn("w-full border-b-[1px] border-black border-solid bg-transparent px-2 py-[12px] outline-none placeholder:text-[14px] placeholder:tracking-widest placeholder:text-black", {"border-red-500": errors.phone})}
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
                        <span>Register</span>
                      )}
                    </button>
                  </div>
                </form>
          )}
                
              </div>
      )
}

export default Register