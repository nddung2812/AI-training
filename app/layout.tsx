import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Square Drawing Co. Academy · DrawingHub AI Training",
  description:
    "Bite-sized, playful lessons that turn AI buzzwords into things you can actually use at work — from how agents work to mastering the Claude Desktop App.",
  icons: {
    icon: [{ url: "/logo.png", type: "image/png" }],
    apple: [{ url: "/logo.png", type: "image/png" }],
  },
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
