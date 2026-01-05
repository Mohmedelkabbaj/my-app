"use client"

import { Button } from "@/components/atoms/button"

interface PaymentErrorPageProps {
  onRetry: () => void
}

export const PaymentErrorPage = ({ onRetry }: PaymentErrorPageProps) => (
  <div className="min-h-screen bg-background flex items-center justify-center p-4">
    <div className="text-center max-w-md">
      <div className="text-6xl mb-4">✕</div>
      <h1 className="text-3xl font-bold text-foreground mb-2">Payment Failed</h1>
      <p className="text-muted-foreground mb-8">
        Unfortunately, your payment could not be processed. Please check your card details and try again.
      </p>
      <Button size="lg" onClick={onRetry} className="w-full">
        Retry Payment
      </Button>
    </div>
  </div>
)
