"use client";

import React from "react";
import { Card, CardContent } from "./ui/card";
import { motion, useAnimate } from "framer-motion";
import { useTheme } from "next-themes";

export default function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: JSX.Element;
  title: string;
  desc: string;
}) {
  const [yellowSlider, animateYellowSlider] = useAnimate();
  const [scope, animate] = useAnimate();
  const { theme } = useTheme();

  return (
    <Card
      className="size-full rounded-lg relative overflow-hidden"
      onMouseEnter={() => {
        animateYellowSlider(
          yellowSlider.current,
          {
            scaleX: 1,
            transformOrigin: "left",
          },
          { duration: 0.3 }
        );
        if (theme === "dark")
          animate(scope.current, { color: "#000000" }, { duration: 0.3 });
      }}
      onMouseLeave={() => {
        animateYellowSlider(
          yellowSlider.current,
          {
            scaleX: 0,
            transformOrigin: "right",
          },
          { duration: 0.3 }
        );
        if (theme === "dark")
          animate(scope.current, { color: "#ffffff" }, { duration: 0.3 });
      }}
    >
      <motion.div
        ref={yellowSlider}
        initial={{ scaleX: 0 }}
        className="absolute size-full z-20 bg-primary rounded-lg"
      ></motion.div>

      <CardContent className="p-6 relative z-30">
        <motion.div ref={scope} className="space-y-3">
          <span>{icon}</span>
          <h4>{title}</h4>
          <p>{desc}</p>
        </motion.div>
      </CardContent>
    </Card>
  );
}
