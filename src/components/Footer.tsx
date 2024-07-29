"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Major_Mono_Display } from "next/font/google";
import { Dancing_Script } from "next/font/google";
import Link from "next/link";
const mono = Major_Mono_Display({
    subsets: ["latin"],
    weight: "400",
  });
  const dancing = Dancing_Script({
    subsets: ["latin"],
    weight: "400",
  });
  type Section = 'clientCare' | 'ourCompany' | 'products';
const Footer = () => {
    const [isClientCareVisible, setIsClientCareVisible] = useState(true);
  const [isOurCompanyVisible, setIsOurCompanyVisible] = useState(true);
  const [isProductsVisible, setIsProductsVisible] = useState(true);

  const handleAccordion = (section: Section) => {
    if (section === "clientCare") {
      setIsClientCareVisible(!isClientCareVisible);
    } else if (section === "ourCompany") {
      setIsOurCompanyVisible(!isOurCompanyVisible);
    } else if (section === "products") {
      setIsProductsVisible(!isProductsVisible);
    }
  };
  const [isTyping, setIsTyping] = useState(false); // State to track if user is typing

  const handleFocus = () => {
    setIsTyping(true); // Update state when input is focused
  };

  const handleBlur = () => {
    setIsTyping(false); // Update state when input is blurred
  };
    return (
        <>
            <footer className="bg-[#F8F8F8] relative px-6 py-24">
                {/**lg:space-x-24 */}
            <div className="h-fit flex flex-col justify-center items-start space-y-12 space-x-0 lg:space-y-0 lg:flex-row lg:justify-between lg:items-start">
              {/** lg:pl-12 xl:pl-0 w-full */}
              <div className="flex w-full lg:flex-1 justify-center items-start space-x-0 space-y-6 flex-col lg:space-x-12 lg:space-y-0 lg:flex-row lg:pt-5">
                <ul className="w-full flex items-start justify-between lg:w-fit lg:justify-center lg:items-center">
                   <div className="flex flex-col text-[14px] justify-center items-start space-y-4 tracking-widest">
                   <li className="font-semibold text-black">Client Care</li>
                   {isClientCareVisible && (
                    <>
                    <li className="text-[#4D4D4D] cursor-pointer"><Link href="/client-care/diamond-guide">Diamond Guide</Link></li>
                    <li className="text-[#4D4D4D] cursor-pointer">Jewelry Care Instructions</li>
                    <li className="text-[#4D4D4D] cursor-pointer">Jewelry Repair</li>
                    <li className="text-[#4D4D4D] cursor-pointer">Shipping, Return & Exchange</li>
                    <li className="text-[#4D4D4D] cursor-pointer">FAQ</li>
                    <li className="text-[#4D4D4D] cursor-pointer">Contact Us</li>
                    </>
                   )}
                   </div>
                    <div className="block lg:hidden">
                    
                           
                       
                            <img onClick={() => handleAccordion("clientCare")} src="/icons/size-guide-arrow.svg" className={`w-[20px] h-[20px] cursor-pointer ${isClientCareVisible ? "rotate-180" : ""}`} />
                       
                    </div>
                </ul>
                <ul className="w-full flex items-start justify-between lg:w-fit lg:justify-center lg:items-center">
                    <div className="flex flex-col text-[14px] justify-center items-start space-y-4 tracking-widest">
                    <li className="font-semibold text-black">Our Company</li>
                    {isOurCompanyVisible && (
                        <>
                        <li className="text-[#4D4D4D] cursor-pointer">World of Sela Vee</li>
                    <li className="text-[#4D4D4D] cursor-pointer">Terms of Use</li>
                    <li className="text-[#4D4D4D] cursor-pointer">Privacy Policy</li>
                    <li className="text-[#4D4D4D] cursor-pointer">Website Accessibility</li>
                        </>
                    )}
                    </div>
                    <div className="block lg:hidden">
                    <img
                  onClick={() => handleAccordion("ourCompany")}
                  src="/icons/size-guide-arrow.svg"
                  className={`w-[20px] h-[20px] cursor-pointer ${isOurCompanyVisible ? "rotate-180" : ""}`}
                />
                    </div>
                </ul>
                <ul className="w-full flex items-start justify-between lg:w-fit lg:justify-center lg:items-center">
                    <div className="flex flex-col text-[14px] justify-center items-start space-y-4 tracking-widest">
                    <li className="font-semibold text-black">Products</li>
                    {isProductsVisible && (
                        <>
                        <li className="text-[#4D4D4D] cursor-pointer">New in</li>
                    <li className="text-[#4D4D4D] cursor-pointer">Best Seller</li>
                    <li className="text-[#4D4D4D] cursor-pointer">Necklace</li>
                    <li className="text-[#4D4D4D] cursor-pointer">Bracelets</li>
                    <li className="text-[#4D4D4D] cursor-pointer">Rings</li>
                    <li className="text-[#4D4D4D] cursor-pointer">Earrings</li>
                    <li className="text-[#4D4D4D] cursor-pointer">Sale</li>
                        </>
                    )}
                    </div>
                    <div className="block lg:hidden">
                    <img
                  onClick={() => handleAccordion("products")}
                  src="/icons/size-guide-arrow.svg"
                  className={`w-[20px] h-[20px] cursor-pointer ${isProductsVisible ? "rotate-180" : ""}`}
                />
                    </div>
                </ul>
               
              </div>
              {/** w-full lg:w-fit */}
              <div className="w-full h-full lg:pl-12 flex flex-col justify-between lg:flex-1 sm:items-start sm:space-y-4 lg:space-y-28">
                    <div className="w-full flex flex-1">
                      {/**mr-[0px] lg:mr-[200px] */}
                      <span className={cn("sm:text-[38px] msm:text-[48px]", mono.className)}>subscribe</span>
                            
                    </div>
                    <div className="flex flex-col justify-center items-start w-full sm:space-y-6 lg:space-y-[55px]">
                    <div className="w-full flex flex-1">
                      <form method="POST" className={`border-b-[1px] ${isTyping ? "border-black" : "border-[#CCCCCC] hover:border-[#B3B3B3]"}  border-solid flex justify-start w-full items-center py-2 px-2`}>
                                <input onFocus={handleFocus} onBlur={handleBlur} placeholder="Your mail" className={`outline-none w-[90%] tracking-widest bg-transparent ${isTyping ? "placeholder:text-[#CCCCCC]" : "hover:text-[#B3B3B3]"}  placeholder:tracking-widest placeholder:text-[14px] cursor-pointer`}/>
                                <button type="submit" className="font-bold tracking-widest text-[16px]">SEND</button>
                            </form>
                    </div>
                            <div className="flex flex-1 justify-start items-end space-x-4 w-full">
                                <div className="border-black border-[1px] border-solid py-2 px-[12px]">
                                <img src="/icons/facebook.svg" className="w-[11px] h-[16px]" />
                                
                                </div>
                                <div className="border-black border-[1px] border-solid py-2 px-[10px]">
                                <img src="/icons/instagram.svg" className="w-[16px] h-[16px]" />
                                </div>
                                <div className="border-black border-[1px] border-solid py-2 px-[10px]">
                                <img src="/icons/linked-in.svg" className="w-[16px] h-[16px]" />
                                </div>
                                <div className="border-black border-[1px] border-solid py-2 px-[10px]">
                                <img src="/icons/tik-tok.svg" className="w-[16px] h-[16px]" />
                                </div>
                            </div>
                          </div>
                </div>

            </div>

            </footer>
        </>   
    )
}

export default Footer