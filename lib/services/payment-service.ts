/**
 * Payment Service Layer
 * 
 * This service handles all payment-related logic, separated from UI components.
 * It's structured to be easily extended for API integration (REST/GraphQL).
 * 
 * Current: Mock implementation with local state
 * Future: Replace with actual API calls to:
 *   - POST /api/payments/process
 *   - POST /api/payments/validate
 *   - GET /api/payments/:id
 */

import { calculatePaymentFees, getPaymentMethod } from "@/lib/payment-methods"

// Type definitions for payment processing
export interface PaymentRequest {
  amount: number
  currency: string
  methodId: string
  description?: string
  metadata?: Record<string, unknown>
}

export interface PaymentResponse {
  success: boolean
  transactionId: string
  amount: number
  fee: number
  total: number
  timestamp: string
  status: "pending" | "completed" | "failed"
  message: string
}

export interface PaymentValidation {
  isValid: boolean
  errors: string[]
}

/**
 * Validates payment request before processing
 * TODO: Add server-side validation via API
 */
export function validatePayment(request: PaymentRequest): PaymentValidation {
  const errors: string[] = []

  // Validate amount
  if (request.amount <= 0) {
    errors.push("Amount must be greater than 0")
  }
  if (request.amount > 1000000) {
    // Max payment amount in MAD
    errors.push("Amount exceeds maximum limit of 1,000,000 MAD")
  }

  // Validate payment method exists
  const paymentMethod = getPaymentMethod(request.methodId)
  if (!paymentMethod) {
    errors.push("Invalid payment method")
  }
  if (paymentMethod && !paymentMethod.isAvailable) {
    errors.push("Selected payment method is not available")
  }

  // Validate currency (currently only MAD supported)
  if (request.currency !== "MAD") {
    errors.push("Only MAD currency is supported")
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

/**
 * Process a payment
 * 
 * Currently: Simulates payment processing with a delay
 * Future: Make actual API call: POST /api/payments/process
 * 
 * @param request - Payment request details
 * @returns Payment response with transaction details
 */
export async function processPayment(request: PaymentRequest): Promise<PaymentResponse> {
  // Validate before processing
  const validation = validatePayment(request)
  if (!validation.isValid) {
    return {
      success: false,
      transactionId: "",
      amount: request.amount,
      fee: 0,
      total: request.amount,
      timestamp: new Date().toISOString(),
      status: "failed",
      message: validation.errors[0] || "Payment validation failed",
    }
  }

  // Calculate fees
  const feeBreakdown = calculatePaymentFees(request.amount, request.methodId)

  // Generate transaction ID (local)
  // Future: This will come from the API response
  const transactionId = `TX-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

  // Simulate API processing delay (1-2 seconds)
  // Remove this in production when making real API calls
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Simulate occasional failures for testing (5% chance)
  const shouldFail = Math.random() < 0.05

  if (shouldFail) {
    return {
      success: false,
      transactionId,
      amount: request.amount,
      fee: feeBreakdown.percentageFee + feeBreakdown.fixedFee,
      total: feeBreakdown.total,
      timestamp: new Date().toISOString(),
      status: "failed",
      message: "Payment failed. Please try again or use a different payment method.",
    }
  }

  // Success response
  return {
    success: true,
    transactionId,
    amount: request.amount,
    fee: feeBreakdown.percentageFee + feeBreakdown.fixedFee,
    total: feeBreakdown.total,
    timestamp: new Date().toISOString(),
    status: "completed",
    message: `Payment of ${request.amount} MAD processed successfully`,
  }
}

/**
 * Get payment status by transaction ID
 * 
 * Future: Make API call: GET /api/payments/:transactionId
 */
export async function getPaymentStatus(transactionId: string) {
  // Mock implementation - replace with API call
  return {
    transactionId,
    status: "completed",
    timestamp: new Date().toISOString(),
  }
}

/**
 * Refund a payment
 * 
 * Future: Make API call: POST /api/payments/:transactionId/refund
 */
export async function refundPayment(transactionId: string, reason: string) {
  // Mock implementation - replace with API call
  console.log(`[Payment Service] Refund initiated for ${transactionId}. Reason: ${reason}`)

  return {
    success: true,
    originalTransactionId: transactionId,
    refundTransactionId: `RFD-${Date.now()}`,
    timestamp: new Date().toISOString(),
    message: "Refund processed successfully",
  }
}
