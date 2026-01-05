"use client"

import { useState } from "react"
import { BillingFormGroup } from "@/components/molecules/billing-form-group"
import { CardInputSection } from "@/components/molecules/card-input-section"
import { SummaryBox } from "@/components/molecules/summary-box"
import { ProgressIndicator } from "@/components/molecules/progress-indicator"
import { Button } from "@/components/atoms/button"
import { PaymentLoadingPage } from "./payment-loading-page"
import { PaymentSuccessPage } from "./payment-success-page"
import { PaymentErrorPage } from "./payment-error-page"

const TOTAL_AMOUNT = 120.0

export const CheckoutPage = () => {
  const [step, setStep] = useState(1)
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleFormChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: "" }))
  }

  const validateBillingInfo = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Valid email required"
    if (!formData.phone.match(/^\+?[\d\s]{10,}$/)) newErrors.phone = "Valid phone required"
    return newErrors
  }

  const validateCardInfo = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.cardNumber.match(/^\d{16}$/)) newErrors.cardNumber = "Valid 16-digit card required"
    if (!formData.expiry.match(/^\d{2}\/\d{2}$/)) newErrors.expiry = "Use MM/YY format"
    if (!formData.cvc.match(/^\d{3}$/)) newErrors.cvc = "Valid 3-digit CVC required"
    return newErrors
  }

  const handleContinue = () => {
    const billingErrors = validateBillingInfo()
    if (Object.keys(billingErrors).length > 0) {
      setErrors(billingErrors)
      return
    }
    setStep(2)
  }

  const handlePayment = async () => {
    const cardErrors = validateCardInfo()
    if (Object.keys(cardErrors).length > 0) {
      setErrors(cardErrors)
      return
    }

    setStatus("loading")
    // Simulate payment processing
    setTimeout(() => {
      const success = Math.random() > 0.3
      setStatus(success ? "success" : "error")
    }, 2000)
  }

  const handleRetry = () => {
    setStatus("idle")
  }

  if (status === "loading") return <PaymentLoadingPage />
  if (status === "success") return <PaymentSuccessPage amount={TOTAL_AMOUNT} />
  if (status === "error") return <PaymentErrorPage onRetry={handleRetry} />

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Complete Your Payment</h1>
          <p className="text-muted-foreground">Secure and fast checkout with MAD currency</p>
        </div>

        {/* Progress Indicator */}
        <ProgressIndicator currentStep={step} totalSteps={2} steps={["Billing", "Payment"]} />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Step 1: Billing Information */}
            {step === 1 && (
              <>
                <BillingFormGroup
                  name={formData.name}
                  email={formData.email}
                  phone={formData.phone}
                  errors={errors}
                  onChange={handleFormChange}
                />
                <Button size="lg" onClick={handleContinue} className="w-full">
                  Continue to Payment
                </Button>
              </>
            )}

            {/* Step 2: Card Details */}
            {step === 2 && (
              <>
                <CardInputSection
                  cardNumber={formData.cardNumber}
                  expiry={formData.expiry}
                  cvc={formData.cvc}
                  errors={errors}
                  onChange={handleFormChange}
                />
                <div className="flex gap-4">
                  <Button variant="secondary" size="lg" onClick={() => setStep(1)} className="flex-1">
                    Back
                  </Button>
                  <Button size="lg" onClick={handlePayment} className="flex-1">
                    Pay {TOTAL_AMOUNT.toFixed(2)} MAD
                  </Button>
                </div>
              </>
            )}
          </div>

          {/* Sidebar: Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <SummaryBox total={TOTAL_AMOUNT} itemDescription="Order Total" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
