"use client"

import { Bar, BarChart, Cell, ResponsiveContainer, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface AnalystRatingsProps {
  stockData: any
}

export function AnalystRatings({ stockData }: AnalystRatingsProps) {
  const ratingData = [
    {
      name: "Strong Buy",
      value: Number.parseInt(stockData.AnalystRatingStrongBuy),
      color: "#16a34a",
    },
    {
      name: "Buy",
      value: Number.parseInt(stockData.AnalystRatingBuy),
      color: "#4ade80",
    },
    {
      name: "Hold",
      value: Number.parseInt(stockData.AnalystRatingHold),
      color: "#facc15",
    },
    {
      name: "Sell",
      value: Number.parseInt(stockData.AnalystRatingSell),
      color: "#f87171",
    },
    {
      name: "Strong Sell",
      value: Number.parseInt(stockData.AnalystRatingStrongSell),
      color: "#dc2626",
    },
  ]

  const totalRatings = ratingData.reduce((sum, item) => sum + item.value, 0)

  // Calculate consensus
  const weightedSum =
    ratingData[0].value * 5 +
    ratingData[1].value * 4 +
    ratingData[2].value * 3 +
    ratingData[3].value * 2 +
    ratingData[4].value * 1

  const consensusScore = weightedSum / totalRatings

  const getConsensusText = (score: number) => {
    if (score >= 4.5) return "Strong Buy"
    if (score >= 3.5) return "Buy"
    if (score >= 2.5) return "Hold"
    if (score >= 1.5) return "Sell"
    return "Strong Sell"
  }

  const getConsensusColor = (score: number) => {
    if (score >= 4.5) return "text-green-600"
    if (score >= 3.5) return "text-green-500"
    if (score >= 2.5) return "text-yellow-500"
    if (score >= 1.5) return "text-red-400"
    return "text-red-600"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Analyst Ratings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Consensus</p>
              <p className={`text-xl font-bold ${getConsensusColor(consensusScore)}`}>
                {getConsensusText(consensusScore)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Target Price</p>
              <p className="text-xl font-bold">${stockData.AnalystTargetPrice}</p>
            </div>
          </div>

          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={ratingData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 70,
                  bottom: 5,
                }}
              >
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {ratingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-5 gap-2 text-center text-xs">
            {ratingData.map((rating, index) => (
              <div key={index}>
                <p className="font-medium">{rating.value}</p>
                <p className="text-gray-500">{rating.name}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

