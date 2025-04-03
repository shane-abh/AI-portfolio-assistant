import { Check, DollarSign, TrendingUp, X } from "lucide-react"

interface RecommendationCardProps {
  recommendation: string
  reason: string
}

export function RecommendationCard({ recommendation, reason }: RecommendationCardProps) {
  const getRecommendationColor = (rec: string) => {
    switch (rec.toLowerCase()) {
      case "excellent":
      case "strong buy":
        return "bg-green-600"
      case "good":
      case "buy":
        return "bg-green-500"
      case "neutral":
      case "hold":
        return "bg-yellow-500"
      case "poor":
      case "sell":
        return "bg-red-500"
      case "very poor":
      case "strong sell":
        return "bg-red-600"
      default:
        return "bg-gray-500"
    }
  }

  const getRecommendationIcon = (rec: string) => {
    switch (rec.toLowerCase()) {
      case "excellent":
      case "strong buy":
      case "good":
      case "buy":
        return <TrendingUp className="h-6 w-6 text-white" />
      case "neutral":
      case "hold":
        return <DollarSign className="h-6 w-6 text-white" />
      case "poor":
      case "sell":
      case "very poor":
      case "strong sell":
        return <X className="h-6 w-6 text-white" />
      default:
        return <Check className="h-6 w-6 text-white" />
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-full ${getRecommendationColor(recommendation)}`}>
          {getRecommendationIcon(recommendation)}
        </div>
        <div>
          <p className="text-sm text-gray-500">AI Recommendation</p>
          <p className="text-xl font-bold">{recommendation}</p>
        </div>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg flex-1">
        <p className="text-sm text-gray-700">{reason}</p>
      </div>
    </div>
  )
}

