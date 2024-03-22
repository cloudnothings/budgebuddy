import "@/styles/globals.css";
import DashboardNav from "./_components/dashboard-nav";
import { getAccounts } from "@/data-layer/financialAccount";
import BudgetSidebarNav from "./_components/budget-sidebar-nav";

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
        <div className="flex h-[calc(100vh-57px)]">
          <div className="w-56 border-r border-border/40 ">
            <BudgetSidebarNav {...props} accounts={accounts} />
          </div>
          <div className="flex-1">
            {props.children}
          </div>
        </div>
      </main>
    </div>
  );
}
