"use client";

import React from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

export default function ToogleTheme({
  isCollapsed,
}: {
  isCollapsed?: boolean;
}) {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      variant="outline"
      size={isCollapsed ? "icon" : "default"}
      className="gap-2"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <span className={cn(isCollapsed && "sr-only", "dark:hidden")}>Light</span>
      <span className={cn(isCollapsed && "sr-only", "hidden dark:block")}>
        Dark
      </span>
      <div className="flex">
        <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </div>
    </Button>
  );
}
