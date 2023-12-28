import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { Providers } from "../providers";
import { Toaster } from "@/components/ui/toaster";
import LandingNavbar from "./landing-navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Budge Buddy",
  description: "Make sharing a budget easy",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased ${inter.variable}`}>
        <Providers>
          <LandingNavbar />
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
