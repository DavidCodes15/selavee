import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import VerifyEmailComponent from "@/components/VerifyEmailComponent"
interface PageProps {
    searchParams: {[key: string]: string | string[] | undefined}
}
import Image from "next/image"

const VerifyEmail = ({searchParams}: PageProps) => {
    const token = searchParams.token
    const toEmail = searchParams.to
    return (
        <>
        <MaxWidthWrapper>
            <div className="min-h-screen w-full flex justify-center items-center">
            {token && typeof token === 'string' ? (
          <div className='grid gap-6'>
            <VerifyEmailComponent token={token as string} />
          </div>
        ) : (
          <div className='flex h-full flex-col items-center justify-center space-y-1'>
            <div className='relative mb-4 h-60 w-60 text-muted-foreground'>
              <Image
                src='/black_logo.svg'
                fill
                alt='hippo email sent image'
              />
            </div>

            <h3 className='font-semibold text-2xl'>
              Check your email
            </h3>

            {toEmail ? (
              <p className='text-muted-foreground text-center'>
                We&apos;ve sent a verification link to{' '}
                <span className='font-semibold'>
                  {toEmail}
                </span>
                .
              </p>
            ) : (
              <p className='text-muted-foreground text-center'>
                We&apos;ve sent a verification link to your
                email.
              </p>
            )}
          </div>
        )}
            </div>
            </MaxWidthWrapper>
        </>
    )
}

export default VerifyEmail