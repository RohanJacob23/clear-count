"use server";

import { db } from "@/db";
import { category, transaction } from "@/db/schema";
import { eq } from "drizzle-orm";
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
