import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unix Timestamp Converter - Free Online Tool",
  description:
    "Convert Unix timestamps to readable dates and convert dates to Unix timestamps. Supports seconds and milliseconds.",
  keywords: [
    "Unix timestamp converter",
    "timestamp converter",
    "Unix time",
    "epoch converter",
    "epoch timestamp",
    "Unix timestamp to date",
  ],
};

export default function TimestampLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}