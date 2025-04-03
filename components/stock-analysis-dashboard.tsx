"use client";

import { useState } from "react";
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

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AnalystRatings } from "./analyst-ratings";
import { CompanyOverview } from "./company-overview";
import { FundamentalMetrics } from "./fundamental-metrics";
import { KeyStatistics } from "./key-statistics";
import { PriceChart } from "./price-chart";
import { RecommendationCard } from "./recommendation-card";
import { TechnicalIndicators } from "./technical-indicators";
import { AIInsights } from "./ai-insights";
import { formatCurrency, formatNumber, formatPercent } from "@/utils/utils";

// This would normally come from an API
// const stockData = {
//   Symbol: "AAPL",
//   AssetType: "Common Stock",
//   Name: "Apple Inc",
//   Description:
//     "Apple Inc. is an American multinational technology company that specializes in consumer electronics, computer software, and online services. Apple is the world's largest technology company by revenue (totalling $274.5 billion in 2020) and, since January 2021, the world's most valuable company. As of 2021, Apple is the world's fourth-largest PC vendor by unit sales, and fourth-largest smartphone manufacturer. It is one of the Big Five American information technology companies, along with Amazon, Google, Microsoft, and Facebook.",
//   CIK: "320193",
//   Exchange: "NASDAQ",
//   Currency: "USD",
//   Country: "USA",
//   Sector: "TECHNOLOGY",
//   Industry: "ELECTRONIC COMPUTERS",
//   Address: "ONE INFINITE LOOP, CUPERTINO, CA, US",
//   OfficialSite: "https://www.apple.com",
//   FiscalYearEnd: "September",
//   LatestQuarter: "2024-12-31",
//   MarketCapitalization: "3336859288000",
//   EBITDA: "137352004000",
//   PERatio: "35.2",
//   PEGRatio: "2.022",
//   BookValue: "4.438",
//   DividendPerShare: "0.99",
//   DividendYield: "0.0045",
//   EPS: "6.31",
//   RevenuePerShareTTM: "25.97",
//   ProfitMargin: "0.243",
//   OperatingMarginTTM: "0.345",
//   ReturnOnAssetsTTM: "0.225",
//   ReturnOnEquityTTM: "1.365",
//   RevenueTTM: "395760009000",
//   GrossProfitTTM: "184102994000",
//   DilutedEPSTTM: "6.31",
//   QuarterlyEarningsGrowthYOY: "0.101",
//   QuarterlyRevenueGrowthYOY: "0.04",
//   AnalystTargetPrice: "252.59",
//   AnalystRatingStrongBuy: "7",
//   AnalystRatingBuy: "21",
//   AnalystRatingHold: "13",
//   AnalystRatingSell: "2",
//   AnalystRatingStrongSell: "2",
//   TrailingPE: "35.2",
//   ForwardPE: "29.76",
//   PriceToSalesRatioTTM: "8.43",
//   PriceToBookRatio: "49.03",
//   EVToRevenue: "8.38",
//   EVToEBITDA: "24.14",
//   Beta: "1.178",
//   "52WeekHigh": "259.81",
//   "52WeekLow": "163.31",
//   "50DayMovingAverage": "230.25",
//   "200DayMovingAverage": "229.1",
//   SharesOutstanding: "15022100000",
//   DividendDate: "2025-02-13",
//   ExDividendDate: "2025-02-10",
// };

// const aiAnalysis = {
//   initialAnalysis:
//     "AAPL, the stock symbol for Apple Inc., is a technology giant with a market capitalization of over $2 trillion. As a leader in the consumer electronics industry, Apple's stock has consistently shown stability and growth potential. With a diverse product lineup, including iPhones, Macs, and iPads, the company has maintained a loyal customer base and strong brand reputation. Historically, AAPL has demonstrated a tendency to outperform the broader market, with a 5-year average annual return of around 20%. However, investors should remain aware of potential risks, such as intense competition in the tech sector and dependence on a few key products, when considering adding AAPL to their portfolio.",
//   investmentAnalysis: {
//     recommendation: "Good",
//     reason:
//       "The stock has a strong financial position with high market capitalization, revenue, and profit margin. The PE ratio and PEG ratio indicate a stable growth potential. Additionally, the analyst ratings show a majority of strong buy and buy recommendations, suggesting a positive outlook for the stock in the next 3 to 5 years.",
//   },
// };

// Mock price data for the chart
const priceData = [
  { date: "Jan", price: 180 },
  { date: "Feb", price: 190 },
  { date: "Mar", price: 185 },
  { date: "Apr", price: 195 },
  { date: "May", price: 210 },
  { date: "Jun", price: 220 },
  { date: "Jul", price: 215 },
  { date: "Aug", price: 225 },
  { date: "Sep", price: 230 },
  { date: "Oct", price: 222 },
  { date: "Nov", price: 235 },
  { date: "Dec", price: 222 },
];

export function StockAnalysisDashboard(stockData: any, aiAnalysis: any) {
  const [currentPrice] = useState(222.31); // This would normally be fetched from an API
  const previousClose = 220.15; // This would normally be fetched from an API
  const priceChange = currentPrice - previousClose;
  const percentChange = (priceChange / previousClose) * 100;



  // Format market cap in billions/trillions
  const formatMarketCap = (marketCap: string) => {
    const num = Number.parseFloat(marketCap);
    if (num >= 1e12) {
      return `${(num / 1e12).toFixed(2)}T`;
    } else if (num >= 1e9) {
      return `${(num / 1e9).toFixed(2)}B`;
    } else if (num >= 1e6) {
      return `${(num / 1e6).toFixed(2)}M`;
    }
    return formatNumber(num);
  };

  // Calculate analyst sentiment
  const calculateAnalystSentiment = (stockData: any) => {
    const strongBuy = Number.parseInt(stockData.AnalystRatingStrongBuy);
    const buy = Number.parseInt(stockData.AnalystRatingBuy);
    const hold = Number.parseInt(stockData.AnalystRatingHold);
    const sell = Number.parseInt(stockData.AnalystRatingSell);
    const strongSell = Number.parseInt(stockData.AnalystRatingStrongSell);

    const totalBuy = strongBuy + buy;
    const totalSell = sell + strongSell;
    const totalRatings = totalBuy + hold + totalSell;

    const buyPercentage = (totalBuy / totalRatings) * 100;
    const sellPercentage = (totalSell / totalRatings) * 100;

    let sentiment = "";
    if (buyPercentage > 70) sentiment = "overwhelmingly positive";
    else if (buyPercentage > 50) sentiment = "predominantly positive";
    else if (buyPercentage > 30) sentiment = "mixed with positive bias";
    else if (buyPercentage === sellPercentage) sentiment = "evenly divided";
    else if (sellPercentage > 70) sentiment = "overwhelmingly negative";
    else if (sellPercentage > 50) sentiment = "predominantly negative";
    else sentiment = "mixed with negative bias";

    return {
      totalBuy,
      totalSell,
      sentiment,
    };
  };

  // Evaluate growth potential based on PEG ratio and earnings growth
  const evaluateGrowthPotential = (stockData : any) => {
    const pegRatio = Number.parseFloat(stockData.PEGRatio);
    const earningsGrowth = Number.parseFloat(
      stockData.QuarterlyEarningsGrowthYOY
    );

    let growthAssessment = "";
    if (pegRatio < 1 && earningsGrowth > 0.1) {
      growthAssessment = "strong";
    } else if (pegRatio < 2 && earningsGrowth > 0.05) {
      growthAssessment = "moderate";
    } else {
      growthAssessment = "limited";
    }

    return growthAssessment;
  };

  // Evaluate financial health based on profit margin and ROE
  const evaluateFinancialHealth = (stockData: any) => {
    const profitMargin = Number.parseFloat(stockData.ProfitMargin);
    const roe = Number.parseFloat(stockData.ReturnOnEquityTTM);

    let healthAssessment = "";
    if (profitMargin > 0.2 && roe > 0.3) {
      healthAssessment = "excellent";
    } else if (profitMargin > 0.1 && roe > 0.15) {
      healthAssessment = "good";
    } else {
      healthAssessment = "average";
    }

    return healthAssessment;
  };

  // Evaluate risk based on beta
  const evaluateRisk = (stockData:any) => {
    const beta = Number.parseFloat(stockData.Beta);

    let riskAssessment = "";
    if (beta > 1.5) {
      riskAssessment = "higher";
    } else if (beta > 1) {
      riskAssessment = "slightly higher";
    } else if (beta > 0.8) {
      riskAssessment = "average";
    } else {
      riskAssessment = "lower";
    }

    return riskAssessment;
  };

  // Get dynamic data for the AI analysis section
  const analystSentiment = calculateAnalystSentiment();
  const growthPotential = evaluateGrowthPotential();
  const financialHealth = evaluateFinancialHealth();
  const riskAssessment = evaluateRisk();

  return (
    <div className="container mx-auto py-6 px-4 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            {stockData.Symbol}
            <span className="text-lg font-normal text-gray-500">
              {stockData.Name}
            </span>
          </h1>
          <p className="text-sm text-gray-500">
            {stockData.Exchange} • {stockData.Currency}
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <div className="text-3xl font-bold flex items-center">
            {formatCurrency(currentPrice)}
            <span
              className={`ml-2 text-lg flex items-center ${
                priceChange >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {priceChange >= 0 ? (
                <ArrowUp className="h-4 w-4 mr-1" />
              ) : (
                <ArrowDown className="h-4 w-4 mr-1" />
              )}
              {formatCurrency(Math.abs(priceChange))} (
              {percentChange.toFixed(2)}%)
            </span>
          </div>
          <p className="text-sm text-gray-500">
            Last updated: April 1, 2025, 3:42 PM
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>Price Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <PriceChart data={priceData} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>AI Recommendation</CardTitle>
          </CardHeader>
          <CardContent>
            <RecommendationCard
              recommendation={aiAnalysis.investmentAnalysis.recommendation}
              reason={aiAnalysis.investmentAnalysis.reason}
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
              <p className="text-gray-800">{aiAnalysis.initialAnalysis}</p>
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
                    {formatPercent(stockData.QuarterlyEarningsGrowthYOY * 100)},
                    Apple shows {growthPotential} growth potential relative to
                    its current valuation.
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
                    Apple maintains {financialHealth} financial health with a
                    profit margin of{" "}
                    {formatPercent(stockData.ProfitMargin * 100)} and return on
                    equity of {formatPercent(stockData.ReturnOnEquityTTM * 100)}
                    , indicating efficient operations and strong profitability.
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
                    With {analystSentiment.totalBuy} buy ratings versus{" "}
                    {analystSentiment.totalSell} sell ratings, market sentiment
                    is {analystSentiment.sentiment} for Apple stock.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">AI Investment Recommendation</h3>
              <div
                className={`p-4 rounded-lg border ${
                  aiAnalysis.investmentAnalysis.recommendation.toLowerCase() ===
                  "good"
                    ? "bg-green-50 border-green-100"
                    : "bg-gray-50 border-gray-100"
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`p-2 rounded-full ${
                      aiAnalysis.investmentAnalysis.recommendation.toLowerCase() ===
                      "good"
                        ? "bg-green-500"
                        : "bg-gray-500"
                    }`}
                  >
                    <Check className="h-5 w-5 text-white" />
                  </div>
                  <p className="font-semibold text-lg">
                    {aiAnalysis.investmentAnalysis.recommendation}
                  </p>
                </div>
                <p className="text-gray-700">
                  {aiAnalysis.investmentAnalysis.reason}
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Risk Assessment</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700">
                  With a beta of {stockData.Beta}, Apple stock shows{" "}
                  {riskAssessment} volatility compared to the overall market.
                  The current P/E ratio of {stockData.PERatio} is{" "}
                  {Number.parseFloat(stockData.PERatio) > 25
                    ? "above"
                    : "below"}{" "}
                  the technology sector average, indicating{" "}
                  {Number.parseFloat(stockData.PERatio) > 25
                    ? "potentially higher valuation risk"
                    : "reasonable valuation"}
                  . Investors should consider Apple's heavy reliance on iPhone
                  sales and potential regulatory challenges in various markets.
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
              Important metrics to consider when analyzing {stockData.Symbol}
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
                          Earnings Per Share (Trailing Twelve Months) - A key
                          indicator of profitability
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="text-2xl font-bold">
                  {formatCurrency(stockData.EPS)}
                </div>
                <div className="text-sm text-green-600">
                  +{formatPercent(stockData.QuarterlyEarningsGrowthYOY * 100)}{" "}
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
                          Price to Earnings Ratio - Measures company valuation
                          relative to earnings
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="text-2xl font-bold">{stockData.PERatio}</div>
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
                  +{formatPercent(stockData.QuarterlyRevenueGrowthYOY * 100)}{" "}
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
                  {formatPercent(stockData.ProfitMargin * 100)}
                </div>
                <div className="text-sm text-gray-500">
                  Operating: {formatPercent(stockData.OperatingMarginTTM * 100)}
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
            <AIInsights stockData={stockData} formatPercent={formatPercent} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
