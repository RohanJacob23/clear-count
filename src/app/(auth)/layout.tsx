import { validateRequest } from "@/actions/authActions";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await validateRequest();
  if (user) return redirect("/dashboard");
  return <>{children}</>;
}
