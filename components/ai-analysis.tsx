import { Lightbulb } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface AIAnalysisProps {
  aiAnalysis: {
    initialAnalysis: string
    investmentAnalysis: {
      recommendation: string
      reason: string
    }
  }
}

export function AIAnalysis({ aiAnalysis }: AIAnalysisProps) {
  return (
    <div className="grid grid-cols-1 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            AI Stock Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">Initial Analysis</h3>
              <p className="text-gray-700">{aiAnalysis.initialAnalysis}</p>
            </div>

            <div>
              <h3 className="font-medium mb-2">Investment Analysis</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium">Recommendation:</span>
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      aiAnalysis.investmentAnalysis.recommendation.toLowerCase() === "good"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {aiAnalysis.investmentAnalysis.recommendation}
                  </span>
                </div>
                <p className="text-gray-700">{aiAnalysis.investmentAnalysis.reason}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

