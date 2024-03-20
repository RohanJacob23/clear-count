"use client";

import { MonthExpenses } from "@/types/type";
import React from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function MontlyExpBarChart({
  monthExpenseData,
}: {
  monthExpenseData: MonthExpenses[];
}) {
  return (
    <ResponsiveContainer className="!min-w-96 !h-56 !w-full">
      <BarChart
        width={500}
        height={300}
        data={monthExpenseData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip cursor={false} labelClassName="!text-black" />
        <Bar radius={[4, 4, 0, 0]} dataKey="amount" fill="#FFD700" />
      </BarChart>
    </ResponsiveContainer>
  );
}
