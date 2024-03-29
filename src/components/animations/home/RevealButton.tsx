"use client";

import React from "react";
import { motion } from "framer-motion";

export default function RevealButton({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className="flex flex-col md:flex-row justify-center items-center gap-3 mt-8 md:mt-12 self-stretch md:self-auto"
      transition={{ duration: 0.5, delay: 0.8 }}
      viewport={{ once: true }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      {children}
    </motion.div>
  );
}
