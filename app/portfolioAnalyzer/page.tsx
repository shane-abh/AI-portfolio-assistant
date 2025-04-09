"use client";

import { useState, useEffect } from "react";
import {
  AlertTriangle,
  ArrowUpRight,
  Clock,
  DollarSign,
  Shield,
  TrendingUp,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  PieChart as RechartPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useRouter } from "next/navigation";
import "../globals.css"

// Calculate sector allocations
const calculateSectorAllocations = (portfolioData) => {
  const sectorMap = new Map();

  portfolioData.portfolioBreakdown.forEach((stock) => {
    if (sectorMap.has(stock.sector)) {
      sectorMap.set(
        stock.sector,
        sectorMap.get(stock.sector) + stock.allocationPercentage
      );
    } else {
      sectorMap.set(stock.sector, stock.allocationPercentage);
    }
  });

  return Array.from(sectorMap, ([name, value]) => ({ name, value }));
};

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
];
export default function PortfolioAnalyzer() {
  const router = useRouter();

  const [portfolioData, setPortfolioData] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = sessionStorage.getItem("analyzerResult");
      if (storedData === null) {
        router.push("/riskProfile");
      } else {
        setPortfolioData(JSON.parse(storedData));
      }
    }
  }, [router]);

  const [activeStock, setActiveStock] = useState({
    name: "Default Stock",
    allocationPercentage: 0,
    sector: "Unknown",
    analysis: "No analysis available.",
  });

  useEffect(() => {
    if (portfolioData?.portfolioBreakdown?.[0]) {
      setActiveStock(portfolioData.portfolioBreakdown[0]);
    }
  }, [portfolioData]);

  const sectorData = portfolioData
    ? calculateSectorAllocations(portfolioData)
    : [];

  if (!portfolioData) {
    return null;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Portfolio Analyzer
          </h1>
          <p className="text-muted-foreground">
            Comprehensive analysis and insights for your investment portfolio
          </p>
        </div>
        <Button>
          Generate Report
          <ArrowUpRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Investment Amount
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              $
              {portfolioData.portfolioOverview.investmentAmount.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Risk Tolerance
            </CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {portfolioData.portfolioOverview.riskTolerance}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Time Horizon</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {portfolioData.portfolioOverview.timeHorizon}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Predicted Return
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {portfolioData.predictedReturns.overallPredictedReturn}%
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card className="col-span-full lg:col-span-1">
          <CardHeader>
            <CardTitle>Portfolio Breakdown</CardTitle>
            <CardDescription>Allocation by stock</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartPieChart>
                  <Pie
                    data={portfolioData.portfolioBreakdown}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, allocationPercentage }) =>
                      `${name} (${allocationPercentage}%)`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="allocationPercentage"
                  >
                    {portfolioData.portfolioBreakdown.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </RechartPieChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 space-y-2">
              {portfolioData.portfolioBreakdown.map((stock, index) => (
                <div
                  key={stock.name}
                  className="flex items-center justify-between cursor-pointer hover:bg-muted p-2 rounded-md"
                  onClick={() => setActiveStock(stock)}
                >
                  <div className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span>{stock.name}</span>
                  </div>
                  <span>{stock.allocationPercentage}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-full lg:col-span-1">
          <CardHeader>
            <CardTitle>Sector Allocation</CardTitle>
            <CardDescription>Breakdown by industry sector</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartPieChart>
                  <Pie
                    data={sectorData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name} (${value}%)`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {sectorData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </RechartPieChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 space-y-2">
              {sectorData.map((sector, index) => (
                <div
                  key={sector.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span>{sector.name}</span>
                  </div>
                  <span>{sector.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-full lg:col-span-1">
          <CardHeader>
            <CardTitle>Stock Analysis</CardTitle>
            <CardDescription>
              {activeStock.name} ({activeStock.sector})
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Allocation</span>
                  <span className="text-sm font-medium">
                    {activeStock.allocationPercentage}%
                  </span>
                </div>
                <Progress
                  value={activeStock.allocationPercentage}
                  className="h-2"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Predicted Return</span>
                  <span className="text-sm font-medium text-green-600">
                    {
                      portfolioData.predictedReturns.stocks.find(
                        (s) => s.name === activeStock.name
                      )?.predictedReturn
                    }
                    %
                  </span>
                </div>
                <Progress
                  value={
                    portfolioData.predictedReturns.stocks.find(
                      (s) => s.name === activeStock.name
                    )?.predictedReturn
                  }
                  className="h-2 bg-gray-200"
                />
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Analysis</h4>
                <p className="text-sm text-muted-foreground">
                  {activeStock.analysis}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card className="col-span-full md:col-span-1">
          <CardHeader>
            <CardTitle>Predicted Returns</CardTitle>
            <CardDescription>Expected performance by stock</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={portfolioData.predictedReturns.stocks}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                  <Bar
                    dataKey="predictedReturn"
                    name="Predicted Return %"
                    fill="#22c55e"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-full md:col-span-1">
          <CardHeader className="flex flex-row items-center">
            <div>
              <CardTitle>Balance Check</CardTitle>
              <CardDescription>
                Portfolio diversification analysis
              </CardDescription>
            </div>
            {!portfolioData.balanceCheck.isBalanced && (
              <Badge variant="destructive" className="ml-auto">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Unbalanced
              </Badge>
            )}
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {portfolioData.balanceCheck.issues.map((issue, index) => (
                <div key={index} className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                  <p>{issue}</p>
                </div>
              ))}

              <div className="mt-6">
                <h4 className="text-sm font-medium mb-2">Portfolio Analysis</h4>
                <p className="text-sm text-muted-foreground">
                  {portfolioData.portfolioAnalysis}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recommendations</CardTitle>
          <CardDescription>
            Suggested actions to improve your portfolio
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {portfolioData.recommendations.map((rec, index) => (
              <div
                key={index}
                className="border-l-4 border-green-500 pl-4 py-2"
              >
                <h4 className="font-medium">{rec.recommendation}</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {rec.rationale}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
