"use client";

import Footer from "@/components/Footer";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";
import Link from "next/link";
import { trpc } from "@/app/trpc/client";
type User = {
  _id: string;
  email?: string;
  [key: string]: any;
};
import { toast } from "sonner";
import { getAuthUser } from "@/server/get-auth-user";
const Page = () => {
    const [isToggleMenu, setIsToggleMenu] = useState(false);
    const [sortByClicked, setSortByClicked] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("Earrings");
    const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);
    const [user, setUser] = useState<User | "not authorized" | null>(null);
    const [page, setPage] = useState(1);
    const [isLikedProduct, setIsLikedProduct] = useState(false);
    let isLoadingData = true;
    const [likedProducts, setLikedProducts] = useState<Set<string>>(new Set());
    const categories = ['All', 'Necklaces', 'Bracelets', 'Rings', 'Earrings'];
    const { data, isLoading } = trpc.product.fetchProductsByCategory.useQuery(
      { selectedCategory: selectedCategory === "All" ? undefined : selectedCategory, page },
      { keepPreviousData: true }
    );
    // const {data: likedData, isLoading: isLikedLoading} = trpc.product.checkLikedProduct.useQuery({
    //   onError: (err) => {
    //     toast
    //   }
    // }) 
    const { data: likedProductsData } = trpc.product.checkLikedProduct.useQuery(
      user && typeof user !== "string" ? { userId: user._id } : undefined as never,
      {
        enabled: !!user && typeof user !== "string", // Only run query if user is authenticated
        onSuccess: (data) => {
          console.log("Liked Products: ", data);
        },
        onError: (err) => {
          console.error("Error fetching liked products: ", err);
        },
      }
    );
    // const user = await getAuthUser();
    const {mutate} = trpc.product.likedProducts.useMutation({
      onError: (err) => {
        toast.error("something went wrong.");
      },
      onSuccess: () => {
        
        toast.success("successfully liked the product.");
        
      },
    });
    const {mutate: dislikeMutate} = trpc.product.dislikeProduct.useMutation({
      onError: (err) => {
        toast.error("something went wrong.");
      },
      onSuccess: () => {
        
        toast.success("successfully disliked the product.");
        
      },
    })
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
    // useEffect(() => {
    //   const fetchLikedProducts = async () => {
    //     try{
    //       if(user && typeof user !== "string"){
    //         const likedProducts = await trpc.product.checkLikedProduct.useQuery({userId: user?._id})
    //         console.log(likedProducts);
    //       }
          
    //     } catch (err){
    //       console.log("something went wrong", err);
    //     }
    //   }
    //   fetchLikedProducts();
    // }, [user]);
    
    const [selectedColor, setSelectedColor] = useState('mainProductImage');
  
    const handleColorClick = (color: string) => {
      setSelectedColor(color);
    };
  
    const handleCategoryClick = (category: string) => {
      setSelectedCategory(category);
      setPage(1);
    };
    const handleLikedProduct = (id: string) => {
      if (typeof user !== 'string' && user?._id) {
        // User is authorized, and user._id exists
        // likedProductsMutation.mutate({ id: user._id });
        mutate({userId: user._id, productId: id});
        setIsLikedProduct(true);
      } else {
        console.log("User is not authorized");
        toast.error("you have to be logged in!");
        // Handle the case where the user is not authorized
      }
    }
    const handleDislikeProduct = (id: string) => {
      if (typeof user !== 'string' && user?._id) {
        dislikeMutate({userId: user._id, productId: id});
      } else{
        console.log("User is not authorized");
        toast.error("you have to be logged in!");
      }
    }
    return (
        <>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-3 md:gap-5">
              {data?.products.length === 0 ? (
                <>
                  <div className="w-full h-[500px] bg-transparent">

                  </div>
                  <div className="w-full h-[500px] bg-transparent flex justify-center items-center">
                  <h2 className="text-[18px] tracking-widest">No products in the store yet</h2>
                  </div>
                  <div className="w-full h-[500px] bg-transparent">

                  </div>
                </>
              ) : (
                <>
                  {data?.products.map(product => (
                    <div onMouseEnter={() => setHoveredProductId(product._id)}
                      onMouseLeave={() => setHoveredProductId(null)} key={product._id} className="mx-auto lg:mx-0 flex flex-col justify-center items-start space-y-2 cursor-pointer">
                      <div className="relative sm:w-full sm:mx-auto md:w-full">
                        <Link href={`/products/product?id=${product._id}`}>
                          <img src={selectedColor === 'pinkGold'
                            ? product.pinkGold
                            : selectedColor === 'yellowGold'
                              ? product.yellowGold
                              : selectedColor === 'silverGold'
                                ? product.silverGold
                                : product.mainProductImage} className="xl:w-full xl:h-[397px] transition-opacity duration-500 ease-in-out opacity-100 hover:opacity-0" />
                          <img src={product.mainModelImage} className="absolute top-0 left-0 xl:w-full xl:h-[397px] transition-opacity duration-500 ease-in-out opacity-0 hover:opacity-100" />
                        </Link>
                      </div>
                      <div className="sm:w-full mx-auto md:w-full flex flex-col justify-center items-start space-y-2 cursor-pointer">
                        <div className="w-full flex justify-between items-center">
                          <span className="tracking-widest text-[18px]">{product.productName}</span>
                          <span className="icon-wrapper">
                            {/* {isLikedProduct ? (
                                <img onClick={() => handleDislikeProduct(product._id)} src="/icons/active-heart.svg" className="icon w-[24px] h-[24px] cursor-pointer" />
                            ): (
                              <img onClick={() => handleLikedProduct(product._id)} src='/icons/heart.svg' className="icon w-[24px] h-[24px] cursor-pointer" style={{ filter: 'invert(1)' }} />
                            )} */}
                            {likedProductsData?.likedProducts?.some((likedProduct) => likedProduct.productId === product._id) ? (
                              <img onClick={() => handleDislikeProduct(product._id)} src="/icons/active-heart.svg" className="icon w-[24px] h-[24px] cursor-pointer" />
                            ): (
                              <img onClick={() => handleLikedProduct(product._id)} src="/icons/heart.svg" className="icon w-[24px] h-[24px] cursor-pointer" style={{ filter: 'invert(1)' }} />
                            )}
                            {/* <img onClick={() => handleLikedProduct(product._id)} src="/icons/heart.svg" className="icon w-[24px] h-[24px] cursor-pointer" style={{ filter: 'invert(1)' }} /> */}
                          </span>
                        </div>
                        <div className="flex justify-center items-center space-x-2">
                          <span onClick={() => handleColorClick('pinkGold')} className={`w-[20px] h-[20px] cursor-pointer pink-gradient rounded-full ${selectedColor === "pinkGold" ? 'border-[1px] border-solid border-black' : ''}`} />
                          <span onClick={() => handleColorClick('yellowGold')} className={`w-[20px] h-[20px] cursor-pointer gold-gradient rounded-full ${selectedColor === "yellowGold" ? 'border-[1px] border-solid border-black' : ''}`} />
                          <span onClick={() => handleColorClick('silverGold')} className={`w-[20px] h-[20px] cursor-pointer silver-gradient rounded-full ${selectedColor === "silverGold" ? 'border-[1px] border-solid border-black' : ''}`} />
                        </div>
                        <div>
                          <span className="font-bold text-[14px]">{product.sizes[0].price} $</span>
                        </div>
                      </div>
                    </div>

                  ))}
                </>
              )}
            </div>
          )}
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
        </>
    )
}
export default Page;