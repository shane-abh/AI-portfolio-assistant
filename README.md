# 📈 AI-Powered Stock Analysis Dashboard

This platform is a comprehensive stock analysis and portfolio management tool that leverages artificial intelligence to provide users with detailed insights into individual stocks and investment portfolios. The application helps investors make informed decisions by combining traditional financial metrics with AI-powered analysis.

![image](https://github.com/user-attachments/assets/fd870fe2-19bc-4690-8fc4-e7fa73f40de9)

## ✨ Features

- **Stock Analysis Dashboard**:  Provides comprehensive analysis of individual stocks including fundamental metrics, technical indicators, and AI-generated insights.
- **Portfolio Analyzer**:  Allows users to input their investment portfolio and receive analysis on diversification, risk, and performance.
- **Portfolio Recommendations**: Suggests investment opportunities based on user risk profiles and investment goals.
- **AI-Powered Insights**: Leverages LangChain and LLM technology to provide intelligent analysis of stocks and investment opportunities.
- **Interactive Charts**: Visualizes stock price data and key metrics for better decision-making.


## 🧠 AI Analysis Components

The dashboard leverages artificial intelligence to provide:

- **AI Investment Scorecard**: Quantitative scoring of key investment factors
- **AI Recommendation Engine**: Data-driven buy/hold/sell recommendations
- **Growth & Risk Assessment**: Automated evaluation of growth potential and risk factors
- **Investment Thesis Generation**: AI-generated investment thesis based on comprehensive data analysis

## 🛠️ Technologies

- **Next.js**: React framework for server-side rendering and static site generation
- **TypeScript**: Type-safe JavaScript for improved developer experience
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **shadcn/ui**: High-quality UI components built with Radix UI and Tailwind
- **Recharts**: Composable charting library for React
- **Lucide Icons**: Beautiful, consistent icons

## 📊 How It Works

### Data Sources

The dashboard is designed to work with financial data from various sources:

- Stock price and historical data
- Company fundamentals
- Analyst ratings
- Technical indicators
- Financial statements

Currently, the dashboard is connected to financial APIs like Alpha Vantage, Tiingo, and other proprietary data sources.

Then I use this data and send to to the LLM using Groq to perform the analysis and return their predicted data.

### AI Analysis Methodology

The AI analysis engine evaluates stocks based on four key dimensions:

1. **Valuation**: Compares P/E ratio, PEG ratio, and other valuation metrics against industry averages
2. **Growth Potential**: Analyzes earnings growth, revenue growth, and forward-looking indicators
3. **Profitability**: Evaluates profit margins, ROE, ROA, and operational efficiency
4. **Risk Assessment**: Measures volatility (beta), financial stability, and market position

Each dimension receives a score from 0-100, which is then weighted to produce an overall investment score and recommendation.


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
