import { ChatGroq } from "@langchain/groq";
import { PromptTemplate } from "@langchain/core/prompts";
import { stockAnalysisPromptString, investmentAnalysisPrompt } from "./utils/constants";
import {llama70bversatile} from "./utils/llm";

export default async function handler(req, res) {
  const { stockSymbol } = req.body;
 

  
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

 console.log("Basic LLM analysis invoked")

  // Helper function to delay execution
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // Step 2: Fetch stock data from Alpha Vantage
  async function fetchStockData(stockSymbol) {
    try {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${stockSymbol}&apikey=${process.env.STOCK_API_KEY}`
      );
      const data = await response.json();

      if (data["Note"]?.includes("API call frequency")) {
        // Wait 60 seconds and try once more
        await new Promise(resolve => setTimeout(resolve, 60000));
        return fetchStockData(stockSymbol);
      }

      return data;
    } catch (error) {
      throw new Error("Failed to fetch stock data");
    }
  }

  try {
    const stockData = await fetchStockData(stockSymbol);
    console.log("Stock data fetched");
    
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
    console.log("Investment analysis invoked")

    const investmentAnalysis = JSON.parse(aiInvokeMsg.content);

    // Step 5: Send response to client
    res.status(200).json({
      AIAnalysis: context.content,
      AIinvestmentAnalysis: investmentAnalysis,
      stockData: stockData,
    });
    
  } catch (error) {
    return res.status(429).json({
      error: error.message,
      suggestion: "Please try again in a minute or check if the stock symbol is correct."
    });
  }
}
