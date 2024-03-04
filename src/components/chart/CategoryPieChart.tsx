"use client";

import { DataWithPercentage } from "@/types/type";
import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

export default function CategoryPieChart({
  data,
}: {
  data: DataWithPercentage[];
}) {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  return (
    <ResponsiveContainer className="!min-w-96 !h-56 !w-full">
      <PieChart>
        <Pie
          dataKey="amount"
          data={data}
          // name="category"
          outerRadius={80}
          fill="#8884d8"
          label={({ percentage }) => `${percentage}%`}
        >
          {data.map((item, i) => (
            <Cell key={item.name} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
