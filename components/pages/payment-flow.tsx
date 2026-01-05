"use client"

import type React from "react"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/atoms/button"
import { PaymentMethodCard } from "@/components/molecules/payment-method-card"
import { formatCurrency } from "@/lib/currency"
import { ChevronRight } from "lucide-react"

interface PaymentFlowProps {
  onNavigate: (page: string) => void
}

type PaymentStep = "method" | "card" | "bank" | "wallet" | "cod" | "review"

export function PaymentFlow({ onNavigate }: PaymentFlowProps) {
  const [currentStep, setCurrentStep] = useState<PaymentStep>("method")
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)
  const amount = 120.0

  const handleMethodSelect = (methodId: string) => {
    setSelectedMethod(methodId)
    if (methodId === "card-payment") {
      setCurrentStep("card")
    } else if (methodId === "bank-transfer") {
      setCurrentStep("bank")
    } else if (methodId === "wallet-payment") {
      setCurrentStep("wallet")
    } else if (methodId === "cod") {
      setCurrentStep("cod")
    }
  }

  const paymentMethods = [
    {
      id: "card-payment",
      type: "card" as const,
      label: "Credit/Debit Card",
      description: "Pay securely with your card",
    },
    {
      id: "bank-transfer",
      type: "bank" as const,
      label: "Bank Transfer",
      description: "Direct bank account transfer",
    },
    {
      id: "wallet-payment",
      type: "wallet" as const,
      label: "Mobile Wallet",
      description: "Inwi Money or Orange Money",
    },
    {
      id: "cod",
      type: "cod" as const,
      label: "Cash on Delivery",
      description: "Pay when you receive the order",
    },
  ]

  // Step 1: Select Payment Method
  if (currentStep === "method") {
    return (
      <div className="p-6 max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-1">Choose Payment Method</h1>
          <p className="text-muted-foreground">Select how you want to pay {formatCurrency(amount)}</p>
        </div>

        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <PaymentMethodCard
              key={method.id}
              {...method}
              isSelected={selectedMethod === method.id}
              onSelect={() => handleMethodSelect(method.id)}
            />
          ))}
        </div>

        <div className="flex gap-3">
          <Button onClick={() => onNavigate("dashboard")} variant="secondary" size="lg" className="w-full">
            Cancel
          </Button>
          <Button disabled={!selectedMethod} size="lg" className="w-full gap-2">
            Continue
            <ChevronRight size={20} />
          </Button>
        </div>
      </div>
    )
  }

  // Step 2: Card Payment
  if (currentStep === "card") {
    return <CardPaymentForm amount={amount} onNavigate={onNavigate} onBack={() => setCurrentStep("method")} />
  }

  // Step 3: Bank Transfer
  if (currentStep === "bank") {
    return <BankTransferForm amount={amount} onNavigate={onNavigate} onBack={() => setCurrentStep("method")} />
  }

  // Step 4: Wallet Payment
  if (currentStep === "wallet") {
    return <WalletPaymentForm amount={amount} onNavigate={onNavigate} onBack={() => setCurrentStep("method")} />
  }

  // Step 5: Cash on Delivery
  if (currentStep === "cod") {
    return <CashOnDeliveryForm amount={amount} onNavigate={onNavigate} onBack={() => setCurrentStep("method")} />
  }

  return null
}

function CardPaymentForm({ amount, onNavigate, onBack }: any) {
  const [formData, setFormData] = useState({
    cardNumber: "1111 2222 3333 4444",
    expiry: "12/34",
    cvc: "123",
    cardholder: "AAA BBB",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false)
      // In a real app, this would navigate to success/error page
      alert("Payment processing...")
    }, 2000)
  }

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-1">Card Payment</h1>
        <p className="text-muted-foreground">Amount: {formatCurrency(amount)}</p>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Card Number</label>
            <input
              type="text"
              value={formData.cardNumber}
              onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="1111 2222 3333 4444"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Expiry</label>
              <input
                type="text"
                value={formData.expiry}
                onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="12/34"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">CVC</label>
              <input
                type="text"
                value={formData.cvc}
                onChange={(e) => setFormData({ ...formData, cvc: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="123"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Cardholder Name</label>
            <input
              type="text"
              value={formData.cardholder}
              onChange={(e) => setFormData({ ...formData, cardholder: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="AAA BBB"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" onClick={onBack} variant="secondary" size="lg" className="w-full">
              Back
            </Button>
            <Button type="submit" size="lg" className="w-full" isLoading={isLoading}>
              Pay {formatCurrency(amount)}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

function BankTransferForm({ amount, onNavigate, onBack }: any) {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      alert("Bank transfer initiated...")
    }, 2000)
  }

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-1">Bank Transfer</h1>
        <p className="text-muted-foreground">Amount: {formatCurrency(amount)}</p>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
            <input
              type="text"
              defaultValue="AAA BBB"
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Full Name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">IBAN</label>
            <input
              type="text"
              defaultValue="MA1122334455667788990011"
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="IBAN"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Bank Name</label>
            <input
              type="text"
              defaultValue="Bank XYZ"
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Bank Name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Upload Transfer Proof</label>
            <input
              type="file"
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" onClick={onBack} variant="secondary" size="lg" className="w-full">
              Back
            </Button>
            <Button type="submit" size="lg" className="w-full" isLoading={isLoading}>
              Confirm Transfer
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

function WalletPaymentForm({ amount, onNavigate, onBack }: any) {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      alert("Wallet payment initiated...")
    }, 2000)
  }

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-1">Mobile Wallet Payment</h1>
        <p className="text-muted-foreground">Amount: {formatCurrency(amount)}</p>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
            <input
              type="tel"
              defaultValue="+212 11111111"
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="+212 11111111"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Wallet Provider</label>
            <select className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
              <option>Inwi Money</option>
              <option>Orange Money</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" onClick={onBack} variant="secondary" size="lg" className="w-full">
              Back
            </Button>
            <Button type="submit" size="lg" className="w-full" isLoading={isLoading}>
              Pay {formatCurrency(amount)}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

function CashOnDeliveryForm({ amount, onNavigate, onBack }: any) {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      alert("COD order confirmed...")
    }, 2000)
  }

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-1">Cash on Delivery</h1>
        <p className="text-muted-foreground">Amount: {formatCurrency(amount)}</p>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <p className="text-sm text-foreground">
              <strong>Delivery Address:</strong> Street X, City Y
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Special Instructions</label>
            <textarea
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              rows={4}
              placeholder="Add any special delivery instructions..."
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" onClick={onBack} variant="secondary" size="lg" className="w-full">
              Back
            </Button>
            <Button type="submit" size="lg" className="w-full" isLoading={isLoading}>
              Confirm Order
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
