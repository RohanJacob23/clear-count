"use client";

import Link from "next/link";
import React, { useState } from "react";
import {
  BarChartIcon,
  DashboardIcon,
  HamburgerMenuIcon,
  HomeIcon,
} from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import ToogleTheme from "./ToogleTheme";

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

  return (
    <Sheet open={openSheet} onOpenChange={setOpenSheet}>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost" className="md:hidden rounded-full">
          <HamburgerMenuIcon className="size-4" />
        </Button>
      </SheetTrigger>

      {/* sheet content */}
      <SheetContent side="left">
        <div className="flex flex-col mt-6 space-y-4 text-lg font-medium h-full">
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
          <div className="flex flex-col justify-end pb-4 grow">
            <ToogleTheme className="justify-between" />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
