// frontend/src/components/ui/Badge.tsx
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'error';
}

export const Badge = ({ children, variant = 'default', className, ...props }: BadgeProps) => {
  const variants = {
    default: 'bg-surface-elevated text-text-secondary border-border-primary',
    success: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    error: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
  };

  return (
    <div className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider", variants[variant], className)} {...props}>
      {children}
    </div>
  );
};
