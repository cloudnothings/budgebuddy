import "@/styles/globals.css";
import DashboardNav from "./_components/dashboard-nav";
import { getAccounts } from "@/data-layer/financialAccount";
import BudgetSidebarNav from "./_components/budget-sidebar-nav";
import { ScrollArea } from "@/components/ui/scroll-area";

export const metadata = {
  title: "Budge Buddy",
  description: "Make sharing a budget easy",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function BudgetsLayout(props: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const accounts = await getAccounts(props.params.id);
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <DashboardNav {...props} />
      <main className="flex-1">
        <div className="grid grid-cols-12">
          <div className="col-span-2">
            <BudgetSidebarNav {...props} accounts={accounts} />
          </div>
          <div className="col-span-10">
            {props.children}
          </div>
        </div>
      </main>
    </div>
  );
}
