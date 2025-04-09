"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { TrendingUp, BarChart2, PieChart, LineChart, DollarSign, Info } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

type LoadingContext = "portfolio" | "analysis" | "stock" | "general"

interface InteractiveLoadingProps {
  context?: LoadingContext
  customMessage?: string
}

export default function InteractiveLoading({ context = "general", customMessage }: InteractiveLoadingProps) {
  const [progress, setProgress] = useState(0)
  const [factIndex, setFactIndex] = useState(0)

  // Messages for different contexts
  const loadingMessages = {
    portfolio: "Building your personalized portfolio recommendations...",
    analysis: "Analyzing your selected stocks and calculating metrics...",
    stock: "Fetching comprehensive stock data and insights...",
    general: "Loading financial data and insights...",
  }

  // Interesting finance/investing facts to display while loading
  const financeFacts = [
    "The term 'bull market' originated from how a bull attacks by thrusting its horns upward.",
    "The New York Stock Exchange was founded in 1792 under a buttonwood tree on Wall Street.",
    "Warren Buffett bought his first stock at age 11 and now regrets not starting earlier.",
    "The S&P 500 has historically returned about 10% annually before inflation.",
    "Compound interest has been called the 'eighth wonder of the world'.",
    "The rule of 72 estimates how long it takes to double your money by dividing 72 by the annual return rate.",
    "Dollar-cost averaging can help reduce the impact of market volatility on your investments.",
    "Diversification across asset classes can help manage risk in your portfolio.",
    "The first mutual fund was created in 1924, giving average investors access to diversified portfolios.",
    "The term 'blue chip stock' comes from blue poker chips, which have the highest value in the game.",
  ]

  // Simulate loading progress
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer)
          return 100
        }
        // Random increment between 2-5%
        return Math.min(prevProgress + Math.random() * 3 + 2, 100)
      })
    }, 300)

    return () => {
      clearInterval(timer)
    }
  }, [])

  // Rotate through facts
  useEffect(() => {
    const factTimer = setInterval(() => {
      setFactIndex((prevIndex) => (prevIndex + 1) % financeFacts.length)
    }, 5000)

    return () => {
      clearInterval(factTimer)
    }
  }, [financeFacts.length])

  // Animation variants for the icons
  const iconVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse" as const,
      },
    },
  }

  // Different icons based on context
  const getContextIcon = () => {
    switch (context) {
      case "portfolio":
        return <PieChart className="h-12 w-12 text-green-500" />
      case "analysis":
        return <BarChart2 className="h-12 w-12 text-blue-500" />
      case "stock":
        return <TrendingUp className="h-12 w-12 text-purple-500" />
      default:
        return <LineChart className="h-12 w-12 text-emerald-500" />
    }
  }

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <div className="flex flex-col items-center mb-8">
          <motion.div animate="animate" variants={iconVariants} className="mb-6 p-4 bg-gray-50 rounded-full shadow-md">
            {getContextIcon()}
          </motion.div>
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-2">
            {customMessage || loadingMessages[context]}
          </h1>
          <p className="text-gray-500 text-center">
            This should only take a few moments. We're preparing your personalized insights.
          </p>
        </div>

        <div className="mb-8">
          <Progress value={progress} className="h-2 mb-2" />
          <div className="flex justify-between text-sm text-gray-500">
            <span>Gathering data</span>
            <span>Analyzing</span>
            <span>Finalizing</span>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Financial fact card */}
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-100">
            <CardContent className="p-6">
              <div className="flex items-start mb-4">
                <Info className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <h3 className="font-medium">Did you know?</h3>
              </div>
              <motion.p
                key={factIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="text-gray-700"
              >
                {financeFacts[factIndex]}
              </motion.p>
            </CardContent>
          </Card>

          {/* Interactive elements */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-medium mb-4">While you wait, explore these concepts:</h3>
              <div className="space-y-3">
                {[
                  { icon: <DollarSign className="h-4 w-4" />, text: "Dollar-Cost Averaging" },
                  { icon: <PieChart className="h-4 w-4" />, text: "Asset Allocation" },
                  { icon: <TrendingUp className="h-4 w-4" />, text: "Growth Investing" },
                  { icon: <BarChart2 className="h-4 w-4" />, text: "Risk Management" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                  >
                    <div className="p-2 bg-white rounded-full mr-3 shadow-sm">{item.icon}</div>
                    <span>{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Animated stock ticker */}
        <div className="mt-8 overflow-hidden">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="flex whitespace-nowrap"
          >
            {[
              { symbol: "AAPL", price: "$156.78", change: "+2.34%" },
              { symbol: "MSFT", price: "$312.45", change: "+1.56%" },
              { symbol: "GOOGL", price: "$124.67", change: "+0.89%" },
              { symbol: "AMZN", price: "$132.89", change: "-0.45%" },
              { symbol: "TSLA", price: "$245.34", change: "+3.21%" },
              { symbol: "META", price: "$298.76", change: "-0.78%" },
              { symbol: "NVDA", price: "$412.32", change: "+4.12%" },
              { symbol: "JPM", price: "$145.67", change: "+0.92%" },
              { symbol: "V", price: "$234.56", change: "+1.23%" },
              { symbol: "WMT", price: "$156.78", change: "-0.34%" },
            ].map((stock, index) => (
              <div key={index} className="inline-flex items-center mr-8 bg-white px-4 py-2 rounded-full shadow-sm">
                <span className="font-bold mr-2">{stock.symbol}</span>
                <span className="mr-2">{stock.price}</span>
                <span className={`${stock.change.startsWith("+") ? "text-green-600" : "text-red-600"} font-medium`}>
                  {stock.change}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
