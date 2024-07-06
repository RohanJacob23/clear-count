"use client";

import React, { useState } from "react";
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
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
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
    <MotionConfig transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}>
      <motion.section
        initial={{ width: "52px" }}
        animate={{ width: openSideNav ? "224px" : "52px" }}
        className="hidden md:flex flex-col overflow-hidden divide-y border-r"
      >
        <ArrowButton open={openSideNav} setOpen={setOpenSideNav} />

        <div className="flex flex-col gap-1 p-2">
          <TooltipProvider delayDuration={100}>
            {sideNavButton.map(({ icon, name, url }, i) => (
              <Tooltip key={i}>
                <TooltipTrigger asChild>
                  <Link href={url}>
                    <button
                      className={cn(
                        buttonVariants({
                          variant:
                            name !== "Home" && pathname.startsWith(url)
                              ? "default"
                              : "ghost",
                        }),
                        openSideNav ? "justify-start" : "justify-center",
                        "flex gap-2 p-2 w-full overflow-hidden"
                      )}
                    >
                      <motion.span layout className="inline-block">
                        {icon}
                      </motion.span>
                      <AnimatePresence mode="popLayout">
                        {openSideNav && (
                          <motion.span
                            initial={{
                              y: "100%",
                              opacity: 0,
                              filter: "blur(8px)",
                            }}
                            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                            exit={{
                              y: "-100%",
                              opacity: 0,
                              filter: "blur(8px)",
                            }}
                            className="inline-block"
                          >
                            {name}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </button>
                  </Link>
                </TooltipTrigger>
                {/* tooltip content */}
                {!openSideNav && (
                  <TooltipContent side="left">{name}</TooltipContent>
                )}
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>

        <div className="flex items-end h-full p-2">
          <ToogleTheme isCollapsed={!openSideNav} />
        </div>
      </motion.section>
    </MotionConfig>
  );
}

const ArrowButton = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <motion.div layout className="p-2 self-end">
      <Button
        size="icon"
        variant="ghost"
        className="rounded-full"
        onClick={() => setOpen((prev) => !prev)}
      >
        <motion.span
          initial={false}
          animate={open ? { rotate: 180 } : { rotate: 0 }}
        >
          <ArrowRightIcon className="size-4 min-w-4" />
        </motion.span>
      </Button>
    </motion.div>
  );
};
