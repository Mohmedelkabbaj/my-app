"use client"

import type React from "react"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/atoms/button"
import { PaymentMethodCard } from "@/components/molecules/payment-method-card"
import { Plus, Edit2, Trash2 } from "lucide-react"

interface PaymentMethodsProps {
  onNavigate: (page: string) => void
}

interface PaymentMethod {
  id: string
  type: "card" | "bank" | "wallet" | "cod"
  label: string
  description: string
  details: React.ReactNode
}

const mockMethods: PaymentMethod[] = [
  {
    id: "card-1",
    type: "card",
    label: "Debit Card",
    description: "Visa Card",
    details: <span className="text-sm">**** **** **** 4444</span>,
  },
  {
    id: "bank-1",
    type: "bank",
    label: "Bank Transfer",
    description: "Direct bank account",
    details: <span className="text-sm">IBAN: MA1122334455667788990011</span>,
  },
  {
    id: "wallet-1",
    type: "wallet",
    label: "Mobile Wallet",
    description: "Inwi Money / Orange Money",
    details: <span className="text-sm">+212 11111111</span>,
  },
  {
    id: "cod-1",
    type: "cod",
    label: "Cash on Delivery",
    description: "Pay when you receive",
    details: <span className="text-sm">Street X, City Y</span>,
  },
  {
    id: "balance-1",
    type: "wallet",
    label: "App Balance",
    description: "In-app wallet",
    details: <span className="text-sm font-semibold text-green-600">520.00 MAD</span>,
  },
]

export function PaymentMethods({ onNavigate }: PaymentMethodsProps) {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-1">Payment Methods</h1>
        <p className="text-muted-foreground">Manage your payment options</p>
      </div>

      {/* Active Payment Methods */}
      <div>
        <h2 className="text-lg font-bold text-foreground mb-4">My Payment Methods</h2>
        <div className="space-y-3">
          {mockMethods.map((method) => (
            <div key={method.id} className="group">
              <PaymentMethodCard {...method} isSelected={selectedMethod === method.id} onSelect={setSelectedMethod} />
              {selectedMethod === method.id && (
                <div className="flex gap-2 mt-2 px-4">
                  <Button variant="secondary" size="sm" className="gap-2">
                    <Edit2 size={16} />
                    Edit
                  </Button>
                  <Button variant="danger" size="sm" className="gap-2">
                    <Trash2 size={16} />
                    Delete
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Add New Method */}
      <Card className="p-6 border-dashed border-2 border-border hover:border-primary/50 transition-colors">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-foreground mb-1">Add Payment Method</h3>
            <p className="text-sm text-muted-foreground">Add a new card, account, or wallet</p>
          </div>
          <Button className="gap-2">
            <Plus size={20} />
            Add Method
          </Button>
        </div>
      </Card>

      {/* Payment Methods Info */}
      <Card className="p-6 bg-primary/5 border-primary/20">
        <h3 className="font-bold text-foreground mb-3">Supported Payment Methods</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex gap-2">
            <span className="text-primary">✓</span>
            <span>
              <strong>Credit/Debit Card:</strong> Visa, Mastercard (1111 2222 3333 4444)
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary">✓</span>
            <span>
              <strong>Bank Transfer:</strong> IBAN (MA1122334455667788990011)
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary">✓</span>
            <span>
              <strong>Mobile Wallet:</strong> Inwi Money, Orange Money (+212 11111111)
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary">✓</span>
            <span>
              <strong>Cash on Delivery:</strong> Pay upon receipt (Street X, City Y)
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary">✓</span>
            <span>
              <strong>App Balance:</strong> Use your in-app wallet balance
            </span>
          </li>
        </ul>
      </Card>

      {/* Quick Action */}
      <Button onClick={() => onNavigate("payment")} size="lg" className="w-full">
        Make a Payment
      </Button>
    </div>
  )
}
