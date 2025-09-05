import { cn } from "@/lib/utils";

interface Step {
  id: number;
  name: string;
  label: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export default function StepIndicator({ steps, currentStep, onStepClick }: StepIndicatorProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        {steps.map((step, index) => {
          const isCompleted = step.id < currentStep;
          const isActive = step.id === currentStep;
          const isClickable = step.id <= currentStep;
          
          return (
            <div key={step.id} className="flex items-center">
              <button
                onClick={() => isClickable && onStepClick?.(step.id)}
                disabled={!isClickable}
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                  isCompleted && "bg-green-500 text-white",
                  isActive && "bg-primary text-primary-foreground",
                  !isCompleted && !isActive && "bg-border text-muted-foreground",
                  isClickable && "hover:bg-opacity-80 cursor-pointer",
                  !isClickable && "cursor-not-allowed"
                )}
                data-testid={`step-${step.id}`}
              >
                {isCompleted ? (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                ) : (
                  step.id
                )}
              </button>
              
              {index < steps.length - 1 && (
                <div 
                  className={cn(
                    "h-1 w-8 mx-2 transition-colors",
                    isCompleted ? "bg-green-500" : "bg-border"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
      
      <div className="flex justify-between text-xs text-muted-foreground">
        {steps.map((step) => (
          <span key={step.id} className="text-center min-w-0 flex-1">
            {step.label}
          </span>
        ))}
      </div>
    </div>
  );
}
