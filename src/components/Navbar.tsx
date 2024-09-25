"use client";
import { useState, useEffect } from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import Image from "next/image";
interface NavbarProps {
  theme: "light" | "dark";
}
import { getAuthUser } from "@/server/get-auth-user";

import { usePathname } from "next/navigation";
import UserAccountNav from "./UserAccountNav";
import Bag from "./dropdown/Bag";
import LikedProducts from "./dropdown/LikedProducts";
type User = {
  _id: string;
  email?: string;
  [key: string]: any;
};
const Navbar: React.FC<NavbarProps> = ({ theme }) => {
  const [isToggle, setIsToggle] = useState(false);

  const [openMenuItem, setOpenMenuItem] = useState<string | null>(null);
  const pathname = usePathname();
  const [user, setUser] = useState<User | "not authorized" | null>(null);
  const [fetched, setFetched] = useState(false);
  useEffect(() => {
    // Reset the state of the hamburger menu when the page changes
    setIsToggle(false);
    setOpenMenuItem(null);
  }, [pathname]);
  const handleClick = () => {
    setFetched(!fetched);
  }
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = (await getAuthUser({
          shouldRedirect: false,
        })) as unknown as User;
        if (user && typeof user !== "string") {
          setUser(user);
        } else {
          setUser("not authorized");
        }
      } catch (error) {
        setUser("not authorized");
      } 
    };

    fetchUser();
  }, [fetched])

  const handleMenuItemClick = (menuItem: "necklaces" | "bracelets" | "rings" | "earrings") => {
    if (openMenuItem === menuItem) {
      setOpenMenuItem(null);
    } else {
      setOpenMenuItem(menuItem);
    }
  };

  const iconColor = theme === "dark" && !isToggle ? "black" : "white";
  // const [isScrolled, setIsScrolled] = useState(false);
  // const [isScrolled, setIsScrolled] = useState(false);
  // const [backgroundColor, setBackgroundColor] = useState<string>('white');
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const navbar = document.getElementById('navbar');
  //     const scrollPosition = window.scrollY;
  //     const navbarHeight = navbar?.offsetHeight;
  //     const threshold = 1000; // adjust this value to change the scroll position
  //     if(navbarHeight) {
  //       if (scrollPosition > threshold - navbarHeight) {
  //         setIsScrolled(true);
  //         setBackgroundColor('white');
  //       } else {
  //         setIsScrolled(false);
  //         setBackgroundColor('black');
  //       }
  //     }
      
  //   };

  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);
  // const navbarTheme = backgroundColor === 'white' ? 'dark' : 'light';
    // useEffect(() => {
  //   const handleScroll = () => {
  //     const navbar = document.getElementById('navbar');
  //     const scrollPosition = window.scrollY;
  //     const navbarHeight = navbar?.offsetHeight;
  //     const threshold = 1000; // adjust this value to change the scroll position
  //     if(navbarHeight) {
  //       if (scrollPosition > threshold - navbarHeight) {
  //         setIsScrolled(true);
  //       } else {
  //         setIsScrolled(false);
  //       }
  //     }
      
  //   };

  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);
  return (
    <div
      className="inset-x-0 z-50 h-16 bg-transparent fixed">
      <header id="navbar" className="relative">
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
                  className={`hamburger logohover flex h-16 w-16 cursor-pointer focus:outline-none md:pt-0`}
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
                className={`absolute top-0 z-10 flex h-screen w-screen md:w-[300px] flex-col items-start bg-black pl-4 ${isToggle ? "sidenav active" : "sidenav"}`}
              >
              
                <div className="w-full mt-16 flex flex-col flex-1 items-start justify-center pr-16">
                <div className="w-full flex flex-1 justify-end">
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
                        <span onClick={() => handleMenuItemClick("necklaces")} className="cursor-pointer lg:text-[16px] xl:text-[20px] font-semibold tracking-widest text-white">
                         Necklaces
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
                            <li className="cursor-pointer">
                              <Link href="/products/necklaces">All Necklaces</Link></li>
                            <li className="cursor-pointer">
                              <Link href="/products/necklaces?style=pendant">Pendant Necklaces</Link>
                            </li>
                            <li className="cursor-pointer">
                              <Link href="/products/necklaces?style=diamond">Diamond Necklaces</Link>
                            </li>
                            <li className="cursor-pointer">
                            <Link href="/products/necklaces?style=gemstone">Gemstone Necklaces</Link>
                            </li>
                            <li className="cursor-pointer">
                            <Link href="/products/necklaces?style=tennis">Tennis Necklaces</Link>
                              </li>
                            <li className="cursor-pointer">
                            <Link href="/products/necklaces?style=drilled-diamond">Drilled Diamond Necklaces</Link> 
                            </li>
                          </ul>
                        </div>
                      )}
                    </li>
                    <li className="flex flex-col items-start justify-center space-y-2">
                      <div className="flex items-center justify-start space-x-4">
                        <span onClick={() => handleMenuItemClick("bracelets")} className="cursor-pointer lg:text-[16px] xl:text-[20px] font-semibold tracking-widest text-white">
                          Bracelets
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
                            <li className="cursor-pointer">
                            <Link href="/products/bracelets">All Bracelets</Link>
                              </li>
                            <li className="cursor-pointer">
                            <Link href="/products/bracelets?style=pendant"></Link>Pendant Bracelets
                            </li>
                            <li className="cursor-pointer">
                            <Link href="/products/bracelets?style=diamond"></Link>Diamond Bracelets
                            </li>
                            <li className="cursor-pointer">
                            <Link href="/products/bracelets?style=gemstone">Gemstone Bracelets</Link>
                            </li>
                            <li className="cursor-pointer">
                            <Link href="/products/bracelets?style=tennis">Tennis Bracelets</Link>

                            </li>
                            <li className="cursor-pointer">
                            <Link href="/products/bracelets?style=drilled-diamond">Drilled Diamond Bracelets</Link>
                            </li>
                          </ul>
                        </div>
                      )}
                    </li>
                    <li className="flex flex-col items-start justify-center space-y-2">
                      <div className="flex items-center justify-start space-x-4">
                        <span onClick={() => handleMenuItemClick("rings")} className="cursor-pointer lg:text-[16px] xl:text-[20px] font-semibold tracking-widest text-white">
                          Rings
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
                            <li className="cursor-pointer">
                            <Link href="/products/rings">All Rings</Link>
                              </li>
                            <li className="cursor-pointer">
                            <Link href="/products/rings?style=pendant">Pendant Rings</Link>
                              </li>
                            <li className="cursor-pointer">
                            <Link href="/products/rings?style=diamond">Diamond Rings</Link>
                              </li>
                            <li className="cursor-pointer">
                            <Link href="/products/rings?style=gemstone">Gemstone Rings</Link>
                              </li>
                            <li className="cursor-pointer">
                            <Link href="/products/rings?style=tennis">Tennis Rings</Link>
                              </li>
                            <li className="cursor-pointer">
                            <Link href="/products/rings?style=drilled-diamond">Drilled Diamond Rings</Link>
                            </li>
                          </ul>
                        </div>
                      )}
                    </li>
                    <li className="flex flex-col items-start justify-center space-y-2">
                      <div className="flex items-center justify-start space-x-4">
                        <span onClick={() => handleMenuItemClick("earrings")} className="cursor-pointer lg:text-[16px] xl:text-[20px] font-semibold tracking-widest text-white">
                          Earrings
                        </span>
                        <span>
                          <img
                            src="/icons/menu-arrow.svg"
                            className="h-[6px] w-[12px] cursor-pointer"
                            style={{
                              transform: openMenuItem === "earrings" ? "rotate(0deg)" : "rotate(180deg)",
                            }}
                            onClick={() => handleMenuItemClick("earrings")}
                          />
                        </span>
                      </div>
                      {/**isEarringsOpen */}
                      {openMenuItem === "earrings" && (
                        <div>
                          <ul className="flex flex-col items-start justify-center space-y-2 text-[14px] tracking-widest text-white">
                            <li className="cursor-pointer">
                            <Link href="/products/earrings">All Earrings</Link>
                              </li>
                            <li className="cursor-pointer">
                            <Link href="/products/earrings?style=pendant"> Pendant Earrings</Link>
                              </li>
                            <li className="cursor-pointer">
                            <Link href="/products/earrings?style=diamond">Diamond Earrings</Link>
                              </li>
                            <li className="cursor-pointer">
                            <Link href="/products/earrings?style=gemstone"> Gemstone Earrings</Link>
                            </li>
                            <li className="cursor-pointer">
                            <Link href="/products/earrings?style=tennis">Tennis Earrings</Link>
                              </li>
                            <li className="cursor-pointer">
                            <Link href="/products/earrings?style=drilled-diamond">Drilled Diamond Earrings</Link>
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
                <div className="flex flex-1 w-full items-center justify-start">
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
                <img className="sm:block logohover lg:hidden" src="/logo.svg" style={{
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
                  <LikedProducts theme={theme} user={user}/>
                </li>
                <li onClick={handleClick} className="icon-wrapper hidden cursor-pointer md:block">
                 <UserAccountNav theme={theme} user={user}/>
                </li>
                <li className="icon-wrapper cursor-pointer">
                
                    <Bag theme={theme} user={user} />
                 
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
