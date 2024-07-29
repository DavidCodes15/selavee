"use client";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "@/app/related-slider.css"
import { Autoplay, Navigation } from "swiper/modules";
const RelatedProductSlider = () => {
    return (
        <>
        <section
        id="related-product-carousel"
        className="relative mb-44 mt-44 flex w-full flex-col items-center justify-center space-y-24 max-h-[800px] md:h-fit"
      >
        <h3 className="text-[15px] sm:pr-5 msm:pr-0 msm:text-[16px] md:text-[18px] font-bold tracking-widest">Related Products</h3>
      {/* bottom-[96%] right-[13%] */}
        <div
          id="relatedSlider"
          className="absolute sm:bottom-[96%] msm:bottom-[96.5%] md:bottom-[96%] sm:right-3 md:right-[13%] z-10 flex items-center justify-center space-x-2"
        >
          <img
            src="/icons/arrow.svg"
            className="swiper-prev slider-arrow sm:h-[16px] sm:w-[24px] msm:w-[30px] md:h-[16px] md:w-[35px] rotate-180 cursor-pointer"
          />
          <img
            src="/icons/arrow.svg"
            className="swiper-next slider-arrow sm:h-[16px] sm:w-[24px] msm:w-[30px] md:h-[16px] md:w-[35px] cursor-pointer"
          />
        </div>
         <Swiper
        slidesPerView={3}
        spaceBetween={0}
        navigation={{
            prevEl: ".swiper-prev",
            nextEl: ".swiper-next",
          }}
          autoplay={{
            delay: 5500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            1024: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 2,
            },
            320: {
              slidesPerView: 1,
            },
          }}
        modules={[Navigation, Autoplay]}
        className="RelatedSwiper"
      >
        <SwiperSlide>
        <div className="w-full flex flex-col justify-center items-start space-y-2 cursor-pointer">
                <div className="w-full">
                  <img src="/products/earrings.png" className="w-full h-full" />
                </div>
                <div className="w-full flex flex-col justify-center items-start space-y-2 cursor-pointer">
                    <div className="w-full flex justify-between items-center">
                      <span className="tracking-widest text-[18px]">Earring 202</span>
                      <span>
                        <img src="/icons/heart.svg" className="w-[24px] h-[24px] cursor-pointer" style={{filter: 'invert(1)'}} />
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
        </SwiperSlide>
        <SwiperSlide>
        <div className="w-full flex flex-col justify-center items-start space-y-2 cursor-pointer">
                <div className="w-full">
                  <img src="/products/earrings.png" className="w-full h-full" />
                </div>
                <div className="w-full flex flex-col justify-center items-start space-y-2 cursor-pointer">
                    <div className="w-full flex justify-between items-center">
                      <span className="tracking-widest text-[18px]">Earring 202</span>
                      <span>
                        <img src="/icons/heart.svg" className="w-[24px] h-[24px] cursor-pointer" style={{filter: 'invert(1)'}} />
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
        </SwiperSlide>
        <SwiperSlide>
        <div className="w-full flex flex-col justify-center items-start space-y-2 cursor-pointer">
                <div className="w-full">
                  <img src="/products/earrings.png" className="w-full h-full" />
                </div>
                <div className="w-full flex flex-col justify-center items-start space-y-2 cursor-pointer">
                    <div className="w-full flex justify-between items-center">
                      <span className="tracking-widest text-[18px]">Earring 202</span>
                      <span>
                        <img src="/icons/heart.svg" className="w-[24px] h-[24px] cursor-pointer" style={{filter: 'invert(1)'}} />
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
        </SwiperSlide>
        <SwiperSlide>
        <div className="w-full flex flex-col justify-center items-start space-y-2 cursor-pointer">
                <div className="w-full">
                  <img src="/products/earrings.png" className="w-full h-full" />
                </div>
                <div className="w-full flex flex-col justify-center items-start space-y-2 cursor-pointer">
                    <div className="w-full flex justify-between items-center">
                      <span className="tracking-widest text-[18px]">Earring 202</span>
                      <span>
                        <img src="/icons/heart.svg" className="w-[24px] h-[24px] cursor-pointer" style={{filter: 'invert(1)'}} />
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
        </SwiperSlide>
        <SwiperSlide>
        <div className="w-full flex flex-col justify-center items-start space-y-2 cursor-pointer">
                <div className="w-full">
                  <img src="/products/earrings.png" className="w-full h-full" />
                </div>
                <div className="w-full flex flex-col justify-center items-start space-y-2 cursor-pointer">
                    <div className="w-full flex justify-between items-center">
                      <span className="tracking-widest text-[18px]">Earring 202</span>
                      <span>
                        <img src="/icons/heart.svg" className="w-[24px] h-[24px] cursor-pointer" style={{filter: 'invert(1)'}} />
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
        </SwiperSlide>
        <SwiperSlide>
        <div className="w-full flex flex-col justify-center items-start space-y-2 cursor-pointer">
                <div className="w-full">
                  <img src="/products/earrings.png" className="w-full h-full" />
                </div>
                <div className="w-full flex flex-col justify-center items-start space-y-2 cursor-pointer">
                    <div className="w-full flex justify-between items-center">
                      <span className="tracking-widest text-[18px]">Earring 202</span>
                      <span>
                        <img src="/icons/heart.svg" className="w-[24px] h-[24px] cursor-pointer" style={{filter: 'invert(1)'}} />
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
        </SwiperSlide>
        <SwiperSlide>
        <div className="w-full flex flex-col justify-center items-start space-y-2 cursor-pointer">
                <div className="w-full">
                  <img src="/products/earrings.png" className="w-full h-full" />
                </div>
                <div className="w-full flex flex-col justify-center items-start space-y-2 cursor-pointer">
                    <div className="w-full flex justify-between items-center">
                      <span className="tracking-widest text-[18px]">Earring 202</span>
                      <span>
                        <img src="/icons/heart.svg" className="w-[24px] h-[24px] cursor-pointer" style={{filter: 'invert(1)'}} />
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
        </SwiperSlide>
        <SwiperSlide>
        <div className="w-full flex flex-col justify-center items-start space-y-2 cursor-pointer">
                <div className="w-full">
                  <img src="/products/earrings.png" className="w-full h-full" />
                </div>
                <div className="w-full flex flex-col justify-center items-start space-y-2 cursor-pointer">
                    <div className="w-full flex justify-between items-center">
                      <span className="tracking-widest text-[18px]">Earring 202</span>
                      <span>
                        <img src="/icons/heart.svg" className="w-[24px] h-[24px] cursor-pointer" style={{filter: 'invert(1)'}} />
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
        </SwiperSlide>
        <SwiperSlide>
        <div className="w-full flex flex-col justify-center items-start space-y-2 cursor-pointer">
                <div className="w-full">
                  <img src="/products/earrings.png" className="w-full h-full" />
                </div>
                <div className="w-full flex flex-col justify-center items-start space-y-2 cursor-pointer">
                    <div className="w-full flex justify-between items-center">
                      <span className="tracking-widest text-[18px]">Earring 202</span>
                      <span>
                        <img src="/icons/heart.svg" className="w-[24px] h-[24px] cursor-pointer" style={{filter: 'invert(1)'}} />
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
        </SwiperSlide>
      </Swiper>
      </section>
        </>
    )
}


export default RelatedProductSlider