import { db } from "@/db";
import { category, transaction, user } from "@/db/schema";
import { and, avg, eq, gte } from "drizzle-orm";
import { cache } from "react";

export const getTransaction = cache(async (userId: string) => {
  const result = await db
    .select()
    .from(transaction)
    .where(eq(transaction.user_id, userId))
    .innerJoin(category, eq(transaction.category_id, category.id));
  return result;
});

export const getTotalExpenses = cache(
  async (userId: string, thisMonth?: Date) => {
    const condition = thisMonth
      ? and(
          gte(transaction.date, thisMonth.toLocaleDateString()),
          eq(transaction.user_id, userId)
        )
      : eq(transaction.user_id, userId);
    const result = await db
      .select()
      .from(transaction)
      .where(and(condition, eq(transaction.type, "expense")));
    return result;
  }
);

export const getTotalIncome = cache(async (userId: string) => {
  const result = await db
    .select()
    .from(transaction)
    .where(
      and(eq(transaction.user_id, userId), eq(transaction.type, "income"))
    );
  return result;
});

export const getAvgExpenses = cache(async (userId: string, thisMonth: Date) => {
  const result = await db
    .select({ value: avg(transaction.amount) })
    .from(transaction)
    .where(
      and(
        and(
          gte(transaction.date, thisMonth.toLocaleDateString()),
          eq(transaction.user_id, userId)
        ),
        eq(transaction.type, "expense")
      )
    );
  return result;
});

export const getCategory = cache(async (userId: string) => {
  const result = await db
    .select()
    .from(category)
    .where(eq(category.user_id, userId));
  return result;
});
