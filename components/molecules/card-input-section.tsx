"use client"

import { Input } from "@/components/atoms/input"

interface CardInputSectionProps {
  cardNumber: string
  expiry: string
  cvc: string
  errors: { cardNumber?: string; expiry?: string; cvc?: string }
  onChange: (field: string, value: string) => void
}

export const CardInputSection = ({ cardNumber, expiry, cvc, errors, onChange }: CardInputSectionProps) => (
  <div className="space-y-4">
    <h2 className="text-lg font-semibold text-foreground">Card Details</h2>
    <Input
      label="Card Number"
      id="cardNumber"
      value={cardNumber}
      onChange={(e) => onChange("cardNumber", e.target.value.replace(/\s/g, "").slice(0, 16))}
      placeholder="1111 2222 3333 4444"
      error={errors.cardNumber}
      maxLength={19}
    />
    <div className="grid grid-cols-2 gap-4">
      <Input
        label="Expiry (MM/YY)"
        id="expiry"
        value={expiry}
        onChange={(e) => onChange("expiry", e.target.value.slice(0, 5))}
        placeholder="12/34"
        error={errors.expiry}
        maxLength={5}
      />
      <Input
        label="CVC"
        id="cvc"
        value={cvc}
        onChange={(e) => onChange("cvc", e.target.value.slice(0, 3))}
        placeholder="123"
        error={errors.cvc}
        maxLength={3}
        type="password"
      />
    </div>
  </div>
)
