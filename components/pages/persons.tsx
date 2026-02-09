"use client"

import type React from "react"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/atoms/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Trash2, Edit2 } from "lucide-react"
import { formatCurrency } from "@/lib/currency"

interface PersonsProps {
  onNavigate: (page: string) => void
}

interface Person {
  id: string
  fullName: string
  email: string
  phone: string
  role: string
  notes?: string
  createdAt: string
}

type Tab = "add" | "list"

export function Persons({ onNavigate }: PersonsProps) {
  const [activeTab, setActiveTab] = useState<Tab>("list")
  const [persons, setPersons] = useState<Person[]>([
    {
      id: "P-001",
      fullName: "AAA BBB",
      email: "aaaa@bbbb.com",
      phone: "+212 11111111",
      role: "Administrator",
      notes: "System administrator",
      createdAt: "2025-01-2",
    },
    {
      id: "P-002",
      fullName: "XXXXXX",
      email: "xxxxx@example.com",
      phone: "+212 22222222",
      role: "Manager",
      notes: "manager",
      createdAt: "2025-01-1",
    },
  ])

  const [isLoading, setIsLoading] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "User",
    notes: "",
  })

  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  // Validate form
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {}

    if (!formData.fullName.trim()) {
      errors.fullName = "Full name is required"
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address"
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required"
    } else if (!/^\+?[0-9\s\-()]{8,}$/.test(formData.phone)) {
      errors.phone = "Please enter a valid phone number"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      if (editingId) {
        // Update existing person
        setPersons(
          persons.map((p) =>
            p.id === editingId
              ? {
                  ...p,
                  fullName: formData.fullName,
                  email: formData.email,
                  phone: formData.phone,
                  role: formData.role,
                  notes: formData.notes,
                }
              : p,
          ),
        )
        setEditingId(null)
      } else {
        // Add new person
        const newPerson: Person = {
          id: `P-${(persons.length + 1).toString().padStart(3, "0")}`,
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          role: formData.role,
          notes: formData.notes,
          createdAt: new Date().toISOString().split("T")[0],
        }
        setPersons([...persons, newPerson])
      }

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        role: "User",
        notes: "",
      })
      setFormErrors({})
      setIsLoading(false)
      setActiveTab("list")
    }, 1000)
  }

  // Handle edit
  const handleEdit = (person: Person) => {
    setFormData({
      fullName: person.fullName,
      email: person.email,
      phone: person.phone,
      role: person.role,
      notes: person.notes || "",
    })
    setEditingId(person.id)
    setActiveTab("add")
  }

  // Handle delete
  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this person?")) {
      setPersons(persons.filter((p) => p.id !== id))
    }
  }

  const FormField: React.FC<{
    label: string
    error?: string
    children: React.ReactNode
  }> = ({ label, error, children }) => (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-foreground">{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-1">Person Management</h1>
        <p className="text-muted-foreground">Manage team members and contacts</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 border-b border-border">
        <button
          onClick={() => setActiveTab("list")}
          className={`px-4 py-3 font-medium transition-all duration-300 border-b-2 ${
            activeTab === "list"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Person List
        </button>
        <button
          onClick={() => setActiveTab("add")}
          className={`px-4 py-3 font-medium transition-all duration-300 border-b-2 ${
            activeTab === "add"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          {editingId ? "Edit Person" : "Add Person"}
        </button>
      </div>

      {/* Tab Content - Person List */}
      {activeTab === "list" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {persons.length === 0 ? (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground mb-4">No persons added yet</p>
              <Button onClick={() => setActiveTab("add")} className="gap-2">
                <Plus size={20} />
                Add First Person
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {persons.map((person, idx) => (
                <Card
                  key={person.id}
                  className="p-4 hover:shadow-lg transition-all duration-200 hover:border-primary/50 cursor-pointer"
                  style={{
                    animation: `slideIn 0.3s ease-out ${idx * 50}ms backwards`,
                  }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground text-lg">{person.fullName}</h3>
                      <p className="text-xs text-primary font-medium">{person.role}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(person)}
                        className="p-2 hover:bg-secondary rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                        title="Edit"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(person.id)}
                        className="p-2 hover:bg-destructive/10 rounded-lg transition-colors text-muted-foreground hover:text-destructive"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">Email:</span>
                      <span className="text-foreground font-medium">{person.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">Phone:</span>
                      <span className="text-foreground font-medium">{person.phone}</span>
                    </div>
                    {person.notes && (
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Notes:</span>
                        <span className="text-foreground">{person.notes}</span>
                      </div>
                    )}
                    <div className="text-xs text-muted-foreground pt-2">
                      Added: {person.createdAt}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {persons.length > 0 && (
            <Button onClick={() => setActiveTab("add")} className="w-full gap-2">
              <Plus size={20} />
              Add Another Person
            </Button>
          )}
        </div>
      )}

      {/* Tab Content - Add/Edit Person Form */}
      {activeTab === "add" && (
        <Card className="p-6 animate-in fade-in duration-300">
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormField label="Full Name" error={formErrors.fullName}>
              <Input
                type="text"
                placeholder="e.g., AAA BBB"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                className={formErrors.fullName ? "border-destructive" : ""}
              />
            </FormField>

            <FormField label="Email" error={formErrors.email}>
              <Input
                type="email"
                placeholder="e.g., aaaa@bbbb.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={formErrors.email ? "border-destructive" : ""}
              />
            </FormField>

            <FormField label="Phone Number" error={formErrors.phone}>
              <Input
                type="tel"
                placeholder="e.g., +212 11111111"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={formErrors.phone ? "border-destructive" : ""}
              />
            </FormField>

            <FormField label="Role / Type">
              <select
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
              >
                <option value="User">User</option>
                <option value="Manager">Manager</option>
                <option value="Administrator">Administrator</option>
                <option value="Support">Support</option>
                <option value="Other">Other</option>
              </select>
            </FormField>

            <FormField label="Notes (Optional)">
              <textarea
                placeholder="Add any notes about this person..."
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground resize-none"
              />
            </FormField>

            <div className="flex gap-3 pt-4">
              {editingId && (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setEditingId(null)
                    setFormData({
                      fullName: "",
                      email: "",
                      phone: "",
                      role: "User",
                      notes: "",
                    })
                    setFormErrors({})
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
              )}
              <Button
                type="submit"
                isLoading={isLoading}
                className="flex-1"
              >
                {editingId ? "Update Person" : "Add Person"}
              </Button>
            </div>
          </form>
        </Card>
      )}
    </div>
  )
}
