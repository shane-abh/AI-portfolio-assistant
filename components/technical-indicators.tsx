import { ArrowDown, ArrowUp } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface TechnicalIndicatorsProps {
  stockData: any
  currentPrice: number
  formatCurrency: (num: number | string) => string
}

export function TechnicalIndicators({ stockData, currentPrice, formatCurrency }: TechnicalIndicatorsProps) {
  // Calculate where current price is in the 52-week range
  const low = Number.parseFloat(stockData["52WeekLow"])
  const high = Number.parseFloat(stockData["52WeekHigh"])
  const range = high - low
  const positionInRange = ((currentPrice - low) / range) * 100

  // Calculate distance from moving averages
  const ma50 = Number.parseFloat(stockData["50DayMovingAverage"])
  const ma200 = Number.parseFloat(stockData["200DayMovingAverage"])
  const distanceFromMA50 = ((currentPrice - ma50) / ma50) * 100
  const distanceFromMA200 = ((currentPrice - ma200) / ma200) * 100

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Price Range</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-500">52-Week Range</span>
                <span className="text-sm font-medium">
                  {formatCurrency(stockData["52WeekLow"])} - {formatCurrency(stockData["52WeekHigh"])}
                </span>
              </div>
              <div className="space-y-2">
                <Progress value={positionInRange} className="h-2" />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>52-Week Low</span>
                  <span>Current: {formatCurrency(currentPrice)}</span>
                  <span>52-Week High</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Beta</h3>
              <div className="flex items-center gap-2">
                <div className="text-xl font-bold">{stockData.Beta}</div>
                <div className="text-sm text-gray-500">
                  {Number.parseFloat(stockData.Beta) > 1
                    ? "Higher volatility than market"
                    : "Lower volatility than market"}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Moving Averages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-500">50-Day MA</span>
                <span className="text-sm font-medium">{formatCurrency(stockData["50DayMovingAverage"])}</span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={`text-sm ${distanceFromMA50 >= 0 ? "text-green-600" : "text-red-600"} flex items-center`}
                >
                  {distanceFromMA50 >= 0 ? (
                    <ArrowUp className="h-3 w-3 mr-1" />
                  ) : (
                    <ArrowDown className="h-3 w-3 mr-1" />
                  )}
                  {Math.abs(distanceFromMA50).toFixed(2)}% {distanceFromMA50 >= 0 ? "above" : "below"}
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-500">200-Day MA</span>
                <span className="text-sm font-medium">{formatCurrency(stockData["200DayMovingAverage"])}</span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={`text-sm ${distanceFromMA200 >= 0 ? "text-green-600" : "text-red-600"} flex items-center`}
                >
                  {distanceFromMA200 >= 0 ? (
                    <ArrowUp className="h-3 w-3 mr-1" />
                  ) : (
                    <ArrowDown className="h-3 w-3 mr-1" />
                  )}
                  {Math.abs(distanceFromMA200).toFixed(2)}% {distanceFromMA200 >= 0 ? "above" : "below"}
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Technical Signals</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">MA50 vs MA200</p>
                  <p className={`font-medium ${ma50 > ma200 ? "text-green-600" : "text-red-600"}`}>
                    {ma50 > ma200 ? "Bullish (Golden Cross)" : "Bearish (Death Cross)"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Price vs MA200</p>
                  <p className={`font-medium ${currentPrice > ma200 ? "text-green-600" : "text-red-600"}`}>
                    {currentPrice > ma200 ? "Bullish" : "Bearish"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

