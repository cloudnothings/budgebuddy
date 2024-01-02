import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { GeistMono } from 'geist/font/mono'
import { Providers } from "../providers";
import { Toaster } from "@/components/ui/toaster";


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
      <head />
      <body className={`min-h-screen bg-background font-sans antialiased ${GeistSans.variable} ${GeistMono.variable}`}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
