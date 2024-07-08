"use client";

import { DataWithPercentage } from "@/types/type";
import React from "react";
import { Pie, PieChart } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";

export default function CategoryPieChart({
  data,
}: {
  data: DataWithPercentage[];
}) {
  return (
    <ChartContainer config={{}} className="min-h-[200px] w-full">
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel indicator="line" />}
        />
        <Pie
          data={data}
          dataKey="amount"
          label={({ percentage }) => `${percentage}%`}
          innerRadius={60}
        />
      </PieChart>
    </ChartContainer>
  );
}
