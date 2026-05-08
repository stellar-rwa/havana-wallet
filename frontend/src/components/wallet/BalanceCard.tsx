// frontend/src/components/wallet/BalanceCard.tsx
"use client";
import { Card } from "@/components/ui/Card";

export const BalanceCard = ({ balance }: { balance: string }) => (
  <Card className="flex flex-col items-center">
    <span className="text-text-tertiary text-xs uppercase tracking-widest mb-2">USDC Balance</span>
    <span className="text-4xl font-bold text-accent-primary font-space-grotesk">${balance}</span>
  </Card>
);

// frontend/src/components/wallet/TransactionList.tsx
"use client";
export const TransactionList = () => (
  <div className="space-y-4">
    <p className="text-text-tertiary italic text-sm text-center">No recent transactions to display.</p>
  </div>
);

// frontend/src/components/common/AnimatedCounter.tsx
"use client";
import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

export const AnimatedCounter = ({ value }: { value: number }) => {
  const spring = useSpring(0, { mass: 1, stiffness: 100, damping: 30 });
  const displayValue = useTransform(spring, (current) => Math.round(current));

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return <motion.span>{displayValue}</motion.span>;
};
