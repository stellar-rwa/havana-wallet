// frontend/src/app/(auth)/onboard/page.tsx
"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function OnboardingPage() {
  return (
    <div className="p-8 max-w-2xl mx-auto flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Identity Verification</h1>
      <p className="text-text-secondary text-center mb-8">
        Havana uses ZK-proofs to verify your refugee status without exposing your documents on the blockchain.
      </p>
      
      <Card className="w-full">
        <h2 className="text-xl font-bold mb-6">Step 1: UNHCR Verification</h2>
        <div className="space-y-4">
          <div className="p-4 border border-border-primary rounded-lg bg-surface-elevated italic text-text-tertiary">
            [Biometric / UNHCR Case Number Entry Placeholder]
          </div>
          <Button className="w-full">Verify & Generate Commitment</Button>
        </div>
      </Card>
    </div>
  );
}
