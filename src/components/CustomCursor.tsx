"use client";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
const int = Inter({
    subsets: ["latin"],
    weight: "400",
})
import "@/app/globals.css"
const CustomCursor = ({x, y}: {x: number, y: number}) => {
    return <>
    <div style={{
        position: "fixed",
        top: y,
        left: x,
        backgroundColor: "black",
        pointerEvents: "none",
        zIndex: 1000,
    }} className="ticker text-[14px] tracking-widest overflow-hidden text-white">
        <ul>
            <li>
                <span>SEE DETAIL</span>
            </li>
            <li>
                <span>SEE DETAIL</span>
            </li>
            <li>
                <span>SEE DETAIL</span>
            </li>
            <li>
                <span>SEE DETAIL</span>
            </li>
            <li>
                <span>SEE DETAIL</span>
            </li>
            <li>
                <span>SEE DETAIL</span>
            </li>
            <li>
                <span>SEE DETAIL</span>
            </li>
            <li>
                <span>SEE DETAIL</span>
            </li>
            <li>
                <span>SEE DETAIL</span>
            </li>
            <li>
                <span>SEE DETAIL</span>
            </li>
            <li>
                <span>SEE DETAIL</span>
            </li>
            <li>
                <span>SEE DETAIL</span>
            </li>
            <li>
                <span>SEE DETAIL</span>
            </li>

            <li>
                <span>SEE DETAIL</span>
            </li>
            <li>
                <span>SEE DETAIL</span>
            </li>
        </ul>
    </div>
     {/* <div style={{
        position: "fixed",
        top: y,
        left: x,
        backgroundColor: "black",
        pointerEvents: "none",
        transform: "translate(-50%, -50%)",
        zIndex: 1000,
    }} className={cn("relative overflow-hidden w-[150px] h-[25px] text-white px-[4px] text-[14px] tracking-widest", int.className)} >
        <span className="absolute left-[100%] item item1">SEE DETAIL</span>
        <span className="absolute left-[100%] item item1">SEE DETAIL</span>
        <span className="absolute left-[100%] item item1">SEE DETAIL</span>
        
    </div> */}
    {/* <div style={{
        top: y,
        left: x,
        backgroundColor: "black",
        pointerEvents: "none",
        zIndex: 1000, }} className={cn("wrapper text-white text-[14px] tracking-widest", int.className)}>
        <span className="item item1">SEE DETAIL</span>
        <span className="item item2">SEE DETAIL</span>
        <span className="item item3">SEE DETAIL</span>
        <span className="item item4">SEE DETAIL</span>
        <span className="item item5">SEE DETAIL</span>
        <span className="item item6">SEE DETAIL</span>
        <span className="item item7">SEE DETAIL</span>
        <span className="item item8">SEE DETAIL</span>
    </div> */}
    </>
}
export default CustomCursor