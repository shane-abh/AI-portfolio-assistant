import { ChatGroq } from "@langchain/groq";
import { PromptTemplate } from "@langchain/core/prompts";
import { cleanJSONUsingLLM } from "../../utils/utils";

export default async function handler(req, res) {
  const portfolio = req.body;
 

  const llm = new ChatGroq({
    model: "gemma2-9b-it",
    temperature: 1,
    max_completion_tokens: 1024,
    top_p: 1,
    stream: true,
    stop: null,
  });

  // Step 1: Define Prompt Template (escaping curly braces in JSON structure)
  const portfolioAnalysisTemplate = new PromptTemplate({
    template: `You are an expert portfolio analyst. Given the following input JSON representing a client's portfolio, generate a detailed JSON analysis response. Your response should include the following sections:

1. **portfolioOverview**: Summarize key details like investment amount, risk tolerance, time horizon, investment strategy, and current market conditions based on the given input.

2. **portfolioBreakdown**: For each asset, provide the name, allocation percentage, sector, and a brief analysis describing its strengths, risks, and relevance to the portfolio.

3. **balanceCheck**: Evaluate whether the portfolio is balanced. Identify any issues such as excessive allocation to one asset or sector and note any lack of diversification.

4. **portfolioAnalysis**: Combine insights about diversification and strategy alignment into one paragraph.

5. **predictedReturns**: Provide a predicted return percentage for each stock and an overall predicted return for the portfolio.

6. **recommendations**: Offer specific recommendations with rationales.

Use the following portfolio data as input:

\`\`\`json
{portfolio}
\`\`\`

Ensure that your JSON output follows this structure:

\`\`\`json
{{
    "portfolioOverview": {{
        "investmentAmount": <number>,
        "riskTolerance": "<string>",
        "timeHorizon": "<string>",
        "investmentStrategy": "<string>",
        "marketConditions": "<string>"
    }},
    "portfolioBreakdown": [
        {{
            "name": "<string>",
            "allocationPercentage": <number>,
            "sector": "<string>",
            "analysis": "<string>"
        }}
    ],
    "balanceCheck": {{
        "isBalanced": <boolean>,
        "issues": ["<string>"]
    }},
    "portfolioAnalysis": "<string>",
    "predictedReturns": {{
        "stocks": [
            {{
                "name": "<string>",
                "predictedReturn": <number>
            }}
        ],
        "overallPredictedReturn": <number>
    }},
    "recommendations": [
        {{
            "recommendation": "<string>",
            "rationale": "<string>"
        }}
    ]
}}
\`\`\`

Ensure that your JSON response is **syntactically correct** and includes actionable insights. Make sure to give only insight that is based on the input. Dont give any new suggestions outside of that`,
    inputVariables: ["portfolio"],
  });

  // Step 2: Format Prompt with Portfolio Data
  const portfolioAnalysisPrompt = await portfolioAnalysisTemplate.format({
    portfolio: JSON.stringify(portfolio), // Convert JSON to formatted string
  });

  

  // Step 3: Invoke LLM
  const context = await llm.invoke([
    { role: "system", content: portfolioAnalysisPrompt },
  ]);

  

  const formattedResponse = await cleanJSONUsingLLM(context.content);



  // Step 4: Return JSON response
  res.status(200).json(formattedResponse); // Ensure response is a valid JSON
}
