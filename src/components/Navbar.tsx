"use client";
import { useState } from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import Image from "next/image";
interface NavbarProps {
  theme: "light" | "dark";
}

const Navbar: React.FC<NavbarProps> = ({ theme }) => {
  // const [isNecklaceOpen, setIsNecklaceOpen] = useState(false);
  // const [isBraceletOpen, setIsBraceletOpen] = useState(false);
  // const [isRingsOpen, setIsRingsOpen] = useState(false);
  // const [isEarringsOpen, setIsEarringsOpen] = useState(false);
  const [isToggle, setIsToggle] = useState(false);
  // const toggleNecklaceMenu = () => setIsNecklaceOpen(!isNecklaceOpen);
  // const toggleBraceletMenu = () => setIsBraceletOpen(!isBraceletOpen);
  // const toggleRingsMenu = () => setIsRingsOpen(!isRingsOpen);
  // const toggleEarringsMenu = () => setIsEarringsOpen(!isEarringsOpen);

  const [openMenuItem, setOpenMenuItem] = useState<string | null>(null);

  const handleMenuItemClick = (menuItem: "necklaces" | "bracelets" | "rings" | "earrings") => {
    // if (openMenuItem === menuItem) {
    //   setOpenMenuItem(null);
    // } else {
    //   setOpenMenuItem(() => menuItem);
    // }
    if (openMenuItem === menuItem) {
      setOpenMenuItem(null);
    } else {
      setOpenMenuItem(menuItem);
    }
  };
  // const iconColor = theme === "dark" ? "black" : "white";

  const iconColor = theme === "dark" && !isToggle ? "black" : "white";

  return (
    <div className="inset-x-0 z-50 h-16 bg-transparent">
      <header className="relative bg-transparent">
        <MaxWidthWrapper className="py-10">
          {/* flex h-16 items-center justify-between */}
          <div className="flex w-full justify-center">
            {/* mt-[10px] flex justify-center */}
            <div
              id="menu"
              className={`mt-[20px] flex flex-1 justify-start -space-x-2`}
            >
              <div className="icon-wrapper">
                <button
                  id="hamburger-menu"
                  className={`hamburger icon flex h-16 w-16 cursor-pointer focus:outline-none md:pt-0`}
                  onClick={() => setIsToggle(!isToggle)}
                >
                  <span
                    className="hamburger-top absolute left-0 top-5 h-[2px] w-10 bg-white"
                    style={{ backgroundColor: iconColor }}
                  ></span>
                  <span
                    className="hamburger-bottom absolute left-0 top-5 h-[2px] w-10 bg-white"
                    style={{ backgroundColor: iconColor }}
                  ></span>
                </button>
              </div>
              <div className="mt-[15px] block lg:hidden">
                <img
                  src="/icons/search.svg"
                  className="icon h-[18px] w-[19px]"
                  alt="search"
                  style={{
                    filter: theme === "dark" ? "invert(1)" : "invert(0)",
                  }}
                />
              </div>
              {/** menu */}
              <div
                className={`absolute top-0 z-10 flex h-screen w-screen md:w-fit flex-col items-start bg-black pl-4 ${isToggle ? "sidenav active" : "sidenav"}`}
              >
              
                <div className="mt-16 flex flex-col flex-1 items-start justify-center pr-16">
                <div className="flex flex-1">
                  <button
                    className={`hamburger flex h-16 w-16 cursor-pointer focus:outline-none md:pt-0 open`}
                    onClick={() => setIsToggle(!isToggle)}
                  >
                    <span
                      className="hamburger-top absolute left-0 top-5 h-[2px] w-10 bg-white"
                      style={{ backgroundColor: iconColor }}
                    ></span>
                    <span
                      className="hamburger-bottom absolute left-0 top-5 h-[2px] w-10 bg-white"
                      style={{ backgroundColor: iconColor }}
                    ></span>
                  </button>
                </div>
                  <ul className="flex w-full flex-col items-start justify-center sm:space-y-2 lg:space-y-4">
                    <Link href="/products/new-in">
                    <li className="cursor-pointer lg:text-[16px] xl:text-[20px] font-semibold tracking-widest text-white">
                      New In
                    </li>
                    </Link>
                    <Link href="/products/best-seller">
                    <li className="cursor-pointer lg:text-[16px] xl:text-[20px] font-semibold tracking-widest text-white">
                      Best Seller
                    </li>
                    </Link>
                    <li className="flex flex-col items-start justify-center space-y-2">
                      <div className="flex items-center justify-start space-x-4">
                        <span className="cursor-pointer lg:text-[16px] xl:text-[20px] font-semibold tracking-widest text-white">
                         <Link href="/products/necklaces">Necklaces</Link>
                        </span>
                        <span>
                          <img
                            src="/icons/menu-arrow.svg"
                            className={`h-[6px] w-[12px] cursor-pointer`}
                            style={{
                              transform: openMenuItem === "necklaces" ? "rotate(0deg)" : "rotate(180deg)",
                            }}
                            onClick={() => handleMenuItemClick("necklaces")}
                            // style={{
                            //   transform: isNecklaceOpen
                            //     ? "rotate(0deg)"
                            //     : "rotate(180deg)",
                            // }}
                            // onClick={toggleNecklaceMenu}
                          />
                        </span>
                      </div>
                      {/**isNecklaceOpen && () */}
                      {openMenuItem === "necklaces" && (
                        <div>
                          <ul className="flex flex-col items-start justify-center space-y-2 text-[14px] text-white tracking-widest">
                            <li className="cursor-pointer">All Necklaces</li>
                            <li className="cursor-pointer">
                              Pendant Necklaces
                            </li>
                            <li className="cursor-pointer">
                              Diamond Necklaces
                            </li>
                            <li className="cursor-pointer">
                              Gemstone Necklaces
                            </li>
                            <li className="cursor-pointer">Tennis Necklaces</li>
                            <li className="cursor-pointer">
                              Drilled Diamond Necklaces
                            </li>
                          </ul>
                        </div>
                      )}
                    </li>
                    <li className="flex flex-col items-start justify-center space-y-2">
                      <div className="flex items-center justify-start space-x-4">
                        <span className="cursor-pointer lg:text-[16px] xl:text-[20px] font-semibold tracking-widest text-white">
                          <Link href="/products/bracelets">Bracelets</Link>
                        </span>
                        <span>
                          <img
                            src="/icons/menu-arrow.svg"
                            className="h-[6px] w-[12px] cursor-pointer"
                            style={{
                              transform: openMenuItem === "bracelets" ? "rotate(0deg)" : "rotate(180deg)",
                            }}
                            onClick={() => handleMenuItemClick("bracelets")}
                            // style={{
                            //   transform: isBraceletOpen
                            //     ? "rotate(0deg)"
                            //     : "rotate(180deg)",
                            // }}
                            // onClick={toggleBraceletMenu}
                          />
                        </span>
                      </div>
                      {/**isBraceletOpen */}
                      {openMenuItem === "bracelets" && (
                        <div>
                          <ul className="flex flex-col items-start justify-center space-y-2 text-[14px] tracking-widest text-white">
                            <li className="cursor-pointer">All Bracelets</li>
                            <li className="cursor-pointer">
                              Pendant Bracelets
                            </li>
                            <li className="cursor-pointer">
                              Diamond Bracelets
                            </li>
                            <li className="cursor-pointer">
                              Gemstone Bracelets
                            </li>
                            <li className="cursor-pointer">Tennis Bracelets</li>
                            <li className="cursor-pointer">
                              Drilled Diamond Bracelets
                            </li>
                          </ul>
                        </div>
                      )}
                    </li>
                    <li className="flex flex-col items-start justify-center space-y-2">
                      <div className="flex items-center justify-start space-x-4">
                        <span className="cursor-pointer lg:text-[16px] xl:text-[20px] font-semibold tracking-widest text-white">
                          <Link href="/products/rings">Rings</Link>
                        </span>
                        <span>
                          <img
                            src="/icons/menu-arrow.svg"
                            className="h-[6px] w-[12px] cursor-pointer"
                            style={{
                              transform: openMenuItem === "rings" ? "rotate(0deg)" : "rotate(180deg)",
                            }}
                            onClick={() => handleMenuItemClick("rings")}
                            // style={{
                            //   transform: isRingsOpen
                            //     ? "rotate(0deg)"
                            //     : "rotate(180deg)",
                            // }}
                            // onClick={toggleRingsMenu}
                          />
                        </span>
                      </div>
                      {/**isRingsOpen */}
                      {openMenuItem === "rings" && (
                        <div>
                          <ul className="flex flex-col items-start justify-center space-y-2 text-[14px] tracking-widest text-white">
                            <li className="cursor-pointer">All Rings</li>
                            <li className="cursor-pointer">Pendant Rings</li>
                            <li className="cursor-pointer">Diamond Rings</li>
                            <li className="cursor-pointer">Gemstone Rings</li>
                            <li className="cursor-pointer">Tennis Rings</li>
                            <li className="cursor-pointer">
                              Drilled Diamond Rings
                            </li>
                          </ul>
                        </div>
                      )}
                    </li>
                    <li className="flex flex-col items-start justify-center space-y-2">
                      <div className="flex items-center justify-start space-x-4">
                        <span className="cursor-pointer lg:text-[16px] xl:text-[20px] font-semibold tracking-widest text-white">
                          <Link href="/products/earrings">Earrings</Link>
                        </span>
                        <span>
                          <img
                            src="/icons/menu-arrow.svg"
                            className="h-[6px] w-[12px] cursor-pointer"
                            style={{
                              transform: openMenuItem === "earrings" ? "rotate(0deg)" : "rotate(180deg)",
                            }}
                            onClick={() => handleMenuItemClick("earrings")}
                            // style={{
                            //   transform: isEarringsOpen
                            //     ? "rotate(0deg)"
                            //     : "rotate(180deg)",
                            // }}
                            // onClick={toggleEarringsMenu}
                          />
                        </span>
                      </div>
                      {/**isEarringsOpen */}
                      {openMenuItem === "earrings" && (
                        <div>
                          <ul className="flex flex-col items-start justify-center space-y-2 text-[14px] tracking-widest text-white">
                            <li className="cursor-pointer">All Earrings</li>
                            <li className="cursor-pointer">Pendant Earrings</li>
                            <li className="cursor-pointer">Diamond Earrings</li>
                            <li className="cursor-pointer">
                              Gemstone Earrings
                            </li>
                            <li className="cursor-pointer">Tennis Earrings</li>
                            <li className="cursor-pointer">
                              Drilled Diamond Earrings
                            </li>
                          </ul>
                        </div>
                      )}
                    </li>
                    <li className="cursor-pointer text-[20px] font-semibold tracking-widest text-white">
                      <Link href="/products/sale">Sale</Link>
                    </li>
                  </ul>
                </div>
                <div className="flex flex-1 w-full items-end justify-start">
                  <ul className="w-full sm:space-y-2 lg:space-y-4 border-t-[1px] border-solid border-[#4D4D4D] pt-6">
                    <li className="cursor-pointer lg:text-[16px] xl:text-[20px] font-semibold tracking-widest text-white">
                     <Link href="/about-us">About Us</Link>
                    </li>
                    <li className="cursor-pointer lg:text-[16px] xl:text-[20px] font-semibold tracking-widest text-white">
                     <Link href="/contact">Contact Us</Link>
                    </li>
                    <li className="cursor-pointer lg:text-[14px] xl:text-[16px] tracking-widest text-[#B3B3B3]">
                      Legal Terms
                    </li>
                    <li className="cursor-pointer lg:text-[14px] xl:text-[16px] tracking-widest text-[#B3B3B3]">
                      FAQ
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* icon-wrapper items-center justify-center lg:flex */}
            <div
              id="logo"
              className="icon-wrapper max-w-1/3 flex flex-1 items-center justify-center"
            >
              <Link href="/">
                        {/** block icon sm:w-[70px] md:w-[80px] lg:w-[90px] xl:w-[93px] lg:hidden */}
                <img className="hidden lg:block icon" src={theme === 'dark' ? "/black_logo.svg" : "icons/white-logo.svg"} />
                <img className="sm:block icon lg:hidden" src="/logo.svg" style={{
                    filter: theme === "dark" ? "invert(1)" : "invert(0)",
                  }}/>
              </Link>
            </div>

            {/* flex items-center justify-center */}
            <div id="icons" className="flex flex-1 items-center justify-end">
              <ul className="flex items-center justify-center space-x-4 md:space-x-6">
                <li className="icon-wrapper hidden cursor-pointer lg:block">
                  <img
                    src="/icons/search.svg"
                    className="icon h-[18px] w-[19px]"
                    alt="search"
                    style={{
                      filter: theme === "dark" ? "invert(1)" : "invert(0)",
                    }}
                  />
                </li>
                <li className="icon-wrapper cursor-pointer">
                  <Image
                    src="/icons/heart.svg"
                    className="icon"
                    width={24}
                    height={18.8}
                    alt="heart"
                    style={{
                      filter: theme === "dark" ? "invert(1)" : "invert(0)",
                    }}
                  />
                </li>
                <li className="icon-wrapper hidden cursor-pointer md:block">
                  <Image
                    src="/icons/user.svg"
                    className="icon"
                    width={15}
                    height={23}
                    alt="user"
                    style={{
                      filter: theme === "dark" ? "invert(1)" : "invert(0)",
                    }}
                  />
                </li>
                <li className="icon-wrapper cursor-pointer">
                  <Image
                    src="/icons/bag.svg"
                    className="icon"
                    width={16}
                    height={22}
                    alt="bag"
                    style={{
                      filter: theme === "dark" ? "invert(1)" : "invert(0)",
                    }}
                  />
                </li>
              </ul>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};

export default Navbar;
