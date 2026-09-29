import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JWT Decoder - Free Online JSON Web Token Decoder",
  description:
    "Decode and inspect JWT tokens online. View JWT header, payload, and signature directly in your browser.",
  keywords: [
    "JWT decoder",
    "JWT token decoder",
    "JSON Web Token decoder",
    "decode JWT",
    "JWT parser",
    "online JWT decoder",
  ],
};

export default function JwtDecoderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}