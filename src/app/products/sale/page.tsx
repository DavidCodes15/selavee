"use client";
import Footer from "@/components/Footer";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import Link from "next/link";
const Sale = () => {
  const [isToggleMenu, setIsToggleMenu] = useState(false);
  const [sortByClicked, setSortByClicked] = useState(false);
  return (
    <>
      <Navbar theme="dark" />
      {/**px-4 pl-4 */}
      <div id="menu" className={`bg-white fixed overflow-y-scroll top-0 z-10 flex h-screen flex-col items-start sm:w-screen md:w-fit ${isToggleMenu ? 'filter active' : 'filter'}`}>
        <div className="w-full flex flex-col items-start justify-center space-y-12">
          
          <div className="w-full px-8 pt-12 flex flex-col justify-center items-start space-y-4">
            <div className="w-full flex justify-between items-center">
              <span className="text-[20px] tracking-widest font-bold">FILTER</span>
              <button
                    className={`hamburger flex h-16 w-16 cursor-pointer focus:outline-none md:pt-0 open`}
                    onClick={() => setIsToggleMenu(!isToggleMenu)}
                  >
                    <span
                      className="hamburger-top absolute left-0 top-5 h-[2px] w-10 bg-black"
                      
                    ></span>
                    <span
                      className="hamburger-bottom absolute left-0 top-5 h-[2px] w-10 bg-black"
                      
                    ></span>
                  </button>
            </div>
            <div className="w-full flex flex-col justify-center items-start">
                <span className="text-[14px] tracking-widest font-semibold">PRICE</span>
            </div>
          </div>

          <div className="w-full flex flex-col justify-center items-start space-y-12">
            
            <div className="flex flex-col justify-center items-start space-y-2 px-8">
              <span className="text-[14px] font-semibold tracking-widest">STYLE</span>
              <form className="flex flex-col justify-center items-start space-y-2">
                <span className="flex justify-start items-center space-x-2">
                  <input className="cursor-pointer" type="checkbox" />
                  <label className="cursor-pointer tracking-widest text-[14px]">Pendant Necklace</label>
                </span>
                <span className="flex justify-start items-center space-x-2">
                  <input className="cursor-pointer" type="checkbox" />
                  <label className="cursor-pointer tracking-widest text-[14px]">Diamond Necklace</label>
                </span>
                <span className="flex justify-start items-center space-x-2">
                  <input className="cursor-pointer" type="checkbox" />
                  <label className="cursor-pointer tracking-widest text-[14px]">Gemstone Necklace</label>
                </span>
                <span className="flex justify-start items-center space-x-2">
                  <input className="cursor-pointer" type="checkbox" />
                  <label className="cursor-pointer text-[14px] tracking-widest">Tennis Necklace</label>
                </span>
                <span className=" flex justify-start items-center space-x-2">
                  <input className="cursor-pointer" type="checkbox" />
                  <label className="cursor-pointer tracking-widest text-[14px]">Drilled Diamond Necklace</label>
                </span>
              </form>
            </div>  

            <div className="flex flex-col justify-center items-start space-y-2 px-8">
                <span className="text-[14px] tracking-widest font-semibold">METAL</span>
                <div className="flex flex-col justify-center items-start space-y-2">
                  <div className="flex justify-start items-center space-x-2">
                  <span className="w-[20px] h-[20px] cursor-pointer silver-gradient rounded-full" />
                  <span className="text-[14px] tracking-widest">18k White Gold</span>
                  </div>
                  <div className="flex justify-start items-center space-x-2">
                  
                  <span className="w-[20px] h-[20px] cursor-pointer pink-gradient rounded-full" />
                  <span className="text-[14px] tracking-widest">18k Rose Gold</span>
                  </div>
                  <div className="flex justify-start items-center space-x-2">
                  <span className="w-[20px] h-[20px] cursor-pointer gold-gradient rounded-full" />
                  <span className="text-[14px] tracking-widest">18k Yellow Gold</span>
                  </div>
                </div>
            </div> 

            <div className="flex flex-col justify-center items-start space-y-2 px-8">
            <span className="text-[14px] font-semibold tracking-widest">STONE TYPE</span>
              <form className="flex flex-col justify-center items-start space-y-2">
                <span className="flex justify-start items-center space-x-2">
                  <input className="cursor-pointer" type="checkbox" />
                  <label className="cursor-pointer tracking-widest text-[14px]">Diamond</label>
                </span>
                <span className="flex justify-start items-center space-x-2">
                  <input className="cursor-pointer" type="checkbox" />
                  <label className="cursor-pointer tracking-widest text-[14px]">Emeralds</label>
                </span>
                <span className="flex justify-start items-center space-x-2">
                  <input className="cursor-pointer" type="checkbox" />
                  <label className="cursor-pointer tracking-widest text-[14px]">Rubies</label>
                </span>
                <span className="flex justify-start items-center space-x-2">
                  <input className="cursor-pointer" type="checkbox" />
                  <label className="cursor-pointer text-[14px] tracking-widest">Blue Sapphires</label>
                </span>
                <span className=" flex justify-start items-center space-x-2">
                  <input className="cursor-pointer" type="checkbox" />
                  <label className="cursor-pointer tracking-widest text-[14px]">Pink Sapphires</label>
                </span>
              </form>
            </div> 

            <div className="flex flex-col justify-center items-start space-y-6 w-full">
            <div className="flex flex-col justify-start items-center space-y-2">
              <span className="text-[14px] tracking-widest font-semibold ml-8">STONE SHAPE</span>
              <div className="flex flex-col justify-start items-start space-y-2 ml-6">
                <div className="flex justify-start items-start space-x-[21px]">
                  <span>
                    <img src="/icons/round.svg" />
                  </span>
                  <span className="text-[14px] tracking-widest">Round</span>
                </div>
                <div className="flex justify-start items-center space-x-[22px]">
                  <span>
                    <img src="/icons/oval.svg" />
                  </span>
                  <span className="text-[14px] tracking-widest">Oval</span>
                </div>
                <div className="flex justify-start items-center space-x-[22px]">
                  <span>
                    <img src="/icons/pear.svg" />
                  </span>
                  <span className="text-[14px] tracking-widest">Pear</span>
                </div>
                <div className="flex justify-start items-center space-x-2">
                  <span>
                    <img src="/icons/baguette.svg" />
                  </span>
                  <span className="text-[14px] tracking-widest">Baguette</span>
                </div>
                <div className="flex justify-start items-center space-x-[21px]">
                  <span>
                    <img src="/icons/emerald.svg" />
                  </span>
                  <span className="text-[14px] tracking-widest">Emerald</span>
                </div>
                <div className="flex justify-start items-center space-x-[22px]">
                  <span>
                    <img src="/icons/marquise.svg" />
                  </span>
                  <span className="text-[14px] tracking-widest">Marquise</span>
                </div>
                <div className="flex justify-start items-center space-x-[18px]">
                  <span>
                    <img src="/icons/heart-vector.svg" />
                  </span>
                  <span className="text-[14px] tracking-widest">Heart</span>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col justify-center items-center">
              <button className="w-full text-black text-[16px] tracking-widest text-center py-2 font-semibold">CLEAR</button>
              <button onClick={() => setIsToggleMenu(!isToggleMenu)} className="w-full bg-black text-white text-[16px] tracking-widest text-center py-2 font-semibold">FILTER</button>
            </div>
            </div>

          </div>

        </div>
      </div>
      <MaxWidthWrapper className="mt-52 mb-80">
        <section id="hero" className="w-full">
          <div className="flex flex-col space-y-24">
            <div className="flex items-center justify-center">
              <h1 className="text-[18px] lg:text-[24px] font-semibold tracking-widest">
                Sale
              </h1>
            </div>
            {/* bg-[#FEFCFE] */}
            <div className="flex flex-col-reverse lg:flex-row w-full justify-center px-4 lg:px-0">
              <div className="flex flex-1 items-end justify-center lg:justify-start">
                <p className="w-full lg:max-w-[338.31px] text-[14px] leading-7 tracking-widest">
                  Notre newsletter vous convie à un voyage exclusif dans
                  l&apos;univers de notre joaillerie.
                </p>
              </div>
              <div className="flex flex-1 items-center justify-center max-w-1/3">
                <img src="/products/product.svg" />
              </div>
              <div className="flex flex-1 items-start justify-end">
                <p className="max-w-md text-[14px] tracking-widest text-gray-700">
                  Notre newsletter
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section id="products" className="w-full mt-44">
        
            <div className="flex flex-col space-y-24">
                <div className="flex items-center justify-center">
                    <h2 className="text-[18px] md:text-[24px] font-semibold tracking-widest">
                        Products
                    </h2>
                </div>
                <div className="flex w-full justify-center px-2 md:px-0">
              <div className="flex flex-1 items-center justify-start">
                <div onClick={() => setIsToggleMenu(!isToggleMenu)} className="flex justify-center items-center space-x-2 cursor-pointer">
                  <div>
                    <img src="/icons/filter.svg" />
                  </div>
                  <span className="text-[16px]">Filter</span>
                </div>
              </div>
              <div className="hidden lg:flex flex-1 items-center justify-center">
                <div>
                  <ul className="flex justify-center items-center space-x-4 tracking-widest text-[16px] text-[#666666]">
                    <li className="cursor-pointer hover:text-black">All</li>
                    <li className="cursor-pointer hover:text-black">Necklace</li>
                    <li className="cursor-pointer hover:text-black">Braclets</li>
                    <li className="cursor-pointer hover:text-black">Rings</li>
                    <li className="cursor-pointer hover:text-black">Earrings</li>
                  </ul>
                </div>
              </div>
              <div className="icon-wrapper flex flex-1 items-center justify-end relative">
                <div onClick={() => setSortByClicked(!sortByClicked)} className="icon flex justify-center items-center space-x-2 cursor-pointer">
                  <div>
                    <img src="/icons/sort-by.svg" />
                  </div>
                  <span className="text-[16px]">Sort By</span>
                </div>
                {sortByClicked && (
                  <div className="absolute -right-[10px] sm:-bottom-[200px] lsm:-bottom-[150px]">
                  <div className="bg-black flex flex-col justify-center items-start space-y-4 pl-2 lsm:pr-4 md:pr-8 lg:pr-8 xl:pr-12 py-2">
                    <span onClick={() => setSortByClicked(!sortByClicked)} className="text-white text-[14px] tracking-widest cursor-pointer">Best Sellers</span>
                    <span onClick={() => setSortByClicked(!sortByClicked)}  className="text-white text-[14px] tracking-widest cursor-pointer">New Arrivals</span>
                    <span onClick={() => setSortByClicked(!sortByClicked)}  className="text-white text-[14px] tracking-widest cursor-pointer">Price:Low to High</span>
                    <span onClick={() => setSortByClicked(!sortByClicked)}  className="text-white text-[14px] tracking-widest cursor-pointer">Price:High to Low</span>
                  </div>
                </div>
                )}
                
              </div>
            </div>
            </div>
            <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-3 md:gap-5">
              {/**max-w-384 lg:w-fit */}
              <div className="mx-auto lg:mx-0 flex flex-col justify-center items-start space-y-2 cursor-pointer">
                {/**sm:w-[90%] */}
                <div className="sm:w-full sm:mx-auto md:w-full">
                  <Link href="/products/dynamic/product/earrings">
                  <img src="/products/earrings.png" className="w-full h-full" />
                  </Link>
                </div>
                {/**sm:w-[90%] */}
                <div className="sm:w-full mx-auto md:w-full flex flex-col justify-center items-start space-y-2 cursor-pointer">
                    <div className="w-full flex justify-between items-center">
                      <span className="tracking-widest text-[18px]">Earring 202</span>
                      <span className="icon-wrapper">
                        <img src="/icons/heart.svg" className="icon w-[24px] h-[24px] cursor-pointer" style={{filter: 'invert(1)'}} />
                      </span>
                    </div>
                    <div className="flex justify-center items-center space-x-2">
                      <span className="w-[20px] h-[20px] cursor-pointer pink-gradient rounded-full" />
                      <span className="w-[20px] h-[20px] cursor-pointer gold-gradient rounded-full" />
                      <span className="w-[20px] h-[20px] cursor-pointer silver-gradient rounded-full" />
                    </div>
                    <div>
                      <span className="font-bold text-[14px]">92$</span>
                    </div>
                </div>
              </div>
              <div className="mx-auto md:mx-0 flex flex-col justify-center items-start space-y-2 cursor-pointer">
                {/** lg:max-w-[384px] max-h-[397px] */}
                <div className="sm:w-full mx-auto md:w-full">
                  <img src="/products/earrings.png" className="w-full h-full" />
                </div>
                <div className="sm:w-full mx-auto md:w-full flex flex-col justify-center items-start space-y-2">
                    <div className="w-full flex justify-between items-center">
                      <span className="tracking-widest text-[18px]">Earring 202</span>
                      <span  className="icon-wrapper">
                        <img src="/icons/heart.svg" className="icon w-[24px] h-[24px] cursor-pointer" style={{filter: 'invert(1)'}} />
                      </span>
                    </div>
                    <div className="flex justify-center items-center space-x-2">
                      <span className="w-[20px] h-[20px] cursor-pointer pink-gradient rounded-full" />
                      <span className="w-[20px] h-[20px] cursor-pointer gold-gradient rounded-full" />
                      <span className="w-[20px] h-[20px] cursor-pointer silver-gradient rounded-full" />
                    </div>
                    <div>
                      <span className="font-bold text-[14px]">92$</span>
                    </div>
                </div>
              </div>
              <div className="mx-auto md:mx-0 flex flex-col justify-center items-start space-y-2 cursor-pointer">
                <div className="sm:w-full mx-auto md:w-full">
                  <img src="/products/model.png" className="w-full h-full" />
                </div>
                <div className="sm:w-full mx-auto md:w-full flex flex-col justify-center items-start space-y-2">
                    <div className="w-full flex justify-between items-center">
                      <span className="tracking-widest text-[18px]">Earring 202</span>
                      <span  className="icon-wrapper">
                        <img src="/icons/heart.svg" className="icon w-[24px] h-[24px] cursor-pointer" style={{filter: 'invert(1)'}} />
                      </span>
                    </div>
                    <div className="flex justify-center items-center space-x-2">
                      <span className="w-[20px] h-[20px] cursor-pointer pink-gradient rounded-full" />
                      <span className="w-[20px] h-[20px] cursor-pointer gold-gradient rounded-full" />
                      <span className="w-[20px] h-[20px] cursor-pointer silver-gradient rounded-full" />
                    </div>
                    <div>
                      <span className="font-bold text-[14px]">92$</span>
                    </div>
                </div>
              </div>
              <div className="mx-auto md:mx-0 flex flex-col justify-center items-start space-y-2 cursor-pointer">
                <div className="sm:w-full mx-auto md:w-full">
                  <img src="/products/earrings.png" className="w-full h-full" />
                </div>
                <div className="sm:w-full mx-auto md:w-full flex flex-col justify-center items-start space-y-2">
                    <div className="w-full flex justify-between items-center">
                      <span className="tracking-widest text-[18px]">Earring 202</span>
                      <span  className="icon-wrapper">
                        <img src="/icons/heart.svg" className="icon w-[24px] h-[24px] cursor-pointer" style={{filter: 'invert(1)'}} />
                      </span>
                    </div>
                    <div className="flex justify-center items-center space-x-2">
                      <span className="w-[20px] h-[20px] cursor-pointer pink-gradient rounded-full" />
                      <span className="w-[20px] h-[20px] cursor-pointer gold-gradient rounded-full" />
                      <span className="w-[20px] h-[20px] cursor-pointer silver-gradient rounded-full" />
                    </div>
                    <div>
                      <span className="font-bold text-[14px]">92$</span>
                    </div>
                </div>
              </div>
              <div className="mx-auto md:mx-0 flex flex-col justify-center items-start space-y-2 cursor-pointer">
                <div className="sm:w-full mx-auto md:w-full">
                  <img src="/products/earrings.png" className="w-full h-full" />
                </div>
                <div className="sm:w-full mx-auto md:w-full flex flex-col justify-center items-start space-y-2">
                    <div className="w-full flex justify-between items-center">
                      <span className="tracking-widest text-[18px]">Earring 202</span>
                      <span  className="icon-wrapper">
                        <img src="/icons/heart.svg" className="icon w-[24px] h-[24px] cursor-pointer" style={{filter: 'invert(1)'}} />
                      </span>
                    </div>
                    <div className="flex justify-center items-center space-x-2">
                      <span className="w-[20px] h-[20px] cursor-pointer pink-gradient rounded-full" />
                      <span className="w-[20px] h-[20px] cursor-pointer gold-gradient rounded-full" />
                      <span className="w-[20px] h-[20px] cursor-pointer silver-gradient rounded-full" />
                    </div>
                    <div>
                      <span className="font-bold text-[14px]">92$</span>
                    </div>
                </div>
              </div>
              <div className="mx-auto md:mx-0 flex flex-col justify-center items-start space-y-2 cursor-pointer">
                <div className="sm:w-full mx-auto md:w-full">
                  <img src="/products/earrings.png" className="w-full h-full" />
                </div>
                <div className="sm:w-full mx-auto md:w-full flex flex-col justify-center items-start space-y-2">
                    <div className="w-full flex justify-between items-center">
                      <span className="tracking-widest text-[18px]">Earring 202</span>
                      <span className="icon-wrapper">
                        <img src="/icons/heart.svg" className="icon w-[24px] h-[24px] cursor-pointer" style={{filter: 'invert(1)'}} />
                      </span>
                    </div>
                    <div className="flex justify-center items-center space-x-2">
                      <span className="w-[20px] h-[20px] cursor-pointer pink-gradient rounded-full" />
                      <span className="w-[20px] h-[20px] cursor-pointer gold-gradient rounded-full" />
                      <span className="w-[20px] h-[20px] cursor-pointer silver-gradient rounded-full" />
                    </div>
                    <div>
                      <span className="font-bold text-[14px]">92$</span>
                    </div>
                </div>
              </div>
              <div className="mx-auto md:mx-0 flex flex-col justify-center items-start space-y-2 cursor-pointer">
                <div className="sm:w-full mx-auto md:w-full">
                  <img src="/products/earrings.png" className="w-full h-full" />
                </div>
                <div className="sm:w-full mx-auto md:w-full flex flex-col justify-center items-start space-y-2">
                    <div className="w-full flex justify-between items-center">
                      <span className="tracking-widest text-[18px]">Earring 202</span>
                      <span className="icon-wrapper">
                        <img src="/icons/heart.svg" className="icon w-[24px] h-[24px] cursor-pointer" style={{filter: 'invert(1)'}} />
                      </span>
                    </div>
                    <div className="flex justify-center items-center space-x-2">
                      <span className="w-[20px] h-[20px] cursor-pointer pink-gradient rounded-full" />
                      <span className="w-[20px] h-[20px] cursor-pointer gold-gradient rounded-full" />
                      <span className="w-[20px] h-[20px] cursor-pointer silver-gradient rounded-full" />
                    </div>
                    <div>
                      <span className="font-bold text-[14px]">92$</span>
                    </div>
                </div>
              </div>
              <div className="mx-auto md:mx-0 flex flex-col justify-center items-start space-y-2 cursor-pointer">
                <div className="sm:w-full mx-auto md:w-full">
                  <img src="/products/earrings.png" className="w-full h-full" />
                </div>
                <div className="sm:w-full mx-auto md:w-full flex flex-col justify-center items-start space-y-2">
                    <div className="w-full flex justify-between items-center">
                      <span className="tracking-widest text-[18px]">Earring 202</span>
                      <span className="icon-wrapper">
                        <img src="/icons/heart.svg" className="icon w-[24px] h-[24px] cursor-pointer" style={{filter: 'invert(1)'}} />
                      </span>
                    </div>
                    <div className="flex justify-center items-center space-x-2">
                      <span className="w-[20px] h-[20px] cursor-pointer pink-gradient rounded-full" />
                      <span className="w-[20px] h-[20px] cursor-pointer gold-gradient rounded-full" />
                      <span className="w-[20px] h-[20px] cursor-pointer silver-gradient rounded-full" />
                    </div>
                    <div>
                      <span className="font-bold text-[14px]">92$</span>
                    </div>
                </div>
              </div>
              <div className="mx-auto md:mx-0 flex flex-col justify-center items-start space-y-2 cursor-pointer">
                <div className="sm:w-full mx-auto md:w-full">
                  <img src="/products/earrings.png" className="w-full h-full" />
                </div>
                <div className="sm:w-full mx-auto md:w-full flex flex-col justify-center items-start space-y-2">
                    <div className="w-full flex justify-between items-center">
                      <span className="tracking-widest text-[18px]">Earring 202</span>
                      <span className="icon-wrapper">
                        <img src="/icons/heart.svg" className="icon w-[24px] h-[24px] cursor-pointer" style={{filter: 'invert(1)'}} />
                      </span>
                    </div>
                    <div className="flex justify-center items-center space-x-2">
                      <span className="w-[20px] h-[20px] cursor-pointer pink-gradient rounded-full" />
                      <span className="w-[20px] h-[20px] cursor-pointer gold-gradient rounded-full" />
                      <span className="w-[20px] h-[20px] cursor-pointer silver-gradient rounded-full" />
                    </div>
                    <div>
                      <span className="font-bold text-[14px]">92$</span>
                    </div>
                </div>
              </div>
            </div>
            <div className="mt-24 flex justify-center items-center">
              <div className="flex justify-center items-center space-x-6">
                <span className="text-[16px] text-[#666666] cursor-pointer">1</span>
                <span className="bg-[#666666] h-[1px] w-[63px]" />
                <span className="text-black font-semibold text-[16px] cursor-pointer">2</span>
                <span className="text-[16px] text-[#666666] cursor-pointer">3</span>
                <span className="text-[16px] text-[#666666] cursor-pointer">4</span>
              </div>
            </div>
        </section>
      </MaxWidthWrapper>
      <Footer /> 
    </>
  );
};

export default Sale;
