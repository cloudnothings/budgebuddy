import "@/styles/globals.css";
import DashboardNav from "./_components/dashboard-nav";
import SidebarCookieProvider from "./_components/sidebar-cookie-provider";

export const metadata = {
  title: "Budge Buddy",
  description: "Make sharing a budget easy",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function BudgetsLayout(props: {
  children: React.ReactNode;
  params: { id: string };
}) {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <DashboardNav {...props} />
      <main className="flex-1">
        <SidebarCookieProvider {...props} >
          {props.children}
        </SidebarCookieProvider>
      </main>
    </div>
  );
}
