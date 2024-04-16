import { validateRequestFn } from "@/actions/authActions";
import Nav from "@/components/sections/Nav";
import SideNav from "@/components/sections/SideNav";
import { ScrollArea } from "@/components/ui/scroll-area";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, session } = await validateRequestFn();

  if (!user) return redirect("/login");

  return (
    <main className="flex">
      <SideNav />
      <section className="flex flex-col h-screen max-h-screen w-full">
        <ScrollArea className="flex-1">
          <Nav />
          {children}
        </ScrollArea>
      </section>
    </main>
  );
}
