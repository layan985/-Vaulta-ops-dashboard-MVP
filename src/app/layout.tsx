import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Flowdesk — Booking & Approval Platform",
  description: "Professional booking system with admin approval workflow.",
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
