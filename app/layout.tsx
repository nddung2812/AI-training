import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DrawingHub AI Academy",
  description:
    "Bite-sized, playful lessons that turn AI buzzwords into things you can actually use at work — learn by playing, one quick game at a time.",
  icons: {
    icon: [{ url: "/drawinghub-logo.png", type: "image/png" }],
    apple: [{ url: "/drawinghub-logo.png", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={nunito.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
