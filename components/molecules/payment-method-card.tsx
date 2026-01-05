"use client"

import type React from "react"
import { cn } from "@/lib/utils"
import { CreditCard, Banknote, Wallet, Truck } from "lucide-react"

interface PaymentMethodCardProps {
  id: string
  type: "card" | "bank" | "wallet" | "cod"
  label: string
  description?: string
  isSelected?: boolean
  onSelect?: (id: string) => void
  details?: React.ReactNode
}

const icons = {
  card: CreditCard,
  bank: Banknote,
  wallet: Wallet,
  cod: Truck,
}

export function PaymentMethodCard({
  id,
  type,
  label,
  description,
  isSelected,
  onSelect,
  details,
}: PaymentMethodCardProps) {
  const Icon = icons[type]

  return (
    <button
      onClick={() => onSelect?.(id)}
      className={cn(
        "w-full p-4 rounded-lg border-2 transition-all text-left",
        isSelected ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 bg-card",
      )}
    >
      <div className="flex items-start gap-3">
        <div className={cn("p-2 rounded-lg", isSelected ? "bg-primary text-primary-foreground" : "bg-secondary")}>
          <Icon size={24} />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">{label}</h3>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
          {details && <div className="mt-2 text-sm">{details}</div>}
        </div>
      </div>
    </button>
  )
}
