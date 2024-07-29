"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Footer from "@/components/Footer";
const ShippingEtc = () => {
    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {
      setIsVisible(false);
    };
  
  return (
    <>
      <Navbar theme="dark" />
      <MaxWidthWrapper>
        {isVisible && (
            <section id="hero" className="z-50 mb-96 mt-24">
            <div className="h-[800px] overflow-x-hidden bg-white px-4 py-6">
              <div className="flex w-full items-center justify-end">
                <img
                  onClick={handleClose}
                  src="/icons/close.svg"
                  className="h-[24px] w-[24px] cursor-pointer"
                />
              </div>
              <div className="flex items-center justify-center">
                <h1 className="text-[24px] font-semibold tracking-widest">
                  Shipping, Return & Exchange
                </h1>
              </div>
              <div className="ml-[10%] mt-12 flex items-center">
                <p className="w-full max-w-[800px] text-[14px] tracking-widest">
                  At Sela Vee, we are committed to ensuring a seamless and secure
                  shipping experience for our valued customers. Please review the
                  following information to understand our shipping process:
                </p>
              </div>
              <div className="mb-12 mt-24 flex items-center justify-center tracking-widest px-4">
                <ol className="list-decimal">
                  <div className="flex flex-col items-start justify-center">
                    <li className="text-[16px] font-semibold tracking-widest">
                      Store Jewelry Properly:
                    </li>
                    <ul className="list-disc">
                      <li>
                        Use individual jewelry pouches, boxes, or compartments to
                        prevent pieces from scratching each other and tangling. 
                      </li>
                      <li>
                        Store fine jewelry in a cool, dry place away from direct
                        sunlight.
                      </li>
                      <li>
                        Keep jewelry away from extreme temperatures, humidity, and
                        moisture to prevent tarnishing and damage. 
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-col items-start justify-center">
                    <li className="text-[16px] font-semibold tracking-widest">
                      Clean Regularly:
                    </li>
                    <ul className="list-disc">
                      <li>
                        Use individual jewelry pouches, boxes, or compartments to
                        prevent pieces from scratching each other and tangling. 
                      </li>
                      <li>
                        Store fine jewelry in a cool, dry place away from direct
                        sunlight.
                      </li>
                      <li>
                        Keep jewelry away from extreme temperatures, humidity, and
                        moisture to prevent tarnishing and damage. 
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-col items-start justify-center">
                    <li className="text-[16px] font-semibold tracking-widest">
                      Proffesional Cleaning:
                    </li>
                    <ul className="list-disc">
                      <li>
                        Use individual jewelry pouches, boxes, or compartments to
                        prevent pieces from scratching each other and tangling. 
                      </li>
                      <li>
                        Store fine jewelry in a cool, dry place away from direct
                        sunlight.
                      </li>
                      <li>
                        Keep jewelry away from extreme temperatures, humidity, and
                        moisture to prevent tarnishing and damage. 
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-col items-start justify-center">
                    <li className="text-[16px] font-semibold tracking-widest">
                      Wear Jewelry with Care:
                    </li>
                    <ul className="list-disc">
                      <li>
                        Use individual jewelry pouches, boxes, or compartments to
                        prevent pieces from scratching each other and tangling. 
                      </li>
                      <li>
                        Store fine jewelry in a cool, dry place away from direct
                        sunlight.
                      </li>
                      <li>
                        Keep jewelry away from extreme temperatures, humidity, and
                        moisture to prevent tarnishing and damage. 
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-col items-start justify-center">
                    <li className="text-[16px] font-semibold tracking-widest">
                      Avoid Harsh Chemicals:
                    </li>
                    <ul className="list-disc">
                      <li>
                        Use individual jewelry pouches, boxes, or compartments to
                        prevent pieces from scratching each other and tangling. 
                      </li>
                      <li>
                        Store fine jewelry in a cool, dry place away from direct
                        sunlight.
                      </li>
                      <li>
                        Keep jewelry away from extreme temperatures, humidity, and
                        moisture to prevent tarnishing and damage. 
                      </li>
                    </ul>
                  </div>
  
                  <div className="flex flex-col items-start justify-center">
                    <li className="text-[16px] font-semibold tracking-widest">
                      Avoid Harsh Chemicals:
                    </li>
                    <ul className="list-disc">
                      <li>
                        Use individual jewelry pouches, boxes, or compartments to
                        prevent pieces from scratching each other and tangling. 
                      </li>
                      <li>
                        Store fine jewelry in a cool, dry place away from direct
                        sunlight.
                      </li>
                      <li>
                        Keep jewelry away from extreme temperatures, humidity, and
                        moisture to prevent tarnishing and damage. 
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-col items-start justify-center">
                    <li className="text-[16px] font-semibold tracking-widest">
                      Avoid Harsh Chemicals:
                    </li>
                    <ul className="list-disc">
                      <li>
                        Use individual jewelry pouches, boxes, or compartments to
                        prevent pieces from scratching each other and tangling. 
                      </li>
                      <li>
                        Store fine jewelry in a cool, dry place away from direct
                        sunlight.
                      </li>
                      <li>
                        Keep jewelry away from extreme temperatures, humidity, and
                        moisture to prevent tarnishing and damage. 
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-col items-start justify-center">
                    <li className="text-[16px] font-semibold tracking-widest">
                      Avoid Harsh Chemicals:
                    </li>
                    <ul className="list-disc">
                      <li>
                        Use individual jewelry pouches, boxes, or compartments to
                        prevent pieces from scratching each other and tangling. 
                      </li>
                      <li>
                        Store fine jewelry in a cool, dry place away from direct
                        sunlight.
                      </li>
                      <li>
                        Keep jewelry away from extreme temperatures, humidity, and
                        moisture to prevent tarnishing and damage. 
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-col items-start justify-center">
                    <li className="text-[16px] font-semibold tracking-widest">
                      Avoid Harsh Chemicals:
                    </li>
                    <ul className="list-disc">
                      <li>
                        Use individual jewelry pouches, boxes, or compartments to
                        prevent pieces from scratching each other and tangling. 
                      </li>
                      <li>
                        Store fine jewelry in a cool, dry place away from direct
                        sunlight.
                      </li>
                      <li>
                        Keep jewelry away from extreme temperatures, humidity, and
                        moisture to prevent tarnishing and damage. 
                      </li>
                    </ul>
                  </div>
                </ol>
              </div>
            </div>
          </section>
        ) }
        {!isVisible && (
            <div className="h-screen bg-transparent w-screen"/>
        )}
        
      </MaxWidthWrapper>
      <Footer />
      {isVisible && (
        <div className="absolute left-0 top-0 -z-10 h-[100%] w-screen bg-black bg-opacity-30" />
      )}
      
    </>
  );
};

export default ShippingEtc;
