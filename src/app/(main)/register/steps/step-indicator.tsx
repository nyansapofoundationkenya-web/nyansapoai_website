type StepIndicatorProps = {
  steps: readonly string[]
  currentStep: number
}

export default function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center">
      {steps.map((label, index) => (
        <div key={label} className="flex items-center">
          <div className="flex flex-col items-center gap-2">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                index < currentStep
                  ? "bg-primary text-primary-foreground"
                  : index === currentStep
                    ? "bg-primary text-primary-foreground ring-4 ring-primary/30"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {index < currentStep ? (
                <i className="fa-solid fa-check text-xs" />
              ) : (
                index + 1
              )}
            </div>
            <span
              className={`hidden text-xs font-semibold md:block ${
                index === currentStep ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`mx-3 h-0.5 w-10 md:w-16 ${
                index < currentStep ? "bg-primary" : "bg-muted"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  )
}