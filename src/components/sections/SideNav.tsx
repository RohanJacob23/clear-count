"use client";

import React, { useState } from "react";
import { ResizableHandle, ResizablePanel } from "../ui/resizable";
import { Separator } from "../ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "../ui/button";
import { BarChartIcon, DashboardIcon, HomeIcon } from "@radix-ui/react-icons";
import ToogleTheme from "../ToogleTheme";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function SideNav({
  defaultCollapsed,
}: {
  defaultCollapsed?: boolean;
}) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const isSmallDevice =
    typeof matchMedia !== "undefined"
      ? matchMedia("(max-width : 768px)").matches
      : false;
  const pathname = usePathname();

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

  const handleCollapse = (value: boolean) => {
    document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
      value
    )}`;
    setIsCollapsed(value);
  };

  return (
    <>
      <ResizablePanel
        collapsible
        collapsedSize={4}
        minSize={8}
        defaultSize={isSmallDevice || isCollapsed ? 4 : 20}
        maxSize={20}
        onCollapse={() => handleCollapse(true)}
        onExpand={() => handleCollapse(false)}
        className="min-w-14 max-h-screen"
      >
        <div className="flex flex-col h-full">
          <TooltipProvider delayDuration={100}>
            <div className="flex flex-col gap-1 p-2">
              {sideNavButton.map(({ icon, name, url }, i) => (
                <React.Fragment key={i}>
                  {isCollapsed ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant={url === pathname ? "default" : "ghost"}
                          size="icon"
                          asChild
                          className="self-center"
                        >
                          <Link href={url}>{icon}</Link>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="left">{name}</TooltipContent>
                    </Tooltip>
                  ) : (
                    <Button
                      asChild
                      variant={url === pathname ? "default" : "ghost"}
                      className="justify-start space-x-2"
                    >
                      <Link href={url}>
                        {icon}
                        <span>{name}</span>
                      </Link>
                    </Button>
                  )}
                </React.Fragment>
              ))}
            </div>
            <Separator />
            <div className="flex flex-col justify-end flex-1 px-2 py-4">
              <ToogleTheme isCollapsed={isCollapsed} />
            </div>
          </TooltipProvider>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle disabled={isSmallDevice} />
    </>
  );
}
