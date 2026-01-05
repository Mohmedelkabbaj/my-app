import React from "react"
import { cn } from "@/lib/utils"

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  initials?: string
  size?: "sm" | "md" | "lg"
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className = "", initials = "AB", size = "md", ...props }, ref) => {
    const sizeClasses = {
      sm: "w-8 h-8 text-xs",
      md: "w-10 h-10 text-sm",
      lg: "w-12 h-12 text-base",
    }

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold",
          sizeClasses[size],
          className,
        )}
        {...props}
      >
        {initials}
      </div>
    )
  },
)

Avatar.displayName = "Avatar"
