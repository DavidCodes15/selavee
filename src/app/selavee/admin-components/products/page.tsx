"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useState, useRef, useEffect } from "react";
import { upload } from "@vercel/blob/client";
import { trpc } from "@/app/trpc/client";
import { put } from "@vercel/blob";

const ProductsPage = () => {
  const [imageURLs, setImageURLs] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);  // State to store the uploaded image URLs
  useEffect(() => {
    console.log(imageURLs);
    console.log(imageURLs[0]);
    console.log(imageURLs[1]);
  }, [imageURLs])
  // const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = event.target.files;
  //   if (files) {
  //     const urls: string[] = [];

  //     // Iterate over all selected files
  //     for (let i = 0; i < files.length; i++) {
  //       const file = files[i];
        
  //       // const formData = new FormData();
  //       // formData.append('file', file);

  //       // Upload the file using Vercel Blob
  //     //  const response = await upload(file.name, file, {
  //     //   handleUploadUrl: '/api/trpc/product.createProduct',
  //     //   access: 'public',
  //     //  });
  //     const response = await upload(file.name, file, {
  //       access: 'public',
  //       handleUploadUrl: '/api/upload',
  //     })

  //       if (response.url) {
  //         console.log(response.url)
  //         urls.push(response.url); // Store the returned URL
  //         setImageURLs(urls);
  //       }
  //     }

  //  // Update the state with all the uploaded URLs
  //   }
  // };
  const pinkInputRef = useRef<HTMLInputElement>(null);
  const goldInputRef = useRef<HTMLInputElement>(null);
  const silverInputRef = useRef<HTMLInputElement>(null);
  // const [showDropdown, setShowDropdown] = useState(false);
  // const [sizes, setSizes] = useState<string[]>(['']);
  const [showDropdown, setShowDropdown] = useState(false);
  const [sizes, setSizes] = useState<Array<{ size: string; price: string }>>(
    [],
  );
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setImageFiles(Array.from(files)); // Store the files in state
    }
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (imageFiles.length > 0) {
      // const urls: string[] = [];
      const mainImages: { [key: string]: string } = {};
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

        // if (response.url) {
        //   urls.push(response.url); // Store the URLs
        // }
        if (response.url) {
          if (mainImageNames.includes(fileName)) {
            mainImages[fileName] = response.url;
          } else {
            secondaryImages.push(response.url);
          }
        }
      }
      console.log("Main Images URLs:", mainImages);
    console.log("Secondary Images URLs:", secondaryImages);

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
    field: "size" | "price",
    value: string,
  ) => {
    const newSizes = [...sizes];
    newSizes[index] = { ...newSizes[index], [field]: value };
    setSizes(newSizes);
  };

  const addSizePriceInput = () => {
    setSizes([...sizes, { size: "", price: "" }]);
  };

  const handleSizesSubmit = () => {
    console.log("Submitted sizes and prices:", sizes);
    setShowDropdown(false);
  };
  

  return (
    <>
      <MaxWidthWrapper>
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
                <input type="text" placeholder="Earrings" className="border-b-[1px] outline-none p-2 border-solid border-black" />
            </span>
            <span className="flex justify-start items-center space-x-4">
                <label>Product Name</label>
                <input type="text" placeholder="Earrings 202" className="border-b-[1px] outline-none p-2 border-solid border-black" />
            </span>
            <span onClick={toggleDropdown} className="cursor-pointer flex justify-start items-center space-x-4">
        Sizes
      </span>
      {showDropdown && (
        <div className="mt-2 rounded border border-gray-300 bg-white p-4 shadow-lg">
          {sizes.map((item, index) => (
            // <input
            //     key={index}
            //     type="text"
            //     value={size}
            //     onChange={(e) => handleSizeChange(index, e.target.value)}
            //     className="w-full mb-2 p-2 border border-gray-300 rounded"
            //     placeholder={`Size ${index + 1}`}
            // />
            <>
              <input
                type="text"
                key={index}
                value={item.size}
                onChange={(e) =>
                  handleSizePriceChange(index, "size", e.target.value)
                }
                className="w-1/2 rounded border border-gray-300 p-2"
                placeholder={`Size ${index + 1}`}
              />
              <input
                type="text"
                key={index}
                value={item.price}
                onChange={(e) =>
                  handleSizePriceChange(index, "price", e.target.value)
                }
                className="w-1/2 rounded border border-gray-300 p-2"
                placeholder={`Price ${index + 1}`}
              />
            </>
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
      <span className="flex items-center justify-start space-x-4">
        <span
          onClick={() => handleClick(pinkInputRef)}
          className="pink-gradient h-[20px] w-[20px] cursor-pointer rounded-full border-[1px] border-solid border-black"
        />
        <span
          onClick={() => handleClick(goldInputRef)}
          className="gold-gradient h-[20px] w-[20px] cursor-pointer rounded-full"
        />
        <span
          onClick={() => handleClick(silverInputRef)}
          className="silver-gradient h-[20px] w-[20px] cursor-pointer rounded-full"
        />
        <input
          type="file"
          ref={pinkInputRef}
          style={{ display: "none" }}
          onChange={(e) => console.log(e.target.files)}
        />
        <input
          type="file"
          ref={goldInputRef}
          style={{ display: "none" }}
          onChange={(e) => console.log(e.target.files)}
        />
        <input
          type="file"
          ref={silverInputRef}
          style={{ display: "none" }}
          onChange={(e) => console.log(e.target.files)}
        />
      </span>
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
                      <input required type="text" placeholder="Product" />
                    </td>
                  </tr>
                  <tr className="border-t text-[14px]">
                    <td className="border-r p-4 font-semibold">Style Code</td>
                    <td className="p-4">
                      <input required type="text" placeholder="832003" />
                    </td>
                  </tr>
                  <tr className="border-b border-t text-[14px]">
                    <td className="border-r p-4 font-semibold">Dimensions</td>
                    <td className="p-4">
                      <input required type="text" placeholder="-" />
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
                      <input required type="text" placeholder="Si HI" />
                    </td>
                  </tr>
                  <tr className="border-t text-[14px]">
                    <td className="border-r p-4 font-semibold">
                      Diamond Gross Weight
                    </td>
                    <td className="flex items-center justify-start space-x-2 p-4">
                      <span>
                        <input required type="text" placeholder="0,64 ct" />
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
                      <input required type="text" placeholder="12" />
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
                      <input required type="text" placeholder="18 KT" />
                    </td>
                  </tr>
                  <tr className="border-t text-[14px]">
                    <td className="border-r p-4 font-semibold">
                      Metal Gross Weight
                    </td>
                    <td className="flex items-center justify-start space-x-2 p-4">
                      <span>
                        <input required type="text" placeholder="2.23 gms" />
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
        </div>
        <div className="w-full my-24 flex justify-center items-center">
            <button type="submit" className="tracking-widest bg-black text-[14px] py-2 text-center text-white w-full">Upload the product</button>
        </div>
        </form>
      </MaxWidthWrapper>
    </>
  );
};

export default ProductsPage;
