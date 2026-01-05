"use client"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/atoms/button"
import { Badge } from "@/components/atoms/badge"
import { formatCurrency } from "@/lib/currency"
import { ArrowUpRight, Copy, Download, HelpCircle } from "lucide-react"

interface TransactionDetailsProps {
  onBack?: () => void
}

export function TransactionDetails({ onBack }: TransactionDetailsProps) {
  const transaction = {
    id: "TX-000111222",
    type: "outgoing",
    description: "Payment to Store XYZ",
    amount: 120.0,
    status: "success",
    date: "2025-01-20",
    time: "14:32:45",
    method: "Card",
    cardLast4: "4444",
    recipient: {
      name: "Store XYZ",
      account: "xxxxxxxxxx44",
    },
    sender: {
      name: "AAA BBB",
      account: "aaaa@bbbb.com",
    },
    reference: "INV-2025-001",
    notes: "Payment for purchase",
    fee: 0,
  }

  const statusConfig = {
    success: { color: "bg-green-100", textColor: "text-green-800", label: "Completed" },
    pending: { color: "bg-yellow-100", textColor: "text-yellow-800", label: "Pending" },
    failed: { color: "bg-red-100", textColor: "text-red-800", label: "Failed" },
  }

  const config = statusConfig[transaction.status as keyof typeof statusConfig]

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-1">Transaction Details</h1>
          <p className="text-muted-foreground">ID: {transaction.id}</p>
        </div>
        {onBack && (
          <Button onClick={onBack} variant="secondary">
            Back
          </Button>
        )}
      </div>

      {/* Status Card */}
      <Card className={`${config.color} border-0 p-6`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-full bg-white/50`}>
              <ArrowUpRight size={32} className={config.textColor} />
            </div>
            <div>
              <p className={`text-sm font-medium ${config.textColor}`}>{config.label}</p>
              <h2 className={`text-3xl font-bold ${config.textColor}`}>{formatCurrency(transaction.amount)}</h2>
            </div>
          </div>
          <Badge variant={transaction.status === "success" ? "success" : "error"}>{config.label}</Badge>
        </div>
      </Card>

      {/* Transaction Details */}
      <Card className="p-6">
        <h3 className="text-lg font-bold text-foreground mb-4">Transaction Information</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Date & Time</p>
              <p className="font-medium text-foreground">
                {transaction.date} at {transaction.time}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Reference</p>
              <p className="font-medium text-foreground flex items-center gap-2">
                {transaction.reference}
                <button className="p-1 hover:bg-secondary rounded">
                  <Copy size={16} className="text-muted-foreground" />
                </button>
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Method</p>
              <p className="font-medium text-foreground">
                {transaction.method} ending in {transaction.cardLast4}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Transaction Fee</p>
              <p className="font-medium text-foreground">{formatCurrency(transaction.fee)}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* From & To */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4">
          <p className="text-xs font-medium text-muted-foreground mb-3 uppercase">From</p>
          <div>
            <p className="font-semibold text-foreground">{transaction.sender.name}</p>
            <p className="text-sm text-muted-foreground">{transaction.sender.account}</p>
          </div>
        </Card>
        <Card className="p-4">
          <p className="text-xs font-medium text-muted-foreground mb-3 uppercase">To</p>
          <div>
            <p className="font-semibold text-foreground">{transaction.recipient.name}</p>
            <p className="text-sm text-muted-foreground">{transaction.recipient.account}</p>
          </div>
        </Card>
      </div>

      {/* Notes */}
      {transaction.notes && (
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-2">Notes</p>
          <p className="text-foreground">{transaction.notes}</p>
        </Card>
      )}

      {/* Actions */}
      <div className="flex gap-2">
        <Button variant="secondary" className="flex-1 gap-2">
          <Download size={18} />
          Download Receipt
        </Button>
        <Button variant="secondary" className="flex-1 gap-2">
          <HelpCircle size={18} />
          Report Issue
        </Button>
      </div>
    </div>
  )
}
