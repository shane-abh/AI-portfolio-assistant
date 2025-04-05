"use client"

import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import PortfolioForm from "@/components/portfolio-form"
import { useRouter } from 'next/navigation';

export default function Home() {
  const [analyzerResult, setAnalyzerResult] = useState<any>(null)
  const [recommendationResult, setRecommendationResult] = useState<any>(null)
  const router = useRouter();

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const handleAnalyzerSubmit = (data: any) => {
    console.log("Analyzer form submitted:", data)
    // In a real app, you would send this data to your API
    setAnalyzerResult(data)

    //store the data in seesion storage
    sessionStorage.setItem("analyzerData", JSON.stringify(data))
    router.push("/riskAnalysis/loading")

    
  }

  const handleRecommendationSubmit = (data: any) => {
    console.log("Recommendation form submitted:", data)
    // In a real app, you would send this data to your API
    setRecommendationResult(data)

    //store the data in seesion storage
    sessionStorage.setItem("recommendationData", JSON.stringify(data))

    //Navigate to the loading page
    router.push("/riskAnalysis/loading")
  }

  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Portfolio Management</h1>

      <Tabs defaultValue="analyzer" className="max-w-screen-lg mx-auto">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="analyzer">Portfolio Analyzer</TabsTrigger>
          <TabsTrigger value="recommendation">Portfolio Recommendation</TabsTrigger>
        </TabsList>

        <TabsContent value="analyzer">
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Analyzer</CardTitle>
              <CardDescription>
                Analyze your existing portfolio by entering your investment details and stock allocations.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PortfolioForm mode="analyzer" onSubmit={handleAnalyzerSubmit} />

              {analyzerResult && (
                <div className="mt-8 p-4 border rounded-lg">
                  <h3 className="text-lg font-medium mb-2">Analysis Result</h3>
                  <pre className="bg-muted p-4 rounded-md overflow-auto text-sm">
                    {JSON.stringify(analyzerResult, null, 2)}
                  </pre>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendation">
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Recommendation</CardTitle>
              <CardDescription>
                Get personalized portfolio recommendations based on your investment preferences.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PortfolioForm mode="recommendation" onSubmit={handleRecommendationSubmit} />

              {recommendationResult && (
                <div className="mt-8 p-4 border rounded-lg">
                  <h3 className="text-lg font-medium mb-2">Recommendation Result</h3>
                  <pre className="bg-muted p-4 rounded-md overflow-auto text-sm">
                    {JSON.stringify(recommendationResult, null, 2)}
                  </pre>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  )
}

