"use client";
"use client";
import { trpc } from "@/app/trpc/client";
type User = {
    _id: string;
    email?: string;
    [key: string]: any;
};
import Link from "next/link";
import { toast } from "sonner";
import { getAuthUser } from "@/server/get-auth-user";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useState, useEffect, useMemo } from "react";
const Page = () => {
    const [isToggleMenu, setIsToggleMenu] = useState(false);
    const [selectedColor, setSelectedColor] = useState('mainProductImage');
    const [gold, setGold] = useState('');
    const [sortByClicked, setSortByClicked] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Earrings");
  const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);
  const [user, setUser] = useState<User | "not authorized" | null>(null);
  const [page, setPage] = useState(1);
  const [isLikedProduct, setIsLikedProduct] = useState(false);
  let isLoadingData = true;
  const [likedProducts, setLikedProducts] = useState<Set<string>>(new Set());
  const categories = ['All', 'Necklaces', 'Bracelets', 'Rings', 'Earrings'];
  const [style, setStyle] = useState('');
  const [type, setType] = useState('');
  const [isFilterSubmitted, setIsFilterSubmitted] = useState(false);
    const handleColorClick = (color: string) => {
      setSelectedColor(color);
    };
  
    const handleCategoryClick = (category: string) => {
      setSelectedCategory(category);
      setPage(1);
    };
    const {mutate: dislikeMutate} = trpc.product.dislikeProduct.useMutation({
        onError: (err) => {
          toast.error("something went wrong.");
        },
        onSuccess: () => {
          
          toast.success("successfully disliked the product.");
        },
      })
    const { data, isLoading } = trpc.product.checkLikedProduct.useQuery(
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
    const productIds = data?.likedProducts.map((likedProduct) => likedProduct.productId) || [];

    // Step 3: Use a single useQuery to fetch all the products based on those productIds
    const { data: productsData, isLoading: isProductsLoading } = trpc.product.fetchProductsByIds.useQuery(
        { productIds }, // Using the new endpoint
        {
            enabled: productIds.length > 0,
        }
    );
    
    console.log("liked product ids", data);
    console.log("whole products", productsData);
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
    const handleDislikeProduct = (id: string) => {
        if (typeof user !== 'string' && user?._id) {
          dislikeMutate({userId: user._id, productId: id});
          
        } else{
          console.log("User is not authorized");
          toast.error("you have to be logged in!");
        }
      }
      const { data: filteredData, isLoading: filteredLoading } = trpc.product.filteredProducts.useQuery(
        { style, metal: gold, type },
        { enabled: isFilterSubmitted } // Trigger query only after form submission
      );
      console.log(filteredData);
      const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setIsFilterSubmitted(true);
        setIsToggleMenu(!isToggleMenu);
        console.log(filteredData);
      }
      const handleGold = (gold: string) => {
        setGold(gold);
      }
    return (
        <>
            <form id="menu" onSubmit={handleSubmit} className={`bg-white fixed overflow-y-scroll top-0 z-10 flex h-screen flex-col items-start sm:w-screen md:w-fit ${isToggleMenu ? 'filter active' : 'filter'}`}>
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
              <div className="flex flex-col justify-center items-start space-y-2">
                <span className="flex justify-start items-center space-x-2">
                  <input value="pendant" onClick={() => setStyle("pendant")} className="cursor-pointer" type="checkbox" />
                  <label className="cursor-pointer tracking-widest text-[14px]">Pendant Earring</label>
                </span>
                <span className="flex justify-start items-center space-x-2">
                  <input value="diamond" onClick={() => setStyle("diamond")} className="cursor-pointer" type="checkbox" />
                  <label className="cursor-pointer tracking-widest text-[14px]">Diamond Earring</label>
                </span>
                <span className="flex justify-start items-center space-x-2">
                  <input value="gemstone" onClick={() => setStyle("gemstone")} className="cursor-pointer" type="checkbox" />
                  <label className="cursor-pointer tracking-widest text-[14px]">Gemstone Earring</label>
                </span>
                <span className="flex justify-start items-center space-x-2">
                  <input value="tennis" onClick={() => setStyle("tennis")} className="cursor-pointer" type="checkbox" />
                  <label className="cursor-pointer text-[14px] tracking-widest">Tennis Earring</label>
                </span>
                <span className=" flex justify-start items-center space-x-2">
                  <input value="drilled-diamond" onClick={() => setStyle("drilled-diamond")} className="cursor-pointer" type="checkbox" />
                  <label className="cursor-pointer tracking-widest text-[14px]">Drilled Diamond Earring</label>
                </span>
              </div>
            </div>

            <div className="flex flex-col justify-center items-start space-y-2 px-8">
              <span className="text-[14px] tracking-widest font-semibold">METAL</span>
              <div className="flex flex-col justify-center items-start space-y-2">
                <div className="flex justify-start items-center space-x-2">
                  <span onClick={() => handleGold("silverGold")} className={`w-[20px] h-[20px] cursor-pointer silver-gradient rounded-full ${gold === "silverGold" ? 'border-black border-solid border-[1px]' : ''}`} />
                  <span className="text-[14px] tracking-widest">18k White Gold</span>
                </div>
                <div className="flex justify-start items-center space-x-2">

                  <span onClick={() => handleGold("pinkGold")} className={`w-[20px] h-[20px] cursor-pointer pink-gradient rounded-full ${gold === "pinkGold" ? 'border-black border-solid border-[1px]' : ''}`} />
                  <span className="text-[14px] tracking-widest">18k Rose Gold</span>
                </div>
                <div className="flex justify-start items-center space-x-2">
                  <span onClick={() => handleGold("yellowGold")} className={`w-[20px] h-[20px] cursor-pointer gold-gradient rounded-full ${gold === "yellowGold" ? 'border-black border-solid border-[1px]' : ''}`} />
                  <span className="text-[14px] tracking-widest">18k Yellow Gold</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center items-start space-y-2 px-8">
              <span className="text-[14px] font-semibold tracking-widest">STONE TYPE</span>
              <div className="flex flex-col justify-center items-start space-y-2">
                <span className="flex justify-start items-center space-x-2">
                  <input value="diamond" onClick={() => setType("diamond")} className="cursor-pointer" type="checkbox" />
                  <label className="cursor-pointer tracking-widest text-[14px]">Diamond</label>
                </span>
                <span className="flex justify-start items-center space-x-2">
                  <input value="emeralds" onClick={() => setType("emeralds")} className="cursor-pointer" type="checkbox" />
                  <label className="cursor-pointer tracking-widest text-[14px]">Emeralds</label>
                </span>
                <span className="flex justify-start items-center space-x-2">
                  <input value="rubies" onClick={() => setType("ruby")} className="cursor-pointer" type="checkbox" />
                  <label className="cursor-pointer tracking-widest text-[14px]">Rubies</label>
                </span>
                <span className="flex justify-start items-center space-x-2">
                  <input value="blue-sapphires" onClick={() => setType("blue-sapphires")} className="cursor-pointer" type="checkbox" />
                  <label className="cursor-pointer text-[14px] tracking-widest">Blue Sapphires</label>
                </span>
                <span className=" flex justify-start items-center space-x-2">
                  <input value="pink-sapphires" onClick={() => setType("pink-sapphires")} className="cursor-pointer" type="checkbox" />
                  <label className="cursor-pointer tracking-widest text-[14px]">Pink Sapphires</label>
                </span>
              </div>
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
                {/* <button className="w-full text-black text-[16px] tracking-widest text-center py-2 font-semibold">CLEAR</button> */}
                <button type="submit" className="w-full bg-black text-white text-[16px] tracking-widest text-center py-2 font-semibold">FILTER</button>
              </div>
            </div>

          </div>

        </div>
      </form>
      <MaxWidthWrapper className="mt-52 mb-80">
        <section id="hero" className="w-full">
          <div className="flex flex-col space-y-24">
            <div className="flex items-center justify-center">
              <h1 className="text-[18px] lg:text-[24px] font-semibold tracking-widest">
                Liked Products
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
                <span>Liked Products image</span>
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
                    {categories.map((category) => (
                      <li
                        key={category}
                        onClick={() => handleCategoryClick(category)}
                        className={`cursor-pointer pb-2 ${selectedCategory === category ? 'border-b-2 border-black' : ''
                          }`}
                      >
                        {category}
                      </li>
                    ))}
                    {/* <li onClick={() => handleCategoryChange('all')} className="cursor-pointer hover:text-black">All</li>
                    <li onClick={() => handleCategoryChange('necklaces')} className="cursor-pointer hover:text-black">Necklace</li>
                    <li onClick={() => handleCategoryChange('bracelets')} className="cursor-pointer hover:text-black">Bracelets</li>
                    <li onClick={() => handleCategoryChange('rings')} className="cursor-pointer hover:text-black">Rings</li>
                    <li onClick={() => handleCategoryChange('earrings')} className="cursor-pointer hover:text-black">Earrings</li> */}
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
                      <span onClick={() => setSortByClicked(!sortByClicked)} className="text-white text-[14px] tracking-widest cursor-pointer">New Arrivals</span>
                      <span onClick={() => setSortByClicked(!sortByClicked)} className="text-white text-[14px] tracking-widest cursor-pointer">Price:Low to High</span>
                      <span onClick={() => setSortByClicked(!sortByClicked)} className="text-white text-[14px] tracking-widest cursor-pointer">Price:High to Low</span>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
          {isLoading ? (
            <>
              <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-3 md:gap-5 animate-pulse">
                {/**max-w-384 lg:w-fit */}
                <div className="mx-auto lg:mx-0 flex flex-col justify-center items-start space-y-2 cursor-pointer">
                  {/**sm:w-[90%] */}
                  <div className="sm:w-full sm:mx-auto md:w-full">

                    <div className="bg-gray-300 w-full h-[397px] rounded" />

                  </div>
                  {/**sm:w-[90%] */}
                  <div className="sm:w-full mx-auto md:w-full flex flex-col justify-center items-start space-y-2 cursor-pointer">
                    <div className="w-full flex justify-between items-center">
                      {/* <span className="tracking-widest text-[18px]">Earring 202</span> */}
                      <div className="w-[60%] h-[10px] rounded bg-gray-300" />
                      <div className="w-[20%] h-[10px] rounded bg-gray-300" />
                    </div>
                    <div className="flex justify-center items-center space-x-2">
                      <span className="w-[20px] h-[20px] cursor-pointer bg-gray-300 rounded-full" />
                      <span className="w-[20px] h-[20px] cursor-pointer bg-gray-300 rounded-full" />
                      <span className="w-[20px] h-[20px] cursor-pointer bg-gray-300 rounded-full" />
                    </div>
                    {/* <div>
                      <span className="font-bold text-[14px]">92$</span>
                      
                    </div> */}
                  </div>
                </div>
                <div className="mx-auto lg:mx-0 flex flex-col justify-center items-start space-y-2 cursor-pointer">
                  {/**sm:w-[90%] */}
                  <div className="sm:w-full sm:mx-auto md:w-full">

                    <div className="bg-gray-300 w-full h-[397px] rounded" />

                  </div>
                  {/**sm:w-[90%] */}
                  <div className="sm:w-full mx-auto md:w-full flex flex-col justify-center items-start space-y-2 cursor-pointer">
                    <div className="w-full flex justify-between items-center">
                      {/* <span className="tracking-widest text-[18px]">Earring 202</span> */}
                      <div className="w-[60%] h-[10px] rounded bg-gray-300" />
                      <div className="w-[20%] h-[10px] rounded bg-gray-300" />
                    </div>
                    <div className="flex justify-center items-center space-x-2">
                      <span className="w-[20px] h-[20px] cursor-pointer bg-gray-300 rounded-full" />
                      <span className="w-[20px] h-[20px] cursor-pointer bg-gray-300 rounded-full" />
                      <span className="w-[20px] h-[20px] cursor-pointer bg-gray-300 rounded-full" />
                    </div>
                    {/* <div>
                      <span className="font-bold text-[14px]">92$</span>
                      
                    </div> */}
                  </div>
                </div>
                <div className="mx-auto lg:mx-0 flex flex-col justify-center items-start space-y-2 cursor-pointer">
                  {/**sm:w-[90%] */}
                  <div className="sm:w-full sm:mx-auto md:w-full">

                    <div className="bg-gray-300 w-full h-[397px] rounded" />

                  </div>
                  {/**sm:w-[90%] */}
                  <div className="sm:w-full mx-auto md:w-full flex flex-col justify-center items-start space-y-2 cursor-pointer">
                    <div className="w-full flex justify-between items-center">
                      {/* <span className="tracking-widest text-[18px]">Earring 202</span> */}
                      <div className="w-[60%] h-[10px] rounded bg-gray-300" />
                      <div className="w-[20%] h-[10px] rounded bg-gray-300" />
                    </div>
                    <div className="flex justify-center items-center space-x-2">
                      <span className="w-[20px] h-[20px] cursor-pointer bg-gray-300 rounded-full" />
                      <span className="w-[20px] h-[20px] cursor-pointer bg-gray-300 rounded-full" />
                      <span className="w-[20px] h-[20px] cursor-pointer bg-gray-300 rounded-full" />
                    </div>
                    {/* <div>
                      <span className="font-bold text-[14px]">92$</span>
                      
                    </div> */}
                  </div>
                </div>
                <div className="mx-auto lg:mx-0 flex flex-col justify-center items-start space-y-2 cursor-pointer">
                  {/**sm:w-[90%] */}
                  <div className="sm:w-full sm:mx-auto md:w-full">

                    <div className="bg-gray-300 w-full h-[397px] rounded" />

                  </div>
                  {/**sm:w-[90%] */}
                  <div className="sm:w-full mx-auto md:w-full flex flex-col justify-center items-start space-y-2 cursor-pointer">
                    <div className="w-full flex justify-between items-center">
                      {/* <span className="tracking-widest text-[18px]">Earring 202</span> */}
                      <div className="w-[60%] h-[10px] rounded bg-gray-300" />
                      <div className="w-[20%] h-[10px] rounded bg-gray-300" />
                    </div>
                    <div className="flex justify-center items-center space-x-2">
                      <span className="w-[20px] h-[20px] cursor-pointer bg-gray-300 rounded-full" />
                      <span className="w-[20px] h-[20px] cursor-pointer bg-gray-300 rounded-full" />
                      <span className="w-[20px] h-[20px] cursor-pointer bg-gray-300 rounded-full" />
                    </div>
                    {/* <div>
                      <span className="font-bold text-[14px]">92$</span>
                      
                    </div> */}
                  </div>
                </div>
                <div className="mx-auto lg:mx-0 flex flex-col justify-center items-start space-y-2 cursor-pointer">
                  {/**sm:w-[90%] */}
                  <div className="sm:w-full sm:mx-auto md:w-full">

                    <div className="bg-gray-300 w-full h-[397px] rounded" />

                  </div>
                  {/**sm:w-[90%] */}
                  <div className="sm:w-full mx-auto md:w-full flex flex-col justify-center items-start space-y-2 cursor-pointer">
                    <div className="w-full flex justify-between items-center">
                      {/* <span className="tracking-widest text-[18px]">Earring 202</span> */}
                      <div className="w-[60%] h-[10px] rounded bg-gray-300" />
                      <div className="w-[20%] h-[10px] rounded bg-gray-300" />
                    </div>
                    <div className="flex justify-center items-center space-x-2">
                      <span className="w-[20px] h-[20px] cursor-pointer bg-gray-300 rounded-full" />
                      <span className="w-[20px] h-[20px] cursor-pointer bg-gray-300 rounded-full" />
                      <span className="w-[20px] h-[20px] cursor-pointer bg-gray-300 rounded-full" />
                    </div>
                    {/* <div>
                      <span className="font-bold text-[14px]">92$</span>
                      
                    </div> */}
                  </div>
                </div>
                <div className="mx-auto lg:mx-0 flex flex-col justify-center items-start space-y-2 cursor-pointer">
                  {/**sm:w-[90%] */}
                  <div className="sm:w-full sm:mx-auto md:w-full">

                    <div className="bg-gray-300 w-full h-[397px] rounded" />

                  </div>
                  {/**sm:w-[90%] */}
                  <div className="sm:w-full mx-auto md:w-full flex flex-col justify-center items-start space-y-2 cursor-pointer">
                    <div className="w-full flex justify-between items-center">
                      {/* <span className="tracking-widest text-[18px]">Earring 202</span> */}
                      <div className="w-[60%] h-[10px] rounded bg-gray-300" />
                      <div className="w-[20%] h-[10px] rounded bg-gray-300" />
                    </div>
                    <div className="flex justify-center items-center space-x-2">
                      <span className="w-[20px] h-[20px] cursor-pointer bg-gray-300 rounded-full" />
                      <span className="w-[20px] h-[20px] cursor-pointer bg-gray-300 rounded-full" />
                      <span className="w-[20px] h-[20px] cursor-pointer bg-gray-300 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-3 md:gap-5">
              {productsData?.products.length === 0 ? (
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
                
                  {productsData?.products.map(product => (
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
                            
                              <img onClick={() => handleDislikeProduct(product._id)} src="/icons/active-heart.svg" className="icon w-[24px] h-[24px] cursor-pointer" />
                           
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
      </MaxWidthWrapper>
        </>
    )
}

export default Page;