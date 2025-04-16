

export default async function handler(req , res) {
  const { query } = req.query;
  
  // if (!q || typeof q !== "string") return res.status(200).json([]);

  const response = await fetch(`https://api.tiingo.com/tiingo/utilities/search?query=${query}&token=${process.env.TIINGO_API_KEY}`);

  const results = await response.json();

  res.status(200).json(results);
}
