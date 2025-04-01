import { ChatGroq } from "@langchain/groq";
import { PromptTemplate } from "@langchain/core/prompts";

export default async function handler(req, res) {
  const { stockSymbol } = req.body;
  const llm = new ChatGroq({
    model: "deepseek-r1-distill-llama-70b",
    temperature: 0.6,
    max_completion_tokens: 4096,
    top_p: 0.95,
    stream: false,
    response_format: {
      type: "json_object",
    },
    stop: null,
  });

  // Step 1: Get initial stock analysis using a prompt template
  const stockAnalysisTemplate = new PromptTemplate({
    template: `You are an expert financial analyst specializing in stock portfolio creation. Based on my investment preferences, risk tolerance, and goals, recommend a well-diversified portfolio.

 Investment Preferences:
- Investment Amount: 100000
- Risk Tolerance: Low
- Time Horizon: Medium-term (3-7 years)
- Preferred Sectors: Finance
- Investment Strategy: Any
- Geographic Preference: USA
- Market Conditions:  Neutral

Output Requirements:
1. A **list of recommended stocks/ETFs** (with percentage allocation and max upto 5 stocks).
2. stock symbol and name
2. A brief **justification for each stock/ETF**.
3. Portfolio **expected return & risk level**.
4. How this portfolio compares against **S&P 500 or another benchmark**.
5. Any **potential risks** and suggested risk management strategies.

Ensure the recommendations align with current market trends and economic outlook. Return only the JSON format`,
    inputVariables: ["symbol"],
  });

  const stockAnalysisPrompt = await stockAnalysisTemplate.format({
    symbol: stockSymbol,
  });

  const context = await llm.invoke([
    { role: "system", content: stockAnalysisPrompt },
  ]);

  console.log("Initial Analysis:", context);

// Step 2: Clean the JSON using a second LLM
const llm2 = new ChatGroq({
    model: "gemma2-9b-it",
    temperature: 1,
    max_completion_tokens: 1024,
    top_p: 1,
    stream: false,
    response_format: { type: "json_object" },
  });

  const portfolioParsingTemplate = new PromptTemplate({
    template: `I have received stock portfolio data in JSON format, but it is messy. Can you clean it and return a valid structured JSON? Here is the data:
    
    {data}
    
    Ensure:
    - The JSON is valid.
    - The structure follows standard JSON formatting.
    - Any unnecessary fields are removed.
    - Only return the cleaned JSON.`,
    inputVariables: ["data"],
  });

  const portfolioParsingPrompt = await portfolioParsingTemplate.format({
    data: context.content,
  });

  const response2 = await llm2.invoke(portfolioParsingPrompt);

//   let cleanedPortfolio;
//   try {
//     cleanedPortfolio = JSON.parse(response2);
//   } catch (error) {
//     console.error("Error parsing cleaned JSON:", error);
//     return res.status(500).json({ error: "Failed to parse cleaned JSON" });
//   }

  console.log("Cleaned Portfolio:", response2.content);


  function extractAndParseJSON(response) {
    // Remove ```json and ``` from the response
    const jsonMatch = response.match(/```json\n([\s\S]*?)\n```/);
  
    if (jsonMatch && jsonMatch[1]) {
      try {
        return JSON.parse(jsonMatch[1]); // Parse JSON
      } catch (error) {
        console.error("Error parsing JSON:", error);
        return null;
      }
    } else {
      console.error("No valid JSON found in response.");
      return null;
    }
  }

  const parsedJSON = extractAndParseJSON(response2.content);
  console.log("Parsed JSON:", parsedJSON);

  // Step 5: Send response to client
  res.status(200).json({
    initialAnalysis: parsedJSON,
    // investmentAnalysis: aiInvokeMsg.content,
    // bindAnalysis: aiBindMsg.content,
  });
}
