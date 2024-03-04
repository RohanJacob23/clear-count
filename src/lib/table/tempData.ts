export type Payment = {
  id: string;
  amount: number;
  category: string;
  date: Date;
  type: "income" | "expense";
  description: string;
};

export const payments: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    date: new Date(),
    category: "Food",
    type: "expense",
    description: "random description",
  },
  {
    id: "23k90499",
    amount: 500,
    date: new Date(),
    category: "Food",
    type: "expense",
    description: "random description",
  },
  {
    id: "489e1d42",
    amount: 125,
    date: new Date(),
    category: "Food",
    description: "some random description",
    type: "income",
  },
  // ...
];
