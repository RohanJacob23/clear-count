import { db } from "@/db";
import { category, transaction, user } from "@/db/schema";
import { and, avg, desc, eq, gte, lte, sum } from "drizzle-orm";
import { cache } from "react";

export const getTransaction = cache(async (userId: string) => {
  const result = await db
    .select()
    .from(transaction)
    .where(eq(transaction.user_id, userId))
    .innerJoin(category, eq(transaction.category_id, category.id))
    .orderBy(desc(transaction.date));
  return result;
});

export const getTotalExpenses = cache(
  async (userId: string, year: string, month?: string) => {
    const condition = month
      ? and(gte(transaction.date, month), eq(transaction.user_id, userId))
      : and(gte(transaction.date, year), eq(transaction.user_id, userId));

    const result = await db
      .select({ result: sum(transaction.amount) })
      .from(transaction)
      .where(and(condition, eq(transaction.type, "expense")));
    return result;
  }
);

export const getTotalIncome = cache(async (userId: string, year: string) => {
  const result = await db
    .select({ result: sum(transaction.amount) })
    .from(transaction)
    .where(
      and(
        gte(transaction.date, year),
        and(eq(transaction.user_id, userId), eq(transaction.type, "income"))
      )
    );
  return result;
});

export const getBalance = cache(async (userId: string, year: string) => {
  const [expense, income] = await db
    .select({ type: transaction.type, amount: sum(transaction.amount) })
    .from(transaction)
    .where(and(gte(transaction.date, year), eq(transaction.user_id, userId)))
    .groupBy(transaction.type);

  let balance = 0;

  if (expense && expense.amount && income && income.amount)
    balance = Number(income.amount) - Number(expense.amount);

  return balance;
});

export const getAvgExpenses = cache(
  async (userId: string, thisMonth: string) => {
    const result = await db
      .select({ result: avg(transaction.amount) })
      .from(transaction)
      .where(
        and(
          and(
            gte(transaction.date, thisMonth),
            eq(transaction.user_id, userId)
          ),
          eq(transaction.type, "expense")
        )
      );
    return result;
  }
);

export const getMonthlyExpenses = cache(async (userId: string) => {
  const result = await db
    .select({
      month: transaction.month,
      amount: sum(transaction.amount),
    })
    .from(transaction)
    .where(
      and(eq(transaction.user_id, userId), eq(transaction.type, "expense"))
    )
    .groupBy(transaction.month);
  return result;
});

export const getMonthlyIncome = cache(async (userId: string) => {
  const result = await db
    .select({
      month: transaction.month,
      amount: sum(transaction.amount),
    })
    .from(transaction)
    .where(and(eq(transaction.user_id, userId), eq(transaction.type, "income")))
    .groupBy(transaction.month);
  return result;
});

export const getExpensesByCategory = cache(async (userId: string) => {
  const result = await db
    .select({ category: category.name, amount: sum(transaction.amount) })
    .from(transaction)
    .where(eq(transaction.user_id, userId))
    .innerJoin(category, eq(category.id, transaction.category_id))
    .groupBy(category.name);

  return result;
});

export const getCategory = cache(async (userId: string) => {
  const result = await db
    .select()
    .from(category)
    .where(eq(category.user_id, userId));
  return result;
});

export const getUserTransaction = async (
  userId: string,
  transactionId: string
) => {
  const result = await db
    .select()
    .from(transaction)
    .where(
      and(eq(transaction.user_id, userId), eq(transaction.id, transactionId))
    );
  return result;
};
