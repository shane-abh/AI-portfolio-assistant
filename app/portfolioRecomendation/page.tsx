"use client"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from "recharts"
import { AlertTriangle, ArrowRight, DollarSign, LineChart, PieChartIcon, Shield, TrendingUp } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Sample data based on the provided structure
const portfolioData = {
  initialAnalysis: {
    portfolio_recommendation: {
      investment_amount: 120000,
      risk_tolerance: "Medium",
      time_horizon: "Medium-term (3-7 years)",
      preferred_sectors: ["Finance", "Technology"],
      investment_strategy: "Any",
      geographic_preference: "USA",
      market_conditions: "Neutral",
      stocks_etfs: [
        {
          stock_symbol: "JPM",
          stock_name: "JPMorgan Chase & Co.",
          percentage_allocation: 25,
          justification:
            "JPMorgan is a well-established financial institution with a strong track record of stability and dividend payments. It offers exposure to the finance sector, which is expected to perform well in a neutral market environment.",
        },
        {
          stock_symbol: "MSFT",
          stock_name: "Microsoft Corporation",
          percentage_allocation: 25,
          justification:
            "Microsoft is a leader in the technology sector with a diverse product portfolio, including cloud computing and enterprise software. It has shown consistent growth and is well-positioned for medium-term appreciation.",
        },
        {
          stock_symbol: "AAPL",
          stock_name: "Apple Inc.",
          percentage_allocation: 20,
          justification:
            "Apple is a dominant player in the technology sector with a strong brand and loyal customer base. It has a history of innovation and is expected to continue its growth trajectory.",
        },
        {
          stock_symbol: "V",
          stock_name: "Visa Inc.",
          percentage_allocation: 15,
          justification:
            "Visa is a leading financial technology company with a strong global presence. It benefits from the increasing adoption of digital payments and has a solid track record of performance.",
        },
        {
          stock_symbol: "SPY",
          stock_name: "SPDR S&P 500 ETF Trust",
          percentage_allocation: 15,
          justification:
            "The SPY ETF provides broad market exposure by tracking the S&P 500 index. It adds diversification to the portfolio and reduces sector-specific risk.",
        },
      ],
      expected_return: "7-9%",
      risk_level: "Medium",
      comparison_to_benchmark: {
        benchmark: "S&P 500",
        comparison:
          "This portfolio is expected to perform similarly to the S&P 500 with a slight potential for outperformance due to its focus on strong sectors and individual stocks. However, it carries slightly higher risk due to its concentrated exposure to the technology and finance sectors.",
      },
      potential_risks: [
        {
          risk: "Market Downturn",
          management_strategy: "Regular portfolio rebalancing and diversification.",
        },
        {
          risk: "Sector-specific Risks",
          management_strategy: "Diversification across multiple sub-sectors within technology and finance.",
        },
        {
          risk: "Economic Factors",
          management_strategy: "Monitoring economic trends and adjusting allocations as needed.",
        },
      ],
    },
  },
}

export default function StockRecommendationPage() {
  const recommendation = portfolioData.initialAnalysis.portfolio_recommendation
  const stocks = recommendation.stocks_etfs

  // Prepare data for charts
  const chartData = stocks.map((stock) => ({
    name: stock.stock_symbol,
    value: stock.percentage_allocation,
    fullName: stock.stock_name,
  }))

  // Generate colors for the chart
  const colors = ["#f43f5e", "#ec4899", "#8b5cf6", "#6366f1", "#0ea5e9"]

  // Calculate risk score (for visualization)
  const riskScoreMap = { Low: 25, Medium: 50, High: 75, "Very High": 100 }
  const riskScore = riskScoreMap[recommendation.risk_level as keyof typeof riskScoreMap] || 50

  // Extract min expected return for visualization
  const minExpectedReturn = Number.parseInt(recommendation.expected_return.split("-")[0])

  // Calculate sector distribution dynamically
  const sectorDistribution = stocks.reduce((acc: Record<string, number>, stock) => {
    // Determine sector based on stock name or symbol
    let sector = "Other"
    if (stock.stock_symbol === "SPY") {
      sector = "ETF"
    } else if (["JPM", "V"].includes(stock.stock_symbol)) {
      sector = "Finance"
    } else if (["MSFT", "AAPL"].includes(stock.stock_symbol)) {
      sector = "Technology"
    }

    // Add or update sector allocation
    if (!acc[sector]) {
      acc[sector] = 0
    }
    acc[sector] += stock.percentage_allocation
    return acc
  }, {})

  // Convert to array format for the chart
  const sectorChartData = Object.entries(sectorDistribution).map(([name, value]) => ({
    name,
    value,
  }))

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto py-6 px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Investment Portfolio</h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1">Personalized recommendation based on your profile</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Badge variant="outline" className="text-sm font-medium mr-2 px-3 py-1">
                {recommendation.risk_tolerance} Risk
              </Badge>
              <Badge variant="outline" className="text-sm font-medium px-3 py-1">
                {recommendation.time_horizon}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-8 px-4">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-rose-50 to-white dark:from-gray-800 dark:to-gray-900 border-rose-100 dark:border-gray-700">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-rose-700 dark:text-rose-400">Investment Amount</CardTitle>
                <DollarSign className="h-5 w-5 text-rose-500" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                ${recommendation.investment_amount.toLocaleString()}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-white dark:from-gray-800 dark:to-gray-900 border-purple-100 dark:border-gray-700">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-purple-700 dark:text-purple-400">Expected Return</CardTitle>
                <TrendingUp className="h-5 w-5 text-purple-500" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{recommendation.expected_return}</p>
              <div className="mt-2 flex items-center">
                <Progress value={minExpectedReturn * 10} className="h-2" />
                <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">Target</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-50 to-white dark:from-gray-800 dark:to-gray-900 border-indigo-100 dark:border-gray-700">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-indigo-700 dark:text-indigo-400">Risk Level</CardTitle>
                <Shield className="h-5 w-5 text-indigo-500" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{recommendation.risk_level}</p>
              <div className="mt-2 flex items-center">
                <Progress value={riskScore} className="h-2" />
                <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">{riskScore}%</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Portfolio Allocation and Stock Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Allocation Strategy</CardTitle>
                  <CardDescription>Recommended stock distribution</CardDescription>
                </div>
                <PieChartIcon className="h-5 w-5 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis type="category" dataKey="name" width={50} />
                    <RechartsTooltip
                      formatter={(value, name, props) => [`${value}%`, props.payload.fullName]}
                      labelFormatter={() => "Allocation"}
                    />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
            <CardFooter className="border-t bg-gray-50 dark:bg-gray-800/50 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <LineChart className="h-4 w-4 mr-2" />
                <span>Balanced allocation across technology and finance sectors</span>
              </div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sector Distribution</CardTitle>
              <CardDescription>Breakdown by industry</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <div className="h-[200px] w-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sectorChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {sectorChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip formatter={(value) => [`${value}%`]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between text-sm text-gray-500 dark:text-gray-400 border-t">
              {sectorChartData.map((sector, index) => (
                <div key={sector.name} className="flex items-center">
                  <span
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: colors[index % colors.length] }}
                  ></span>
                  <span>{sector.name}</span>
                </div>
              ))}
            </CardFooter>
          </Card>
        </div>

        {/* Stock Details */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Recommended Stocks</CardTitle>
            <CardDescription>Detailed breakdown of recommended investments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Symbol</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="text-right">Allocation</TableHead>
                    <TableHead>Justification</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stocks.map((stock, index) => (
                    <TableRow key={stock.stock_symbol}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <div
                            className="w-2 h-2 rounded-full mr-2"
                            style={{ backgroundColor: colors[index % colors.length] }}
                          ></div>
                          {stock.stock_symbol}
                        </div>
                      </TableCell>
                      <TableCell>{stock.stock_name}</TableCell>
                      <TableCell className="text-right">
                        <Badge variant="outline" className="font-medium">
                          {stock.percentage_allocation}%
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-md">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-auto p-0 text-left font-normal">
                                <span className="truncate block max-w-[300px]">
                                  {stock.justification.substring(0, 60)}...
                                </span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-sm">
                              <p>{stock.justification}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Benchmark Comparison and Risks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
              <CardTitle>Benchmark Comparison</CardTitle>
              <CardDescription>
                Performance relative to {recommendation.comparison_to_benchmark.benchmark}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-full">
                  <LineChart className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Performance Analysis</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {recommendation.comparison_to_benchmark.comparison}
                  </p>
                </div>
              </div>
              <Separator className="my-6" />
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500 dark:text-gray-400">Expected Performance</div>
                <div className="flex items-center">
                  <span className="text-sm font-medium mr-2">Similar with upside potential</span>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
              <CardTitle>Risk Assessment</CardTitle>
              <CardDescription>Key risks and management strategies</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {recommendation.potential_risks.map((risk, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="bg-amber-50 dark:bg-amber-900/20 p-2 rounded-full">
                      <AlertTriangle className="h-5 w-5 text-amber-500" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{risk.risk}</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">{risk.management_strategy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t bg-gray-50 dark:bg-gray-800/50 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-2" />
                <span>Regular portfolio review recommended every 3 months</span>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}

