"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoadingPage() {
  const [loading, setLoading] = useState(true);
  const [portfolio, setPortfolio] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPortfolio = async () => {
      const recommendationData = sessionStorage.getItem("recommendationData");
      const analyzerData = sessionStorage.getItem("analyzerData");

      if (recommendationData) {
        const formData = JSON.parse(recommendationData);

        try {
          const res = await fetch("/api/portfolioRecommendation", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          });

          const result = await res.json();
          setPortfolio(result);
          sessionStorage.setItem("portfolioRecommendation", JSON.stringify(result));
          router.push("/portfolioRecommendation");
        } catch (err) {
          console.error("Error fetching recommendation", err);
        } finally {
          setLoading(false);
        }

        return;
      }

      if (analyzerData) {
        const formData = JSON.parse(analyzerData);

        try {
          const res = await fetch("/api/portfolioAnalyzer", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          });

          const result = await res.json();
          setPortfolio(result);
          sessionStorage.setItem("analyzerResult", JSON.stringify(result));
          router.push("/portfolioAnalyzer");
        } catch (err) {
          console.error("Error fetching analysis", err);
        } finally {
          setLoading(false);
        }

        return;
      }

      // If no data is found
      router.push("/riskAnalysis");
    };

    fetchPortfolio();
  }, [router]);

  if (loading) return <div>Loading portfolio results...</div>;

  return <div>Loading complete.</div>;
}
