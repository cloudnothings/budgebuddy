import "@/styles/globals.css";

import { Fragment } from "react";
import DashboardNav from "./_components/dashboard-nav";

export const metadata = {
  title: "Budge Buddy",
  description: "Make sharing a budget easy",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout(props: {
  children: React.ReactNode;
  params: { id: string };
}) {
  return (
    <Fragment>
      <DashboardNav {...props} />
      {props.children}
    </Fragment>
  );
}
