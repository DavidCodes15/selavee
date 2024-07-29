"use client";
import Navbar from "@/components/Navbar";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Footer from "@/components/Footer";
import { useState } from "react";
const JewelryRepair = () => {
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
            <div className="bg-white px-4 py-6 overflow-x-hidden h-[800px]">
             
              <div className="flex w-full items-center justify-end">
                <img
                  onClick={handleClose}
                  src="/icons/close.svg"
                  className="h-[24px] w-[24px] cursor-pointer"
                />
              </div>
              <div className="flex items-center justify-center">
                <h1 className="text-[24px] font-semibold tracking-widest">
                  Jewelry Repair
                </h1>
              </div>
              <div className="flex ml-[10%] items-center mt-12">
                  <p className="w-full tracking-widest text-[14px] max-w-[800px]">
                  At Sela Vee, we are pleased to offer professional jewelry repair
                  services to keep your cherished pieces in excellent condition.
                  Please review our paid jewelry repair policy to understand how
                  we handle repair requests that require payment:
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
                  </div><div className="flex flex-col items-start justify-center">
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
                  </div><div className="flex flex-col items-start justify-center">
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
                  </div><div className="flex flex-col items-start justify-center">
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
        )}

        {!isVisible && (
            <div className="w-screen h-screen bg-transparent" />
        )}
        
      </MaxWidthWrapper>
      <Footer />
      {isVisible && (
        <div className="absolute left-0 top-0 -z-10 h-[100%] w-screen bg-black bg-opacity-30" />
      )}
     
    </>
  );
};

export default JewelryRepair;
