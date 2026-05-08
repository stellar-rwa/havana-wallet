// frontend/src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import { StellarProvider } from "@/providers/StellarProvider";
import { QueryProvider } from "@/providers/QueryProvider";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"] });
const spaceMono = Space_Mono({ variable: "--font-space-mono", subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Havana | Financial Freedom for Refugees",
  description: "Self-sovereign financial identity and payment platform for forcibly displaced people, built on the Stellar blockchain.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark h-full antialiased">
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${spaceMono.variable} min-h-full flex flex-col bg-background text-text-primary`}>
        <QueryProvider>
          <StellarProvider>
            {children}
          </StellarProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
