// frontend/src/components/layout/TopBar.tsx
"use client";
import { NetworkStatus } from "@/components/common/NetworkStatus";
import { LanguageSelector } from "@/components/common/LanguageSelector";
import { formatAddress } from "@/lib/stellar";

export const TopBar = ({ address }: { address: string }) => {
  return (
    <div className="h-16 border-b border-border-primary flex items-center justify-between px-8 bg-background/50 backdrop-blur-md sticky top-0 z-30">
      <div className="font-space-mono text-xs text-text-secondary">{formatAddress(address)}</div>
      <div className="flex items-center gap-4">
        <NetworkStatus />
        <LanguageSelector />
      </div>
    </div>
  );
};
