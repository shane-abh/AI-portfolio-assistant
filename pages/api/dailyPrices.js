

export default async function handler(req , res) {
    const { symbol } = req.query;

    console.log(req.query)
    
    // if (!q || typeof q !== "string") return res.status(200).json([]);
  
    const response = await fetch(`https://api.tiingo.com/tiingo/daily/${symbol}/prices?startDate=2025-01-02&token=${process.env.TIINGO_API_KEY}`);
  
    const results = await response.json();
  
    res.status(200).json(results);
  }
  