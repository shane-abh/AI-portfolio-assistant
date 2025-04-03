import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface FundamentalMetricsProps {
  stockData: any
  formatCurrency: (num: number | string) => string
  formatNumber: (num: number | string) => string
  formatPercent: (num: number | string) => string
}

export function FundamentalMetrics({
  stockData,
  formatCurrency,
  formatNumber,
  formatPercent,
}: FundamentalMetricsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Fundamental Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-2">Valuation Metrics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">P/E Ratio (TTM)</p>
                <p className="font-medium">{stockData.TrailingPE}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Forward P/E</p>
                <p className="font-medium">{stockData.ForwardPE}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">PEG Ratio</p>
                <p className="font-medium">{stockData.PEGRatio}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Price/Sales</p>
                <p className="font-medium">{stockData.PriceToSalesRatioTTM}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Price/Book</p>
                <p className="font-medium">{stockData.PriceToBookRatio}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">EV/Revenue</p>
                <p className="font-medium">{stockData.EVToRevenue}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Profitability</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Profit Margin</p>
                <p className="font-medium">{formatPercent(stockData.ProfitMargin * 100)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Operating Margin</p>
                <p className="font-medium">{formatPercent(stockData.OperatingMarginTTM * 100)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">ROE</p>
                <p className="font-medium">{formatPercent(stockData.ReturnOnEquityTTM * 100)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">ROA</p>
                <p className="font-medium">{formatPercent(stockData.ReturnOnAssetsTTM * 100)}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Growth</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Quarterly Earnings Growth (YoY)</p>
                <p className="font-medium">{formatPercent(stockData.QuarterlyEarningsGrowthYOY * 100)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Quarterly Revenue Growth (YoY)</p>
                <p className="font-medium">{formatPercent(stockData.QuarterlyRevenueGrowthYOY * 100)}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

