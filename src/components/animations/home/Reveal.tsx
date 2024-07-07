"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Reveal({
  children,
  delay = 0,
}: {
  delay?: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className="relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{
        type: "spring",
        bounce: 0,
        duration: 1,
        when: "beforeChildren",
        delay,
      }}
    >
      {children}
      <motion.div
        variants={{ hidden: { x: "0%" }, visible: { x: "100%" } }}
        transition={{
          type: "spring",
          bounce: 0,
          duration: 1,
        }}
        className="absolute inset-0 w-full h-full bg-primary"
      />
    </motion.div>
  );
}
