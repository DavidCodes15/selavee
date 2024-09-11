"use client"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import { useState } from "react";
import AboutUsUpload from "../components/AboutUsUpload/page";
import ProductUpload from "../components/home/ProductUpload";
const AdminHome = () => {
    const [selectedCategory, setSelectedCategory] = useState("about-us");
    const categories = ['about-us', 'product-upload'];
    const [isHover, setIsHover] = useState(0);
    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category);
      };
    return (
        <>
            <MaxWidthWrapper>
                <div className="flex justify-center items-center w-full space-x-4">
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
                  </ul>
                </div>
                {selectedCategory === "about-us" && (
                    <>
                    <AboutUsUpload />
                    </>
                )}
                {selectedCategory === "product-upload" && (
                    <>
                    <ProductUpload />
                    </>
                )}

            </MaxWidthWrapper>
        </>
    )
}

export default AdminHome