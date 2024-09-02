"use client";
import { useRef, useState } from "react";
const Sizes = () => {
  const pinkInputRef = useRef<HTMLInputElement>(null);
  const goldInputRef = useRef<HTMLInputElement>(null);
  const silverInputRef = useRef<HTMLInputElement>(null);
  // const [showDropdown, setShowDropdown] = useState(false);
  // const [sizes, setSizes] = useState<string[]>(['']);
  const [showDropdown, setShowDropdown] = useState(false);
  const [sizes, setSizes] = useState<Array<{ size: string; price: string }>>(
    [],
  );
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

  const handleSubmit = () => {
    console.log("Submitted sizes and prices:", sizes);
    setShowDropdown(false);
  };
  return (
    <>
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
            onClick={handleSubmit}
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
    </>
  )


}


export default Sizes