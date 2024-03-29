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
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, when: "beforeChildren", delay: delay },
        },
      }}
    >
      {children}
      <motion.div
        variants={{ hidden: { left: 0 }, visible: { left: "100%" } }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 w-full h-full bg-primary"
      ></motion.div>
    </motion.div>
  );
}
