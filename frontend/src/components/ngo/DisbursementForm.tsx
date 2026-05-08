// frontend/src/components/ngo/DisbursementForm.tsx
"use client";
import { Button } from "@/components/ui/Button";

export const DisbursementForm = () => (
  <div className="space-y-4">
    <h3 className="font-bold text-lg">New Batch Disbursement</h3>
    <Button className="w-full">Upload CSV & Verify</Button>
  </div>
);

