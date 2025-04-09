import "../globals.css"
import { ReactNode } from "react";

import { Inter } from "next/font/google"
import Header from "@/components/header";
import Footer from "@/components/footer";


// import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Stock Portfolio Analysis",
  description: "Analyze your stock portfolio and get personalized recommendations",
}


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
     <Header/>
        {/* <ThemeProvider attribute="class" defaultTheme="light" enableSystem> */}
          <main>{children}</main>
        {/* </ThemeProvider> */}
      </body>
      <Footer/>
    </html>
  )
}

