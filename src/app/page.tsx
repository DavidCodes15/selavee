"use client";
import { useState } from "react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";
import "@/app/product-slider.css"
import { Major_Mono_Display } from "next/font/google";
import { Dancing_Script } from "next/font/google";
import { cn } from "@/lib/utils";
import AboutUs from "@/components/AboutUs";
import ProductsGrid from "@/components/ProductsGrid";
import Slider from "@/components/Slider";
import Footer from "@/components/Footer";

const mono = Major_Mono_Display({
  subsets: ["latin"],
  weight: "400",
});

const dancing = Dancing_Script({
  subsets: ["latin"],
  weight: "400",
});
export default function Home() {
 

 

  return (
  <>
  <section id="hero" className="h-screen relative">
        <Navbar theme="light"/>
        <div className="w-full flex justify-center items-end min-h-[85%] max-h-screen">
          <button className="icon-wrapper flex justify-center items-center space-x-4 text-white border-white border-[1px] border-solid cursor-pointer px-2 py-[3px] tracking-widest">
            <span>DISCOVER PRODUCTS</span>
            <img src="/icons/plus.svg" className="icon" />
          </button>
        </div>
    <img src="/backgrounds/static-background.png" className="absolute -z-20 top-0 h-screen w-full" />
    <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black via-transparent to-transparent opacity-60"/>
  </section>
   <section id="product-grid" className="relative">
      {/* <div className="absolute bottom-[90%] right-[80%] w-96 h-96 rounded-full gradient -z-30"/> */}
      <MaxWidthWrapper className="mt-48 flex flex-col justify-center items-center">
        <div>
          <div id="title" className="w-full relative flex flex-col">
            
            <h1 className="flex tracking-widest font-semibold justify-center items-center sm:text-[18px] lsm:text-[20px] md:text-[24px]">Product Category</h1>
            <h2 className={cn("leading-none text-center mx-auto hero-text sm:text-[43px] msm:text-[50px] lsm:text-[55px] md:text-[80px]  xl:text-[100px]", mono.className)}>design to redesign</h2>
            <span className="absolute sm:-bottom-7 md:-bottom-10 sm:right-0 lg:right-[10%] quadrian text-[#AC9778] sm:text-[30px] msm:text-[35px] lsm:text-[40px] md:text-[44px] lg:text-[54px] xl:text-[64px] ">find your style</span>
          </div>
        </div>
        <ProductsGrid />
        <AboutUs />
      </MaxWidthWrapper>
      {/* <div className="absolute top-[80%] left-[80%] w-96 h-96 rounded-full gradient -z-30"/> */}
    </section>
      <Slider />
  <Footer /> 

      
   </>
  );
}
