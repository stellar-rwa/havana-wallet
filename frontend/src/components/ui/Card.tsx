// frontend/src/components/ui/Card.tsx
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { HTMLAttributes } from "react";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  isAnimated?: boolean;
}

export const Card = ({ children, className, ...props }: CardProps) => {
  return (
    <div className={cn("glass-card p-6 teal-glow", className)} {...props}>
      {children}
    </div>
  );
};
