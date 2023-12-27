import "@/styles/globals.css";
import DashboardNav from "../_components/dashboard-nav";

export const metadata = {
  title: "Budge Buddy",
  description: "Make sharing a budget easy",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  return (
    <div className="flex flex-col w-full">
      <DashboardNav params={params} />
      {children}
    </div>
  );
}
