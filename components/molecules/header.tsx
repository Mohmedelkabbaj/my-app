"use client"

import { Bell, LogOut, Menu, Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/providers/theme-provider"

interface HeaderProps {
  onLogout: () => void
  onToggleSidebar: () => void
}

export function Header({ onLogout, onToggleSidebar }: HeaderProps) {
  const { theme, toggleTheme } = useTheme()
  return (
    <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button onClick={onToggleSidebar} className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors">
          <Menu size={20} />
        </button>
        <h2 className="text-xl font-bold text-foreground">Payment System</h2>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={toggleTheme}
          className="p-2 hover:bg-secondary rounded-lg transition-colors"
          title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? (
            <Moon size={20} className="text-foreground" />
          ) : (
            <Sun size={20} className="text-foreground" />
          )}
        </button>

        <button className="p-2 hover:bg-secondary rounded-lg transition-colors relative">
          <Bell size={20} className="text-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-border">
          <div className="flex flex-col items-end">
            <p className="text-sm font-medium text-foreground">AAA BBB</p>
            <p className="text-xs text-muted-foreground">Premium User</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
            AB
          </div>
          <button onClick={onLogout} className="p-2 hover:bg-secondary rounded-lg transition-colors" title="Logout">
            <LogOut size={16} className="text-foreground" />
          </button>
        </div>
      </div>
    </header>
  )
}
