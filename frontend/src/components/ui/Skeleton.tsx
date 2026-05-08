// frontend/src/components/ui/Skeleton.tsx
export const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-surface-elevated rounded ${className}`} />
);

// frontend/src/components/common/OfflineNotice.tsx
"use client";
import { WifiOff } from "lucide-react";

export const OfflineNotice = () => (
  <div className="fixed bottom-4 right-4 glass-card bg-rose-500/20 border-rose-500/30 px-4 py-2 flex items-center gap-2 z-50">
    <WifiOff className="w-4 h-4 text-rose-500" />
    <span className="text-xs font-bold text-rose-500 uppercase">Offline Mode</span>
  </div>
);

// frontend/src/components/common/AnimatedCounter.tsx
"use client";
import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

export const AnimatedCounter = ({ value }: { value: number }) => {
  const spring = useSpring(0, { mass: 1, stiffness: 100, damping: 30 });
  const displayValue = useTransform(spring, (current) => Math.round(current).toLocaleString());

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return <motion.span>{displayValue}</motion.span>;
};
