"use client"
import { upload } from "@vercel/blob/client";
import { trpc } from "@/app/trpc/client";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";
interface SizePriceLabel {
    size: number;
    price: number;
    label: string;
}
const ProductUpload = () => {
    const handleNumericInputChange = (
        setState: React.Dispatch<React.SetStateAction<number>>,
    ) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(event.target.value) || 0; // Parse the input value to a number
        setState(value);
    };
    const [imageURLs, setImageURLs] = useState<string[]>([]);
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [productCategory, setProductCategory] = useState("");
    const [productName, setProductName] = useState("");
    const [completeSet, setCompleteSet] = useState("");
    const [otherCreations, setOtherCreations] = useState("");
    const [insuredValue, setInsuredValue] = useState(0);
    const [productDetail, setProductDetail] = useState("");
    const [productStyleCode, setProductStyleCode] = useState("");
    const [productDimensions, setProductDimensions] = useState("");
    const [productDiamondPurity, setProductDiamondPurity] = useState("");
    const [productDiamondGrossWeight, setProductDiamondGrossWeight] = useState("");
    const [productDiamondPcs, setProductDiamondPcs] = useState("");
    const [productMetalGrossWeight, setProductMetalGrossWeight] = useState("");
    const [productMetalPurity, setProductMetalPurity] = useState("");
    const [productStoneShape, setProductStoneShape] = useState("");
    const [productStoneType, setProductStoneType] = useState("");
    const [showDropdown, setShowDropdown] = useState(true);
    const [loading, setLoading] = useState(false);
    const [disabledPrice, setDisabledPrice] = useState(false);
    const [onlyPrice, setOnlyPrice] = useState("");
    const [sizes, setSizes] = useState<SizePriceLabel[]>(
        [],
    );
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            setImageFiles(Array.from(files)); // Store the files in state
        }
    };
    const { mutate, isLoading } = trpc.product.createProduct.useMutation({
        onError: (err) => {
            toast.error("something went wrong.");
        },
        onSuccess: () => {
            toast.success("upload was successfull.");
            setImageURLs([]);
            setImageFiles([]);
            setProductCategory("");
            setProductName("");
            setCompleteSet("");
            setOtherCreations("");
            setProductDetail("");
            setProductStyleCode("");
            setProductDimensions("");
            setProductDiamondPurity("");
            setProductDiamondGrossWeight("");
            setProductDiamondPcs("");
            setProductMetalGrossWeight("");
            setProductMetalPurity("");
            setProductStoneShape("");
            setProductStoneType("");
            setOnlyPrice("");
            setSizes([]);
            setInsuredValue(0);
            setShowDropdown(true);
            setLoading(false);

        },

    })
    const handleInputChange = (
        setState: React.Dispatch<React.SetStateAction<string>>,
    ) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setState(event.target.value);
    };
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        if (imageFiles.length > 0) {
            // const urls: string[] = [];
            const mainImages: { [key: string]: string } = {};
            // const secondaryImages: { [key: string]: string } = {};
            const secondaryImages: string[] = [];

            const mainImageNames = [
                "main-product-image",
                "main-model-image",
                "pink-gold",
                "yellow-gold",
                "silver-gold",
            ];

            // Upload the files when submitting
            for (let i = 0; i < imageFiles.length; i++) {
                const file = imageFiles[i];
                const fileName = file.name.toLowerCase().replace(/\s+/g, "-").replace(/\.[^.]+$/, "");
                const response = await upload(file.name, file, {
                    access: "public",
                    handleUploadUrl: "/api/upload",
                });
                console.log(fileName);
                console.log(response.url);


                if (response.url) {
                    if (mainImageNames.includes(fileName)) {
                        console.log(mainImages);
                        mainImages[fileName] = response.url;
                    } else {
                        secondaryImages.push(response.url);
                    }
                }
                console.log(mainImages);
            }
            const payload = {
                productCategory,
                productName,
                completeSet,
                otherCreations,
                productDetail,
                productStyleCode,
                productDimensions,
                productDiamondPurity,
                productDiamondGrossWeight,
                productDiamondPcs,
                productMetalPurity,
                productMetalGrossWeight,
                productStoneShape,
                productStoneType,
                insuredValue,
                mainProductImage: mainImages["main-product-image"],
                mainModelImage: mainImages["main-model-image"],
                pinkGold: mainImages["pink-gold"],
                yellowGold: mainImages["yellow-gold"],
                silverGold: mainImages["silver-gold"],
                sizes: sizes,
                onlyPrice: Number(onlyPrice),
                bought: 3,
                sort: 'new-in',

                secondaryImages, // Spread the secondary images into the payload
            };

            console.log("Payload to send to the API:", payload);
            console.log("Main Images URLs:", mainImages);
            console.log("Secondary Images URLs:", secondaryImages);
            mutate(payload);
            // setImageURLs(urls); // Set the uploaded URLs
            // console.log("Uploaded image URLs:", urls);

        }

        console.log("Submitted sizes and prices:", sizes);
    };
    const handleSizePriceChange = (
        index: number,
        field: keyof SizePriceLabel,
        value: string,
    ) => {
        const newSizes = [...sizes];
        // newSizes[index] = { ...newSizes[index], [field]: value };
        newSizes[index] = { ...newSizes[index], [field]: field === 'size' || field === 'price' ? Number(value) : value };
        setSizes(newSizes);
    };

    const addSizePriceInput = () => {
        setSizes([...sizes, { size: 0, price: 0, label: "" }]);
    };

    const handleSizesSubmit = () => {
        console.log("Submitted sizes and prices:", sizes);
        setShowDropdown(false);
    };
    return (
        <>
            <div className="rounded-xl bg-[#21222D] p-6 flex flex-col space-y-6 h-full text-white">
                <div className="text-white font-semibold">
                    <span className="text-[22px]">Product Upload</span>
                </div>
                <form onSubmit={handleSubmit} className="form-input w-full flex justify-center items-start space-x-6">


                    <div className="w-1/2 p-6 flex flex-col justify-center items-start space-y-6">
                        <div className="bg-[#171821] rounded-xl flex h-full w-full flex-col items-center justify-center space-y-6 p-6">
                            <label
                                htmlFor="imageUpload"
                                className="flex items-center justify-center"
                            >
                                Upload your product image here
                            </label>
                            <input
                                type="file"
                                id="mainImage"
                                name="mainImage"
                                className="flex cursor-pointer items-center justify-center pl-28"
                                multiple
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </div>
                        <div className="w-full bg-[#171821] rounded-xl sm:p-0 lg:p-8">
                            <h2 className="mb-4 ml-4 text-[16px] font-semibold">
                                Product Details
                            </h2>
                            <table className="w-full border-collapse">
                                <tbody>
                                    <tr className="text-[14px]">
                                        <td className="border-r p-4 font-semibold">Product</td>
                                        <td className="p-4">
                                            <input required type="text" placeholder="Product" value={productDetail} onChange={handleInputChange(setProductDetail)} className="p-2 text-black" />
                                        </td>
                                    </tr>
                                    <tr className="border-t text-[14px]">
                                        <td className="border-r p-4 font-semibold">Style Code</td>
                                        <td className="p-4">
                                            <input required type="text" placeholder="832003" value={productStyleCode} onChange={handleInputChange(setProductStyleCode)} className="p-2 text-black" />
                                        </td>
                                    </tr>
                                    <tr className="border-b border-t text-[14px]">
                                        <td className="border-r p-4 font-semibold">Dimensions</td>
                                        <td className="p-4">
                                            <input required type="text" placeholder="-" value={productDimensions} onChange={handleInputChange(setProductDimensions)} className="p-2 text-black" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="w-full bg-[#171821] rounded-xl sm:p-0 lg:p-8">
                            <h2 className="mb-4 ml-4 text-[16px] font-semibold">Diamond</h2>
                            <table className="w-full border-collapse">
                                <tbody>
                                    <tr className="text-[14px]">
                                        <td className="border-r p-4 font-semibold">
                                            Diamond Purity
                                        </td>
                                        <td className="p-4">
                                            <input type="text" value={productDiamondPurity} onChange={handleInputChange(setProductDiamondPurity)} placeholder="Si HI" className="p-2 text-black" />
                                        </td>
                                    </tr>
                                    <tr className="border-t text-[14px]">
                                        <td className="border-r p-4 font-semibold">
                                            Diamond Gross Weight
                                        </td>
                                        <td className="flex items-center justify-start space-x-2 p-4">
                                            <span>
                                                <input type="text" value={productDiamondGrossWeight} onChange={handleInputChange(setProductDiamondGrossWeight)} placeholder="0,64 ct" className="p-2 text-black" />
                                            </span>
                                            <img
                                                src="/icons/info.svg"
                                                className="h-[16px] w-[16px]"
                                            />
                                        </td>
                                    </tr>
                                    <tr className="border-b border-t text-[14px]">
                                        <td className="border-r p-4 font-semibold">Diamond pcs</td>
                                        <td className="p-4">
                                            <input type="text" value={productDiamondPcs} onChange={handleInputChange(setProductDiamondPcs)} placeholder="12" className="p-2 text-black" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="w-full bg-[#171821] rounded-xl sm:p-0 lg:p-8">
                            <h2 className="mb-4 ml-4 text-[16px] font-semibold">Metal</h2>
                            <table className="w-full border-collapse">
                                <tbody>
                                    <tr className="text-[14px]">
                                        <td className="border-r p-4 font-semibold">Metal Purity</td>
                                        <td className="p-4">
                                            <input required type="text" value={productMetalPurity} onChange={handleInputChange(setProductMetalPurity)} placeholder="18 KT" className="p-2 text-black" />
                                        </td>
                                    </tr>
                                    <tr className="border-t text-[14px]">
                                        <td className="border-r p-4 font-semibold">
                                            Metal Gross Weight
                                        </td>
                                        <td className="flex items-center justify-start space-x-2 p-4">
                                            <span>
                                                <input required type="text" value={productMetalGrossWeight} onChange={handleInputChange(setProductMetalGrossWeight)} placeholder="2.23 gms" className="p-2 text-black" />
                                            </span>
                                            <img
                                                src="/icons/info.svg"
                                                className="h-[16px] w-[16px]"
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="w-1/2 p-6 flex flex-col justify-center items-start space-y-6">
                        <div className="w-full bg-[#171821] rounded-xl flex flex-col space-y-6 items-start justify-center pl-20 text-[20px]">
                            <span className="flex justify-start items-center space-x-4">
                                <label className="font-semibold">Product Category</label>
                                <input type="text" placeholder="Earrings" value={productCategory} onChange={handleInputChange(setProductCategory)} className="border-b-[1px] outline-none p-2 border-solid border-white bg-transparent" />
                            </span>
                            <span className="flex justify-start items-center space-x-4">
                                <label>Product Name</label>
                                <input type="text" placeholder="Earrings 202" value={productName} onChange={handleInputChange(setProductName)} className="border-b-[1px] outline-none p-2 border-solid border-white bg-transparent" />
                            </span>
                            <span className="flex justify-start items-center space-x-4">
                                <label>Complete set</label>
                                <input type="text" placeholder="complete set tag" value={completeSet} onChange={handleInputChange(setCompleteSet)} className="border-b-[1px] outline-none p-2 border-solid border-white bg-transparent" />
                            </span>
                            <span className="flex justify-start items-center space-x-4">
                                <label>other creations</label>
                                <input type="text" placeholder="tag for other creations" value={otherCreations} onChange={handleInputChange(setOtherCreations)} className="border-b-[1px] outline-none p-2 border-solid border-white bg-transparent" />
                            </span>
                            <span className="flex justify-start items-center space-x-4">
                                <label>insured value</label>
                                <input type="text" placeholder="tag for other creations" value={insuredValue} onChange={handleNumericInputChange(setInsuredValue)} className="border-b-[1px] outline-none p-2 border-solid border-white bg-transparent" />
                            </span>



                            <span className="cursor-pointer flex justify-start items-center space-x-4">
                                Sizes
                            </span>

                            <div className="mt-2 rounded border border-gray-300 bg-white p-4 shadow-lg">
                                {sizes.map((item, index) => (

                                    <span key={index} className="w-full flex justify-center items-center space-x-2">
                                        <input
                                            type="text"
                                            // key={index}
                                            // value={item.size}
                                            onChange={(e) =>
                                                handleSizePriceChange(index, "size", e.target.value)
                                            }
                                            className="w-1/3 rounded border border-gray-300 p-2 text-black placeholder:text-black"
                                            placeholder={`Size ${index + 1}`}
                                        />
                                        <input
                                            type="text"
                                            // key={index}
                                            // value={item.price}
                                            onChange={(e) =>
                                                handleSizePriceChange(index, "price", e.target.value)
                                            }
                                            className="w-1/3 rounded border border-gray-300 p-2 text-black placeholder:text-black"
                                            placeholder={`Price ${index + 1}`}
                                        />
                                        <input
                                            type="text"
                                            value={item.label}
                                            onChange={(e) =>
                                                handleSizePriceChange(index, "label", e.target.value)
                                            }
                                            className="w-1/3 rounded border border-gray-300 p-2"
                                            placeholder={`Label ${index + 1}`}
                                        />
                                    </span>
                                ))}
                                <button
                                    type="button"
                                    onClick={addSizePriceInput}
                                    className="mt-2 w-full rounded bg-blue-500 p-2 text-white"
                                >
                                    Add Size
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSizesSubmit}
                                    className="mt-2 w-full rounded bg-green-500 p-2 text-white"
                                >
                                    Submit
                                </button>
                            </div>

                        </div>
                        <div className="w-full bg-[#171821] rounded-xl sm:p-0 lg:p-8">
                            <h2 className="mb-4 ml-4 text-[16px] font-semibold">Stone</h2>
                            <table className="w-full border-collapse">
                                <tbody>
                                    <tr className="text-[14px]">
                                        <td className="border-r p-4 font-semibold">Stone type</td>
                                        <td className="p-4">
                                            <input type="text" value={productStoneType} onChange={handleInputChange(setProductStoneType)} placeholder="Ruby" className="p-2 text-black" />
                                        </td>
                                    </tr>
                                    <tr className="border-t text-[14px]">
                                        <td className="border-r p-4 font-semibold">
                                            Stone shape
                                        </td>
                                        <td className="flex items-center justify-start space-x-2 p-4">
                                            <span>
                                                <input type="text" value={productStoneShape} onChange={handleInputChange(setProductStoneShape)} placeholder="round/oval/pear" className="p-2 text-black" />
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="w-full flex justify-center items-center">
                            <button disabled={loading} type="submit" className="tracking-widest bg-black text-[14px] py-2 text-center text-white w-full">
                                {loading ? (
                                    <>
                                        <span className="flex justify-center items-center space-x-2">
                                            <span>Uploading</span>
                                            <Loader2 className='animate-spin h-8 w-8 text-zinc-300' />
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        Upload the product
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                </form>

            </div>
        </>
    )
}

export default ProductUpload