"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search, ArrowRight, Sparkles, BarChart3, PieChart, TrendingUp, ShieldCheck } from "lucide-react"
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

  const handleSearchResultClick = (ticker: string) => {
    router.push(`/${ticker.toLowerCase()}`)
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <Header/>

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-green-50 via-emerald-50 to-white overflow-hidden relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container px-4 md:px-6 relative">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100 px-3 py-1 text-sm rounded-full">
                  AI-Powered Investing Education
                </Badge>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-500">
                  Learn Investing with AI
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl lg:text-2xl">
                  Your personal AI assistant to understand stocks, build portfolios, and learn investing—all in plain
                  English.
                </p>
              </div>
              <div className="w-full max-w-md space-y-2">
              <StockSearchBar
                  variant="homepage"
                  onResultClick={handleSearchResultClick}
                  showPopularSearches={true}
                  className="w-full"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-2">
                <Link href="/riskProfile">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700 w-full">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#how-it-works">
                  <Button size="lg" variant="outline" className="w-full">
                    How It Works
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute -top-4 -left-4 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob"></div>
                <div className="absolute -bottom-8 right-4 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-2000"></div>
                <div className="absolute -right-4 -top-8 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-4000"></div>
                <div className="relative">
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="p-5 bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                      <div className="flex justify-between items-center">
                        <h3 className="font-bold">Portfolio Analysis</h3>
                        <TrendingUp className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">AAPL</span>
                          <div className="flex items-center text-green-600">
                            <TrendingUp className="h-4 w-4 mr-1" />
                            <span>+2.4%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-medium">MSFT</span>
                          <div className="flex items-center text-green-600">
                            <TrendingUp className="h-4 w-4 mr-1" />
                            <span>+1.8%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-medium">GOOGL</span>
                          <div className="flex items-center text-red-600">
                            <TrendingUp className="h-4 w-4 mr-1 transform rotate-180" />
                            <span>-0.5%</span>
                          </div>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full">
                          <div className="h-2 bg-green-500 rounded-full w-3/4"></div>
                        </div>
                        <div className="text-sm text-gray-500">Diversification Score: 75/100</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-12 md:py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <h3 className="text-3xl md:text-4xl font-bold text-green-600">5,000+</h3>
              <p className="text-sm md:text-base text-gray-500">Stocks Analyzed</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl md:text-4xl font-bold text-green-600">10M+</h3>
              <p className="text-sm md:text-base text-gray-500">Data Points</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl md:text-4xl font-bold text-green-600">98%</h3>
              <p className="text-sm md:text-base text-gray-500">User Satisfaction</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl md:text-4xl font-bold text-green-600">24/7</h3>
              <p className="text-sm md:text-base text-gray-500">AI Assistance</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How StockSage Works</h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
                Our AI-powered platform simplifies investing education through a personalized learning journey
              </p>
            </div>
          </div>
          <div className="grid gap-10 mt-12 md:grid-cols-3 lg:gap-16">
            {/* Step 1 */}
            <div className="relative">
              {/* Step number */}
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-xl border-4 border-white z-10">
                1
              </div>

              {/* Content */}
              <div className="bg-white rounded-xl shadow-lg p-6 pt-10 h-full flex flex-col">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mx-auto mb-4">
                  <Search className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-center mb-3">Search & Learn</h3>
                <p className="text-gray-600 mb-4 text-center">
                  Search for any stock to get AI-powered explanations of key metrics and indicators in simple,
                  jargon-free language.
                </p>

                {/* Visual example */}
                <div className="mt-auto bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2">
                      <span className="font-bold text-xs">AAPL</span>
                    </div>
                    <div>
                      <div className="h-3 bg-gray-200 rounded w-24"></div>
                      <div className="h-2 bg-gray-200 rounded w-16 mt-1"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-gray-200 rounded w-full"></div>
                    <div className="h-2 bg-gray-200 rounded w-full"></div>
                    <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                  </div>
                  <div className="mt-2 p-2 bg-green-50 rounded border border-green-100">
                    <div className="h-2 bg-green-200 rounded w-full"></div>
                    <div className="h-2 bg-green-200 rounded w-5/6 mt-1"></div>
                  </div>
                </div>
              </div>

              {/* Connector line */}
              <div className="hidden md:block absolute top-1/2 -right-8 w-16 h-0.5 bg-gray-200"></div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              {/* Step number */}
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-xl border-4 border-white z-10">
                2
              </div>

              {/* Content */}
              <div className="bg-white rounded-xl shadow-lg p-6 pt-10 h-full flex flex-col">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mx-auto mb-4">
                  <ShieldCheck className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-center mb-3">Complete Risk Profile</h3>
                <p className="text-gray-600 mb-4 text-center">
                  Answer questions about your goals, time horizon, and risk tolerance to receive personalized investment
                  guidance.
                </p>

                {/* Visual example */}
                <div className="mt-auto bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full border-2 border-green-500 flex-shrink-0"></div>
                      <div className="ml-2 h-2 bg-gray-200 rounded w-full"></div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full border-2 border-green-500 bg-green-500 flex-shrink-0"></div>
                      <div className="ml-2 h-2 bg-gray-200 rounded w-full"></div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full border-2 border-green-500 flex-shrink-0"></div>
                      <div className="ml-2 h-2 bg-gray-200 rounded w-full"></div>
                    </div>
                  </div>
                  <div className="mt-3 h-2 bg-green-500 rounded-full w-2/3"></div>
                  <div className="mt-1 flex justify-between text-xs text-gray-500">
                    <span>Step 2 of 3</span>
                    <span>67%</span>
                  </div>
                </div>
              </div>

              {/* Connector line */}
              <div className="hidden md:block absolute top-1/2 -right-8 w-16 h-0.5 bg-gray-200"></div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              {/* Step number */}
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-xl border-4 border-white z-10">
                3
              </div>

              {/* Content */}
              <div className="bg-white rounded-xl shadow-lg p-6 pt-10 h-full flex flex-col">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mx-auto mb-4">
                  <PieChart className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-center mb-3">Get Personalized Insights</h3>
                <p className="text-gray-600 mb-4 text-center">
                  Receive tailored portfolio recommendations and analyze your own selections with AI-powered insights.
                </p>

                {/* Visual example */}
                <div className="mt-auto bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <div className="flex justify-center mb-3">
                    <div className="relative w-20 h-20">
                      <div
                        className="absolute inset-0 rounded-full border-4 border-blue-500"
                        style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
                      ></div>
                      <div
                        className="absolute inset-0 rounded-full border-4 border-green-500"
                        style={{ clipPath: "polygon(0 0, 50% 0, 50% 50%, 0 50%)" }}
                      ></div>
                      <div
                        className="absolute inset-0 rounded-full border-4 border-purple-500"
                        style={{ clipPath: "polygon(50% 0, 100% 0, 100% 50%, 50% 50%)" }}
                      ></div>
                      <div
                        className="absolute inset-0 rounded-full border-4 border-amber-500"
                        style={{ clipPath: "polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)" }}
                      ></div>
                      <div
                        className="absolute inset-0 rounded-full border-4 border-red-500"
                        style={{ clipPath: "polygon(0 50%, 50% 50%, 50% 100%, 0 100%)" }}
                      ></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span>Technology</span>
                      <span>40%</span>
                    </div>
                    <div className="h-2 bg-blue-500 rounded-full w-2/5"></div>
                    <div className="flex justify-between items-center text-xs">
                      <span>Healthcare</span>
                      <span>25%</span>
                    </div>
                    <div className="h-2 bg-green-500 rounded-full w-1/4"></div>
                    <div className="flex justify-between items-center text-xs">
                      <span>Financial</span>
                      <span>20%</span>
                    </div>
                    <div className="h-2 bg-purple-500 rounded-full w-1/5"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Key Features</h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
                Powerful tools to help you understand investing and make informed decisions
              </p>
            </div>
          </div>
          <div className="grid gap-6 mt-12 md:grid-cols-3 lg:gap-12">
            <Card className="border-green-100 hover:shadow-md transition-all duration-200 hover:-translate-y-1">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <Sparkles className="h-6 w-6 text-green-700" />
                </div>
                <h3 className="text-xl font-bold">AI-Powered Explanations</h3>
                <p className="text-gray-500">
                  Complex financial concepts explained in simple terms by our advanced AI assistant.
                </p>
                <div className="p-3 bg-green-50 rounded-lg w-full">
                  <p className="text-sm text-gray-700 italic">
                    P/E ratio of 15 means investors pay $15 for every $1 of earnings—lower than industry average,
                    suggesting potential value.
                  </p>
                </div>
                <Link href="/search">
                  <Button variant="outline" className="border-green-200 hover:bg-green-50 hover:text-green-700">
                    Explore Stocks
                  </Button>
                </Link>
              </CardContent>
            </Card>
            <Card className="border-green-100 hover:shadow-md transition-all duration-200 hover:-translate-y-1">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="p-3 bg-green-100 rounded-full">
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
                </div>
                <h3 className="text-xl font-bold">Personalized Portfolios</h3>
                <p className="text-gray-500">
                  Get custom portfolio recommendations based on your unique risk profile and investment goals.
                </p>
                <div className="grid grid-cols-5 gap-1 w-full">
                  <div className="h-2 bg-blue-500 rounded-full col-span-2"></div>
                  <div className="h-2 bg-green-500 rounded-full col-span-1"></div>
                  <div className="h-2 bg-purple-500 rounded-full col-span-1"></div>
                  <div className="h-2 bg-amber-500 rounded-full col-span-1"></div>
                </div>
                <Link href="/riskProfile">
                  <Button variant="outline" className="border-green-200 hover:bg-green-50 hover:text-green-700">
                    Get Started
                  </Button>
                </Link>
              </CardContent>
            </Card>
            <Card className="border-green-100 hover:shadow-md transition-all duration-200 hover:-translate-y-1">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <BarChart3 className="h-6 w-6 text-green-700" />
                </div>
                <h3 className="text-xl font-bold">Portfolio Analysis</h3>
                <p className="text-gray-500">
                  Analyze your selected stocks for balance, diversification, volatility, and growth potential.
                </p>
                <div className="space-y-2 w-full">
                  <div className="flex justify-between text-xs">
                    <span>Diversification</span>
                    <span>65/100</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div className="h-2 bg-green-500 rounded-full w-2/3"></div>
                  </div>
                </div>
                <Link href="/riskProfile">
                  <Button variant="outline" className="border-green-200 hover:bg-green-50 hover:text-green-700">
                    Analyze Portfolio
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-green-500 to-emerald-600 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Start Your Investment Journey?
              </h2>
              <p className="max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
                Complete your risk profile to unlock personalized recommendations and analysis tools.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <Link href="/riskProfile">
                <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 w-full">
                  Complete Risk Profile
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/search">
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
              </Link>
            </div>
          </div>
        </div>
      </section>

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
