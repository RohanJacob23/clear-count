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
    const test = document.getElementById("test");
    const section = document.getElementById("section");
    animate(
      test!,
      { scale: openSheet ? 0.95 : 1 },
      { type: "spring", bounce: 0, duration: 0.35 }
    );
    animate(
      section!,
      { scale: openSheet ? 0.95 : 1 },
      { type: "spring", bounce: 0, duration: 0.35 }
    );
  }, [openSheet]);

  return (
    <MotionConfig transition={{ type: "spring", bounce: 0.25, duration: 0.65 }}>
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
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              className="block md:hidden fixed inset-0 w-3/4 h-screen p-2 z-50"
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

          {/* overlay */}
          {openSheet && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpenSheet(false)}
              className="block md:hidden fixed bg-black/75 inset-0 w-screen h-screen z-[45]"
            />
          )}
        </AnimatePresence>
      </section>
    </MotionConfig>
  );
}

// <Sheet open={openSheet} onOpenChange={setOpenSheet}>
//   <SheetTrigger asChild>
//     <Button size="icon" variant="ghost" className="md:hidden rounded-full">
//       <HamburgerMenuIcon className="size-4" />
//     </Button>
//   </SheetTrigger>

//   {/* sheet content */}
//   <SheetContent side="left">
//     <div className="flex flex-col mt-6 space-y-4 text-lg font-medium h-full">
//       {sheetMenu.map(({ icon, name, url }, i) => (
//         <Link
//           key={i}
//           href={url}
//           onClick={() => setOpenSheet(false)}
//           className={cn(
//             "flex items-center px-2.5 text-muted-foreground hover:text-foreground",
//             pathname === url && "text-foreground"
//           )}
//         >
//           {icon}
//           {name}
//         </Link>
//       ))}
//       <div className="flex flex-col justify-end pb-4 grow">
//         <ToogleTheme className="justify-between" />
//       </div>
//     </div>
//   </SheetContent>
// </Sheet>
