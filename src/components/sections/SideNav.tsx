"use client";

import React, { useState } from "react";
import { Separator } from "../ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button, buttonVariants } from "../ui/button";
import {
  ArrowRightIcon,
  BarChartIcon,
  DashboardIcon,
  HomeIcon,
} from "@radix-ui/react-icons";
import ToogleTheme from "../ToogleTheme";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function SideNav() {
  const pathname = usePathname();
  const [openSideNav, setOpenSideNav] = useState(false);
  const sideNavButton = [
    {
      name: "Home",
      icon: <HomeIcon className="min-w-4 size-4" />,
      url: "/",
    },
    {
      name: "Dashboard",
      icon: <DashboardIcon className="min-w-4 size-4" />,
      url: "/dashboard",
    },
    {
      name: "Analytics",
      url: "/analytics",
      icon: <BarChartIcon className="min-w-4 size-4" />,
    },
  ];

  return (
    <>
      <motion.div
        initial={{ width: "3.5rem" }}
        animate={openSideNav ? { width: "15rem" } : { width: "3.5rem" }}
        className="hidden md:flex flex-col border-r overflow-hidden"
      >
        <TooltipProvider delayDuration={100}>
          <div className="p-2 self-end">
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full"
              onClick={() => setOpenSideNav((prev) => !prev)}
            >
              <motion.span
                initial={false}
                animate={openSideNav ? { rotate: 180 } : { rotate: 0 }}
                transition={{ duration: 0.5 }}
              >
                <ArrowRightIcon className="size-4 min-w-4" />
              </motion.span>
            </Button>
          </div>

          <Separator />
          <div className="flex flex-col gap-1 p-2">
            {sideNavButton.map(({ icon, name, url }, i) => (
              <Tooltip key={i}>
                <TooltipTrigger asChild>
                  <Link href={url}>
                    <motion.div
                      layout
                      className={cn(
                        buttonVariants({
                          variant: url === pathname ? "default" : "ghost",
                        }),
                        openSideNav ? "justify-start" : "justify-center",
                        "w-full space-x-2 overflow-x-hidden"
                      )}
                    >
                      <motion.span
                        layout
                        transition={{
                          layout: { duration: 0.25 },
                        }}
                      >
                        {icon}
                      </motion.span>
                      <AnimatePresence>
                        {openSideNav && (
                          <motion.span
                            layout
                            key={name}
                            animate={{ width: "fit-content" }}
                            exit={{ width: "0px" }}
                            transition={{
                              duration: 0.2,
                            }}
                            className="inline-block ml-2 w-0 overflow-hidden"
                          >
                            {name}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </Link>
                  {/* </Button> */}
                </TooltipTrigger>
                {!openSideNav && (
                  <TooltipContent side="left">{name}</TooltipContent>
                )}
              </Tooltip>
            ))}
          </div>

          <Separator />
          <div className="flex flex-col justify-end flex-1 px-2 py-4">
            <ToogleTheme isCollapsed />
          </div>
        </TooltipProvider>
      </motion.div>
    </>
  );
}
