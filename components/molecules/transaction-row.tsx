"use client"
import { Badge } from "@/components/atoms/badge"
import { formatCurrency } from "@/lib/currency"
import { ArrowDownLeft, ArrowUpRight } from "lucide-react"

interface TransactionRowProps {
  id: string
  type: "incoming" | "outgoing"
  description: string
  amount: number
  status: "success" | "pending" | "failed"
  date: string
  method: string
}

const statusConfig = {
  success: { variant: "success" as const, label: "Success" },
  pending: { variant: "warning" as const, label: "Pending" },
  failed: { variant: "error" as const, label: "Failed" },
}

export function TransactionRow({ id, type, description, amount, status, date, method }: TransactionRowProps) {
  const isIncoming = type === "incoming"
  const Icon = isIncoming ? ArrowDownLeft : ArrowUpRight
  const statusConfig_ = statusConfig[status]

  return (
    <div className="flex items-center justify-between p-4 border-b border-border hover:bg-secondary/30 transition-colors cursor-pointer">
      <div className="flex items-center gap-3 flex-1">
        <div className={`p-2 rounded-lg ${isIncoming ? "bg-green-100" : "bg-red-100"}`}>
          <Icon size={20} className={isIncoming ? "text-green-600" : "text-red-600"} />
        </div>
        <div className="flex-1">
          <p className="font-medium text-foreground">{description}</p>
          <p className="text-sm text-muted-foreground">
            {method} • {date}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className={`font-semibold ${isIncoming ? "text-green-600" : "text-foreground"}`}>
            {isIncoming ? "+" : "-"}
            {formatCurrency(amount)}
          </p>
          <Badge variant={statusConfig_.variant}>{statusConfig_.label}</Badge>
        </div>
      </div>
    </div>
  )
}
