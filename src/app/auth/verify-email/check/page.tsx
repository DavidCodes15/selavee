import MaxWidthWrapper from "@/components/MaxWidthWrapper"

const Page = () => {

    return(
        <>
        <MaxWidthWrapper>
            <div className="w-full min-h-screen flex justify-center items-center">
            <p className='text-muted-foreground text-center'>
                We&apos;ve sent a verification link to{' '}
                <span className='font-semibold'>
                  data.basketball123@gmail.com
                </span>
                .
              </p>
            </div>
        </MaxWidthWrapper>
        </>
    )
}

export default Page