import { validateRequest } from "@/actions/authActions";
import Nav from "@/components/sections/Nav";
import SideNav from "@/components/sections/SideNav";
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const collapsed = cookies().get("react-resizable-panels:collapsed");

  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;

  const { user, session } = await validateRequest();

  if (!user) return redirect("/login");

  return (
    <main className="flex">
      <ResizablePanelGroup direction="horizontal" className="!h-auto">
        <SideNav defaultCollapsed={defaultCollapsed} />
        <ResizablePanel defaultSize={80}>
          <section className="flex flex-col h-screen max-h-screen w-full">
            <ScrollArea className="flex-1">
              <Nav />
              {children}
            </ScrollArea>
          </section>
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}
