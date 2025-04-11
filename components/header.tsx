import Link from "next/link"


const Header = () => {
  return (
    <header className="border-b">
    <div className="container flex items-center justify-between h-16 px-4 mx-auto md:px-6">
      <Link href="/" className="flex items-center gap-2 font-semibold">
        <span className="text-xl font-bold">StockSage</span>
      </Link>
      <nav className="hidden md:flex items-center gap-6">
        <Link href="/search" className="text-sm font-medium hover:underline underline-offset-4">
          Stocks
        </Link>
        <Link href="/riskProfile" className="text-sm font-medium hover:underline underline-offset-4">
          Risk Profile
        </Link>
        <Link href="/portfolioRecomendation" className="text-sm font-medium hover:underline underline-offset-4">
          Recommendations
        </Link>
        <Link href="/portfolioAnalyzer" className="text-sm font-medium hover:underline underline-offset-4">
          Analysis
        </Link>
      </nav>
     
    </div>
  </header>
  )
}

export default Header