"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import FeatureCard from "@/components/FeatureCard";
import { cn } from "@/lib/utils";

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
              when: "beforeChildren",
              staggerChildren: 0.2,
            },
          },
        }}
      >
        {features.map((item, idx) => (
          <FeatureCard key={idx} index={idx} {...item} />
        ))}
        {/* {features.map((item, idx) => (
          <motion.li
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            viewport={{ once: true }}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.5 }}
            key={idx}
            className={cn(item.gridStyling, "overflow-hidden")}
          >
            <FeatureCard {...item} />
          </motion.li>
        ))} */}
      </motion.ul>
    </div>
  );
}
