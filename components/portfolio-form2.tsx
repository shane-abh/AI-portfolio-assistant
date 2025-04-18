"use client"

import { useState, useEffect } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Search, X, Check, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"
import StockSearchBar from "./stock-search-bar"

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
  geographicPreference: z.literal("USA").optional(),
})

type PortfolioFormProps = {
  mode: "analyzer" | "recommendation"
  onSubmit: (data: any) => void
  defaultValues?: any
}

export default function PortfolioForm2({ mode, onSubmit, defaultValues = {} }: PortfolioFormProps) {
  // const [searchQuery, setSearchQuery] = useState("")
  // const [searchResults, setSearchResults] = useState<typeof mockStocks>([])
  const [selectedSectors, setSelectedSectors] = useState<string[]>(defaultValues.preferredSectors || [])
  const [currentStep, setCurrentStep] = useState(1)
  const [progress, setProgress] = useState(20)

  const totalSteps = mode === "analyzer" ? 3 : 2

  const schema = mode === "analyzer" ? analyzerSchema : recommendationSchema

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues:
      mode === "analyzer"
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
  // useEffect(() => {
  //   if (searchQuery.length > 1) {
  //     const results = mockStocks.filter(
  //       (stock) =>
  //         stock.tickerSymbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //         stock.companyName.toLowerCase().includes(searchQuery.toLowerCase()),
  //     )
  //     setSearchResults(results)
  //   } else {
  //     setSearchResults([])
  //   }
  // }, [searchQuery])

  // Handle stock selection
  const addStock = (stock: { tickerSymbol: string; companyName: string; allocationPercentage?: number }) => {
    const currentStocks = form.getValues("stocks") || []
    if (!currentStocks.some((s) => s.tickerSymbol === stock.tickerSymbol)) {
      form.setValue("stocks", [...currentStocks, { ...stock, allocationPercentage: stock.allocationPercentage || 0 }])
    }
    // setSearchQuery("")
    // setSearchResults([])
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

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
      setProgress(((currentStep + 1) / totalSteps) * 100)
    } else {
      // Submit form
      form.handleSubmit(onSubmit)()
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      setProgress(((currentStep - 1) / totalSteps) * 100)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Progress value={progress} className="h-2" />
        <p className="mt-2 text-sm text-gray-500 text-right">
          Step {currentStep} of {totalSteps}
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <Form {...form}>
            <form className="space-y-6">
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold">Investment Profile</h2>
                    <p className="text-gray-500 mt-1">Tell us about your investment preferences</p>
                  </div>

                  {/* Investment Amount */}
                  <FormField
                    control={form.control}
                    name="investmentAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Investment Amount ($)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="100000" {...field} className="text-lg" />
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
                            <SelectTrigger className="text-lg">
                              <SelectValue placeholder="Select risk tolerance" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Low">Low</SelectItem>
                            <SelectItem value="Moderate">Moderate</SelectItem>
                            <SelectItem value="High">High</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          {field.value === "Low" && "Conservative approach with focus on capital preservation"}
                          {field.value === "Moderate" && "Balanced approach with moderate risk for growth"}
                          {field.value === "High" && "Aggressive approach seeking maximum returns"}
                        </FormDescription>
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
                            <SelectTrigger className="text-lg">
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
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold">Market Strategy</h2>
                    <p className="text-gray-500 mt-1">Define your investment approach</p>
                  </div>

                  {/* Investment Strategy */}
                  <FormField
                    control={form.control}
                    name="investmentStrategy"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Investment Strategy</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="text-lg">
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
                        <FormDescription>
                          {field.value === "Growth" && "Focus on companies with high growth potential"}
                          {field.value === "Value" && "Focus on undervalued companies with strong fundamentals"}
                          {field.value === "Income" && "Focus on dividend-paying stocks for regular income"}
                          {field.value === "Balanced" && "Mix of growth and income investments"}
                          {field.value === "Any" && "No specific strategy preference"}
                        </FormDescription>
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
                            <SelectTrigger className="text-lg">
                              <SelectValue placeholder="Select market conditions" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Bearish">Bearish</SelectItem>
                            <SelectItem value="Bullish">Bullish</SelectItem>
                            <SelectItem value="Neutral">Neutral</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          {field.value === "Bearish" && "Expecting market decline, focus on defensive stocks"}
                          {field.value === "Bullish" && "Expecting market growth, focus on growth opportunities"}
                          {field.value === "Neutral" && "No strong market direction expectation"}
                        </FormDescription>
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
                            <Input disabled {...field} className="text-lg bg-gray-50" />
                          </FormControl>
                          <FormDescription>Currently limited to USA markets</FormDescription>
                        </FormItem>
                      )}
                    />
                  )}

                  {/* Preferred Sectors - Only for recommendation mode */}
                  {mode === "recommendation" && (
                    <FormField
                      control={form.control}
                      name="preferredSectors"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred Sectors</FormLabel>
                          <div className="mt-3 p-4 border rounded-lg bg-gray-50">
                            <div className="grid grid-cols-2 gap-3">
                              {sectors.map((sector) => (
                                <div key={sector} className="flex items-center space-x-2">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(sector)}
                                      onCheckedChange={(checked) => {
                                        const current = Array.isArray(field.value) ? field.value : []
                                        const updatedSectors = checked
                                          ? [...current, sector]
                                          : current.filter((s: string) => s !== sector)
                                    
                                        field.onChange(updatedSectors)
                                        setSelectedSectors(updatedSectors)
                                      }}
                                      id={sector}
                                    />
                                  </FormControl>
                                  <label className="text-sm font-medium leading-none cursor-pointer" htmlFor={sector}>
                                    {sector}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              )}

              {currentStep === 3 && mode === "analyzer" && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold">Stock Selection</h2>
                    <p className="text-gray-500 mt-1">Select and allocate stocks for your portfolio</p>
                  </div>

                  <div className="space-y-4">
                  <div className="mb-4">
                      <StockSearchBar
                        variant="homepage"
                        onResultClick={(ticker, name) => {
                          const stock = {
                            tickerSymbol: ticker,
                            companyName: name,
                            allocationPercentage: 0,
                          }
                          addStock(stock)
                        }}
                        placeholder="Search for stocks to add to your portfolio"
                      />
                    </div>

                    <div className="mt-4">
                      <div className="flex justify-between items-center mb-2">
                        <FormLabel>Selected Stocks</FormLabel>
                        <Badge variant="outline" className="bg-green-50">
                          Remaining: {getRemainingAllocation()}%
                        </Badge>
                      </div>
                      <Card>
                        <CardContent className="p-4">
                          {form.watch("stocks")?.length > 0 ? (
                             <div className="space-y-6">
                              {form.watch("stocks").map((stock, index) => (
                                <div
                                  key={stock.tickerSymbol}
                                  className="space-y-3 pb-4 border-b last:border-b-0 last:pb-0"
                                >
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
                                  <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                      <span>Allocation</span>
                                      <span className="font-medium">{stock.allocationPercentage}%</span>
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
                                      <span className="w-12 text-right font-medium">{stock.allocationPercentage}%</span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                              {form.formState.errors.stocks && (
                                <p className="text-sm font-medium text-destructive mt-2">
                                  {form.formState.errors.stocks.message}
                                </p>
                              )}
                            </div>
                          ) : (
                            <div className="text-center py-8 text-muted-foreground">
                              <p>No stocks selected.</p>
                              <p className="text-sm mt-1">Use the search to add stocks to your portfolio.</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-8">
                <Button type="button" variant="outline" onClick={handleBack} disabled={currentStep === 1}>
                  Back
                </Button>
                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={
                    (currentStep === 2 &&
                      mode === "recommendation" &&
                      (form.getValues("preferredSectors")?? []).length === 0) ||
                    (currentStep === totalSteps && mode === "analyzer" && form.getValues("stocks").length === 0)
                  }
                  className="bg-green-600 hover:bg-green-700"
                >
                  {currentStep === totalSteps ? (
                    <>
                      {mode === "analyzer" ? "Analyze Portfolio" : "Get Recommendations"}
                      <Check className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Next
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
