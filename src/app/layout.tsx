import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
const myFont = localFont({ src: "../utils/TypeUnion - Palo Wide Light.otf" });

export const metadata: Metadata = {
  title: "SpeakSync",
  description: "Generated by Robert Wachira",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={myFont.className}>{children}</body>
    </html>
  );
}
