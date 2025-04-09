"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useNavigation } from "../../context/NavigationContext";
import { History, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import StockSearchBar from "@/components/stock-search-bar";
import "../globals.css";

export default function SearchPage() {
  const [recentSearches, setRecentSearches] = useState<any[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams?.get("q") || "";
  const { setValidAccess } = useNavigation();

  // Load recent searches from localStorage on component mount
  useEffect(() => {
    const savedSearches = localStorage.getItem("recentStockSearches");
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  const handleSearchResultClick = (ticker: string, name: string) => {
    // Update recent searches state
    const updatedSearches = [
      { ticker, name },
      ...recentSearches.filter((item) => item.ticker !== ticker).slice(0, 4),
    ];
    setRecentSearches(updatedSearches);

    // Navigate to stock page
    setValidAccess(true);
    router.push(`/${ticker.toLowerCase()}`);
  };

  const clearRecentSearches = () => {
    localStorage.removeItem("recentStockSearches");
    setRecentSearches([]);
  };

  // Mock popular stocks for demonstration
  const popularStocks = [
    { ticker: "AAPL", name: "Apple Inc." },
    { ticker: "MSFT", name: "Microsoft Corporation" },
    { ticker: "GOOGL", name: "Alphabet Inc." },
    { ticker: "AMZN", name: "Amazon.com Inc." },
    { ticker: "TSLA", name: "Tesla, Inc." },
    { ticker: "META", name: "Meta Platforms, Inc." },
  ];

  return (
    <div className="container px-4 py-8 mx-auto md:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Stock Search</h1>
          <p className="mt-2 text-gray-600">
            Find detailed information about any publicly traded company
          </p>
        </div>

        <div className="relative mb-8">
          <StockSearchBar
            onResultClick={handleSearchResultClick}
            placeholder="Search by company name or ticker symbol..."
            className="w-full"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Recent Searches */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <History className="mr-2 h-5 w-5 text-gray-500" />
                  <h2 className="text-lg font-medium">Recent Searches</h2>
                </div>
                {recentSearches.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearRecentSearches}
                  >
                    Clear
                  </Button>
                )}
              </div>
              {recentSearches.length > 0 ? (
                <ul className="space-y-2">
                  {recentSearches.map((search, index) => (
                    <li key={index}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-left"
                        onClick={() =>
                          handleSearchResultClick(search.ticker, search.name)
                        }
                      >
                        <span className="font-medium mr-2">
                          {search.ticker}
                        </span>
                        <span className="text-gray-500 truncate">
                          {search.name}
                        </span>
                      </Button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-center py-4">
                  No recent searches
                </p>
              )}
            </CardContent>
          </Card>

          {/* Popular Stocks */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Star className="mr-2 h-5 w-5 text-gray-500" />
                <h2 className="text-lg font-medium">Popular Stocks</h2>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {popularStocks.map((stock, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="justify-start"
                    onClick={() =>
                      handleSearchResultClick(stock.ticker, stock.name)
                    }
                  >
                    <span className="font-medium">{stock.ticker}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">Not sure what to search for?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/riskProfile">
              <Button className="bg-green-600 hover:bg-green-700">
                Complete Risk Profile
              </Button>
            </Link>
            <Link href="/portfolioRecommendation">
              <Button variant="outline">View Recommendations</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
