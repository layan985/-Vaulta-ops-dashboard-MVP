import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vaulta — Ops Dashboard",
  description: "Internal ops dashboard for KPIs, users, and activity logs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
