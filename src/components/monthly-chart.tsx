"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
//import { Card, CardContent, CardHeader, CardTitle} from "@/componets/ui/card"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

//import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type ChartData = {
  month: string
  amount: number
}

export function MonthlyChart({ data }: { data: ChartData[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `Rs ${value}`}
            />
            <Bar dataKey="amount" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">Month</span>
                          <span className="font-bold text-muted-foreground">{payload[0].payload.month}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">Amount</span>
                          <span className="font-bold">Rs {payload[0].value}</span>
                        </div>
                      </div>
                    </div>
                  )
                }
                return null
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

