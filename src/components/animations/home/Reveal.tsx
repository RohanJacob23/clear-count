"use client";

import React from "react";
import { domAnimation, LazyMotion, m } from "framer-motion";

export default function Reveal({
  children,
  delay = 0,
}: {
  delay?: number;
  children: React.ReactNode;
}) {
  return (
    <LazyMotion features={domAnimation}>
      <m.div
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
        <m.div
          variants={{
            hidden: { transform: "translateX(0%)" },
            visible: { transform: "translateX(100%)" },
          }}
          transition={{
            type: "spring",
            bounce: 0,
            duration: 1,
          }}
          className="absolute inset-0 w-full h-full bg-primary"
        />
      </m.div>
    </LazyMotion>
  );
}
