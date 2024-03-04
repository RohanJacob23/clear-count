import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAvgExpenses, getTotalExpenses } from "@/lib/dbFunctions/db";

export default async function ExpenseOverviewCard({
  title,
  userId,
  avg = false,
  currentDate = false,
}: {
  title: string;
  userId: string;
  currentDate?: boolean;
  avg?: boolean;
}) {
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const totalExpense = currentDate
    ? await getTotalExpenses(userId, firstDayOfMonth)
    : await getTotalExpenses(userId);

  const totalAmount = totalExpense.reduce((acc, expense) => {
    if (expense.amount !== null) {
      return acc + expense.amount;
    } else {
      return acc;
    }
  }, 0);

  let avgExpense = "";
  if (avg) {
    const averageExpenseResponse = await getAvgExpenses(
      userId,
      firstDayOfMonth
    );
    avgExpense =
      averageExpenseResponse &&
      parseFloat(averageExpenseResponse[0].value!).toFixed(2);
  }

  return (
    <Card className="flex-1 min-w-40 sm:min-w-56 rounded-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <h3>
          $
          {avgExpense
            ? isNaN(parseFloat(avgExpense))
              ? 0
              : avgExpense
            : totalAmount}
        </h3>
      </CardContent>
    </Card>
  );
}
