import { redirect } from "next/navigation";

export default function page() {
  // don't want a seperate page for edit transaction that's why redirecting to dashboard whenever the page is reloaded
  redirect("/dashboard");
}
