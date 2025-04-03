"use client"

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface PriceChartProps {
  data: { date: string; price: number }[]
}

export function PriceChart({ data }: PriceChartProps) {
  console.log(data)
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" />
          <YAxis domain={["auto", "auto"]} tickFormatter={(value) => `$${value}`} />
          <Tooltip formatter={(value) => [`$${value}`, "Price"]} labelFormatter={(label) => `Date: ${label}`} />
          <Area type="monotone" dataKey="close" stroke="#16a34a" fill="#dcfce7" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

