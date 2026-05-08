// frontend/src/app/explore/page.tsx
export default function ExplorePage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Havana Explorer</h1>
      <p className="text-text-secondary italic">Real-time refugee aid disbursement feed...</p>
    </div>
  );
}

// frontend/src/components/ui/Input.tsx
import React from 'react';
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-md border border-border-primary bg-surface-elevated px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent-primary disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";

// frontend/src/types/api.ts
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

// frontend/src/hooks/useDisbursement.ts
import { useQuery } from '@tanstack/react-query';

export const useDisbursement = (id: string | null) => {
  return useQuery({
    queryKey: ['disbursement', id],
    queryFn: async () => {
      // Fetch disbursement status
      return null;
    },
    enabled: !!id,
  });
};
