export interface Transaction {
  date: string | null;
  id: string;
  user_id: string;
  category_id: string | null;
  category?: string | null;
  amount: number | null;
  description: string | null;
  type: "income" | "expense" | null;
}

export interface Category {
  id: string;
  name: string | null;
  user_id: string;
}

export interface Type {
  name: string;
}

export interface Data {
  name: string;
  amount: number;
}

export interface DataWithPercentage extends Data {
  percentage: number;
}

export interface MonthExpenses {
  month: string;
  amount: number;
}

export interface IncomeAndExpense {
  name: string;
  expense: number;
  income: number;
}
