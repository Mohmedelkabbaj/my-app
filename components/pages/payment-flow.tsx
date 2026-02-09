"use client"

import type React from "react"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/atoms/button"
import { PaymentMethodCard } from "@/components/molecules/payment-method-card"
import { formatCurrency } from "@/lib/currency"
import { getAvailableMethods, getPaymentMethod, calculatePaymentFees } from "@/lib/payment-methods"
import { ChevronRight, Info } from "lucide-react"
import { usePaymentProcessing } from "@/hooks/use-payment-processing"

interface PaymentFlowProps {
  onNavigate: (page: string) => void
}

type PaymentStep = "method" | "form" | "review" | "processing" | "success" | "error"

export function PaymentFlow({ onNavigate }: PaymentFlowProps) {
  const [currentStep, setCurrentStep] = useState<PaymentStep>("method")
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)
  const [selectedMethodDetails, setSelectedMethodDetails] = useState<ReturnType<typeof getPaymentMethod> | null>(null)
  const amount = 120.0
  const { isLoading: isProcessing, error: processError, response: paymentResponse } = usePaymentProcessing()

  const availableMethods = getAvailableMethods()

  const handleMethodSelect = (methodId: string) => {
    const methodDetails = getPaymentMethod(methodId)
    setSelectedMethod(methodId)
    setSelectedMethodDetails(methodDetails || null)
    setCurrentStep("form")
  }

  // Step 1: Select Payment Method
  if (currentStep === "method") {
    return (
      <div className="p-6 max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-1">Choose Payment Method</h1>
          <p className="text-muted-foreground">Select how you want to pay {formatCurrency(amount)}</p>
        </div>

        {/* Payment Methods Grid */}
        <div className="space-y-3">
          {availableMethods.map((method) => (
            <div
              key={method.id}
              className="cursor-pointer"
              onClick={() => handleMethodSelect(method.id)}
            >
              <PaymentMethodCard
                id={method.id}
                type={method.type}
                label={method.label}
                description={method.description}
                details={<span className="text-sm">{method.icon} {method.description}</span>}
                isSelected={selectedMethod === method.id}
                onSelect={() => handleMethodSelect(method.id)}
              />
            </div>
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

  // Step 2: Payment Form (with instructions)
  if (currentStep === "form" && selectedMethodDetails) {
    const fees = calculatePaymentFees(amount, selectedMethod || "")
    return (
      <div className="p-6 max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-1">
            {selectedMethodDetails.label}
          </h1>
          <p className="text-muted-foreground">
            Amount to pay: {formatCurrency(fees.total)}
            {fees.percentageFee + fees.fixedFee > 0 && (
              <span className="text-xs ml-2">
                ({formatCurrency(amount)} + {formatCurrency(fees.percentageFee + fees.fixedFee)} fee)
              </span>
            )}
          </p>
        </div>

        {/* Instructions for Payment Method */}
        <Card className="p-6 bg-primary/5 border-primary/20">
          <h3 className="font-bold text-foreground mb-3 flex gap-2">
            <Info size={20} />
            How to Pay with {selectedMethodDetails.label}
          </h3>
          <ol className="space-y-2 text-sm text-muted-foreground">
            {selectedMethodDetails.instructions.map((instruction, idx) => (
              <li key={idx} className="flex gap-3">
                <span className="font-bold text-primary">{idx + 1}.</span>
                <span>{instruction}</span>
              </li>
            ))}
          </ol>
        </Card>

        {/* Proceed to Confirmation */}
        <div className="flex gap-3">
          <Button onClick={() => setCurrentStep("method")} variant="secondary" size="lg" className="w-full">
            Back
          </Button>
          <Button onClick={() => setCurrentStep("review")} size="lg" className="w-full gap-2">
            Continue to Confirm
            <ChevronRight size={20} />
          </Button>
        </div>
      </div>
    )
  }

  // Step 3: Review & Confirm
  if (currentStep === "review" && selectedMethodDetails) {
    const fees = calculatePaymentFees(amount, selectedMethod || "")
    return (
      <div className="p-6 max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-1">Confirm Your Payment</h1>
          <p className="text-muted-foreground">Review the details before completing payment</p>
        </div>

        {/* Payment Details */}
        <Card className="p-6 space-y-4">
          <div className="flex justify-between items-center pb-4 border-b border-border">
            <span className="text-muted-foreground">Base Amount:</span>
            <span className="font-semibold text-foreground">{formatCurrency(amount)}</span>
          </div>
          {fees.percentageFee + fees.fixedFee > 0 && (
            <div className="flex justify-between items-center pb-4 border-b border-border">
              <span className="text-muted-foreground">Processing Fee:</span>
              <span className="font-semibold text-foreground">
                {formatCurrency(fees.percentageFee + fees.fixedFee)}
              </span>
            </div>
          )}
          <div className="flex justify-between items-center">
            <span className="font-bold text-foreground">Total:</span>
            <span className="font-bold text-lg text-primary">{formatCurrency(fees.total)}</span>
          </div>
        </Card>

        {/* Payment Method Info */}
        <Card className="p-6 bg-secondary/50">
          <p className="text-sm text-muted-foreground mb-2">Payment Method:</p>
          <p className="font-bold text-foreground">{selectedMethodDetails.label}</p>
          <p className="text-sm text-muted-foreground">{selectedMethodDetails.description}</p>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button onClick={() => setCurrentStep("form")} variant="secondary" size="lg" className="w-full">
            Back
          </Button>
          <Button
            onClick={() => setCurrentStep("processing")}
            size="lg"
            className="w-full"
          >
            Complete Payment
          </Button>
        </div>
      </div>
    )
  }

  return null
}
