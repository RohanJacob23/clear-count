"use server";

import { db } from "@/db";
import { category, transaction } from "@/db/schema";
import { getCategory } from "@/lib/dbFunctions/db";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function deleteTransaction(id: string) {
  await db.delete(transaction).where(eq(transaction.id, id));
  revalidatePath("/(dashboard)/dashboard", "page");
}

export async function addCategory(name: string, user_id: string) {
  await db
    .insert(category)
    .values({ name: name[0].toUpperCase() + name.slice(1), user_id });

  revalidatePath("/(dashboard)/dashboard", "page");
}

export async function getUserTransaction(
  userId: string,
  transactionId: string
) {
  const result = await db
    .select()
    .from(transaction)
    .where(
      and(eq(transaction.user_id, userId), eq(transaction.id, transactionId))
    );
  return result;
}

export async function getCategoryFromServer(userId: string) {
  return getCategory(userId);
}
