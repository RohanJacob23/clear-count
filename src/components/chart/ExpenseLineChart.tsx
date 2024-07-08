"use client";

import { IncomeAndExpense } from "@/types/type";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";

const chartConfig = {
  income: {
    label: "income",
    color: "hsl(var(--chart-1))",
  },
  expense: {
    label: "expense",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export default function ExpenseLineChart({
  incomeAndExpense,
}: {
  incomeAndExpense: IncomeAndExpense[];
}) {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <LineChart accessibilityLayer data={incomeAndExpense}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="name"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
        <ChartLegend content={<ChartLegendContent />} />

        <Line type="monotone" dataKey="income" stroke="var(--color-income)" />
        <Line type="monotone" dataKey="expense" stroke="var(--color-expense)" />
      </LineChart>
    </ChartContainer>
  );
}
