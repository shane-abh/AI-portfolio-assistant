import { ChatGroq } from "@langchain/groq";
import { PromptTemplate } from "@langchain/core/prompts";
import { gemma2LLM } from "./llm";

export function extractAndParseJSON(response: any) {
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

export async function cleanJSONUsingLLM(JSONData: any) {
  const llm2 = gemma2LLM; 

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
    data: JSONData,
  });

  
  const response2 = await llm2.invoke(portfolioParsingPrompt);
  const parsedJSON = extractAndParseJSON(response2.content);

  return parsedJSON;
}

export async function cleanJSONUsingLLM2(JSONData: any, JSONStructure: any) {
  const llm2 = new ChatGroq({
    model: "gemma2-9b-it",
    temperature: 1,
    max_completion_tokens: 1024,
    top_p: 1,
    stream: false,
    response_format: { type: "json_object" , schema: JSONStructure },
  });

  const portfolioParsingTemplate = new PromptTemplate({
    template: `I have received stock portfolio data in JSON format, but it is messy. Can you clean it and return a valid structured JSON? Here is the data:
      
      {data}

      ### **Strict JSON Schema:**
      {JSONSchema}
      
      Ensure:
      - The JSON is valid.
      - The structure follows standard JSON formatting.
      - Any unnecessary fields are removed.
      - Only return the cleaned JSON.`,
    inputVariables: ["data", "JSONSchema"],
  });

  const portfolioParsingPrompt = await portfolioParsingTemplate.format({
    data: JSONData,
    JSONSchema: JSON.stringify(JSONStructure, null, 2),
  });

  const structuredOutput = llm2.withStructuredOutput(JSONStructure)
  const response = await llm2.invoke([
    { role: "system", content: "You are an AI assistant that strictly returns structured JSON." },
    { role: "user", content: portfolioParsingPrompt },
  ]);
  const parsedJSON = extractAndParseJSON(response.content);

  return parsedJSON;
}

// Format large numbers with commas
export const formatNumber = (num: number | string) => {
  if (typeof num === "string") {
    num = Number.parseFloat(num);
  }
  return num.toLocaleString("en-US");
};

// Format currency
export const formatCurrency = (num: number | string) => {
  if (typeof num === "string") {
    num = Number.parseFloat(num);
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(num);
};

// Format percentage
export const formatPercent = (num: number | string) => {
  if (typeof num === "string") {
    num = Number.parseFloat(num);
  }
  return `${num.toFixed(2)}%`;
};

// Format market cap in billions/trillions
export const formatMarketCap = (marketCap: string) => {
  const num = Number.parseFloat(marketCap);
  if (num >= 1e12) {
    return `${(num / 1e12).toFixed(2)}T`;
  } else if (num >= 1e9) {
    return `${(num / 1e9).toFixed(2)}B`;
  } else if (num >= 1e6) {
    return `${(num / 1e6).toFixed(2)}M`;
  }
  return formatNumber(num);
};
