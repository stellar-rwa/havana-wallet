// frontend/src/app/(dashboard)/ngo/page.tsx
"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function NGODashboard() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">NGO Disbursement Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="text-center">
          <p className="text-text-tertiary text-sm uppercase">Total Disbursed</p>
          <p className="text-2xl font-bold text-accent-primary">$ 124,500</p>
        </Card>
        <Card className="text-center">
          <p className="text-text-tertiary text-sm uppercase">Active Recipients</p>
          <p className="text-2xl font-bold text-accent-primary">1,240</p>
        </Card>
        <Card className="text-center">
          <p className="text-text-tertiary text-sm uppercase">Vault Balance</p>
          <p className="text-2xl font-bold text-accent-primary">$ 50,000</p>
        </Card>
      </div>
      
      <Button size="lg" className="mb-8">New Disbursement Batch</Button>
    </div>
  );
}
