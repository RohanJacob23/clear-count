"use client";

import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

export default function FeatureCard({
  icon,
  title,
  desc,
  gridStyling,
}: {
  icon: JSX.Element;
  title: string;
  desc: string;
  gridStyling: string;
}) {
  const [showSlider, setShowSlider] = useState(false);
  const { theme } = useTheme();
  return (
    <MotionConfig transition={{ type: "spring", bounce: 0, duration: 0.5 }}>
      <motion.li
        variants={{
          hidden: { opacity: 0, x: 20, filter: "blur(8px)" },
          visible: { opacity: 1, x: 0, filter: "blur(0px)" },
        }}
        onHoverStart={() => setShowSlider(true)}
        onHoverEnd={() => setShowSlider(false)}
        className={cn(gridStyling)}
      >
        <Card className="size-full rounded-lg relative overflow-hidden">
          <AnimatePresence>
            {showSlider && (
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                className="absolute size-full z-20 bg-primary rounded-lg"
              />
            )}
          </AnimatePresence>

          <CardContent className="p-6 relative z-30">
            <div
              className={cn(
                "space-y-3 transition-colors ease-in-out duration-300",
                showSlider && "dark:text-black"
              )}
            >
              <span>{icon}</span>
              <h4>{title}</h4>
              <p>{desc}</p>
            </div>
          </CardContent>
        </Card>
      </motion.li>
    </MotionConfig>
  );
}
