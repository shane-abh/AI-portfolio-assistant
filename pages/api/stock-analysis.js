import { ChatGroq } from "@langchain/groq";
import { PromptTemplate } from "@langchain/core/prompts";
import { cleanJSONUsingLLM } from "../../utils/utils";

export default async function handler(req, res) {
  const { stockSymbol } = req.body;
  console.log(stockSymbol)
  const llm = new ChatGroq({
    model: "llama-3.3-70b-versatile",
    temperature: 0,
    maxTokens: undefined,
    maxRetries: 2,
    // other params...
  });

  // Step 1: Get initial stock analysis using a prompt template
  const stockAnalysisTemplate = new PromptTemplate({
    template: `You are a helpful stock market portfolio assistant. 
    Analyze the stock symbol {symbol} and provide basic insights. 
    Ensure the response is a short paragraph.`,
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
    template: `Using the following stock data, determine if this stock is a good or bad investment for 3 to 5 years period.
    Provide a JSON response in this format: {{ "recommendation": "Good" | "Bad", "reason": string }}.
    Stock Data: {stock_data}`,
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

  const investmentAnalysis =JSON.parse(aiInvokeMsg.content);

  // Step 4: Bind response format for future requests
  const llmWithResponseFormat = llm.bind({
    response_format: { type: "json_object" },
  });

  const aiBindMsg = await llmWithResponseFormat.invoke([
    { role: "system", content: analysisPrompt },
  ]);



  // Step 5: Send response to client
  res.status(200).json({
    initialAnalysis: context.content,
    investmentAnalysis: investmentAnalysis,
    // bindAnalysis: aiBindMsg.content,
    stockData: stockData,
  });
}
