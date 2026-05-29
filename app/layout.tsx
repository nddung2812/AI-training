import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Training at DrawingHub",
  description:
    "Square Drawing Co. — a 5-minute interactive game to learn how AI agents actually work.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
