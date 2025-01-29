import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PopUp from "@/components/PopUp";
import { Providers } from "./providers"; // Import the Providers component

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Comforty Furnitures",
  description: "Single Stop to Furniture Solutions",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers> {/* Wrap everything in the Providers component */}
          <PopUp />
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
