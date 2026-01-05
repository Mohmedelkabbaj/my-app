import Link from "next/link"
import { Button } from "@/components/atoms/button"

interface PaymentSuccessPageProps {
  amount: number
}

export const PaymentSuccessPage = ({ amount }: PaymentSuccessPageProps) => (
  <div className="min-h-screen bg-background flex items-center justify-center p-4">
    <div className="text-center max-w-md">
      <div className="text-6xl mb-4">✓</div>
      <h1 className="text-3xl font-bold text-foreground mb-2">Payment Successful</h1>
      <p className="text-muted-foreground mb-6">Your payment has been processed successfully</p>
      <div className="bg-card border border-border rounded-lg p-6 mb-8">
        <p className="text-sm text-muted-foreground mb-2">Amount Paid</p>
        <p className="text-3xl font-bold text-primary">{amount.toFixed(2)} MAD</p>
      </div>
      <Link href="/">
        <Button size="lg" className="w-full">
          Return to Home
        </Button>
      </Link>
    </div>
  </div>
)
