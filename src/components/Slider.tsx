"use client";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import "@/app/product-slider.css"
import { EffectCards, Navigation, Autoplay } from "swiper/modules";
import { trpc } from "@/app/trpc/client";
const Slider = () => {

  const { data, isLoading } = trpc.product.fetchSliderImages.useQuery();
  // console.log(data?.images[0].secondaryImages);
  return (
    <>
      <section
        id="product-carousel"
        className="relative mb-80 mt-80 flex w-full flex-col items-center justify-center space-y-24 md:h-fit"
      >
        <h3 className="sm:text-[18px] md:text-[18px] font-bold tracking-widest">Gallery</h3>

        <div
          id="slider"
          className="absolute sm:bottom-[95%] md:bottom-[96%] sm:right-5 md:right-[13%] z-10 flex items-center justify-center space-x-2"
        >
          <img
            src="/icons/arrow.svg"
            className="swiper-prev slider-arrow sm:h-[16px] sm:w-[30px] md:h-[16px] md:w-[35px] rotate-180 cursor-pointer"
          />
          <img
            src="/icons/arrow.svg"
            className="swiper-next slider-arrow sm:h-[16px] sm:w-[30px] md:h-[16px] md:w-[35px] cursor-pointer"
          />
        </div>
        <Swiper
          effect={"cards"}
          grabCursor={true}
          navigation={{
            prevEl: ".swiper-prev",
            nextEl: ".swiper-next",
          }}
          autoplay={{
            delay: 5500,
            disableOnInteraction: false,
          }}
          modules={[EffectCards, Navigation, Autoplay]}
          className="mySwiper"
        >
          {/* w-[350px] h-[480px] md:h-[520px] md:w-[1100px] */}
          {/* {data?.images[0]?.secondaryImages.length > 0 ? ( */}
            {/* <> */}
              {data?.images[0]?.secondaryImages.map((product: string, index: number) => (
                <SwiperSlide key={index}>
                  <img src={product} className="rounded w-full h-full" />
               <span>{product}</span>
                </SwiperSlide>
              ))}
            {/* </> */}
          {/* //
          //   null
          //  */}

          {/* <SwiperSlide>
            <img src="/slider/fifth.jpeg" className="rounded w-full h-full" />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="/slider/jewelry.jpeg"
              className="rounded w-full h-full"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="/slider/second.webp"
              className="rounded w-full h-full"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="/slider/first.png"
              className="rounded w-full h-full"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="/slider/first.png"
              className="w-full h-full rounded"
            />
          </SwiperSlide> */}
        </Swiper>
      </section>
    </>
  );
};

export default Slider;
