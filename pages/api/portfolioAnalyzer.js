
import { PromptTemplate } from "@langchain/core/prompts";
import { cleanJSONUsingLLM } from "../utils/utils";
import { portfolioAnalyzerPrompt, portfolioAnalyzerResultDataStructure } from "../utils/constants";
import {gemma2LLM} from "../utils/llm";


export default async function handler(req, res) {
  const portfolio = req.body;

  const llm = gemma2LLM;

  // Step 1: Define Prompt Template (escaping curly braces in JSON structure)
  const portfolioAnalysisTemplate = new PromptTemplate({
    template: `${portfolioAnalyzerPrompt}`,
    inputVariables: ["portfolio"],
  });

  // Step 2: Format Prompt with Portfolio Data
  const portfolioAnalysisPrompt = await portfolioAnalysisTemplate.format({
    portfolio: JSON.stringify(portfolio),
  });

  // Step 3: Invoke LLM
  const context = await llm.invoke([
    { role: "system", content: portfolioAnalysisPrompt },
  ]);

  const formattedResponse = await cleanJSONUsingLLM(context.content);

  // Step 4: Return JSON response
  res.status(200).json(formattedResponse); // Ensure response is a valid JSON
}
