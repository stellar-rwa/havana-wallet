// frontend/src/components/common/StatCard.tsx
import { Card } from "@/components/ui/Card";

interface StatCardProps {
  label: string;
  value: string;
  subValue?: string;
}

export const StatCard = ({ label, value, subValue }: StatCardProps) => {
  return (
    <Card className="text-center p-4">
      <p className="text-text-tertiary text-[10px] uppercase tracking-widest mb-1">{label}</p>
      <p className="text-2xl font-bold font-space-grotesk text-accent-primary">{value}</p>
      {subValue && <p className="text-xs text-text-secondary mt-1">{subValue}</p>}
    </Card>
  );
};
