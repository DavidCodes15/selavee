import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Footer from "@/components/Footer";
import Provider from "./trpc/Provider";
import { Toaster } from "sonner";
import AutomaticTheme from "@/components/AutomaticNavbarTheme";

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
    <html lang="en" className="h-full overflow-x-hidden">
      <body className={cn("relative font-sans antialiased", inter.className)}>
        <main className="relative flex min-h-screen flex-col">
          
          {/**needs work */}
          
          <Provider>
          <div className="absolute top-0 w-full">
          <AutomaticTheme />
          </div>
          <div className="flex-1 flex-grow">{children}</div>
          <Footer />
          </Provider>
        </main>
        <Toaster position="top-center" richColors/>
      </body>
    </html>
  );
}
