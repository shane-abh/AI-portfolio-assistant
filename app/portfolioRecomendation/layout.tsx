import "../globals.css"
import { ReactNode } from "react";

import { Inter } from "next/font/google"

// import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Stock Portfolio Recommendation",
  description: "Personalized stock portfolio recommendations based on your investment profile",
}


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <ThemeProvider attribute="class" defaultTheme="light" enableSystem> */}
          <main>{children}</main>
        {/* </ThemeProvider> */}
      </body>
    </html>
  )
}

