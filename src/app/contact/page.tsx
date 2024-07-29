"use client";

import Footer from "@/components/Footer";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";

import { useAnimate } from "framer-motion";
import React, { MouseEventHandler, ReactNode, useRef} from "react";
// import { FiMousePointer } from "react-icons/fi";


        const MouseImageTrail = ({
        children,
        // List of image sources
        images,
        // Will render a new image every X pixels between mouse moves
        renderImageBuffer,
        // images will be rotated at a random number between zero and rotationRange,
        // alternating between a positive and negative rotation
        rotationRange,
        }: {
        children: ReactNode;
        images: string[];
        renderImageBuffer: number;
        rotationRange: number;
        }) => {
        const [scope, animate] = useAnimate();

        const lastRenderPosition = useRef({ x: 0, y: 0 });
        const imageRenderCount = useRef(0);

        const handleMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
            
                const { clientX, clientY } = e;

            const distance = calculateDistance(
            clientX,
            clientY,
            lastRenderPosition.current.x,
            lastRenderPosition.current.y
            );

            if (distance >= renderImageBuffer) {
            lastRenderPosition.current.x = clientX;
            lastRenderPosition.current.y = clientY;

            renderNextImage();
            }
            
            
        };

        const calculateDistance = (
            x1: number,
            y1: number,
            x2: number,
            y2: number
        ) => {
            const deltaX = x2 - x1;
            const deltaY = y2 - y1;

            // Using the Pythagorean theorem to calculate the distance
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

            return distance;
        };

        const renderNextImage = () => {
            const imageIndex = imageRenderCount.current % images.length;
            const selector = `[data-mouse-move-index="${imageIndex}"]`;

            const el = document.querySelector(selector) as HTMLElement;

            el.style.top = `${lastRenderPosition.current.y}px`;
            el.style.left = `${lastRenderPosition.current.x}px`;
            el.style.zIndex = imageRenderCount.current.toString();

            const rotation = Math.random() * rotationRange;

            animate(
            selector,
            {
                opacity: [0, 1],
                transform: [
                `translate(-50%, -25%) scale(0.5) ${
                    imageIndex % 2
                    ? `rotate(${rotation}deg)`
                    : `rotate(-${rotation}deg)`
                }`,
                `translate(-50%, -50%) scale(1) ${
                    imageIndex % 2
                    ? `rotate(-${rotation}deg)`
                    : `rotate(${rotation}deg)`
                }`,
                ],
            },
            { type: "spring", damping: 15, stiffness: 200 }
            );

            animate(
            selector,
            {
                opacity: [1, 0],
            },
            { ease: "linear", duration: 0.5, delay: 1.5 }
            );

            imageRenderCount.current = imageRenderCount.current + 1;
        };

        return (
            <div
            ref={scope}
            className="mt-10 relative overflow-hidden h-screen"
            onMouseMove={handleMouseMove}
            >
            {children}

            {images.map((img, index) => (
                <img
                className="-z-10 pointer-events-none absolute left-0 top-0 h-48 w-auto rounded-xl border-2 border-black bg-neutral-900 object-cover opacity-0"
                src={img}
                alt={`Mouse move image ${index}`}
                key={index}
                data-mouse-move-index={index}
                />
            ))}
            </div>
        );
        };

const Contact = () => {
    return (
        <>
        <Navbar theme="dark" />
        <div className="absolute contact-gradient rounded-full w-1/2 h-[50%] top-[15%] left-0" />
        <MouseImageTrail
        renderImageBuffer={50}
        rotationRange={25}
        images={[
            "/products/contact-1.png",
            "/products/contact-2.png",
            "/products/contact-3.png",
            "https://plus.unsplash.com/premium_photo-1663838903257-d2feacede5a8?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1557180295-76eee20ae8aa?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://plus.unsplash.com/premium_photo-1681276170092-446cd1b5b32d?q=80&w=2788&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://plus.unsplash.com/premium_photo-1681276169830-7bd1678b0c15?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1603974372039-adc49044b6bd?q=80&w=2834&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=2835&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://media.istockphoto.com/id/1955737262/photo/metal-chains-and-ring-on-beige-background-flat-lay-luxury-jewelry.jpg?s=1024x1024&w=is&k=20&c=JZUicNn5UGbAti-F69CdgUujoHJzgeOfi58rfespGDA=",
        ]}
        >
        
            <section className="sm:h-[75%] xl:h-[80%] xxl:h-[90%] w-full relative">
                
                <MaxWidthWrapper className="h-full flex flex-col justify-between">
                    <div className="flex flex-1 justify-center items-center">
                        <h1 className="tracking-widest text-[24px]">Contact Us</h1>
                    </div>
                    <div className="mt-10 flex flex-1 justify-start items-center">
                        <span className="text-[54px] font-bold tracking-widest flex flex-col justify-center items-start"><span className="max-w-[600px]">If you need help why not</span> <span>contact us</span></span>
                    </div>
                    <div 
                    
                    className="flex flex-1 justify-end items-end z-10">
                        <div
                        className="flex flex-col justify-center items-start space-y-6">
                            <div className="text-[14px] tracking-widest">
                                E-mail:<span className="font-semibold">contact@Selavee.com</span>
                            </div>
                            <div className="text-[14px] tracking-widest">
                                Phone:<span className="font-semibold">+1 64828 002 874</span>
                            </div>
                            <div className="text-[14px] tracking-widest flex justify-center items-center space-x-2">
                                <span>Follow us:</span>
                                <span className="flex justify-center items-center space-x-2">
                                <img src="/icons/facebook.svg" className="cursor-pointer w-[11px] h-[16px]" />
                                <img src="/icons/instagram.svg" className="cursor-pointer w-[16px] h-[16px]" />
                                <img src="/icons/linked-in.svg" className="cursor-pointer w-[16px] h-[16px]" />
                                <img src="/icons/tik-tok.svg" className="cursor-pointer w-[16px] h-[16px]" />
                                </span>
                            </div>
                        </div>
                    </div>      
                </MaxWidthWrapper>
            </section>
        </MouseImageTrail>
        <Footer />
        </>
    )
}

export default Contact