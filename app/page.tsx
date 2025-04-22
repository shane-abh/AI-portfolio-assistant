"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search, ArrowRight, Sparkles, BarChart3, PieChart, TrendingUp, ShieldCheck, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/header"
import Footer from "@/components/footer"
import StockSearchBar from "@/components/stock-search-bar"
import "./globals.css"

export default function Home() {
 
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)
  const { scrollYProgress } = useScroll()

  // Transform values for parallax effects
  const heroTextY = useTransform(scrollYProgress, [0, 0.2], [0, -50])
  const heroImageY = useTransform(scrollYProgress, [0, 0.2], [0, 50])
  const statsOpacity = useTransform(scrollYProgress, [0.1, 0.2], [0, 1])

  // Rotate the chevron when scrolling down
  const chevronRotate = useTransform(scrollYProgress, [0, 0.1], [0, 180])

  // Cycle through features automatically
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Show elements when page loads
  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleSearchResultClick = (ticker: string) => {
    router.push(`/stocks/${ticker.toLowerCase()}`)
  }

   // Animation variants
   const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  const cardVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
      transition: { type: "spring", stiffness: 300 },
    },
  }

  const featureVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  }

  const numberVariants = {
    initial: { opacity: 0, scale: 0.5 },
    animate: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100 } },
  }

  const stockItems = [
    { symbol: "AAPL", name: "Apple Inc.", change: "+2.4%" },
    { symbol: "MSFT", name: "Microsoft Corporation", change: "+1.8%" },
    { symbol: "GOOGL", name: "Alphabet Inc.", change: "-0.5%" },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <Header/>

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-green-50 via-emerald-50 to-white overflow-hidden relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container px-4 md:px-6 relative">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <motion.div
              className="flex flex-col justify-center space-y-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{ y: heroTextY }}
            >
              <motion.div
                className="space-y-2"
                variants={containerVariants}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
              >
                <motion.div variants={itemVariants}>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100 px-3 py-1 text-sm rounded-full">
                    AI-Powered Investing Education
                  </Badge>
                </motion.div>
                <motion.h1
                  className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-500"
                  variants={itemVariants}
                >
                  Learn Investing with AI
                </motion.h1>
                <motion.p className="max-w-[600px] text-gray-500 md:text-xl lg:text-2xl" variants={itemVariants}>
                  Your personal AI assistant to understand stocks, build portfolios, and learn investing—all in plain
                  English.
                </motion.p>
              </motion.div>
              <motion.div
                className="w-full max-w-md space-y-2"
                variants={itemVariants}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                
              </motion.div>
              <motion.div
                className="flex flex-col sm:flex-row gap-3 mt-2"
                variants={itemVariants}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Link href="/riskProfile">
                  <Button
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 w-full group"
                    
                    
                  >
                    Get Started
                    <motion.div
                      initial={{ x: 0 }}
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                    >
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </motion.div>
                  </Button>
                </Link>
                <Link href="/search">
                  <Button size="lg" variant="outline" className="w-full">
                    Analyze Individual stocks
                  </Button>
                </Link>
              </motion.div>

              {/* Scroll indicator */}
              <motion.div
                className="hidden md:flex justify-center mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
              >
                <motion.div
                  className="p-2 rounded-full border border-gray-200 cursor-pointer"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                  onClick={() => {
                    document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })
                  }}
                  style={{ rotate: chevronRotate }}
                >
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              className="flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{ y: heroImageY }}
            >
              <div className="relative w-full max-w-md">
                <motion.div
                  className="absolute -top-4 -left-4 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, 0],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 8,
                    ease: "easeInOut",
                  }}
                ></motion.div>
                <motion.div
                  className="absolute -bottom-8 right-4 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, -10, 0],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 10,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                ></motion.div>
                <motion.div
                  className="absolute -right-4 -top-8 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50"
                  animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, 15, 0],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 12,
                    ease: "easeInOut",
                    delay: 2,
                  }}
                ></motion.div>
                <motion.div
                  className="relative"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="p-5 bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                      <div className="flex justify-between items-center">
                        <h3 className="font-bold">Portfolio Analysis</h3>
                        <TrendingUp className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="space-y-4">
                        {stockItems.map((stock, index) => (
                          <motion.div
                            key={stock.symbol}
                            className="flex justify-between items-center"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7 + index * 0.2 }}
                            whileHover={{ x: 5 }}
                          >
                            <span className="font-medium">{stock.symbol}</span>
                            <div
                              className={`flex items-center ${stock.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}
                            >
                              <TrendingUp
                                className={`h-4 w-4 mr-1 ${stock.change.startsWith("-") ? "transform rotate-180" : ""}`}
                              />
                              <span>{stock.change}</span>
                            </div>
                          </motion.div>
                        ))}
                        <motion.div
                          className="h-2 bg-gray-100 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 1, delay: 1.3 }}
                        >
                          <motion.div
                            className="h-2 bg-green-500 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: "75%" }}
                            transition={{ duration: 1.5, delay: 1.5 }}
                          ></motion.div>
                        </motion.div>
                        <motion.div
                          className="text-sm text-gray-500"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.7 }}
                        >
                          Diversification Score: 75/100
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      

      {/* How It Works Section */}
      <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="container px-4 md:px-6">
          <motion.div
            className="flex flex-col items-center justify-center space-y-4 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How StockSage Works</h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
                Our AI-powered platform simplifies investing education through a personalized learning journey
              </p>
            </div>
          </motion.div>
          <div className="grid gap-10 mt-12 md:grid-cols-3 lg:gap-16">
            {/* Step 1 */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8 }}
            >
              {/* Step number */}
              <motion.div
                className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-xl border-4 border-white z-10"
                whileInView={{ scale: [0.5, 1.2, 1] }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                1
              </motion.div>

              {/* Content */}
              <motion.div
                className="bg-white rounded-xl shadow-lg p-6 pt-10 h-full flex flex-col"
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mx-auto mb-4"
                  whileInView={{ rotate: [0, 10, -10, 0] }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  <Search className="h-8 w-8 text-green-600" />
                </motion.div>
                <h3 className="text-xl font-bold text-center mb-3">Search & Learn</h3>
                <p className="text-gray-600 mb-4 text-center">
                  Search for any stock to get AI-powered explanations of key metrics and indicators in simple,
                  jargon-free language.
                </p>

                {/* Visual example */}
                <div className="mt-auto bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="relative"
                  >
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2">
                          <span className="font-bold text-xs">AAPL</span>
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm">Apple Inc.</div>
                          <div className="text-xs text-gray-500">NASDAQ: AAPL</div>
                        </div>
                        <div className="flex items-center text-green-600 text-sm font-medium">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          <span>+2.4%</span>
                        </div>
                      </div>

                      <div className="space-y-2 mb-3">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500">Current Price</span>
                          <span className="font-medium">$182.63</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500">Market Cap</span>
                          <span className="font-medium">$2.87T</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500">P/E Ratio</span>
                          <span className="font-medium">30.2</span>
                        </div>
                      </div>

                      <motion.div
                        className="mt-3 p-3 bg-green-50 rounded-lg border border-green-100"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 1 }}
                      >
                        <div className="text-xs font-medium text-green-800 mb-1">AI Insight</div>
                        <div className="text-xs text-gray-700">
                          Apple&apos;s P/E ratio of 30.2 is above the tech sector average of 25.8, suggesting investors are
                          paying a premium for expected future growth. The company&apos;s strong cash position and consistent
                          dividend growth make it a popular choice for both growth and income investors.
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Connector line */}
              <motion.div
                className="hidden md:block absolute top-1/2 -right-8 w-16 h-0.5 bg-gray-200"
                initial={{ width: 0 }}
                whileInView={{ width: "4rem" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 1.3 }}
              ></motion.div>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Step number */}
              <motion.div
                className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-xl border-4 border-white z-10"
                whileInView={{ scale: [0.5, 1.2, 1] }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                2
              </motion.div>

              {/* Content */}
              <motion.div
                className="bg-white rounded-xl shadow-lg p-6 pt-10 h-full flex flex-col"
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mx-auto mb-4"
                  whileInView={{ scale: [1, 1.1, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.7, repeat: 2, repeatType: "reverse" }}
                >
                  <ShieldCheck className="h-8 w-8 text-green-600" />
                </motion.div>
                <h3 className="text-xl font-bold text-center mb-3">Complete Risk Profile</h3>
                <p className="text-gray-600 mb-4 text-center">
                  Answer questions about your goals, time horizon, and risk tolerance to receive personalized investment
                  guidance.
                </p>

                {/* Visual example */}
                <div className="mt-auto bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-sm font-medium mb-3">Risk Tolerance Assessment</div>

                      <div className="space-y-3 mb-4">
                        <div>
                          <div className="text-xs mb-1">How would you react to a 20% market decline?</div>
                          <div className="flex items-center">
                            <motion.div
                              className="w-4 h-4 rounded-full border-2 border-green-500 bg-green-500 flex-shrink-0"
                              initial={{ scale: 0 }}
                              whileInView={{ scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.4, delay: 0.8 }}
                            ></motion.div>
                            <div className="ml-2 text-xs">I would see it as an opportunity to buy more</div>
                          </div>
                        </div>

                        <div>
                          <div className="text-xs mb-1">What is your investment time horizon?</div>
                          <div className="flex items-center">
                            <motion.div
                              className="w-4 h-4 rounded-full border-2 border-green-500 bg-green-500 flex-shrink-0"
                              initial={{ scale: 0 }}
                              whileInView={{ scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.4, delay: 1 }}
                            ></motion.div>
                            <div className="ml-2 text-xs">5-10 years</div>
                          </div>
                        </div>

                        <div>
                          <div className="text-xs mb-1">What are your primary investment goals?</div>
                          <div className="flex items-center">
                            <motion.div
                              className="w-4 h-4 rounded-full border-2 border-green-500 flex-shrink-0"
                              initial={{ backgroundColor: "rgba(0,0,0,0)" }}
                              whileInView={{ backgroundColor: "rgb(34, 197, 94)" }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.4, delay: 1.2 }}
                            ></motion.div>
                            <div className="ml-2 text-xs">Growth with moderate risk</div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500">Profile Completion</span>
                          <span className="font-medium">67%</span>
                        </div>
                        <motion.div
                          className="h-2 bg-gray-200 rounded-full"
                          initial={{ width: "100%" }}
                          whileInView={{ width: "100%" }}
                          viewport={{ once: true }}
                        >
                          <motion.div
                            className="h-2 bg-green-500 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: "67%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 1.4 }}
                          ></motion.div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Connector line */}
              <motion.div
                className="hidden md:block absolute top-1/2 -right-8 w-16 h-0.5 bg-gray-200"
                initial={{ width: 0 }}
                whileInView={{ width: "4rem" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 1.5 }}
              ></motion.div>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* Step number */}
              <motion.div
                className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-xl border-4 border-white z-10"
                whileInView={{ scale: [0.5, 1.2, 1] }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                3
              </motion.div>

              {/* Content */}
              <motion.div
                className="bg-white rounded-xl shadow-lg p-6 pt-10 h-full flex flex-col"
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mx-auto mb-4"
                  whileInView={{ rotate: [0, 180, 360] }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, delay: 0.9 }}
                >
                  <PieChart className="h-8 w-8 text-green-600" />
                </motion.div>
                <h3 className="text-xl font-bold text-center mb-3">Get Personalized Insights</h3>
                <p className="text-gray-600 mb-4 text-center">
                  Receive tailored portfolio recommendations and analyze your own selections with AI-powered insights.
                </p>

                {/* Visual example */}
                <div className="mt-auto bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-sm font-medium mb-3">Personalized Portfolio</div>

                      <div className="flex justify-center mb-4">
                        <motion.div
                          className="relative w-24 h-24"
                          whileInView={{ rotate: [0, 360] }}
                          viewport={{ once: true }}
                          transition={{ duration: 2, delay: 1 }}
                        >
                          <motion.div
                            className="absolute inset-0 rounded-full"
                            style={{
                              background:
                                "conic-gradient(#3b82f6 0% 40%, #10b981 40% 65%, #8b5cf6 65% 85%, #f59e0b 85% 95%, #ef4444 95% 100%)",
                              clipPath: "circle(50% at center)",
                            }}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 1.2 }}
                          ></motion.div>
                          <div
                            className="absolute inset-0 rounded-full bg-white"
                            style={{ clipPath: "circle(35% at center)" }}
                          ></div>
                        </motion.div>
                      </div>

                      <div className="space-y-2 mb-3">
                        <motion.div
                          className="flex justify-between items-center text-xs"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 1.4 }}
                        >
                          <div className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-blue-500 mr-1"></div>
                            <span>Technology</span>
                          </div>
                          <span className="font-medium">40%</span>
                        </motion.div>
                        <motion.div
                          className="flex justify-between items-center text-xs"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 1.6 }}
                        >
                          <div className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                            <span>Healthcare</span>
                          </div>
                          <span className="font-medium">25%</span>
                        </motion.div>
                        <motion.div
                          className="flex justify-between items-center text-xs"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 1.8 }}
                        >
                          <div className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-purple-500 mr-1"></div>
                            <span>Financial</span>
                          </div>
                          <span className="font-medium">20%</span>
                        </motion.div>
                        <motion.div
                          className="flex justify-between items-center text-xs"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 2 }}
                        >
                          <div className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-amber-500 mr-1"></div>
                            <span>Consumer</span>
                          </div>
                          <span className="font-medium">10%</span>
                        </motion.div>
                        <motion.div
                          className="flex justify-between items-center text-xs"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 2.2 }}
                        >
                          <div className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-red-500 mr-1"></div>
                            <span>Energy</span>
                          </div>
                          <span className="font-medium">5%</span>
                        </motion.div>
                      </div>

                      <motion.div
                        className="text-xs text-center text-gray-500 mt-2"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 2.4 }}
                      >
                        Balanced portfolio with moderate risk profile
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <motion.div
            className="flex flex-col items-center justify-center space-y-4 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Key Features</h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
                Powerful tools to help you understand investing and make informed decisions
              </p>
            </div>
          </motion.div>
          <div className="grid gap-6 mt-12 md:grid-cols-3 lg:gap-12">
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-green-100 transition-all duration-200 h-full">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <motion.div
                    className="p-3 bg-green-100 rounded-full"
                    animate={{
                      boxShadow: [
                        "0px 0px 0px rgba(0, 0, 0, 0)",
                        "0px 0px 20px rgba(34, 197, 94, 0.4)",
                        "0px 0px 0px rgba(0, 0, 0, 0)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1 }}
                  >
                    <Sparkles className="h-6 w-6 text-green-700" />
                  </motion.div>
                  <h3 className="text-xl font-bold">AI-Powered Explanations</h3>
                  <p className="text-gray-500">
                    Complex financial concepts explained in simple terms by our advanced AI assistant.
                  </p>
                  <div className="p-4 bg-white rounded-lg border border-gray-100 shadow-sm w-full">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeFeature === 0 ? "feature0" : "not-feature0"}
                        variants={featureVariants}
                        initial="hidden"
                        animate={activeFeature === 0 ? "visible" : "hidden"}
                        exit="exit"
                        className="space-y-3"
                      >
                        <div className="flex items-start">
                          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-2 flex-shrink-0">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            </svg>
                          </div>
                          <div>
                            <div className="text-sm font-medium">P/E Ratio Explained</div>
                            <p className="text-xs text-gray-600 mt-1">
                              P/E ratio of 15 means investors pay $15 for every $1 of earnings—lower than industry
                              average, suggesting potential value.
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-2">
                          <span>Difficulty: Beginner</span>
                          <span>Jargon-free explanation</span>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  <Link href="/search">
                    <Button variant="outline" className="border-green-200 hover:bg-green-50 hover:text-green-700">
                      Explore Stocks
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              variants={cardVariants}
              whileHover="hover"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="border-green-100 transition-all duration-200 h-full">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <motion.div
                    className="p-3 bg-green-100 rounded-full"
                    animate={{
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-green-700"
                    >
                      <path d="M2 9h20M9 9v12M15 9v12" />
                      <path d="M4 4h16a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
                    </svg>
                  </motion.div>
                  <h3 className="text-xl font-bold">Personalized Portfolios</h3>
                  <p className="text-gray-500">
                    Get custom portfolio recommendations based on your unique risk profile and investment goals.
                  </p>
                  <div className="p-4 bg-white rounded-lg border border-gray-100 shadow-sm w-full">
                    <div className="flex justify-between items-center mb-3">
                      <div className="text-sm font-medium">Moderate Growth Portfolio</div>
                      <div className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Recommended</div>
                    </div>

                    <div className="flex justify-center mb-3">
                      <motion.div
                        className="relative w-20 h-20"
                        whileInView={{ rotate: [0, 360] }}
                        viewport={{ once: true }}
                        transition={{ duration: 2, delay: 0.5 }}
                      >
                        <motion.div
                          className="absolute inset-0 rounded-full"
                          style={{
                            background:
                              "conic-gradient(#3b82f6 0% 40%, #10b981 40% 65%, #8b5cf6 65% 85%, #f59e0b 85% 100%)",
                            clipPath: "circle(50% at center)",
                          }}
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.7 }}
                        ></motion.div>
                        <div
                          className="absolute inset-0 rounded-full bg-white"
                          style={{ clipPath: "circle(35% at center)" }}
                        ></div>
                      </motion.div>
                    </div>

                    <div className="space-y-1.5 mb-2">
                      <div className="flex justify-between items-center text-xs">
                        <div className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-blue-500 mr-1"></div>
                          <span>US Stocks</span>
                        </div>
                        <span>40%</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <div className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                          <span>International Stocks</span>
                        </div>
                        <span>25%</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <div className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-purple-500 mr-1"></div>
                          <span>Bonds</span>
                        </div>
                        <span>20%</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <div className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-amber-500 mr-1"></div>
                          <span>Alternatives</span>
                        </div>
                        <span>15%</span>
                      </div>
                    </div>

                    <div className="text-xs text-gray-500 mt-2 flex justify-between">
                      <span>Expected Return: 7-9%</span>
                      <span>Risk: Moderate</span>
                    </div>
                  </div>
                  <Link href="/riskProfile">
                    <Button variant="outline" className="border-green-200 hover:bg-green-50 hover:text-green-700">
                      Get Started
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              variants={cardVariants}
              whileHover="hover"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="border-green-100 transition-all duration-200 h-full">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <motion.div
                    className="p-3 bg-green-100 rounded-full"
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1.5 }}
                  >
                    <BarChart3 className="h-6 w-6 text-green-700" />
                  </motion.div>
                  <h3 className="text-xl font-bold">Portfolio Analysis</h3>
                  <p className="text-gray-500">
                    Analyze your selected stocks for balance, diversification, volatility, and growth potential.
                  </p>
                  <div className="p-4 bg-white rounded-lg border border-gray-100 shadow-sm w-full">
                    <div className="text-sm font-medium mb-3">Portfolio Health Check</div>

                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Diversification</span>
                          <span className="font-medium">65/100</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full">
                          <motion.div
                            className="h-2 bg-green-500 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: "65%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                          ></motion.div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Risk Level</span>
                          <span className="font-medium">48/100</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full">
                          <motion.div
                            className="h-2 bg-amber-500 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: "48%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.2 }}
                          ></motion.div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Growth Potential</span>
                          <span className="font-medium">72/100</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full">
                          <motion.div
                            className="h-2 bg-blue-500 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: "72%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.4 }}
                          ></motion.div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 text-xs bg-blue-50 text-blue-800 p-2 rounded">
                      <div className="font-medium">AI Insight:</div>
                      <div className="mt-1">Consider adding more defensive stocks to improve diversification.</div>
                    </div>
                  </div>
                  <Link href="/riskProfile">
                    <Button variant="outline" className="border-green-200 hover:bg-green-50 hover:text-green-700">
                      Analyze Portfolio
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-green-500 to-emerald-600 text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container px-4 md:px-6">
          <motion.div
            className="flex flex-col items-center justify-center space-y-4 text-center"
            initial={{ y: 50 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-2">
              <motion.h2
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
                initial={{ scale: 0.9 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Ready to Start Your Investment Journey?
              </motion.h2>
              <motion.p
                className="max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Complete your risk profile to unlock personalized recommendations and analysis tools.
              </motion.p>
            </div>
            <motion.div
              className="flex flex-col sm:flex-row gap-3 mt-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link href="/riskProfile">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 w-full group">
                    Complete Risk Profile
                    <motion.div
                      initial={{ x: 0 }}
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                    >
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </motion.div>
                  </Button>
                </motion.div>
              </Link>
              <Link href="/search">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" variant="outline" className="border-white text-black hover:bg-green-600 w-full">
                    Explore Stocks
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-2 h-4 w-4"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                    </svg>
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <Footer/>

      <style jsx global>{`
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        
        .bg-grid-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
      `}</style>
    </div>
  )
}
