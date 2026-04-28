import type { Metadata } from "next";
import { IBM_Plex_Mono, Space_Grotesk, Geist } from "next/font/google";

import { AppProviders } from "@/components/providers/app-providers";

import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Devora",
  description: "Agentic project operations workspace for tickets, chat, files, and AI workflows.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full", "antialiased", mono.variable, "font-sans", geist.variable)}>
      <body className="min-h-full bg-background text-foreground">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
