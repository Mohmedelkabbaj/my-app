"use client"

import { useEffect } from "react"
import { Smartphone } from "lucide-react"

interface SignUpLoadingProps {
  onComplete: () => void
}

/**
 * Post-Sign-Up Loading Page
 * 
 * Displays a premium fintech-style loading experience after user registration.
 * Features smooth CSS animations for a polished feel.
 * Auto-redirects to dashboard after ~2.5 seconds.
 */
export function SignUpLoading({ onComplete }: SignUpLoadingProps) {
  useEffect(() => {
    // Auto-redirect after loading animation completes
    const timer = setTimeout(() => {
      onComplete()
    }, 2500)

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background flex flex-col items-center justify-center p-4">
      {/* Main Loading Container */}
      <div className="flex flex-col items-center gap-8">
        {/* Animated Icon Container */}
        <div className="relative w-32 h-32 flex items-center justify-center">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary border-r-primary opacity-75 animate-spin" />

          {/* Middle rotating ring (slower) */}
          <div className="absolute inset-4 rounded-full border-3 border-transparent border-b-primary border-l-primary opacity-50 animate-spin" style={{ animationDirection: "reverse", animationDuration: "2s" }} />

          {/* Inner static circle */}
          <div className="relative bg-gradient-to-br from-primary to-primary/60 rounded-full w-20 h-20 flex items-center justify-center shadow-lg">
            <Smartphone size={40} className="text-white" />
          </div>

          {/* Pulse effect */}
          <div className="absolute inset-0 rounded-full bg-primary opacity-20 animate-pulse" />
        </div>

        {/* Status Text */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-foreground">Setting up your account...</h2>
          <p className="text-muted-foreground text-base">
            We're preparing your payment system and securing your information
          </p>
        </div>

        {/* Progress Indicator - Animated dots */}
        <div className="flex items-center gap-2 mt-4">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.15s" }} />
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.3s" }} />
        </div>

        {/* Progress Bar - Shows completion */}
        <div className="w-32 h-1 bg-secondary rounded-full overflow-hidden mt-4">
          <div 
            className="h-full bg-primary rounded-full" 
            style={{
              animation: "progress 2.5s ease-in-out forwards"
            }}
          />
        </div>

        {/* Loading Steps */}
        <div className="mt-8 space-y-3 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-green-500" />
            </div>
            <span>Account created</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            </div>
            <span>Initializing payment system</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <div className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
            </div>
            <span>Finalizing setup</span>
          </div>
        </div>
      </div>

      {/* Animated background elements (subtle) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div 
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" 
          style={{ animation: "float 6s ease-in-out infinite" }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" 
          style={{ animation: "float 6s ease-in-out infinite", animationDelay: "1s" }}
        />
      </div>

      {/* Styles for custom animations */}
      <style>{`
        @keyframes progress {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }

        .animate-progress {
          animation: progress 2.5s ease-in-out forwards;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
