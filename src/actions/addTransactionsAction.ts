"use server";

import { db } from "@/db";
import { transaction } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

/**
 * Add a new transaction to the database
 *
 * @param prevState - unused
 * @param formData - the form data of the transaction to be added
 * @returns An object containing the message of the outcome of the operation
 */
export async function addTransactionFormAction(
  prevState: any,
  formData: FormData
) {
  // The data to be inserted into the database
  const rawFormData = {
    user_id: formData.get("userId") as string,
    description: formData.get("description") as string,
    transactionDate: formData.get("transactionDate") as string,
    category: formData.get("category") as string,
    type: formData.get("type") as "income" | "expense",
    amount: formData.get("amount") as string,
  };

  try {
    // Insert the new transaction into the database
    await db.insert(transaction).values({
      user_id: rawFormData.user_id,
      description: rawFormData.description,
      date: rawFormData.transactionDate,
      category_id: rawFormData.category,
      type: rawFormData.type,
      amount: parseInt(rawFormData.amount),
    });

    // Revalidate the path when the operation is successful
    revalidatePath("/(dashboard)/dashboard", "page");

    // Return a success message
    return { success: "Transaction added successfully" };
  } catch (error) {
    // Log the error if there is an error and return undefined
    console.log(error);
  }
}

/**
 * Edit a transaction in the database
 *
 * @param prevState - unused
 * @param formData - the form data of the transaction to be edited
 * @returns An object containing the message of the outcome of the operation
 */
export async function editTransactionFormAction(
  prevState: any,
  formData: FormData
) {
  // The data to be inserted into the database
  const rawFormData = {
    transactionId: formData.get("transactionId") as string,
    description: formData.get("description") as string,
    transactionDate: formData.get("transactionDate") as string,
    category: formData.get("category") as string,
    type: formData.get("type") as "income" | "expense",
    amount: formData.get("amount") as string,
  };

  try {
    // Update the transaction in the database
    await db
      .update(transaction)
      .set({
        description: rawFormData.description,
        date: rawFormData.transactionDate,
        category_id: rawFormData.category,
        type: rawFormData.type,
        amount: parseInt(rawFormData.amount),
      })
      .where(eq(transaction.id, rawFormData.transactionId));

    // Revalidate the page when the operation is successful
    revalidatePath("/(dashboard)/dashboard", "page");

    // Return a success message
    return { success: "Transaction edited successfully" };
  } catch (error) {
    // Log the error if there is an error and return undefined
    console.log(error);
  }
}
