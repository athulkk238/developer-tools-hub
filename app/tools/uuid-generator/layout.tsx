import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UUID Generator - Free Online UUID v4 Generator",
  description:
    "Generate random UUID v4 identifiers online for free. Generate multiple UUIDs instantly in your browser.",
  keywords: [
    "UUID generator",
    "UUID v4 generator",
    "random UUID",
    "GUID generator",
    "online UUID generator",
  ],
};

export default function UUIDGeneratorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}