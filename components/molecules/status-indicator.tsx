"use client"
import { Check, AlertCircle, XCircle } from "lucide-react"

interface StatusIndicatorProps {
  status: "success" | "error" | "pending"
  title: string
  message?: string
  amount?: string
  transactionId?: string
}

const statusConfig = {
  success: {
    icon: Check,
    bgColor: "bg-green-100",
    iconColor: "text-green-600",
    title: "Payment Successful",
  },
  error: {
    icon: XCircle,
    bgColor: "bg-red-100",
    iconColor: "text-red-600",
    title: "Payment Failed",
  },
  pending: {
    icon: AlertCircle,
    bgColor: "bg-yellow-100",
    iconColor: "text-yellow-600",
    title: "Processing Payment",
  },
}

export function StatusIndicator({ status, title, message, amount, transactionId }: StatusIndicatorProps) {
  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className={`${config.bgColor} p-4 rounded-full mb-4`}>
        <Icon size={48} className={config.iconColor} />
      </div>
      <h2 className="text-2xl font-bold text-foreground mb-2">{title}</h2>
      {message && <p className="text-muted-foreground mb-4">{message}</p>}
      {amount && <p className="text-xl font-semibold text-foreground mb-4">{amount}</p>}
      {transactionId && (
        <div className="text-sm text-muted-foreground">
          <p>
            Transaction ID: <span className="font-mono font-semibold text-foreground">{transactionId}</span>
          </p>
        </div>
      )}
    </div>
  )
}
