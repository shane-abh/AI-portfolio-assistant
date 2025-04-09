export const JSONSchema = {
  type: "object",
  properties: {
    initialAnalysis: {
      type: "object",
      properties: {
        portfolio_recommendation: {
          type: "object",
          required: [
            "investment_amount",
            "risk_tolerance",
            "time_horizon",
            "preferred_sectors",
            "investment_strategy",
            "geographic_preference",
            "market_conditions",
            "stocks_etfs",
            "expected_return",
            "risk_level",
            "comparison_to_benchmark",
            "potential_risks",
          ],
          properties: {
            investment_amount: { type: "integer" },
            risk_tolerance: { type: "string" },
            time_horizon: { type: "string" },
            preferred_sectors: { type: "array", items: { type: "string" } },
            investment_strategy: { type: "string" },
            geographic_preference: { type: "string" },
            market_conditions: { type: "string" },
            stocks_etfs: {
              type: "array",
              maxItems: 5,
              items: {
                type: "object",
                required: [
                  "stock_symbol",
                  "stock_name",
                  "sector",
                  "percentage_allocation",
                  "justification",
                ],
                properties: {
                  stock_symbol: { type: "string" },
                  stock_name: { type: "string" },
                  sector: { type: "string" },
                  percentage_allocation: { type: "integer" },
                  justification: { type: "string" },
                },
              },
            },
            expected_return: { type: "string" },
            risk_level: { type: "string" },
            comparison_to_benchmark: {
              type: "object",
              required: ["benchmark", "comparison"],
              properties: {
                benchmark: { type: "string" },
                comparison: { type: "string" },
              },
            },
            potential_risks: {
              type: "array",
              items: {
                type: "object",
                required: ["risk", "management_strategy"],
                properties: {
                  risk: { type: "string" },
                  management_strategy: { type: "string" },
                },
              },
            },
          },
        },
      },
    },
  },
};

export const portfolioAnalyzerResultDataStructure = {
  portfolioOverview: {
    investmentAmount: "number",
    riskTolerance: "string",
    timeHorizon: "string",
    investmentStrategy: "string",
    marketConditions: "string",
  },
  portfolioBreakdown: [
    {
      name: "string",
      allocationPercentage: "number",
      sector: "string",
      analysis: "string",
    },
  ],
  balanceCheck: {
    isBalanced: "boolean",
    issues: ["string"],
  },
  portfolioAnalysis: "string",
  predictedReturns: {
    stocks: [
      {
        name: "string",
        predictedReturn: "number",
      },
    ],
    overallPredictedReturn: "number",
  },
  recommendations: [
    {
      recommendation: "string",
      rationale: "string",
    },
  ],
};
export const portfolioRecommendationPrompt = `You are an expert financial analyst specializing in stock portfolio creation. Based on my investment preferences, risk tolerance, and goals, recommend a well-diversified portfolio.

Investment Preferences:
- Investment Amount: {investmentAmount}
- Risk Tolerance: {riskTolerance}
- Time Horizon: {timeHorizon}
- Preferred Sectors: {preferredSectors}
- Investment Strategy: {investmentStrategy}
- Geographic Preference: {geographicPreference}
- Market Conditions: {marketConditions}

Output Requirements:
1. A **list of recommended stocks/ETFs** (with percentage allocation and max upto 5 stocks).
2. stock symbol and name
3. Sector of each stock/ETF.
4. A brief **justification for each stock/ETF**.
5. Portfolio **expected return & risk level**.
6. How this portfolio compares against **S&P 500 or another benchmark**.
7. Any **potential risks** and suggested risk management strategies.

Ensure the recommendations align with current market trends and economic outlook. ### **Strict JSON Schema:**
{JSONSchema}`;

export const stockAnalysisPromptString = `You are a helpful stock market portfolio assistant. 
    Analyze the stock symbol {symbol} and provide basic insights. 
    Ensure the response is a short paragraph.`;

export const investmentAnalysisPrompt = `Using the following stock data, determine if this stock is a good or bad investment for 3 to 5 years period.
    Provide a JSON response in this format: {{ "recommendation": "Good" | "Bad", "reason": string }}.
    Stock Data: {stock_data}`;

export const portfolioAnalyzerPrompt = `You are an expert portfolio analyst. Given the following input JSON representing a client's portfolio, generate a detailed JSON analysis response. Your response should include the following sections:

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

Ensure that your JSON response is **syntactically correct** and includes actionable insights. Make sure to give only insight that is based on the input. Dont give any new suggestions outside of that`;


export  const portfolioAnalyzerMockData = {
  portfolioOverview: {
    investmentAmount: 100000,
    riskTolerance: "Moderate",
    timeHorizon: "3-7 years",
    investmentStrategy: "Growth",
    marketConditions: "Bullish",
  },
  portfolioBreakdown: [
    {
      name: "Apple Inc.",
      allocationPercentage: 20,
      sector: "Technology",
      analysis:
        "Apple is a multinational technology company known for its innovative products and strong brand recognition. It holds a dominant position in the smartphone and wearable technology markets. However, its reliance on a limited number of products and increasing competition pose risks.",
    },
    {
      name: "Amazon",
      allocationPercentage: 15,
      sector: "E-commerce",
      analysis:
        "Amazon is a global leader in e-commerce and cloud computing. It boasts a vast customer base and a wide range of products and services. However, its dependence on e-commerce growth and antitrust scrutiny present potential challenges.",
    },
    {
      name: "Tesla",
      allocationPercentage: 10,
      sector: "Automotive",
      analysis:
        "Tesla is an electric vehicle and clean energy company known for its cutting-edge technology and ambitious growth plans. Strong demand for electric vehicles presents opportunities, but competition from established automakers and supply chain issues pose risks.",
    },
    {
      name: "Microsoft",
      allocationPercentage: 5,
      sector: "Technology",
      analysis:
        "Microsoft is a technology giant with a diversified portfolio of products and services, including cloud computing, operating systems, and productivity software. Its strong market position and continuous innovation provide stability, but growth may be slower compared to younger technology companies.",
    },
    {
      name: "JPMorgan Chase & Co",
      allocationPercentage: 10,
      sector: "Finance",
      analysis:
        "JPMorgan Chase is a multinational financial services firm offering a wide range of banking, investment, and asset management services. Its size and financial stability make it relatively resilient to market fluctuations, but it can be affected by changes in interest rates and economic conditions.",
    },
  ],
  balanceCheck: {
    isBalanced: false,
    issues: ["Overconcentration in Technology sector (55%)"],
  },
  portfolioAnalysis:
    "The portfolio exhibits a strong growth bias with a significant allocation to technology stocks, reflecting the client's investment strategy. However, the heavy concentration in the technology sector raises concerns about diversification and potential vulnerability to sector-specific risks. A more balanced approach including exposure to other sectors would be advisable.",
  predictedReturns: {
    stocks: [
      {
        name: "Apple Inc.",
        predictedReturn: 12,
      },
      {
        name: "Amazon",
        predictedReturn: 18,
      },
      {
        name: "Tesla",
        predictedReturn: 25,
      },
      {
        name: "Microsoft",
        predictedReturn: 8,
      },
      {
        name: "JPMorgan Chase & Co",
        predictedReturn: 6,
      },
    ],
    overallPredictedReturn: 15,
  },
  recommendations: [
    {
      recommendation: "Diversify across sectors",
      rationale:
        "Reducing the concentration in technology and adding exposure to other sectors such as healthcare, consumer staples, or energy can mitigate portfolio risk.",
    },
    {
      recommendation: "Consider rebalancing",
      rationale:
        "Realigning the allocation to stocks based on individual risk profiles and market outlook can ensure the portfolio remains aligned with the client's risk tolerance and investment goals.",
    },
  ],
};