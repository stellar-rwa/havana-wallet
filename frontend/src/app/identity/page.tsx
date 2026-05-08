// frontend/src/app/identity/page.tsx
"use client";
import { IdentityCard } from "@/components/identity/IdentityCard";
import { ZKProofBadge } from "@/components/identity/ZKProofBadge";
import { Card } from "@/components/ui/Card";

export default function IdentityPage() {
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Havana Identity</h1>
      <div className="space-y-8">
        <IdentityCard />
        <Card className="flex justify-between items-center">
          <div>
            <p className="font-bold">ZK Verification Status</p>
            <p className="text-sm text-text-secondary">Last verified: 2 days ago</p>
          </div>
          <ZKProofBadge verified={true} />
        </Card>
      </div>
    </div>
  );
}
