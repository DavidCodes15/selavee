"use client";
import { useState } from "react"

const AboutUs = () => {
    const [isHover, setIsHover] = useState(0);
    return (
      <>
      {/** gap-y-24 text-center sm:gap-x-0 md:gap-x-4 lg:gap-x-32 */}
      {/**updated code
       * w-full gap-16 lg:pl-4 xl:pl-10
       */}
       {/** code now : gap-y-24 text-center sm:gap-x-0 md:gap-x-4 lg:gap-x-32 */}
       <div className="w-full mt-60 mb-60 flex flex-col justify-center items-center space-y-28">
       <div className="w-full flex justify-center items-center">
        <h1 className="text-[18px] font-semibold tracking-widest">About us</h1>
       </div>
        <div
         id="grid" 
         className="w-full grid grid-cols-1 md:grid-cols-2 sm:gap-x-0 sm:gap-y-12 md:gap-x-10 md:gap-y-12 lg:gap-x-16 lg:gap-y-28 xl:gap-28"
         style={{
          display: "grid",
          placeContent: "center"
         }}
        >
        {/** pl-12 */}
          <div onMouseEnter={() => setIsHover(1)}
             onMouseLeave={() => setIsHover(0)}
              className="relative flex flex-1 flex-col justify-center space-y-6 cursor-pointer md:pl-5 lg:pl-6 xl:pl-14">
              <span className={`sm:px-2 lsm:px-4 md:px-0 transition duration-500 ease-in-out ${isHover == 1 ? 'bg-black text-white font-bold px-2' : 'text-black bg-transparent font-bold'} sm:text-[22px] lsm:text-[24px] md:text-[20px] lg:text-[22px] xl:text-[24px]`}>01</span>
              {/* max-w-[450px] */}
              <div className="sm:px-2 lsm:px-4 md:px-0 sm:w-full md:max-w-[350px] lg:max-w-[350px] xl:max-w-[450px]">
                <p className="leading-6 w-full tracking-widest sm:text-[13px] lsm:text-[14px] md:text-[11px] lg:text-[12px] xl:text-[14px] text-left">Notre newsletter vous convie à un voyage exclusif dans l&apos;univers de notre joaillerie.</p>
              </div>
              <img src="/onhovers/about.png" className={`transition duration-500 ease-in-out ${isHover == 4 ? 'opacity-100' : 'opacity-0'} absolute z-10 object-fit`} />
            </div>

            <div
            onMouseEnter={() => setIsHover(2)}
            onMouseLeave={() => setIsHover(0)}
             className="relative flex flex-1 flex-col justify-end items-start text-left space-y-6 cursor-pointer md:pl-5 lg:pl-6 xl:pl-14">
              <span className={`sm:px-2 lsm:px-4 md:px-0 transition duration-500 ease-in-out ${isHover == 2 ? 'bg-black text-white font-bold px-2' : 'text-black bg-transparent font-bold'} sm:text-[22px] lsm:text-[24px] md:text-[20px] lg:text-[22px] xl:text-[24px]`}>02</span>
              <div className="sm:px-2 lsm:px-4 md:px-0 sm:w-full md:max-w-[350px] lg:max-w-[350px] xl:max-w-[450px]">
                <p className="leading-6 w-full tracking-widest sm:text-[13px] lsm:text-[14px] md:text-[11px] lg:text-[12px] xl:text-[14px]">Notre newsletter vous convie à un voyage exclusif dans l&apos;univers de notre joaillerie.</p>
              </div>
              <img src="/onhovers/about.png" className={`transition duration-500 ease-in-out ${isHover == 3 ? 'opacity-100' : 'opacity-0'} absolute z-10 object-fit`} />
            </div>
            <div
            onMouseEnter={() => setIsHover(3)}
            onMouseLeave={() => setIsHover(0)}
            className="relative flex flex-1 flex-col justify-center items-start space-y-6 cursor-pointer md:pl-5 lg:pl-6 xl:pl-14">
              <span className={`sm:px-2 lsm:px-4 md:px-0 transition duration-500 ease-in-out ${isHover == 3 ? 'bg-black text-white font-bold px-2' : 'text-black bg-transparent font-bold'} sm:text-[22px] lsm:text-[24px] md:text-[20px] lg:text-[22px] xl:text-[24px]`}>03</span>
              <div className="sm:px-2 lsm:px-4 md:px-0 sm:w-full md:max-w-[350px] lg:max-w-[350px] xl:max-w-[450px]">
                <p className="leading-6 w-full tracking-widest sm:text-[13px] lsm:text-[14px] md:text-[11px] lg:text-[12px] xl:text-[14px] text-left">Notre newsletter vous convie à un voyage exclusif dans l&apos;univers de notre joaillerie.</p>
              </div>
              <img src="/onhovers/about.png" className={`transition duration-500 ease-in-out ${isHover == 2 ? 'opacity-100' : 'opacity-0'} absolute z-10 object-fit`} />
            </div>
            <div
            onMouseEnter={() => setIsHover(4)}
            onMouseLeave={() => setIsHover(0)}
            className="relative flex flex-1 flex-col justify-end items-start text-left space-y-6 cursor-pointer md:pl-5 lg:pl-6 xl:pl-14">
              <span className={`sm:px-2 lsm:px-4 md:px-0 transition duration-500 ease-in-out ${isHover == 4 ? 'bg-black text-white font-bold px-2' : 'text-black bg-transparent font-bold'} sm:text-[22px] lsm:text-[24px] md:text-[20px] lg:text-[22px] xl:text-[24px] z-0`}>04</span>
              <div className="sm:px-2 lsm:px-4 md:px-0 sm:w-full md:max-w-[350px] lg:max-w-[350px] xl:max-w-[450px] z-0">
                <p className="leading-6 w-full tracking-widest sm:text-[13px] lsm:text-[14px] md:text-[11px] lg:text-[12px] xl:text-[14px]">Notre newsletter vous convie à un voyage exclusif dans l&apos;univers de notre joaillerie.</p>
              </div>
              <img src="/onhovers/about.png" className={`transition duration-500 ease-in-out ${isHover == 1 ? 'opacity-100' : 'opacity-0'} absolute z-10 object-fit`} />
            </div>
        </div>
        </div>
        </>
    )
}

export default AboutUs