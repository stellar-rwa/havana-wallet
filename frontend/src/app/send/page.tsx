// frontend/src/app/send/page.tsx
"use client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";

export default function SendPage() {
  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Send USDC</h1>
      <Card className="space-y-6">
        <div>
          <label className="text-xs text-text-tertiary uppercase">Recipient Address</label>
          <Input placeholder="G..." className="mt-1" />
        </div>
        <div>
          <label className="text-xs text-text-tertiary uppercase">Amount (USDC)</label>
          <Input type="number" placeholder="0.00" className="mt-1" />
        </div>
        <Button className="w-full">Confirm Transfer</Button>
      </Card>
    </div>
  );
}
