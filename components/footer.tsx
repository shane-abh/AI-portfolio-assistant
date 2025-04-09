import Link from "next/link"


const Footer = () => {
  return (
    <footer className="border-t bg-gray-50">
        <div className="container flex flex-col gap-4 py-10 px-4 flex-row md:justify-between ">
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <span className="text-lg font-bold">StockSage</span>
            </Link>
            <p className="text-sm text-gray-500">
              Educational stock analysis and portfolio recommendations powered by AI.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col gap-2 text-sm">
              <p className="font-medium">Quick Links</p>
              <Link href="/search" className="text-gray-500 hover:underline">
                Stocks
              </Link>
              <Link href="/riskProfile" className="text-gray-500 hover:underline">
                Risk Profile
              </Link>
              <Link href="/portfolioRecomendation" className="text-gray-500 hover:underline">
                Recommendations
              </Link>
              <Link href="/portfolioAnalyzer" className="text-gray-500 hover:underline">
                Analysis
              </Link>
            </div>
           
          </div>
        </div>
        <div className="border-t py-6">
          <div className="container px-4 md:px-6 flex flex-col md:flex-row items-center justify-center md:justify-between gap-4 text-center md:text-left">
            <p className="text-sm text-gray-500">© 2025 StockSage. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link href="#" className="text-gray-500 hover:text-gray-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-gray-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-gray-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
  )
}

export default Footer