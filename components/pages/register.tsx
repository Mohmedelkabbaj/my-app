"use client"

import type React from "react"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/atoms/button"
import { Input } from "@/components/ui/input"
import { FormField } from "@/components/molecules/form-field"
import { Smartphone, Eye, EyeOff, Check, X } from "lucide-react"

interface RegisterProps {
  onRegister: () => void
  onBackToLogin: () => void
}

export function Register({ onRegister, onBackToLogin }: RegisterProps) {
  const [formData, setFormData] = useState({
    fullName: "AAA BBB",
    email: "aaaa@bbbb.com",
    phone: "+212 11111111",
    password: "password",
    confirmPassword: "password",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(true)

  // Password validation
  const hasMinLength = formData.password.length >= 8
  const hasUpperCase = /[A-Z]/.test(formData.password)
  const hasLowerCase = /[a-z]/.test(formData.password)
  const hasNumber = /[0-9]/.test(formData.password)
  const passwordsMatch = formData.password === formData.confirmPassword && formData.password.length > 0

  const isFormValid =
    formData.fullName &&
    formData.email &&
    formData.phone &&
    hasMinLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumber &&
    passwordsMatch &&
    agreedToTerms

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid) return

    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      onRegister()
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="p-8">
          <div className="flex justify-center mb-8">
            <div className="p-3 rounded-lg bg-primary/10">
              <Smartphone size={32} className="text-primary" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-center text-foreground mb-2">Create Account</h1>
          <p className="text-center text-muted-foreground mb-8">Join PayFlow and start managing your payments</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <FormField label="Full Name" required>
              <Input
                type="text"
                placeholder="AAA BBB"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
              />
            </FormField>

            {/* Email */}
            <FormField label="Email Address" required>
              <Input
                type="email"
                placeholder="aaaa@bbbb.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </FormField>

            {/* Phone */}
            <FormField label="Phone Number" required>
              <Input
                type="tel"
                placeholder="+212 11111111"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </FormField>

            {/* Password */}
            <FormField label="Password" required>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </FormField>

            {/* Password Requirements */}
            {formData.password && (
              <div className="bg-secondary p-4 rounded-lg space-y-2">
                <p className="text-sm font-medium text-foreground">Password Requirements:</p>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2">
                    {hasMinLength ? (
                      <Check size={16} className="text-green-600" />
                    ) : (
                      <X size={16} className="text-muted-foreground" />
                    )}
                    <span className={hasMinLength ? "text-foreground" : "text-muted-foreground"}>
                      At least 8 characters
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {hasUpperCase ? (
                      <Check size={16} className="text-green-600" />
                    ) : (
                      <X size={16} className="text-muted-foreground" />
                    )}
                    <span className={hasUpperCase ? "text-foreground" : "text-muted-foreground"}>
                      One uppercase letter
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {hasLowerCase ? (
                      <Check size={16} className="text-green-600" />
                    ) : (
                      <X size={16} className="text-muted-foreground" />
                    )}
                    <span className={hasLowerCase ? "text-foreground" : "text-muted-foreground"}>
                      One lowercase letter
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {hasNumber ? (
                      <Check size={16} className="text-green-600" />
                    ) : (
                      <X size={16} className="text-muted-foreground" />
                    )}
                    <span className={hasNumber ? "text-foreground" : "text-muted-foreground"}>One number</span>
                  </div>
                </div>
              </div>
            )}

            {/* Confirm Password */}
            <FormField label="Confirm Password" required>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                />
                {formData.confirmPassword && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {passwordsMatch ? (
                      <Check size={18} className="text-green-600" />
                    ) : (
                      <X size={18} className="text-destructive" />
                    )}
                  </div>
                )}
              </div>
            </FormField>

            {/* Terms & Conditions */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="rounded mt-1"
                required
              />
              <span className="text-sm text-muted-foreground">
                I agree to the{" "}
                <a href="#" className="text-primary hover:underline font-medium">
                  Terms & Conditions
                </a>{" "}
                and{" "}
                <a href="#" className="text-primary hover:underline font-medium">
                  Privacy Policy
                </a>
              </span>
            </label>

            <Button type="submit" size="lg" className="w-full" isLoading={isLoading} disabled={!isFormValid}>
              Create Account
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <button onClick={onBackToLogin} className="text-primary hover:underline font-medium">
                Sign in
              </button>
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
