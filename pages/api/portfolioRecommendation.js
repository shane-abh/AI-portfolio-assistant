import { PromptTemplate } from "@langchain/core/prompts";
import { cleanJSONUsingLLM2 } from "./utils/utils.ts";
import {
  JSONSchema,
  portfolioRecommendationPrompt,
} from "./utils/constants.ts";
import {deepseekR1LLM} from "./utils/llm.ts";

export default async function handler(req, res) {
  const {
    investmentAmount = 100000,
    riskTolerance = "Low",
    timeHorizon = "Medium-term (3-7 years)",
    preferredSectors = "Finance",
    investmentStrategy = "Any",
    geographicPreference = "USA",
    marketConditions = "Neutral",
  } = req.body;

  const llm = deepseekR1LLM;

 

  // Step 1: Get initial stock analysis using a prompt template
  const stockAnalysisTemplate = new PromptTemplate({
    template: `${portfolioRecommendationPrompt}`,
    inputVariables: [
      "investmentAmount",
      "riskTolerance",
      "timeHorizon",
      "preferredSectors",
      "investmentStrategy",
      "geographicPreference",
      "marketConditions",
      "JSONSchema",
    ],
  });

  const stockAnalysisPrompt = await stockAnalysisTemplate.format({
    investmentAmount,
    riskTolerance,
    timeHorizon,
    preferredSectors,
    investmentStrategy,
    geographicPreference,
    marketConditions,
    JSONSchema: JSON.stringify(JSONSchema),
  });

  llm.withStructuredOutput(JSONSchema);

  const context = await llm.invoke([
    {
      role: "system",
      content:
        "You are a financial analyst providing investment recommendations in JSON format.",
    },
    { role: "user", content: stockAnalysisPrompt },
  ]);
  console.log("firstLLMInvoked")

  const parsedJSON = await cleanJSONUsingLLM2(context.content, JSONSchema);

  console.log("parsedJSON");

  // Step 5: Send response to client
  res.status(200).json({
    initialAnalysis: parsedJSON,
  });
}
