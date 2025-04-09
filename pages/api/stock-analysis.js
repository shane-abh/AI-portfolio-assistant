import { ChatGroq } from "@langchain/groq";
import { PromptTemplate } from "@langchain/core/prompts";
import { stockAnalysisPromptString, investmentAnalysisPrompt } from "./utils/constants";
import {llama70bversatile} from "./utils/llm";

export default async function handler(req, res) {
  const { stockSymbol } = req.body;
  console.log(stockSymbol);

  
  const llm = llama70bversatile

  // Step 1: Get initial stock analysis using a prompt template
  const stockAnalysisTemplate = new PromptTemplate({
    template: `${stockAnalysisPromptString}`,
    inputVariables: ["symbol"],
  });

  const stockAnalysisPrompt = await stockAnalysisTemplate.format({
    symbol: stockSymbol,
  });

  const context = await llm.invoke([
    { role: "system", content: stockAnalysisPrompt },
  ]);

  console.log("Initial Analysis:", context.content);

  // Step 2: Fetch stock data from Alpha Vantage
  async function fetchStockData(stockSymbol) {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${stockSymbol}&apikey=${process.env.STOCK_API_KEY}`
    );
    const data = await response.json();
    return data;
  }

  const stockData = await fetchStockData(stockSymbol);

  // Step 3: Pass the stock data to LLM for investment analysis using a prompt template
  const investmentAnalysisTemplate = new PromptTemplate({
    template: `${investmentAnalysisPrompt}`,
    inputVariables: ["stock_data"],
  });

  const analysisPrompt = await investmentAnalysisTemplate.format({
    stock_data: JSON.stringify(stockData),
  });

  const aiInvokeMsg = await llm.invoke(
    [{ role: "system", content: analysisPrompt }],
    {
      response_format: { type: "json_object" },
    }
  );

  const investmentAnalysis = JSON.parse(aiInvokeMsg.content);

  // Step 5: Send response to client
  res.status(200).json({
    AIAnalysis: context.content,
    AIinvestmentAnalysis: investmentAnalysis,
    stockData: stockData,
  });
}
