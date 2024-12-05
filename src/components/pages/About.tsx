"use client";

import { trpc } from "@/app/trpc/client";
import { useMotionValue, motion, useSpring, useTransform } from "framer-motion";
import React, { useRef, useState } from "react";
const About = () => {
    const { data, isLoading } = trpc.product.fetchAboutUsText.useQuery();
    console.log(data);
    const [isHover, setIsHover] = useState(0);
    const ref = useRef<HTMLAnchorElement | null>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);
    const top = useTransform(mouseYSpring, [0.5, -0.5], ["40%", "60%"]);
    const left = useTransform(mouseXSpring, [0.5, -0.5], ["60%", "70%"]);
    const handleMouseMove = (
        e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    ) => {
        const rect = ref.current!.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };
    return (
        <>
            {isLoading ? (
                <>Loading</>
            ) : (
                <>
                {data?.texts.length === 0 ? (
                    null
                ): (
                    <>
                    <div className="mb-60 mt-60 flex w-full flex-col items-center justify-center space-y-28">
                        <div className="flex w-full items-center justify-center">
                            <h1 className="text-[18px] font-semibold tracking-widest">
                                About us
                            </h1>
                        </div>
                        <div
                            id="grid"
                            className="grid w-full grid-cols-1 sm:gap-x-0 sm:gap-y-12 md:grid-cols-2 md:gap-x-10 md:gap-y-12 lg:gap-x-16 lg:gap-y-28 xl:gap-28"
                            style={{
                                display: "grid",
                                placeContent: "center",
                            }}
                        >
                            <motion.a
                                ref={ref}
                                initial="initial"
                                whileHover="whileHover"
                                onMouseMove={handleMouseMove}
                                onMouseEnter={() => setIsHover(1)}
                                onMouseLeave={() => setIsHover(0)}
                                className="relative flex flex-1 cursor-pointer flex-col items-start justify-center space-y-6 md:pl-5 lg:pl-6 xl:pl-14"
                            >
                                <span
                                    className={`w-fit transition duration-500 ease-in-out sm:px-2 lsm:px-4 md:px-0 ${isHover == 1 ? "bg-black px-2 font-bold text-white" : "bg-transparent font-bold text-black"} sm:text-[22px] lsm:text-[24px] md:text-[20px] lg:text-[22px] xl:text-[24px]`}
                                >
                                    01
                                </span>

                                {/* <div className="sm:w-full sm:px-2 lsm:px-4 md:w-[350px] md:px-0 lg:w-[350px] xl:w-[450px]">
                                    <p className="w-[100px] text-left leading-6 tracking-widest sm:text-[13px] lsm:text-[14px] md:text-[11px] lg:text-[12px] xl:text-[14px]">

                                        {data?.texts[0].firstText}
                                    </p>
                                </div> */}
                                  <div className="sm:w-full sm:px-2 lsm:px-4 md:w-[350px] md:px-0 lg:w-[350px] xl:w-[450px]">
                                        <div
                                            className="w-[100px] text-left leading-6 tracking-widest sm:text-[13px] lsm:text-[14px] md:text-[11px] lg:text-[12px] xl:text-[14px]"
                                            dangerouslySetInnerHTML={{
                                                __html: data?.texts[0].firstText || "",
                                            }}
                                        />
                                    </div>

                                <motion.img
                                    style={{
                                        top,
                                        left,
                                        translateX: "-50%",
                                        translateY: "-50%",
                                    }}
                                    variants={{
                                        initial: { scale: 0, rotate: "-12.5deg" },
                                        whileHover: { scale: 1, rotate: "12.5deg" },
                                    }}
                                    transition={{ type: "spring" }}
                                    src={data?.texts[0].firstProduct}
                                    className="absolute  z-0 rounded-lg object-cover h-[300px] w-fit"
                                />
                            </motion.a>
                            <motion.a
                                ref={ref}
                                initial="initial"
                                whileHover="whileHover"
                                onMouseMove={handleMouseMove}
                                onMouseEnter={() => setIsHover(2)}
                                onMouseLeave={() => setIsHover(0)}
                                className="relative flex flex-1 cursor-pointer flex-col items-start justify-end space-y-6 text-left md:pl-5 lg:pl-6 xl:pl-14"
                            >
                                <span
                                    className={`transition duration-500 ease-in-out sm:px-2 lsm:px-4 md:px-0 ${isHover == 2 ? "bg-black px-2 font-bold text-white" : "bg-transparent font-bold text-black"} sm:text-[22px] lsm:text-[24px] md:text-[20px] lg:text-[22px] xl:text-[24px]`}
                                >
                                    02
                                </span>
                                {/* <div className="sm:w-full sm:px-2 lsm:px-4 md:max-w-[350px] md:px-0 lg:max-w-[350px] xl:max-w-[450px]">
                                    <p className="w-full leading-6 tracking-widest sm:text-[13px] lsm:text-[14px] md:text-[11px] lg:text-[12px] xl:text-[14px]">
                                        {data?.texts[0].secondText}
                                    </p>
                                </div> */}
                                <div className="sm:w-full sm:px-2 lsm:px-4 md:w-[350px] md:px-0 lg:w-[350px] xl:w-[450px]">
                                        <div
                                            className="w-[100px] text-left leading-6 tracking-widest sm:text-[13px] lsm:text-[14px] md:text-[11px] lg:text-[12px] xl:text-[14px]"
                                            dangerouslySetInnerHTML={{
                                                __html: data?.texts[0].secondText || "",
                                            }}
                                        />
                                    </div>
                                <motion.img
                                    style={{
                                        top,
                                        left,
                                        translateX: "-50%",
                                        translateY: "-50%",
                                    }}
                                    variants={{
                                        initial: { scale: 0, rotate: "-12.5deg" },
                                        whileHover: { scale: 1, rotate: "12.5deg" },
                                    }}
                                    transition={{ type: "spring" }}
                                    src={data?.texts[0].secondProduct}
                                    className="absolute z-0 rounded-lg object-cover h-[300px] w-fit"
                                />

                            </motion.a>
                            <motion.a
                                ref={ref}
                                initial="initial"
                                whileHover="whileHover"
                                onMouseMove={handleMouseMove}
                                onMouseEnter={() => setIsHover(3)}
                                onMouseLeave={() => setIsHover(0)}
                                className="relative flex flex-1 cursor-pointer flex-col items-start justify-center space-y-6 md:pl-5 lg:pl-6 xl:pl-14"
                            >
                                <span
                                    className={`transition duration-500 ease-in-out sm:px-2 lsm:px-4 md:px-0 ${isHover == 3 ? "bg-black px-2 font-bold text-white" : "bg-transparent font-bold text-black"} sm:text-[22px] lsm:text-[24px] md:text-[20px] lg:text-[22px] xl:text-[24px]`}
                                >
                                    03
                                </span>
                                {/* <div className="sm:w-full sm:px-2 lsm:px-4 md:max-w-[350px] md:px-0 lg:max-w-[350px] xl:max-w-[450px]">
                                    <p className="w-full text-left leading-6 tracking-widest sm:text-[13px] lsm:text-[14px] md:text-[11px] lg:text-[12px] xl:text-[14px]">
                                    {data?.texts[0].thirdText}
                                    </p>
                                </div> */}
                                <div className="sm:w-full sm:px-2 lsm:px-4 md:w-[350px] md:px-0 lg:w-[350px] xl:w-[450px]">
                                        <div
                                            className="w-[100px] text-left leading-6 tracking-widest sm:text-[13px] lsm:text-[14px] md:text-[11px] lg:text-[12px] xl:text-[14px]"
                                            dangerouslySetInnerHTML={{
                                                __html: data?.texts[0].thirdText || "",
                                            }}
                                        />
                                    </div>

                                <motion.img
                                    style={{
                                        top,
                                        left,
                                        translateX: "-50%",
                                        translateY: "-50%",
                                    }}
                                    variants={{
                                        initial: { scale: 0, rotate: "-12.5deg" },
                                        whileHover: { scale: 1, rotate: "12.5deg" },
                                    }}
                                    transition={{ type: "spring" }}
                                    src={data?.texts[0].thirdProduct}
                                    className="absolute z-0 rounded-lg object-cover h-[300px] w-fit"
                                />
                            </motion.a>
                            <motion.a
                                ref={ref}
                                initial="initial"
                                whileHover="whileHover"
                                onMouseMove={handleMouseMove}
                                onMouseEnter={() => setIsHover(4)}
                                onMouseLeave={() => setIsHover(0)}
                                className="relative flex flex-1 cursor-pointer flex-col items-start justify-end space-y-6 text-left md:pl-5 lg:pl-6 xl:pl-14"
                            >
                                <span
                                    className={`transition duration-500 ease-in-out sm:px-2 lsm:px-4 md:px-0 ${isHover == 4 ? "bg-black px-2 font-bold text-white" : "bg-transparent font-bold text-black"} z-0 sm:text-[22px] lsm:text-[24px] md:text-[20px] lg:text-[22px] xl:text-[24px]`}
                                >
                                    04
                                </span>
                                {/* <div className="z-0 sm:w-full sm:px-2 lsm:px-4 md:max-w-[350px] md:px-0 lg:max-w-[350px] xl:max-w-[450px]">
                                    <p className="w-full leading-6 tracking-widest sm:text-[13px] lsm:text-[14px] md:text-[11px] lg:text-[12px] xl:text-[14px]">
                                    {data?.texts[0].fourthText}
                                    </p>
                                </div> */}
                                <div className="sm:w-full sm:px-2 lsm:px-4 md:w-[350px] md:px-0 lg:w-[350px] xl:w-[450px]">
                                        <div
                                            className="w-[100px] text-left leading-6 tracking-widest sm:text-[13px] lsm:text-[14px] md:text-[11px] lg:text-[12px] xl:text-[14px]"
                                            dangerouslySetInnerHTML={{
                                                __html: data?.texts[0].fourthText || "",
                                            }}
                                        />
                                    </div>
                                <motion.img
                                    style={{
                                        top,
                                        left,
                                        translateX: "-50%",
                                        translateY: "-50%",
                                    }}
                                    variants={{
                                        initial: { scale: 0, rotate: "-12.5deg" },
                                        whileHover: { scale: 1, rotate: "12.5deg" },
                                    }}
                                    transition={{ type: "spring" }}
                                    src={data?.texts[0].fourthProduct}

                                    className="absolute z-0 rounded-lg object-cover h-[300px] w-fit"
                                />
                            </motion.a>
                        </div>
                    </div>
                    </>
                )}
                    {/* <div className="mb-60 mt-60 flex w-full flex-col items-center justify-center space-y-28">
                        <div className="flex w-full items-center justify-center">
                            <h1 className="text-[18px] font-semibold tracking-widest">
                                About us
                            </h1>
                        </div>
                        <div
                            id="grid"
                            className="grid w-full grid-cols-1 sm:gap-x-0 sm:gap-y-12 md:grid-cols-2 md:gap-x-10 md:gap-y-12 lg:gap-x-16 lg:gap-y-28 xl:gap-28"
                            style={{
                                display: "grid",
                                placeContent: "center",
                            }}
                        >
                            <motion.a
                                ref={ref}
                                initial="initial"
                                whileHover="whileHover"
                                onMouseMove={handleMouseMove}
                                onMouseEnter={() => setIsHover(1)}
                                onMouseLeave={() => setIsHover(0)}
                                className="relative flex flex-1 cursor-pointer flex-col items-start justify-center space-y-6 md:pl-5 lg:pl-6 xl:pl-14"
                            >
                                <span
                                    className={`w-fit transition duration-500 ease-in-out sm:px-2 lsm:px-4 md:px-0 ${isHover == 1 ? "bg-black px-2 font-bold text-white" : "bg-transparent font-bold text-black"} sm:text-[22px] lsm:text-[24px] md:text-[20px] lg:text-[22px] xl:text-[24px]`}
                                >
                                    01
                                </span>

                                <div className="sm:w-full sm:px-2 lsm:px-4 md:max-w-[350px] md:px-0 lg:max-w-[350px] xl:max-w-[450px]">
                                    <p className="w-full text-left leading-6 tracking-widest sm:text-[13px] lsm:text-[14px] md:text-[11px] lg:text-[12px] xl:text-[14px]">

                                        {data?.texts[0].firstText}
                                    </p>
                                </div>

                                <motion.img
                                    style={{
                                        top,
                                        left,
                                        translateX: "-50%",
                                        translateY: "-50%",
                                    }}
                                    variants={{
                                        initial: { scale: 0, rotate: "-12.5deg" },
                                        whileHover: { scale: 1, rotate: "12.5deg" },
                                    }}
                                    transition={{ type: "spring" }}
                                    src="/onhovers/about.png"
                                    className="absolute  z-0 rounded-lg object-cover h-[300px] w-fit"
                                />
                            </motion.a>
                            <motion.a
                                ref={ref}
                                initial="initial"
                                whileHover="whileHover"
                                onMouseMove={handleMouseMove}
                                onMouseEnter={() => setIsHover(2)}
                                onMouseLeave={() => setIsHover(0)}
                                className="relative flex flex-1 cursor-pointer flex-col items-start justify-end space-y-6 text-left md:pl-5 lg:pl-6 xl:pl-14"
                            >
                                <span
                                    className={`transition duration-500 ease-in-out sm:px-2 lsm:px-4 md:px-0 ${isHover == 2 ? "bg-black px-2 font-bold text-white" : "bg-transparent font-bold text-black"} sm:text-[22px] lsm:text-[24px] md:text-[20px] lg:text-[22px] xl:text-[24px]`}
                                >
                                    02
                                </span>
                                <div className="sm:w-full sm:px-2 lsm:px-4 md:max-w-[350px] md:px-0 lg:max-w-[350px] xl:max-w-[450px]">
                                    <p className="w-full leading-6 tracking-widest sm:text-[13px] lsm:text-[14px] md:text-[11px] lg:text-[12px] xl:text-[14px]">
                                        {data?.texts[0].secondText}
                                    </p>
                                </div>
                                <motion.img
                                    style={{
                                        top,
                                        left,
                                        translateX: "-50%",
                                        translateY: "-50%",
                                    }}
                                    variants={{
                                        initial: { scale: 0, rotate: "-12.5deg" },
                                        whileHover: { scale: 1, rotate: "12.5deg" },
                                    }}
                                    transition={{ type: "spring" }}
                                    src="/onhovers/about.png"
                                    className="absolute z-0 rounded-lg object-cover h-[300px] w-fit"
                                />

                            </motion.a>
                            <motion.a
                                ref={ref}
                                initial="initial"
                                whileHover="whileHover"
                                onMouseMove={handleMouseMove}
                                onMouseEnter={() => setIsHover(3)}
                                onMouseLeave={() => setIsHover(0)}
                                className="relative flex flex-1 cursor-pointer flex-col items-start justify-center space-y-6 md:pl-5 lg:pl-6 xl:pl-14"
                            >
                                <span
                                    className={`transition duration-500 ease-in-out sm:px-2 lsm:px-4 md:px-0 ${isHover == 3 ? "bg-black px-2 font-bold text-white" : "bg-transparent font-bold text-black"} sm:text-[22px] lsm:text-[24px] md:text-[20px] lg:text-[22px] xl:text-[24px]`}
                                >
                                    03
                                </span>
                                <div className="sm:w-full sm:px-2 lsm:px-4 md:max-w-[350px] md:px-0 lg:max-w-[350px] xl:max-w-[450px]">
                                    <p className="w-full text-left leading-6 tracking-widest sm:text-[13px] lsm:text-[14px] md:text-[11px] lg:text-[12px] xl:text-[14px]">
                                    {data?.texts[0].thirdText}
                                    </p>
                                </div>

                                <motion.img
                                    style={{
                                        top,
                                        left,
                                        translateX: "-50%",
                                        translateY: "-50%",
                                    }}
                                    variants={{
                                        initial: { scale: 0, rotate: "-12.5deg" },
                                        whileHover: { scale: 1, rotate: "12.5deg" },
                                    }}
                                    transition={{ type: "spring" }}
                                    src="/onhovers/about.png"
                                    className="absolute z-0 rounded-lg object-cover h-[300px] w-fit"
                                />
                            </motion.a>
                            <motion.a
                                ref={ref}
                                initial="initial"
                                whileHover="whileHover"
                                onMouseMove={handleMouseMove}
                                onMouseEnter={() => setIsHover(4)}
                                onMouseLeave={() => setIsHover(0)}
                                className="relative flex flex-1 cursor-pointer flex-col items-start justify-end space-y-6 text-left md:pl-5 lg:pl-6 xl:pl-14"
                            >
                                <span
                                    className={`transition duration-500 ease-in-out sm:px-2 lsm:px-4 md:px-0 ${isHover == 4 ? "bg-black px-2 font-bold text-white" : "bg-transparent font-bold text-black"} z-0 sm:text-[22px] lsm:text-[24px] md:text-[20px] lg:text-[22px] xl:text-[24px]`}
                                >
                                    04
                                </span>
                                <div className="z-0 sm:w-full sm:px-2 lsm:px-4 md:max-w-[350px] md:px-0 lg:max-w-[350px] xl:max-w-[450px]">
                                    <p className="w-full leading-6 tracking-widest sm:text-[13px] lsm:text-[14px] md:text-[11px] lg:text-[12px] xl:text-[14px]">
                                    {data?.texts[0].fourthText}
                                    </p>
                                </div>
                                <motion.img
                                    style={{
                                        top,
                                        left,
                                        translateX: "-50%",
                                        translateY: "-50%",
                                    }}
                                    variants={{
                                        initial: { scale: 0, rotate: "-12.5deg" },
                                        whileHover: { scale: 1, rotate: "12.5deg" },
                                    }}
                                    transition={{ type: "spring" }}
                                    src="/onhovers/about.png"

                                    className="absolute z-0 rounded-lg object-cover h-[300px] w-fit"
                                />
                            </motion.a>
                        </div>
                    </div> */}
                </>
            )}
        </>
    )
}

export default About;