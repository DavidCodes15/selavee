"use client";
import { trpc } from "@/app/trpc/client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
{/**  | string[] | undefined */ }
import { useState, useEffect } from "react";
interface PageProps {
    searchParams: {
        [key: string]: string
    }
}
import { MinusIcon } from "lucide-react";
import { toast } from "sonner";
import { getAuthUser } from "@/server/get-auth-user";
type User = {
    _id: string;
    email?: string;
    [key: string]: any;
  };
const specificProductPage = ({ searchParams }: PageProps) => {
    const productId = searchParams.id;
    // console.log(productId);
    // console.log(searchParams);
    // let isFakeLoading = true;
    const { data, isLoading } = trpc.product.fetchSpecificProduct.useQuery({ productId })
    const {mutate, isLoading: isBagLoading} = trpc.product.addToBag.useMutation({
        onError: (err) => {
            toast.error("something went wrong");
        },  
        onSuccess: () => {
            toast.success("successfully added the product to the bag");
        } 
    })
    console.log(data?.specificProduct.sizes);
    const defaultSize = data?.specificProduct.sizes[0].size;
    const defaultPrice = data?.specificProduct.sizes[0].price;
    console.log(defaultSize, defaultPrice);
    const [user, setUser] = useState<User | "not authorized" | null>(null);
    const [quantity, setQuantity] = useState(1);
    // const [size, setSize] = useState(data?.specificProduct.sizes[0].size);
    // const [price, setPrice] = useState(data?.specificProduct.sizes[0].price);
    // const [size, setSize] = useState<string | undefined>(undefined);
    // const [price, setPrice] = useState<string | undefined>(undefined);
    const [size, setSize] = useState<string>(defaultSize);
    const [price, setPrice] = useState(defaultPrice);
    const [maxQuantityReached, setMaxQuantityReached] = useState(false);
    // const [totalPrice, setTotalPrice] = useState<number>(parseFloat(defaultPrice || "0"));
    const [isMenuShown, setIsMenuShown] = useState(false);
    const [selectedColor, setSelectedColor] = useState('mainProductImage');

  const handleColorClick = (color: string) => {
    if(selectedColor === color){
        setSelectedColor("mainProductImage");
    } else {
        setSelectedColor(color);
    }
    
  };
    useEffect(() => {
        if (data && data.specificProduct.sizes.length > 0) {
            const defaultSize = data.specificProduct.sizes[0].size;
            const defaultPrice = data.specificProduct.sizes[0].price;
            setSize(defaultSize);
            setPrice(defaultPrice);
            // setTotalPrice(defaultPrice ? parseFloat(defaultPrice) : 0);
        }
    }, [data]);
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
    //     // setTotalPrice(price ? parseFloat(price) * quantity : 0);
    //     setMaxQuantityReached(quantity >= 10);
    // }, [quantity, price]);
    useEffect(() => {
        if (quantity >= 10) {
            setMaxQuantityReached(true);
        } else {
            setMaxQuantityReached(false);
        }
    }, [quantity]);
    const handleSizesClick = ({ size, price }: { size: string, price: string }) => {
        setSize(size);
        setPrice(price);
        setIsMenuShown(!isMenuShown);
    }
    const handleSizeMenu = () => {
        setIsMenuShown(!isMenuShown);
    }
    // const handleQuantity = () => {
    //     setQuantity(quantity + 1);
    // }
    const handleQuantity = (operation: 'increase' | 'decrease') => {
        setQuantity(prevQuantity => {
            let newQuantity = prevQuantity;
            if (operation === 'increase' && newQuantity < 10) {
                newQuantity += 1;
            } else if (operation === 'decrease' && newQuantity > 1) {
                newQuantity -= 1;
            }
            return newQuantity;
        });
    };
    const handleBag = () => {
        if(user && typeof user !== "string"){
            const imageMap: Record<string, string | undefined> = {
                mainProductImage: data?.specificProduct.mainProductImage,
                pinkGold: data?.specificProduct.pinkGold,
                yellowGold: data?.specificProduct.yellowGold,
                silverGold: data?.specificProduct.silverGold,
            };
    
            // Get the correct image based on selectedColor
            const selectedImageUrl = imageMap[selectedColor];
            mutate({productId, userId: user._id, quantity, totalPrice, selectedColor, size, price, productUrl: selectedImageUrl || data?.specificProduct.mainProductImage});
        }
        
    }
    const totalPrice = price ? parseFloat(price) * quantity : 0;
    return (
        <>
            {isLoading ? (
                <>
                    <section id="hero" className="animate-pulse">
                        <MaxWidthWrapper className="mt-44">
                            <div className="flex w-full flex-col justify-center space-y-24">
                                <div className="w-full flex  justify-center items-center">
                                    <div className="w-[100px] h-[10px] rounded bg-gray-300 flex justify-center items-center" />
                                </div>
                                <div className="flex mx-auto lg:mx-0 sm:w-[90%] lg:w-auto sm:space-x-0 sm:space-y-2 lg:space-y-0 lg:space-x-2 sm:flex-col lg:flex-row">
                                    {/* <img src="/products/earrings.png" className="sm:w-full lg:w-1/2" /> */}
                                    <div className="sm:w-full lg:w-1/2 h-[600px] bg-gray-300 rounded" />
                                    <div className="sm:w-full lg:w-1/2 flex flex-col space-y-6">
                                        <div className="w-full flex justify-between items-start">
                                            <div className="flex items-center justify-center space-x-2">
                                                <div className="w-[50px] h-[10px] rounded bg-gray-300" />
                                                <div className="w-[70px] h-[10px] rounded bg-gray-300" />
                                                <div className="w-[90px] h-[10px] rounded bg-gray-300" />

                                            </div>

                                            <div className="w-[50px] h-[10px] rounded bg-gray-300" />
                                        </div>
                                        <div>


                                            <div className="w-[200px] h-[10px] rounded bg-gray-300" />
                                        </div>
                                        <div className="flex flex-col justify-center items-start space-y-2">
                                            <div className="flex justify-start items-center space-x-2">
                                                <div className="flex justify-center space-x-[5px] text-[#E62749] tracking-widest">
                                                    <div className="w-[50px] h-[10px] rounded bg-gray-300" />
                                                    <div className="w-[70px] h-[10px] rounded bg-gray-300" />
                                                    <div className="w-[30px] h-[10px] rounded bg-gray-300" />
                                                </div>

                                            </div>
                                            <div className="flex justify-center space-x-[5px] tracking-widest">
                                                <div className="w-[150px] h-[10px] rounded bg-gray-300" />

                                            </div>
                                        </div>
                                        <div className="flex flex-col justify-center items-start space-y-6">
                                            <div className="flex justify-start items-center space-x-[5px] tracking-widest">
                                                <div className="w-[70px] h-[10px] rounded bg-gray-300" />
                                                <div className="w-[30px] h-[10px] rounded bg-gray-300" />

                                            </div>
                                            <div className="flex justify-center items-center space-x-4">
                                                <div className="w-[66px] h-[51px] rounded bg-gray-300" />
                                                <div className="w-[66px] h-[51px] rounded bg-gray-300" />
                                                <div className="w-[66px] h-[51px] rounded bg-gray-300" />

                                            </div>
                                            <div className="flex justify-center items-center space-x-2">
                                                <span className="w-[20px] h-[20px] cursor-pointer bg-gray-300 rounded-full" />
                                                <span className="w-[20px] h-[20px] cursor-pointer bg-gray-300 rounded-full" />
                                                <span className="w-[20px] h-[20px] cursor-pointer bg-gray-300 rounded-full" />
                                            </div>
                                        </div>
                                        <div className="py-12 flex flex-col justify-center items-start space-y-12">
                                            <div className="flex justify-center items-center space-x-2">
                                                <div className="w-[170px] h-[10px] rounded bg-gray-300" />

                                            </div>
                                            <div className="flex flex-col justify-center items-start space-y-6 w-full">
                                                <div className="icon-wrapper w-full border-b-[1px] border-[#E6E6E6] py-4 px-2 flex justify-between items-center">
                                                    <div className="w-[200px] h-[10px] rounded bg-gray-300" />
                                                    <div className="w-[20px] h-[10px] rounded bg-gray-300" />
                                                </div>
                                                <div className="icon-wrapper w-full border-b-[1px] border-[#E6E6E6] px-2 py-4 flex justify-between items-center">
                                                    <div className="w-[200px] h-[10px] rounded bg-gray-300" />
                                                    <div className="w-[20px] h-[10px] rounded bg-gray-300" />

                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-start items-center space-x-6">
                                            <div className="w-[30%] h-[10px] rounded bg-gray-300" />
                                            <div className="w-[30%] h-[10px] rounded bg-gray-300" />
                                            <div className="w-[30%] h-[10px] rounded bg-gray-300" />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </MaxWidthWrapper>
                    </section>
                    <section className="my-32 animate-pulse">
                        <MaxWidthWrapper>
                            <div className="grid grid-cols-1 sm:gap-y-10 gap-x-0 lg:gap-5 lg:grid-cols-2 tracking-widest">
                                <div className="sm:p-0 lg:p-8">
                                    <h2 className="text-[16px] font-semibold mb-4 ml-4">Product Details</h2>
                                    {/* <div className="mb-4 ml-4 w-[120px] h-[10px] rounded bg-gray-300" /> */}
                                    <table className="w-full border-collapse">
                                        <tbody>
                                            <tr className="text-[14px]">
                                                <td className="p-4 font-semibold border-r">Product</td>
                                                <td className="p-4">
                                                    <div className="w-[90%] h-[10px] rounded bg-gray-300" />
                                                </td>

                                            </tr>
                                            <tr className="border-t text-[14px]">
                                                <td className="p-4 font-semibold border-r">Style Code</td>
                                                <td className="p-4">
                                                    <div className="w-[90%] h-[10px] rounded bg-gray-300" />
                                                </td>
                                            </tr>
                                            <tr className="border-t border-b text-[14px]">
                                                <td className="p-4 font-semibold border-r">Dimensions</td>
                                                <td className="p-4">
                                                    <div className="w-[90%] h-[10px] rounded bg-gray-300" />
                                                </td>
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
                                                <td className="p-4">
                                                    <div className="w-[90%] h-[10px] rounded bg-gray-300" />
                                                </td>
                                            </tr>
                                            <tr className="border-t text-[14px]">
                                                <td className="p-4 font-semibold border-r">Diamond Gross Weight</td>
                                                <td className="p-4">
                                                    <div className="w-[90%] h-[10px] rounded bg-gray-300" />
                                                </td>
                                            </tr>
                                            <tr className="border-t border-b text-[14px]">
                                                <td className="p-4 font-semibold border-r">Diamond pcs</td>
                                                <td className="p-4">
                                                    <div className="w-[90%] h-[10px] rounded bg-gray-300" />
                                                </td>
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
                                                <td className="p-4">
                                                    <div className="w-[90%] h-[10px] rounded bg-gray-300" />
                                                </td>
                                            </tr>
                                            <tr className="border-t text-[14px]">
                                                <td className="p-4 font-semibold border-r">Metal Gross Weight</td>
                                                {/* <td className="p-4 flex justify-start items-center space-x-2">
                                                    <span>2.23 gms</span>
                                                    <img src="/icons/info.svg" className="w-[16px] h-[16px]" />
                                                </td> */}
                                                <td className="p-4">
                                                    <div className="w-[90%] h-[10px] rounded bg-gray-300" />
                                                </td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </MaxWidthWrapper>
                    </section>
                </>
            ) : (
                <>
                    <section id="hero">
                        <MaxWidthWrapper className="mt-44">
                            <div className="flex w-full flex-col justify-center space-y-24">
                                <div className="text-center">
                                    <h1 className="text-[24px] tracking-widest">{data?.specificProduct.productName}</h1>
                                </div>
                                <div className="flex mx-auto lg:mx-0 sm:w-[90%] lg:w-auto sm:space-x-0 sm:space-y-2 lg:space-y-0 lg:space-x-2 sm:flex-col lg:flex-row">
                                    {/* <img src={data?.specificProduct.mainProductImage} className="sm:w-full lg:w-1/2" /> */}
                                    <div className="overflow-x-hidden max-h-[720px] sm:w-full lg:w-1/2">
                                        <img src={selectedColor === 'pinkGold'
                            ? data?.specificProduct.pinkGold
                            : selectedColor === 'yellowGold'
                              ? data?.specificProduct.yellowGold
                              : selectedColor === 'silverGold'
                                ? data?.specificProduct.silverGold
                                : data?.specificProduct.mainProductImage} className="w-full h-full" />
                                        <img src={data?.specificProduct.mainModelImage} className="w-full mt-12" />
                                        {Array.isArray(data?.specificProduct?.secondaryImages) && data?.specificProduct.secondaryImages.map((image, index) => (
                                            <img src={image} key={index} className="w-full mt-12" />
                                        ))}
                                    </div>
                                    <div className="sm:w-full lg:w-1/2 flex flex-col space-y-6">
                                        <div className="w-full flex justify-between items-start">
                                            <span className="sm:text-[14px] msm:text-[16px] md:text-[20px] font-semibold">
                                                {/* {price}$ */}
                                                {totalPrice}$
                                            </span>
                                            <span className="icon-wrapper">
                                                <img
                                                    src="/icons/heart.svg"
                                                    className="icon sm:h-[20px] sm:w-[20px] msm:h-[24px] msm:w-[24px] cursor-pointer"
                                                    style={{ filter: "invert(1)" }}
                                                />
                                            </span>
                                        </div>
                                        <div>
                                            <h2 className="tracking-widest text-[18px] msm:text-[20px]">{data?.specificProduct.productName}</h2>
                                        </div>
                                        <div className="relative flex flex-col justify-center items-start space-y-2">
                                            <div className="flex justify-start items-center space-x-2">
                                                <div className="flex justify-center space-x-[5px] tracking-widest">
                                                    <span className="text-[14px]">Size:</span>
                                                    <span className="flex justify-center items-center space-x-[3px]"><span className="text-[14px]">{size}</span><span><img onClick={handleSizeMenu} src="/icons/product-size-arrow.svg" className="w-[15px] h-[7px] cursor-pointer" /></span></span>
                                                </div>
                                                {/* <div className="bg-[#E62749] text-[#E62749] bg-opacity-5 px-4 py-2">
                                                    <span className="sm:text-[10px] msm:text-[13px] lsm:text-[13px] tracking-widest">Please select size</span>
                                                </div> */}
                                            </div>
                                            {/* <div className="flex justify-center space-x-[5px] tracking-widest">
                                                <span className="text-[13px]">For your assistance:</span>
                                                <span className="flex justify-center items-center space-x-[3px]"><span className="underline underline-offset-4 text-[13px]">Size guide</span><span><img src="/icons/size-guide-arrow.svg" className="w-[15px] h-[7px] cursor-pointer" /></span></span>
                                            </div> */}
                                            <div className={`absolute top-[100%] max-h-[164px] overflow-x-hidden left-[10%] bg-black w-[150px] p-2 flex flex-col justify-center items-start space-y-2 ${isMenuShown ? 'block' : 'hidden'}`}>
                                                {Array.isArray(data?.specificProduct.sizes) && data?.specificProduct.sizes.map((sizeObj, index) => (
                                                    <div key={index} className="flex justify-between items-center cursor-pointer text-[16px] tracking-widest text-white" onClick={() => handleSizesClick({ size: sizeObj.size, price: sizeObj.price })}>
                                                        <span>{sizeObj.size}</span>
                                                        <span>{sizeObj.label}</span>
                                                        {/* <span>{sizeObj.label}</span> */}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex flex-col justify-center items-start space-y-6">
                                            <div className="flex justify-start items-center space-x-4">

                                                <div className="flex justify-start items-center space-x-[5px] tracking-widest">
                                                    <span className="text-[14px]">Quantity:</span>
                                                    <span className="bg-[#F7F7F7] text-black px-4 py-2 cursor-pointer">{quantity}</span>

                                                </div>
                                                <div className="flex justify-center items-center space-x-2">
                                                    <MinusIcon onClick={() => handleQuantity('decrease')} className="cursor-pointer" />
                                                    <img onClick={() => handleQuantity('increase')} src="/icons/accordion.svg" className="icon cursor-pointer w-[20px] h-[20px]" />
                                                </div>
                                            </div>
                                            {maxQuantityReached && (
                                                <div className="text-red-500 text-sm">Maximum quantity of 10 reached</div>
                                            )}
                                            <div className="flex justify-center items-center space-x-2">
                                                <span onClick={() => handleColorClick('pinkGold')} className={`w-[20px] h-[20px] cursor-pointer pink-gradient rounded-full ${selectedColor === "pinkGold" ? 'border-[1px] border-solid border-black' : ''}`} />
                                                <span onClick={() => handleColorClick('yellowGold')} className={`w-[20px] h-[20px] cursor-pointer gold-gradient rounded-full ${selectedColor === "yellowGold" ? 'border-[1px] border-solid border-black' : ''}`} />
                                                <span onClick={() => handleColorClick('silverGold')} className={`w-[20px] h-[20px] cursor-pointer silver-gradient rounded-full ${selectedColor === "silverGold" ? 'border-[1px] border-solid border-black' : ''}`} />
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
                                            <button onClick={handleBag} className="icon-wrapper flex justify-center items-center space-x-2 px-4 py-2 text-white bg-black">
                                                <span className="text-[12px] msm:text-[16px]">
                                                    {isBagLoading ? (
                                                        <>
                                                        ADDING...
                                                        </>
                                                    ): (
                                                        <>
                                                         ADD TO BAG
                                                        </>
                                                    )}
                                                    </span>
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
                                                <td className="p-4">{data?.specificProduct.productDetail}</td>
                                            </tr>
                                            <tr className="border-t text-[14px]">
                                                <td className="p-4 font-semibold border-r">Style Code</td>
                                                <td className="p-4">{data?.specificProduct.productStyleCode}</td>
                                            </tr>
                                            <tr className="border-t border-b text-[14px]">
                                                <td className="p-4 font-semibold border-r">Dimensions</td>
                                                <td className="p-4">{data?.specificProduct.productDimensions}</td>
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
                                                <td className="p-4">{data?.specificProduct.productDiamondPurity}</td>
                                            </tr>
                                            <tr className="border-t text-[14px]">
                                                <td className="p-4 font-semibold border-r">Diamond Gross Weight</td>
                                                <td className="p-4 flex justify-start items-center space-x-2">
                                                    <span>{data?.specificProduct.productDiamondGrossWeight}</span>
                                                    <img src="/icons/info.svg" className="w-[16px] h-[16px]" />
                                                </td>
                                            </tr>
                                            <tr className="border-t border-b text-[14px]">
                                                <td className="p-4 font-semibold border-r">Diamond pcs</td>
                                                <td className="p-4">{data?.specificProduct.productDiamondPcs}</td>
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
                                                <td className="p-4">{data?.specificProduct.productMetalPurity}</td>
                                            </tr>
                                            <tr className="border-t text-[14px]">
                                                <td className="p-4 font-semibold border-r">Metal Gross Weight</td>
                                                <td className="p-4 flex justify-start items-center space-x-2">
                                                    <span>{data?.specificProduct.productMetalGrossWeight}</span>
                                                    <img src="/icons/info.svg" className="w-[16px] h-[16px]" />
                                                </td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </MaxWidthWrapper>
                    </section>
                </>
            )}
        </>
    )
}

export default specificProductPage