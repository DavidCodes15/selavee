"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

const AutomaticTheme = () => {
const pathname = usePathname();

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
    "/sign-up"
  ];

  // Determine the theme based on the current route
  const theme = darkThemeRoutes.includes(pathname) ? "dark" : "light";
  if (pathname == "/selavee/admin"){
    return null
  }
  return (
    <Navbar theme={theme} />
  )
}


  export default AutomaticTheme