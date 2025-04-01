// import { NextApiRequest, NextApiResponse } from "next";

// Simulated database
const data = [
  { name: "Apple" },
  { name: "Banana" },
  { name: "Cherry" },
  { name: "Date" },
  { name: "Elderberry" },
];

export default function handler(req , res) {
  const { q } = req.query;
  console.log(req.query)
  if (!q || typeof q !== "string") return res.status(200).json([]);

  const results = data.filter((item) =>
    item.name.toLowerCase().includes(q.toLowerCase())
  );

  res.status(200).json(results);
}
