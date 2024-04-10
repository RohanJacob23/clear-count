"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const StaggeredFadeLoader = ({ className }: { className?: string }) => {
  const circleVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      {[...Array(3)].map((_, index) => (
        <motion.div
          key={index}
          className={cn("h-4 w-4 rounded-full bg-red-500", className)}
          variants={circleVariants}
          initial="hidden"
          animate="visible"
          transition={{
            duration: 0.9,
            delay: index * 0.2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        ></motion.div>
      ))}
    </div>
  );
};
