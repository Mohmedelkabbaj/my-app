"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/atoms/button"
import { Avatar } from "@/components/atoms/avatar"
import { Input } from "@/components/ui/input"
import { FormField } from "@/components/molecules/form-field"
import { Badge } from "@/components/atoms/badge"
import { Mail, Phone, MapPin, Shield, LogOut, Lock, Smartphone, Eye, EyeOff, Check, X } from "lucide-react"

interface ProfileProps {
  onLogout: () => void
}

export function Profile({ onLogout }: ProfileProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [profileData, setProfileData] = useState({
    fullName: "AAA BBB",
    email: "aaaa@bbbb.com",
    phone: "+212 11111111",
    address: "Street X, City Y",
  })
  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: "",
  })
  const [showPasswordForm, setShowPasswordForm] = useState(false)

  const handleSave = () => {
    setIsEditing(false)
    // Handle save logic
  }

  const handlePasswordChange = () => {
    if (passwordData.new === passwordData.confirm) {
      setPasswordData({ current: "", new: "", confirm: "" })
      setShowPasswordForm(false)
    }
  }

  const passwordMatch = passwordData.new && passwordData.confirm && passwordData.new === passwordData.confirm

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-1">Profile Settings</h1>
        <p className="text-muted-foreground">Manage your account information and security</p>
      </div>

      {/* Profile Header */}
      <Card className="p-6 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar size="lg" initials="AB" />
            <div>
              <h2 className="text-2xl font-bold text-foreground">{profileData.fullName}</h2>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="success">Premium Member</Badge>
                <span className="text-sm text-muted-foreground">Since Jan 2024</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Account Status</p>
            <p className="text-lg font-semibold text-green-600">Active</p>
          </div>
        </div>
      </Card>

      {/* Personal Information */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-foreground">Personal Information</h3>
            <p className="text-sm text-muted-foreground">Update your profile details</p>
          </div>
          <Button
            variant={isEditing ? "danger" : "secondary"}
            size="sm"
            onClick={() => (isEditing ? setIsEditing(false) : setIsEditing(true))}
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </div>

        <div className="space-y-4">
          <FormField label="Full Name">
            <Input
              type="text"
              value={profileData.fullName}
              onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
              disabled={!isEditing}
              placeholder="Enter your full name"
            />
          </FormField>

          <FormField label="Email Address">
            <div className="flex items-center gap-2">
              <Mail size={18} className="text-muted-foreground flex-shrink-0" />
              <Input
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                disabled={!isEditing}
                placeholder="Enter your email"
              />
            </div>
          </FormField>

          <FormField label="Phone Number">
            <div className="flex items-center gap-2">
              <Phone size={18} className="text-muted-foreground flex-shrink-0" />
              <Input
                type="tel"
                value={profileData.phone}
                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                disabled={!isEditing}
                placeholder="Enter your phone number"
              />
            </div>
          </FormField>

          <FormField label="Address">
            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-muted-foreground flex-shrink-0" />
              <Input
                value={profileData.address}
                onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                disabled={!isEditing}
                placeholder="Enter your address"
              />
            </div>
          </FormField>

          {isEditing && (
            <Button onClick={handleSave} size="lg" className="w-full">
              Save Changes
            </Button>
          )}
        </div>
      </Card>

      {/* Security Settings */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Shield size={24} className="text-primary" />
          <div>
            <h3 className="text-lg font-bold text-foreground">Security Settings</h3>
            <p className="text-sm text-muted-foreground">Manage your account security</p>
          </div>
        </div>

        <div className="space-y-3">
          {/* Change Password Section */}
          <div className="border-b border-border pb-4">
            <button
              onClick={() => setShowPasswordForm(!showPasswordForm)}
              className="w-full text-left p-4 rounded-lg hover:bg-secondary transition-colors flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Lock size={20} className="text-primary" />
                <div>
                  <p className="font-medium text-foreground">Change Password</p>
                  <p className="text-sm text-muted-foreground">Update your password regularly</p>
                </div>
              </div>
              <svg
                className={`w-5 h-5 transition-transform ${showPasswordForm ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>

            {showPasswordForm && (
              <div className="mt-4 pl-8 space-y-4">
                <FormField label="Current Password">
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={passwordData.current}
                      onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                      placeholder="Enter current password"
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

                <FormField label="New Password">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={passwordData.new}
                    onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                    placeholder="Enter new password"
                  />
                </FormField>

                <FormField label="Confirm Password">
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={passwordData.confirm}
                      onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                      placeholder="Confirm new password"
                    />
                    {passwordData.confirm && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        {passwordMatch ? (
                          <Check size={18} className="text-green-600" />
                        ) : (
                          <X size={18} className="text-destructive" />
                        )}
                      </div>
                    )}
                  </div>
                </FormField>

                <div className="flex gap-3">
                  <Button onClick={handlePasswordChange} disabled={!passwordMatch} className="flex-1">
                    Update Password
                  </Button>
                  <Button onClick={() => setShowPasswordForm(false)} variant="secondary" className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Two-Factor Authentication */}
          <button className="w-full text-left p-4 rounded-lg hover:bg-secondary transition-colors flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Smartphone size={20} className="text-primary" />
              <div>
                <p className="font-medium text-foreground">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">
                  <Badge variant="success" className="mt-1">
                    Enabled
                  </Badge>
                </p>
              </div>
            </div>
            <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Login Activity */}
          <button className="w-full text-left p-4 rounded-lg hover:bg-secondary transition-colors flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield size={20} className="text-primary" />
              <div>
                <p className="font-medium text-foreground">Login Activity</p>
                <p className="text-sm text-muted-foreground">View recent logins and manage sessions</p>
              </div>
            </div>
            <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </Card>

      {/* Account Preferences */}
      <Card className="p-6">
        <h3 className="text-lg font-bold text-foreground mb-6">Preferences</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary cursor-pointer transition-colors">
            <input type="checkbox" defaultChecked className="rounded" />
            <span className="text-sm text-foreground">Receive email notifications for transactions</span>
          </label>
          <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary cursor-pointer transition-colors">
            <input type="checkbox" defaultChecked className="rounded" />
            <span className="text-sm text-foreground">Receive SMS alerts for suspicious activity</span>
          </label>
          <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary cursor-pointer transition-colors">
            <input type="checkbox" className="rounded" />
            <span className="text-sm text-foreground">Receive marketing emails</span>
          </label>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="p-6 border-destructive/20 bg-destructive/5">
        <h3 className="text-lg font-bold text-destructive mb-4">Danger Zone</h3>
        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full gap-2 flex items-center justify-center text-destructive hover:bg-destructive/10 bg-transparent"
          >
            Delete Account
          </Button>
          <Button variant="danger" onClick={onLogout} className="w-full gap-2 flex items-center justify-center">
            <LogOut size={18} />
            Logout
          </Button>
        </div>
      </Card>
    </div>
  )
}
