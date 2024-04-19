import { validateRequest } from "@/actions/authActions";
import EditTransactionModal from "@/components/EditTransactionModal";
import { getCategory, getUserTransaction } from "@/lib/dbFunctions/db";
import { redirect } from "next/navigation";

export default async function page({
  params: { id },
}: {
  params: { id: string };
}) {
  const { user } = await validateRequest();
  const [userTransaction] = await getUserTransaction(user!.id, id);
  const categories = await getCategory(user!.id);
  if (userTransaction)
    return (
      <EditTransactionModal
        transactionId={id}
        userTransaction={userTransaction}
        categories={categories}
      />
    );
  else redirect("/dashboard");
}
