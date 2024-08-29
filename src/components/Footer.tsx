"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Major_Mono_Display } from "next/font/google";
import { Dancing_Script } from "next/font/google";
import Link from "next/link";
import Modal from "./Modal";
import { usePathname } from "next/navigation";
const mono = Major_Mono_Display({
  subsets: ["latin"],
  weight: "400",
});
const dancing = Dancing_Script({
  subsets: ["latin"],
  weight: "400",
});
type Section = "clientCare" | "ourCompany" | "products";
const Footer = () => {
  const [isClientCareVisible, setIsClientCareVisible] = useState(true);
  const [isOurCompanyVisible, setIsOurCompanyVisible] = useState(true);
  const [isProductsVisible, setIsProductsVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const handleJewelryCare = () => {
    setIsModalOpen(!isModalOpen);
    setModalType("jewelry-care");
  };
  const handleJewelryRepair = () => {
    setIsModalOpen(!isModalOpen);
    setModalType("jewelry-repair");
  };
  const handleShipping = () => {
    setIsModalOpen(!isModalOpen);
    setModalType("shipping");
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
  const pathname = usePathname();
  if(pathname === "/selavee/admin"){
    return null;
  }
  return (
    <>
      <footer className="relative bg-[#F8F8F8] px-6 py-24">
        {/**lg:space-x-24 */}
        <div className="flex h-fit flex-col items-start justify-center space-x-0 space-y-12 lg:flex-row lg:items-start lg:justify-between lg:space-y-0">
          {/** lg:pl-12 xl:pl-0 w-full */}
          <div className="flex w-full flex-col items-start justify-center space-x-0 space-y-6 lg:flex-1 lg:flex-row lg:space-x-12 lg:space-y-0 lg:pt-5">
            <ul className="flex w-full items-start justify-between lg:w-fit lg:items-center lg:justify-center">
              <div className="flex flex-col items-start justify-center space-y-4 text-[14px] tracking-widest">
                <li className="font-semibold text-black">Client Care</li>
                {isClientCareVisible && (
                  <>
                    <li className="cursor-pointer text-[#4D4D4D]">
                      <Link href="/client-care/diamond-guide">
                        Diamond Guide
                      </Link>
                    </li>
                    <li
                      onClick={handleJewelryCare}
                      className="cursor-pointer text-[#4D4D4D]"
                    >
                      Jewelry Care Instructions
                    </li>
                    <li
                      onClick={handleJewelryRepair}
                      className="cursor-pointer text-[#4D4D4D]"
                    >
                      Jewelry Repair
                    </li>
                    <li
                      onClick={handleShipping}
                      className="cursor-pointer text-[#4D4D4D]"
                    >
                      Shipping, Return & Exchange
                    </li>
                    <li className="cursor-pointer text-[#4D4D4D]">FAQ</li>
                    <li className="cursor-pointer text-[#4D4D4D]">
                      <Link href="/contact">Contact Us</Link>
                    </li>
                  </>
                )}
              </div>
              <div className="block lg:hidden">
                <img
                  onClick={() => handleAccordion("clientCare")}
                  src="/icons/size-guide-arrow.svg"
                  className={`h-[20px] w-[20px] cursor-pointer ${isClientCareVisible ? "rotate-180" : ""}`}
                />
              </div>
            </ul>
            <ul className="flex w-full items-start justify-between lg:w-fit lg:items-center lg:justify-center">
              <div className="flex flex-col items-start justify-center space-y-4 text-[14px] tracking-widest">
                <li className="font-semibold text-black">Our Company</li>
                {isOurCompanyVisible && (
                  <>
                    <li className="cursor-pointer text-[#4D4D4D]">
                      World of Sela Vee
                    </li>
                    <li className="cursor-pointer text-[#4D4D4D]">
                      Terms of Use
                    </li>
                    <li className="cursor-pointer text-[#4D4D4D]">
                      Privacy Policy
                    </li>
                    <li className="cursor-pointer text-[#4D4D4D]">
                      Website Accessibility
                    </li>
                  </>
                )}
              </div>
              <div className="block lg:hidden">
                <img
                  onClick={() => handleAccordion("ourCompany")}
                  src="/icons/size-guide-arrow.svg"
                  className={`h-[20px] w-[20px] cursor-pointer ${isOurCompanyVisible ? "rotate-180" : ""}`}
                />
              </div>
            </ul>
            <ul className="flex w-full items-start justify-between lg:w-fit lg:items-center lg:justify-center">
              <div className="flex flex-col items-start justify-center space-y-4 text-[14px] tracking-widest">
                <li className="font-semibold text-black">Products</li>
                {isProductsVisible && (
                  <>
                    <li className="cursor-pointer text-[#4D4D4D]">
                      <Link href="/products/new-in">New in</Link></li>
                    <li className="cursor-pointer text-[#4D4D4D]">
                      <Link href="/products/best-seller">Best Seller</Link>
                    </li>
                    <li className="cursor-pointer text-[#4D4D4D]">
                    <Link href="/products/necklaces">Necklaces</Link></li>
                    <li className="cursor-pointer text-[#4D4D4D]"><Link href="/products/bracelets">Bracelets</Link></li>
                    <li className="cursor-pointer text-[#4D4D4D]"><Link href="/products/rings">Rings</Link></li>
                    <li className="cursor-pointer text-[#4D4D4D]"><Link href="/products/earrings">Earrings</Link></li>
                    <li className="cursor-pointer text-[#4D4D4D]"><Link href="/products/sale">Sale</Link></li>
                  </>
                )}
              </div>
              <div className="block lg:hidden">
                <img
                  onClick={() => handleAccordion("products")}
                  src="/icons/size-guide-arrow.svg"
                  className={`h-[20px] w-[20px] cursor-pointer ${isProductsVisible ? "rotate-180" : ""}`}
                />
              </div>
            </ul>
          </div>
          {/** w-full lg:w-fit */}
          <div className="flex h-full w-full flex-col justify-between sm:items-start sm:space-y-4 lg:flex-1 lg:space-y-28 lg:pl-12">
            <div className="flex w-full flex-1">
              {/**mr-[0px] lg:mr-[200px] */}
              <span
                className={cn("sm:text-[38px] msm:text-[48px]", mono.className)}
              >
                subscribe
              </span>
            </div>
            <div className="flex w-full flex-col items-start justify-center sm:space-y-6 lg:space-y-[55px]">
              <div className="flex w-full flex-1">
                <form
                  method="POST"
                  className={`border-b-[1px] ${isTyping ? "border-black" : "border-[#CCCCCC] hover:border-[#B3B3B3]"} flex w-[75%] items-center justify-start border-solid px-2 py-2`}
                >
                  <input
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder="Your mail"
                    className={`w-[90%] bg-transparent tracking-widest outline-none ${isTyping ? "placeholder:text-[#CCCCCC]" : "hover:text-[#B3B3B3]"} cursor-pointer placeholder:text-[14px] placeholder:tracking-widest`}
                  />
                  <button
                    type="submit"
                    className="text-[16px] font-bold tracking-widest"
                  >
                    SEND
                  </button>
                </form>
              </div>
              <div className="flex w-full flex-1 items-end justify-start space-x-4">
                <div className="border-[1px] border-solid border-black px-[12px] py-2">
                  <img
                    src="/icons/facebook.svg"
                    className="h-[16px] w-[11px]"
                  />
                </div>
                <div className="border-[1px] border-solid border-black px-[10px] py-2">
                  <img
                    src="/icons/instagram.svg"
                    className="h-[16px] w-[16px]"
                  />
                </div>
                <div className="border-[1px] border-solid border-black px-[10px] py-2">
                  <img
                    src="/icons/linked-in.svg"
                    className="h-[16px] w-[16px]"
                  />
                </div>
                <div className="border-[1px] border-solid border-black px-[10px] py-2">
                  <img src="/icons/tik-tok.svg" className="h-[16px] w-[16px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          {modalType === "jewelry-repair" && (
            <>
             <div className="flex w-full items-center justify-end">
                <img
                  onClick={handleCloseModal}
                  src="/icons/close.svg"
                  className="h-[24px] w-[24px] cursor-pointer"
                />
              </div>
              <div className="flex items-center justify-center">
                <h1 className="text-[18px] font-semibold tracking-widest">
                  Jewelry Repair
                </h1>
              </div>
              <div className="mt-12 flex items-center justify-center">
                <p className="w-full max-w-[900px] text-[14px] tracking-widest">
                  At Sela Vee, we are pleased to offer professional jewelry
                  repair services to keep your cherished pieces in excellent
                  condition. Please review our paid jewelry repair policy to
                  understand how we handle repair requests that require payment:
                </p>
              </div>
              <div className="mb-12 mt-24 flex max-w-[992px] items-center justify-center pl-16 tracking-widest">
                <ol className="flex list-decimal flex-col items-start justify-center space-y-4">
                  <div className="flex flex-col items-start justify-center">
                    <li className="text-[16px] font-semibold tracking-widest">
                      Store Jewelry Properly:
                    </li>
                    <ul className="list-disc">
                      <li>
                        Use individual jewelry pouches, boxes, or compartments
                        to prevent pieces from scratching each other and
                        tangling. 
                      </li>
                      <li>
                        Store fine jewelry in a cool, dry place away from direct
                        sunlight.
                      </li>
                      <li>
                        Keep jewelry away from extreme temperatures, humidity,
                        and moisture to prevent tarnishing and damage. 
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-col items-start justify-center">
                    <li className="text-[16px] font-semibold tracking-widest">
                      Clean Regularly:
                    </li>
                    <ul className="list-disc">
                      <li>
                        Use individual jewelry pouches, boxes, or compartments
                        to prevent pieces from scratching each other and
                        tangling. 
                      </li>
                      <li>
                        Store fine jewelry in a cool, dry place away from direct
                        sunlight.
                      </li>
                      <li>
                        Keep jewelry away from extreme temperatures, humidity,
                        and moisture to prevent tarnishing and damage. 
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-col items-start justify-center">
                    <li className="text-[16px] font-semibold tracking-widest">
                      Proffesional Cleaning:
                    </li>
                    <ul className="list-disc">
                      <li>
                        Use individual jewelry pouches, boxes, or compartments
                        to prevent pieces from scratching each other and
                        tangling. 
                      </li>
                      <li>
                        Store fine jewelry in a cool, dry place away from direct
                        sunlight.
                      </li>
                      <li>
                        Keep jewelry away from extreme temperatures, humidity,
                        and moisture to prevent tarnishing and damage. 
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-col items-start justify-center">
                    <li className="text-[16px] font-semibold tracking-widest">
                      Wear Jewelry with Care:
                    </li>
                    <ul className="list-disc">
                      <li>
                        Use individual jewelry pouches, boxes, or compartments
                        to prevent pieces from scratching each other and
                        tangling. 
                      </li>
                      <li>
                        Store fine jewelry in a cool, dry place away from direct
                        sunlight.
                      </li>
                      <li>
                        Keep jewelry away from extreme temperatures, humidity,
                        and moisture to prevent tarnishing and damage. 
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-col items-start justify-center">
                    <li className="text-[16px] font-semibold tracking-widest">
                      Avoid Harsh Chemicals:
                    </li>
                    <ul className="list-disc">
                      <li>
                        Use individual jewelry pouches, boxes, or compartments
                        to prevent pieces from scratching each other and
                        tangling. 
                      </li>
                      <li>
                        Store fine jewelry in a cool, dry place away from direct
                        sunlight.
                      </li>
                      <li>
                        Keep jewelry away from extreme temperatures, humidity,
                        and moisture to prevent tarnishing and damage. 
                      </li>
                    </ul>
                  </div>

                  <div className="flex flex-col items-start justify-center">
                    <li className="text-[16px] font-semibold tracking-widest">
                      Avoid Harsh Chemicals:
                    </li>
                    <ul className="list-disc">
                      <li>
                        Use individual jewelry pouches, boxes, or compartments
                        to prevent pieces from scratching each other and
                        tangling. 
                      </li>
                      <li>
                        Store fine jewelry in a cool, dry place away from direct
                        sunlight.
                      </li>
                      <li>
                        Keep jewelry away from extreme temperatures, humidity,
                        and moisture to prevent tarnishing and damage. 
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-col items-start justify-center">
                    <li className="text-[16px] font-semibold tracking-widest">
                      Avoid Harsh Chemicals:
                    </li>
                    <ul className="list-disc">
                      <li>
                        Use individual jewelry pouches, boxes, or compartments
                        to prevent pieces from scratching each other and
                        tangling. 
                      </li>
                      <li>
                        Store fine jewelry in a cool, dry place away from direct
                        sunlight.
                      </li>
                      <li>
                        Keep jewelry away from extreme temperatures, humidity,
                        and moisture to prevent tarnishing and damage. 
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-col items-start justify-center">
                    <li className="text-[16px] font-semibold tracking-widest">
                      Avoid Harsh Chemicals:
                    </li>
                    <ul className="list-disc">
                      <li>
                        Use individual jewelry pouches, boxes, or compartments
                        to prevent pieces from scratching each other and
                        tangling. 
                      </li>
                      <li>
                        Store fine jewelry in a cool, dry place away from direct
                        sunlight.
                      </li>
                      <li>
                        Keep jewelry away from extreme temperatures, humidity,
                        and moisture to prevent tarnishing and damage. 
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-col items-start justify-center">
                    <li className="text-[16px] font-semibold tracking-widest">
                      Avoid Harsh Chemicals:
                    </li>
                    <ul className="list-disc">
                      <li>
                        Use individual jewelry pouches, boxes, or compartments
                        to prevent pieces from scratching each other and
                        tangling. 
                      </li>
                      <li>
                        Store fine jewelry in a cool, dry place away from direct
                        sunlight.
                      </li>
                      <li>
                        Keep jewelry away from extreme temperatures, humidity,
                        and moisture to prevent tarnishing and damage. 
                      </li>
                    </ul>
                  </div>
                </ol>
              </div>
            </>
          )}
          {modalType === "jewelry-care" && (
            <>
             <div className="flex w-full items-center justify-end">
                <img
                  onClick={handleCloseModal}
                  src="/icons/close.svg"
                  className="h-[24px] w-[24px] cursor-pointer"
                />
              </div>
              <div className="flex items-center justify-center">
                <h1 className="text-[24px] font-semibold tracking-widest">
                  Jewelry Care instructions
                </h1>
              </div>
              <div className="mx-auto mb-12 mt-24 flex max-w-[992px] items-center justify-center pl-12 tracking-widest">
                <ol className="flex list-decimal flex-col items-start justify-center space-y-4">
                  <div className="flex flex-col items-start justify-center">
                    <li className="text-[16px] font-semibold tracking-widest">
                      Store Jewelry Properly:
                    </li>
                    <ul className="list-disc">
                      <li>
                        Use individual jewelry pouches, boxes, or compartments
                        to prevent pieces from scratching each other and
                        tangling. 
                      </li>
                      <li>
                        Store fine jewelry in a cool, dry place away from direct
                        sunlight.
                      </li>
                      <li>
                        Keep jewelry away from extreme temperatures, humidity,
                        and moisture to prevent tarnishing and damage. 
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-col items-start justify-center">
                    <li className="text-[16px] font-semibold tracking-widest">
                      Clean Regularly:
                    </li>
                    <ul className="list-disc">
                      <li>
                        Use individual jewelry pouches, boxes, or compartments
                        to prevent pieces from scratching each other and
                        tangling. 
                      </li>
                      <li>
                        Store fine jewelry in a cool, dry place away from direct
                        sunlight.
                      </li>
                      <li>
                        Keep jewelry away from extreme temperatures, humidity,
                        and moisture to prevent tarnishing and damage. 
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-col items-start justify-center">
                    <li className="text-[16px] font-semibold tracking-widest">
                      Proffesional Cleaning:
                    </li>
                    <ul className="list-disc">
                      <li>
                        Use individual jewelry pouches, boxes, or compartments
                        to prevent pieces from scratching each other and
                        tangling. 
                      </li>
                      <li>
                        Store fine jewelry in a cool, dry place away from direct
                        sunlight.
                      </li>
                      <li>
                        Keep jewelry away from extreme temperatures, humidity,
                        and moisture to prevent tarnishing and damage. 
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-col items-start justify-center">
                    <li className="text-[16px] font-semibold tracking-widest">
                      Wear Jewelry with Care:
                    </li>
                    <ul className="list-disc">
                      <li>
                        Use individual jewelry pouches, boxes, or compartments
                        to prevent pieces from scratching each other and
                        tangling. 
                      </li>
                      <li>
                        Store fine jewelry in a cool, dry place away from direct
                        sunlight.
                      </li>
                      <li>
                        Keep jewelry away from extreme temperatures, humidity,
                        and moisture to prevent tarnishing and damage. 
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-col items-start justify-center">
                    <li className="text-[16px] font-semibold tracking-widest">
                      Avoid Harsh Chemicals:
                    </li>
                    <ul className="list-disc">
                      <li>
                        Use individual jewelry pouches, boxes, or compartments
                        to prevent pieces from scratching each other and
                        tangling. 
                      </li>
                      <li>
                        Store fine jewelry in a cool, dry place away from direct
                        sunlight.
                      </li>
                      <li>
                        Keep jewelry away from extreme temperatures, humidity,
                        and moisture to prevent tarnishing and damage. 
                      </li>
                    </ul>
                  </div>

                  {/* <li>Clean Regularly:</li>
                                <li>Proffesional Cleaning: </li>
                                <li>Wear Jewelry with Care: </li>
                                <li>Avoid Harsh Chemicals:</li> */}
                </ol>
              </div>
            </>
          )}
          {modalType === "shipping" && (
            <>
              <div className="flex w-full items-center justify-end">
                <img
                  onClick={handleCloseModal}
                  src="/icons/close.svg"
                  className="h-[24px] w-[24px] cursor-pointer"
                />
              </div>
              <div className="flex items-center justify-center">
                <h1 className="text-[18px] font-semibold tracking-widest">
                  Shipping
                </h1>
              </div>
              <div className="mt-12 flex items-center justify-center">
                <p className="w-full max-w-[900px] text-[14px] tracking-widest">
                  At Sela Vee, we are committed to ensuring a seamless and
                  secure shipping experience for our valued customers. Please
                  review the following information to understand our shipping
                  process:
                </p>
              </div>
              <div className="mb-12 mt-24 flex max-w-[992px] items-center justify-center pl-12 tracking-widest">
                <ol className="flex list-decimal flex-col items-start justify-center space-y-4">
                  <div className="flex flex-col items-start justify-center">
                    <li className="text-[16px] font-semibold tracking-widest">
                      Store Jewelry Properly:
                    </li>
                    <ul className="list-disc">
                      <li>
                        Use individual jewelry pouches, boxes, or compartments
                        to prevent pieces from scratching each other and
                        tangling. 
                      </li>
                      <li>
                        Store fine jewelry in a cool, dry place away from direct
                        sunlight.
                      </li>
                      <li>
                        Keep jewelry away from extreme temperatures, humidity,
                        and moisture to prevent tarnishing and damage. 
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-col items-start justify-center">
                    <li className="text-[16px] font-semibold tracking-widest">
                      Clean Regularly:
                    </li>
                    <ul className="list-disc">
                      <li>
                        Use individual jewelry pouches, boxes, or compartments
                        to prevent pieces from scratching each other and
                        tangling. 
                      </li>
                      <li>
                        Store fine jewelry in a cool, dry place away from direct
                        sunlight.
                      </li>
                      <li>
                        Keep jewelry away from extreme temperatures, humidity,
                        and moisture to prevent tarnishing and damage. 
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-col items-start justify-center">
                    <li className="text-[16px] font-semibold tracking-widest">
                      Proffesional Cleaning:
                    </li>
                    <ul className="list-disc">
                      <li>
                        Use individual jewelry pouches, boxes, or compartments
                        to prevent pieces from scratching each other and
                        tangling. 
                      </li>
                      <li>
                        Store fine jewelry in a cool, dry place away from direct
                        sunlight.
                      </li>
                      <li>
                        Keep jewelry away from extreme temperatures, humidity,
                        and moisture to prevent tarnishing and damage. 
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-col items-start justify-center">
                    <li className="text-[16px] font-semibold tracking-widest">
                      Wear Jewelry with Care:
                    </li>
                    <ul className="list-disc">
                      <li>
                        Use individual jewelry pouches, boxes, or compartments
                        to prevent pieces from scratching each other and
                        tangling. 
                      </li>
                      <li>
                        Store fine jewelry in a cool, dry place away from direct
                        sunlight.
                      </li>
                      <li>
                        Keep jewelry away from extreme temperatures, humidity,
                        and moisture to prevent tarnishing and damage. 
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-col items-start justify-center">
                    <li className="text-[16px] font-semibold tracking-widest">
                      Avoid Harsh Chemicals:
                    </li>
                    <ul className="list-disc">
                      <li>
                        Use individual jewelry pouches, boxes, or compartments
                        to prevent pieces from scratching each other and
                        tangling. 
                      </li>
                      <li>
                        Store fine jewelry in a cool, dry place away from direct
                        sunlight.
                      </li>
                      <li>
                        Keep jewelry away from extreme temperatures, humidity,
                        and moisture to prevent tarnishing and damage. 
                      </li>
                    </ul>
                  </div>

                  <div className="flex flex-col items-start justify-center">
                    <li className="text-[16px] font-semibold tracking-widest">
                      Avoid Harsh Chemicals:
                    </li>
                    <ul className="list-disc">
                      <li>
                        Use individual jewelry pouches, boxes, or compartments
                        to prevent pieces from scratching each other and
                        tangling. 
                      </li>
                      <li>
                        Store fine jewelry in a cool, dry place away from direct
                        sunlight.
                      </li>
                      <li>
                        Keep jewelry away from extreme temperatures, humidity,
                        and moisture to prevent tarnishing and damage. 
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-col items-start justify-center">
                    <li className="text-[16px] font-semibold tracking-widest">
                      Avoid Harsh Chemicals:
                    </li>
                    <ul className="list-disc">
                      <li>
                        Use individual jewelry pouches, boxes, or compartments
                        to prevent pieces from scratching each other and
                        tangling. 
                      </li>
                      <li>
                        Store fine jewelry in a cool, dry place away from direct
                        sunlight.
                      </li>
                      <li>
                        Keep jewelry away from extreme temperatures, humidity,
                        and moisture to prevent tarnishing and damage. 
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-col items-start justify-center">
                    <li className="text-[16px] font-semibold tracking-widest">
                      Avoid Harsh Chemicals:
                    </li>
                    <ul className="list-disc">
                      <li>
                        Use individual jewelry pouches, boxes, or compartments
                        to prevent pieces from scratching each other and
                        tangling. 
                      </li>
                      <li>
                        Store fine jewelry in a cool, dry place away from direct
                        sunlight.
                      </li>
                      <li>
                        Keep jewelry away from extreme temperatures, humidity,
                        and moisture to prevent tarnishing and damage. 
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-col items-start justify-center">
                    <li className="text-[16px] font-semibold tracking-widest">
                      Avoid Harsh Chemicals:
                    </li>
                    <ul className="list-disc">
                      <li>
                        Use individual jewelry pouches, boxes, or compartments
                        to prevent pieces from scratching each other and
                        tangling. 
                      </li>
                      <li>
                        Store fine jewelry in a cool, dry place away from direct
                        sunlight.
                      </li>
                      <li>
                        Keep jewelry away from extreme temperatures, humidity,
                        and moisture to prevent tarnishing and damage. 
                      </li>
                    </ul>
                  </div>
                </ol>
              </div>
            </>
          )}
        </Modal>
      </footer>
    </>
  );
};

export default Footer;
