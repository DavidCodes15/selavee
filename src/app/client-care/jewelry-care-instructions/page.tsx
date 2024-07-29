
"use client";
import Footer from "@/components/Footer"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import Navbar from "@/components/Navbar"
import { useState } from "react";

const JewelryCareInstructions = () => {
    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {
      setIsVisible(false);
    };
    return (
        <>
            <Navbar theme="dark"/>
            <MaxWidthWrapper>
                {isVisible && (
                    <section id="hero" className="mt-24 mb-96 z-50">
                
                    <div className="bg-white px-4 py-6">
                        <div className="w-full flex justify-end items-center">
                            <img onClick={handleClose} src="/icons/close.svg" className="w-[24px] h-[24px] cursor-pointer" />
                        </div>
                        <div className="flex justify-center items-center">
                            <h1 className="tracking-widest font-semibold text-[24px]">Jewelry Care Instructions</h1>
                        </div>
                        <div className="mt-24 flex justify-center items-center mb-12 tracking-widest px-4">
                            <ol className="list-decimal">
                                <div className="flex flex-col justify-center items-start">
                                <li className="text-[16px] tracking-widest font-semibold">Store Jewelry Properly:</li>
                                     <ul className="list-disc">
                                        <li>Use individual jewelry pouches, boxes, or compartments to prevent pieces from scratching each other and tangling. </li>
                                        <li>Store fine jewelry in a cool, dry place away from direct sunlight.</li>
                                        <li>Keep jewelry away from extreme temperatures, humidity, and moisture to prevent tarnishing and damage. </li>
                                     </ul>
                                </div>
                                <div className="flex flex-col justify-center items-start">
                                <li className="text-[16px] tracking-widest font-semibold">Clean Regularly:</li>
                                     <ul className="list-disc">
                                        <li>Use individual jewelry pouches, boxes, or compartments to prevent pieces from scratching each other and tangling. </li>
                                        <li>Store fine jewelry in a cool, dry place away from direct sunlight.</li>
                                        <li>Keep jewelry away from extreme temperatures, humidity, and moisture to prevent tarnishing and damage. </li>
                                     </ul>
                                </div>
                                <div className="flex flex-col justify-center items-start">
                                <li className="text-[16px] tracking-widest font-semibold">Proffesional Cleaning:</li>
                                     <ul className="list-disc">
                                        <li>Use individual jewelry pouches, boxes, or compartments to prevent pieces from scratching each other and tangling. </li>
                                        <li>Store fine jewelry in a cool, dry place away from direct sunlight.</li>
                                        <li>Keep jewelry away from extreme temperatures, humidity, and moisture to prevent tarnishing and damage. </li>
                                     </ul>
                                </div>
                                <div className="flex flex-col justify-center items-start">
                                <li className="text-[16px] tracking-widest font-semibold">Wear Jewelry with Care:</li>
                                     <ul className="list-disc">
                                        <li>Use individual jewelry pouches, boxes, or compartments to prevent pieces from scratching each other and tangling. </li>
                                        <li>Store fine jewelry in a cool, dry place away from direct sunlight.</li>
                                        <li>Keep jewelry away from extreme temperatures, humidity, and moisture to prevent tarnishing and damage. </li>
                                     </ul>
                                </div>
                                <div className="flex flex-col justify-center items-start">
                                <li className="text-[16px] tracking-widest font-semibold">Avoid Harsh Chemicals:</li>
                                     <ul className="list-disc">
                                        <li>Use individual jewelry pouches, boxes, or compartments to prevent pieces from scratching each other and tangling. </li>
                                        <li>Store fine jewelry in a cool, dry place away from direct sunlight.</li>
                                        <li>Keep jewelry away from extreme temperatures, humidity, and moisture to prevent tarnishing and damage. </li>
                                     </ul>
                                </div>
                                
                                {/* <li>Clean Regularly:</li>
                                <li>Proffesional Cleaning: </li>
                                <li>Wear Jewelry with Care: </li>
                                <li>Avoid Harsh Chemicals:</li> */}
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
                <div className="bg-black bg-opacity-30 h-[100%] w-screen absolute top-0 left-0 -z-10" />
            )}
            
        </>
    )
}

export default JewelryCareInstructions