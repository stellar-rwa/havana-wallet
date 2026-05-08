// frontend/src/components/identity/ZKProofBadge.tsx
"use client";
import { ShieldCheck } from "lucide-react";

export const ZKProofBadge = ({ verified }: { verified: boolean }) => (
  <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${verified ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
    <ShieldCheck className="w-4 h-4" />
    {verified ? 'ZK Verified' : 'Pending Verification'}
  </div>
);
