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
import Modal from "@/components/Modal";
import Shipping from "@/components/pop-ups/Shipping";
import Refund from "@/components/pop-ups/Refund";
import JewelryCare from "@/components/pop-ups/JewelryCare";
import { MinusIcon } from "lucide-react";
import { toast } from "sonner";
import { getAuthUser } from "@/server/get-auth-user";
import { useLikedChange, useStateChange } from "@/hooks/use-state";
import { ProductFileValidator } from "@/lib/validators/ProductFileValidator";
import { Product } from "@/project-types";
import RelatedProductSlider from "@/components/RelatedProductSlider";
import Customize from "@/components/pop-ups/Customize";
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

const specificProductPage = ({ searchParams }: PageProps) => {
    const [accordion, setAccordion] = useState<string | null>(null);

    const toggleAccordion = (section: string) => {
        setAccordion(accordion === section ? null : section);
    };
    const { items: bagItems, addItem: addBagItem, removeItem: removeBagItem } = useStateChange();
    const { items: likedItems, addItem: addLikedItem, removeItem: removeLikedItem } = useLikedChange();
    const productId = searchParams.id;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState("");
    const handleShipping = () => {
        setIsModalOpen(!isModalOpen);
        setModalType("shipping");
    };
    const handleCustomize = () => {
        setIsModalOpen(!isModalOpen);
        setModalType("customize");
    }
    const handleJewelryCare = () => {
        setIsModalOpen(!isModalOpen);
        setModalType("jewelry-care");
    };
    const handleRefund = () => {
        setIsModalOpen(!isModalOpen);
        setModalType("refund");
    }
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    const isInBag = bagItems.some(item => item.product._id === productId);
    const isInLiked = likedItems.some(item => item.product._id === productId);
    const { data, isLoading } = trpc.product.fetchSpecificProduct.useQuery({ productId })
    const spec = [data?.specificProduct];
    const product = spec[0];
    console.log("product", product);
    const { mutate, isLoading: isBagLoading } = trpc.product.addToBag.useMutation({
        onError: (err) => {
            toast.error("something went wrong",);
            console.log(err);
        },
        onSuccess: () => {
            toast.success("successfully added the product to the bag");
        }
    })
    const { mutate: likedMutate, isLoading: isLikedLoading } = trpc.product.addLikedProduct.useMutation({
        onError: (err) => {
            toast.error("something went wrong",);
            console.log(err);
        },
        onSuccess: () => {
            toast.success("successfully liked the product");
        }
    })
    console.log(data?.specificProduct.sizes);
    let defaultPrice;
    let defaultSize;

    if (data?.specificProduct.sizes[0].price === 0) {
        defaultPrice = data?.specificProduct.onlyPrice;
        defaultSize = null;
    } else {
        defaultPrice = data?.specificProduct.sizes[0].price;
        defaultSize = data?.specificProduct.sizes[0].size;
    }
    console.log(defaultSize, defaultPrice);
    const [user, setUser] = useState<User | "not authorized" | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState<number>(defaultSize);
    const [price, setPrice] = useState<number>(defaultPrice);
    const [isMenuShown, setIsMenuShown] = useState(false);
    const [selectedColor, setSelectedColor] = useState('mainProductImage');

    const handleColorClick = (color: string) => {
        if (selectedColor === color) {
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

    // useEffect(() => {
    //     if (quantity >= 10) {
    //         setMaxQuantityReached(true);
    //     } else {
    //         setMaxQuantityReached(false);
    //     }
    // }, [quantity]);
    const handleSizesClick = ({ size, price }: { size: number, price: number }) => {
        setSize(size);
        // setDefaultPrice(price);
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
            if (operation === 'increase' && newQuantity) {
                newQuantity += 1;
            } else if (operation === 'decrease' && newQuantity > 1) {
                newQuantity -= 1;
            }
            return newQuantity;
        });
    };
    // const totalPrice = price ? price * quantity : 0;
    const handleDisLike = () => {
        if (user && typeof user !== "string") {
            if (!product) {
                toast.error("Product data is not available");
                return;
            }
            const imageMap: Record<string, string | undefined> = {

                mainProductImage: data?.specificProduct.mainProductImage,
                pinkGold: data?.specificProduct.pinkGold,
                yellowGold: data?.specificProduct.yellowGold,
                silverGold: data?.specificProduct.silverGold,
            };

            // // Get the correct image based on selectedColor
            // const selectedImageUrl = imageMap[selectedColor];
            const selectedImageUrl = imageMap[selectedColor] || data?.specificProduct.mainProductImage;
            const likedProduct: CartProduct = {
                ...(product as Product),
                selectedImageUrl: selectedImageUrl || "",
                selectedColor,
                totalPrice: data?.specificProduct.sizes[0].price,
                quantity,
            };
            removeLikedItem(productId);
            // setLiked(false);

        }
    }
    const handleLike = () => {

        if (user && typeof user !== "string") {
            if (!product) {
                toast.error("Product data is not available");
                return;
            }
            const imageMap: Record<string, string | undefined> = {

                mainProductImage: data?.specificProduct.mainProductImage,
                pinkGold: data?.specificProduct.pinkGold,
                yellowGold: data?.specificProduct.yellowGold,
                silverGold: data?.specificProduct.silverGold,
            };

            // // Get the correct image based on selectedColor
            // const selectedImageUrl = imageMap[selectedColor];
            const selectedImageUrl = imageMap[selectedColor] || data?.specificProduct.mainProductImage;
            const likedProduct: CartProduct = {
                ...(product as Product),
                selectedImageUrl: selectedImageUrl || "",
                selectedColor,
                totalPrice: data?.specificProduct.sizes[0].price,
                quantity,
            };
            addLikedItem(likedProduct);
            // setLiked(true);

        }
    }
    // const [liked, setLiked] = useState<boolean>(false);
    const handleBag = () => {
        if (user && typeof user !== "string") {
            if (!product) {
                toast.error("Product data is not available");
                return;
            }
            const imageMap: Record<string, string | undefined> = {

                mainProductImage: data?.specificProduct.mainProductImage,
                pinkGold: data?.specificProduct.pinkGold,
                yellowGold: data?.specificProduct.yellowGold,
                silverGold: data?.specificProduct.silverGold,
            };

            // // Get the correct image based on selectedColor
            // const selectedImageUrl = imageMap[selectedColor];
            const selectedImageUrl = imageMap[selectedColor] || data?.specificProduct.mainProductImage;
            console.log(price);
            // let totalPrice;
            console.log(defaultPrice, "defauuult");
            console.log(data?.specificProduct.onlyPrice);

            const cartProduct: CartProduct = {
                ...(product as Product),
                selectedImageUrl: selectedImageUrl || "",
                selectedColor,
                totalPrice: data?.specificProduct.sizes[0].price,
                quantity,
            };
            addBagItem(cartProduct);
            // setLiked(true);
            // mutate({ productId, userId: user._id, quantity, totalPrice: price, selectedColor, size, price, productUrl: selectedImageUrl || data?.specificProduct.mainProductImage });
        }

    }
    const handleRemoveBag = () => {
        removeBagItem(productId);
    }

    const handleAccordion = (select: string) => {
        console.log(accordion);
        if (accordion === select) {
            setAccordion("");
        }
        setAccordion(select);
        console.log(select);
        console.log(accordion);

    }
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
                                    {/* <h1 className="text-[24px] tracking-widest">{data?.specificProduct.productName}</h1> */}
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
                                                {data?.specificProduct.productName}
                                            </span>
                                            <span className="icon-wrapper">
                                                {isInLiked ? (
                                                    <img
                                                        src="/icons/active-heart.svg"
                                                        className="icon sm:h-[20px] sm:w-[20px] msm:h-[24px] msm:w-[24px] cursor-pointer"
                                                        // style={{ filter: "invert(1)" }}
                                                        onClick={handleDisLike}
                                                    />
                                                ) : (
                                                    <img
                                                        src="/icons/heart.svg"
                                                        className="icon sm:h-[20px] sm:w-[20px] msm:h-[24px] msm:w-[24px] cursor-pointer"
                                                        style={{ filter: "invert(1)" }}
                                                        onClick={handleLike}
                                                    />
                                                )}


                                            </span>
                                        </div>
                                        <div>
                                            <h2 className="tracking-widest text-[18px] msm:text-[20px]">
                                                {defaultPrice}$
                                            </h2>
                                        </div>
                                        {data?.specificProduct.onlyPrice == null && (
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
                                                <div className={`absolute top-[100%] max-h-[164px] overflow-x-hidden left-[10%] bg-black w-[200px] p-2 flex flex-col justify-center items-start space-y-2 ${isMenuShown ? 'block' : 'hidden'}`}>
                                                    {Array.isArray(data?.specificProduct.sizes) && data?.specificProduct.sizes.map((sizeObj, index) => (
                                                        <div key={index} className="w-full flex justify-between items-center cursor-pointer tracking-widest text-white" onClick={() => handleSizesClick({ size: sizeObj.size, price: sizeObj.price })}>
                                                            <span className="text-[16px]">{sizeObj.size}</span>
                                                            <span className="text-[14px]">{sizeObj.label}</span>

                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

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

                                            <div className="flex justify-center items-center space-x-2">
                                                <span onClick={() => handleColorClick('pinkGold')} className={`w-[20px] h-[20px] cursor-pointer pink-gradient rounded-full ${selectedColor === "pinkGold" ? 'border-[1px] border-solid border-black' : ''}`} />
                                                <span onClick={() => handleColorClick('yellowGold')} className={`w-[20px] h-[20px] cursor-pointer gold-gradient rounded-full ${selectedColor === "yellowGold" ? 'border-[1px] border-solid border-black' : ''}`} />
                                                <span onClick={() => handleColorClick('silverGold')} className={`w-[20px] h-[20px] cursor-pointer silver-gradient rounded-full ${selectedColor === "silverGold" ? 'border-[1px] border-solid border-black' : ''}`} />
                                            </div>
                                        </div>
                                        <div className="py-12 flex flex-col justify-center items-start space-y-12">

                                            <div className="flex flex-col justify-center items-start space-y-6 w-full">
                                                <div className="icon-wrapper w-full border-b-[1px] border-[#E6E6E6] py-4 px-2 flex flex-col justify-center items-start space-y-4">
                                                    <div className="w-full flex justify-between items-center">
                                                        <span className="text-[12px] msm:text-[14px] tracking-widest">Shipping information</span>
                                                        <img onClick={handleShipping} src="/icons/accordion.svg" className="icon cursor-pointer w-[14px] h-[14px]" />
                                                    </div>
                                                    {accordion === "shipping" && (
                                                        <div className="w-full flex justify-start items-center">
                                                            <p className="w-[95%] tracking-widest text-[14px]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure similique doloremque dolorem, ipsa labore repellat eos ab assumenda. Ipsum natus architecto vero quia similique labore hic minus, inventore illo harum!</p>
                                                        </div>
                                                    )}


                                                </div>
                                                <div className="icon-wrapper w-full border-b-[1px] border-[#E6E6E6] py-4 px-2 flex flex-col justify-center items-start space-y-4">
                                                    <div className="w-full flex justify-between items-center">
                                                        <span className="text-[12px] msm:text-[14px] tracking-widest">Refund & Exchange</span>
                                                        {/* <img onClick={() => toggleAccordion("refund")} src="/icons/accordion.svg" className="icon cursor-pointer w-[14px] h-[14px]" /> */}
                                                        <img onClick={handleRefund} src="/icons/accordion.svg" className="icon cursor-pointer w-[14px] h-[14px]" />
                                                    </div>
                                                    {accordion === "refund" && (
                                                        <div className="w-full flex justify-start items-center">
                                                            <p className="w-[95%] tracking-widest text-[14px]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure similique doloremque dolorem, ipsa labore repellat eos ab assumenda. Ipsum natus architecto vero quia similique labore hic minus, inventore illo harum!</p>
                                                        </div>
                                                    )}


                                                </div>
                                                <div className="icon-wrapper w-full border-b-[1px] border-[#E6E6E6] py-4 px-2 flex flex-col justify-center items-start space-y-4">
                                                    <div className="w-full flex justify-between items-center">
                                                        <span className="text-[12px] msm:text-[14px] tracking-widest">Care instructions</span>
                                                        <img onClick={handleJewelryCare} src="/icons/accordion.svg" className="icon cursor-pointer w-[14px] h-[14px]" />
                                                    </div>
                                                    {accordion === "care" && (
                                                        <div className="w-full flex justify-start items-center">
                                                            <p className="w-[95%] tracking-widest text-[14px]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure similique doloremque dolorem, ipsa labore repellat eos ab assumenda. Ipsum natus architecto vero quia similique labore hic minus, inventore illo harum!</p>
                                                        </div>
                                                    )}


                                                </div>

                                            </div>
                                        </div>
                                        <div className="flex flex-col justify-center items-start space-y-4">


                                            <div className="flex justify-start items-center space-x-4">
                                                {isInBag ? (
                                                    <button onClick={handleRemoveBag} className="icon-wrapper flex justify-center items-center space-x-2 px-4 py-2 text-white bg-black">
                                                        <span className="text-[12px] msm:text-[16px]">
                                                            REMOVE FROM THE BAG
                                                        </span>
                                                        <img src="/icons/white-x.svg" className="icon w-[24px] h-[24px]" />
                                                    </button>
                                                ) : (
                                                    <button onClick={handleBag} className="icon-wrapper flex justify-center items-center space-x-2 px-4 py-2 text-white bg-black">
                                                        <span className="text-[12px] msm:text-[16px]">
                                                            {isBagLoading ? (
                                                                <>
                                                                    ADDING...
                                                                </>
                                                            ) : (
                                                                <>
                                                                    ADD TO BAG
                                                                </>
                                                            )}
                                                        </span>
                                                        <img src="/icons/plus.svg" className="icon w-[14px] h-[14px]" />
                                                    </button>
                                                )}


                                                <button className="icon-wrapper flex justify-center items-center space-x-2 px-4 py-[7px] border-[1px] border-black border-solid bg-transparent text-black">
                                                    <span className="text-[12px] msm:text-[16px]">TRY ON</span>
                                                    <img src="/icons/product-try-on.svg" className="icon w-[14px] h-[14px]" />
                                                </button>
                                                <button onClick={handleCustomize} className="icon-wrapper flex justify-center items-center space-x-2 px-4 py-[7px] border-[1px] border-black border-solid bg-transparent text-black ">
                                                    <span className="text-[12px] msm:text-[16px]">COSTUMIZE</span>
                                                    <img src="/icons/customize.svg" className="icon w-[14px] h-[14px]" />
                                                </button>
                                            </div>
                                            <div className="w-full">
                                                <button className="w-full icon-wrapper flex justify-center items-center space-x-2 px-4 py-[7px] border-[1px] border-black border-solid bg-transparent text-black">
                                                    <span className="text-[12px] msm:text-[16px]">NOTIFY ME</span>
                                                    <img src="/icons/notify.svg" className="icon w-[14px] h-[14px]" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </MaxWidthWrapper>
                    </section>
                    <section className="my-32">
                        <h2 className="w-full flex justify-center items-center tracking-widest text-[18px] font-semibold">Description</h2>
                        <MaxWidthWrapper className="mt-12">
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
                                {data?.specificProduct.productDiamondPurity == "" ? (
                                    null
                                ) : (
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
                                )}

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
                    <RelatedProductSlider productId={productId} otherCreations={data?.specificProduct.otherCreations} completeSet={data?.specificProduct.completeSet} />
                    {/* <section className="mt-24">
                        <MaxWidthWrapper className="border-black border-solid border-[1px] px-12 py-56 mb-56">
                            <div className="flex justify-center items-center">
                                <span className="text-[17px] tracking-widest">No Related Products yet!</span>
                            </div>
                        </MaxWidthWrapper>
                    </section> */}
                </>
            )}
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                {modalType === "jewelry-care" && (
                    <>
                        <div className="flex w-full items-center justify-end">
                            <img
                                onClick={handleCloseModal}
                                src="/icons/close.svg"
                                className="h-[24px] w-[24px] cursor-pointer"
                            />
                        </div>
                        <JewelryCare />

                    </>
                )}
                {modalType === "shipping" && (
                    <>
                        <div className="flex w-full items-center justify-end">
                            <img
                                onClick={handleCloseModal}
                                src="/icons/close.svg"
                                className="h-[24px] w-[24px] cursor-pointer"
                            />
                        </div>
                        <Shipping />
                    </>
                )}
                {modalType === "refund" && (
                    <>
                        <div className="flex w-full items-center justify-end">
                            <img
                                onClick={handleCloseModal}
                                src="/icons/close.svg"
                                className="h-[24px] w-[24px] cursor-pointer"
                            />
                        </div>
                        <Refund />
                    </>
                )}
                {modalType === "customize" && (
                    <>
                        <div className="flex w-full items-center justify-end">
                            <img
                                onClick={handleCloseModal}
                                src="/icons/close.svg"
                                className="h-[24px] w-[24px] cursor-pointer"
                            />
                        </div>
                        <Customize />
                    </>
                )}



            </Modal>
        </>
    )
}

export default specificProductPage