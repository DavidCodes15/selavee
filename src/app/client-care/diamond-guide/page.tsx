"use client";
import Footer from "@/components/Footer";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";
import { useState } from "react";

const DiamondGuide = () => {
  // const [selected, setSelected] = useState("I");
  // const images = {
  //     Fair: "/products/diamond.png",
  //     Good: "/products/diamond-color.png",
  //     VeryGood: "/products/diamond.png",
  //     Ideal: "/products/diamond-color.png",
  //     SuperIdeal: "/products/diamond.png",
  //     J: "/products/diamond.png",
  //     I: "/products/diamond-color.png",
  //     H: "/products/diamond.png",
  //     G: "/products/diamond-color.png",
  //     F: "/products/diamond.png",
  // }
  const imageKeys = [
    "Fair",
    "Good",
    "VeryGood",
    "Ideal",
    "SuperIdeal",
    "J",
    "I",
    "H",
    "G",
    "F",
  ] as const;
  type ImageKey = (typeof imageKeys)[number];

  const [selectedCut, setSelectedCut] = useState<ImageKey>("Good");
  const [selectedColor, setSelectedColor] = useState<ImageKey>("I");

  const images: Record<ImageKey, string> = {
    Fair: "/products/diamond-color.png",
    Good: "/products/diamond.png",
    VeryGood: "/products/diamond-color.png",
    Ideal: "/products/diamond.png",
    SuperIdeal: "/products/diamond-color.png",
    J: "/products/diamond.png",
    I: "/products/diamond-color.png",
    H: "/products/diamond.png",
    G: "/products/diamond-color.png",
    F: "/products/diamond.png",
  };
  return (
    <>
      <Navbar theme="dark" />
      <MaxWidthWrapper className="mt-60">
        <div className="flex items-center justify-center">
          <h1 className="text-[24px] font-semibold tracking-widest">
            Diamond Guide
          </h1>
        </div>

        <div className="mt-24 flex items-center justify-center space-x-4 px-6">
          <div className="w-1/2">
            <img
              src="/products/earrings.png"
              className="max-h-[356px] w-full"
            />
          </div>
          <div className="flex w-1/2 flex-col items-start justify-center space-y-6">
            <h2 className="text-[18px] font-semibold tracking-widest">
              What's the diamond
            </h2>
            <p className="text-[14px] tracking-widest">
              A diamond is a precious gemstone made of carbon, formed under
              intense heat and pressure deep inside the Earth. Known for their
              hardness and sparkling beauty, diamonds are often used in jewelry
              to symbolize love and strength. They are prized for their ability
              to reflect light, creating a stunning shine. The 4Cs of Diamonds
              When choosing a diamond, it's important to understand the 4Cs:
              Cut, Color, Clarity, and Carat Weight. These four characteristics
              determine a diamond's beauty and value. Here's a simple guide to
              help you understand each of the 4Cs:
            </p>
          </div>
        </div>

        <div className="mt-60 flex items-center justify-center space-x-24 px-6">
          <div className="flex w-1/2 flex-col items-center justify-center space-y-6">
            <div className="flex w-full items-center justify-center">
              <img
                src={images[selectedCut]}
                className="max-h-[199px] max-w-[317px]"
              />
            </div>
            <div className="flex w-full flex-col items-center justify-center space-y-6">
              <div className="flex w-full items-center justify-center">


                <div className="flex flex-1 items-center justify-center">
                  <div className="flex flex-col">
                    <div className="flex space-x-2">
                      <div
                        onClick={() => setSelectedColor("Fair")}
                        className={`h-[40px] w-[1px] cursor-pointer ${selectedCut == "Fair" ? "bg-black" : "bg-[#808080]"}`}
                      />
                      <div className="flex items-center justify-center space-x-2">
                        <div className="h-[15px] w-[1px] bg-[#808080]" />
                        <div className="h-[15px] w-[1px] bg-[#808080]" />
                        <div className="h-[15px] w-[1px] bg-[#808080]" />
                        <div className="h-[15px] w-[1px] bg-[#808080]" />
                        <div className="h-[15px] w-[1px] bg-[#808080]" />
                        <div className="h-[15px] w-[1px] bg-[#808080]" />
                        <div className="h-[15px] w-[1px] bg-[#808080]" />
                        <div className="h-[15px] w-[1px] bg-[#808080]" />
                        <div className="h-[15px] w-[1px] bg-[#808080]" />
                      </div>
                    </div>
                    <div
                      onClick={() => setSelectedCut("Fair")}
                      className="cursor-pointer"
                    >
                      <span className="text-[14px]">Fair</span>
                    </div>
                  </div>
                </div>


                <div className="flex flex-1 items-end justify-center">
                  <div className="flex flex-col">
                    <div className="flex space-x-2">
                      <div
                        onClick={() => setSelectedColor("Fair")}
                        className={`h-[40px] w-[1px] cursor-pointer ${selectedCut == "Fair" ? "bg-black" : "bg-[#808080]"}`}
                      />
                      <div className="flex items-center justify-center space-x-2">
                        <div className="h-[15px] w-[1px] bg-[#808080]" />
                        <div className="h-[15px] w-[1px] bg-[#808080]" />
                        <div className="h-[15px] w-[1px] bg-[#808080]" />
                        <div className="h-[15px] w-[1px] bg-[#808080]" />
                        <div className="h-[15px] w-[1px] bg-[#808080]" />
                        <div className="h-[15px] w-[1px] bg-[#808080]" />
                        <div className="h-[15px] w-[1px] bg-[#808080]" />
                        <div className="h-[15px] w-[1px] bg-[#808080]" />
                        <div className="h-[15px] w-[1px] bg-[#808080]" />
                      </div>
                    </div>
                    <div
                      onClick={() => setSelectedCut("Fair")}
                      className="cursor-pointer"
                    >
                      <span className="text-[14px]">Good</span>
                    </div>
                  </div>
                </div>


                <div className="flex flex-1 items-end justify-center">
                  <div className="flex flex-col">
                    <div className="flex space-x-2">
                      <div
                        onClick={() => setSelectedColor("Fair")}
                        className={`h-[40px] w-[1px] cursor-pointer ${selectedCut == "Fair" ? "bg-black" : "bg-[#808080]"}`}
                      />
                      <div className="flex items-center justify-center space-x-2">
                        <div className="h-[15px] w-[1px] bg-[#808080]" />
                        <div className="h-[15px] w-[1px] bg-[#808080]" />
                        <div className="h-[15px] w-[1px] bg-[#808080]" />
                        <div className="h-[15px] w-[1px] bg-[#808080]" />
                        <div className="h-[15px] w-[1px] bg-[#808080]" />
                        <div className="h-[15px] w-[1px] bg-[#808080]" />
                        <div className="h-[15px] w-[1px] bg-[#808080]" />
                        <div className="h-[15px] w-[1px] bg-[#808080]" />
                        <div className="h-[15px] w-[1px] bg-[#808080]" />
                      </div>
                    </div>
                    <div
                      onClick={() => setSelectedCut("Fair")}
                      className="cursor-pointer"
                    >
                      <span className="text-[14px]">Very Good</span>
                    </div>
                  </div>
                </div>


                <div className="flex flex-1 items-end justify-center">
                  <div className="flex flex-col">
                    <div className="flex space-x-2">
                      <div
                        onClick={() => setSelectedColor("Fair")}
                        className={`h-[40px] w-[1px] cursor-pointer ${selectedCut == "Fair" ? "bg-black" : "bg-[#808080]"}`}
                      />
                      <div className="flex items-center justify-center space-x-2">
                        <div className="h-[15px] w-[1px] bg-[#808080]" />
                        <div className="h-[15px] w-[1px] bg-[#808080]" />
                        <div className="h-[15px] w-[1px] bg-[#808080]" />
                        <div className="h-[15px] w-[1px] bg-[#808080]" />
                        <div className="h-[15px] w-[1px] bg-[#808080]" />
                        <div className="h-[15px] w-[1px] bg-[#808080]" />
                        <div className="h-[15px] w-[1px] bg-[#808080]" />
                        <div className="h-[15px] w-[1px] bg-[#808080]" />
                        <div className="h-[15px] w-[1px] bg-[#808080]" />
                      </div>
                    </div>
                    <div
                      onClick={() => setSelectedCut("Fair")}
                      className="cursor-pointer"
                    >
                      <span className="text-[14px]">Ideal</span>
                    </div>
                  </div>
                </div>


                <div className="flex flex-1 items-end justify-center">
                  <div className="flex flex-col">
                    <div className="flex">
                      <div
                        onClick={() => setSelectedColor("Fair")}
                        className={`h-[40px] w-[1px] cursor-pointer ${selectedCut == "Fair" ? "bg-black" : "bg-[#808080]"}`}
                      />
                    </div>
                    <div
                      onClick={() => setSelectedCut("Fair")}
                      className="cursor-pointer"
                    >
                      <span className="text-[14px]">Super Ideal</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            <div className="flex w-full items-center justify-start">
              <p className="w-full text-[13px] tracking-widest text-[#808080]">
                Over a billion years ago, deep beneath the Earth's surface,
                carbon atoms bonded tightly under high temperatures and extreme
                pressure, resulting in the world's hardest natural mineral:
                diamond.
              </p>
            </div>
          </div>
          <div className="flex w-1/2 flex-col items-start justify-center space-y-6">
            <h2 className="text-[18px] font-semibold tracking-widest">Cut</h2>
            <p className="text-[14px] tracking-widest">
              The cut of a diamond refers to how well it has been shaped and
              polished. A good cut makes the diamond sparkle and shine. The
              better the cut, the more brilliant the diamond looks. Color
            </p>
          </div>
        </div>

        <div className="mt-60 flex items-center justify-center space-x-24 px-6">
          <div className="flex w-1/2 flex-col items-start justify-center space-y-6">
            <h2 className="text-[18px] font-semibold tracking-widest">Color</h2>
            <p className="text-[14px] tracking-widest">
              Diamonds come in different colors, from colorless to light yellow
              or brown. The best diamonds are colorless because they let more
              light shine through, making them sparkle more. Diamonds are graded
              on a scale from D (colorless) to Z (light yellow or brown).
            </p>
          </div>
          <div className="flex w-1/2 flex-col items-center justify-center space-y-6">
            <div className="flex w-full items-center justify-center">
              <img
                src={images[selectedColor]}
                className="max-h-[167px] max-w-[269px]"
              />
            </div>
            <div className="flex w-full flex-col items-center justify-center space-y-6">
              <div className="flex w-full items-center justify-center space-x-2">
                <div className="flex items-center justify-center space-x-2">
                  <div
                    onClick={() => setSelectedColor("J")}
                    className={`h-[40px] w-[1px] cursor-pointer ${selectedColor == "J" ? "bg-black" : "bg-[#808080]"}`}
                  />
                  <div className="flex items-center justify-center space-x-2">
                    <div className="h-[15px] w-[1px] bg-[#808080]" />
                    <div className="h-[15px] w-[1px] bg-[#808080]" />
                    <div className="h-[15px] w-[1px] bg-[#808080]" />
                    <div className="h-[15px] w-[1px] bg-[#808080]" />
                    <div className="h-[15px] w-[1px] bg-[#808080]" />
                    <div className="h-[15px] w-[1px] bg-[#808080]" />
                    <div className="h-[15px] w-[1px] bg-[#808080]" />
                    <div className="h-[15px] w-[1px] bg-[#808080]" />
                    <div className="h-[15px] w-[1px] bg-[#808080]" />
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <div
                    onClick={() => setSelectedColor("I")}
                    className={`h-[40px] w-[1px] cursor-pointer ${selectedColor == "I" ? "bg-black" : "bg-[#808080]"}`}
                  />
                  <div className="flex items-center justify-center space-x-2">
                    <div className="h-[15px] w-[1px] bg-[#808080]" />
                    <div className="h-[15px] w-[1px] bg-[#808080]" />
                    <div className="h-[15px] w-[1px] bg-[#808080]" />
                    <div className="h-[15px] w-[1px] bg-[#808080]" />
                    <div className="h-[15px] w-[1px] bg-[#808080]" />
                    <div className="h-[15px] w-[1px] bg-[#808080]" />
                    <div className="h-[15px] w-[1px] bg-[#808080]" />
                    <div className="h-[15px] w-[1px] bg-[#808080]" />
                    <div className="h-[15px] w-[1px] bg-[#808080]" />
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <div
                    onClick={() => setSelectedColor("H")}
                    className={`h-[40px] w-[1px] cursor-pointer ${selectedColor == "H" ? "bg-black" : "bg-[#808080]"}`}
                  />
                  <div className="flex items-center justify-center space-x-2">
                    <div className="h-[15px] w-[1px] bg-[#808080]" />
                    <div className="h-[15px] w-[1px] bg-[#808080]" />
                    <div className="h-[15px] w-[1px] bg-[#808080]" />
                    <div className="h-[15px] w-[1px] bg-[#808080]" />
                    <div className="h-[15px] w-[1px] bg-[#808080]" />
                    <div className="h-[15px] w-[1px] bg-[#808080]" />
                    <div className="h-[15px] w-[1px] bg-[#808080]" />
                    <div className="h-[15px] w-[1px] bg-[#808080]" />
                    <div className="h-[15px] w-[1px] bg-[#808080]" />
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <div
                    onClick={() => setSelectedColor("G")}
                    className={`h-[40px] w-[1px] cursor-pointer ${selectedColor == "G" ? "bg-black" : "bg-[#808080]"}`}
                  />
                  <div className="flex items-center justify-center space-x-2">
                    <div className="h-[15px] w-[1px] bg-[#808080]" />
                    <div className="h-[15px] w-[1px] bg-[#808080]" />
                    <div className="h-[15px] w-[1px] bg-[#808080]" />
                    <div className="h-[15px] w-[1px] bg-[#808080]" />
                    <div className="h-[15px] w-[1px] bg-[#808080]" />
                    <div className="h-[15px] w-[1px] bg-[#808080]" />
                    <div className="h-[15px] w-[1px] bg-[#808080]" />
                    <div className="h-[15px] w-[1px] bg-[#808080]" />
                    <div className="h-[15px] w-[1px] bg-[#808080]" />
                  </div>
                </div>
                <div
                  onClick={() => setSelectedColor("F")}
                  className={`h-[40px] w-[1px] cursor-pointer ${selectedColor == "F" ? "bg-black" : "bg-[#808080]"}`}
                />
              </div>
              <ul className="flex w-full items-center justify-center space-x-20 text-[14px]">
                <li
                  className="cursor-pointer"
                  onClick={() => setSelectedColor("J")}
                >
                  J
                </li>
                <li
                  className="cursor-pointer"
                  onClick={() => setSelectedColor("I")}
                >
                  I
                </li>
                <li
                  className="cursor-pointer"
                  onClick={() => setSelectedColor("H")}
                >
                  H
                </li>
                <li
                  className="cursor-pointer"
                  onClick={() => setSelectedColor("G")}
                >
                  G
                </li>
                <li
                  className="cursor-pointer"
                  onClick={() => setSelectedColor("F")}
                >
                  F
                </li>
              </ul>
            </div>
            <div className="flex w-full items-center justify-start">
              <p className="w-full text-[13px] tracking-widest text-[#808080]">
                Over a billion years ago, deep beneath the Earth's surface,
                carbon atoms bonded tightly under high temperatures and extreme
                pressure, resulting in the world's hardest natural mineral:
                diamond.
              </p>
            </div>
          </div>
        </div>

        <div className="jutify-center mt-60 flex flex-col items-center">
          <h3 className="text-[18px] font-semibold tracking-widest">Clarity</h3>
          <div className="mt-12 flex items-center justify-center space-x-24 px-6">
            <div className="flex w-1/2 flex-col items-center justify-center space-y-6">
              <div className="flex w-full items-center justify-center">
                <img
                  src={images[selectedColor]}
                  className="max-h-[167px] max-w-[269px]"
                />
              </div>
              <div className="flex w-full flex-col items-center justify-center space-y-6">
                <div className="flex w-full items-center justify-center space-x-2">
                  <div className="flex items-center justify-center space-x-2">
                    <div
                      onClick={() => setSelectedColor("J")}
                      className={`h-[40px] w-[1px] cursor-pointer ${selectedColor == "J" ? "bg-black" : "bg-[#808080]"}`}
                    />
                    <div className="flex items-center justify-center space-x-2">
                      <div className="h-[15px] w-[1px] bg-[#808080]" />
                      <div className="h-[15px] w-[1px] bg-[#808080]" />
                      <div className="h-[15px] w-[1px] bg-[#808080]" />
                      <div className="h-[15px] w-[1px] bg-[#808080]" />
                      <div className="h-[15px] w-[1px] bg-[#808080]" />
                      <div className="h-[15px] w-[1px] bg-[#808080]" />
                      <div className="h-[15px] w-[1px] bg-[#808080]" />
                      <div className="h-[15px] w-[1px] bg-[#808080]" />
                      <div className="h-[15px] w-[1px] bg-[#808080]" />
                    </div>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <div
                      onClick={() => setSelectedColor("I")}
                      className={`h-[40px] w-[1px] cursor-pointer ${selectedColor == "I" ? "bg-black" : "bg-[#808080]"}`}
                    />
                    <div className="flex items-center justify-center space-x-2">
                      <div className="h-[15px] w-[1px] bg-[#808080]" />
                      <div className="h-[15px] w-[1px] bg-[#808080]" />
                      <div className="h-[15px] w-[1px] bg-[#808080]" />
                      <div className="h-[15px] w-[1px] bg-[#808080]" />
                      <div className="h-[15px] w-[1px] bg-[#808080]" />
                      <div className="h-[15px] w-[1px] bg-[#808080]" />
                      <div className="h-[15px] w-[1px] bg-[#808080]" />
                      <div className="h-[15px] w-[1px] bg-[#808080]" />
                      <div className="h-[15px] w-[1px] bg-[#808080]" />
                    </div>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <div
                      onClick={() => setSelectedColor("H")}
                      className={`h-[40px] w-[1px] cursor-pointer ${selectedColor == "H" ? "bg-black" : "bg-[#808080]"}`}
                    />
                    <div className="flex items-center justify-center space-x-2">
                      <div className="h-[15px] w-[1px] bg-[#808080]" />
                      <div className="h-[15px] w-[1px] bg-[#808080]" />
                      <div className="h-[15px] w-[1px] bg-[#808080]" />
                      <div className="h-[15px] w-[1px] bg-[#808080]" />
                      <div className="h-[15px] w-[1px] bg-[#808080]" />
                      <div className="h-[15px] w-[1px] bg-[#808080]" />
                      <div className="h-[15px] w-[1px] bg-[#808080]" />
                      <div className="h-[15px] w-[1px] bg-[#808080]" />
                      <div className="h-[15px] w-[1px] bg-[#808080]" />
                    </div>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <div
                      onClick={() => setSelectedColor("G")}
                      className={`h-[40px] w-[1px] cursor-pointer ${selectedColor == "G" ? "bg-black" : "bg-[#808080]"}`}
                    />
                    <div className="flex items-center justify-center space-x-2">
                      <div className="h-[15px] w-[1px] bg-[#808080]" />
                      <div className="h-[15px] w-[1px] bg-[#808080]" />
                      <div className="h-[15px] w-[1px] bg-[#808080]" />
                      <div className="h-[15px] w-[1px] bg-[#808080]" />
                      <div className="h-[15px] w-[1px] bg-[#808080]" />
                      <div className="h-[15px] w-[1px] bg-[#808080]" />
                      <div className="h-[15px] w-[1px] bg-[#808080]" />
                      <div className="h-[15px] w-[1px] bg-[#808080]" />
                      <div className="h-[15px] w-[1px] bg-[#808080]" />
                    </div>
                  </div>
                  <div
                    onClick={() => setSelectedColor("F")}
                    className={`h-[40px] w-[1px] cursor-pointer ${selectedColor == "F" ? "bg-black" : "bg-[#808080]"}`}
                  />
                </div>
                <ul className="flex w-full items-center justify-center space-x-20 text-[14px]">
                  <li
                    className="cursor-pointer"
                    onClick={() => setSelectedColor("J")}
                  >
                    J
                  </li>
                  <li
                    className="cursor-pointer"
                    onClick={() => setSelectedColor("I")}
                  >
                    I
                  </li>
                  <li
                    className="cursor-pointer"
                    onClick={() => setSelectedColor("H")}
                  >
                    H
                  </li>
                  <li
                    className="cursor-pointer"
                    onClick={() => setSelectedColor("G")}
                  >
                    G
                  </li>
                  <li
                    className="cursor-pointer"
                    onClick={() => setSelectedColor("F")}
                  >
                    F
                  </li>
                </ul>
              </div>
              <div className="flex w-full items-center justify-start">
                <p className="w-full text-[13px] tracking-widest text-[#808080]">
                  Over a billion years ago, deep beneath the Earth's surface,
                  carbon atoms bonded tightly under high temperatures and
                  extreme pressure, resulting in the world's hardest natural
                  mineral: diamond.
                </p>
              </div>
            </div>
            <div className="flex w-1/2 flex-col items-start justify-center space-y-6">
              <h2 className="text-[18px] font-semibold tracking-widest">
                Clarity
              </h2>
              <p className="text-[14px] tracking-widest">
                Clarity is about how clear a diamond is, without any internal
                flaws (called inclusions) or external marks (called blemishes).
                Diamonds with fewer flaws are rarer and more valuable. Clarity
                is graded from Flawless (no flaws) to Included (flaws visible to
                the naked eye).
              </p>
            </div>
          </div>
        </div>

        <div className="mt-60 flex flex-col items-center justify-center">
          <h3 className="text-[18px] font-semibold tracking-widest">Carat</h3>
          <div className="mt-20 flex items-center justify-center space-x-28 px-6">
            <div className="flex w-1/2 flex-col items-center justify-start space-y-6">
              <div className="relative flex w-full items-center justify-center">
                <img
                  src="/products/carat.png"
                  className="-z-10 max-w-[590px]"
                />
                <div className="absolute -right-4 top-1 z-10 bg-[#FFFFFF] bg-opacity-30 px-4 py-2 text-[12px] tracking-widest">
                  Actual Diamond Size on Size 6 Hand
                </div>
              </div>
              <div className="flex flex-col justify-start items-center w-full">
                <div className="w-full flex justify-between items-center">
                  <span className="text-[#666666] text-[14px]">0.0 CT</span>
                  <span className="text-[#666666] text-[14px]">2.00 CT</span>
                </div>
              <div className="w-full">
                <input type="range" min="0" max="2" step="0.1" className="w-full cursor-pointer costum-range" />
              </div>
              </div>
            </div>
            <div className="flex w-1/2 flex-col items-start justify-center space-y-6">
              <h2 className="text-[18px] font-semibold tracking-widest">
                Carat weight
              </h2>
              <p className="text-[14px] tracking-widest">
                Carat weight measures the size of a diamond. One carat equals
                200 milligrams. Bigger diamonds are rarer and often more
                expensive. However, a diamond's value also depends on its cut,
                color, and clarity, not just its size.
              </p>
            </div>
          </div>
        </div>
        <div className="mb-60 mt-60 flex items-center justify-center">
          <p className="max-w-[900px] text-[14px] tracking-widest">
            These four factors—cut, color, clarity, and carat weight—help
            determine a diamond's overall beauty and value, making it easier for
            you to choose the perfect diamond for your jewelry.
          </p>
        </div>
      </MaxWidthWrapper>

      <Footer />
    </>
  );
};

export default DiamondGuide;
