import React from "react"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
  label?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", error, label, id, ...props }, ref) => (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-foreground mb-2">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        className={`w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${error ? "border-destructive" : ""} ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-destructive flex items-center gap-1">
          <span aria-label="error icon">⚠️</span> {error}
        </p>
      )}
    </div>
  ),
)

Input.displayName = "Input"
