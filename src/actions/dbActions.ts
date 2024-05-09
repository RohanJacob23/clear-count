"use server";

import { db } from "@/db";
import { category, transaction } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

/**
 * Deletes a transaction with the given id
 *
 * @param id - The id of the transaction to delete
 */
export async function deleteTransaction(id: string) {
  // Delete the transaction from the database
  await db.delete(transaction).where(eq(transaction.id, id));

  // Revalidate the path so that the page is reloaded
  // with the updated transactions
  revalidatePath("/(dashboard)/dashboard", "page");
}

/**
 * Adds a new category to the database
 *
 * @param {string} name - The name of the category to add
 * @param {string} user_id - The id of the user who is adding the category
 *
 * @returns {Promise<void>}
 */
export async function addCategory(name: string, user_id: string) {
  // Insert the category into the database
  await db
    .insert(category)
    .values({ name: name[0].toUpperCase() + name.slice(1), user_id });

  // Revalidate the path so that the page is reloaded with the updated categories
  revalidatePath("/(dashboard)/dashboard", "page");
}
