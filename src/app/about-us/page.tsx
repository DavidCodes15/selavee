"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar"
import {motion, useInView} from "framer-motion"
import { useRef } from "react";
const AboutUs = () => {
    return (
        <>
            <div className="absolute top-0 w-full">
                <div className="fixed w-full">
                <Navbar theme="dark" />
                </div>
            </div>

        <div className="relative -z-20">
            <FirstSection />
            <SecondSection />
            <ThirdSection />
            {/* <Footer /> */}
        </div>
        </>
    )
}

const FirstSection = () => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref);
    return <motion.div ref={ref}
            className="bg-[#AAF50B] h-screen -z-20 relative">
        <motion.div className="h-full w-full absolute top-0 left-0">
        <motion.div
            initial={{
            opacity: 1,
            }}
            animate={{ opacity: inView ? 0 : 1 }}
            transition={{
            duration: 1,
            }}
            className="flex justify-end mt-44">
            <div className="flex jusitfy-center items-center space-x-4">
                <img src="/products/about-us-first.png" className="lg:h-[270px] lg:w-[250px] xxl:h-[313px] xxl:w-[267px]" />
                <img src="/products/about-us-second.png" className="lg:h-[270px] lg:w-[250px] xxl:h-[313px] xxl:w-[267px]" />
                <img src="/products/about-us-third.png" className="lg:h-[270px] lg:w-[250px] xxl:h-[313px] xxl:w-[267px]" />
                </div>
        </motion.div>
            <motion.div
            animate={{
            y: inView ? "-55%" : "0",
            x: inView ? "50%" : "0",
            }}
            transition={{
            duration: 1,
            }}
            className="absolute h-full w-full top-[79%] left-5">
                
                    <span className="tracking-widest text-[100px] font-bold">No Bla Bla</span>
              
            </motion.div>
            <motion.div
            initial={{
                opacity: 0,
            }}
            whileInView={{
                opacity: 1,
            }}
            transition={{
                duration: 1,
            }}
            
            className="absolute h-full w-full top-[79%] left-5">
                    <div className="flex flex-col justify-center item-start space-y-6">
                        <span className="text-white tracking-widest font-semibold text-[14px]">WE ARE PROUD OF</span>
                        <span className="text-white tracking-widest text-[14px]">FREE DELIVERY, 234 LOYAL CUSTOMERS, 82 CATEGORIES</span>
                    </div>
            </motion.div>
            </motion.div>
        </motion.div>
}

const SecondSection = () => {
     return <motion.div
            className="bg-[#0020F5] h-screen -z-20 relative">
        <motion.div className="h-full w-full absolute top-0 left-0">
        <motion.div
            initial={{ opacity: 1 }}
                    whileInView={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true, amount: 1, }}
            className="flex justify-end mt-44">
            <div className="flex jusitfy-center items-center space-x-4">
                <img src="/products/about-us-first.png" className="lg:h-[270px] lg:w-[250px] xxl:h-[313px] xxl:w-[267px]" />
                <img src="/products/about-us-second.png" className="lg:h-[270px] lg:w-[250px] xxl:h-[313px] xxl:w-[267px]" />
                <img src="/products/about-us-third.png" className="lg:h-[270px] lg:w-[250px] xxl:h-[313px] xxl:w-[267px]" />
                </div>
        </motion.div>
            <motion.div
            initial={{ y: "0", x: "0" }}
                    whileInView={{
                        y: "-55%",
                        x: "50%",
                    }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true, }}
            className="absolute h-full w-full top-[79%] left-5">
                
                    <span className="tracking-widest text-[100px] font-bold">No Bla Bla</span>
              
            </motion.div>
            <motion.div
            initial={{
                opacity: 0,
            }}
            whileInView={{
                opacity: 1,
            }}
            transition={{
                duration: 1,
            }}
            
            className="absolute h-full w-full top-[79%] left-5">
                    <div className="flex flex-col justify-center item-start space-y-6">
                        <span className="text-white tracking-widest font-semibold text-[14px]">WE ARE PROUD OF</span>
                        <span className="text-white tracking-widest text-[14px]">FREE DELIVERY, 234 LOYAL CUSTOMERS, 82 CATEGORIES</span>
                    </div>
            </motion.div>
            </motion.div>
        </motion.div>
}

const ThirdSection = () => {
    return <motion.div
            className="relative bg-[#cccccc] h-screen -z-20">
        <motion.div className="h-full w-full absolute top-0 left-0">
        <motion.div
            
            initial={{ opacity: 1 }}
                    whileInView={{ opacity: 0 }}
                    transition={{ duration: 1}}
                    viewport={{ once: true, amount: 1 }}
            className="flex justify-end mt-44">
            <div className="flex jusitfy-center items-center space-x-4">
                <img src="/products/about-us-first.png" className="lg:h-[270px] lg:w-[250px] xxl:h-[313px] xxl:w-[267px]" />
                <img src="/products/about-us-second.png" className="lg:h-[270px] lg:w-[250px] xxl:h-[313px] xxl:w-[267px]" />
                <img src="/products/about-us-third.png" className="lg:h-[270px] lg:w-[250px] xxl:h-[313px] xxl:w-[267px]" />
                </div>
        </motion.div>
            <motion.div
           
            initial={{ y: "0", x: "0" }}
                    whileInView={{
                        y: "-55%",
                        x: "50%",
                    }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true, }}
            className="absolute h-full w-full top-[79%] left-5">
                
                    <span className="tracking-widest text-[100px] font-bold">No Bla Bla</span>
              
            </motion.div>
            <motion.div
            initial={{
                opacity: 0,
            }}
            whileInView={{
                opacity: 1,
            }}
            transition={{
                duration: 1,
            }}
            
            className="absolute h-full w-full top-[79%] left-5">
                    <div className="flex flex-col justify-center item-start space-y-6">
                        <span className="text-white tracking-widest font-semibold text-[14px]">WE ARE PROUD OF</span>
                        <span className="text-white tracking-widest text-[14px]">FREE DELIVERY, 234 LOYAL CUSTOMERS, 82 CATEGORIES</span>
                    </div>
            </motion.div>
            </motion.div>
        </motion.div>
}
export default AboutUs