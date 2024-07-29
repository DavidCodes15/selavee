"use client";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
const int = Inter({
    subsets: ["latin"],
    weight: "400",
})
const CustomCursor = ({x, y}: {x: number, y: number}) => {
    return <div style={{
        position: "fixed",
        top: y,
        left: x,
        backgroundColor: "black",
        pointerEvents: "none",
        transform: "translate(-50%, -50%)",
        zIndex: 1000,
    }} className={cn("text-white px-[4px] text-[14px] tracking-widest", int.className)} >
        <span>SEE DETAIL</span>
    </div>
}
export default CustomCursor