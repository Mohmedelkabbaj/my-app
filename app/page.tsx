"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layouts/app-layout"
import { DashboardEnhanced } from "@/components/pages/dashboard-enhanced" // Fixed import for DashboardEnhanced
import { PaymentMethods } from "@/components/pages/payment-methods"
import { PaymentFlow } from "@/components/pages/payment-flow"
import { TransactionHistory } from "@/components/pages/transaction-history"
import { Login } from "@/components/pages/login"
import { Register } from "@/components/pages/register"
import { Profile } from "@/components/pages/profile"
import { SignUpLoading } from "@/components/pages/signup-loading"
import { Persons } from "@/components/pages/persons"

type PageState = "login" | "register" | "signup-loading" | "dashboard" | "methods" | "payment" | "history" | "profile" | "persons"

export default function Home() {
  const [currentPage, setCurrentPage] = useState<PageState>("login")
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  /**
   * Handle login - transitions directly to dashboard
   */
  const handleLogin = () => {
    setIsAuthenticated(true)
    setCurrentPage("dashboard")
  }

  /**
   * Handle registration - shows loading page first
   * The loading page auto-redirects to dashboard
   */
  const handleRegister = () => {
    setIsAuthenticated(true)
    setCurrentPage("signup-loading")
  }

  /**
   * Handle signup loading complete - transition to dashboard
   */
  const handleLoadingComplete = () => {
    setCurrentPage("dashboard")
  }

  /**
   * Handle logout - clear auth and return to login
   */
  const handleLogout = () => {
    setIsAuthenticated(false)
    setCurrentPage("login")
  }

  // Render auth pages when not authenticated
  if (!isAuthenticated) {
    if (currentPage === "register") {
      return <Register onRegister={handleRegister} onBackToLogin={() => setCurrentPage("login")} />
    }
    return <Login onLogin={handleLogin} onNavigateToRegister={() => setCurrentPage("register")} />
  }

  // Show loading page after signup
  if (currentPage === "signup-loading") {
    return <SignUpLoading onComplete={handleLoadingComplete} />
  }

  // Render main app with page transitions
  return (
    <AppLayout currentPage={currentPage} onPageChange={setCurrentPage} onLogout={handleLogout}>
      {currentPage === "dashboard" && <DashboardEnhanced onNavigate={setCurrentPage} />}
      {currentPage === "methods" && <PaymentMethods onNavigate={setCurrentPage} />}
      {currentPage === "payment" && <PaymentFlow onNavigate={setCurrentPage} />}
      {currentPage === "history" && <TransactionHistory onNavigate={setCurrentPage} />}
      {currentPage === "persons" && <Persons onNavigate={setCurrentPage} />}
      {currentPage === "profile" && <Profile onLogout={handleLogout} />}
    </AppLayout>
  )
}
