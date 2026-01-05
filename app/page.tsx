"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layouts/app-layout"
import { Dashboard } from "@/components/pages/dashboard"
import { PaymentMethods } from "@/components/pages/payment-methods"
import { PaymentFlow } from "@/components/pages/payment-flow"
import { TransactionHistory } from "@/components/pages/transaction-history"
import { Login } from "@/components/pages/login"
import { Register } from "@/components/pages/register"
import { Profile } from "@/components/pages/profile"

type PageState = "login" | "register" | "dashboard" | "methods" | "payment" | "history" | "profile"

export default function Home() {
  const [currentPage, setCurrentPage] = useState<PageState>("login")
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLogin = () => {
    setIsAuthenticated(true)
    setCurrentPage("dashboard")
  }

  const handleRegister = () => {
    setIsAuthenticated(true)
    setCurrentPage("dashboard")
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setCurrentPage("login")
  }

  if (!isAuthenticated) {
    if (currentPage === "register") {
      return <Register onRegister={handleRegister} onBackToLogin={() => setCurrentPage("login")} />
    }
    return <Login onLogin={handleLogin} onNavigateToRegister={() => setCurrentPage("register")} />
  }

  return (
    <AppLayout currentPage={currentPage} onPageChange={setCurrentPage} onLogout={handleLogout}>
      {currentPage === "dashboard" && <Dashboard onNavigate={setCurrentPage} />}
      {currentPage === "methods" && <PaymentMethods onNavigate={setCurrentPage} />}
      {currentPage === "payment" && <PaymentFlow onNavigate={setCurrentPage} />}
      {currentPage === "history" && <TransactionHistory onNavigate={setCurrentPage} />}
      {currentPage === "profile" && <Profile onLogout={handleLogout} />}
    </AppLayout>
  )
}
