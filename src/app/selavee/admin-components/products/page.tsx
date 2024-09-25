"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useState, useRef, useEffect } from "react";
import { upload } from "@vercel/blob/client";
import { trpc } from "@/app/trpc/client";
import { put } from "@vercel/blob";
import { toast } from "sonner";
import { Check, Loader2, Trash2Icon, X } from "lucide-react";
interface SizePriceLabel {
  size: number;
  price: number;
  label: string;
}
const ProductsPage = () => {
  const [imageURLs, setImageURLs] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);  // State to store the uploaded image URLs
  const [ImageCategory, setImageCategory] = useState("");
  const [selectableCategory, setSelectableCategory] = useState("table");
  const selectableCategories = ['table', 'product-upload', 'category-images'];
  const [selectedSizeOption, setSelectedSizeOption] = useState<Boolean>(false)
  const [onlyPrice, setOnlyPrice] = useState("");
  const [isHover, setIsHover] = useState(0);
  const handleCategoryClick = (category: string) => {
    setSelectableCategory(category);
    setIsTable(!isTable);
    setIsUpload(!isUpload);
    setIsImages(!isImages);
    if (category === "table") {
      setIsTable(true);
      setIsUpload(false);
      setIsImages(false);
    } else if (category === "product-upload") {
      setIsTable(false);
      setIsUpload(true);
      setIsImages(false);
    } else {
      setIsTable(false);
      setIsUpload(false);
      setIsImages(true);
    }

  };
  const categories = ['All', 'Necklaces', 'Bracelets', 'Rings', 'Earrings'];
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { data } = trpc.product.fetchProductsByCategory.useQuery(
    { selectedCategory: selectedCategory === "All" ? undefined : selectedCategory, },
    { keepPreviousData: true }
  );
  const [productCategory, setProductCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [completeSet, setCompleteSet] = useState("");
  const [otherCreations, setOtherCreations] = useState("");
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
      setLoading(false);

    },
  })
  const { mutate: categoryMutate, isLoading: categoryLoading } = trpc.product.createCategoryImages.useMutation({
    onError: (err) => {
      toast.error("something went wrong.");
    },
    onSuccess: () => {
      toast.success("upload was successfull.");
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

        // if (response.url) {
        //   urls.push(response.url); // Store the URLs
        // }
        // if (response.url) {
        //   if (mainImageNames.includes(fileName)) {
        //     mainImages[fileName] = response.url;
        //   } else {
        //     secondaryImages.push(response.url);
        //   }
        // }
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

  // Function to trigger file input click
  const handleClick = (inputRef: React.RefObject<HTMLInputElement>) => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
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
  const handleOnlyPriceSubmit = () => {
    setDisabledPrice(true);
    console.log("submitted only price");
  }
  const { mutate: deletionMutate, isLoading: isDeleting } = trpc.product.deleteSpecificProduct.useMutation({
    onError: (err) => {
      toast.error("something went wrong.");
    },
    onSuccess: () => {
      toast.success("deleted successfully.");
      // router.push("/selavee/admin");
    },
  });
  const [isTable, setIsTable] = useState(true);
  const [isUpload, setIsUpload] = useState(false);
  const [isImages, setIsImages] = useState(false);
  const handleDelete = (id: string) => {
    deletionMutate({ id });
  }
  const [isMenuShown, setIsMenuShown] = useState(false);
  const handleSizeMenu = () => {
    setIsMenuShown(!isMenuShown);
  }
  const handleSizesClick = () => {
    setIsMenuShown(!isMenuShown);
  }
  const handleCategorySubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (imageFiles.length > 0){
      const mainImages: { [key: string]: string } = {};
      // const secondaryImages: { [key: string]: string } = {};
      const secondaryImages: string[] = [];

      const mainImageNames = [
        "necklaces",
        "bracelets",
        "rings",
        "earrings",
        "new-ins",
        "best-sellers",
        "sales",
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

        // if (response.url) {
        //   urls.push(response.url); // Store the URLs
        // }
        // if (response.url) {
        //   if (mainImageNames.includes(fileName)) {
        //     mainImages[fileName] = response.url;
        //   } else {
        //     secondaryImages.push(response.url);
        //   }
        // }
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
        necklaces: mainImages["necklaces"],
        bracelets: mainImages["bracelets"],
        rings: mainImages["rings"],
        earrings: mainImages["earrings"],
        newIns: mainImages["new-ins"],
        bestSellers: mainImages["best-sellers"],
        sales: mainImages["sales"],
        secondaryImages,
      }
      categoryMutate(payload);
    }
    
  }
  return (
    <>

      <MaxWidthWrapper>
        <div className="mt-24 flex justify-center items-center w-full space-x-4">
          <ul className="flex justify-center items-center space-x-4 tracking-widest text-[16px] text-[#666666]">
            {selectableCategories.map((category) => (
              <li
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`cursor-pointer pb-2 ${selectableCategory === category ? 'border-b-2 border-black' : ''
                  }`}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
        {isUpload && (
          <>
            <form className="w-full" onSubmit={handleSubmit}>
              <div className="mt-44 flex w-full items-start justify-between">
                <div className="h-[450px] w-1/2 bg-gray-500">
                  <div className="flex h-full w-full flex-col items-center justify-center space-y-6">
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
                </div>
                <div className="flex w-1/2 flex-col space-y-6 items-start justify-center pl-20 text-[20px]">
                  <span className="flex justify-start items-center space-x-4">
                    <label className="font-semibold">Product Category</label>
                    <input type="text" placeholder="Earrings" value={productCategory} onChange={handleInputChange(setProductCategory)} className="border-b-[1px] outline-none p-2 border-solid border-black" />
                  </span>
                  <span className="flex justify-start items-center space-x-4">
                    <label>Product Name</label>
                    <input type="text" placeholder="Earrings 202" value={productName} onChange={handleInputChange(setProductName)} className="border-b-[1px] outline-none p-2 border-solid border-black" />
                  </span>
                  <span className="flex justify-start items-center space-x-4">
                    <label>Complete set</label>
                    <input type="text" placeholder="complete set tag" value={completeSet} onChange={handleInputChange(setCompleteSet)} className="border-b-[1px] outline-none p-2 border-solid border-black" />
                  </span>
                  <span className="flex justify-start items-center space-x-4">
                    <label>other creations</label>
                    <input type="text" placeholder="tag for other creations" value={otherCreations} onChange={handleInputChange(setOtherCreations)} className="border-b-[1px] outline-none p-2 border-solid border-black" />
                  </span>
                  <span className="bg-black rounded justify-center items-center">
                    <span className="text-white tracking-widest text-[16px] w-1/2">Do you want Sizes?</span>
                    <span className="flex justify-center items-center space-x-2">
                      {/* <Check color="#eee7e7" /> */}
                      <Check onClick={() => setSelectedSizeOption(true)} color="white" className="w-[30px] h-[30px] cursor-pointer" />
                      <X onClick={() => setSelectedSizeOption(false)} color="white" className="w-[30px] h-[30px] cursor-pointer" />
                    </span>
                  </span>
                  {selectedSizeOption ? (
                    <>
                      <span onClick={toggleDropdown} className="cursor-pointer flex justify-start items-center space-x-4">
                        Sizes
                      </span>
                      {showDropdown && (
                        <div className="mt-2 rounded border border-gray-300 bg-white p-4 shadow-lg">
                          {sizes.map((item, index) => (

                            <span className="w-full flex justify-center items-center space-x-2">
                              <input
                                type="text"
                                key={index}
                                value={item.size}
                                onChange={(e) =>
                                  handleSizePriceChange(index, "size", e.target.value)
                                }
                                className="w-1/3 rounded border border-gray-300 p-2"
                                placeholder={`Size ${index + 1}`}
                              />
                              <input
                                type="text"
                                key={index}
                                value={item.price}
                                onChange={(e) =>
                                  handleSizePriceChange(index, "price", e.target.value)
                                }
                                className="w-1/3 rounded border border-gray-300 p-2"
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
                      )}
                    </>
                  ) : (
                    <>
                      <span className="flex justify-start items-center">

                        <span className="flex justify-center items-center space-x-4">
                          <input
                            type="text"
                            value={onlyPrice}
                            disabled={disabledPrice}
                            onChange={handleInputChange(setOnlyPrice)}
                            className="rounded border border-gray-300 p-2"
                            placeholder={`Price`}
                          />

                        </span>
                        <button
                          type="button"
                          disabled={disabledPrice}
                          onClick={handleOnlyPriceSubmit}
                          className="w-full rounded bg-green-500 p-2 text-white"
                        >
                          Submit
                        </button>
                      </span>
                    </>
                  )}



                </div>
              </div>
              <div className="my-32">
                <div className="grid grid-cols-1 gap-x-0 tracking-widest sm:gap-y-10 lg:grid-cols-2 lg:gap-5">
                  <div className="sm:p-0 lg:p-8">
                    <h2 className="mb-4 ml-4 text-[16px] font-semibold">
                      Product Details
                    </h2>
                    <table className="w-full border-collapse">
                      <tbody>
                        <tr className="text-[14px]">
                          <td className="border-r p-4 font-semibold">Product</td>
                          <td className="p-4">
                            <input required type="text" placeholder="Product" value={productDetail} onChange={handleInputChange(setProductDetail)} />
                          </td>
                        </tr>
                        <tr className="border-t text-[14px]">
                          <td className="border-r p-4 font-semibold">Style Code</td>
                          <td className="p-4">
                            <input required type="text" placeholder="832003" value={productStyleCode} onChange={handleInputChange(setProductStyleCode)} />
                          </td>
                        </tr>
                        <tr className="border-b border-t text-[14px]">
                          <td className="border-r p-4 font-semibold">Dimensions</td>
                          <td className="p-4">
                            <input required type="text" placeholder="-" value={productDimensions} onChange={handleInputChange(setProductDimensions)} />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="sm:p-0 lg:p-8">
                    <h2 className="mb-4 ml-4 text-[16px] font-semibold">Diamond</h2>
                    <table className="w-full border-collapse">
                      <tbody>
                        <tr className="text-[14px]">
                          <td className="border-r p-4 font-semibold">
                            Diamond Purity
                          </td>
                          <td className="p-4">
                            <input type="text" value={productDiamondPurity} onChange={handleInputChange(setProductDiamondPurity)} placeholder="Si HI" />
                          </td>
                        </tr>
                        <tr className="border-t text-[14px]">
                          <td className="border-r p-4 font-semibold">
                            Diamond Gross Weight
                          </td>
                          <td className="flex items-center justify-start space-x-2 p-4">
                            <span>
                              <input type="text" value={productDiamondGrossWeight} onChange={handleInputChange(setProductDiamondGrossWeight)} placeholder="0,64 ct" />
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
                            <input type="text" value={productDiamondPcs} onChange={handleInputChange(setProductDiamondPcs)} placeholder="12" />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="sm:p-0 lg:p-8">
                    <h2 className="mb-4 ml-4 text-[16px] font-semibold">Metal</h2>
                    <table className="w-full border-collapse">
                      <tbody>
                        <tr className="text-[14px]">
                          <td className="border-r p-4 font-semibold">Metal Purity</td>
                          <td className="p-4">
                            <input required type="text" value={productMetalPurity} onChange={handleInputChange(setProductMetalPurity)} placeholder="18 KT" />
                          </td>
                        </tr>
                        <tr className="border-t text-[14px]">
                          <td className="border-r p-4 font-semibold">
                            Metal Gross Weight
                          </td>
                          <td className="flex items-center justify-start space-x-2 p-4">
                            <span>
                              <input required type="text" value={productMetalGrossWeight} onChange={handleInputChange(setProductMetalGrossWeight)} placeholder="2.23 gms" />
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
                  <div className="sm:p-0 lg:p-8">
                    <h2 className="mb-4 ml-4 text-[16px] font-semibold">Stone</h2>
                    <table className="w-full border-collapse">
                      <tbody>
                        <tr className="text-[14px]">
                          <td className="border-r p-4 font-semibold">Stone type</td>
                          <td className="p-4">
                            <input type="text" value={productStoneType} onChange={handleInputChange(setProductStoneType)} placeholder="Ruby" />
                          </td>
                        </tr>
                        <tr className="border-t text-[14px]">
                          <td className="border-r p-4 font-semibold">
                            Stone shape
                          </td>
                          <td className="flex items-center justify-start space-x-2 p-4">
                            <span>
                              <input type="text" value={productStoneShape} onChange={handleInputChange(setProductStoneShape)} placeholder="round/oval/pear" />
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="w-full my-24 flex justify-center items-center">
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
            </form>
          </>
        )}
        {isTable && (
          <>
            <div className="w-full flex justify-center items-center">
              <table className="table w-full">
                <thead className="thead">
                  <tr className="tr">
                    <th className="th">Main Image</th>
                    <th className="th">Category</th>
                    <th className="th">Product Name</th>
                    <th className="th">Delete</th>
                  </tr>
                </thead>
                <tbody className="tbody">
                  {data?.products.map((product, index) => (

                    <tr key={index} className="th relative">
                      <td className="td" data-column="First Name">
                        <img src={product.mainProductImage} className="w-[50px] h-[50px]" />
                      </td>
                      <td className="td" data-column="Last Name">{product.productCategory}</td>
                      <td className="td" data-column="Job Title">{product.productName}</td>
                      <td className="td" data-column="Job Title">
                        <Trash2Icon onClick={() => handleDelete(product._id)} className="cursor-pointer" />
                      </td>
                    </tr>


                  ))}


                </tbody>
              </table>
            </div>
          </>
        )}
        {isImages && (
          <>
            <form onSubmit={handleCategorySubmit} id="hero" className="mt-44 w-full">
              <div className="flex flex-col space-y-24">
                {/* <div className="flex items-center justify-center">
                  <h1 className="text-[18px] lg:text-[24px] font-semibold tracking-widest">
                    <input value={ImageCategory} onChange={handleInputChange(setImageCategory)} type="text" className="outline-none p-4 border-b-2 border-black border-solid" placeholder="Necklaces/Earrings/Bracelets/Rings" />
                  </h1>
                </div> */}
                {/* bg-[#FEFCFE] */}
                <div className="flex flex-col-reverse lg:flex-row w-full justify-center px-4 lg:px-0">
                  <div className="flex flex-1 items-end justify-center lg:justify-start">
                    <p className="w-full lg:max-w-[338.31px] text-[14px] leading-7 tracking-widest">
                      Notre newsletter vous convie à un voyage exclusif dans
                      l&apos;univers de notre joaillerie.
                    </p>
                  </div>
                  <div className="flex flex-1 items-center justify-center max-w-1/3">
                    <input type="file" multiple
                      accept="image/*"
                      onChange={handleFileChange} />
                  </div>
                  <div className="flex flex-1 items-start justify-end">
                    <p className="max-w-md text-[14px] tracking-widest text-gray-700">
                      Notre newsletter
                    </p>
                  </div>
                </div>
              </div>
              <button type="submit" className="mt-24 w-full bg-black py-2 text-white text-[16px] tracking-widest">
              {categoryLoading ? (
                    <>
                      <span className="flex justify-center items-center space-x-2">
                        <span>Uploading</span>
                        <Loader2 className='animate-spin h-8 w-8 text-zinc-300' />
                      </span>
                    </>
                  ) : (
                    <>
                      Upload Images
                    </>
                  )}
              </button>
            </form>
          </>
        )}
        {/* {isUpload ? (
          <>
            <form className="w-full" onSubmit={handleSubmit}>
              <div className="mt-44 flex w-full items-start justify-between">
                <div className="h-[450px] w-1/2 bg-gray-500">
                  <div className="flex h-full w-full flex-col items-center justify-center space-y-6">
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
                </div>
                <div className="flex w-1/2 flex-col space-y-6 items-start justify-center pl-20 text-[20px]">
                  <span className="flex justify-start items-center space-x-4">
                    <label className="font-semibold">Product Category</label>
                    <input type="text" placeholder="Earrings" value={productCategory} onChange={handleInputChange(setProductCategory)} className="border-b-[1px] outline-none p-2 border-solid border-black" />
                  </span>
                  <span className="flex justify-start items-center space-x-4">
                    <label>Product Name</label>
                    <input type="text" placeholder="Earrings 202" value={productName} onChange={handleInputChange(setProductName)} className="border-b-[1px] outline-none p-2 border-solid border-black" />
                  </span>
                  <span className="flex justify-start items-center space-x-4">
                    <label>Complete set</label>
                    <input type="text" placeholder="complete set tag" value={completeSet} onChange={handleInputChange(setCompleteSet)} className="border-b-[1px] outline-none p-2 border-solid border-black" />
                  </span>
                  <span className="flex justify-start items-center space-x-4">
                    <label>other creations</label>
                    <input type="text" placeholder="tag for other creations" value={otherCreations} onChange={handleInputChange(setOtherCreations)} className="border-b-[1px] outline-none p-2 border-solid border-black" />
                  </span>
                  <span onClick={toggleDropdown} className="cursor-pointer flex justify-start items-center space-x-4">
                    Sizes
                  </span>
                  {showDropdown && (
                    <div className="mt-2 rounded border border-gray-300 bg-white p-4 shadow-lg">
                      {sizes.map((item, index) => (

                        <span className="w-full flex justify-center items-center space-x-2">
                          <input
                            type="text"
                            key={index}
                            value={item.size}
                            onChange={(e) =>
                              handleSizePriceChange(index, "size", e.target.value)
                            }
                            className="w-1/3 rounded border border-gray-300 p-2"
                            placeholder={`Size ${index + 1}`}
                          />
                          <input
                            type="text"
                            key={index}
                            value={item.price}
                            onChange={(e) =>
                              handleSizePriceChange(index, "price", e.target.value)
                            }
                            className="w-1/3 rounded border border-gray-300 p-2"
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
                  )}


                </div>
              </div>
              <div className="my-32">
                <div className="grid grid-cols-1 gap-x-0 tracking-widest sm:gap-y-10 lg:grid-cols-2 lg:gap-5">
                  <div className="sm:p-0 lg:p-8">
                    <h2 className="mb-4 ml-4 text-[16px] font-semibold">
                      Product Details
                    </h2>
                    <table className="w-full border-collapse">
                      <tbody>
                        <tr className="text-[14px]">
                          <td className="border-r p-4 font-semibold">Product</td>
                          <td className="p-4">
                            <input required type="text" placeholder="Product" value={productDetail} onChange={handleInputChange(setProductDetail)} />
                          </td>
                        </tr>
                        <tr className="border-t text-[14px]">
                          <td className="border-r p-4 font-semibold">Style Code</td>
                          <td className="p-4">
                            <input required type="text" placeholder="832003" value={productStyleCode} onChange={handleInputChange(setProductStyleCode)} />
                          </td>
                        </tr>
                        <tr className="border-b border-t text-[14px]">
                          <td className="border-r p-4 font-semibold">Dimensions</td>
                          <td className="p-4">
                            <input required type="text" placeholder="-" value={productDimensions} onChange={handleInputChange(setProductDimensions)} />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="sm:p-0 lg:p-8">
                    <h2 className="mb-4 ml-4 text-[16px] font-semibold">Diamond</h2>
                    <table className="w-full border-collapse">
                      <tbody>
                        <tr className="text-[14px]">
                          <td className="border-r p-4 font-semibold">
                            Diamond Purity
                          </td>
                          <td className="p-4">
                            <input required type="text" value={productDiamondPurity} onChange={handleInputChange(setProductDiamondPurity)} placeholder="Si HI" />
                          </td>
                        </tr>
                        <tr className="border-t text-[14px]">
                          <td className="border-r p-4 font-semibold">
                            Diamond Gross Weight
                          </td>
                          <td className="flex items-center justify-start space-x-2 p-4">
                            <span>
                              <input required type="text" value={productDiamondGrossWeight} onChange={handleInputChange(setProductDiamondGrossWeight)} placeholder="0,64 ct" />
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
                            <input required type="text" value={productDiamondPcs} onChange={handleInputChange(setProductDiamondPcs)} placeholder="12" />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="sm:p-0 lg:p-8">
                    <h2 className="mb-4 ml-4 text-[16px] font-semibold">Metal</h2>
                    <table className="w-full border-collapse">
                      <tbody>
                        <tr className="text-[14px]">
                          <td className="border-r p-4 font-semibold">Metal Purity</td>
                          <td className="p-4">
                            <input required type="text" value={productMetalPurity} onChange={handleInputChange(setProductMetalPurity)} placeholder="18 KT" />
                          </td>
                        </tr>
                        <tr className="border-t text-[14px]">
                          <td className="border-r p-4 font-semibold">
                            Metal Gross Weight
                          </td>
                          <td className="flex items-center justify-start space-x-2 p-4">
                            <span>
                              <input required type="text" value={productMetalGrossWeight} onChange={handleInputChange(setProductMetalGrossWeight)} placeholder="2.23 gms" />
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
                  <div className="sm:p-0 lg:p-8">
                    <h2 className="mb-4 ml-4 text-[16px] font-semibold">Stone</h2>
                    <table className="w-full border-collapse">
                      <tbody>
                        <tr className="text-[14px]">
                          <td className="border-r p-4 font-semibold">Stone type</td>
                          <td className="p-4">
                            <input type="text" value={productStoneType} onChange={handleInputChange(setProductStoneType)} placeholder="Ruby" />
                          </td>
                        </tr>
                        <tr className="border-t text-[14px]">
                          <td className="border-r p-4 font-semibold">
                            Stone shape
                          </td>
                          <td className="flex items-center justify-start space-x-2 p-4">
                            <span>
                              <input type="text" value={productStoneShape} onChange={handleInputChange(setProductStoneShape)} placeholder="round/oval/pear" />
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="w-full my-24 flex justify-center items-center">
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
            </form>
          </>
        ) : (
          <>
            <div className="w-full flex justify-center items-center">
              <table className="table w-full">
                <thead className="thead">
                  <tr className="tr">
                    <th className="th">Main Image</th>
                    <th className="th">Category</th>
                    <th className="th">Product Name</th>
                    <th className="th">Delete</th>
                  </tr>
                </thead>
                <tbody className="tbody">
                  {data?.products.map((product, index) => (

                    <tr key={index} className="th relative">
                      <td className="td" data-column="First Name">
                        <img src={product.mainProductImage} className="w-[50px] h-[50px]" />
                      </td>
                      <td className="td" data-column="Last Name">{product.productCategory}</td>
                      <td className="td" data-column="Job Title">{product.productName}</td>
                      <td className="td" data-column="Job Title">
                        <Trash2Icon onClick={() => handleDelete(product._id)} className="cursor-pointer" />
                      </td>
                     
                    </tr>


                  ))}


                </tbody>
              </table>
            </div>
          </>
        )} */}

      </MaxWidthWrapper>
    </>
  );
};

export default ProductsPage;
