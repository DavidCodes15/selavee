"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";

const AutomaticTheme = () => {
const pathname = usePathname();
const [isScrolled, setIsScrolled] = useState(false);
const [scrollPosition, setScrollPosition] = useState(0);

  // Define the scroll threshold for theme change
  const scrollThreshold = 950;
  // Define routes that should have a dark theme
  const darkThemeRoutes = [
    "/about-us",
    "/contact",
    "/products/best-seller",
    "/products/bracelets",
    "/products/dynamic/product/earrings",
    "/products/earrings",
    "/products/necklaces",
    "/products/new-in",
    "/products/rings",
    "/products/sale",
    "/client-care/diamond-guide",
    "/sign-up",
    "/products/product",
    "/bag",
    "/liked-products",
    "/payment-success",
    "/profile",
    "/checkout",
    "/profile/stripe",
    "/parcelpro/bag",
  ];
  const initialTheme: "dark" | "light" = darkThemeRoutes.includes(pathname) ? "dark" : "light";
  const [theme, setTheme] = useState(initialTheme);
  
  // Update the scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Adjust theme based on the scroll position and threshold on the main page
  useEffect(() => {
    if (pathname === "/") {
      setTheme(scrollPosition > scrollThreshold ? "dark" : "light");
    } else {
      setTheme("dark"); // Other pages have a dark theme by default
    }
  }, [scrollPosition, pathname]);

  // Determine the theme based on the current route
  // const baseTheme = darkThemeRoutes.includes(pathname) ? "dark" : "light";

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setIsScrolled(window.scrollY > 950); // Adjust scroll threshold as needed
  //   };

  //   if (pathname === "/") {
  //     window.addEventListener("scroll", handleScroll);
  //   }

  //   return () => {
  //     if (pathname === "/") {
  //       window.removeEventListener("scroll", handleScroll);
  //     }
  //   };
  // }, [pathname]);

  // // const theme = darkThemeRoutes.includes(pathname) ? "dark" : "light";
  // const theme = pathname === "/" && isScrolled ? "dark" : baseTheme;
  if (pathname == "/selavee/admin"){
    return null
  }
  if (pathname == "/selavee/inner"){
    return null
  }
  if (pathname == "/selavee/inner/test"){
    return null
  }
  return (
    <Navbar theme={theme} />
  )
}


  export default AutomaticTheme