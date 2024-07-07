"use client";

import React from "react";
import { motion } from "framer-motion";

export default function PricingCardReveal({
  children,
  delay = 0,
}: {
  delay?: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ x: -20, opacity: 0, filter: "blur(8px)" }}
      whileInView={{ x: 0, opacity: 1, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{ type: "spring", bounce: 0, duration: 0.75, delay }}
    >
      {children}
    </motion.div>
  );
}
