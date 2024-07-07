"use client";

import React from "react";
import { m, LazyMotion, domAnimation } from "framer-motion";

export default function RevealButton({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <LazyMotion strict features={domAnimation}>
      <m.div
        className="flex flex-col md:flex-row justify-center items-center gap-3 mt-8 md:mt-12 self-stretch md:self-auto"
        transition={{ type: "spring", bounce: 0.3, duration: 0.75, delay }}
        viewport={{ once: true }}
        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
