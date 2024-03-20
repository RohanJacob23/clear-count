"use client";

import { IncomeAndExpense } from "@/types/type";
import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function ExpenseLineChart({
  incomeAndExpense,
}: {
  incomeAndExpense: IncomeAndExpense[];
}) {
  return (
    <ResponsiveContainer className="!min-w-96 !h-56 !w-full">
      <LineChart
        data={incomeAndExpense}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip labelClassName="!text-black" />
        <Legend />
        <Line type="monotone" dataKey="income" stroke="#FFD700" />
        <Line type="monotone" dataKey="expense" stroke="#E84855" />
      </LineChart>
    </ResponsiveContainer>
  );
}
