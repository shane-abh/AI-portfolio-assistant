"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

import PortfolioForm2 from "@/components/portfolio-form2";
import { useRouter } from "next/navigation";
import "../globals.css"

export default function PortfolioFormPage() {
  const [mode, setMode] = useState<"analyzer" | "recommendation">("analyzer");
  const [formData, setFormData] = useState<any>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  useEffect(() => {
      sessionStorage.clear();
    }, []);

  const handleSubmit = (data: any) => {
    

    setFormData(data);

    if (mode == "analyzer") {
      sessionStorage.setItem("analyzerData", JSON.stringify(data));
      router.push("/riskAnalysis/loading");
    } else {
      sessionStorage.setItem("recommendationData", JSON.stringify(data));

      //Navigate to the loading page
      router.push("/riskAnalysis/loading");
    }
    setIsSubmitted(true);
  };

  return (
    <div className="container px-4 py-8 mx-auto md:px-6">
      <div className="flex items-center mb-6">
        <Link href="/">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>

      {!isSubmitted ? (
        <>
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold">
              Portfolio {mode === "analyzer" ? "Analyzer" : "Recommendation"}
            </h1>
            <p className="mt-2 text-gray-600">
              {mode === "analyzer"
                ? "Analyze your custom portfolio allocation"
                : "Get AI-powered portfolio recommendations"}
            </p>
          </div>

          <div className="mb-8 flex justify-center">
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                  mode === "analyzer"
                    ? "bg-green-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                } border border-gray-200`}
                onClick={() => setMode("analyzer")}
              >
                Portfolio Analyzer
              </button>
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                  mode === "recommendation"
                    ? "bg-green-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                } border border-gray-200`}
                onClick={() => setMode("recommendation")}
              >
                Get Recommendations
              </button>
            </div>
          </div>

          <PortfolioForm2 mode={mode} onSubmit={handleSubmit} />
        </>
      ) : (
        <div className="max-w-2xl mx-auto">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
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
                className="h-8 w-8 text-green-600"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-green-800 mb-2">
              Form Submitted Successfully
            </h2>
            <p className="text-green-700 mb-6">
              {mode === "analyzer"
                ? "Your portfolio analysis is being processed."
                : "Your recommendation request is being processed."}
            </p>
            <pre className="bg-white p-4 rounded-lg text-left overflow-auto text-sm text-gray-700 mb-6">
              {JSON.stringify(formData, null, 2)}
            </pre>
            <div className="flex justify-center space-x-4">
              <Button
                variant="outline"
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData(null);
                }}
              >
                Start Over
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">
                {mode === "analyzer" ? "View Analysis" : "View Recommendations"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
