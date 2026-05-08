// frontend/src/app/(dashboard)/wallet/page.tsx
"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function WalletDashboard() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">My Wallet</h1>
      <Card className="mb-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-text-secondary text-sm mb-1">Stellar Address</p>
            <p className="font-space-mono text-accent-primary text-xs">GBBD...A5PL</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-surface-elevated flex items-center justify-center">
            <span className="text-xs font-bold text-accent-primary">V</span>
          </div>
        </div>
        <p className="text-text-secondary mb-2">Total Balance</p>
        <p className="text-4xl font-bold text-accent-primary">$ 47.23 USDC</p>
        <div className="flex gap-4 mt-6">
          <Button className="flex-1">Send</Button>
          <Button variant="outline" className="flex-1">Receive</Button>
        </div>
      </Card>
      
      <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
      <div className="space-y-4 opacity-50 italic">
        {/* Contributors will implement the transaction list here */}
        No recent transactions found.
      </div>
    </div>
  );
}
