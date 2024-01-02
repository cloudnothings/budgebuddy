import "@/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from 'geist/font/mono'
import { Providers } from "../providers";
import { Toaster } from "@/components/ui/toaster";
import LandingNavbar from "./landing-navbar";



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
      <body className={`relative flex min-h-screen flex-col bg-background font-sans antialiased ${GeistSans.variable} ${GeistMono.variable}`}>
        <Providers>
          <LandingNavbar />
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
