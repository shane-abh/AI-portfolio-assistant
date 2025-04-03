import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface KeyStatisticsProps {
  stockData: any
  formatCurrency: (num: number | string) => string
  formatNumber: (num: number | string) => string
  formatPercent: (num: number | string) => string
  formatMarketCap: (marketCap: string) => string
}

export function KeyStatistics({
  stockData,
  formatCurrency,
  formatNumber,
  formatPercent,
  formatMarketCap,
}: KeyStatisticsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Key Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Market Cap</p>
            <p className="font-medium">{formatMarketCap(stockData.MarketCapitalization)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">P/E Ratio</p>
            <p className="font-medium">{stockData.PERatio}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">EPS (TTM)</p>
            <p className="font-medium">{formatCurrency(stockData.EPS)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Dividend Yield</p>
            <p className="font-medium">{formatPercent(stockData.DividendYield * 100)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">52-Week High</p>
            <p className="font-medium">{formatCurrency(stockData["52WeekHigh"])}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">52-Week Low</p>
            <p className="font-medium">{formatCurrency(stockData["52WeekLow"])}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Shares Outstanding</p>
            <p className="font-medium">{formatMarketCap(stockData.SharesOutstanding)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Beta</p>
            <p className="font-medium">{stockData.Beta}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

