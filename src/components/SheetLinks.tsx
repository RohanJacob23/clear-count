"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  BarChartIcon,
  Cross1Icon,
  DashboardIcon,
  HamburgerMenuIcon,
  HomeIcon,
} from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import ToogleTheme from "./ToogleTheme";
import { AnimatePresence, motion, animate, MotionConfig } from "framer-motion";

export default function SheetLinks() {
  const sheetMenu = [
    {
      name: "Home",
      icon: <HomeIcon className="min-w-4 size-4 mr-4" />,
      url: "/",
    },
    {
      name: "Dashboard",
      icon: <DashboardIcon className="min-w-4 size-4 mr-4" />,
      url: "/dashboard",
    },
    {
      name: "Analytics",
      url: "/analytics",
      icon: <BarChartIcon className="min-w-4 size-4 mr-4" />,
    },
  ];
  const [openSheet, setOpenSheet] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const avatar = document.getElementById("avatar");
    const section = document.getElementById("section");
    animate(
      avatar!,
      { transform: openSheet ? "scale(0.95)" : "scale(1)" },
      { type: "spring", bounce: 0, duration: 0.35 }
    );
    animate(
      section!,
      { transform: openSheet ? "scale(0.95)" : "scale(1)" },
      { type: "spring", bounce: 0, duration: 0.35 }
    );
  }, [openSheet]);

  return (
    <MotionConfig transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}>
      <section>
        <Button
          size="icon"
          variant="ghost"
          className="md:hidden"
          onClick={() => setOpenSheet(true)}
        >
          <HamburgerMenuIcon className="size-4" />
        </Button>

        <AnimatePresence>
          {openSheet && (
            <motion.div
              initial={{
                transform: "translateX(-100%)",
                filter: "blur(10px)",
                opacity: 0,
              }}
              animate={{
                transform: "translateX(0%)",
                filter: "blur(0px)",
                opacity: 1,
              }}
              exit={{
                transform: "translateX(-100%)",
                filter: "blur(10px)",
                opacity: 0,
              }}
              className="block md:hidden fixed inset-0 w-3/4 h-[100dvh] p-2 z-[60]"
            >
              <div className="flex flex-col p-2 bg-background rounded-lg size-full">
                <Button
                  size="icon"
                  variant="ghost"
                  className="size-8 rounded-full self-end"
                  onClick={() => setOpenSheet(false)}
                >
                  <Cross1Icon className="size-4" />
                </Button>

                <div className="flex flex-col mt-2 space-y-2 text-lg font-medium h-full">
                  {sheetMenu.map(({ icon, name, url }, i) => (
                    <Link
                      key={i}
                      href={url}
                      onClick={() => setOpenSheet(false)}
                      className={cn(
                        "flex items-center px-2.5 text-muted-foreground hover:text-foreground",
                        pathname === url && "text-foreground"
                      )}
                    >
                      {icon}
                      {name}
                    </Link>
                  ))}
                </div>
                {/* theme toggle */}
                <div className="flex flex-col justify-end pb-4 grow">
                  <ToogleTheme className="justify-between" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {/* overlay */}
          {openSheet && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpenSheet(false)}
              className="block md:hidden fixed bg-black/75 dark:bg-zinc-900/75 inset-0 w-screen h-screen z-[45]"
            />
          )}
        </AnimatePresence>
      </section>
    </MotionConfig>
  );
}
