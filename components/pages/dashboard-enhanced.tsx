"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/atoms/button"
import { BalanceCard } from "@/components/molecules/balance-card"
import { TransactionRow } from "@/components/molecules/transaction-row"
import { QuickStats } from "@/components/molecules/quick-stats"
import { TrendingUp, Eye, Send } from "lucide-react"
import { motion } from "framer-motion"

// Define variants for animations
const pageVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const slideUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const listContainerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const listItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

interface DashboardProps {
  onNavigate: (page: string) => void
}

// Mock data
const mockTransactions = [
  {
    id: "TX-000111222",
    type: "outgoing" as const,
    description: "Payment to Store XYZ",
    amount: 120,
    status: "success" as const,
    date: "2025-01-20",
    method: "Card",
  },
  {
    id: "TX-000111223",
    type: "incoming" as const,
    description: "Refund from Vendor",
    amount: 50,
    status: "success" as const,
    date: "2025-01-19",
    method: "Bank Transfer",
  },
  {
    id: "TX-000111224",
    type: "outgoing" as const,
    description: "Subscription Payment",
    amount: 99.99,
    status: "pending" as const,
    date: "2025-01-18",
    method: "Wallet",
  },
  {
    id: "TX-000111225",
    type: "outgoing" as const,
    description: "Online Purchase",
    amount: 245.5,
    status: "failed" as const,
    date: "2025-01-17",
    method: "Card",
  },
  {
    id: "TX-000111226",
    type: "incoming" as const,
    description: "Salary Deposit",
    amount: 3000,
    status: "success" as const,
    date: "2025-01-15",
    method: "Bank Transfer",
  },
]

export function DashboardEnhanced({ onNavigate }: DashboardProps) {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto animate-slide-in">
      {/* Header with animation */}
      <div className="animate-slide-in" style={{ animationDelay: "0.1s" }}>
        <h1 className="text-4xl font-bold text-foreground mb-2">Welcome back, AAA</h1>
        <p className="text-lg text-muted-foreground">Here's your financial overview</p>
      </div>

      {/* Balance Card with stagger */}
      <div className="animate-slide-in" style={{ animationDelay: "0.2s" }}>
        <BalanceCard balance={520.0} onPayClick={() => onNavigate("payment")} />
      </div>

      {/* Quick Stats with animation */}
      <div className="animate-slide-in" style={{ animationDelay: "0.3s" }}>
        <QuickStats
          stats={[
            {
              label: "Total Spending",
              value: "1,285.00 MAD",
              icon: <Send size={20} />,
            },
            {
              label: "This Month",
              value: "18 Transactions",
              icon: <TrendingUp size={20} />,
            },
            {
              label: "Available Balance",
              value: "520.00 MAD",
              icon: <Eye size={20} />,
            },
          ]}
        />
      </div>

      {/* Recent Transactions Section */}
      <div className="animate-slide-in" style={{ animationDelay: "0.4s" }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-foreground">Recent Transactions</h2>
          <button
            onClick={() => onNavigate("history")}
            className="text-primary hover:text-primary/80 text-sm font-semibold transition-colors hover:scale-105"
          >
            View All →
          </button>
        </div>

        <Card className="overflow-hidden shadow-lg dark:shadow-xl">
          <div className="divide-y divide-border">
            {mockTransactions.map((transaction) => (
              <div key={transaction.id} className="hover:bg-secondary/30 transition-colors">
                <TransactionRow {...transaction} />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Actions with staggered animation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-slide-in" style={{ animationDelay: "0.5s" }}>
        <div className="hover:scale-105 transition-transform duration-200">
          <Button onClick={() => onNavigate("payment")} size="lg" className="w-full">
            Send Money
          </Button>
        </div>

        <div className="hover:scale-105 transition-transform duration-200">
          <Button onClick={() => onNavigate("methods")} variant="secondary" size="lg" className="w-full">
            Payment Methods
          </Button>
        </div>

        <div className="hover:scale-105 transition-transform duration-200">
          <Button onClick={() => onNavigate("history")} variant="secondary" size="lg" className="w-full">
            Transaction History
          </Button>
        </div>
      </div>
    </div>
  )
}
