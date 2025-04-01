import { ChatGroq } from "@langchain/groq";
import { PromptTemplate } from "@langchain/core/prompts";
import {cleanJSONUsingLLM, extractAndParseJSON} from "../../utils/utils.js"

export default async function handler(req, res) {
  const {
    investmentAmount = 100000,
    riskTolerence = "Low",
    timeHorizon = "Medium-term (3-7 years)",
    preferredSectors = "Finance",
    investmentStrategy = "Any",
    geographicPreference = "USA",
    marketConditions = "Neutral",
  } = req.body;
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
- Investment Amount: {investmentAmount}
- Risk Tolerance: {riskTolerence}
- Time Horizon: {timeHorizon}
- Preferred Sectors: {preferredSectors}
- Investment Strategy: {investmentStrategy}
- Geographic Preference:  {geographicPreference}
- Market Conditions:  {marketConditions}

Output Requirements:
1. A **list of recommended stocks/ETFs** (with percentage allocation and max upto 5 stocks).
2. stock symbol and name
2. A brief **justification for each stock/ETF**.
3. Portfolio **expected return & risk level**.
4. How this portfolio compares against **S&P 500 or another benchmark**.
5. Any **potential risks** and suggested risk management strategies.

Ensure the recommendations align with current market trends and economic outlook. Return only the JSON format`,
    inputVariables: [
      "investmentAmount",
      "riskTolerence",
      "timeHorizon",
      "preferredSectors",
      "investmentStrategy",
      "geographicPreference",
      "marketConditions",
    ],
  });

  const stockAnalysisPrompt = await stockAnalysisTemplate.format({
    investmentAmount,
    riskTolerence,
    timeHorizon,
    preferredSectors,
    investmentStrategy,
    geographicPreference,
    marketConditions,
  });

  const context = await llm.invoke([
    { role: "system", content: stockAnalysisPrompt },
  ]);



  const parsedJSON = await cleanJSONUsingLLM(context.content);

  // Step 5: Send response to client
  res.status(200).json({
    initialAnalysis: parsedJSON,
  });
}
