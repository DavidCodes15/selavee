"use client";
import { useEffect, useState } from "react";
import CustomCursor from "./CustomCursor";
const ProductsGrid = () => {
  const [isHover, setIsHover] = useState(0);
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });
  const [isCursorVisible, setIsCursorVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const newCoords = { x: event.clientX, y: event.clientY };
      setMouseCoords(newCoords);
      // console.log("Mouse coordinates:", newCoords);
    };
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
  <>
  {/*sm:gap-5 lg:gap-6 xl:gap-y-6 xl:gap-x-6 text-center */}
  {/**updated code
   * w-full mt-44 grid text-center sm:grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5
   */}
    <div
    
      id="grid"
      className="w-full mt-80 grid sm:grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 xl:gap-y-6 xl:gap-x-6 text-center"
    >
      {!isMobile && isCursorVisible && <CustomCursor x={mouseCoords.x} y={mouseCoords.y} />}
      {/**sm:p-4 msm:px-8 msm:py-4 md:px-4 md:py-4 lg:px-8 lg:py-4 xl:px-12 xl:py-6 flex items-center justify-center bg-[#F7F7F7] */}

      {/**updated code
       * relative cursor-pointer flex justify-center items-center flex-1 bg-[#F7F7F7]
       */}
      <div
        onMouseEnter={() => {setIsHover(1); setIsCursorVisible(true)}}
        onMouseLeave={() => {setIsHover(0); setIsCursorVisible(false)}}
        className="relative sm:p-4 msm:px-8 msm:py-4 md:px-4 md:py-4 lg:px-8 lg:py-4 xl:px-12 xl:py-6 flex items-center justify-center bg-white"
        style={{
          cursor: "none"
        }}
      >
        
        <img
          src="/products/product.svg"
          className="sm:w-[240px] h-[240px] msm:h-[250px] msm:w-[250px] lsm:w-[300px] lsm:h-[300px] md:w-full md:h-full lg:w-[300px] lg:h-[300px] xl:h-[369.99px] xl:w-[336.65px]"
        />

        <span
          className={`hidden lg:block transition duration-500 ease-in-out ${isHover == 1 ? "opacity-100" : "opacity-0"} absolute left-[28%] top-[40%] z-10 text-[48px] tracking-widest`}
        >
          Necklace
        </span>
        
          
      </div>

      <div
        
        onMouseEnter={() => {setIsHover(2); setIsCursorVisible(true)}}
        onMouseLeave={() => {setIsHover(0); setIsCursorVisible(false)}}
        className="relative sm:p-4 msm:px-8 msm:py-4 md:px-4 md:py-4 lg:px-8 lg:py-4 xl:px-12 xl:py-6 flex items-center justify-center bg-white"
        style={{
          cursor: "none"
        }}
      >
        <img
          src="/products/product.svg"
          className="sm:w-[240px] h-[240px] msm:h-[250px] msm:w-[250px] lsm:w-[300px] lsm:h-[300px] md:w-full md:h-full lg:w-[300px] lg:h-[300px] xl:h-[369.99px] xl:w-[336.65px]"
        />
        <span
          className={`hidden lg:block transition duration-500 ease-in-out ${isHover == 2 ? "opacity-100" : "opacity-0"} absolute left-[28%] top-[40%] z-10 text-[48px] tracking-widest`}
        >
          Necklace
        </span>
        
      </div>

      <div
        
        onMouseEnter={() => {setIsHover(3); setIsCursorVisible(true)}}
        onMouseLeave={() => {setIsHover(0); setIsCursorVisible(false)}}
        className="relative sm:p-4 msm:px-8 msm:py-4 md:px-4 md:py-4 lg:px-8 lg:py-4 xl:px-12 xl:py-6 flex items-center justify-center bg-white"
        style={{
          cursor: "none"
        }}
      >
        <img
          src="/products/product.svg"
          className="sm:w-[240px] h-[240px] msm:h-[250px] msm:w-[250px] lsm:w-[300px] lsm:h-[300px] md:w-full md:h-full lg:w-[300px] lg:h-[300px] xl:h-[369.99px] xl:w-[336.65px]"
        />
        <span
          className={`hidden lg:block transition duration-500 ease-in-out ${isHover == 3 ? "opacity-100" : "opacity-0"} absolute left-[28%] top-[40%] z-10 text-[48px] tracking-widest`}
        >
          Necklace
        </span>
      </div>

      <div
        
        onMouseEnter={() => {setIsHover(4); setIsCursorVisible(true)}}
        onMouseLeave={() => {setIsHover(0); setIsCursorVisible(false)}}
        className="relative sm:p-4 msm:px-8 msm:py-4 md:px-4 md:py-4 lg:px-8 lg:py-4 xl:px-12 xl:py-6 flex items-center justify-center bg-white"
        style={{
          cursor: "none"
        }}
      >
       {/**sm:w-[240px] h-[240px] msm:h-[250px] msm:w-[250px] lsm:w-[300px] lsm:h-[300px] md:w-full md:h-full lg:w-[300px] lg:h-[300px] xl:h-[369.99px] xl:w-[336.65px] */}
       {/**updated code
        * sm:max-w-[240px] sm:max-h-[240px] msm:h-[250px] msm:w-[250px] lsm:w-[300px] lsm:h-[300px] md:max-w-[300px] md:max-h-[300px] xl:max-w-[370px] xl:max-h-[337px]
        */}
        <img
          src="/products/product.svg"
          className="sm:w-[240px] h-[240px] msm:h-[250px] msm:w-[250px] lsm:w-[300px] lsm:h-[300px] md:w-full md:h-full lg:w-[300px] lg:h-[300px] xl:h-[369.99px] xl:w-[336.65px]"
        />
        <span
          className={`hidden lg:block transition duration-500 ease-in-out ${isHover == 4 ? "opacity-100" : "opacity-0"} absolute left-[28%] top-[40%] z-10 text-[48px] tracking-widest`}
        >
          Necklace
        </span>
      </div>

    </div>
    </>
  );
};

export default ProductsGrid;
