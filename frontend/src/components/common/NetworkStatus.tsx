// frontend/src/components/common/NetworkStatus.tsx
"use client";

import { useStellar } from "@/providers/StellarProvider";

export const NetworkStatus = () => {
  const { network } = useStellar();
  return (
    <div className="flex items-center gap-2 px-3 py-1 bg-surface-elevated rounded-full border border-border-primary">
      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
      <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">
        {network.networkName}
      </span>
    </div>
  );
};
