"use client"

import React from "react"
import { Card } from "@/components/ui/card"
import { formatCurrency } from "@/lib/currency"
import { Eye, EyeOff } from "lucide-react"

interface BalanceCardProps {
  balance: number
  onPayClick?: () => void
}

export function BalanceCard({ balance, onPayClick }: BalanceCardProps) {
  const [isHidden, setIsHidden] = React.useState(false)

  return (
    <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20 p-6">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-medium text-muted-foreground">Total Balance</p>
        <button onClick={() => setIsHidden(!isHidden)} className="p-1 hover:bg-secondary rounded-lg transition-colors">
          {isHidden ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      <p className="text-3xl font-bold text-foreground mb-4">{isHidden ? "•••••" : formatCurrency(balance)}</p>
      <button
        onClick={onPayClick}
        className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
      >
        Make a Payment
      </button>
    </Card>
  )
}
