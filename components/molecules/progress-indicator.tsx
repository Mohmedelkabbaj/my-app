interface ProgressIndicatorProps {
  currentStep: number
  totalSteps: number
  steps: string[]
}

export const ProgressIndicator = ({ currentStep, steps }: ProgressIndicatorProps) => (
  <div className="flex gap-2 mb-8">
    {steps.map((step, index) => (
      <div key={step} className="flex items-center gap-2">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm transition-colors ${
            index + 1 === currentStep
              ? "bg-primary text-primary-foreground"
              : index + 1 < currentStep
                ? "bg-secondary text-secondary-foreground"
                : "bg-muted text-muted-foreground"
          }`}
        >
          {index + 1}
        </div>
        {index < steps.length - 1 && (
          <div className={`w-8 h-0.5 ${index + 1 < currentStep ? "bg-secondary" : "bg-muted"}`} />
        )}
      </div>
    ))}
  </div>
)
