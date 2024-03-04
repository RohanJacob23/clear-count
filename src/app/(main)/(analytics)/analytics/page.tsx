import { validateRequest } from "@/actions/authActions";
import CategoryPieChart from "@/components/chart/CategoryPieChart";
import ExpenseLineChart from "@/components/chart/ExpenseLineChart";
import MontlyExpBarChart from "@/components/chart/MontlyExpBarChart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getTotalExpenses,
  getTotalIncome,
  getTransaction,
} from "@/lib/dbFunctions/db";
import { Data } from "@/types/type";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analytics",
  description: "Generated by create next app",
};

export default async function page() {
  const { user } = await validateRequest();

  if (!user) return null;

  const transactions = await getTransaction(user.id);
  const expenses = await getTotalExpenses(user.id);
  const incomes = await getTotalIncome(user.id);

  // TODO: Clean up this page

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const currentYear = new Date().getFullYear();

  const monthExpense = Array.from({ length: 12 }, (_, index) => ({
    month: index,
    name: months[index],
    amount: 0,
  }));
  const incomeAndExpense = Array.from({ length: 12 }, (_, index) => ({
    month: index,
    name: months[index],
    expense: 0,
    income: 0,
  }));

  incomes.forEach((income) => {
    const transactionDate = new Date(income.date!); // Create a Date object
    const month = transactionDate.getMonth(); // Get month as a number (0-11)
    const year = transactionDate.getFullYear();

    if (year === currentYear) {
      incomeAndExpense[month].income += income.amount!;
    }
  });

  expenses.forEach((expense) => {
    const transactionDate = new Date(expense.date!); // Create a Date object
    const month = transactionDate.getMonth(); // Get month as a number (0-11)
    const year = transactionDate.getFullYear();

    if (year === currentYear) {
      monthExpense[month].amount += expense.amount!;
      incomeAndExpense[month].expense += expense.amount!;
    }
  });

  const pieChartData = transactions.reduce((acc, transaction) => {
    const categoryName = transaction.category.name!;
    const existingCategory = acc.find((item) => item.name === categoryName);

    if (existingCategory) {
      existingCategory.amount += transaction.transaction.amount!;
    } else {
      acc.push({
        name: categoryName,
        amount: transaction.transaction.amount!,
      });
    }

    return acc;
  }, [] as Data[]);

  const calculatePercentages = (data: Data[]) => {
    const totalSpend = data.reduce((acc, item) => acc + item.amount, 0);
    return data.map((item) => ({
      ...item,
      percentage: Math.round((item.amount / totalSpend) * 100),
    }));
  };

  const pieChartDataWithPercentages = calculatePercentages(pieChartData);

  return (
    <div className="flex flex-col p-4 max-w-screen-xl mx-auto">
      <h3>Analytics</h3>

      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-4 gap-4">
        {/* Balance Card */}
        <Card className="rounded-lg md:row-span-2">
          <CardHeader>
            <CardDescription>Balance</CardDescription>
            <CardTitle>$1000</CardTitle>
          </CardHeader>
          <CardContent className="p-6"></CardContent>
        </Card>

        {/* Income vs Expense Card */}

        <Card className="rounded-lg md:col-span-2 md:row-span-2">
          <CardHeader>
            <CardDescription>Line Chart</CardDescription>
            <CardTitle>Income vs Expense</CardTitle>
            <CardContent className="p-6 overflow-x-auto ">
              <ExpenseLineChart incomeAndExpense={incomeAndExpense} />
            </CardContent>
          </CardHeader>
        </Card>

        {/* upcomming chart */}
        <Card className="rounded-lg md:row-span-2 md:col-start-4">
          <CardHeader>
            <CardTitle className="text-muted-foreground">
              New Chart For Analytics Comming Soon...
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Bar chart */}
        <Card className="rounded-lg md:col-span-2 md:row-span-2 md:row-start-3">
          <CardHeader>
            <CardDescription>Pie Chart</CardDescription>
            <CardTitle>Spending by Category</CardTitle>
          </CardHeader>
          <CardContent className="p-6 overflow-x-auto">
            <MontlyExpBarChart monthExpenseData={monthExpense} />
          </CardContent>
        </Card>

        {/* spending by category */}
        <Card className="rounded-lg md:col-span-2 md:row-span-2 md:col-start-3 md:row-start-3">
          <CardHeader>
            <CardDescription>Pie Chart</CardDescription>
            <CardTitle>Spending by Category</CardTitle>
          </CardHeader>
          <CardContent className="p-6 overflow-x-auto">
            <CategoryPieChart data={pieChartDataWithPercentages} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
