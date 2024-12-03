"use client";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "@/app/related-slider.css"
import { Autoplay, Navigation } from "swiper/modules";
import { useState, useEffect } from "react";
import { getAuthUser } from "@/server/get-auth-user";
import { trpc } from "@/app/trpc/client";
import { useLikedChange } from "@/hooks/use-state";
import { toast } from "sonner";
interface RelatedProductSliderProps {
  productId: string;
  otherCreations: string; // Replace 'any' with the actual type if available
  completeSet: string; // Replace 'any' with the actual type if available
}
type User = {
  _id: string;
  email?: string;
  [key: string]: any;
};
type CartProduct = Product & {
  selectedImageUrl: string;
  selectedColor: string;
  totalPrice: number;
  quantity: number;
};
import { ProductSize } from "@/project-types";
import { ArrowBigLeft, ArrowBigRight, MoveLeft, MoveRight } from "lucide-react";
type Product = {

  _id: string;
  productCategory: string;
  productName: string;
  completeSet: string;
  otherCreations: string;
  productDetail: string;
  productStyleCode: string;
  productDimensions: string;
  productDiamondPurity: string;
  productDiamondGrossWeight: string;
  productDiamondPcs: string;
  productMetalPurity: string;
  productMetalGrossWeight: string;
  productStoneShape: string;
  productStoneType: string;
  mainProductImage: string;
  mainModelImage: string;
  pinkGold: string;
  yellowGold: string;
  silverGold: string;
  sizes: ProductSize[];
  onlyPrice: number;
  bought: number;
  sort: string;
  totalPrice: number;
  selectedImageUrl: string;
  selectedColor: string;
  secondaryImages?: string[];
  quantity: number; // Optional field

}
const RelatedProductSlider: React.FC<RelatedProductSliderProps> = ({
  productId,
  otherCreations,
  completeSet,
}) => {
  console.log("Product ID:", productId);
  console.log("Other Creations:", otherCreations);
  console.log("Complete Set:", completeSet);
  const { data, isLoading } = trpc.product.fetchRelatedProducts.useQuery({
    productId,
    otherCreations,
    completeSet,
  });
  const [selectedTab, setSelectedTab] = useState<"other" | "complete">("other");
  const { items: likedItems, addItem: addLikedItem, removeItem: removeLikedItem } = useLikedChange();
  const [selectedColors, setSelectedColors] = useState<Record<string, string>>({});
  const handleColorClick = (productId: string, color: string) => {
    // Update the selected color for a specific product
    setSelectedColors((prev) => ({
      ...prev,
      [productId]: color,
    }));
  };
  const [user, setUser] = useState<User | "not authorized" | null>(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = (await getAuthUser({
          shouldRedirect: false,
        })) as unknown as User;
        if (user && typeof user !== "string") {
          setUser(user);
          console.log(user);
        } else {
          setUser("not authorized");
        }
      } catch (error) {
        setUser("not authorized");
      }
    };

    fetchUser();
  }, []);
  const handleLike = (product: Product) => {
    if (user && typeof user !== "string") {
      const selectedColor = selectedColors[product._id] || "mainProductImage";
      const imageMap: Record<string, string | undefined> = {
        mainProductImage: product.mainProductImage,
        pinkGold: product.pinkGold,
        yellowGold: product.yellowGold,
        silverGold: product.silverGold,
      };

      // Get the correct image based on selectedColor

      // const selectedImageUrl = imageMap[selectedColor] || product.mainProductImage;
      const selectedImageUrl = imageMap[selectedColor] || product.mainProductImage;
      const likedProduct: CartProduct = {
        ...product,
        _id: product._id,
        productName: product.productName,
        selectedImageUrl: selectedImageUrl || "",
        selectedColor,
        totalPrice: product.sizes?.[0]?.price || product.onlyPrice || 0,
        quantity: 1, // Default to 1, or adjust as needed
      };

      addLikedItem(likedProduct); // Add the product to liked items
      toast.success(`${product.productName} has been added to your favorites!`);
    } else {
      toast.error("You need to log in to like a product.");
    }
  };

  const handleDislike = (productId: string) => {
    removeLikedItem(productId);
    toast.success(`Product has been removed from your favorites.`);
  };
  const filteredProducts =
    selectedTab === "other"
      ? data?.relatedProducts.filter((product) => product.otherCreations === otherCreations)
      : data?.relatedProducts.filter((product) => product.completeSet === completeSet);

  return (
    <>
      <section
        id="related-product-carousel"
        className="relative mb-44 mt-44 flex w-full flex-col items-center justify-center space-y-24 max-h-[800px] md:h-fit"
      >

        <span className="text-[15px] sm:pr-5 msm:pr-0 msm:text-[16px] md:text-[18px] font-bold tracking-widest">
          Related Products
        </span>

        {/* Tabs */}
        <div className="flex w-full justify-center items-center space-y-4 relative">
          <div className="flex justify-center items-center space-x-8">
            <span
              className={`cursor-pointer tracking-widest text-[16px] ${selectedTab === "other" ? "border-b-[1px] border-solid border-black" : ""}`}
              onClick={() => setSelectedTab("other")}
            >
              Other Creations
            </span>
            <span
              className={`cursor-pointer tracking-widest text-[16px] ${selectedTab === "complete" ? "border-b-[1px] border-solid border-black" : ""}`}
              onClick={() => setSelectedTab("complete")}
            >
              Complete Set
            </span>
          </div>

          {/* Arrows */}
          {/* <div id="relatedSlider" className="absolute top-0 right-20 flex items-center space-x-2">
            <img
              src="/icons/arrow.svg"
              className="swiper-prev slider-arrow sm:h-[16px] sm:w-[24px] msm:w-[30px] md:h-[16px] md:w-[35px] rotate-180 cursor-pointer"
            />
            <img
              src="/icons/arrow.svg"
              className="swiper-next slider-arrow sm:h-[16px] sm:w-[24px] msm:w-[30px] md:h-[16px] md:w-[35px] cursor-pointer"
            />
          </div> */}
        
        </div>
        <div className="absolute top-10 right-20 flex justify-center items-center space-x-2">
          <MoveLeft className="swiper-prev slider-arrow  cursor-pointer" />
          <MoveRight className="swiper-next slider-arrow cursor-pointer" />
        {/* <img
              src="/icons/arrow.svg"
              className="swiper-prev slider-arrow sm:h-[16px] sm:w-[24px] msm:w-[30px] md:h-[16px] md:w-[35px] rotate-180 cursor-pointer"
            />
            <img
              src="/icons/arrow.svg"
              className="swiper-next slider-arrow sm:h-[16px] sm:w-[24px] msm:w-[30px] md:h-[16px] md:w-[35px] cursor-pointer"
            /> */}
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
          {filteredProducts?.map((product) => {
            const isLiked = likedItems.some((likedItem) => likedItem.product._id === product._id);
            return (
              <SwiperSlide key={product._id}>
                <div className="w-full flex flex-col justify-center items-start space-y-2 cursor-pointer">
                  <div className="w-full">
                    <img src={
                      selectedColors[product._id] === "pinkGold"
                        ? product.pinkGold
                        : selectedColors[product._id] === "yellowGold"
                          ? product.yellowGold
                          : selectedColors[product._id] === "silverGold"
                            ? product.silverGold
                            : product.mainProductImage
                    } className="w-full h-[450px] transition-opacity duration-500 ease-in-out opacity-100 hover:opacity-0" />
                     <img src={product.mainModelImage} className="z-10 absolute -top-1 left-0 w-full h-[460px] transition-opacity duration-500 ease-in-out opacity-0 hover:opacity-100" />
                  </div>
                  <div className="w-full flex flex-col justify-center items-start space-y-2 cursor-pointer">
                    <div className="w-full flex justify-between items-center">
                      <span className="tracking-widest text-[18px]">{product.productName}</span>
                      <span>
                        {isLiked ? (
                          <img
                            src="/icons/active-heart.svg"
                            className="w-[24px] h-[24px] cursor-pointer"
                            onClick={() => handleDislike(product._id)}
                          />
                        ) : (
                          <img
                            src="/icons/heart.svg"
                            className="w-[24px] h-[24px] cursor-pointer"
                            style={{ filter: "invert(1)" }}
                            onClick={() => handleLike(product as Product)}
                          />
                        )}
                      </span>
                    </div>
                    <div className="flex justify-center items-center space-x-2">
                      <span
                        onClick={() => handleColorClick(product._id, "pinkGold")}
                        className={`w-[20px] h-[20px] cursor-pointer pink-gradient rounded-full ${selectedColors[product._id] === "pinkGold"
                          ? "border-[1px] border-solid border-black"
                          : ""
                          }`}
                      />
                      <span
                        onClick={() => handleColorClick(product._id, "yellowGold")}
                        className={`w-[20px] h-[20px] cursor-pointer gold-gradient rounded-full ${selectedColors[product._id] === "yellowGold"
                          ? "border-[1px] border-solid border-black"
                          : ""
                          }`}
                      />
                      <span
                        onClick={() => handleColorClick(product._id, "silverGold")}
                        className={`w-[20px] h-[20px] cursor-pointer silver-gradient rounded-full ${selectedColors[product._id] === "silverGold"
                          ? "border-[1px] border-solid border-black"
                          : ""
                          }`}
                      />
                      {/* <span className="w-[20px] h-[20px] cursor-pointer pink-gradient rounded-full" />
                      <span className="w-[20px] h-[20px] cursor-pointer gold-gradient rounded-full" />
                      <span className="w-[20px] h-[20px] cursor-pointer silver-gradient rounded-full" /> */}
                    </div>
                    <div>
                      <span className="font-bold text-[14px]">{product.sizes[0].price}$</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            )
          })}
          {/* {filteredProducts?.map((product) => (
            <SwiperSlide key={product._id}>
              <div className="w-full flex flex-col justify-center items-start space-y-2 cursor-pointer">
                <div className="w-full">
                  <img src={product.mainProductImage} className="w-full h-[450px]" />
                </div>
                <div className="w-full flex flex-col justify-center items-start space-y-2 cursor-pointer">
                  <div className="w-full flex justify-between items-center">
                    <span className="tracking-widest text-[18px]">{product.productName}</span>
                    <span>
                      <img src="/icons/heart.svg" className="w-[24px] h-[24px] cursor-pointer" style={{ filter: 'invert(1)' }} />
                    </span>
                  </div>
                  <div className="flex justify-center items-center space-x-2">
                    <span className="w-[20px] h-[20px] cursor-pointer pink-gradient rounded-full" />
                    <span className="w-[20px] h-[20px] cursor-pointer gold-gradient rounded-full" />
                    <span className="w-[20px] h-[20px] cursor-pointer silver-gradient rounded-full" />
                  </div>
                  <div>
                    <span className="font-bold text-[14px]">{product.sizes[0].price}$</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))} */}

        </Swiper>
      </section>
    </>
  )
}


export default RelatedProductSlider