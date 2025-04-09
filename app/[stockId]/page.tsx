"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AnalystRatings } from "../../components/analyst-ratings";
import { CompanyOverview } from "../../components//company-overview";
import { FundamentalMetrics } from "../../components/fundamental-metrics";
import { KeyStatistics } from "../../components/key-statistics";
import { PriceChart } from "../../components/price-chart";
import { RecommendationCard } from "../../components/recommendation-card";
import { TechnicalIndicators } from "../../components/technical-indicators";
import { AIInsights } from "../../components/ai-insights";
import {
  formatCurrency,
  formatMarketCap,
  formatNumber,
  formatPercent,
} from "../../pages/utils/utils";
import {
  ArrowDown,
  ArrowUp,
  BarChart3,
  Check,
  DollarSign,
  Info,
  Lightbulb,
  TrendingUp,
} from "lucide-react";
import { set } from "react-hook-form";
import Header from "@/components/header";
import Footer from "@/components/footer";
import InteractiveLoading from "@/components/interactive-loading";
import "../globals.css"

interface Params {
  stockId: string;
}

interface StockData {
  Symbol: string;
  AssetType: string;
  Name: string;
  Description: string;
  CIK: string;
  Exchange: string;
  Currency: string;
  Country: string;
  Sector: string;
  Industry: string;
  Address: string;
  OfficialSite: string;
  FiscalYearEnd: string;
  LatestQuarter: string;
  MarketCapitalization: string;
  EBITDA: string;
  PERatio: string;
  PEGRatio: string;
  BookValue: string;
  DividendPerShare: string;
  DividendYield: string;
  EPS: string;
  RevenuePerShareTTM: string;
  ProfitMargin: string;
  OperatingMarginTTM: string;
  ReturnOnAssetsTTM: string;
  ReturnOnEquityTTM: string;
  RevenueTTM: string;
  GrossProfitTTM: string;
  DilutedEPSTTM: string;
  QuarterlyEarningsGrowthYOY: string;
  QuarterlyRevenueGrowthYOY: string;
  AnalystTargetPrice: string;
  AnalystRatingStrongBuy: string;
  AnalystRatingBuy: string;
  AnalystRatingHold: string;
  AnalystRatingSell: string;
  AnalystRatingStrongSell: string;
  TrailingPE: string;
  ForwardPE: string;
  PriceToSalesRatioTTM: string;
  PriceToBookRatio: string;
  EVToRevenue: string;
  EVToEBITDA: string;
  Beta: string;
  "52WeekHigh": string;
  "52WeekLow": string;
  "50DayMovingAverage": string;
  "200DayMovingAverage": string;
  SharesOutstanding: string;
  DividendDate: string;
  ExDividendDate: string;
}

export default function StockIdPage({ params }: { params: Params }) {
  const { stockId } = params;
  const [currentPrice] = useState(222.31); // This would normally be fetched from an API
  const previousClose = 220.15; // This would normally be fetched from an API
  const priceChange = currentPrice - previousClose;
  const percentChange = (priceChange / previousClose) * 100;

  const [stockData, setStockData] = useState<StockData>();
  const [stockAnalysis, setStockAnalysis] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  const [chartData, setChartData] = useState<any>([]);

  useEffect(() => {
    async function fetchStockData() {
      const res = await fetch(
        `https://api.tiingo.com/tiingo/daily/${stockId}/prices?startDate=2025-01-02&token=${process.env.NEXT_PUBLIC_TIINGO_API_KEY}`
      );
      const data = await res.json();
      setChartData(data);
    }

    async function fetchStockAnalysisAI() {
      const result = await fetch("/api/stock-analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ stockSymbol: stockId }),
      });

      const data = await result.json();
      setStockAnalysis(data);
      setStockData(data.stockData);
      setIsLoading(false);
    }

    fetchStockData();
    fetchStockAnalysisAI();
  }, [stockId]);

  const convertDateToMonth = (dateStr: string) => {
    const date = new Date(dateStr);

    // Format to "Feb DD"
    const formattedDate = date.toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
    });
    return formattedDate;
  };

  console.log(stockData);

  // Transform the data
  const formattedData = Array.isArray(chartData)
    ? chartData.map((item) => ({
        ...item,
        date: convertDateToMonth(item.date),
      }))
    : [];

  return (
    <div>
      <Header />
      {!isLoading && stockData ? (
        <div className="container mx-auto py-6 px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                {stockData.Name}
                <span className="text-lg font-normal text-gray-500">
                  {stockData.Symbol}
                </span>
              </h1>
              <p className="text-sm text-gray-500">
                {stockData.Exchange} • {stockData.Currency}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <Card className="lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle>Price Chart</CardTitle>
              </CardHeader>
              <CardContent>
                <PriceChart data={formattedData} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>AI Recommendation</CardTitle>
              </CardHeader>
              <CardContent>
                <RecommendationCard
                  recommendation={
                    stockAnalysis.AIinvestmentAnalysis.recommendation
                  }
                  reason={stockAnalysis.AIinvestmentAnalysis.reason}
                />
              </CardContent>
            </Card>
          </div>

          {/* Enhanced AI Analysis Section - Now prominently displayed before other tabs */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Lightbulb className="h-6 w-6 text-amber-500" />
                AI Investment Analysis
              </CardTitle>
              <CardDescription>
                Comprehensive AI-powered analysis of {stockData.Symbol} based on
                fundamental and technical indicators
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-amber-50 border border-amber-100 p-4 rounded-lg">
                  <p className="text-gray-800">{stockAnalysis.AIAnalysis}</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="font-medium mb-2 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      Growth Potential
                    </h3>
                    <div className="bg-gray-50 p-3 rounded-lg h-full">
                      <p className="text-sm text-gray-700">
                        With a PEG ratio of {stockData.PEGRatio} and quarterly
                        earnings growth of{" "}
                        {formatPercent(
                          parseFloat(stockData.QuarterlyEarningsGrowthYOY) * 100
                        )}
                        , {stockData.Name} shows{" "}
                        {Number.parseFloat(stockData.PEGRatio) < 1
                          ? "strong"
                          : "moderate"}{" "}
                        growth potential relative to its current valuation.
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2 flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-blue-600" />
                      Financial Health
                    </h3>
                    <div className="bg-gray-50 p-3 rounded-lg h-full">
                      <p className="text-sm text-gray-700">
                        {stockData.Name} maintains excellent financial health
                        with a profit margin of{" "}
                        {formatPercent(parseFloat(stockData.ProfitMargin) * 100)} and return
                        on equity of{" "}
                        {formatPercent(parseFloat(stockData.ReturnOnEquityTTM) * 100)},
                        indicating efficient operations and strong
                        profitability.
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2 flex items-center gap-2">
                      <BarChart3 className="h-4 w-4 text-purple-600" />
                      Market Sentiment
                    </h3>
                    <div className="bg-gray-50 p-3 rounded-lg h-full">
                      <p className="text-sm text-gray-700">
                        With{" "}
                        {Number.parseInt(stockData.AnalystRatingStrongBuy) +
                          Number.parseInt(stockData.AnalystRatingBuy)}{" "}
                        buy ratings versus
                        {Number.parseInt(stockData.AnalystRatingSell) +
                          Number.parseInt(
                            stockData.AnalystRatingStrongSell
                          )}{" "}
                        sell ratings, market sentiment is predominantly positive
                        for {stockData.Name} stock.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">
                    AI Investment Recommendation
                  </h3>
                  <div
                    className={`p-4 rounded-lg border ${
                      stockAnalysis.AIinvestmentAnalysis.recommendation.toLowerCase() ===
                      "good"
                        ? "bg-green-50 border-green-100"
                        : "bg-gray-50 border-gray-100"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`p-2 rounded-full ${
                          stockAnalysis.AIinvestmentAnalysis.recommendation.toLowerCase() ===
                          "good"
                            ? "bg-green-500"
                            : "bg-gray-500"
                        }`}
                      >
                        <Check className="h-5 w-5 text-white" />
                      </div>
                      <p className="font-semibold text-lg">
                        {stockAnalysis.AIinvestmentAnalysis.recommendation}
                      </p>
                    </div>
                    <p className="text-gray-700">
                      {stockAnalysis.AIinvestmentAnalysis.reason}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Risk Assessment</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700">
                      With a beta of {stockData.Beta}, {stockData.Name} stock
                      shows{" "}
                      {Number.parseFloat(stockData.Beta) > 1
                        ? "higher"
                        : "lower"}{" "}
                      volatility compared to the overall market. The current P/E
                      ratio of {stockData.PERatio} is{" "}
                      {Number.parseFloat(stockData.PERatio) > 25
                        ? "above"
                        : "below"}{" "}
                      the technology sector average, indicating{" "}
                      {Number.parseFloat(stockData.PERatio) > 25
                        ? "potentially higher valuation risk"
                        : "reasonable valuation"}
                      . Investors should consider {stockData.Name}'s heavy
                      reliance on iPhone sales and potential regulatory
                      challenges in various markets.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="overview" className="mb-6">
            <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:w-[450px]">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="fundamental">Fundamental</TabsTrigger>
              <TabsTrigger value="technical">Technical</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CompanyOverview stockData={stockData} />
                <KeyStatistics
                  stockData={stockData}
                  formatCurrency={formatCurrency}
                  formatNumber={formatNumber}
                  formatPercent={formatPercent}
                  formatMarketCap={formatMarketCap}
                />
              </div>
            </TabsContent>
            <TabsContent value="fundamental" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FundamentalMetrics
                  stockData={stockData}
                  formatCurrency={formatCurrency}
                  formatNumber={formatNumber}
                  formatPercent={formatPercent}
                />
                <AnalystRatings stockData={stockData} />
              </div>
            </TabsContent>
            <TabsContent value="technical" className="mt-6">
              <TechnicalIndicators
                stockData={stockData}
                currentPrice={currentPrice}
                formatCurrency={formatCurrency}
              />
            </TabsContent>
          </Tabs>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Key Financial Metrics
                </CardTitle>
                <CardDescription>
                  Important metrics to consider when analyzing{" "}
                  {stockData.Symbol}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1 text-sm text-gray-500 mb-1">
                      <span>EPS (TTM)</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-3.5 w-3.5" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">
                              Earnings Per Share (Trailing Twelve Months) - A
                              key indicator of profitability
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="text-2xl font-bold">
                      {formatCurrency(stockData.EPS)}
                    </div>
                    <div className="text-sm text-green-600">
                      +
                      {formatPercent(
                        parseFloat(stockData.QuarterlyEarningsGrowthYOY) * 100
                      )}{" "}
                      YoY
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1 text-sm text-gray-500 mb-1">
                      <span>P/E Ratio</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-3.5 w-3.5" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">
                              Price to Earnings Ratio - Measures company
                              valuation relative to earnings
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="text-2xl font-bold">
                      {stockData.PERatio}
                    </div>
                    <div className="text-sm text-gray-500">
                      Forward: {stockData.ForwardPE}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1 text-sm text-gray-500 mb-1">
                      <span>Revenue (TTM)</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-3.5 w-3.5" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">
                              Total revenue over the trailing twelve months
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="text-2xl font-bold">
                      {formatMarketCap(stockData.RevenueTTM)}
                    </div>
                    <div className="text-sm text-green-600">
                      +
                      {formatPercent(parseFloat(stockData.QuarterlyRevenueGrowthYOY) * 100)}{" "}
                      YoY
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1 text-sm text-gray-500 mb-1">
                      <span>Profit Margin</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-3.5 w-3.5" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">
                              Net profit as a percentage of revenue - Measures
                              efficiency
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="text-2xl font-bold">
                      {formatPercent(parseFloat(stockData.ProfitMargin) * 100)}
                    </div>
                    <div className="text-sm text-gray-500">
                      Operating:{" "}
                      {formatPercent(stockData.OperatingMarginTTM * 100)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Add the AI Insights component */}
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-amber-500" />
                  AI Investment Scorecard
                </CardTitle>
                <CardDescription>
                  AI-powered analysis of key investment factors for{" "}
                  {stockData.Symbol}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AIInsights
                  stockData={stockData}
                  formatPercent={formatPercent}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <InteractiveLoading context="stock"/>
      )}
      <Footer />
    </div>
  );
}
