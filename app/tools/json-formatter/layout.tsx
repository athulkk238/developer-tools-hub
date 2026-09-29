import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Formatter & Validator - Free Online JSON Tool",
  description:
    "Format, validate and minify JSON online for free. Fast, private and easy to use. Your JSON is processed directly in your browser.",
  keywords: [
    "JSON formatter",
    "JSON validator",
    "JSON beautifier",
    "JSON minifier",
    "JSON viewer",
    "online JSON tool",
  ],
};

export default function JsonFormatterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}