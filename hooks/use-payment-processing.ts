"use client"

import { useState, useCallback } from "react"
import { processPayment, validatePayment, type PaymentRequest, type PaymentResponse } from "@/lib/services/payment-service"

interface UsePaymentProcessingState {
  isLoading: boolean
  error: string | null
  response: PaymentResponse | null
}

/**
 * Custom hook for payment processing
 * 
 * Handles:
 * - Payment validation
 * - Processing with loading state
 * - Error handling
 * - Response management
 * 
 * Usage:
 * ```
 * const { isLoading, error, response, processPaymentRequest, resetState } = usePaymentProcessing()
 * 
 * const handlePayment = async () => {
 *   const result = await processPaymentRequest(paymentRequest)
 *   if (result.success) {
 *     // Handle success
 *   }
 * }
 * ```
 */
export function usePaymentProcessing() {
  const [state, setState] = useState<UsePaymentProcessingState>({
    isLoading: false,
    error: null,
    response: null,
  })

  /**
   * Process a payment request
   * Handles validation, API call, and state management
   */
  const processPaymentRequest = useCallback(async (request: PaymentRequest) => {
    setState({ isLoading: true, error: null, response: null })

    try {
      // Validate payment
      const validation = validatePayment(request)
      if (!validation.isValid) {
        const error = validation.errors[0] || "Payment validation failed"
        setState({ isLoading: false, error, response: null })
        return { success: false, error }
      }

      // Process payment
      const response = await processPayment(request)

      setState({ isLoading: false, error: null, response })

      return response
    } catch (err) {
      const error = err instanceof Error ? err.message : "An unexpected error occurred"
      setState({ isLoading: false, error, response: null })
      return { success: false, error }
    }
  }, [])

  /**
   * Reset the payment state
   */
  const resetState = useCallback(() => {
    setState({ isLoading: false, error: null, response: null })
  }, [])

  return {
    ...state,
    processPaymentRequest,
    resetState,
  }
}
