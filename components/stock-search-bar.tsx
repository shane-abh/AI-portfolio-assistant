"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useDebounce } from "@/hooks/useDebounce"
import { useRouter } from "next/navigation"
import axios from "axios"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

type StockSearchResult = {
  ticker: string
  name: string
  assetType?: string
}

type StockSearchBarProps = {
  variant?: "default" | "homepage"
  onResultClick?: (ticker: string, name: string) => void
  placeholder?: string
  showPopularSearches?: boolean
  className?: string
}

export default function StockSearchBar({
  variant = "default",
  onResultClick,
  placeholder = "Search for a stock (e.g., AAPL, MSFT)",
  showPopularSearches = false,
  className = "",
}: StockSearchBarProps) {
  const [query, setQuery] = useState("")
  const [searchResults, setSearchResults] = useState<StockSearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showResults, setShowResults] = useState(false)
  const router = useRouter()

  const debouncedQuery = useDebounce(query, 500)

  // Popular stocks for quick access
  const popularStocks = [
    { ticker: "AAPL", name: "Apple Inc." },
    { ticker: "MSFT", name: "Microsoft Corporation" },
    { ticker: "GOOGL", name: "Alphabet Inc." },
    { ticker: "AMZN", name: "Amazon.com Inc." },
  ]

  async function fetchSearchResults(searchTerm: string) {
    if (!searchTerm || searchTerm.length < 2) {
      setSearchResults([])
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Using the Tiingo API as specified in the original code
      const response = await fetch(
        `/api/search?query=${searchTerm}`,
      )
      const data = await response.json()
      setSearchResults(data)
    } catch (error: any) {
      console.error("Search error:", error)
      setError(error.message || "Error fetching search results. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSearchResults(debouncedQuery)
  }, [debouncedQuery])

  useEffect(() => {
    // Show results dropdown when query is entered
    setShowResults(query.length > 0)
  }, [query])

  const handleSearchResultClick = (ticker: string, name: string) => {
    // Save to recent searches in localStorage
    try {
      const savedSearches = localStorage.getItem("recentStockSearches")
      let recentSearches = savedSearches ? JSON.parse(savedSearches) : []

      // Add the new search and remove duplicates
      recentSearches = [{ ticker, name }, ...recentSearches.filter((item: any) => item.ticker !== ticker).slice(0, 4)]
      localStorage.setItem("recentStockSearches", JSON.stringify(recentSearches))
      
    } catch (e) {
      console.error("Error saving to localStorage:", e)
    }

    // Clear the search input
    setQuery("")
    setShowResults(false)

    // Call the custom click handler if provided
    if (onResultClick) {
      onResultClick(ticker, name)
    } else {
      // Default behavior: navigate to stock page
      router.push(`/stocks/${ticker.toLowerCase()}`)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
    }
  }

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSubmit}>
        <div
          className={`flex items-center ${
            variant === "homepage"
              ? "border-2 border-green-100 focus-within:border-green-300 rounded-lg"
              : "border-2 border-green-500 rounded-lg focus-within:ring-2 focus-within:ring-green-200"
          } overflow-hidden transition-all`}
        >
          <Search className={`${variant === "homepage" ? "ml-2.5 h-5 w-5" : "ml-3 h-5 w-5"} text-gray-400`} />
          <Input
            type="search"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={`flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 ${
              variant === "homepage" ? "h-12 text-base" : "text-lg py-6"
            }`}
          />
          {query && (
            <Button type="button" variant="ghost" size="sm" className="mr-1" onClick={() => setQuery("")}>
              <X className="h-4 w-4" />
            </Button>
          )}
          <Button
            type="submit"
            className={`${
              variant === "homepage" ? "h-12 px-4" : "h-12 px-6"
            } bg-green-600 hover:bg-green-700 rounded-none`}
          >
            <Search className="mr-2 h-5 w-5" />
            Search
          </Button>
        </div>
      </form>

      {/* Search Results Dropdown */}
      {showResults && (
        <Card className="absolute w-full mt-1 z-50 max-h-[400px] overflow-y-auto">
          <CardContent className="p-0">
            {loading ? (
              <div className="p-4 space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="p-4 text-center text-red-500">{error}</div>
            ) : searchResults.length > 0 ? (
              <ul className="py-1">
                {searchResults.map((item, index) => (
                  <li
                    key={index}
                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => handleSearchResultClick(item.ticker, item.name)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium text-lg">{item.ticker}</span>
                        <p className="text-sm text-gray-500">{item.name}</p>
                      </div>
                      <Badge variant="outline" className="ml-2">
                        {item.assetType || "Stock"}
                      </Badge>
                    </div>
                  </li>
                ))}
              </ul>
            ) : query.length > 1 ? (
              <div className="p-4 text-center text-gray-500">No results found for {query}</div>
            ) : null}
          </CardContent>
        </Card>
      )}

      {/* Popular Searches */}
      {showPopularSearches && variant === "homepage" && !query && (
        <div className="flex flex-wrap gap-2 justify-center mt-2">
          <span className="text-xs text-gray-500">Popular searches:</span>
          {popularStocks.map((stock, index) => (
            <button
              key={index}
              className="text-xs text-green-600 hover:underline"
              onClick={() => handleSearchResultClick(stock.ticker, stock.name)}
            >
              {stock.ticker}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
