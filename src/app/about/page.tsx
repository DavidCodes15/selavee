"use client";
import Navbar from "@/components/Navbar";
import {motion, useScroll, useTransform, MotionValue, useInView} from "framer-motion";
import { useRef } from "react";

const About = () => {

  // const targetRef = useRef<HTMLDivElement>(null);
  // const {scrollYProgress} = useScroll({
  //   target: targetRef,
  //   offset: ["start start", "end end"],

  // });

  // const IsInView = useInView(targetRef);
  // const opacity: MotionValue<number> = useTransform(scrollYProgress, [0, 1], [1, 0]);

  
  return (
    <>
      <div className="absolute top-0 w-full h-full">
      <div className="fixed w-full h-full">
      <Navbar theme="dark" />
      </div>
      </div>
      <motion.div className="relative h-[400vh] w-full">
        <FirstSection />
        <SecondSection />
        {/* <FirstSection targetRef={targetRef}  />
        <SecondSection targetRef={targetRef} />
        <ThirdSection targetRef={targetRef} /> */}
      </motion.div>
    </>
  );
}
{/**{targetRef} : {targetRef: React.RefObject<HTMLDivElement>} */}
const FirstSection = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const IsInView = useInView(targetRef);
  {/**ref = targetRef */}
  return <motion.div ref={targetRef} className="sticky top-0 h-screen w-full bg-[#AAF50B] -z-20">
      <motion.div className="h-screen w-full absolute top-0 left-0">
        <motion.div
        initial={{
          opacity: 1,
        }}
        // whileInView={{
        //   opacity: 0,
        // }}
        animate={{ opacity: IsInView ? 0 : 1 }}
        // viewport={{
        //   margin: "200px",
        // }}
        transition={{
          duration: 0.7,
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
          y: IsInView ? "-55%" : "0",
          x: IsInView ? "50%" : "0",
        }}
        transition={{
          duration: 0.7,
        }}
        className="absolute h-screen w-full top-[79%] left-5">
              
                <span className="tracking-widest text-[100px] font-bold">No Bla Bla</span>
              
        </motion.div>
      </motion.div>
  </motion.div>
}

const SecondSection = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const IsInView = useInView(targetRef);
  return <motion.div ref={targetRef} className="sticky top-0 h-screen w-full bg-[#0020F5] -z-20">
  <motion.div className="h-screen w-full absolute top-0 left-0">
    <motion.div
    initial={{
      opacity: 1,
    }}
    // whileInView={{
    //   opacity: 0,
    // }}
    animate={{ opacity: IsInView ? 0 : 1 }}
    // viewport={{
    //   margin: "200px",
    // }}
    transition={{
      duration: 0.7,
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
      y: IsInView ? "-55%" : "0",
      x: IsInView ? "50%" : "0",
    }}
    transition={{
      duration: 0.7,
    }}
    className="absolute h-screen w-full top-[79%] left-5">
          
            <span className="tracking-widest text-[100px] font-bold">second Bla Bla</span>
          
    </motion.div>
  </motion.div>
</motion.div>
}

const ThirdSection = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const IsInView = useInView(targetRef);
  return <motion.div ref={targetRef} className="sticky top-0 left-0 h-screen w-full bg-[#cccccc] -z-20">
    Third section
  </motion.div>
}



export default About;