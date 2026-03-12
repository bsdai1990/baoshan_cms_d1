import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Baoshan Optical",
    default: "Baoshan Optical - Professional Optical Communication Products and Solutions",
  },
  description:
    "Baoshan Optical specializes in optical fibers, cables, optical modules and system integration, providing high-quality products and solutions for communication operators, data centers and enterprise networks.",
  keywords: ["optical communication", "optical fiber", "optical cable", "optical module", "FTTH", "data center"],
};

export default function RootLayout({
  children,
}: Readonly<{
    children: React.ReactNode;
}>) {
  return (
    <html lang="en-US">
      <body className="antialiased">{children}</body>
    </html>
  );
}
