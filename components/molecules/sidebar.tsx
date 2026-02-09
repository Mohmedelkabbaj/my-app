"use client"

import { Wallet, CreditCard, History, Settings, LogOut, Menu, X, Users } from "lucide-react"

interface SidebarProps {
  isOpen: boolean
  currentPage: string
  onPageChange: (page: string) => void
  onToggle: () => void
}

export function Sidebar({ isOpen, currentPage, onPageChange, onToggle }: SidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Wallet },
    { id: "methods", label: "Payment Methods", icon: CreditCard },
    { id: "history", label: "Transaction History", icon: History },
    { id: "persons", label: "Person Management", icon: Users },
    { id: "profile", label: "Profile", icon: Settings },
  ]

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={onToggle}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-primary text-primary-foreground"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? "w-64" : "w-0"
        } bg-sidebar border-r border-sidebar-border transition-all duration-300 overflow-hidden flex flex-col md:w-64`}
      >
        <div className="p-6 border-b border-sidebar-border">
          <h1 className="text-2xl font-bold text-sidebar-foreground">PayFlow</h1>
          <p className="text-sm text-sidebar-accent-foreground mt-1">Payment System</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = currentPage === item.id
            return (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent"
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors">
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  )
}
