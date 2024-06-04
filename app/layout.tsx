

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "./utils/store";
import Script from "next/script";
const inter = Inter({ subsets: ["latin"] });



export const metadata: Metadata = {
  title: "Bodine",
  description: "La mejor forma de tomar tu vino",
};

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  

  

  return (
    <html lang="en">

      <body className={inter.className}>
      

      
        
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>

    </html>
  );
}
