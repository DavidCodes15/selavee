"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Major_Mono_Display } from "next/font/google";
import { Dancing_Script } from "next/font/google";
import Link from "next/link";
import Modal from "./Modal";
import { usePathname } from "next/navigation";
import JewelryCare from "./pop-ups/JewelryCare";
import Shipping from "./pop-ups/Shipping";
import JewelryRepair from "./pop-ups/JewelryRepair";
import Faq from "./pop-ups/Faq";
import Refund from "./pop-ups/Refund";
import WebAccess from "./pop-ups/WebAccess";
import PrivacyPolicy from "./pop-ups/PrivacyPolicy";
import PrivacyModal from "./modals/PrivacyModal";
import TermsOfUse from "./pop-ups/TermsOfUse";
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
  const [isTerms, setIsTerms] = useState(false);
  const [isPrivacy, setIsPrivacy] = useState(false);
  const [isClientCareVisible, setIsClientCareVisible] = useState(true);
  const [isOurCompanyVisible, setIsOurCompanyVisible] = useState(true);
  const [isProductsVisible, setIsProductsVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
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
  const handleFaq = () => {
    setIsModalOpen(!isModalOpen);
    setModalType("faq");
  }
  // const handleTermsOfUse = () => {
  //   setIsModalOpen(!isModalOpen);
  //   setModalType("terms-of-use");
  // }
  const handlePrivacyPolicy = () => {
    setIsPrivacyModalOpen(!isModalOpen);
    setIsPrivacy(true);
    setIsTerms(false);
    // setModalType("privacy-policy");
  }
  const handleWebAccess = () => {
    setIsModalOpen(!isModalOpen);
    setModalType("web-access");
  }
  const handleRefund = () => {
    setIsModalOpen(!isModalOpen);
    setModalType("refund");
  }
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handlePrivacyModal = () => {
    setIsPrivacyModalOpen(false);
  };

  const handleTermsModal = () => {
    setIsPrivacyModalOpen(!isModalOpen);    
    setIsTerms(true);
    setIsPrivacy(false);
  }

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
  if (pathname === "/selavee/admin") {
    return null;
  }
  if (pathname === "/selavee/inner") {
    return null;
  }
  if (pathname === "/selavee/inner/test") {
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

                      Shipping Information
                    </li>
                    <li onClick={handleRefund} className="cursor-pointer text-[#4D4D4D]">
                      Refund and Exchange Policy
                    </li>
                    <li onClick={handleFaq} className="cursor-pointer text-[#4D4D4D]">FAQ</li>
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
                      <Link href="/about-us">World of Sela Vee</Link>
                    </li>
                    <li onClick={handleTermsModal} className="cursor-pointer text-[#4D4D4D]">
                      Terms of Use
                    </li>
                    <li onClick={handlePrivacyPolicy} className="cursor-pointer text-[#4D4D4D]">
                      Privacy Policy
                    </li>
                    <li onClick={handleWebAccess} className="cursor-pointer text-[#4D4D4D]">
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
                  <Link target="_blank" href="https://www.facebook.com/profile.php?id=61560812709523&viewas=100000686899395">
                    <img
                      src="/icons/facebook.svg"
                      className="h-[16px] w-[11px]"
                    />
                  </Link>
                </div>
                <div className="border-[1px] border-solid border-black px-[10px] py-2">
                  <Link target="_blank" href="https://www.instagram.com/ms.selavee?igsh=c3R5N3BlcTh4ZGh2&utm_
                      source=qr">
                    <img
                      src="/icons/instagram.svg"
                      className="h-[16px] w-[16px]"
                    />
                  </Link>
                </div>
                <div className="border-[1px] border-solid border-black px-[10px] py-2">
                  <Link target="_blank" href="https://www.linkedin.com/company/sela-vee-llc/">
                    <img
                      src="/icons/linked-in.svg"
                      className="h-[16px] w-[16px]"
                    />
                  </Link>
                </div>
                <div className="border-[1px] border-solid border-black px-[10px] py-2">
                  <Link target="_blank" href="https://www.tiktok.com/@sela.vee?_t=8pJLhkEOJkQ&_r=1">
                    <img src="/icons/tik-tok.svg" className="h-[16px] w-[16px]" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      <PrivacyModal isOpen={isPrivacyModalOpen} onClose={handlePrivacyModal}>

      {isPrivacy && (
         <>
         <div className="flex w-full items-center justify-end">
           <img
             onClick={handlePrivacyModal}
             src="/icons/white-x.svg"
             className="h-[24px] w-[24px] cursor-pointer"
           />
         </div>
         <PrivacyPolicy />
      </>
      )}

      {isTerms && (
        <>
        <div className="flex w-full items-center justify-end">
           <img
             onClick={handlePrivacyModal}
             src="/icons/white-x.svg"
             className="h-[24px] w-[24px] cursor-pointer"
           />
         </div>
         <TermsOfUse />
        </>
      )}
           
          
      </PrivacyModal>
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
              <JewelryRepair />
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
              <JewelryCare />
              
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
              <Shipping />
            </>
          )}
          {modalType === "refund" && (
            <>
            <div className="flex w-full items-center justify-end">
                <img
                  onClick={handleCloseModal}
                  src="/icons/close.svg"
                  className="h-[24px] w-[24px] cursor-pointer"
                />
              </div>
              <Refund />
            </>
          )}
          {modalType === "faq" && (
            <>
            <div className="flex w-full items-center justify-end">
                <img
                  onClick={handleCloseModal}
                  src="/icons/close.svg"
                  className="h-[24px] w-[24px] cursor-pointer"
                />
              </div>
              <Faq />
            </>
          )}
          {/* {modalType === "terms-of-use" && (
            <>balbab</>
          )}
          {modalType === "privacy-policy" && (
           <>
              <div className="flex w-full items-center justify-end">
                <img
                  onClick={handleCloseModal}
                  src="/icons/close.svg"
                  className="h-[24px] w-[24px] cursor-pointer"
                />
              </div>
              <PrivacyPolicy />
           </>
          )} */}
           {modalType === "web-access" && (
            <>
               <div className="flex w-full items-center justify-end">
                <img
                  onClick={handleCloseModal}
                  src="/icons/close.svg"
                  className="h-[24px] w-[24px] cursor-pointer"
                />
              </div>
              <WebAccess />
            </>
          )}
        </Modal>
      </footer>
    </>
  );
};

export default Footer;
