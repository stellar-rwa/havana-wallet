// frontend/src/components/identity/IdentityCard.tsx
"use client";
import { Card } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { useState } from "react";

export const IdentityCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="w-full aspect-[1.6/1] relative cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
      <motion.div
        className="w-full h-full"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <Card className="absolute inset-0 backface-hidden flex flex-col justify-between">
          <span className="text-xl font-bold font-space-grotesk text-accent-primary uppercase">Havana ID</span>
          <div className="mt-auto">
            <p className="text-[10px] text-text-tertiary uppercase">Identity Commitment</p>
            <p className="font-space-mono text-sm">0x7a2...4f9b</p>
          </div>
        </Card>

        {/* Back */}
        <Card className="absolute inset-0 backface-hidden flex flex-col items-center justify-center bg-surface-elevated" style={{ transform: "rotateY(180deg)" }}>
          <p className="text-xs text-text-secondary text-center">Verified by UNHCR Trust Verifier v1.2</p>
          <div className="mt-4 w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center">
            <span className="text-emerald-500 text-xs font-bold">ZK</span>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};
