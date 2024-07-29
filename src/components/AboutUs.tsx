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
        <div id="grid" className="mt-80 mb-24 grid grid-cols-1 md:grid-cols-2 gap-y-24 text-center sm:gap-x-0 md:gap-x-4 lg:gap-x-32">
        {/** pl-12 */}
          <div onMouseEnter={() => setIsHover(1)}
             onMouseLeave={() => setIsHover(0)}
              className="relative flex flex-1 flex-col justify-center items-start space-y-6 cursor-pointer pl-12">
              <span className={`transition duration-500 ease-in-out ${isHover == 1 ? 'bg-black text-white font-bold px-2' : 'text-black bg-transparent font-bold'} text-[24px]`}>01</span>
              {/* max-w-[450px] */}
              <div className="max-w-[450px]">
                <p className="leading-6 w-full tracking-widest text-[14px] text-left">Notre newsletter vous convie à un voyage exclusif dans l&apos;univers de notre joaillerie.</p>
              </div>
              <img src="/onhovers/about.png" className={`transition duration-500 ease-in-out ${isHover == 4 ? 'opacity-100' : 'opacity-0'} absolute z-10 object-fit`} />
            </div>

            <div
            onMouseEnter={() => setIsHover(2)}
            onMouseLeave={() => setIsHover(0)}
             className="relative flex flex-1 flex-col justify-end items-start text-left space-y-6 cursor-pointer pl-12">
              <span className={`transition duration-500 ease-in-out ${isHover == 2 ? 'bg-black text-white font-bold px-2' : 'text-black bg-transparent font-bold'} text-[24px]`}>02</span>
              <div className="max-w-[450px]">
                <p className="leading-6 w-full tracking-widest text-[14px]">Notre newsletter vous convie à un voyage exclusif dans l&apos;univers de notre joaillerie.</p>
              </div>
              <img src="/onhovers/about.png" className={`transition duration-500 ease-in-out ${isHover == 3 ? 'opacity-100' : 'opacity-0'} absolute z-10 object-fit`} />
            </div>
            <div
            onMouseEnter={() => setIsHover(3)}
            onMouseLeave={() => setIsHover(0)}
            className="relative flex flex-1 flex-col justify-center items-start space-y-6 cursor-pointer pl-12">
              <span className={`transition duration-500 ease-in-out ${isHover == 3 ? 'bg-black text-white font-bold px-2' : 'text-black bg-transparent font-bold'} text-[24px]`}>03</span>
              <div className="max-w-[450px]">
                <p className="leading-6 w-full tracking-widest text-[14px] text-left">Notre newsletter vous convie à un voyage exclusif dans l&apos;univers de notre joaillerie.</p>
              </div>
              <img src="/onhovers/about.png" className={`transition duration-500 ease-in-out ${isHover == 2 ? 'opacity-100' : 'opacity-0'} absolute z-10 object-fit`} />
            </div>
            <div
            onMouseEnter={() => setIsHover(4)}
            onMouseLeave={() => setIsHover(0)}
            className="relative flex flex-1 flex-col justify-end items-start text-left space-y-6 cursor-pointer pl-12">
              <span className={`transition duration-500 ease-in-out ${isHover == 4 ? 'bg-black text-white font-bold px-2' : 'text-black bg-transparent font-bold'} text-[24px] z-0`}>04</span>
              <div className="max-w-[450px] z-0">
                <p className="leading-6 w-full tracking-widest text-[14px]">Notre newsletter vous convie à un voyage exclusif dans l&apos;univers de notre joaillerie.</p>
              </div>
              <img src="/onhovers/about.png" className={`transition duration-500 ease-in-out ${isHover == 1 ? 'opacity-100' : 'opacity-0'} absolute z-10 object-fit`} />
            </div>
        </div>
        </>
    )
}

export default AboutUs