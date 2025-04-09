import "../globals.css";
import { ReactNode } from "react";

import { Inter } from "next/font/google";
import Header from "@/components/header";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Stock Portfolio Recommendation",
  description:
    "Personalized stock portfolio recommendations based on your investment profile",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <Header />
      <body className={inter.className}>
        <main>{children}</main>
      </body>
      <Footer />
    </html>
  );
}
