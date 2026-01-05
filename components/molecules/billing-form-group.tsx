"use client"

import { Input } from "@/components/atoms/input"

interface BillingFormGroupProps {
  name: string
  email: string
  phone: string
  errors: { name?: string; email?: string; phone?: string }
  onChange: (field: string, value: string) => void
}

export const BillingFormGroup = ({ name, email, phone, errors, onChange }: BillingFormGroupProps) => (
  <div className="space-y-4">
    <h2 className="text-lg font-semibold text-foreground">Billing Information</h2>
    <Input
      label="Full Name"
      id="name"
      value={name}
      onChange={(e) => onChange("name", e.target.value)}
      placeholder="AAA BBB"
      error={errors.name}
    />
    <Input
      label="Email"
      id="email"
      type="email"
      value={email}
      onChange={(e) => onChange("email", e.target.value)}
      placeholder="aaaa@bbbb.com"
      error={errors.email}
    />
    <Input
      label="Phone"
      id="phone"
      type="tel"
      value={phone}
      onChange={(e) => onChange("phone", e.target.value)}
      placeholder="+212 11111111"
      error={errors.phone}
    />
  </div>
)
