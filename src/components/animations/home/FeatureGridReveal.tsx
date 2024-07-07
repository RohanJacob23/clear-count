"use client";

import React from "react";
import { motion } from "framer-motion";
import FeatureCard from "@/components/FeatureCard";

export default function FeatureGridReveal({
  features,
}: {
  features: {
    icon: JSX.Element;
    title: string;
    gridStyling: string;
    desc: string;
  }[];
}) {
  return (
    <div className="relative mt-12 max-w-md md:max-w-none mx-auto overflow-hidden">
      <motion.ul
        className="grid gap-6 grid-cols-1 md:grid-cols-3 md:grid-rows-4 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 1,
              when: "beforeChildren",
              staggerChildren: 0.2,
            },
          },
        }}
      >
        {features.map((item, idx) => (
          <FeatureCard key={idx} {...item} />
        ))}
      </motion.ul>
    </div>
  );
}
