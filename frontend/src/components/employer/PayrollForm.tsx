// frontend/src/components/employer/PayrollForm.tsx
"use client";
import { Button } from "@/components/ui/Button";

export const PayrollForm = () => (
  <div className="space-y-4">
    <h3 className="font-bold text-lg">Create Payroll Escrow</h3>
    <Button className="w-full">Deposit USDC into Escrow</Button>
  </div>
);
