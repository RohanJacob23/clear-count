import { validateRequest } from "@/actions/authActions";
import DataTable from "../table/data-table";
import { getCategory, getTransaction } from "@/lib/dbFunctions/db";
import { columns } from "../table/column-defination";

export default async function TransactionTable() {
  const { user } = await validateRequest();

  const categories = await getCategory(user!.id);
  const result = await getTransaction(user!.id);
  const transactions = result.map((item) => ({
    ...item.transaction,
    category: item.category.name,
  }));

  return (
    <DataTable
      categories={categories}
      userId={user!.id}
      columns={columns}
      data={transactions}
    />
  );
}
