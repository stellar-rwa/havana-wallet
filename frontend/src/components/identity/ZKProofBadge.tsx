// frontend/src/components/identity/ZKProofBadge.tsx
"use client";
import { ShieldCheck } from "lucide-react";

export const ZKProofBadge = ({ verified }: { verified: boolean }) => (
  <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${verified ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
    <ShieldCheck className="w-4 h-4" />
    {verified ? 'ZK Verified' : 'Pending Verification'}
  </div>
);

// frontend/src/components/identity/IdentityCard.tsx
"use client";
import { Card } from "@/components/ui/Card";

export const IdentityCard = () => (
  <Card className="w-full aspect-[1.6/1] flex flex-col justify-between">
    <div className="flex justify-between items-start">
      <span className="text-lg font-bold font-space-grotesk text-accent-primary">HAVANA ID</span>
      <div className="w-8 h-8 rounded bg-surface-elevated"></div>
    </div>
    <div className="mt-auto">
      <p className="text-[10px] text-text-tertiary uppercase">Refugee Identity Commitment</p>
      <p className="font-space-mono text-xs text-text-secondary truncate">0x7a2...4f9b</p>
    </div>
  </Card>
);
