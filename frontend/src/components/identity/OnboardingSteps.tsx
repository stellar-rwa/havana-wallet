// frontend/src/components/identity/OnboardingSteps.tsx
export const OnboardingSteps = ({ currentStep }: { currentStep: number }) => (
  <div className="flex justify-between w-full mb-12 relative">
    {[1, 2, 3, 4].map((step) => (
      <div key={step} className={`w-8 h-8 rounded-full flex items-center justify-center z-10 border-2 ${step <= currentStep ? 'bg-accent-primary border-accent-primary text-background' : 'bg-surface-elevated border-border-primary text-text-tertiary'}`}>
        <span className="text-xs font-bold">{step}</span>
      </div>
    ))}
    <div className="absolute top-4 left-0 w-full h-[2px] bg-border-primary -z-0"></div>
  </div>
);
