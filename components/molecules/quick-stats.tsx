"use client"

import type React from "react"
import { Card } from "@/components/ui/card"

interface StatItem {
  label: string
  value: string | number
  icon?: React.ReactNode
}

interface QuickStatsProps {
  stats: StatItem[]
}

export function QuickStats({ stats }: QuickStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-xl font-bold text-foreground mt-1">{stat.value}</p>
            </div>
            {stat.icon && <div className="text-primary/50">{stat.icon}</div>}
          </div>
        </Card>
      ))}
    </div>
  )
}
