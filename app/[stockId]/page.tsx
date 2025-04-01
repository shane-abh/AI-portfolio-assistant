"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface Params {
  stockId: string;
}

export default function StockIdPage({ params }: { params: Params }) {
  const { stockId } = params;

  const [stockData, setStockData] = useState<any[]>([]);
  const [stockAnalysis, setStockAnalysis] = useState<any>(null);

  useEffect(() => {
    async function fetchStockData() {
      const res = await fetch(
        `https://api.tiingo.com/tiingo/daily/${stockId}/prices?startDate=2025-01-02&token=${process.env.NEXT_PUBLIC_TIINGO_API_KEY}`
      );
      const data = await res.json();
      setStockData(data);
    }
    fetchStockData();


    async function fetchStockAnalysisAI() {
      const result = await fetch("/api/stock-analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify({ stockSymbol: stockId }),
      });
  
      const data = await result.json();
      setStockAnalysis(data);
    }
  
    fetchStockAnalysisAI();
  }, [stockId]);

  const convertDateToMonth = (dateStr: string) => {
    const date = new Date(dateStr);

    // Format to "Feb DD"
    const formattedDate = date.toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
    });
    return formattedDate;
  };

  console.log(stockData);

  // Transform the data
  const formattedData =
    stockData &&
    stockData.map((item) => ({
      ...item,
      date: convertDateToMonth(item.date),
    }));

  // console.log(transformedData)



  

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <h1>{stockId}</h1>
      <ResponsiveContainer width="50%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={formattedData || []}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="10 3" strokeOpacity={0} />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip labelFormatter={(label) => `Date: ${label}`} />
          <Legend />
          <Line
            type="monotone"
            dataKey="close"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
        </LineChart>
      </ResponsiveContainer>

      <h2>Stock Analyzed by AI</h2>
      {stockAnalysis && (<div>
       {stockAnalysis.initialAnalysis }
       {stockAnalysis.investmentAnalysis}
        </div>)}
    </div>
  );
}
