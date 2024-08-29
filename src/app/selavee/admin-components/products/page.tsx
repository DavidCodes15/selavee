
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Sizes from "../components/sizesInput/page";
// import cloudinary from "cloudinary";

// cloudinary.v2.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
//   });
const ProductsPage = () => {
//   const pinkInputRef = useRef<HTMLInputElement>(null);
//   const goldInputRef = useRef<HTMLInputElement>(null);
//   const silverInputRef = useRef<HTMLInputElement>(null);
//   // const [showDropdown, setShowDropdown] = useState(false);
//   // const [sizes, setSizes] = useState<string[]>(['']);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [sizes, setSizes] = useState<Array<{ size: string; price: string }>>(
//     [],
//   );
//   // Function to trigger file input click
//   const handleClick = (inputRef: React.RefObject<HTMLInputElement>) => {
//     if (inputRef.current) {
//       inputRef.current.click();
//     }
//   };

//   const toggleDropdown = () => {
//     setShowDropdown(!showDropdown);
//   };

//   const handleSizePriceChange = (
//     index: number,
//     field: "size" | "price",
//     value: string,
//   ) => {
//     const newSizes = [...sizes];
//     newSizes[index] = { ...newSizes[index], [field]: value };
//     setSizes(newSizes);
//   };

//   const addSizePriceInput = () => {
//     setSizes([...sizes, { size: "", price: "" }]);
//   };

//   const handleSubmit = () => {
//     console.log("Submitted sizes and prices:", sizes);
//     setShowDropdown(false);
//   };
  // const toggleDropdown = () => {
  //     setShowDropdown(!showDropdown);
  // };

  // // Function to handle size input change
  // const handleSizeChange = (index: number, value: string) => {
  //     const newSizes = [...sizes];
  //     newSizes[index] = value;
  //     setSizes(newSizes);
  // };

  // // Function to add a new size input
  // const addSizeInput = () => {
  //     setSizes([...sizes, '']);
  // };

  return (
    <>
      <MaxWidthWrapper>
        <form className="w-full">
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
            <Sizes />
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
                      <input type="text" placeholder="Product" />
                    </td>
                  </tr>
                  <tr className="border-t text-[14px]">
                    <td className="border-r p-4 font-semibold">Style Code</td>
                    <td className="p-4">
                      <input type="text" placeholder="832003" />
                    </td>
                  </tr>
                  <tr className="border-b border-t text-[14px]">
                    <td className="border-r p-4 font-semibold">Dimensions</td>
                    <td className="p-4">
                      <input type="text" placeholder="-" />
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
                      <input type="text" placeholder="Si HI" />
                    </td>
                  </tr>
                  <tr className="border-t text-[14px]">
                    <td className="border-r p-4 font-semibold">
                      Diamond Gross Weight
                    </td>
                    <td className="flex items-center justify-start space-x-2 p-4">
                      <span>
                        <input type="text" placeholder="0,64 ct" />
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
                      <input type="text" placeholder="12" />
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
                      <input type="text" placeholder="18 KT" />
                    </td>
                  </tr>
                  <tr className="border-t text-[14px]">
                    <td className="border-r p-4 font-semibold">
                      Metal Gross Weight
                    </td>
                    <td className="flex items-center justify-start space-x-2 p-4">
                      <span>
                        <input type="text" placeholder="2.23 gms" />
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
