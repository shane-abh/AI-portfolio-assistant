import { ChatGroq } from "@langchain/groq";
import { PromptTemplate } from "@langchain/core/prompts";

export function extractAndParseJSON(response) {
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

export async function cleanJSONUsingLLM(JSONData) {
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
    data: JSONData,
  });

  const response2 = await llm2.invoke(portfolioParsingPrompt);

  // function extractAndParseJSON(response) {
  //   // Remove ```json and ``` from the response
  //   const jsonMatch = response.match(/```json\n([\s\S]*?)\n```/);

  //   if (jsonMatch && jsonMatch[1]) {
  //     try {
  //       return JSON.parse(jsonMatch[1]); // Parse JSON
  //     } catch (error) {
  //       console.error("Error parsing JSON:", error);
  //       return null;
  //     }
  //   } else {
  //     console.error("No valid JSON found in response.");
  //     return null;
  //   }
  // }

  console.log("Response from LLM:", response2.content);

  const parsedJSON = extractAndParseJSON(response2.content);

  return parsedJSON;
}
