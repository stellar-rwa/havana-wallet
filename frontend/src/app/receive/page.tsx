// frontend/src/app/receive/page.tsx
"use client";
import { Card } from "@/components/ui/Card";
import { useWalletStore } from "@/store/walletStore";

export default function ReceivePage() {
  const { address } = useWalletStore();
  return (
    <div className="p-8 max-w-xl mx-auto flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8">Receive</h1>
      <Card className="flex flex-col items-center gap-6 w-full">
        <div className="w-48 h-48 bg-white rounded-lg flex items-center justify-center">
          <p className="text-black text-xs">[QR Code Placeholder]</p>
        </div>
        <p className="font-space-mono text-xs text-accent-primary break-all text-center">
          {address || "Connect Wallet to see address"}
        </p>
      </Card>
    </div>
  );
}
