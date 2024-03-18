"use server";

import { db } from "@/db";
import { transaction } from "@/db/schema";
import { revalidatePath } from "next/cache";

export const addTransactionFormAction = async (
  prevState: any,
  formData: FormData
) => {
  const rawFormData = {
    user_id: formData.get("userId") as string,
    description: formData.get("description") as string,
    transactionDate: formData.get("transactionDate") as string,
    category: formData.get("category") as string,
    type: formData.get("type") as "income" | "expense",
    amount: formData.get("amount") as string,
  };

  try {
    await db.insert(transaction).values({
      user_id: rawFormData.user_id,
      description: rawFormData.description,
      date: rawFormData.transactionDate,
      category_id: rawFormData.category,
      type: rawFormData.type,
      amount: parseInt(rawFormData.amount),
    });

    revalidatePath("/(dashboard)/dashboard", "page");
    return { success: "Transaction added successfully" };
  } catch (error) {
    console.log(error);
  }
};
