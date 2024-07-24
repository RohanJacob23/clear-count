"use client";

import React from "react";
import { domAnimation, LazyMotion } from "framer-motion";
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
    <LazyMotion strict features={domAnimation}>
      <div className="relative mt-12 max-w-md md:max-w-none mx-auto overflow-hidden">
        <ul className="grid gap-6 grid-cols-1 md:grid-cols-3 md:grid-rows-4 overflow-hidden">
          {features.map((item, idx) => (
            <FeatureCard key={idx} {...item} />
          ))}
        </ul>
      </div>
    </LazyMotion>
  );
}
