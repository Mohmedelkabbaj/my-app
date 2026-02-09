/**
 * Moroccan Payment Methods Configuration
 * 
 * This file centralizes all payment method definitions.
 * It's structured for easy API integration and method management.
 * Future: This can be replaced with API calls to /api/payment-methods
 */

export type PaymentMethodType = 
  | "card" 
  | "bank" 
  | "wallet" 
  | "cod" 
  | "app-balance"
  | "cash-plus"
  | "cih-bank"
  | "attijariwafa-bank"

export interface PaymentMethod {
  id: string
  type: PaymentMethodType
  label: string
  description: string
  icon: string
  instructions: string[]
  isAvailable: boolean
  isPopular: boolean
  fees?: {
    percentage: number
    fixed: number
  }
}

/**
 * Available payment methods in Morocco
 * Ordered by popularity/frequency of use
 * TODO: Replace with API endpoint: GET /api/payment-methods
 */
export const PAYMENT_METHODS: Record<string, PaymentMethod> = {
  "card-visa-mastercard": {
    id: "card-visa-mastercard",
    type: "card",
    label: "Debit Card",
    description: "Visa or Mastercard",
    icon: "💳",
    isPopular: true,
    isAvailable: true,
    instructions: [
      "Enter your card number",
      "Provide expiration date and CVV",
      "Complete 3D Secure verification",
      "Transaction completed",
    ],
    fees: {
      percentage: 1.5,
      fixed: 0,
    },
  },

  "bank-transfer": {
    id: "bank-transfer",
    type: "bank",
    label: "Bank Transfer",
    description: "Virement bancaire - Direct bank transfer",
    icon: "🏦",
    isPopular: true,
    isAvailable: true,
    instructions: [
      "Provide your IBAN (starts with MA)",
      "Confirm bank details",
      "Transfer reference will be provided",
      "Bank processing takes 1-2 business days",
    ],
    fees: {
      percentage: 0,
      fixed: 5, // Fixed fee in MAD
    },
  },

  "wallet-inwi-orange": {
    id: "wallet-inwi-orange",
    type: "wallet",
    label: "Mobile Wallet",
    description: "Inwi Money / Orange Money",
    icon: "📱",
    isPopular: true,
    isAvailable: true,
    instructions: [
      "Enter your phone number",
      "Select your provider (Inwi/Orange)",
      "Confirm the USSD prompt on your phone",
      "Enter the verification code",
    ],
    fees: {
      percentage: 1,
      fixed: 0,
    },
  },

  "cash-plus": {
    id: "cash-plus",
    type: "cash-plus",
    label: "Cash Plus",
    description: "Moroccan cash payment network",
    icon: "💵",
    isPopular: true,
    isAvailable: true,
    instructions: [
      "Generate a payment voucher",
      "Visit any Cash Plus partner location",
      "Present the voucher and complete payment",
      "Receive confirmation receipt",
    ],
    fees: {
      percentage: 2,
      fixed: 0,
    },
  },

  "cih-bank": {
    id: "cih-bank",
    type: "cih-bank",
    label: "CIH Bank Direct",
    description: "Direct CIH Bank account transfer",
    icon: "🏛️",
    isPopular: false,
    isAvailable: true,
    instructions: [
      "Login with your CIH Bank credentials",
      "Select 'Make Payment' option",
      "Enter recipient and amount",
      "Confirm with your CIH security method",
    ],
    fees: {
      percentage: 0,
      fixed: 0,
    },
  },

  "attijariwafa-bank": {
    id: "attijariwafa-bank",
    type: "attijariwafa-bank",
    label: "Attijariwafa Bank Direct",
    description: "Direct Attijariwafa Bank account transfer",
    icon: "🏛️",
    isPopular: false,
    isAvailable: true,
    instructions: [
      "Login with your Attijariwafa Bank credentials",
      "Select 'Make Payment' option",
      "Enter recipient and amount",
      "Confirm with your bank security method",
    ],
    fees: {
      percentage: 0,
      fixed: 0,
    },
  },

  "cod": {
    id: "cod",
    type: "cod",
    label: "Cash on Delivery",
    description: "Pay when you receive",
    icon: "📦",
    isPopular: true,
    isAvailable: true,
    instructions: [
      "Confirm your delivery address",
      "Select 'Cash on Delivery' option",
      "Payment will be collected at delivery",
      "Keep your delivery receipt",
    ],
    fees: {
      percentage: 0,
      fixed: 20, // Fixed fee in MAD
    },
  },

  "app-balance": {
    id: "app-balance",
    type: "app-balance",
    label: "App Balance",
    description: "Use your in-app wallet",
    icon: "💰",
    isPopular: true,
    isAvailable: true,
    instructions: [
      "Check your available balance",
      "Confirm the transaction amount",
      "Enter your app PIN or biometric",
      "Transaction completed instantly",
    ],
    fees: {
      percentage: 0,
      fixed: 0,
    },
  },
}

/**
 * Get popular payment methods (for homepage/quick access)
 */
export function getPopularMethods(): PaymentMethod[] {
  return Object.values(PAYMENT_METHODS).filter((method) => method.isPopular && method.isAvailable)
}

/**
 * Get all available payment methods
 */
export function getAvailableMethods(): PaymentMethod[] {
  return Object.values(PAYMENT_METHODS).filter((method) => method.isAvailable)
}

/**
 * Get method by ID
 * TODO: Replace with API: GET /api/payment-methods/:id
 */
export function getPaymentMethod(id: string): PaymentMethod | undefined {
  return PAYMENT_METHODS[id]
}

/**
 * Calculate payment fees
 * @param amount - Amount in MAD
 * @param methodId - Payment method ID
 * @returns Object with breakdown: base amount, fees, total
 */
export function calculatePaymentFees(amount: number, methodId: string) {
  const method = getPaymentMethod(methodId)
  if (!method || !method.fees) {
    return {
      baseAmount: amount,
      percentageFee: 0,
      fixedFee: 0,
      total: amount,
    }
  }

  const percentageFee = (amount * method.fees.percentage) / 100
  const fixedFee = method.fees.fixed || 0
  const total = amount + percentageFee + fixedFee

  return {
    baseAmount: amount,
    percentageFee: Math.round(percentageFee * 100) / 100,
    fixedFee,
    total: Math.round(total * 100) / 100,
  }
}
