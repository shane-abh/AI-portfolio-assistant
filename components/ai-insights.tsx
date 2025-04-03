import { AlertTriangle, Check, Info, TrendingDown, TrendingUp } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface AIInsightsProps {
  stockData: any
  formatPercent: (num: number | string) => string
}

export function AIInsights({ stockData, formatPercent }: AIInsightsProps) {
  // Parse all necessary values from stockData
  const peRatio = Number.parseFloat(stockData.PERatio)
  const pegRatio = Number.parseFloat(stockData.PEGRatio)
  const profitMargin = Number.parseFloat(stockData.ProfitMargin)
  const beta = Number.parseFloat(stockData.Beta)
  const roe = Number.parseFloat(stockData.ReturnOnEquityTTM)
  const quarterlyEarningsGrowth = Number.parseFloat(stockData.QuarterlyEarningsGrowthYOY)
  const quarterlyRevenueGrowth = Number.parseFloat(stockData.QuarterlyRevenueGrowthYOY)

  // Calculate industry averages (these would normally come from a database)
  const industryAvgPE = 25 // Technology sector average
  const industryAvgProfitMargin = 0.15 // Technology sector average
  const industryAvgROE = 0.2 // Technology sector average

  // Valuation score (lower PE ratio relative to industry is better)
  // Score is inversely proportional to PE ratio compared to industry average
  const valuationScore = Math.min(100, Math.max(0, 100 - (peRatio / industryAvgPE) * 50))

  // Growth score based on PEG ratio and quarterly growth rates
  // Lower PEG is better, higher growth rates are better
  const pegScore = Math.min(100, Math.max(0, (1 / pegRatio) * 50))
  const earningsGrowthScore = Math.min(100, Math.max(0, quarterlyEarningsGrowth * 200))
  const revenueGrowthScore = Math.min(100, Math.max(0, quarterlyRevenueGrowth * 200))
  const growthScore = (pegScore + earningsGrowthScore + revenueGrowthScore) / 3

  // Profitability score based on profit margin and ROE compared to industry
  const profitMarginScore = Math.min(100, Math.max(0, (profitMargin / industryAvgProfitMargin) * 100))
  const roeScore = Math.min(100, Math.max(0, (roe / industryAvgROE) * 100))
  const profitabilityScore = (profitMarginScore + roeScore) / 2

  // Risk score based on beta (lower is better for conservative investors)
  // Beta of 1 is market average, below 1 is less volatile, above 1 is more volatile
  const riskScore = Math.min(100, Math.max(0, beta * 50))

  // Overall score (weighted average of all factors)
  const overallScore = Math.min(
    100,
    Math.max(0, valuationScore * 0.25 + growthScore * 0.25 + profitabilityScore * 0.25 + (100 - riskScore) * 0.25),
  )

  // Dynamic text generation based on scores
  const getScoreColor = (score: number, inverse = false) => {
    if (inverse) {
      if (score < 33) return "bg-green-500"
      if (score < 66) return "bg-yellow-500"
      return "bg-red-500"
    } else {
      if (score > 66) return "bg-green-500"
      if (score > 33) return "bg-yellow-500"
      return "bg-red-500"
    }
  }

  const getScoreText = (score: number, inverse = false) => {
    if (inverse) {
      if (score < 33) return "Low"
      if (score < 66) return "Moderate"
      return "High"
    } else {
      if (score > 66) return "Strong"
      if (score > 33) return "Moderate"
      return "Weak"
    }
  }

  const getOverallRating = (score: number) => {
    if (score > 80) return "Excellent"
    if (score > 60) return "Good"
    if (score > 40) return "Neutral"
    if (score > 20) return "Poor"
    return "Very Poor"
  }

  const getOverallIcon = (score: number) => {
    if (score > 60) return <TrendingUp className="h-5 w-5 text-green-500" />
    if (score > 40) return <Info className="h-5 w-5 text-yellow-500" />
    return <TrendingDown className="h-5 w-5 text-red-500" />
  }

  // Dynamic PE ratio evaluation
  const getPERatioEvaluation = () => {
    if (peRatio < industryAvgPE * 0.7) return "Low (potentially undervalued)"
    if (peRatio < industryAvgPE * 1.3) return "Average"
    return "High (potentially overvalued)"
  }

  // Dynamic PEG ratio evaluation
  const getPEGRatioEvaluation = () => {
    if (pegRatio < 1) return "Excellent (undervalued relative to growth)"
    if (pegRatio < 2) return "Good"
    return "Concerning (overvalued relative to growth)"
  }

  // Dynamic profit margin evaluation
  const getProfitMarginEvaluation = () => {
    if (profitMargin > industryAvgProfitMargin * 1.3) return "Excellent"
    if (profitMargin > industryAvgProfitMargin * 0.7) return "Good"
    return "Below average"
  }

  // Dynamic beta evaluation
  const getBetaEvaluation = () => {
    if (beta > 1.5) return "High volatility"
    if (beta > 1) return "Above market average"
    if (beta > 0.8) return "Near market average"
    return "Below market average (less volatile)"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {getOverallIcon(overallScore)}
          <div>
            <p className="text-sm text-gray-500">Overall Rating</p>
            <p className="text-xl font-bold">{getOverallRating(overallScore)}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Score</p>
          <p className="text-xl font-bold">{Math.round(overallScore)}/100</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium">Valuation</span>
              <AlertTriangle
                className={`h-3.5 w-3.5 ${valuationScore > 66 ? "text-green-500" : valuationScore > 33 ? "text-yellow-500" : "text-red-500"}`}
              />
            </div>
            <span className="text-sm font-medium">{getScoreText(valuationScore)}</span>
          </div>
          <Progress value={valuationScore} className={`h-2 ${getScoreColor(valuationScore)}`} />
          <p className="text-xs text-gray-500 mt-1">
            P/E Ratio: {stockData.PERatio} ({getPERatioEvaluation()})
          </p>
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium">Growth</span>
              <TrendingUp
                className={`h-3.5 w-3.5 ${growthScore > 66 ? "text-green-500" : growthScore > 33 ? "text-yellow-500" : "text-red-500"}`}
              />
            </div>
            <span className="text-sm font-medium">{getScoreText(growthScore)}</span>
          </div>
          <Progress value={growthScore} className={`h-2 ${getScoreColor(growthScore)}`} />
          <p className="text-xs text-gray-500 mt-1">
            PEG Ratio: {stockData.PEGRatio} ({getPEGRatioEvaluation()})
          </p>
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium">Profitability</span>
              <Check
                className={`h-3.5 w-3.5 ${profitabilityScore > 66 ? "text-green-500" : profitabilityScore > 33 ? "text-yellow-500" : "text-red-500"}`}
              />
            </div>
            <span className="text-sm font-medium">{getScoreText(profitabilityScore)}</span>
          </div>
          <Progress value={profitabilityScore} className={`h-2 ${getScoreColor(profitabilityScore)}`} />
          <p className="text-xs text-gray-500 mt-1">
            Profit Margin: {formatPercent(stockData.ProfitMargin * 100)} ({getProfitMarginEvaluation()})
          </p>
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium">Risk</span>
              <AlertTriangle
                className={`h-3.5 w-3.5 ${riskScore > 66 ? "text-red-500" : riskScore > 33 ? "text-yellow-500" : "text-green-500"}`}
              />
            </div>
            <span className="text-sm font-medium">{getScoreText(riskScore, true)}</span>
          </div>
          <Progress value={riskScore} className={`h-2 ${getScoreColor(riskScore, true)}`} />
          <p className="text-xs text-gray-500 mt-1">
            Beta: {stockData.Beta} ({getBetaEvaluation()})
          </p>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg mt-4">
        <h3 className="font-medium mb-2">AI Investment Thesis</h3>
        <p className="text-sm text-gray-700">
          Based on our AI analysis, {stockData.Symbol} presents a{" "}
          {overallScore > 60 ? "compelling" : overallScore > 40 ? "reasonable" : "challenging"} investment opportunity.
          The company shows {profitabilityScore > 60 ? "strong" : profitabilityScore > 40 ? "decent" : "concerning"}{" "}
          profitability metrics with a {formatPercent(stockData.ProfitMargin * 100)} profit margin and{" "}
          {formatPercent(stockData.ReturnOnEquityTTM * 100)} return on equity. Growth prospects are{" "}
          {growthScore > 60 ? "promising" : growthScore > 40 ? "moderate" : "limited"} with quarterly earnings growth of{" "}
          {formatPercent(stockData.QuarterlyEarningsGrowthYOY * 100)} and a PEG ratio of {stockData.PEGRatio}. Valuation
          is {valuationScore > 60 ? "attractive" : valuationScore > 40 ? "reasonable" : "stretched"} at a P/E of{" "}
          {stockData.PERatio} compared to the industry average. The stock carries{" "}
          {riskScore < 40 ? "lower" : riskScore < 60 ? "moderate" : "higher"} risk with a beta of {stockData.Beta}.
        </p>
      </div>
    </div>
  )
}

