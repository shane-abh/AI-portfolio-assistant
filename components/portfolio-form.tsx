"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Search, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"

// Mock stock data for search functionality
const mockStocks = [
  { tickerSymbol: "AAPL", companyName: "Apple Inc." },
  { tickerSymbol: "MSFT", companyName: "Microsoft Corporation" },
  { tickerSymbol: "AMZN", companyName: "Amazon.com Inc." },
  { tickerSymbol: "GOOGL", companyName: "Alphabet Inc." },
  { tickerSymbol: "META", companyName: "Meta Platforms Inc." },
  { tickerSymbol: "TSLA", companyName: "Tesla Inc." },
  { tickerSymbol: "NVDA", companyName: "NVIDIA Corporation" },
  { tickerSymbol: "JPM", companyName: "JPMorgan Chase & Co." },
  { tickerSymbol: "V", companyName: "Visa Inc." },
  { tickerSymbol: "WMT", companyName: "Walmart Inc." },
]

// Available sectors for recommendation form
const sectors = [
  "Technology",
  "Healthcare",
  "Financial Services",
  "Consumer Discretionary",
  "Consumer Staples",
  "Industrials",
  "Energy",
  "Materials",
  "Real Estate",
  "Utilities",
  "Communication Services",
]

// Form schemas for both modes
const analyzerSchema = z.object({
  investmentAmount: z.coerce.number().min(1, "Investment amount is required"),
  riskTolerance: z.enum(["Low", "Moderate", "High"]),
  timeHorizon: z.enum(["1-2 years (Short term)", "3-7 years (Medium term)", "7- 10 years (Long term)"]),
  investmentStrategy: z.string(),
  marketConditions: z.enum(["Bearish", "Bullish", "Neutral"]),
  stocks: z
    .array(
      z.object({
        tickerSymbol: z.string(),
        companyName: z.string(),
        allocationPercentage: z.number().min(0).max(100),
      }),
    )
    .refine(
      (stocks) => {
        const total = stocks.reduce((sum, stock) => sum + stock.allocationPercentage, 0)
        return total <= 100
      },
      {
        message: "Total allocation must not exceed 100%",
      },
    ),
})

const recommendationSchema = z.object({
  investmentAmount: z.coerce.number().min(1, "Investment amount is required"),
  riskTolerance: z.enum(["Low", "Moderate", "High"]),
  timeHorizon: z.enum(["1-2 years (Short term)", "3-7 years (Medium term)", "7- 10 years (Long term)"]),
  investmentStrategy: z.string(),
  marketConditions: z.enum(["Bearish", "Bullish", "Neutral"]),
  preferredSectors: z.array(z.string()).min(1, "Select at least one sector"),
  geographicPreference: z.literal("USA"),
})

type PortfolioFormProps = {
  mode: "analyzer" | "recommendation"
  onSubmit: (data: any) => void
  defaultValues?: any
}

export default function PortfolioForm({ mode, onSubmit, defaultValues = {} }: PortfolioFormProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<typeof mockStocks>([])
  const [selectedSectors, setSelectedSectors] = useState<string[]>(defaultValues.preferredSectors || [])

  const schema = mode === "analyzer" ? analyzerSchema : recommendationSchema

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: mode === "analyzer"
      ? {
          investmentAmount: defaultValues.investmentAmount || 100000,
          riskTolerance: defaultValues.riskTolerance || "Moderate",
          timeHorizon: defaultValues.timeHorizon || "3-7 years (Medium term)",
          investmentStrategy: defaultValues.investmentStrategy || "Growth",
          marketConditions: defaultValues.marketConditions || "Neutral",
          stocks: defaultValues.stocks || [],
        }
      : {
          investmentAmount: defaultValues.investmentAmount || 100000,
          riskTolerance: defaultValues.riskTolerance || "Moderate",
          timeHorizon: defaultValues.timeHorizon || "3-7 years (Medium term)",
          investmentStrategy: defaultValues.investmentStrategy || "Growth",
          marketConditions: defaultValues.marketConditions || "Neutral",
          preferredSectors: defaultValues.preferredSectors || [],
          geographicPreference: "USA",
        },
  })

  // Search stocks functionality
  useEffect(() => {
    if (searchQuery.length > 1) {
      const results = mockStocks.filter(
        (stock) =>
          stock.tickerSymbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
          stock.companyName.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }, [searchQuery])

  // Handle stock selection
  const addStock = (stock: (typeof mockStocks)[0]) => {
    const currentStocks = form.getValues("stocks") || []
    if (!currentStocks.some((s) => s.tickerSymbol === stock.tickerSymbol)) {
      form.setValue("stocks", [...currentStocks, { ...stock, allocationPercentage: 0 }])
    }
    setSearchQuery("")
    setSearchResults([])
  }

  // Handle stock removal
  const removeStock = (tickerSymbol: string) => {
    const currentStocks = form.getValues("stocks")
    form.setValue(
      "stocks",
      currentStocks.filter((stock) => stock.tickerSymbol !== tickerSymbol),
    )
  }

  // Calculate remaining allocation
  const getRemainingAllocation = () => {
    if (mode !== "analyzer") return 100
    const stocks = form.getValues("stocks") || []
    const total = stocks.reduce((sum, stock) => sum + (stock.allocationPercentage || 0), 0)
    return 100 - total
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Investment Amount */}
          <FormField
            control={form.control}
            name="investmentAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Investment Amount ($)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="100000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Risk Tolerance */}
          <FormField
            control={form.control}
            name="riskTolerance"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Risk Tolerance</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select risk tolerance" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Moderate">Moderate</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Time Horizon */}
          <FormField
            control={form.control}
            name="timeHorizon"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time Horizon</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time horizon" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1-2 years (Short term)">1-2 years (Short term)</SelectItem>
                    <SelectItem value="3-7 years (Medium term)">3-7 years (Medium term)</SelectItem>
                    <SelectItem value="7- 10 years (Long term)">7-10 years (Long term)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Investment Strategy */}
          <FormField
            control={form.control}
            name="investmentStrategy"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Investment Strategy</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select investment strategy" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Any">Any</SelectItem>
                    <SelectItem value="Growth">Growth</SelectItem>
                    <SelectItem value="Value">Value</SelectItem>
                    <SelectItem value="Income">Income</SelectItem>
                    <SelectItem value="Balanced">Balanced</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Market Conditions */}
          <FormField
            control={form.control}
            name="marketConditions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Market Conditions</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select market conditions" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Bearish">Bearish</SelectItem>
                    <SelectItem value="Bullish">Bullish</SelectItem>
                    <SelectItem value="Neutral">Neutral</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Geographic Preference - Only for recommendation mode */}
          {mode === "recommendation" && (
            <FormField
              control={form.control}
              name="geographicPreference"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Geographic Preference</FormLabel>
                  <FormControl>
                    <Input value="USA" disabled {...field} />
                  </FormControl>
                  <FormDescription>Currently limited to USA markets</FormDescription>
                </FormItem>
              )}
            />
          )}
        </div>

        {/* Mode-specific fields */}
        {mode === "analyzer" && (
          <div className="space-y-4">
            <FormLabel>Stock Selection</FormLabel>
            <div className="flex items-center space-x-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" type="button" className="flex-1">
                    <Search className="mr-2 h-4 w-4" />
                    Search for stocks
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-4">
                    <Input
                      placeholder="Search by ticker or company name"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <div className="max-h-60 overflow-y-auto space-y-1">
                      {searchResults.map((stock) => (
                        <Button
                          key={stock.tickerSymbol}
                          variant="ghost"
                          type="button"
                          className="w-full justify-start text-left"
                          onClick={() => addStock(stock)}
                        >
                          <span className="font-bold mr-2">{stock.tickerSymbol}</span>
                          <span className="text-muted-foreground">{stock.companyName}</span>
                        </Button>
                      ))}
                      {searchQuery.length > 1 && searchResults.length === 0 && (
                        <p className="text-sm text-muted-foreground p-2">No stocks found</p>
                      )}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <FormLabel>Selected Stocks</FormLabel>
                <Badge variant="outline">Remaining: {getRemainingAllocation()}%</Badge>
              </div>
              <Card>
                <CardContent className="p-4">
                  {form.watch("stocks")?.length > 0 ? (
                    <div className="space-y-4">
                      {form.watch("stocks").map((stock, index) => (
                        <div key={stock.tickerSymbol} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <div>
                              <span className="font-medium">{stock.tickerSymbol}</span>
                              <span className="text-sm text-muted-foreground ml-2">{stock.companyName}</span>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              type="button"
                              onClick={() => removeStock(stock.tickerSymbol)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="flex items-center space-x-4">
                            <Slider
                              value={[stock.allocationPercentage]}
                              min={0}
                              max={100}
                              step={1}
                              onValueChange={(value) => {
                                const newStocks = [...form.getValues("stocks")]
                                newStocks[index].allocationPercentage = value[0]
                                form.setValue("stocks", newStocks)
                              }}
                              className="flex-1"
                            />
                            <span className="w-12 text-right">{stock.allocationPercentage}%</span>
                          </div>
                        </div>
                      ))}
                      {form.formState.errors.stocks && (
                        <p className="text-sm font-medium text-destructive">{form.formState.errors.stocks.message}</p>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-4 text-muted-foreground">
                      No stocks selected. Use the search to add stocks.
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {mode === "recommendation" && (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="preferredSectors"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Sectors</FormLabel>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2" >
                    {sectors.map((sector) => (
                      <div key={sector} className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(sector)}
                            onCheckedChange={(checked) => {
                              const updatedSectors = checked
                                ? [...field.value, sector]
                                : field.value?.filter((s: string) => s !== sector)
                              field.onChange(updatedSectors)
                              setSelectedSectors(updatedSectors)
                            }}
                            
                            id={sector}
                          />
                        </FormControl>
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor= >
                          {sector}
                        </label>
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        <Button type="submit" className="w-full">
          {mode === "analyzer" ? "Analyze Portfolio" : "Get Recommendations"}
        </Button>
      </form>
    </Form>
  )
}

