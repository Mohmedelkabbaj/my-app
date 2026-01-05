import { Spinner } from "@/components/atoms/spinner"

export const PaymentLoadingPage = () => (
  <div className="min-h-screen bg-background flex items-center justify-center p-4">
    <div className="text-center">
      <div className="flex justify-center mb-4">
        <Spinner />
      </div>
      <h1 className="text-2xl font-bold text-foreground mb-2">Processing Payment</h1>
      <p className="text-muted-foreground">Please wait while we process your payment...</p>
    </div>
  </div>
)
