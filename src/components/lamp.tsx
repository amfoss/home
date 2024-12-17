"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import styles from "../styles/Home.module.css"

export const LampContainer = ({
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-bgMainColor w-full rounded-md z-0",
        className
      )}
    >
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0 ">

        <div className="absolute top-[35vh] max-w-[50vw]">
          <motion.div
            initial={{ opacity: 0.5, width: "15rem" }}
            whileInView={{ opacity: 1, width: "30rem" }}
            transition={{
              delay: 0,
              duration: 0.8,
              ease: "easeInOut",
            }}
            style={{
              backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
            }}
            className="absolute right-1/2 h-[30vh] max-w-[50vw] bg-gradient-conic from-yellow-500 via-transparent to-transparent [--conic-position:from_70deg_at_center_top]"
          >
            <div className="absolute  lg:w-40 sm:w-[8.5vw] h-[100%] left-0 bg-bgMainColor  bottom-0 [mask-image:linear-gradient(to_right,white,transparent)]" />
          </motion.div>
        </div>

        <div className="absolute top-[35vh]">
          <motion.div
            initial={{ opacity: 0.5, width: "15rem" }}
            whileInView={{ opacity: 1, width: "30rem" }}
            transition={{
              delay: 0,
              duration: 0.8,
              ease: "easeInOut",
            }}
            style={{
              backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
            }}
            className="absolute left-1/2 h-[30vh] max-w-[50vw] bg-gradient-conic from-transparent via-transparent to-yellow-500 [--conic-position:from_290deg_at_center_top]"
          >
            <div className="absolute  lg:w-40 sm:w-[8.5vw] h-[100%] right-0 bg-bgMainColor  bottom-0 [mask-image:linear-gradient(to_left,white,transparent)]" />
          </motion.div>
        </div>

        <div className="absolute top-1/2 h-[18vh] w-full translate-y-12 scale-x-150 bg-bgMainColor blur-2xl"></div>
        <div className="absolute inset-auto z-50 h-36 w-[23.33vw] -translate-y-1/2 rounded-full bg--500 opacity-50 blur-3xl max-w-[23.33vw]"></div>
        
        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "16rem" }}
          transition={{
            delay: 0,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute z-30 h-[7.5vw] w-64 -translate-y-[6rem] sm:top-[40vh] rounded-full bg-yellow-400 blur-2xl lg:top-[45vh] max-w-[64vw]"
        ></motion.div>
        
        <motion.div
          initial={{ width: "15rem" }}
          whileInView={{ width: "30rem" }}
          transition={{
            delay: 0,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-50 lg:h-0.5 sm:h-[0.25rem] w-[25vw] bg-yellow-400 top-[35vh] max-w-[50vw]"
        ></motion.div>
        <div className="absolute inset-auto z-40 h-[20.9vh] w-full top-[14vh] bg-bgMainColor "></div>
      
      </div>

      <div className="absolute z-50 top-[66vh] w-[20vw] h-[4.3vh]">
      </div>
    </div>
  );
};
export default LampContainer; 