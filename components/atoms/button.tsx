import React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger"
  size?: "sm" | "md" | "lg"
  isLoading?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", isLoading = false, disabled, children, ...props }, ref) => {
    // Base styles with smooth transitions for animations
    const baseClasses = "font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95"

    const variantClasses = {
      primary: "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:scale-105 focus:ring-primary",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90 hover:shadow-lg hover:scale-105 focus:ring-secondary",
      danger: "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:shadow-lg hover:scale-105 focus:ring-destructive",
    }

    const sizeClasses = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${className}`}
        {...props}
      >
        {isLoading ? "Processing..." : children}
      </button>
    )
  },
)

Button.displayName = "Button"
