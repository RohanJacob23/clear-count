import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAvgExpenses, getTotalExpenses } from "@/lib/dbFunctions/db";
import { validateRequest } from "@/actions/authActions";

export default async function ExpenseOverviewCard({
  title,
  showThisMonth = false,
  showAvg = false,
}: {
  title: string;
  showThisMonth?: boolean;
  showAvg?: boolean;
}) {
  /**
   * This function renders an overview card that displays the total expenses
   * for a given period. The period can be either the current year, the
   * current month, or the average expenses per month.
   *
   * The function first validates the user's authentication request, and
   * then calculates the total expenses for the given period. The result
   * is then rendered as an overview card with the title, value, and an
   * optional header.
   */
  const { user } = await validateRequest();

  /**
   * Get the current year and the first day of the year, and the first day
   * of the current month.
   */
  const year = new Date();
  const firstOfYear = new Date(year.getFullYear(), 0, 1);
  const firstOfMonth = new Date(year.getFullYear(), year.getMonth(), 1);

  /**
   * Get the total expenses for the year if showThisMonth and showAvg are
   * both false.
   */
  const [totalExpensesResult] =
    !showThisMonth && !showAvg
      ? await getTotalExpenses(user!.id, firstOfYear.toLocaleDateString())
      : [];

  /**
   * Get the total expenses for the current month if showThisMonth is true.
   */
  const [thisMonthExpensesResult] = showThisMonth
    ? await getTotalExpenses(
        user!.id,
        firstOfYear.toLocaleDateString(),
        firstOfMonth.toLocaleDateString()
      )
    : [];

  /**
   * Get the average expenses per month if showAvg is true.
   */
  const [avgExpensesResult] = showAvg
    ? await getAvgExpenses(user!.id, firstOfMonth.toLocaleDateString())
    : [];

  /**
   * Calculate the value to be displayed on the overview card based on
   * the selected period.
   */
  const showValue = showAvg
    ? parseFloat(avgExpensesResult.result!) // parse the result as a float
    : showThisMonth
    ? thisMonthExpensesResult.result // get the result from the current month
    : totalExpensesResult.result; // get the result from the year

  /**
   * Render the overview card with the title, value, and an optional
   * header.
   */
  return (
    <Card className="flex-1 min-w-40 sm:min-w-56 rounded-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <h3>₹ {showValue}</h3>
      </CardContent>
    </Card>
  );
}
