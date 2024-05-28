
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "./utils/store";
import NavBarCliente from "./ui/components/navBarParameters";
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
    const logo = '/logo.png'

  

  return (
    <html lang="en">

      <body className={inter.className}>
      <NavBarCliente logo={logo}/>
      
        
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>

    </html>
  );
}
