"use client";

import { useState } from "react";
// import Sidebar from "../components/Sidebar";
import Analytics from "../components/Analytics";
import { ChevronDown } from "lucide-react";
import About from "../components/About";
import Display from "../components/Display";
import SliderDisplay from "../components/Slider";
import MainFour from "../components/MainFour";
import CategoryImages from "../components/Categories";
import ProductUpload from "../components/ProductUpload";

const Page = () => {
    const [showProductsMenu, setShowProductsMenu] = useState(false);
    const [selectedSection, setSelectedSection] = useState("analytics");
    return (
        <>

            <div className="bg-[#171821] flex min-h-screen">
                {/* <Sidebar /> */}
                <div className="w-64 border-r-[1px] border-[#2C2D33] p-4 h-screen top-0 left-0">
                    <ul className="space-y-4 text-[#A0A0A0] tracking-widest">
                        <li onClick={() => setSelectedSection("analytics")} className={`cursor-pointer ${selectedSection === "analytics" ? "bg-[#A9DFD8] p-2 rounded text-black" : ""}`}>Analytics</li>
                        <li onClick={() => setSelectedSection("inbox")} className={`cursor-pointer ${selectedSection === "inbox" ? "bg-[#A9DFD8] p-2 rounded text-black" : ""}`}>Inbox</li>
                        <li onClick={() => setSelectedSection("about")} className={`cursor-pointer ${selectedSection === "about" ? "bg-[#A9DFD8] p-2 rounded text-black" : ""}`}>About</li>
                        <li
                            className="cursor-pointer"
                            onClick={() => setShowProductsMenu(!showProductsMenu)} // Toggle dropdown
                        >
                            <div className="flex justify-between items-center">
                                Products
                                <ChevronDown className="w-4 h-4" />
                            </div>
                        </li>
                        {showProductsMenu && (
                            <ul className="pl-4 space-y-2 mt-2">
                                <li
                                onClick={() => setSelectedSection("display")} className={`cursor-pointer ${selectedSection === "display" ? "bg-[#A9DFD8] p-2 rounded text-black" : ""}`}
                                >
                                    Display
                                </li>
                                <li
                                onClick={() => setSelectedSection("slider")} className={`cursor-pointer ${selectedSection === "slider" ? "bg-[#A9DFD8] p-2 rounded text-black" : ""}`}
                                >
                                    Slider
                                </li>
                                <li
                                    onClick={() => setSelectedSection("upload")} className={`cursor-pointer ${selectedSection === "upload" ? "bg-[#A9DFD8] p-2 rounded text-black" : ""}`}
                                >
                                    Product Upload
                                </li>
                                <li
                                    onClick={() => setSelectedSection("main")} className={`cursor-pointer ${selectedSection === "main" ? "bg-[#A9DFD8] p-2 rounded text-black" : ""}`}
                                >
                                    Main 4
                                </li>
                                <li
                                   onClick={() => setSelectedSection("categories")} className={`cursor-pointer ${selectedSection === "categories" ? "bg-[#A9DFD8] p-2 rounded text-black" : ""}`}
                                >
                                    Categories
                                </li>
                            </ul>
                        )}
                    </ul>
                </div>
                <div className="flex-1 p-12 overflow-y-auto text-white">
                    {selectedSection === "analytics" && (
                        <Analytics />

                    )}
                    {selectedSection === "about" && (
                        <About />
                    )}

                    {selectedSection === "display" && (
                       <Display />
                    )}
                    {selectedSection === "slider" && (
                       <SliderDisplay />
                    )}
                    {selectedSection === "main" && (
                       <MainFour />
                    )}
                    {selectedSection === "categories" && (
                       <CategoryImages />
                    )}
                    {selectedSection === "upload" && (
                        <ProductUpload />
                    )}

                    

                </div>


            </div>

        </>
    )
}

export default Page