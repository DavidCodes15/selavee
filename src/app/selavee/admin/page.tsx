"use client";
import React from "react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import jwt from "jsonwebtoken";
import ProductsPage from "../admin-components/products/page";
// import { checkAdmin } from "@/server/admin/admin-middleware";
import { getAdmin } from "@/server/admin/get-admin";
import AdminHome from "../admin-components/home/page";
// import { cookies } from "next/headers";
const DURATION = 0.25;
const STAGGER = 0.025;

const FlipLink = ({ children, href }: { children: string; href: string }) => {
  return (
    <motion.a
      initial="initial"
      whileHover="hovered"
      href={href}
      className="relative block overflow-hidden whitespace-nowrap text-4xl font-black uppercase sm:text-7xl md:text-8xl lg:text-[30px]"
      style={{
        lineHeight: 0.75,
      }}
    >
      <div>
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: {
                y: 0,
              },
              hovered: {
                y: "-100%",
              },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
      <div className="absolute inset-0">
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: {
                y: "100%",
              },
              hovered: {
                y: 0,
              },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
    </motion.a>
  );
};


const Page = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const router = useRouter();
    const [selectedSection, setSelectedSection] = useState("home");
    useEffect(() => {
      const checkAuthorization = async () => {
        try {
          const response = await getAdmin();
          if(response?.user && response?.success){
                  setIsAuthenticated(true);
                  setIsAuthorized(true);
                } else{
                  router.push("/");
                }

        } catch {
          router.push("/");
        }
      }
      checkAuthorization();

    }, [router])

  const handleClick = (section: string) => {
    setSelectedSection(section);
  };
  if (!isAuthenticated || !isAuthorized) {
    return null; // or a loading spinner
  }


  return (
    <>
   <div className="w-full min-h-screen">
        <div className="w-full flex justify-around items-center space-x-4 border-b-[2px] border-white border-solid py-2">
          <div className="cursor-pointer">
            <span
              onClick={() => handleClick("home")}
              className={selectedSection === "home" ? "text-black" : "text-black font-semibold"}
            >
              <FlipLink href="#">Home</FlipLink>
            </span>
          </div>
          <div className="cursor-pointer">
            <span
              onClick={() => handleClick("users")}
              className={selectedSection === "users" ? "text-black" : "text-black font-semibold"}
            >
              <FlipLink href="#">users</FlipLink>
            </span>
          </div>
          <div className="cursor-pointer">
            <span
              onClick={() => handleClick("products")}
              className={selectedSection === "products" ? "text-black" : "text-black font-semibold"}
            >
              <FlipLink href="#">Products</FlipLink>
            </span>
          </div>
          <div className="cursor-pointer">
            <span
              onClick={() => handleClick("analytics")}
              className={selectedSection === "analytics" ? "text-black" : "text-black font-semibold"}
            >
              <FlipLink href="#">Analytics</FlipLink>
            </span>
          </div>
        </div>
        {selectedSection == "home" && (
          <div className="w-full h-full mt-96 flex justify-center items-center">
          {/* <h1 className="tracking-widest text-[24px]">Admin Dashboard</h1> */}
          <AdminHome />
        </div>
        )}
        {selectedSection == "users" && (
          <div className="w-full h-full mt-96 flex justify-center items-center">
          <h1 className="tracking-widest text-[24px]">Users Dashboard</h1>
        </div>
        )}
        {selectedSection == "products" && (
          <ProductsPage/>
        )}
        {selectedSection == "analytics" && (
          <div className="w-full h-full mt-96 flex justify-center items-center">
          <h1 className="tracking-widest text-[24px]">Analytics Dashboard</h1>
        </div>
        )}
       
      </div>
    </>
  )

}

export default Page