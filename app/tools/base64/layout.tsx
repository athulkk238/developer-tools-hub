import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Base64 Encoder & Decoder - Free Online Tool",
  description:
    "Encode text to Base64 or decode Base64 to text online for free. Fast, simple and processed directly in your browser.",
  keywords: [
    "Base64 encoder",
    "Base64 decoder",
    "Base64 encode",
    "Base64 decode",
    "online Base64 tool",
  ],
};

export default function Base64Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}