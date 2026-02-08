import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FIGHTHYPE AI - Boxing Analysis Tool",
  description: "AI-powered boxing analysis tool. Upload your training videos and get instant insights on power, technique, and performance.",
  keywords: ["boxing", "AI analysis", "fight training", "punch tracking", "boxing technology", "sports analytics", "combat sports"],
  authors: [{ name: "FIGHTHYPE Team" }],
  icons: {
    icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🥊</text></svg>",
  },
  openGraph: {
    title: "FIGHTHYPE AI - Boxing Analysis",
    description: "Get AI-powered boxing analysis of your training videos",
    siteName: "FIGHTHYPE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FIGHTHYPE AI - Boxing Analysis",
    description: "AI-powered boxing analysis tool",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
