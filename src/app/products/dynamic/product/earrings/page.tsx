import Footer from "@/components/Footer";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";
import RelatedProductSlider from "@/components/RelatedProductSlider";

const Earrings = () => {
  return (
    <>
      <Navbar theme="dark" />
      <section id="hero">
      <MaxWidthWrapper className="mt-44">
        <div className="flex w-full flex-col justify-center space-y-24">
          <div className="text-center">
            <h1 className="text-[24px] tracking-widest">Earrings</h1>
          </div>
          <div className="flex mx-auto lg:mx-0 sm:w-[90%] lg:w-auto sm:space-x-0 sm:space-y-2 lg:space-y-0 lg:space-x-2 sm:flex-col lg:flex-row">
            <img src="/products/earrings.png" className="sm:w-full lg:w-1/2" />
            <div className="sm:w-full lg:w-1/2 flex flex-col space-y-6">
            <div className="w-full flex justify-between items-start">
              <div className="flex items-center justify-center space-x-2">
                <span className="sm:text-[14px] msm:text-[16px] font-semibold">92 $</span>
                <span className="bg-black p-[1px] text-[13px] text-white">
                  30% off
                </span>
                <div>
                  .{" "}
                  <span className="text-[12px] tracking-widest text-[#666666]">
                    best seller
                  </span>
                </div>
              </div>
              <span className="icon-wrapper">
                <img
                  src="/icons/heart.svg"
                  className="icon sm:h-[20px] sm:w-[20px] msm:h-[24px] msm:w-[24px] cursor-pointer"
                  style={{ filter: "invert(1)" }}
                />
              </span>
              </div>
              <div>
                <h2 className="tracking-widest text-[18px] msm:text-[20px]">Earring 202</h2>
              </div>
              <div className="flex flex-col justify-center items-start space-y-2">
                <div className="flex justify-start items-center space-x-2">
                    <div className="flex justify-center space-x-[5px] text-[#E62749] tracking-widest">
                        <span className="text-[14px]">Size:</span>
                        <span className="flex justify-center items-center space-x-[3px]"><span className="text-[14px]">Medium</span><span><img src="/icons/product-size-arrow.svg" className="w-[15px] h-[7px] cursor-pointer"/></span></span>
                    </div>
                    <div className="bg-[#E62749] text-[#E62749] bg-opacity-5 px-4 py-2">
                        <span className="sm:text-[10px] msm:text-[13px] lsm:text-[13px] tracking-widest">Please select size</span>
                    </div>
                </div>
                <div className="flex justify-center space-x-[5px] tracking-widest">
                        <span className="text-[13px]">For your assistance:</span>
                        <span className="flex justify-center items-center space-x-[3px]"><span className="underline underline-offset-4 text-[13px]">Size guide</span><span><img src="/icons/size-guide-arrow.svg" className="w-[15px] h-[7px] cursor-pointer"/></span></span>
                    </div>
              </div>
              <div className="flex flex-col justify-center items-start space-y-6">
                    <div className="flex justify-start items-center space-x-[5px] tracking-widest">
                        <span className="text-[14px]">Quantity:</span>
                        <span className="bg-[#F7F7F7] text-black px-4 py-2 cursor-pointer">1</span>
                    </div>
                    <div className="flex justify-center items-center space-x-4">
                        <div>
                            <img src="/products/earrings.png" className="w-[66px] h-[51px] border-[1px] border-black border-solid cursor-pointer" />
                        </div>
                        <div>
                        <img src="/products/earrings.png" className="w-[66px] h-[51px] cursor-pointer" />
                        </div>
                        <div>
                        <img src="/products/earrings.png" className="w-[66px] h-[51px] cursor-pointer" />
                        </div>
                    </div>
                    <div className="flex justify-center items-center space-x-2">
                      <span className="w-[20px] h-[20px] border-[1px] border-black border-solid cursor-pointer pink-gradient rounded-full" />
                      <span className="w-[20px] h-[20px] cursor-pointer gold-gradient rounded-full" />
                      <span className="w-[20px] h-[20px] cursor-pointer silver-gradient rounded-full" />
                    </div>
            </div>
            <div className="py-12 flex flex-col justify-center items-start space-y-12">
                <div className="flex justify-center items-center space-x-2">
                    <img src="/icons/shipping-icon.svg" className="w-[24px] h-[24px]" />
                    <span className="text-[12px] msm:text-[14px] tracking-widest">free shipping</span>
                </div>
                <div className="flex flex-col justify-center items-start space-y-6 w-full">
                    <div className="icon-wrapper w-full border-b-[1px] border-[#E6E6E6] py-4 px-2 flex justify-between items-center">
                        <span className="text-[12px] msm:text-[14px] tracking-widest">Shipping info & returns</span>
                        <img src="/icons/accordion.svg" className="icon cursor-pointer w-[14px] h-[14px]" />
                    </div>
                    <div className="icon-wrapper w-full border-b-[1px] border-[#E6E6E6] px-2 py-4 flex justify-between items-center">
                        <span className="text-[12px] msm:text-[14px] tracking-widest">Care instructions</span>
                        <img src="/icons/accordion.svg" className="icon cursor-pointer w-[14px] h-[14px]" />
                    </div>
                </div>
            </div>
            <div className="flex justify-start items-center space-x-6">
                <button className="icon-wrapper flex justify-center items-center space-x-2 px-4 py-2 text-white bg-black">
                    <span className="text-[12px] msm:text-[16px]">ADD TO BAG</span>
                    <img src="/icons/plus.svg" className="icon w-[14px] h-[14px]" />
                </button>
                <button className="icon-wrapper flex justify-center items-center space-x-2 px-4 py-[7px] border-[1px] border-black border-solid bg-transparent text-black">
                    <span className="text-[12px] msm:text-[16px]">TRY ON</span>
                    <img src="/icons/product-try-on.svg" className="icon w-[14px] h-[14px]" />
                </button>
            </div>
            </div>
          </div>
        
        </div>
      </MaxWidthWrapper>
      </section>
      <section className="my-32">
        <MaxWidthWrapper>
        <div className="grid grid-cols-1 sm:gap-y-10 gap-x-0 lg:gap-5 lg:grid-cols-2 tracking-widest">
        <div className="sm:p-0 lg:p-8">
        <h2 className="text-[16px] font-semibold mb-4 ml-4">Product Details</h2>
        <table className="w-full border-collapse">
            <tbody>
            <tr className="text-[14px]">
                <td className="p-4 font-semibold border-r">Product</td>
                <td className="p-4">Product</td>
            </tr>
            <tr className="border-t text-[14px]">
                <td className="p-4 font-semibold border-r">Style Code</td>
                <td className="p-4">832003</td>
            </tr>
            <tr className="border-t border-b text-[14px]">
                <td className="p-4 font-semibold border-r">Dimensions</td>
                <td className="p-4">-</td>
            </tr>
            </tbody>
        </table>
        </div>
        <div className="sm:p-0 lg:p-8">
        <h2 className="text-[16px] font-semibold mb-4 ml-4">Diamond</h2>
        <table className="w-full border-collapse">
            <tbody>
            <tr className="text-[14px]">
                <td className="p-4 font-semibold border-r">Diamond Purity</td>
                <td className="p-4">Si HI</td>
            </tr>
            <tr className="border-t text-[14px]">
                <td className="p-4 font-semibold border-r">Diamond Gross Weight</td>
                <td className="p-4 flex justify-start items-center space-x-2">
                    <span>0,64 ct</span>
                    <img src="/icons/info.svg" className="w-[16px] h-[16px]" />
                </td>
            </tr>
            <tr className="border-t border-b text-[14px]">
                <td className="p-4 font-semibold border-r">Diamond pcs</td>
                <td className="p-4">12</td>
            </tr>
            </tbody>
        </table>
        </div>
        <div className="sm:p-0 lg:p-8">
        <h2 className="text-[16px] font-semibold mb-4 ml-4">Metal</h2>
        <table className="w-full border-collapse">
            <tbody>
            <tr className="text-[14px]">
                <td className="p-4 font-semibold border-r">Metal Purity</td>
                <td className="p-4">18 KT</td>
            </tr>
            <tr className="border-t text-[14px]">
                <td className="p-4 font-semibold border-r">Metal Gross Weight</td>
                <td className="p-4 flex justify-start items-center space-x-2">
                <span>2.23 gms</span>
                 <img src="/icons/info.svg" className="w-[16px] h-[16px]" />
                </td>
            </tr>
           
            </tbody>
        </table>
        </div>
    </div>
    </MaxWidthWrapper>
      </section>

      <RelatedProductSlider />
      <Footer />
    </>
  );
};

export default Earrings;
