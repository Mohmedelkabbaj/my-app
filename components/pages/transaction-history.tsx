"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/atoms/button"
import { Input } from "@/components/ui/input"
import { TransactionRow } from "@/components/molecules/transaction-row"
import { Search, Filter, Download } from "lucide-react"

interface TransactionHistoryProps {
  onNavigate: (page: string) => void
}

interface Transaction {
  id: string
  type: "incoming" | "outgoing"
  description: string
  amount: number
  status: "success" | "pending" | "failed"
  date: string
  method: string
}

const mockTransactions: Transaction[] = [
  {
    id: "TX-000111222",
    type: "outgoing",
    description: "Payment to Store XYZ",
    amount: 120,
    status: "success",
    date: "2025-01-20",
    method: "Card",
  },
  {
    id: "TX-000111223",
    type: "incoming",
    description: "Refund from Vendor",
    amount: 50,
    status: "success",
    date: "2025-01-19",
    method: "Bank Transfer",
  },
  {
    id: "TX-000111224",
    type: "outgoing",
    description: "Subscription Payment",
    amount: 99.99,
    status: "pending",
    date: "2025-01-18",
    method: "Wallet",
  },
  {
    id: "TX-000111225",
    type: "outgoing",
    description: "Online Purchase",
    amount: 245.5,
    status: "failed",
    date: "2025-01-17",
    method: "Card",
  },
  {
    id: "TX-000111226",
    type: "incoming",
    description: "Salary Deposit",
    amount: 3000,
    status: "success",
    date: "2025-01-15",
    method: "Bank Transfer",
  },
  {
    id: "TX-000111227",
    type: "outgoing",
    description: "Bill Payment",
    amount: 150,
    status: "success",
    date: "2025-01-14",
    method: "Bank Transfer",
  },
  {
    id: "TX-000111228",
    type: "outgoing",
    description: "Restaurant Payment",
    amount: 85.75,
    status: "success",
    date: "2025-01-13",
    method: "Card",
  },
  {
    id: "TX-000111229",
    type: "incoming",
    description: "Bonus Credit",
    amount: 25,
    status: "success",
    date: "2025-01-12",
    method: "Wallet",
  },
]

export function TransactionHistory({ onNavigate }: TransactionHistoryProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "success" | "pending" | "failed">("all")
  const [filterMethod, setFilterMethod] = useState<string>("all")

  const filteredTransactions = mockTransactions.filter((tx) => {
    const matchesSearch = tx.description.toLowerCase().includes(searchTerm.toLowerCase()) || tx.id.includes(searchTerm)
    const matchesStatus = filterStatus === "all" || tx.status === filterStatus
    const matchesMethod = filterMethod === "all" || tx.method === filterMethod

    return matchesSearch && matchesStatus && matchesMethod
  })

  const methods = ["all", ...new Set(mockTransactions.map((tx) => tx.method))]

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-1">Transaction History</h1>
        <p className="text-muted-foreground">View and manage all your transactions</p>
      </div>

      {/* Search and Filter */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-muted-foreground" size={20} />
          <Input
            placeholder="Search by description or transaction ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setFilterStatus("all")}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
              filterStatus === "all"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterStatus("success")}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
              filterStatus === "success"
                ? "bg-green-600 text-white"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            Success
          </button>
          <button
            onClick={() => setFilterStatus("pending")}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
              filterStatus === "pending"
                ? "bg-yellow-600 text-white"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilterStatus("failed")}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
              filterStatus === "failed"
                ? "bg-red-600 text-white"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            Failed
          </button>
        </div>

        <div className="flex gap-2">
          <div className="flex-1">
            <select
              value={filterMethod}
              onChange={(e) => setFilterMethod(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {methods.map((method) => (
                <option key={method} value={method}>
                  {method === "all" ? "All Methods" : method}
                </option>
              ))}
            </select>
          </div>
          <Button variant="secondary" className="gap-2">
            <Filter size={20} />
            More Filters
          </Button>
          <Button variant="secondary" className="gap-2">
            <Download size={20} />
            Export
          </Button>
        </div>
      </div>

      {/* Transactions List */}
      <Card className="overflow-hidden">
        {filteredTransactions.length > 0 ? (
          <div className="divide-y divide-border">
            {filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                onClick={() => onNavigate("details")}
                className="cursor-pointer hover:bg-secondary/30 transition-colors"
              >
                <TransactionRow {...transaction} />
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <p className="text-muted-foreground">No transactions found</p>
          </div>
        )}
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredTransactions.length} of {mockTransactions.length} transactions
        </p>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm">
            Previous
          </Button>
          <Button variant="secondary" size="sm">
            1
          </Button>
          <Button variant="secondary" size="sm">
            2
          </Button>
          <Button variant="secondary" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
