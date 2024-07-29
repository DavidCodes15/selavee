import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Footer from "@/components/Footer";
const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Selavee - Jewelry Store",
  description: "Jewelry Store - Selavee",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className={cn("relative font-sans antialiased", inter.className)}>
        <main className="relative flex flex-col min-h-screen">
          
          <div className="flex-grow flex-1">{children}</div>
          {/* <Footer />  */}
        </main>
      </body>
    </html>
  );
}
