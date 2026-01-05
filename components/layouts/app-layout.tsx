"use client"

import type React from "react"

import { useState } from "react"
import { Sidebar } from "@/components/molecules/sidebar"
import { Header } from "@/components/molecules/header"

interface AppLayoutProps {
  children: React.ReactNode
  currentPage: string
  onPageChange: (page: any) => void
  onLogout: () => void
}

export function AppLayout({ children, currentPage, onPageChange, onLogout }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        isOpen={sidebarOpen}
        currentPage={currentPage}
        onPageChange={onPageChange}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onLogout={onLogout} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
