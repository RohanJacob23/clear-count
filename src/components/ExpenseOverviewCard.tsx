import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAvgExpenses, getTotalExpenses } from "@/lib/dbFunctions/db";
import { validateRequest } from "@/actions/authActions";

export default async function ExpenseOverviewCard({
  title,
  avg = false,
  currentDate = false,
}: {
  title: string;
  currentDate?: boolean;
  avg?: boolean;
}) {
  const { user } = await validateRequest();

  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const totalExpense = currentDate
    ? await getTotalExpenses(user!.id, firstDayOfMonth)
    : await getTotalExpenses(user!.id);

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
      user!.id,
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
          ₹
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
